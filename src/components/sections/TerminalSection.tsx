import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TerminalWindow } from "@/components/terminal/TerminalWindow";

export function TerminalSection() {
  return (
    <section
      id="terminal"
      className="py-24 md:py-32"
      aria-labelledby="terminal-heading"
    >
      <Container className="flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <SectionLabel>ASK</SectionLabel>
          <p
            className="text-xs text-[var(--color-text-subtle)]"
            id="terminal-heading"
          >
            Jullienについて知りたいことを、ターミナルから質問できます。
          </p>
        </div>
        <TerminalWindow />
      </Container>
    </section>
  );
}
