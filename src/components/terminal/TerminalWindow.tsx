"use client";

import { useState, useCallback, useRef } from "react";
import { TerminalOutput } from "./TerminalOutput";
import { processCommand } from "@/lib/terminal";
import { TERMINAL_WELCOME } from "@/content/terminal-knowledge";
import type { TerminalLine } from "@/types/terminal";

const MIN_WIDTH = 480;
const MAX_WIDTH = 1200;

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
  const dragRef = useRef<{ startX: number; startWidth: number } | null>(null);

  const handleResizeStart = useCallback(
    (e: React.MouseEvent) => {
      dragRef.current = { startX: e.clientX, startWidth: termWidth };

      const onMouseMove = (ev: MouseEvent) => {
        if (!dragRef.current) return;
        const delta = ev.clientX - dragRef.current.startX;
        const next = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, dragRef.current.startWidth + delta));
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

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const trimmed = inputValue.trim();
        if (!trimmed) return;

        const results = processCommand(trimmed);

        if (
          results.length === 1 &&
          results[0].type === "system" &&
          results[0].text === "__clear__"
        ) {
          setLines([{ type: "system", text: TERMINAL_WELCOME }]);
          setInputHistory((prev) => [trimmed, ...prev]);
          setInputValue("");
          setHistoryIndex(-1);
          return;
        }

        setLines((prev) => [...prev, { type: "input", text: trimmed }, ...results]);
        setInputHistory((prev) => [trimmed, ...prev]);
        setInputValue("");
        setHistoryIndex(-1);
        return;
      }

      if (e.key === "Backspace") {
        e.preventDefault();
        setInputValue((prev) => prev.slice(0, -1));
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

      if (e.key === "v" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        navigator.clipboard.readText().then((text) => {
          setInputValue((prev) => prev + text.replace(/\n/g, " "));
        });
        return;
      }

      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        setInputValue((prev) => prev + e.key);
        if (historyIndex !== -1) setHistoryIndex(-1);
      }
    },
    [inputValue, inputHistory, historyIndex]
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
        height: "470px",
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
          jullien@lab — bash
        </span>
        <div className="w-12" />
      </div>

      {/* Single scrollable body — output + input line in one stream */}
      <TerminalOutput
        lines={lines}
        inputValue={inputValue}
        focused={focused}
        onKeyDown={handleKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
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
