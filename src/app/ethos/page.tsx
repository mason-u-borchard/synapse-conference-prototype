import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ethos",
  description: "Power without permission. Rigor with love. The nine principles that shape how we invite, schedule, host, and close the days.",
};

const principles = [
  {
    n: "01",
    title: "Love over ego",
    body: "We prioritize generativity over dominance, curiosity over certainty, and collective emergence over individual performance.",
  },
  {
    n: "02",
    title: "Full selves belong",
    body: "This is not a space for curated expertise alone, but one that invites the fullness of who we are. Intellect, intuition, lived experience, emotion, and imagination are all welcome here.",
  },
  {
    n: "03",
    title: "Multiple ways of knowing",
    body: "We honor analytical, intuitive, embodied, relational, and mystical forms of knowing as essential -- not peripheral -- to understanding reality.",
  },
  {
    n: "04",
    title: "Cooperation and reciprocity",
    body: "We move beyond win-lose thinking toward forms of cooperation that expand intelligence, creativity, and what becomes possible.",
  },
  {
    n: "05",
    title: "Relational becoming",
    body: "What emerges between us is more than what any of us brings alone. Difference is not something to resolve. It's something to create with.",
  },
  {
    n: "06",
    title: "Women as shapers of mind and world",
    body: "We center the role of women and feminine ways of being in shaping minds, systems, and futures.",
  },
  {
    n: "07",
    title: "Ethics as foundation, not afterthought",
    body: "We shape technology, knowledge, and futures to be life-affirming and responsible to the whole -- through participation, reciprocity, and shared benefit rather than extraction or control.",
  },
  {
    n: "08",
    title: "Right relationship with power and capital",
    body: "We recognize that funding and partnership shape what becomes possible. We engage capital in ways that are transparent, aligned, and in service of collective benefit, not control.",
  },
  {
    n: "09",
    title: "Power without permission",
    body: "We reject inherited dynamics that require validation, gatekeeping, or hierarchy to act. Authority lives within us.",
  },
];

export default function EthosPage() {
  return (
    <div className="container-gutter py-section">
      <header className="max-w-3xl">
        <p className="eyebrow mb-4">Ethos</p>
        <h1 className="text-display-lg text-balance">Power without permission. Rigor with love.</h1>
        <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted-foreground text-pretty">
          These are not aspirations. They are our operating system. The principles that shape how we invite, schedule, host, and close the days. The format, the facilitation, and the room you walk into are built from these nine commitments.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/invest" className="btn btn-primary">Fund the room<ArrowRight /></Link>
          <Link href="/attend" className="btn btn-ghost">Apply to attend<ArrowRight /></Link>
        </div>
      </header>

      <section aria-labelledby="principles" className="mt-20">
        <h2 id="principles" className="sr-only">Nine principles</h2>
        <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {principles.map((p) => (
            <li key={p.n} className="paper p-6">
              <p className="eyebrow mb-2 font-mono">{p.n}</p>
              <h3 className="font-serif text-xl text-ink">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">{p.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="in-practice" className="mt-20 max-w-3xl">
        <h2 id="in-practice" className="font-serif text-3xl text-ink">Principles don't live on walls. They live in the design.</h2>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground text-pretty">
          Every structural decision, how sessions are facilitated, how time is held, how voices are weighted, how the room closes, is a direct expression of these nine commitments. You won't be told the ethos. You'll experience it.
        </p>
        <div className="mt-10">
          <Link href="/attend" className="btn btn-ghost">Apply to attend<ArrowRight /></Link>
        </div>
      </section>
    </div>
  );
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
