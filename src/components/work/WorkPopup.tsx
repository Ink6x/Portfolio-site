import Link from "next/link";
import { cn } from "@/lib/cn";
import type { Work } from "@/types/work";

interface WorkPopupProps {
  work: Work;
  visible: boolean;
}

export function WorkPopup({ work, visible }: WorkPopupProps) {
  return (
    <div
      className={cn(
        "absolute inset-x-0 bottom-0 z-10 p-4 transition-all duration-200",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
      )}
      style={{
        background: "var(--color-bg-elevated)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid var(--color-line)",
      }}
      aria-hidden={!visible}
    >
      <p className="mb-2 text-xs leading-relaxed text-[var(--color-text-muted)]">
        {work.summary}
      </p>
      <div className="mb-3 flex flex-wrap gap-1">
        {work.role.map((r) => (
          <span
            key={r}
            className="rounded-sm border border-[var(--color-line)] px-1.5 py-0.5 text-[11px] text-[var(--color-text-subtle)]"
          >
            {r}
          </span>
        ))}
        {work.stack.slice(0, 3).map((s) => (
          <span
            key={s}
            className="rounded-sm border border-[var(--color-line)] px-1.5 py-0.5 text-[11px] text-[var(--color-text-subtle)]"
          >
            {s}
          </span>
        ))}
      </div>
      {work.detailPage && (
        <Link
          href={`/work/${work.slug}`}
          className="text-xs text-[var(--color-text-muted)] underline-offset-2 hover:text-[var(--color-text)] hover:underline"
          tabIndex={visible ? 0 : -1}
        >
          View project →
        </Link>
      )}
    </div>
  );
}
