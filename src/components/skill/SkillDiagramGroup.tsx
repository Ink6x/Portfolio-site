import { PentagonSkillChart } from "./PentagonSkillChart";
import { SKILL_DIAGRAMS } from "@/content/skills";

export function SkillDiagramGroup() {
  return (
    <div className="grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8">
      {SKILL_DIAGRAMS.map((diagram) => (
        <PentagonSkillChart key={diagram.title} diagram={diagram} />
      ))}
    </div>
  );
}
