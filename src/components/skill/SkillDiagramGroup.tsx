import { PentagonSkillChart } from "./PentagonSkillChart";
import { SKILL_DIAGRAMS } from "@/content/skills";

export function SkillDiagramGroup() {
  return (
    <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-10">
      {SKILL_DIAGRAMS.map((diagram) => (
        <PentagonSkillChart key={diagram.title} diagram={diagram} />
      ))}
    </div>
  );
}
