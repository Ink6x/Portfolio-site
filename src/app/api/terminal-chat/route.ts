import { NextRequest, NextResponse } from "next/server";
import { runTerminalChat } from "@/lib/ai/chat";
import { parseChatRequest, ValidationError } from "@/lib/ai/validation";
import { checkRateLimit } from "@/lib/ai/rate-limit";
import type { TerminalChatResponse } from "@/types/terminal";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  const rateLimit = checkRateLimit(ip);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests" },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfter ?? 60) },
      }
    );
  }

  let input;
  try {
    const body: unknown = await request.json();
    input = parseChatRequest(body);
  } catch (err) {
    if (err instanceof ValidationError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  try {
    const result = await runTerminalChat(input);
    const response: TerminalChatResponse = { answer: result.answer };
    return NextResponse.json(response);
  } catch (err) {
    console.error(
      "[terminal-chat] Upstream error:",
      err instanceof Error ? err.message : "unknown"
    );
    return NextResponse.json(
      { error: "AIモードで一時的なエラーが発生しました。" },
      { status: 502 }
    );
  }
}
