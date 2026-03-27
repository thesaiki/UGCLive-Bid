import type { ChatMessage } from "@ugclive/shared";
import { appendChatMessage } from "../live/session-store";

export function createChatMessage(sessionId: string, author: string, body: string) {
  const message: ChatMessage = {
    id: `chat-${Date.now()}`,
    author,
    body,
    createdAt: new Date().toISOString()
  };

  const session = appendChatMessage(sessionId, message);

  if (!session) {
    return { ok: false as const, reason: "Session not found" };
  }

  return { ok: true as const, message };
}

