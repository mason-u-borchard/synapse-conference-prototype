"use client";

import { useState, type FormEvent } from "react";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

export function KeepInLoopForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (String(data.get("company_website") ?? "").length > 0) {
      setStatus({ kind: "success" });
      return;
    }

    const fullName = String(data.get("fullName") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const note = String(data.get("note") ?? "").trim();
    const message = note.length > 0
      ? `Keep me in the loop about The Synapse. ${note}`
      : "Keep me in the loop about The Synapse -- notify me when the application window opens.";

    setStatus({ kind: "submitting" });
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/api/submit-form`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "contact",
          payload: { fullName, email, message },
        }),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.message ?? `Could not save your details (${response.status})`);
      }
      setStatus({ kind: "success" });
      form.reset();
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Could not save your details.";
      setStatus({ kind: "error", message: msg });
    }
  }

  if (status.kind === "success") {
    return (
      <div className="paper p-8">
        <p className="eyebrow mb-2 text-muted-foreground">You're on the list</p>
        <p className="font-serif text-xl text-ink">
          We'll reach out when the application window opens.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="paper space-y-5 p-8">
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block font-serif text-sm text-ink">
            Full name <span className="ml-1 text-synapse-magenta" aria-hidden="true">*</span>
          </span>
          <input required type="text" name="fullName" autoComplete="name" className="kil-input" />
        </label>
        <label className="block">
          <span className="mb-2 block font-serif text-sm text-ink">
            Email <span className="ml-1 text-synapse-magenta" aria-hidden="true">*</span>
          </span>
          <input required type="email" name="email" autoComplete="email" className="kil-input" />
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block font-serif text-sm text-ink">A line about your interest</span>
        <span className="mb-2 block text-xs text-muted-foreground">
          Optional -- a sentence on who you are or what you'd hope to bring helps us when we reach back out.
        </span>
        <textarea name="note" rows={3} className="kil-input resize-y" />
      </label>

      {status.kind === "error" && (
        <p role="alert" className="rounded-md border border-synapse-magenta/60 bg-synapse-magenta/10 px-4 py-3 text-sm">
          {status.message}
        </p>
      )}

      <div className="flex items-center gap-4">
        <button type="submit" className="btn btn-primary" disabled={status.kind === "submitting"}>
          {status.kind === "submitting" ? "Sending" : "Keep me in the loop"}
        </button>
        <p className="text-xs text-muted-foreground">
          One email when the application window opens. No newsletters.
        </p>
      </div>

      <style>{`
        .kil-input {
          display: block;
          width: 100%;
          background: hsl(var(--surface));
          border: 1px solid hsl(var(--border-strong));
          border-radius: 8px;
          padding: 0.65rem 0.9rem;
          font: inherit;
          color: hsl(var(--ink));
          transition: border-color 180ms ease;
        }
        .kil-input:focus {
          outline: none;
          border-color: hsl(var(--gold));
          box-shadow: 0 0 0 3px hsl(var(--gold) / 0.25);
        }
      `}</style>
    </form>
  );
}
