import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { LINKS } from "@/content/links";


export function ContactMeSection() {
  return (
    <section
      id="contact"
      className="py-24 md:py-32"
      aria-labelledby="contact-heading"
    >
      <Container>
        <div className="mb-10 flex flex-col gap-3">
          <SectionLabel>CONTACT ME</SectionLabel>
          <p
            className="text-xs text-[var(--color-text-subtle)]"
            id="contact-heading"
          >
            AI導入、AIエージェント開発、WebアプリへのAI組み込みなど、相談内容に応じてご連絡ください。
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {LINKS.email && (
            <p
              className="text-sm text-[var(--color-text-muted)]"
              style={{ fontFamily: "var(--font-terminal)" }}
            >
              <span className="text-[var(--color-text-subtle)]">email: </span>
              {LINKS.email}
            </p>
          )}

          {LINKS.github && (
            <a
              href={LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
              style={{ fontFamily: "var(--font-terminal)" }}
            >
              <span className="text-[var(--color-text-subtle)]">github: </span>
              {LINKS.github}
            </a>
          )}

          {LINKS.x && (
            <a
              href={LINKS.x}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
              style={{ fontFamily: "var(--font-terminal)" }}
            >
              <span className="text-[var(--color-text-subtle)]">x: </span>
              {LINKS.x}
            </a>
          )}
        </div>
      </Container>
    </section>
  );
}
