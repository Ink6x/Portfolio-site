import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SkillDiagramGroup } from "@/components/skill/SkillDiagramGroup";
import { LINKS } from "@/content/links";

export function SkillStackSection() {
  return (
    <section
      id="skill"
      className="py-24 md:py-32"
      aria-labelledby="skill-heading"
    >
      <Container>
        <div className="mb-10 flex flex-col gap-3">
          <SectionLabel>SKILL STACK</SectionLabel>
          <p
            className="text-xs text-[var(--color-text-subtle)]"
            id="skill-heading"
          >
            実務で使用した技術を中心に、Languages・AI/LLM・Web/App・Infra の4領域で整理しています。
          </p>
        </div>

        <SkillDiagramGroup />

        {LINKS.stackshare && (
          <div className="mt-10 text-center">
            <a
              href={LINKS.stackshare}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[var(--color-text-subtle)] underline-offset-2 hover:text-[var(--color-text-muted)] hover:underline"
            >
              Full stack on StackShare →
            </a>
          </div>
        )}
      </Container>
    </section>
  );
}
