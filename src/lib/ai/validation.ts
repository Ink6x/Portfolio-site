export interface ValidatedChatInput {
  message: string;
  history: Array<{ role: "user" | "assistant"; content: string }>;
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export function parseChatRequest(input: unknown): ValidatedChatInput {
  if (!input || typeof input !== "object") {
    throw new ValidationError("Invalid request body");
  }

  const body = input as Record<string, unknown>;

  if (typeof body.message !== "string" || body.message.trim().length === 0) {
    throw new ValidationError("message is required");
  }
  if (body.message.trim().length > 500) {
    throw new ValidationError("message too long (max 500 characters)");
  }

  const history: Array<{ role: "user" | "assistant"; content: string }> = [];

  if (body.history !== undefined) {
    if (!Array.isArray(body.history)) {
      throw new ValidationError("history must be an array");
    }
    if (body.history.length > 10) {
      throw new ValidationError("history too long (max 10 entries)");
    }
    for (const entry of body.history) {
      if (!entry || typeof entry !== "object") {
        throw new ValidationError("Invalid history entry");
      }
      const e = entry as Record<string, unknown>;
      if (e.role !== "user" && e.role !== "assistant") {
        throw new ValidationError("Invalid history role");
      }
      if (typeof e.content !== "string" || e.content.length > 2000) {
        throw new ValidationError("Invalid history content");
      }
      history.push({ role: e.role as "user" | "assistant", content: e.content });
    }
  }

  return { message: body.message.trim(), history };
}
