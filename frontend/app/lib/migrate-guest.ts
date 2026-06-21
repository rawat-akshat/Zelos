import { api } from "./api";
import { clearGuestSession, getGuestChat } from "./guest-session";
import type { ApiSession } from "./api";

export async function migrateGuestChatIfAny(): Promise<ApiSession | null> {
  const chat = getGuestChat();
  if (!chat || chat.messages.length === 0) return null;

  const messages = chat.messages
    .filter((m) => m.role === "user" || m.role === "assistant")
    .map((m) => ({ role: m.role, content: m.content }));

  if (messages.length === 0) {
    clearGuestSession();
    return null;
  }

  try {
    const session = await api.importGuestSession({
      title: chat.title,
      goal: chat.title,
      messages,
    });
    clearGuestSession();
    return session;
  } catch {
    return null;
  }
}
