"use client";

import { cn } from "@/lib/cn";

type NavItem = { label: string; href: string; action?: string };

const NAV_ITEMS: NavItem[] = [
  { label: "TOP", href: "#top" },
  { label: "TERMINAL", href: "#", action: "terminal:open" },
  { label: "ABOUT", href: "#about" },
  { label: "WORK", href: "#work" },
  { label: "SKILL", href: "#skill" },
  { label: "CONTACT", href: "#contact" },
];

export function SiteHeader() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-10"
      style={{
        background: "rgba(5, 5, 5, 0.8)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--color-line)",
      }}
    >
      <a
        href="#top"
        className="inline-block text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
        style={{ fontFamily: "var(--font-menu)", fontWeight: "bold", letterSpacing: "0.18em" }}
      >
        Jullien Lab
      </a>

      <nav aria-label="Main navigation">
        <ul
          className="flex items-center gap-6 md:gap-8"
          style={{ fontFamily: "var(--font-menu)", fontWeight: "bold" }}
        >
          {NAV_ITEMS.map(({ label, href, action }) => (
            <li key={label}>
              <a
                href={href}
                onClick={
                  action
                    ? (e) => {
                        e.preventDefault();
                        window.dispatchEvent(new CustomEvent(action));
                      }
                    : undefined
                }
                className={cn(
                  "text-sm tracking-widest text-[var(--color-text-subtle)] transition-colors hover:text-[var(--color-text)]",
                  "hidden md:inline-block"
                )}
                style={{ letterSpacing: "0.18em" }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
