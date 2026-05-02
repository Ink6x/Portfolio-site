import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { WorkGrid } from "@/components/work/WorkGrid";
import { WORKS } from "@/content/works";

export function WorkSection() {
  return (
    <section
      id="work"
      className="py-24 md:py-32"
      aria-labelledby="work-heading"
    >
      <Container>
        <div className="mb-10 flex flex-col gap-3">
          <SectionLabel>WORK</SectionLabel>
          <h2
            id="work-heading"
            className="sr-only"
          >
            Work
          </h2>
        </div>

        <WorkGrid works={WORKS} />
      </Container>
    </section>
  );
}
