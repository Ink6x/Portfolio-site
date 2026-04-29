import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { WorkCard } from "@/components/work/WorkCard";
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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WORKS.map((work) => (
            <WorkCard key={work.slug} work={work} />
          ))}
        </div>
      </Container>
    </section>
  );
}
