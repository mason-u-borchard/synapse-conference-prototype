import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ethos",
  description:
    "Power without permission. Rigor with love. The nine principles that shape how we invite, schedule, host, and close the days.",
};

// The Synapse-palette accent rotates through the nine principle cards
// so the grid reads as a spectrum of the brand rather than nine
// identical tiles. The pairing is text-bg + accent-tone so each card
// feels distinct but coherent.
const principles: ReadonlyArray<{
  n: string;
  title: string;
  body: string;
  textBg: string;
  accent: string;
}> = [
  {
    n: "01",
    title: "Love over ego",
    body: "We prioritize generativity over dominance, curiosity over certainty, and collective emergence over individual performance.",
    textBg: "bg-amethyst-300",
    accent: "text-amethyst-100",
  },
  {
    n: "02",
    title: "Full selves belong",
    body: "This is not a space for curated expertise alone, but one that invites the fullness of who we are. Intellect, intuition, lived experience, emotion, and imagination are all welcome here.",
    textBg: "bg-orchid-300",
    accent: "text-orchid-100",
  },
  {
    n: "03",
    title: "Multiple ways of knowing",
    body: "We honor analytical, intuitive, embodied, relational, and mystical forms of knowing as essential -- not peripheral -- to understanding reality.",
    textBg: "bg-azure-300",
    accent: "text-azure-100",
  },
  {
    n: "04",
    title: "Cooperation and reciprocity",
    body: "We move beyond win-lose thinking toward forms of cooperation that expand intelligence, creativity, and what becomes possible.",
    textBg: "bg-moss-300",
    accent: "text-moss-100",
  },
  {
    n: "05",
    title: "Relational becoming",
    body: "What emerges between us is more than what any of us brings alone. Difference is not something to resolve. It's something to create with.",
    textBg: "bg-oxide-300",
    accent: "text-oxide-100",
  },
  {
    n: "06",
    title: "Women as shapers of mind and world",
    body: "We center the role of women and feminine ways of being in shaping minds, systems, and futures.",
    textBg: "bg-amethyst-300",
    accent: "text-amethyst-100",
  },
  {
    n: "07",
    title: "Ethics as foundation, not afterthought",
    body: "We shape technology, knowledge, and futures to be life-affirming and responsible to the whole -- through participation, reciprocity, and shared benefit rather than extraction or control.",
    textBg: "bg-orchid-300",
    accent: "text-orchid-100",
  },
  {
    n: "08",
    title: "Right relationship with power and capital",
    body: "We recognize that funding and partnership shape what becomes possible. We engage capital in ways that are transparent, aligned, and in service of collective benefit, not control.",
    textBg: "bg-moss-300",
    accent: "text-moss-100",
  },
  {
    n: "09",
    title: "Power without permission",
    body: "We reject inherited dynamics that require validation, gatekeeping, or hierarchy to act. Authority lives within us.",
    textBg: "bg-azure-300",
    accent: "text-azure-100",
  },
];

export default function EthosPage() {
  return (
    <>
      {/* === Hero === Off-white surface, JetBrains Mono eyebrow,
          Fraunces headline with "love" italicized in oxide-200 to
          mirror the About-page accent treatment. */}
      <section className="relative isolate overflow-hidden bg-off-white -mt-[88px] pt-[88px]">
        <div className="container-gutter relative z-10 flex flex-col py-24 md:py-32">
          <p className="font-mono text-base uppercase tracking-[0.18em] text-off-black/85">
            Ethos
          </p>
          <h1 className="mt-5 max-w-[24ch] font-serif text-[clamp(2.75rem,5vw+0.5rem,4.25rem)] leading-[1.05] text-off-black text-balance">
            Power without permission.{" "}
            <span className="italic text-oxide-200">Rigor with love.</span>
          </h1>
          <p className="mt-8 max-w-[64ch] font-sans text-xl leading-[1.6] text-off-black">
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
          A grid of dark-surfaced cards, each scoped to one Synapse
          accent so the wall reads as a spectrum. Numbered 01-09 in
          mono in the accent color; title in Fraunces; body in Inter. */}
      <section
        aria-labelledby="principles"
        className="relative isolate bg-off-white pb-24 md:pb-section"
      >
        <div className="container-gutter">
          <h2 id="principles" className="sr-only">
            Nine principles
          </h2>
          <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {principles.map((p) => (
              <li
                key={p.n}
                className={`flex flex-col gap-5 rounded-3xl p-8 text-off-white ${p.textBg}`}
              >
                <div className="flex items-baseline gap-4">
                  <span className={`font-mono text-sm tracking-[0.18em] ${p.accent}`}>
                    {p.n}
                  </span>
                  <span aria-hidden="true" className={`h-px flex-1 ${p.accent.replace("text-", "bg-")} opacity-30`} />
                </div>
                <h3 className="font-serif text-2xl leading-[1.2]">{p.title}</h3>
                <p className="font-sans text-base leading-[1.55] text-off-white/90">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* === Closing -- "Principles don't live on walls" ===
          Dark amethyst-300 surface to bookend the page with the
          same gravity as the homepage hero. */}
      <section
        aria-labelledby="in-practice"
        className="relative isolate overflow-hidden bg-amethyst-300 py-24 md:py-section"
      >
        <div className="container-gutter relative z-10 mx-auto max-w-[60ch] text-off-white">
          <h2
            id="in-practice"
            className="font-serif text-[clamp(2rem,3.5vw+0.25rem,3rem)] leading-[1.15]"
          >
            Principles don't live on walls. They live in the design.
          </h2>
          <p className="mt-8 font-sans text-xl leading-[1.55] text-off-white/90">
            Every structural decision -- how sessions are facilitated, how time is held, how voices are weighted, how the room closes -- is a direct expression of these nine commitments. You won't be told the ethos. You'll experience it.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/attend"
              className="inline-flex h-[50px] items-center btn-solid-glow rounded-full bg-oxide-100 px-6 font-noto text-lg font-semibold text-off-black transition-transform hover:-translate-y-0.5"
            >
              Apply to attend
            </Link>
            <Link
              href="/about"
              className="inline-flex h-[50px] items-center btn-outline-glow rounded-full border border-off-white/80 px-6 font-noto text-lg font-semibold text-off-white transition-colors hover:bg-off-white/10"
            >
              Who's behind it
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
