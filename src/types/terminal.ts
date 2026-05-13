export type MessageRole = "user" | "assistant" | "system";

export interface TerminalMessage {
  role: MessageRole;
  content: string;
}

export interface TerminalChatRequest {
  message: string;
  history?: Array<{ role: "user" | "assistant"; content: string }>;
}

export interface TerminalChatResponse {
  answer: string;
  sources?: string[];
}

export type TerminalMode = "command" | "ai";

export type TerminalLine =
  | { type: "input"; text: string; mode?: TerminalMode }
  | { type: "output"; text: string }
  | { type: "error"; text: string }
  | { type: "system"; text: string };

export interface TerminalWindowData {
  id: number;
  label: string;
  path: string;
  lines: TerminalLine[];
  inputHistory: string[];
}
