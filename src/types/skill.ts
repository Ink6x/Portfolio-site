export interface SkillAxis {
  label: string;
  value: number; // 0-5
}

export interface SkillDiagram {
  title: string;
  axes: SkillAxis[];
  tools: string[];
}
