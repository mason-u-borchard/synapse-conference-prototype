import type { Metadata } from "next";
import Link from "next/link";
import { DonateForm } from "@/components/donate-form";
import { getDonationProvider } from "@/lib/donations/provider";
import { meta } from "@/lib/content";

export const metadata: Metadata = {
  title: "Invest",
  description: "Not a proposal for a different future. A demonstration of one. Invest in the room where this gets built.",
};

const allocation = [
  {
    label: "Speaker travel and compensation",
    body: "We are committed to compensating those who contribute from the front of the room.",
  },
  {
    label: "Venue and A/V",
    body: "Physical space matters. We're building an experience, not renting a conference room.",
  },
  {
    label: "Tickets for all attendees",
    body: "Because of our curated size, we are covering the cost of each ticket.",
  },
  {
    label: "Organizational cost",
    body: "Convening this gathering is real work. These funds ensure that the resources are available to make the space real.",
  },
];

const tiers = [
  { name: "Ember", amount: "$10k" },
  { name: "Flame", amount: "$25k" },
  { name: "Blaze", amount: "$50k" },
  { name: "Beacon", amount: "$100k" },
];

// #PLACEHOLDER -- swap in the Google Form URL when Mason has it from the
// committee. Until then, the CTA opens a mail draft so the request still
// has a path.
const SPONSOR_REQUEST_HREF = "mailto:hello@thesynapse.co?subject=Request%20to%20sponsor%20The%20Synapse";

export default function InvestPage() {
  const provider = getDonationProvider();
  return (
    <div className="container-gutter py-section">
      <header className="max-w-3xl">
        <p className="eyebrow mb-4">Invest</p>
        <h1 className="text-display-lg text-balance">Not a proposal for a different future. A demonstration of one.</h1>
        <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink">
          Your investment makes this possible.
        </p>
        <div className="mt-6 max-w-prose space-y-4 text-base leading-relaxed text-muted-foreground text-pretty">
          <p>
            AI, robotics, cognitive science, and consciousness are the fields shaping the future of humanity. The people best positioned to ask the hardest questions have been systematically kept out of the rooms where those questions get answered.
          </p>
        </div>
        <dl className="mt-10 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-3">
          <Stat headline="100" detail="researchers, builders, and practitioners." />
          <Stat headline="3 days" detail={`${meta.city}. October 2026.`} />
          <Stat headline="Convened" detail="by women already doing the work, and those committed to standing with them." />
        </dl>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href={SPONSOR_REQUEST_HREF} className="btn btn-primary">Request to sponsor<ArrowRight /></Link>
          <Link href="#donate" className="btn btn-ghost">Or donate below<ArrowRight /></Link>
        </div>
      </header>

      <section aria-labelledby="tiers" className="mt-24 max-w-3xl">
        <p className="eyebrow mb-3">Sponsorship</p>
        <h2 id="tiers" className="font-serif text-3xl text-ink">Four tiers of sponsorship.</h2>
        <p className="mt-4 max-w-prose text-base leading-relaxed text-muted-foreground text-pretty">
          We approach sponsorship as mutual, transparent partnership. Sponsors gain meaningful visibility and relationships. The gathering gains the resources to come to life. Together, we build something none of us could build alone.
        </p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {tiers.map((t) => (
            <li key={t.name} className="rounded-md border border-border bg-surface-raised px-5 py-4">
              <p className="eyebrow">{t.amount}</p>
              <p className="mt-1 font-serif text-lg text-ink">{t.name}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-muted-foreground">
          Full tier benefits live in a sponsorship document shopped directly. Reach out for a copy.
        </p>
        <div className="mt-8">
          <Link href={SPONSOR_REQUEST_HREF} className="btn btn-primary">Request to sponsor<ArrowRight /></Link>
        </div>
      </section>

      <section aria-labelledby="ask" className="mt-24 max-w-3xl">
        <h2 id="ask" className="font-serif text-3xl text-ink">{meta.fundingTarget.amount} by {meta.fundingTarget.by}.</h2>
        <p className="mt-6 max-w-prose text-base leading-relaxed text-muted-foreground text-pretty">
          This is the threshold that makes The Synapse viable. Below it, we cannot commit to the people, the place, or the program. Your investment is what puts the right people in the room.
        </p>

        <h3 className="eyebrow mt-12">Where your investment goes</h3>
        <ul className="mt-4 space-y-4">
          {allocation.map((item) => (
            <li key={item.label}>
              <p className="font-serif text-lg text-ink">{item.label}</p>
              <p className="mt-1 max-w-prose text-sm text-muted-foreground text-pretty">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="donate" aria-labelledby="donate-heading" className="mt-24 grid gap-12 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="eyebrow mb-3">Donate</p>
          <h2 id="donate-heading" className="font-serif text-3xl text-ink">Believe in the room.</h2>
          <p className="mt-4 max-w-prose text-base leading-relaxed text-muted-foreground text-pretty">
            Sponsorship isn't the only way to invest in this gathering. If the mission matters to you, your gift in any amount goes directly toward making it real.
          </p>
          <p className="mt-4 max-w-prose text-sm text-muted-foreground">
            Gifts flow through <a href={meta.fiscalSponsor.href} target="_blank" rel="noreferrer" className="text-ink underline decoration-gold-deep decoration-2 underline-offset-4 link-glow">{meta.fiscalSponsor.name}</a>; receipts are issued in ALL's name. Gifts are fully tax deductible. {provider.blurb}
          </p>
          <DonateForm
            providerName={provider.name}
            providerLabel={provider.label}
            embedOnly={provider.embedOnly}
            embedUrl={provider.embedUrl}
            virtuous={provider.virtuous}
          />
        </div>
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
              Percentages are an illustrative split the committee will refine. Funds flow through <a href={meta.fiscalSponsor.href} target="_blank" rel="noreferrer" className="underline decoration-gold-deep decoration-2 underline-offset-4 link-glow">{meta.fiscalSponsor.name}</a>.
            </p>
          </section>
        </aside>
      </section>

      <section aria-labelledby="atlanta" className="mt-24 max-w-3xl">
        <p className="eyebrow mb-3">Atlanta</p>
        <h2 id="atlanta" className="font-serif text-3xl text-ink">{meta.city}. {meta.dates.display}.</h2>
        <p className="mt-4 max-w-prose text-base leading-relaxed text-muted-foreground text-pretty">
          Hosted by {meta.fiscalSponsor.name}.
        </p>
      </section>
    </div>
  );
}

function Stat({ headline, detail }: { headline: string; detail: string }) {
  return (
    <div>
      <dt className="font-serif text-3xl text-ink">{headline}</dt>
      <dd className="mt-1 text-sm text-muted-foreground text-pretty">{detail}</dd>
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

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
