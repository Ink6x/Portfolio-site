"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { TerminalOutput } from "./TerminalOutput";
import { processCommand } from "@/lib/terminal";
import { TERMINAL_WELCOME } from "@/content/terminal-knowledge";
import type { TerminalLine, TerminalMode, TerminalChatResponse } from "@/types/terminal";

const MIN_WIDTH = 480;
const MAX_WIDTH = 1200;
const MAX_AI_HISTORY = 10;

const INITIAL_LINES: TerminalLine[] = [
  { type: "system", text: TERMINAL_WELCOME },
];

interface TerminalWindowProps {
  defaultWidth?: number;
}

export function TerminalWindow({ defaultWidth = 960 }: TerminalWindowProps) {
  const [lines, setLines] = useState<TerminalLine[]>(INITIAL_LINES);
  const [inputValue, setInputValue] = useState("");
  const [inputHistory, setInputHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [focused, setFocused] = useState(false);
  const [termWidth, setTermWidth] = useState(defaultWidth);
  const [mode, setMode] = useState<TerminalMode>("command");
  const [isWaiting, setIsWaiting] = useState(false);
  const [aiHistory, setAiHistory] = useState<
    Array<{ role: "user" | "assistant"; content: string }>
  >([]);

  const dragRef = useRef<{ startX: number; startWidth: number } | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // Track IME composition to prevent Enter from submitting mid-composition
  const isComposingRef = useRef(false);

  useEffect(() => {
    inputRef.current?.focus();
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const enterAiMode = useCallback(() => {
    setMode("ai");
    setLines((prev) => [
      ...prev,
      {
        type: "system",
        text: "AIモード ON — Ink6xについて自由に質問してください。終了: exit",
      },
    ]);
  }, []);

  const exitAiMode = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setIsWaiting(false);
    setAiHistory([]);
    setMode("command");
    setLines((prev) => [...prev, { type: "system", text: "AIモード OFF." }]);
  }, []);

  const dispatchAiMessage = useCallback(
    async (message: string, currentHistory: typeof aiHistory) => {
      const abort = new AbortController();
      abortRef.current = abort;
      setIsWaiting(true);

      try {
        const res = await fetch("/api/terminal-chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message, history: currentHistory }),
          signal: abort.signal,
        });

        if (res.status === 429) {
          const retryAfter = res.headers.get("Retry-After") ?? "60";
          setLines((prev) => [
            ...prev,
            {
              type: "error",
              text: `リクエストが多すぎます。${retryAfter}秒後に再試行してください。`,
            },
          ]);
          return;
        }

        if (!res.ok) {
          setLines((prev) => [
            ...prev,
            { type: "error", text: "AIモードで一時的なエラーが発生しました。" },
          ]);
          return;
        }

        const data = (await res.json()) as TerminalChatResponse;
        const answer = data.answer ?? "応答を受信できませんでした。";

        setLines((prev) => [...prev, { type: "output", text: answer }]);
        setAiHistory((prev) => {
          const updated = [
            ...prev,
            { role: "user" as const, content: message },
            { role: "assistant" as const, content: answer },
          ];
          return updated.slice(-MAX_AI_HISTORY);
        });
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        setLines((prev) => [
          ...prev,
          { type: "error", text: "AIモードで一時的なエラーが発生しました。" },
        ]);
      } finally {
        setIsWaiting(false);
        abortRef.current = null;
      }
    },
    []
  );

  const handleResizeStart = useCallback(
    (e: React.MouseEvent) => {
      dragRef.current = { startX: e.clientX, startWidth: termWidth };

      const onMouseMove = (ev: MouseEvent) => {
        if (!dragRef.current) return;
        const delta = ev.clientX - dragRef.current.startX;
        const next = Math.min(
          MAX_WIDTH,
          Math.max(MIN_WIDTH, dragRef.current.startWidth + delta)
        );
        setTermWidth(next);
      };

      const onMouseUp = () => {
        dragRef.current = null;
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    },
    [termWidth]
  );

  // onChange handles all normal text input including IME-composed Japanese characters.
  // Backspace and Ctrl+V are handled natively by the input element.
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isWaiting) {
        setInputValue(e.target.value);
        if (historyIndex !== -1) setHistoryIndex(-1);
      }
    },
    [isWaiting, historyIndex]
  );

  // handleKeyDown handles only control keys. Character input is left to onChange.
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        // Skip if IME is composing (e.g., user pressing Enter to commit a kanji candidate)
        if (isComposingRef.current) return;
        e.preventDefault();
        if (isWaiting) return;

        const trimmed = inputValue.trim();
        if (!trimmed) return;

        setInputHistory((prev) => [trimmed, ...prev]);
        setInputValue("");
        setHistoryIndex(-1);

        if (mode === "ai") {
          const cmd = trimmed.toLowerCase();

          if (cmd === "exit" || cmd === "quit") {
            setLines((prev) => [...prev, { type: "input", text: trimmed, mode: "ai" }]);
            exitAiMode();
            return;
          }

          if (cmd === "clear") {
            setLines([{ type: "system", text: TERMINAL_WELCOME }]);
            return;
          }

          setLines((prev) => [...prev, { type: "input", text: trimmed, mode: "ai" }]);
          void dispatchAiMessage(trimmed, aiHistory.slice(-MAX_AI_HISTORY));
          return;
        }

        // Command mode
        if (trimmed.toLowerCase() === "ai") {
          setLines((prev) => [...prev, { type: "input", text: trimmed, mode: "command" }]);
          enterAiMode();
          return;
        }

        const results = processCommand(trimmed);

        if (
          results.length === 1 &&
          results[0].type === "system" &&
          results[0].text === "__clear__"
        ) {
          setLines([{ type: "system", text: TERMINAL_WELCOME }]);
          return;
        }

        setLines((prev) => [
          ...prev,
          { type: "input", text: trimmed, mode: "command" },
          ...results,
        ]);
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        const next = Math.min(historyIndex + 1, inputHistory.length - 1);
        setHistoryIndex(next);
        setInputValue(inputHistory[next] ?? "");
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = Math.max(historyIndex - 1, -1);
        setHistoryIndex(next);
        setInputValue(next === -1 ? "" : (inputHistory[next] ?? ""));
        return;
      }

      if (e.key === "c" && e.ctrlKey) {
        if (isWaiting) {
          abortRef.current?.abort();
          abortRef.current = null;
          setIsWaiting(false);
        }
        setInputValue("");
        setHistoryIndex(-1);
        return;
      }

      if (e.key === "l" && e.ctrlKey) {
        e.preventDefault();
        setLines([{ type: "system", text: TERMINAL_WELCOME }]);
        setInputValue("");
        setHistoryIndex(-1);
        return;
      }
    },
    [
      inputValue,
      inputHistory,
      historyIndex,
      mode,
      isWaiting,
      aiHistory,
      enterAiMode,
      exitAiMode,
      dispatchAiMessage,
    ]
  );

  return (
    <div
      className="relative flex flex-col overflow-hidden rounded-sm"
      style={{
        background: "var(--color-bg-elevated)",
        backdropFilter: "blur(16px)",
        border: "1px solid var(--color-line)",
        width: `${termWidth}px`,
        maxWidth: "100%",
        height: "495px",
      }}
    >
      {/* Title bar */}
      <div
        className="flex shrink-0 items-center justify-between px-4 py-2"
        style={{ borderBottom: "1px solid var(--color-line)" }}
      >
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </div>
        <span
          className="text-xs text-[var(--color-text-subtle)]"
          style={{ fontFamily: "var(--font-terminal)" }}
        >
          {mode === "ai" ? "ink6x@lab — AI mode" : "ink6x@lab — bash"}
        </span>
        <div className="w-12" />
      </div>

      {/* Hidden input — receives actual keyboard/IME input */}
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onCompositionStart={() => { isComposingRef.current = true; }}
        onCompositionEnd={() => { isComposingRef.current = false; }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-hidden="true"
        tabIndex={-1}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          opacity: 0,
          width: "1px",
          height: "1px",
          border: "none",
          outline: "none",
          padding: 0,
          margin: 0,
          pointerEvents: "none",
        }}
      />

      <TerminalOutput
        lines={lines}
        inputValue={inputValue}
        focused={focused}
        mode={mode}
        isWaiting={isWaiting}
        onFocusRequest={focusInput}
      />

      {/* Resize handle */}
      <div
        onMouseDown={handleResizeStart}
        className="absolute right-0 top-0 h-full w-1 cursor-ew-resize opacity-0 hover:opacity-100 transition-opacity"
        style={{ background: "var(--color-line-strong)" }}
        aria-hidden="true"
      />
    </div>
  );
}
