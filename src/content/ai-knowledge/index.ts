import type { Work, WorkMetric } from "@/types/work";
import type { SkillDiagram } from "@/types/skill";
import { WORKS } from "@/content/works";
import { SKILL_DIAGRAMS } from "@/content/skills";
import { BIO_KNOWLEDGE } from "./bio";
import { KNOWLEDGE_POLICIES } from "./policies";

function serializeMetric(m: WorkMetric): string {
  return m.before ? `${m.label}: ${m.before} → ${m.after}` : `${m.label}: ${m.after}`;
}

function serializeWork(work: Work): string {
  const lines: string[] = [`### ${work.name}`];

  if (work.summary && !work.summary.startsWith("TODO:")) {
    lines.push(`概要: ${work.summary}`);
  }

  lines.push(`担当: ${work.role.join(", ")}`);
  lines.push(`技術スタック: ${work.stack.join(", ")}`);

  if (work.context) lines.push(`背景: ${work.context}`);
  if (work.whatIBuilt) lines.push(`実装内容: ${work.whatIBuilt}`);
  if (work.result) lines.push(`成果: ${work.result}`);

  if (work.metrics?.length) {
    lines.push(`数値実績: ${work.metrics.map(serializeMetric).join(" / ")}`);
  }

  if (work.githubUrl && work.status === "public") {
    lines.push(`GitHub: ${work.githubUrl}`);
  }

  return lines.join("\n");
}

function serializeSkillDiagram(d: SkillDiagram): string {
  const axes = d.axes.map((a) => `${a.label}(${a.value}/5)`).join(", ");
  const tools = d.tools.join(", ");
  return `### ${d.title}\n軸スコア: ${axes}\n使用ツール: ${tools}`;
}

// Assembled once at module load — stable string required for Prompt Caching hits
const KNOWLEDGE_CONTEXT = [
  BIO_KNOWLEDGE,
  "\n## Works（プロジェクト）",
  WORKS.map(serializeWork).join("\n\n"),
  "\n## Skills（スキルスタック）",
  SKILL_DIAGRAMS.map(serializeSkillDiagram).join("\n\n"),
].join("\n");

export function buildKnowledgeContext(): string {
  return KNOWLEDGE_CONTEXT;
}

export { KNOWLEDGE_POLICIES };
