"use client";

import { useEffect, useRef, useState } from "react";
import { useChat } from "ai/react";
import { AnimatePresence, motion } from "framer-motion";
import { cx } from "@/lib/cx";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { restoreConversation, saveConversation, type StoredConversation } from "@/components/concierge/storage";

const suggestedOpeners = [
  "Who is keynoting this year?",
  "Where is the conference being held?",
  "Is childcare available?",
  "What accessibility accommodations do you offer?",
];

export function Concierge() {
  const [open, setOpen] = useState(false);
  const [offline, setOffline] = useState(false);
  const transcriptRef = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion();

  const { messages, input, handleInputChange, handleSubmit, isLoading, error, setMessages, append } = useChat({
    api: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/api/chat`,
    onResponse: async (response) => {
      if (response.status === 503) setOffline(true);
    },
    onError: () => {},
  });

  useEffect(() => {
    const restored = restoreConversation();
    if (restored && restored.messages.length > 0) setMessages(restored.messages);
  }, [setMessages]);

  useEffect(() => {
    saveConversation({ messages } as StoredConversation);
  }, [messages]);

  useEffect(() => {
    if (!open) return;
    transcriptRef.current?.scrollTo({ top: transcriptRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "?" && !open && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        setOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close Ava, the conference concierge" : "Open Ava, the conference concierge"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="group fixed bottom-5 right-5 z-40 inline-flex h-14 items-center gap-3 rounded-pill border border-border-strong bg-surface pl-5 pr-4 text-sm shadow-paper transition-transform hover:-translate-y-0.5 hover:shadow-glow md:bottom-8 md:right-8"
      >
        <ConciergeGlyph active={open} />
        <span className="font-serif italic tracking-tight">{open ? "Close Ava" : "Ask Ava"}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Ava, conference concierge"
            initial={prefersReduced ? undefined : { y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={prefersReduced ? undefined : { y: 12, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-5 z-50 flex h-[min(72vh,640px)] w-[min(92vw,420px)] flex-col overflow-hidden rounded-card border border-border-strong bg-surface shadow-paper md:right-8"
          >
            <header className="flex items-start gap-3 border-b border-border px-5 py-4">
              <ConciergeGlyph active />
              <div className="flex-1">
                <p className="font-serif text-lg leading-tight text-ink">Ava</p>
                <p className="text-xs text-muted-foreground">
                  AI concierge for The Synapse.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close concierge"
                className="rounded-full p-1 text-muted-foreground hover:text-ink"
              >
                <CloseIcon />
              </button>
            </header>

            <div ref={transcriptRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5 text-sm">
              {messages.length === 0 && !offline && (
                <div className="rounded-card border border-border bg-surface-raised px-4 py-3">
                  <p className="text-pretty text-muted-foreground">
                    Hello. I'm Ava, an AI concierge for The Synapse. I can
                    answer questions about registration, the program, access
                    accommodations, and the people behind the convening. Pick
                    something to start, or ask anything.
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {suggestedOpeners.map((question) => (
                      <li key={question}>
                        <button
                          type="button"
                          onClick={() => append({ role: "user", content: question })}
                          className="rounded-pill border border-border px-3 py-1 text-xs text-muted-foreground hover:border-border-strong hover:text-ink"
                        >
                          {question}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {offline && <OfflineBanner />}

              {messages.map((message) => (
                <MessageBubble key={message.id} role={message.role} content={renderContent(message.content)} />
              ))}

              {isLoading && <Typing />}

              {error && !offline && (
                <p role="alert" className="rounded-md border border-synapse-magenta/50 bg-synapse-magenta/10 px-3 py-2 text-xs">
                  Something interrupted that reply. Try again or email hello@thesynapse.example.
                </p>
              )}
            </div>

            <form
              onSubmit={(event) => {
                if (offline || isLoading) { event.preventDefault(); return; }
                handleSubmit(event);
              }}
              className="border-t border-border px-4 py-3"
            >
              <label className="flex items-end gap-2">
                <span className="sr-only">Your question for Ava</span>
                <textarea
                  name="message"
                  rows={1}
                  value={input}
                  onChange={handleInputChange}
                  placeholder={offline ? "Ava is offline in this environment." : "Ask about the program, logistics, access..."}
                  disabled={offline || isLoading}
                  className="flex-1 resize-none rounded-md border border-border-strong bg-surface-raised px-3 py-2 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      e.currentTarget.form?.requestSubmit();
                    }
                  }}
                />
                <button
                  type="submit"
                  disabled={offline || isLoading || input.trim().length === 0}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ink text-surface disabled:opacity-40"
                  aria-label="Send"
                >
                  <SendIcon />
                </button>
              </label>
              <p className="mt-2 text-[11px] text-muted-foreground">
                Ava is an AI assistant. She reads from the content on this site; email
                hello@thesynapse.example for anything she cannot answer.
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function renderContent(content: unknown): string {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .map((part) => (typeof part === "object" && part && "text" in part ? (part as { text: string }).text : ""))
      .join("");
  }
  return "";
}

function MessageBubble({ role, content }: { role: string; content: string }) {
  const { lead, followUps } = splitFollowUps(content);
  const isUser = role === "user";
  return (
    <div className={cx("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cx(
          "max-w-[88%] rounded-card px-4 py-3 text-pretty",
          isUser ? "bg-ink text-surface" : "border border-border bg-surface-raised text-ink",
        )}
      >
        {lead.split("\n").map((line, i) => (
          <p key={i} className={i > 0 ? "mt-2" : ""}>{line}</p>
        ))}
        {followUps.length > 0 && (
          <ul className="mt-3 space-y-1 border-t border-border/60 pt-3">
            {followUps.map((f, i) => (
              <li key={i} className="text-xs text-muted-foreground">
                <span className="font-mono text-muted-foreground">-&gt;</span> {f}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function splitFollowUps(content: string): { lead: string; followUps: string[] } {
  const lines = content.split("\n");
  const followUps: string[] = [];
  const lead: string[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("->") || trimmed.startsWith("-&gt;") || trimmed.startsWith("\u2192")) {
      followUps.push(trimmed.replace(/^->|^-&gt;|^\u2192/, "").trim());
    } else {
      lead.push(line);
    }
  }
  return { lead: lead.join("\n").trim(), followUps };
}

function Typing() {
  return (
    <div className="flex items-center gap-1 pl-2 text-muted-foreground">
      <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-current" />
      <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-current" style={{ animationDelay: "120ms" }} />
      <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-current" style={{ animationDelay: "240ms" }} />
    </div>
  );
}

function OfflineBanner() {
  return (
    <div className="rounded-card border border-border bg-surface-raised px-4 py-3 text-pretty text-muted-foreground">
      Ava is offline in this environment -- no model provider key is set. Email{" "}
      <a href="mailto:hello@thesynapse.example" className="underline decoration-gold-deep decoration-2 underline-offset-2 link-glow">
        hello@thesynapse.example
      </a>{" "}instead.
    </div>
  );
}

function ConciergeGlyph({ active }: { active: boolean }) {
  return (
    <span
      className={cx(
        "relative inline-flex h-8 w-8 items-center justify-center rounded-full border border-border-strong transition-colors",
        active ? "bg-ink text-surface" : "bg-surface-raised text-ink",
      )}
      aria-hidden="true"
    >
      <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
        <circle cx="7" cy="16" r="3.2" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="25" cy="16" r="3.2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M10.2 16c3-4 5.6-4 5.8-4s3 0 5.8 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8l10-5-4 12-2-5-4-2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" fill="currentColor" fillOpacity="0.15" />
    </svg>
  );
}
