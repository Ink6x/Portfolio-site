import { cn } from "@/lib/cn";

interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

export function LinkButton({
  href,
  children,
  className,
  external = false,
}: LinkButtonProps) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center gap-2 border border-[var(--color-line)] px-4 py-2 text-sm text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-line-strong)] hover:text-[var(--color-text)] focus-visible:outline-2 focus-visible:outline-offset-2",
        className
      )}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {children}
    </a>
  );
}
