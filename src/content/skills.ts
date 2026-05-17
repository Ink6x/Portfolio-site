import type { SkillDiagram } from "@/types/skill";

// Rating scale (1–5):
// 5 = 実務で使用できる（実務で3年以上の経験がある）
// 4 = 実務で使用ができる
// 3 = 実務経験はないが、教われば（あるいは慣れれば）できる
// 2 = 多少はできる
// 1 = あまりできない

export const SKILL_DIAGRAMS: SkillDiagram[] = [
  {
    title: "Languages",
    axes: [
      { label: "TypeScript", value: 4 },
      { label: "Python", value: 5 },
      { label: "JavaScript", value: 4 },
      { label: "SQL", value: 3 },
      { label: "Bash", value: 3 },
    ],
    tools: ["TypeScript", "Python", "JavaScript", "SQL", "Bash"],
  },
  {
    title: "AI / LLM",
    axes: [
      { label: "Claude API", value: 5 },
      { label: "OpenAI API", value: 4 },
      { label: "LangChain", value: 4 },
      { label: "LangGraph", value: 4 },
      { label: "RAG", value: 4 },
    ],
    tools: ["Claude API", "OpenAI API", "LangChain", "LangGraph", "RAG", "Mastra"],
  },
  {
    title: "Web / App",
    axes: [
      { label: "Next.js", value: 4 },
      { label: "React", value: 4 },
      { label: "FastAPI", value: 4 },
      { label: "Supabase", value: 3 },
      { label: "Tailwind CSS", value: 4 },
    ],
    tools: ["Next.js", "React", "FastAPI", "PostgreSQL", "Supabase", "Tailwind CSS"],
  },
  {
    title: "Infra / Tools",
    axes: [
      { label: "AWS", value: 3 },
      { label: "Docker", value: 3 },
      { label: "Vercel", value: 4 },
      { label: "GitHub Actions", value: 3 },
      { label: "Playwright", value: 3 },
    ],
    tools: ["AWS", "Docker", "Vercel", "GitHub Actions", "Playwright", "n8n"],
  },
];
