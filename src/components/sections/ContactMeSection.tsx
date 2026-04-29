import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { LINKS } from "@/content/links";

interface ContactLinkProps {
  href: string;
  label: string;
}

function ContactLink({ href, label }: ContactLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="border border-[var(--color-line)] px-6 py-3 text-sm text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-line-strong)] hover:text-[var(--color-text)]"
      style={{ fontFamily: "var(--font-menu)" }}
    >
      {label}
    </a>
  );
}

export function ContactMeSection() {
  const links = [
    LINKS.email && { href: `mailto:${LINKS.email}`, label: "Email" },
    LINKS.x && { href: LINKS.x, label: "X" },
    LINKS.github && { href: LINKS.github, label: "GitHub" },
  ].filter(Boolean) as ContactLinkProps[];

  const hasLinks = links.length > 0;

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

        {hasLinks ? (
          <div className="flex flex-wrap gap-4">
            {links.map(({ href, label }) => (
              <ContactLink key={label} href={href} label={label} />
            ))}
          </div>
        ) : (
          <p className="text-xs text-[var(--color-text-subtle)]">
            Contact links: TODO
          </p>
        )}
      </Container>
    </section>
  );
}
