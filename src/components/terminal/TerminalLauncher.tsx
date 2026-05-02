"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TerminalWindow } from "./TerminalWindow";

export function TerminalLauncher() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("terminal:open", handleOpen);
    return () => window.removeEventListener("terminal:open", handleOpen);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 40, scale: 0.8, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 40, scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <TerminalWindow defaultWidth={560} />
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={toggle}
        aria-label={isOpen ? "Close terminal" : "Open terminal"}
        style={{
          width: "52px",
          height: "52px",
          borderRadius: "50%",
          background: isOpen ? "var(--color-text)" : "var(--color-bg-elevated)",
          backdropFilter: "blur(16px)",
          border: "1px solid var(--color-line-strong)",
          color: isOpen ? "var(--color-bg)" : "var(--color-text)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-terminal)",
          fontSize: isOpen ? "22px" : "13px",
          transition: "transform 0.12s ease, background 0.2s ease, color 0.2s ease",
          userSelect: "none",
          flexShrink: 0,
        }}
        onMouseDown={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.88)";
        }}
        onMouseUp={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
        }}
      >
        {isOpen ? "×" : ">_"}
      </button>
    </div>
  );
}
