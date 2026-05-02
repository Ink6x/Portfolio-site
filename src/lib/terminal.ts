import { TERMINAL_KNOWLEDGE } from "@/content/terminal-knowledge";
import type { TerminalLine } from "@/types/terminal";

export function processCommand(raw: string): TerminalLine[] {
  const input = raw.trim().toLowerCase();
  const firstWord = input.split(/\s+/)[0];

  switch (firstWord) {
    case "help":
      return [{ type: "output", text: TERMINAL_KNOWLEDGE.help }];

    case "whoami":
      return [{ type: "output", text: TERMINAL_KNOWLEDGE.whoami }];

    case "work":
      return [{ type: "output", text: TERMINAL_KNOWLEDGE.work }];

    case "skills":
      return [{ type: "output", text: TERMINAL_KNOWLEDGE.skills }];

    case "contact":
      return [{ type: "output", text: TERMINAL_KNOWLEDGE.contact }];

    case "clear":
      return [{ type: "system", text: "__clear__" }];

    case "ai":
      return [
        {
          type: "output",
          text: "AIモードは近日公開予定です。現在は静的コマンドのみ対応しています。",
        },
      ];

    default:
      if (input === "") {
        return [];
      }
      return [
        {
          type: "error",
          text: `command not found: ${firstWord}. Type 'help' for available commands.`,
        },
      ];
  }
}
