import { cn } from "@/lib/cn";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "text-[28px] tracking-[0.25em] uppercase text-[var(--color-text-subtle)]",
        className
      )}
      style={{ fontFamily: "var(--font-menu)", fontWeight: "bold", transform: "scaleX(1.3)", transformOrigin: "left" }}
    >
      {children}
    </p>
  );
}
