"use client";

import { useState, type FormEvent } from "react";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

// Per Figma 56:4450 Highlights, the Notify me button is disabled
// until the email field holds a valid address. Keep this regex
// lenient (matches the standard "looks like an email" shape) so
// the button enables as soon as someone finishes typing.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NotifyForm({ id, className }: { id: string; className?: string }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [email, setEmail] = useState("");
  const isValidEmail = EMAIL_RE.test(email.trim());

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (String(data.get("company_website") ?? "").length > 0) {
      setStatus({ kind: "success" });
      return;
    }

    const submittedEmail = String(data.get("email") ?? "").trim();
    if (!submittedEmail) {
      setStatus({ kind: "error", message: "Please enter your email." });
      return;
    }

    setStatus({ kind: "submitting" });
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/api/submit-form`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "contact",
          payload: {
            fullName: "Notify list",
            email: submittedEmail,
            message: "Notify me when applications open.",
          },
        }),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.message ?? `Could not save your details (${response.status})`);
      }
      setStatus({ kind: "success" });
      setEmail("");
      form.reset();
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Could not save your details.";
      setStatus({ kind: "error", message: msg });
    }
  }

  if (status.kind === "success") {
    return (
      <div
        className={[
          "flex w-full max-w-[460px] items-center rounded-full border border-off-black/20 bg-oxide-100/40 px-5 py-3 font-sans text-base text-off-black",
          className ?? "",
        ].join(" ")}
        role="status"
        aria-live="polite"
      >
        You&rsquo;re on the list &mdash; we&rsquo;ll be in touch when applications open.
      </div>
    );
  }

  return (
    <div className={className ?? ""}>
      <form
        id={id}
        onSubmit={onSubmit}
        noValidate
        className="flex w-full max-w-[460px] items-stretch overflow-hidden rounded-full border border-off-black/20 bg-off-white"
      >
        <input
          type="text"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
        />
        <label htmlFor={`${id}-email`} className="sr-only">
          Email address
        </label>
        <input
          id={`${id}-email`}
          type="email"
          name="email"
          required
          placeholder="email@example.com"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-transparent px-5 py-3 font-sans text-base text-off-black placeholder:text-off-black/40 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!isValidEmail || status.kind === "submitting"}
          aria-disabled={!isValidEmail || status.kind === "submitting"}
          className="m-1 inline-flex items-center btn-solid-glow rounded-full bg-oxide-100 px-5 font-noto text-base font-semibold text-off-black transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {status.kind === "submitting" ? "Sending…" : "Notify me"}
        </button>
      </form>
      {status.kind === "error" && (
        <p
          role="alert"
          className="mt-3 max-w-[460px] rounded-md border border-fire/60 bg-fire/10 px-4 py-2 font-sans text-sm text-off-black"
        >
          {status.message}
        </p>
      )}
    </div>
  );
}
