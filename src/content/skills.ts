import type { SkillDiagram } from "@/types/skill";

export const SKILL_DIAGRAMS: SkillDiagram[] = [
  {
    title: "Languages",
    axes: [
      { label: "TypeScript", value: 4 },
      { label: "Python", value: 4 },
      { label: "JavaScript", value: 4 },
      { label: "SQL", value: 3 },
      { label: "Bash", value: 3 },
    ],
    tools: ["TypeScript", "Python", "JavaScript", "SQL", "Bash"],
  },
  {
    title: "AI / LLM",
    axes: [
      { label: "Claude API", value: 4 },
      { label: "OpenAI API", value: 4 },
      { label: "LangChain", value: 4 },
      { label: "LangGraph", value: 4 },
      { label: "Mastra", value: 3 },
    ],
    tools: ["Claude API", "OpenAI API", "LangChain", "LangGraph", "Mastra", "RAG"],
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
      { label: "n8n", value: 4 },
    ],
    tools: ["AWS", "Docker", "Vercel", "GitHub Actions", "n8n", "Playwright"],
  },
];
