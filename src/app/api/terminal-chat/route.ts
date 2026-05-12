import { NextRequest, NextResponse } from "next/server";
import type { TerminalChatRequest, TerminalChatResponse } from "@/types/terminal";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as TerminalChatRequest;

  if (!body.message || typeof body.message !== "string") {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }

  // TODO: Integrate with Anthropic Claude API once API key is configured
  const response: TerminalChatResponse = {
    answer:
      "AIモードは近日公開予定です。現在は静的コマンドのみ対応しています。",
  };

  return NextResponse.json(response);
}
