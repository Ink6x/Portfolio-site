import type { SkillDiagram } from "@/types/skill";

export const SKILL_DIAGRAMS: SkillDiagram[] = [
  {
    title: "AI Systems",
    axes: [
      { label: "LLM Integration", value: 4 },
      { label: "Agent Design", value: 4 },
      { label: "RAG / Knowledge", value: 3 },
      { label: "Prompt / Eval", value: 4 },
      { label: "AI Workflow", value: 4 },
    ],
    tools: ["OpenAI API", "Claude API", "LangChain", "LangGraph", "Mastra", "RAG"],
  },
  {
    title: "Web Application",
    axes: [
      { label: "Frontend", value: 4 },
      { label: "Backend", value: 4 },
      { label: "API Design", value: 3 },
      { label: "Database", value: 3 },
      { label: "UI Implementation", value: 4 },
    ],
    tools: ["Next.js", "React", "TypeScript", "Python", "FastAPI", "PostgreSQL", "Supabase", "Tailwind CSS"],
  },
  {
    title: "Cloud / Automation",
    axes: [
      { label: "Cloud", value: 3 },
      { label: "Container", value: 3 },
      { label: "CI/CD", value: 3 },
      { label: "Automation", value: 4 },
      { label: "Testing", value: 3 },
    ],
    tools: ["AWS", "Docker", "Vercel", "GitHub Actions", "n8n", "Playwright"],
  },
];
