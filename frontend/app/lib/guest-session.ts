import type { ChatMessage } from "./types";
import { GUEST_CHAT_KEY } from "./api";
import { deriveTitleFromMessage } from "./mappers";

export interface GuestChat {
  id: string;
  title: string;
  messages: ChatMessage[];
  turnCount: number;
  createdAt: string;
}

function readChat(): GuestChat | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(GUEST_CHAT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as GuestChat;
    if (!parsed?.id || !Array.isArray(parsed.messages)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeChat(chat: GuestChat | null) {
  if (typeof window === "undefined") return;
  if (!chat) {
    sessionStorage.removeItem(GUEST_CHAT_KEY);
    return;
  }
  sessionStorage.setItem(GUEST_CHAT_KEY, JSON.stringify(chat));
}

/** Start a fresh guest chat — previous chat is discarded (ChatGPT-style). */
export function startNewGuestChat(): void {
  writeChat(null);
}

export function getGuestChat(): GuestChat | null {
  return readChat();
}

export function getGuestTurnCount(): number {
  return readChat()?.turnCount ?? 0;
}

export function getGuestMessages(): ChatMessage[] {
  return readChat()?.messages ?? [];
}

export function ensureGuestChat(firstMessage?: string): GuestChat {
  const existing = readChat();
  if (existing) return existing;

  const title = firstMessage
    ? deriveTitleFromMessage(firstMessage)
    : "New conversation";

  const chat: GuestChat = {
    id: `guest-${Date.now()}`,
    title,
    messages: [],
    turnCount: 0,
    createdAt: new Date().toISOString(),
  };
  writeChat(chat);
  return chat;
}

export function appendGuestTurn(
  userMessage: ChatMessage,
  assistantMessage: ChatMessage
): GuestChat {
  const chat = readChat() ?? ensureGuestChat(userMessage.content);
  const updated: GuestChat = {
    ...chat,
    title: chat.turnCount === 0 ? deriveTitleFromMessage(userMessage.content) : chat.title,
    messages: [...chat.messages, userMessage, assistantMessage],
    turnCount: chat.turnCount + 1,
  };
  writeChat(updated);
  return updated;
}

export function clearGuestSession(): void {
  writeChat(null);
}

export function hasGuestChatToMigrate(): boolean {
  const chat = readChat();
  return Boolean(chat && chat.messages.length > 0);
}
