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
      { label: "C#", value: 2 },
      { label: "R", value: 2 },
    ],
    tools: ["TypeScript", "Python", "JavaScript", "C#", "R"],
  },
  {
    title: "AI / LLM",
    axes: [
      { label: "LLM API", value: 5 },
      { label: "RAG", value: 4 },
      { label: "NumPy", value: 4 },
      { label: "Pandas", value: 4 },
      { label: "scikit-learn", value: 3 },
    ],
    tools: ["LLM API", "RAG", "NumPy", "Pandas", "scikit-learn", "OpenAI API", "LangChain", "LangGraph", "Mastra"],
  },
  {
    title: "Web / App",
    axes: [
      { label: "Next.js", value: 4 },
      { label: "React", value: 4 },
      { label: "Node.js", value: 4 },
      { label: "Prisma", value: 4 },
      { label: "Tailwind CSS", value: 4 },
    ],
    tools: ["Next.js", "React", "Node.js", "Prisma", "Tailwind CSS", "PostgreSQL", "FastAPI", "Supabase"],
  },
  {
    title: "Infra / Tools",
    axes: [
      { label: "AWS", value: 4 },
      { label: "Docker", value: 4 },
      { label: "Vercel", value: 4 },
      { label: "Linux", value: 3 },
      { label: "Playwright", value: 4 },
    ],
    tools: ["AWS", "Docker", "Vercel", "Linux", "Playwright", "n8n", "GitHub Actions"],
  },
];
