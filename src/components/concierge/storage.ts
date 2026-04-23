import type { Message } from "ai";

// Currently unused by the live Concierge -- Ava is intentionally
// ephemeral (fresh on every page load). Kept so we can turn caching
// back on later, e.g. restoreConversation({ maxAgeMs: 30 * 60_000 })
// for a 30-minute session window.

const KEY = "synapse-ava-transcript";

export interface StoredConversation {
  messages: Message[];
  savedAt?: number;
}

export interface RestoreOptions {
  /** If set, any transcript older than this many ms is discarded. */
  maxAgeMs?: number;
}

export function restoreConversation(opts: RestoreOptions = {}): StoredConversation | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { messages?: Message[]; savedAt?: number };
    if (!parsed.messages || !Array.isArray(parsed.messages)) return null;

    if (opts.maxAgeMs && typeof parsed.savedAt === "number") {
      if (Date.now() - parsed.savedAt > opts.maxAgeMs) {
        window.localStorage.removeItem(KEY);
        return null;
      }
    }

    return { messages: parsed.messages, savedAt: parsed.savedAt };
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
    window.localStorage.setItem(
      KEY,
      JSON.stringify({ messages, savedAt: Date.now() }),
    );
  } catch {
    // quota / private browsing -- silently drop
  }
}

export function clearConversation() {
  if (typeof window === "undefined") return;
  try { window.localStorage.removeItem(KEY); } catch {}
}
