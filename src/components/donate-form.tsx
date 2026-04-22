"use client";

import { useState } from "react";
import { cx } from "@/lib/cx";
import { meta } from "@/lib/content";

const presetAmounts = [50, 125, 250, 500] as const;
type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "stub"; message: string }
  | { kind: "disabled"; message: string }
  | { kind: "error"; message: string };

interface Props {
  providerName: string;
  providerLabel: string;
  embedOnly: boolean;
  embedUrl?: string;
}

export function DonateForm({ providerName, providerLabel, embedOnly, embedUrl }: Props) {
  // For embed providers we just render a link out to their hosted form.
  // No /api/donate call is made -- see src/lib/donations/README.md.
  if (embedOnly) {
    return <EmbedDonateCard providerLabel={providerLabel} embedUrl={embedUrl} />;
  }
  if (providerName === "none") {
    return <PausedDonateCard />;
  }
  return <StripeStyleForm providerLabel={providerLabel} />;
}

function EmbedDonateCard({ providerLabel, embedUrl }: { providerLabel: string; embedUrl?: string }) {
  return (
    <section className="paper space-y-5 p-8">
      <p className="eyebrow text-muted-foreground">Via {providerLabel}</p>
      <p className="text-lg text-pretty text-muted-foreground">
        The committee has chosen {providerLabel} as the donation platform.
        Donations are processed on their site; your receipt arrives from{" "}
        <a href={meta.fiscalSponsor.href} target="_blank" rel="noreferrer" className="underline decoration-gold/50 decoration-2 underline-offset-4 hover:decoration-gold">Applied Love Labs</a>, our host and fiscal sponsor.
      </p>
      {embedUrl ? (
        <a href={embedUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
          Open donation page <ArrowOut />
        </a>
      ) : (
        <p className="rounded-md border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
          DONATION_EMBED_URL is not set in this environment. The committee
          needs to provision the embed URL before this flow is live.
        </p>
      )}
    </section>
  );
}

function PausedDonateCard() {
  return (
    <section className="paper space-y-5 p-8">
      <p className="eyebrow text-muted-foreground">Donations are paused</p>
      <p className="text-lg text-pretty text-muted-foreground">
        The donation backend is being finalized;{" "}
        <a href={meta.fiscalSponsor.href} target="_blank" rel="noreferrer" className="underline decoration-gold/50 decoration-2 underline-offset-4 hover:decoration-gold">Applied Love Labs</a> will
        hold received funds. Reach the committee directly to pledge
        support in the meantime.
      </p>
      <a href="mailto:hello@thesynapse.example" className="btn btn-ghost">Email the committee</a>
    </section>
  );
}

function StripeStyleForm({ providerLabel }: { providerLabel: string }) {
  const [amount, setAmount] = useState<number>(125);
  const [custom, setCustom] = useState("");
  const [recurring, setRecurring] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const effectiveAmount = custom ? Number(custom) : amount;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!Number.isFinite(effectiveAmount) || effectiveAmount < 5) {
      setStatus({ kind: "error", message: "Minimum donation is $5." });
      return;
    }
    setStatus({ kind: "submitting" });
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/api/donate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Math.round(effectiveAmount * 100),
          recurring,
        }),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.message ?? "Donation failed");
      if (body.redirectUrl) {
        window.location.href = body.redirectUrl;
        return;
      }
      if (body.kind === "stub") { setStatus({ kind: "stub", message: body.message }); return; }
      if (body.kind === "disabled") { setStatus({ kind: "disabled", message: body.message }); return; }
      setStatus({ kind: "stub", message: "Checkout session not returned." });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Donation failed";
      setStatus({ kind: "error", message });
    }
  }

  if (status.kind === "stub") return <DemoThanks message={status.message} />;
  if (status.kind === "disabled") return <PausedDonateCard />;

  return (
    <form onSubmit={onSubmit} className="paper space-y-6 p-8">
      <p className="eyebrow text-muted-foreground">Via {providerLabel}</p>
      <fieldset>
        <legend className="mb-3 font-serif text-sm text-ink">Amount</legend>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {presetAmounts.map((value) => (
            <label
              key={value}
              className={cx(
                "cursor-pointer rounded-md border px-4 py-3 text-center font-serif text-lg transition-colors",
                amount === value && !custom
                  ? "border-ink bg-ink text-surface"
                  : "border-border text-muted-foreground hover:border-border-strong hover:text-ink",
              )}
            >
              <input
                type="radio"
                name="amount"
                value={value}
                checked={amount === value && !custom}
                onChange={() => { setAmount(value); setCustom(""); }}
                className="sr-only"
              />
              ${value}
            </label>
          ))}
        </div>
        <div className="mt-3">
          <label className="block">
            <span className="eyebrow mb-1 block text-muted-foreground">Custom amount</span>
            <div className="flex items-center rounded-md border border-border-strong bg-surface focus-within:border-gold">
              <span className="pl-3 font-mono text-sm text-muted-foreground">$</span>
              <input
                type="number"
                min={5}
                step={1}
                value={custom}
                onChange={(e) => setCustom(e.target.value)}
                className="w-full border-none bg-transparent px-2 py-2.5 outline-none"
                placeholder="Other"
              />
            </div>
          </label>
        </div>
      </fieldset>

      <label className="flex cursor-pointer items-start gap-3 text-sm text-muted-foreground">
        <input
          type="checkbox"
          checked={recurring}
          onChange={(e) => setRecurring(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-border-strong"
        />
        <span>
          Make this recurring annually. Cancel with one click at any time --
          we send a reminder 30 days before each renewal.
        </span>
      </label>

      {status.kind === "error" && (
        <p role="alert" className="rounded-md border border-synapse-magenta/60 bg-synapse-magenta/10 px-4 py-3 text-sm">
          {status.message}
        </p>
      )}

      <button type="submit" className="btn btn-primary w-full justify-center" disabled={status.kind === "submitting"}>
        {status.kind === "submitting"
          ? "Preparing secure checkout..."
          : `Donate $${effectiveAmount || amount}${recurring ? " / year" : ""}`}
      </button>

      <p className="text-xs text-muted-foreground">
        Donations flow through <a href={meta.fiscalSponsor.href} target="_blank" rel="noreferrer" className="underline decoration-gold/50 decoration-2 underline-offset-4 hover:decoration-gold">Applied Love Labs</a>. Card details never touch our servers.
      </p>
    </form>
  );
}

function DemoThanks({ message }: { message: string }) {
  return (
    <div className="paper p-10 text-center">
      <p className="eyebrow mb-3 text-muted-foreground">Demo mode</p>
      <h2 className="font-serif text-3xl text-ink">Thank you -- the real flow will take you further.</h2>
      <p className="mt-4 max-w-prose text-pretty text-muted-foreground">{message}</p>
    </div>
  );
}

function ArrowOut() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M4 10L10 4M10 4H5M10 4V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
