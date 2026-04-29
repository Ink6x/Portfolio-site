"use client";

import { useState, useEffect, useRef } from "react";
import { useAnimate } from "framer-motion";
import { TerminalWindow } from "./TerminalWindow";

// ---------------------------------------------------------------------------
// Genie paths — objectBoundingBox (0–1 normalized, auto-scales with element)
//
// All paths share the SAME command structure so Framer Motion can morph:
//   M {tl},0  L 1,0  L 1,1  L {bl},1  C {cp1},0.67  {cp2},0.33  {tl},0  Z
//
// Right edge stays fixed at x=1 (anchors to the button).
// Left edge is a cubic bezier — curves inward as the "paper" is pulled.
// ---------------------------------------------------------------------------
const P_CLOSED = "M 1,0    L 1,0 L 1,1 L 1,1    C 1,0.67   1,0.33   1,0    Z";
const P_OPEN   = "M 0,0    L 1,0 L 1,1 L 0,1    C 0,0.67   0,0.33   0,0    Z";

// Spring: natural overshoot makes the left edge briefly extend past x=0 (paper bounce)
const SPRING   = { type: "spring" as const, stiffness: 260, damping: 22, mass: 0.85 };
// Ease-in: accelerates as it's sucked into the button
const EASE_IN  = { duration: 0.36, ease: [0.4, 0, 1, 1] as [number, number, number, number] };

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function TerminalLauncher() {
  const [isOpen, setIsOpen]       = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const pathRef = useRef<SVGPathElement>(null);
  const [, animate] = useAnimate();

  // Open: animate path from collapsed → full (spring physics)
  const runOpen = () => {
    if (!pathRef.current) return;
    animate(pathRef.current, { d: [P_CLOSED, P_OPEN] }, SPRING);
  };

  // Close: animate path from full → collapsed (ease-in), then unmount
  const runClose = async () => {
    if (!pathRef.current) return;
    await animate(pathRef.current, { d: [P_OPEN, P_CLOSED] }, EASE_IN);
    setIsOpen(false);
    setIsClosing(false);
  };

  const open = () => {
    if (isOpen && !isClosing) return;
    setIsClosing(false);
    setIsOpen(true);
    // runOpen() fires in the effect below after the path mounts
  };

  const close = () => {
    if (isClosing) return;
    setIsClosing(true);
    // runClose() fires in the effect below
  };

  const toggle = () => (isOpen ? close() : open());

  // Fire open animation after the SVG path element mounts
  useEffect(() => {
    if (isOpen && !isClosing) runOpen();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, isClosing]);

  // Fire close animation when isClosing becomes true
  useEffect(() => {
    if (isClosing) void runClose();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClosing]);

  // Listen for external open trigger (e.g. header nav "TERMINAL" link)
  useEffect(() => {
    const handleOpen = () => open();
    window.addEventListener("terminal:open", handleOpen);
    return () => window.removeEventListener("terminal:open", handleOpen);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, isClosing]);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <div style={{ position: "relative" }}>
          {/* Inline SVG defs — zero-size, not rendered, just defines the clip path */}
          <svg aria-hidden style={{ position: "absolute", width: 0, height: 0 }}>
            <defs>
              {/*
                clipPathUnits="objectBoundingBox":
                coordinates 0–1 map to the clipped element's own width/height,
                so the genie shape scales automatically with any panel size.
              */}
              <clipPath id="genie-clip" clipPathUnits="objectBoundingBox">
                <path ref={pathRef} d={P_CLOSED} />
              </clipPath>
            </defs>
          </svg>

          {/* Terminal panel — clipped by the animated genie path */}
          <div style={{ clipPath: "url(#genie-clip)", willChange: "clip-path" }}>
            <TerminalWindow defaultWidth={560} />
          </div>
        </div>
      )}

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
