import { getAnthropicClient } from "./anthropic-client";
import { SYSTEM_PROMPT } from "./prompt";
import type { ValidatedChatInput } from "./validation";

export interface ChatResult {
  answer: string;
}

export async function runTerminalChat(input: ValidatedChatInput): Promise<ChatResult> {
  const client = getAnthropicClient();

  const messages = [
    ...input.history,
    { role: "user" as const, content: input.message },
  ];

  const response = await client.messages.create({
    model: process.env.ANTHROPIC_MODEL ?? "claude-haiku-4-5-20251001",
    max_tokens: 600,
    system: [
      {
        type: "text",
        text: SYSTEM_PROMPT,
        cache_control: { type: "ephemeral" },
      },
    ],
    messages,
  });

  const textBlock = response.content.find((b) => b.type === "text");
  const answer =
    textBlock?.type === "text" ? textBlock.text : "応答を受信できませんでした。";

  return { answer };
}
