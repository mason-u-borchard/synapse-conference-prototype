"use client";

import { useState, type FormEvent } from "react";
import { cx } from "@/lib/cx";

type Role = "researcher" | "practitioner" | "student" | "other";
type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; confirmationId?: string }
  | { kind: "error"; message: string };

export function RegisterForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [role, setRole] = useState<Role>("researcher");
  const [needsGrant, setNeedsGrant] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (String(data.get("company_website") ?? "").length > 0) {
      setStatus({ kind: "success" });
      return;
    }
    setStatus({ kind: "submitting" });

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/api/submit-form`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "registration",
          payload: Object.fromEntries(data.entries()),
        }),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.message ?? `Registration failed (${response.status})`);
      }
      const body = await response.json();
      setStatus({ kind: "success", confirmationId: body.confirmationId });
      form.reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Registration failed";
      setStatus({ kind: "error", message });
    }
  }

  if (status.kind === "success") {
    return (
      <div className="paper p-10 text-center">
        <p className="eyebrow mb-3 text-muted-foreground">Confirmed</p>
        <h2 className="font-serif text-3xl text-ink">You're on the list.</h2>
        <p className="mt-4 max-w-prose text-pretty text-muted-foreground">
          A confirmation email is on its way. If you flagged access needs or a
          grant application, the relevant lead will reach out separately within
          72 hours.
        </p>
        {status.confirmationId && (
          <p className="mt-5 font-mono text-xs text-muted-foreground">Confirmation: {status.confirmationId}</p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="paper space-y-6 p-8">
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <FieldRow>
        <Field label="Full name" required>
          <input required type="text" name="fullName" autoComplete="name" className="field-input" />
        </Field>
        <Field label="Pronouns">
          <input type="text" name="pronouns" className="field-input" placeholder="e.g., she / her" />
        </Field>
      </FieldRow>

      <FieldRow>
        <Field label="Email" required>
          <input required type="email" name="email" autoComplete="email" className="field-input" />
        </Field>
        <Field label="Affiliation" required>
          <input required type="text" name="affiliation" className="field-input" placeholder="University, lab, or organization" />
        </Field>
      </FieldRow>

      <Field label="I am a..." required>
        <div role="radiogroup" className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {(
            [
              { value: "researcher", label: "Researcher" },
              { value: "practitioner", label: "Practitioner" },
              { value: "student", label: "Student" },
              { value: "other", label: "Other" },
            ] as { value: Role; label: string }[]
          ).map((opt) => (
            <label
              key={opt.value}
              className={cx(
                "cursor-pointer rounded-md border px-4 py-3 text-sm text-center transition-colors",
                role === opt.value
                  ? "border-ink bg-ink text-surface"
                  : "border-border text-muted-foreground hover:border-border-strong hover:text-ink",
              )}
            >
              <input
                type="radio"
                name="role"
                value={opt.value}
                checked={role === opt.value}
                onChange={() => setRole(opt.value)}
                className="sr-only"
                required
              />
              {opt.label}
            </label>
          ))}
        </div>
      </Field>

      <Field label="Talk interests">
        <p className="eyebrow mb-3 text-muted-foreground">Select any that reflect your focus.</p>
        <div className="flex flex-wrap gap-2">
          {[
            "consciousness",
            "cognitive neuroscience",
            "philosophy of mind",
            "AI alignment",
            "contemplative neuroscience",
            "quantum cognition",
          ].map((interest) => (
            <label
              key={interest}
              className="cursor-pointer rounded-pill border border-border px-3 py-1 text-xs text-muted-foreground has-[:checked]:border-ink has-[:checked]:bg-ink has-[:checked]:text-surface"
            >
              <input type="checkbox" name="interests" value={interest} className="sr-only" />
              {interest}
            </label>
          ))}
        </div>
      </Field>

      <Field label="Dietary restrictions" description="Optional -- we plate accordingly.">
        <input type="text" name="dietary" className="field-input" />
      </Field>

      <Field label="Access needs" description="Optional -- the access lead will follow up within 72 hours. No detail is too small.">
        <textarea name="access" rows={3} className="field-input resize-y" />
      </Field>

      <Field label="Travel grant">
        <label className="flex cursor-pointer items-start gap-3 text-sm text-muted-foreground">
          <input
            type="checkbox"
            name="grantInterest"
            checked={needsGrant}
            onChange={(e) => setNeedsGrant(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-border-strong"
          />
          <span>
            I am applying as a doctoral researcher or early-career practitioner
            and would like to be considered for a travel grant.
          </span>
        </label>
      </Field>

      {needsGrant && (
        <Field label="Brief context for the grant committee">
          <textarea name="grantContext" rows={3} className="field-input resize-y" placeholder="A few sentences is plenty." />
        </Field>
      )}

      <Field label="How did you hear about The Synapse?" description="Optional.">
        <input type="text" name="referral" className="field-input" />
      </Field>

      {status.kind === "error" && (
        <p role="alert" className="rounded-md border border-synapse-magenta/60 bg-synapse-magenta/10 px-4 py-3 text-sm">
          {status.message}
        </p>
      )}

      <div className="flex items-center gap-4">
        <button type="submit" className="btn btn-primary" disabled={status.kind === "submitting"}>
          {status.kind === "submitting" ? (<><Spinner /> Sending</>) : <>Register</>}
        </button>
        <p className="text-xs text-muted-foreground">
          We send a single confirmation email. No newsletters, no share-backs.
        </p>
      </div>

      <style>{`
        .field-input {
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
        .field-input:focus {
          outline: none;
          border-color: hsl(var(--gold));
          box-shadow: 0 0 0 3px hsl(var(--gold) / 0.25);
        }
      `}</style>
    </form>
  );
}

function FieldRow({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 md:grid-cols-2">{children}</div>;
}

function Field({ label, description, required, children }: {
  label: string; description?: string; required?: boolean; children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-serif text-sm text-ink">
        {label}{required && <span className="ml-1 text-synapse-magenta" aria-hidden="true">*</span>}
      </span>
      {description && <span className="mb-2 block text-xs text-muted-foreground">{description}</span>}
      {children}
    </label>
  );
}

function Spinner() {
  return (
    <span aria-hidden="true" className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-surface/40 border-t-surface" />
  );
}
