export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

export type ChatRequest = {
  messages: ChatMessage[];
  locale: "en" | "ar";
};

export const MAX_MESSAGES = 24;
export const MAX_MESSAGE_CHARS = 2000;
