"use client";

import dynamic from "next/dynamic";
import { ThreeFallback } from "@/components/three/ThreeFallback";

const MonochromeEarthWithFallback = dynamic(
  () =>
    import("@/components/three/MonochromeEarth").then(
      (m) => m.MonochromeEarthWithFallback
    ),
  {
    ssr: false,
    loading: () => <ThreeFallback />,
  }
);

export function Ink6xLabSection() {
  return (
    <section
      id="top"
      className="relative flex h-screen w-full items-center overflow-hidden"
      aria-label="Ink6x Lab"
    >
      {/* Background globe */}
      <MonochromeEarthWithFallback />

      {/* Text — left-aligned to match the globe's left-fade */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-10 select-none pointer-events-none">
        <h1
          className="text-[52px] font-semibold tracking-[0.3em] text-[var(--color-text)] md:text-[79px] lg:text-[106px]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Ink6x Lab
        </h1>
      </div>

      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--color-bg))",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
