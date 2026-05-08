import type { WorkMetric } from "@/types/work";

export function MetricCallout({ before, after, label }: WorkMetric) {
  return (
    <div className="border border-[var(--color-line)] p-4">
      <div className="mb-1.5 flex flex-wrap items-baseline gap-1.5">
        {before && (
          <span className="text-xs text-[var(--color-text-subtle)] line-through">
            {before}
          </span>
        )}
        <span className="text-2xl font-light tracking-tight text-[var(--color-text)]">
          {after}
        </span>
      </div>
      <p className="text-xs text-[var(--color-text-subtle)]">{label}</p>
    </div>
  );
}
