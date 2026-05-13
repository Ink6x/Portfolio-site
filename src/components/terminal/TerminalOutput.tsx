"use client";

import { useEffect, useRef } from "react";
import type { TerminalLine, TerminalMode } from "@/types/terminal";

function CommandPrompt() {
  return (
    <span className="mr-2 select-none">
      <span style={{ color: "#7ec8a4" }}>jullien@lab</span>
      <span style={{ color: "var(--color-text-subtle)" }}>:</span>
      <span style={{ color: "#7aa2d4" }}>~/lab</span>
      <span style={{ color: "var(--color-text)" }}> $</span>
    </span>
  );
}

function AiPrompt() {
  return (
    <span className="mr-2 select-none" style={{ color: "#c792ea" }}>
      ai&gt;
    </span>
  );
}

interface TerminalOutputProps {
  lines: TerminalLine[];
  inputValue: string;
  focused: boolean;
  mode: TerminalMode;
  isWaiting: boolean;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
}

export function TerminalOutput({
  lines,
  inputValue,
  focused,
  mode,
  isWaiting,
  onKeyDown,
  onFocus,
  onBlur,
}: TerminalOutputProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, inputValue, isWaiting]);

  const CurrentPrompt = mode === "ai" ? AiPrompt : CommandPrompt;

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
      onClick={() => containerRef.current?.focus()}
      className="terminal-scroll flex-1 overflow-y-auto px-4 py-3 text-sm cursor-text"
      role="textbox"
      aria-multiline="false"
      aria-label="Terminal"
      style={{
        fontFamily: "var(--font-terminal)",
        outline: "none",
      }}
    >
      {lines.map((line, i) => (
        <div key={i} className="mb-1 leading-relaxed whitespace-pre-wrap">
          {line.type === "input" && (
            <span>
              {line.mode === "ai" ? <AiPrompt /> : <CommandPrompt />}
              <span className="text-[var(--color-text)]">{line.text}</span>
            </span>
          )}
          {line.type === "output" && (
            <span className="text-[var(--color-text)]">{line.text}</span>
          )}
          {line.type === "error" && (
            <span className="text-[var(--color-error)]">{line.text}</span>
          )}
          {line.type === "system" && line.text !== "__clear__" && (
            <span className="text-[var(--color-text-subtle)] italic">
              {line.text}
            </span>
          )}
        </div>
      ))}

      {isWaiting ? (
        <div className="mb-1 leading-relaxed whitespace-pre-wrap">
          <span style={{ color: "#c792ea" }}>ai&gt; </span>
          <span className="text-[var(--color-text-subtle)]">…</span>
        </div>
      ) : (
        <div className="leading-relaxed whitespace-pre-wrap select-none">
          <CurrentPrompt />
          <span className="text-[var(--color-text)]">
            {inputValue}
            <span className={focused ? "terminal-cursor" : "terminal-cursor-blur"}>
              &nbsp;
            </span>
          </span>
        </div>
      )}
    </div>
  );
}
