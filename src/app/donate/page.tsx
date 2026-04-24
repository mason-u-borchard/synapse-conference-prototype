import type { Metadata } from "next";
import { DonateForm } from "@/components/donate-form";
import { getDonationProvider } from "@/lib/donations/provider";
import { meta } from "@/lib/content";

export const metadata: Metadata = {
  title: "Fund the room where this happens",
  description: "Donations flow through Applied Love Labs, our host and fiscal sponsor. A $100,000 working target covers organizer salaries, participant travel and compensation, venue and A/V, and scholarships for early-career scholars.",
};

export default function DonatePage() {
  const provider = getDonationProvider();
  return (
    <div className="container-gutter py-section">
      <header className="max-w-3xl">
        <p className="eyebrow mb-4">Support</p>
        <h1 className="text-display-lg text-balance">Invest in the room where this gets built.</h1>
        <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted-foreground text-pretty">
          The Synapse is a living proof of what it looks like when women
          determine how intelligence is designed -- not as a corrective,
          but as a new model entirely. We're raising an initial <span className="text-ink">{meta.fundingTarget.amount} by {meta.fundingTarget.by}</span> to
          cover organizer salaries, speaker compensation and travel,
          venue and A/V, and registration scholarships. Every dollar
          ensures the right people are in the room, regardless of who
          can afford to be.
        </p>
        <p className="mt-4 max-w-prose text-sm text-muted-foreground">
          Gifts flow through <a href={meta.fiscalSponsor.href} target="_blank" rel="noreferrer" className="text-ink underline decoration-gold-deep decoration-2 underline-offset-4 link-glow">{meta.fiscalSponsor.name}</a>; receipts are issued in ALL's name. {provider.blurb}
        </p>
      </header>

      <div className="mt-14 grid gap-12 md:grid-cols-[1.4fr_1fr]">
        <DonateForm providerName={provider.name} providerLabel={provider.label} embedOnly={provider.embedOnly} embedUrl={provider.embedUrl} virtuous={provider.virtuous} />
        <aside className="space-y-8">
          <section className="paper p-6">
            <h2 className="eyebrow mb-4 text-muted-foreground">Working budget</h2>
            <p className="mb-4 text-xs text-muted-foreground">
              {meta.fundingTarget.amount} target by {meta.fundingTarget.by}.
            </p>
            <ul className="space-y-3">
              <AllocationRow share={35} label="Organizer salaries" />
              <AllocationRow share={30} label="Participant travel and compensation" />
              <AllocationRow share={20} label="Venue and A/V" />
              <AllocationRow share={15} label="Scholarships for early-career scholars" />
            </ul>
            <p className="mt-5 text-xs text-muted-foreground">
              Percentages are an illustrative split the committee will
              refine. Funds flow through <a href={meta.fiscalSponsor.href} target="_blank" rel="noreferrer" className="underline decoration-gold-deep decoration-2 underline-offset-4 link-glow">{meta.fiscalSponsor.name}</a>.
            </p>
          </section>
          {/* <section className="paper p-6">
            <h2 className="eyebrow mb-3 text-muted-foreground">Transparency</h2>
            <p className="text-sm text-pretty text-muted-foreground">
            When naming sponsors or partners publicly, clarity on the nature of the relationship is a feature, not a risk. Funders who are aligned will welcome this transparency. Those who aren't are not the right funders.
              Financial reporting is published through <a href={meta.fiscalSponsor.href} target="_blank" rel="noreferrer" className="underline decoration-gold-deep decoration-2 underline-offset-4 link-glow">Applied Love Labs</a> and reviewed annually. The committee is still selecting
              a donation platform; the active backend here is{" "}
              <span className="font-mono text-ink">{provider.label}</span>.
            </p>
          </section> */}
        </aside>
      </div>
    </div>
  );
}

function AllocationRow({ share, label }: { share: number; label: string }) {
  return (
    <li>
      <div className="mb-1 flex items-baseline justify-between">
        <span className="font-serif text-sm text-ink">{label}</span>
        <span className="font-mono text-xs text-muted-foreground">{share}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-muted" role="progressbar" aria-valuenow={share} aria-valuemin={0} aria-valuemax={100}>
        <div className="h-full rounded-full bg-gold" style={{ width: `${share}%` }} />
      </div>
    </li>
  );
}
