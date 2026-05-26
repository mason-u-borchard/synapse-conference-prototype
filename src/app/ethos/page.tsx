import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "The Synapse Ethos | Cognitive Science, AI & Consciousness" },
  description:
    "Explore the ideas behind The Synapse: interdisciplinary inquiry, emerging intelligence, consciousness, and the future of human systems.",
};

// Cards walk a diagonal gradient from off-black through moss into amethyst,
// matching the Figma. Each tile gets its own bg + accent pairing so the wall
// reads as a single composition rather than nine identical tiles.
const principles: ReadonlyArray<{
  n: string;
  title: string;
  body: string;
  bg: string;
  accent: string;
}> = [
  {
    n: "01",
    title: "Love over ego",
    body: "We prioritize generativity over dominance, curiosity over certainty, and collective emergence over individual performance.",
    bg: "bg-off-black",
    accent: "text-moss-100",
  },
  {
    n: "02",
    title: "Full selves belong",
    body: "This is not a space for curated expertise alone, but one that invites the fullness of who we are. Intellect, intuition, lived experience, emotion, and imagination are all welcome here.",
    bg: "bg-moss-300",
    accent: "text-moss-100",
  },
  {
    n: "03",
    title: "Multiple ways of knowing",
    body: "We honor analytical, intuitive, embodied, relational, and mystical forms of knowing as essential — not peripheral — to understanding reality.",
    bg: "bg-moss-200",
    accent: "text-moss-100",
  },
  {
    n: "04",
    title: "Cooperation and reciprocity",
    body: "We move beyond win-lose thinking toward forms of cooperation that expand intelligence, creativity, and what becomes possible.",
    bg: "bg-moss-300",
    accent: "text-moss-100",
  },
  {
    n: "05",
    title: "Relational becoming",
    body: "What emerges between us is more than what any of us brings alone. Difference is not something to resolve. It's something to create with.",
    bg: "bg-amethyst-300",
    accent: "text-amethyst-100",
  },
  {
    n: "06",
    title: "Women as shapers of mind and world",
    body: "We center the role of women and feminine ways of being in shaping minds, systems, and futures.",
    bg: "bg-amethyst-200",
    accent: "text-amethyst-100",
  },
  {
    n: "07",
    title: "Ethics as foundation, not afterthought",
    body: "We shape technology, knowledge, and futures to be life-affirming and responsible to the whole — through participation, reciprocity, and shared benefit rather than extraction or control.",
    bg: "bg-amethyst-300",
    accent: "text-amethyst-100",
  },
  {
    n: "08",
    title: "Right relationship with power and capital",
    body: "We recognize that funding and partnership shape what becomes possible. We engage capital in ways that are transparent, aligned, and in service of collective benefit, not control.",
    bg: "bg-oxide-300",
    accent: "text-oxide-100",
  },
  {
    n: "09",
    title: "Power without permission",
    body: "We reject inherited dynamics that require validation, gatekeeping, or hierarchy to act. Authority lives within us.",
    bg: "bg-oxide-300",
    accent: "text-oxide-100",
  },
];

export default function EthosPage() {
  return (
    <>
      {/* === Hero === Off-white surface pulled under the sticky header, mono eyebrow, Fraunces headline, two CTAs. */}
      <section className="relative isolate overflow-hidden bg-off-white -mt-[88px] pt-[88px]">
        <div className="container-gutter relative z-10 flex flex-col py-24 md:py-32">
          <h1 className="max-w-[24ch] font-serif text-[clamp(2.75rem,5vw+0.5rem,4.25rem)] leading-[1.05] text-off-black text-balance">
            Power without permission. Rigor with love.
          </h1>
          <p className="mt-8 max-w-[64ch] font-sans text-lg leading-[1.6] text-off-black/85">
            These are not aspirations. They are our operating system. The principles that shape how we invite, schedule, host, and close the days. The format, the facilitation, and the room you walk into are built from these nine commitments.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/invest"
              className="inline-flex h-[50px] items-center btn-solid-glow rounded-full bg-oxide-100 px-6 font-noto text-lg font-semibold text-off-black transition-transform hover:-translate-y-0.5"
            >
              Fund the room
            </Link>
            <Link
              href="/attend"
              className="inline-flex h-[50px] items-center btn-outline-glow rounded-full border border-off-black/80 px-6 font-noto text-lg font-semibold text-off-black/80 transition-colors hover:bg-off-black/5"
            >
              Apply to attend
            </Link>
          </div>
        </div>
      </section>

      {/* === The nine principles ===
          3x3 grid on off-white. Each tile carries a dark Synapse tone; numbers in mono in the matching accent. */}
      <section
        aria-labelledby="principles"
        className="relative isolate bg-off-white pb-24 md:pb-section"
      >
        <div className="container-gutter">
          <p className="mb-8 font-mono text-xs uppercase tracking-[0.22em] text-off-black/70">
            Our principles
          </p>
          <h2 id="principles" className="sr-only">
            Nine principles
          </h2>
          <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {principles.map((p) => (
              <li
                key={p.n}
                className={`flex flex-col gap-5 rounded-2xl p-7 text-off-white ${p.bg}`}
              >
                <span className={`font-mono text-xs tracking-[0.18em] ${p.accent}`}>
                  {p.n}
                </span>
                <h3 className="font-serif text-2xl leading-[1.2] -mt-2">{p.title}</h3>
                <p className="font-sans text-sm leading-[1.55] text-off-white/85">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* === Closer — "Principles don't live on walls" ===
          Off-white surface, centered. Small Synapse ornament sits above the headline; single outline CTA below. Mirrors the /about "Why Atlanta?" treatment. */}
      <section
        aria-labelledby="in-practice"
        className="relative isolate overflow-hidden bg-off-white py-24 md:py-section"
      >
        <div className="container-gutter flex flex-col items-center text-center">
          <img
            src="/figma/atlanta-ornament.svg"
            alt=""
            aria-hidden="true"
            width={96}
            height={96}
            className="h-[80px] w-[80px] md:h-[96px] md:w-[96px]"
          />
          <h2
            id="in-practice"
            className="mt-6 max-w-[22ch] font-serif text-[clamp(2.25rem,3.75vw+0.25rem,3.25rem)] leading-[1.15] text-off-black text-balance"
          >
            Principles don't live on walls. They live in the design.
          </h2>
          <p className="mt-6 max-w-[68ch] font-sans text-lg leading-[1.6] text-off-black/85 text-pretty">
            Every structural decision — how sessions are facilitated, how time is held, how voices are weighted, how the room closes — is a direct expression of these nine commitments. You won't be told the ethos. You'll experience it.
          </p>
          <div className="mt-10">
            <Link
              href="/attend"
              className="inline-flex h-[50px] items-center btn-outline-glow rounded-full border border-off-black/80 px-6 font-noto text-lg font-semibold text-off-black/80 transition-colors hover:bg-off-black/5"
            >
              Apply to attend
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
