import type { Message } from "ai";

const KEY = "synapse-ava-transcript";

export interface StoredConversation { messages: Message[]; }

export function restoreConversation(): StoredConversation | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { messages?: Message[] };
    if (!parsed.messages || !Array.isArray(parsed.messages)) return null;
    return { messages: parsed.messages };
  } catch {
    return null;
  }
}

export function saveConversation(convo: StoredConversation) {
  if (typeof window === "undefined") return;
  try {
    if (!convo.messages || convo.messages.length === 0) {
      window.localStorage.removeItem(KEY);
      return;
    }
    const messages = convo.messages.slice(-40);
    window.localStorage.setItem(KEY, JSON.stringify({ messages }));
  } catch {
    // quota / private browsing -- silently drop
  }
}
