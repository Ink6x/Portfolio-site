import { buildKnowledgeContext, KNOWLEDGE_POLICIES } from "@/content/ai-knowledge";

// Assembled once at module load — a stable, deterministic string is required for
// Prompt Caching to produce cache hits across requests.
export const SYSTEM_PROMPT = `あなたはInk6xのポートフォリオサイトに設置されたAIアシスタントです。
訪問者の質問に、以下の知識ベースの情報だけを使って回答します。

${KNOWLEDGE_POLICIES}

[知識ベース START]
${buildKnowledgeContext()}
[知識ベース END]`;
