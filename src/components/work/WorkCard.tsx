"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { WorkPopup } from "./WorkPopup";
import type { Work } from "@/types/work";

interface WorkCardProps {
  work: Work;
}

function PlaceholderObject({ label }: { label: string }) {
  return (
    <div
      className="flex h-full w-full items-center justify-center"
      aria-label={label}
    >
      <div
        className="h-20 w-20 rotate-12 border border-[var(--color-line-strong)] transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105"
        style={{ background: "var(--color-glass)" }}
      />
    </div>
  );
}

export function WorkCard({ work }: WorkCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className={cn(
        "group relative flex h-64 flex-col overflow-hidden",
        "border border-[var(--color-line)] transition-colors hover:border-[var(--color-line-strong)]"
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      {/* 3D Object area */}
      <div className="relative flex-1 overflow-hidden">
        {work.objectAsset.fallbackImage ? (
          <Image
            src={work.objectAsset.fallbackImage}
            alt={work.objectAsset.alt}
            fill
            className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <PlaceholderObject label={work.objectAsset.alt} />
        )}
      </div>

      {/* Project name */}
      <div
        className="shrink-0 px-3 py-2"
        style={{ borderTop: "1px solid var(--color-line)" }}
      >
        <h3 className="text-xs text-[var(--color-text-muted)]">{work.name}</h3>
      </div>

      {/* Hover popup */}
      <WorkPopup work={work} visible={hovered} />

      {/* Invisible focus target for the whole card */}
      {work.detailPage && (
        <Link
          href={`/work/${work.slug}`}
          className="absolute inset-0 z-20 opacity-0 focus-visible:opacity-0"
          aria-label={`${work.name}の詳細を見る`}
          tabIndex={0}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
        >
          <span className="sr-only">{work.name}</span>
        </Link>
      )}
    </article>
  );
}
