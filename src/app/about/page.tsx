import type { Metadata } from "next";
import Link from "next/link";
import { committee, meta, sponsors } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "The organizing committee, operating principles, code of conduct, and Applied Love Labs -- the host and fiscal sponsor.",
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
{/* #PLACEHOLDER */}
        <h1 className="text-display-lg text-balance">A working committee accountable to the participants and the work itself -- not to funders, institutions, or optics.</h1>
        <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted-foreground text-pretty">{meta.mission}</p>
      </header>

      <section id="founder" className="mt-20 paper p-8 md:p-10">
        <p className="eyebrow mb-4 text-muted-foreground">A dedication, not a protest</p>
        <div className="max-w-prose space-y-5 text-pretty text-ink">
          <p>
            AI, consciousness, cognitive science, and robotics are the
            fields shaping the future of humanity. And they remain
            overwhelmingly led by elite, male-ordered institutions.
            After the Epstein files release made plain how women have
            been actively suppressed in these disciplines, a small group
            of us decided we would stop waiting for a better invitation
            and build one.
          </p>
          <p>
            This conference is not a protest. It is a dedication: to the
            rigorous, controversial, embodied, relational work women are
            already doing, and to the collaborative future we intend to
            build together.
          </p>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          -- {meta.founder.name} &middot; {meta.founder.title}
        </p>
      </section>

      <section id="fiscal-sponsor" className="mt-12 paper p-8">
        <p className="eyebrow mb-4 text-muted-foreground">Host and fiscal sponsor</p>
        <h2 className="font-serif text-3xl tracking-tight">{meta.fiscalSponsor.name}</h2>
        <p className="mt-4 max-w-prose text-pretty text-muted-foreground">{meta.fiscalSponsor.blurb}</p>
        <div className="mt-6">
          <a
            href={meta.fiscalSponsor.href}
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost"
          >
            About {meta.fiscalSponsor.short}
          </a>
        </div>
      </section>

      <section id="atlanta" className="mt-12 paper p-8">
        <p className="eyebrow mb-4 text-muted-foreground">Why Atlanta</p>
        <h2 className="font-serif text-3xl tracking-tight">A city already doing the work of empowering women.</h2>
        <p className="mt-4 max-w-prose text-pretty text-muted-foreground">
          We are gathering in Atlanta: a city with deep roots in civil
          rights, a thriving tech and research ecosystem, and an
          established commitment to lifting women's voices. The City of
          Atlanta has expressed interest in supporting the initiative.
        </p>
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
          funders), and community (local and in-kind partners). Every
          partner listed below is a numbered placeholder until the
          committee confirms commitments.
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
