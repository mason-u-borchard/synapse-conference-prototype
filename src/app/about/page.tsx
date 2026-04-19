import type { Metadata } from "next";
import Link from "next/link";
import { committee, meta, sponsors } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "The organizing committee, our operating principles, code of conduct, and Applied Love Labs, our fiscal sponsor.",
};

export default function AboutPage() {
  const tiers = {
    presenting: sponsors.filter((s) => s.tier === "presenting"),
    supporting: sponsors.filter((s) => s.tier === "supporting"),
    community: sponsors.filter((s) => s.tier === "community"),
  };
  return (
    <div className="container-gutter py-section">
      <header className="max-w-3xl">
        <p className="eyebrow mb-4">About</p>
        <h1 className="text-display-lg text-balance">A convening with the door held open.</h1>
        <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted-foreground text-pretty">{meta.mission}</p>
      </header>

      <section id="fiscal-sponsor" className="mt-20 paper p-8">
        <p className="eyebrow mb-4 text-muted-foreground">Fiscal sponsor</p>
        <h2 className="font-serif text-3xl tracking-tight">{meta.fiscalSponsor.name}</h2>
        <p className="mt-4 max-w-prose text-pretty text-muted-foreground">{meta.fiscalSponsor.blurb}</p>
        <div className="mt-6">
          <a
            href={meta.fiscalSponsor.href}
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost"
          >
            Learn more about {meta.fiscalSponsor.short}
          </a>
        </div>
      </section>

      <section id="committee" className="mt-20">
        <h2 className="text-display-md">Organizing committee</h2>
        <p className="mt-4 max-w-prose text-muted-foreground text-pretty">
          The working committee stewards the program, access, ethics, and
          community design. Committee roster is a placeholder until the
          committee confirms names for public listing.
        </p>
        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {committee.map((m) => (
            <li key={m.role} className="paper p-6">
              <p className="eyebrow mb-2 text-muted-foreground">{m.role}</p>
              <p className="font-serif text-xl text-ink">{m.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{m.affiliation}</p>
              <p className="mt-4 text-sm text-ink">{m.focus}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="partners" className="mt-24">
        <h2 className="text-display-md">Partners</h2>
        <p className="mt-4 max-w-prose text-muted-foreground text-pretty">
          Sponsor tiers mirror how the committee thinks about partnership:
          presenting (the fiscal sponsor), supporting (mission-aligned
          funders), and community (local and in-kind partners). Travel
          grants and the access fund are ring-fenced and accounted for
          separately at year's end.
        </p>
        <SponsorTier title="Presenting" rows={tiers.presenting} />
        <SponsorTier title="Supporting" rows={tiers.supporting} />
        <SponsorTier title="Community" rows={tiers.community} />
      </section>

      <section id="conduct" className="mt-24 max-w-3xl">
        <h2 className="text-display-md">Code of conduct</h2>
        <p className="mt-4 text-pretty text-muted-foreground">
          The Synapse follows a clear, enforceable code of conduct rooted in
          respect, consent, and scholarly integrity. It will be enforced by
          an independent response team reachable in person, by email, and
          by anonymous form.
        </p>
        <Link href="#" className="link-marker mt-6 inline-block font-serif text-lg">
          Read the full code of conduct [coming soon]
        </Link>
      </section>

      <section id="press" className="mt-24 max-w-3xl">
        <h2 className="text-display-md">Press and inquiries</h2>
        <p className="mt-4 text-pretty text-muted-foreground">
          For media passes, speaker interviews, or the official press kit,
          reach the organizing committee at{" "}
          <a href="mailto:press@thesynapse.example" className="text-ink underline decoration-gold/50 decoration-2 underline-offset-4 hover:decoration-gold">
            press@thesynapse.example
          </a>.
        </p>
      </section>
    </div>
  );
}

function SponsorTier({ title, rows }: { title: string; rows: readonly { name: string; blurb: string; initials: string; href: string; }[]; }) {
  if (rows.length === 0) return null;
  return (
    <div className="mt-12">
      <h3 className="eyebrow mb-5 text-muted-foreground">{title}</h3>
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {rows.map((s) => (
          <li key={s.name} className="paper flex gap-4 p-5">
            <div className="flex h-14 w-14 flex-none items-center justify-center rounded-md border border-border-strong font-serif italic text-muted-foreground" aria-hidden="true">
              {s.initials}
            </div>
            <div>
              <p className="font-serif text-lg text-ink">{s.name}</p>
              <p className="text-sm text-muted-foreground text-pretty">{s.blurb}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
