import type { Metadata } from "next";
import Link from "next/link";
import { FlaskConical, Building2, Atom, Flame, Sparkles } from "lucide-react";
import { DisciplineCard } from "@/components/discipline-card";

export const metadata: Metadata = {
  title: { absolute: "Attend The Synapse | San Diego · Oct 9–11, 2026" },
  description:
    "Apply to join 100 invited guests in San Diego for a three-day gathering exploring AI, robotics, cognitive science, and consciousness.",
};

// Audience list per Figma 80:3224. Icon glyphs mirror the lucide
// marks Taylor lined up next to each entry: flask for researchers,
// building for institutional bridge-builders, atom for early-career
// scholars, flame for funders, sparkles for artists.
const audience = [
  { label: "Leaders in research, industry, and movements shaping what gets built", Icon: FlaskConical },
  { label: "Academics and executives who see across the lines their institutions draw", Icon: Building2 },
  { label: "Early-career scholars with fresh visions seeking mentorship and collaboration", Icon: Atom },
  { label: "Allies, funders, and partners fueling the mission", Icon: Flame },
  { label: "Artists and practitioners holding what research can't yet name", Icon: Sparkles },
];

export default function AttendPage() {
  return (
    <>
      {/* === Hero (Figma 56:4448 / 56:4449) === Two-column lead-in:
          left holds the "An invitation" headline, body, and email
          capture; right holds the dark "When & Where" photo card with
          the date stamp and tickets-covered caption. */}
      <section className="relative isolate overflow-hidden bg-off-white -mt-[88px] pt-[88px]">
        <div className="container-gutter grid items-start gap-12 py-24 md:py-32 lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)] lg:gap-16">
          <div className="max-w-[794px]">
            <h1
              className="font-serif text-[clamp(2.5rem,5vw+0.5rem,3.75rem)] leading-none text-off-black max-w-[532px]"
              style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
            >
              An invitation
            </h1>
            <div className="mt-6 max-w-[591px] font-sans text-[clamp(1rem,0.4vw+0.875rem,1.25rem)] leading-[1.4] text-off-black">
              <p>One hundred participants. Intentionally convened.</p>
              <p className="mt-6">
                This is a small gathering by design; selected to support a high-trust, high-contribution environment. A limited number of places are open to applicants whose perspectives will expand and deepen the room.
              </p>
              <p className="mt-6">Applications are open.</p>
            </div>
            <div className="mt-10">
              <Link
                href="/apply"
                className="inline-flex h-[50px] items-center btn-solid-glow rounded-full bg-oxide-100 px-6 font-noto text-lg font-semibold text-off-black transition-transform hover:-translate-y-0.5"
              >
                Apply now
              </Link>
            </div>
          </div>
          {/* When & Where photo card (Figma 238:1616). Landscape card
              using the composed moss + magenta-coral background from
              Figma 238:1617. All text is JetBrains Mono per the
              design: Regular 20px eyebrow, Medium 60px date stamp,
              Light Italic 18px caption. Left-to-right darken gradient
              keeps the left-aligned text legible. */}
          <aside className="relative lg:self-start">
            <div className="relative overflow-hidden rounded-3xl bg-moss-400 text-off-white shadow-[0_24px_48px_-24px_rgba(0,0,0,0.35)]">
              <div className="absolute inset-0">
                <img
                  src="/figma/attend-card-bg.png"
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 mix-blend-multiply"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(9,9,9,0.55) 0%, rgba(9,9,9,0.25) 45%, rgba(9,9,9,0) 70%)",
                  }}
                />
              </div>
              <div className="relative flex aspect-[5/6] flex-col justify-between p-7 sm:aspect-[1087/533] sm:p-8">
                <p className="font-mono text-[clamp(0.875rem,0.3vw+0.75rem,1.125rem)] leading-none">
                  When &amp; Where
                </p>
                <div className="font-mono font-medium leading-none">
                  <p className="text-[clamp(1.75rem,2vw+0.5rem,2.5rem)]">
                    Oct 09-11
                  </p>
                  <p className="mt-2 whitespace-nowrap text-[clamp(1.75rem,2vw+0.5rem,2.5rem)]">
                    San Diego, CA
                  </p>
                </div>
                <p className="font-mono text-[clamp(0.8125rem,0.2vw+0.7rem,1rem)] font-light italic leading-[1.4]">
                  Tickets are covered for all attendees
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* === Ticker banner (Figma 127:2155) === Marquee row of five
          colored pills (Moss / Rose / Azure / Lavender / Oxide) each
          repeating "San Diego, CA · Oct 9-11 2026 · 100 guests" in
          italic JetBrains Mono Light. The marquee scrolls continuously
          via the synapse-marquee animation; the strip is duplicated
          so the seam is invisible. */}
      <TickerBanner />

      {/* === Center band (Figma 56:5272) === Both the blueprint copy
          + audience list AND the Four Fields grid live inside a single
          relatively-positioned wrapper so the Wave 1 graphic can span
          from the top of the blueprint section down past the audience
          list to just above the Consciousness card -- matching Taylor's
          design intent which has the wave bridging both sections. */}
      <div className="relative isolate overflow-hidden bg-off-white">
        <img
          src="/figma/attend-wave-1.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -right-[4%] top-0 z-0 hidden h-full w-auto max-w-[48vw] object-contain object-right-top opacity-95 lg:block"
        />
        {/* === For those building beyond the blueprint (Figma 411:719) ===
            Two-column band: left is the framing-copy column with its
            own NotifyForm; right is the "Who belongs here" audience
            checklist. */}
        <section className="relative py-16 md:py-section">
        <div className="container-gutter relative z-10 grid gap-12 lg:grid-cols-[minmax(0,494px)_minmax(0,1fr)] lg:gap-20">
          <div>
            <h2 className="font-serif text-[clamp(2.25rem,3.5vw+0.5rem,3rem)] leading-[1.15] text-off-black text-balance">
              For those building beyond the blueprint.
            </h2>
            <p className="mt-6 font-sans text-lg leading-[1.55] text-off-black text-pretty">
              This room is for the women working where the disciplines don't have names yet &mdash; and for those committed enough to stand with them. Researchers and builders. Scholars and practitioners. Academics and executives. The common thread isn't a credential. It's a disposition: the desire to build over the comfort of what already exists. Applications are open.
            </p>
            <div className="mt-10">
              <Link
                href="/apply"
                className="inline-flex h-[50px] items-center btn-solid-glow rounded-full bg-oxide-100 px-6 font-noto text-lg font-semibold text-off-black transition-transform hover:-translate-y-0.5"
              >
                Apply now
              </Link>
            </div>
          </div>
          <div>
            <p className="font-mono text-base font-light uppercase tracking-[0.14em] text-off-black/80">
              Who belongs here
            </p>
            <div className="mt-4 rounded-xl border border-oxide-300/30 bg-true-white py-2">
              <ul className="divide-y divide-oxide-300/15">
                {audience.map(({ label, Icon }) => (
                  <li key={label} className="flex items-center gap-5 px-6 py-5">
                    <Icon
                      size={20}
                      strokeWidth={1.6}
                      aria-hidden="true"
                      className="shrink-0 text-oxide-200"
                    />
                    <span className="font-sans text-base leading-[1.4] text-off-black text-pretty">
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* === Four fields (Figma 56:4447, lower band) ===
          Same DisciplineCard set used on the homepage so the cards
          stay in lockstep across the site. CTA anchors back up to the
          hero email capture. */}
        <section className="relative pb-24 md:pb-section">
        <div className="container-gutter relative z-10 flex flex-col items-center text-center">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-off-black/70">
            Four fields. One frontier.
          </p>
          <h2 className="mt-4 max-w-[36ch] font-serif text-[clamp(1.75rem,2.5vw+0.5rem,2.5rem)] leading-[1.15] text-off-black text-balance">
            AI, robotics, cognitive science, and consciousness are being developed in silos. The questions that matter most live between them.
          </h2>
          <div className="mt-10">
            <Link
              href="/apply"
              className="inline-flex h-[50px] items-center btn-solid-glow rounded-full bg-oxide-100 px-6 font-noto text-lg font-semibold text-off-black transition-transform hover:-translate-y-0.5"
            >
              Apply now
            </Link>
          </div>
          <div className="mt-16 grid w-full max-w-[1488px] grid-cols-1 gap-3 min-[440px]:grid-cols-2 min-[440px]:gap-4 lg:grid-cols-4 lg:gap-6">
            <DisciplineCard
              title="Artificial Intelligence"
              body="Every model encodes a worldview. Most encode the same blind spots."
              back="New voices don't just correct the model. They remake what it's capable of seeing."
              backImage="/figma/back-ai.jpg"
              textBg="bg-amethyst-300"
              graphicBg="bg-amethyst-100"
              graphic="/figma/graphic-ai.svg"
            />
            <DisciplineCard
              title="Robotics"
              body="The moment intelligence gets a body, the consequences stop being theoretical."
              back="This is the threshold &mdash; where intention meets material, and what we make becomes real."
              backImage="/figma/back-robotics.jpg"
              textBg="bg-oxide-300"
              graphicBg="bg-oxide-100"
              graphic="/figma/graphic-robotics.svg"
            />
            <DisciplineCard
              title="Cognitive Science"
              body="When one theory of mind wins, every other way of knowing disappears from the blueprint."
              back="The fuller picture of mind is already emerging. It's been waiting for a room that can hold it."
              backImage="/figma/back-cs.jpg"
              textBg="bg-orchid-300"
              graphicBg="bg-orchid-100"
              graphic="/figma/graphic-cs.svg"
            />
            <DisciplineCard
              title="Consciousness"
              body="Consciousness isn't a philosophical luxury. It's the missing variable in every system we're building."
              back="Every mind contains a universe. That's where we begin."
              backImage="/figma/back-consciousness.jpg"
              textBg="bg-moss-300"
              graphicBg="bg-moss-100"
              graphic="/figma/graphic-consciousness.svg"
            />
          </div>
        </div>
        </section>
      </div>
    </>
  );
}


// Ticker banner per Figma 127:2155: five colored pills in a row,
// each with a faint tinted background and italic JetBrains Mono Light
// text in the matching deeper shade. The row scrolls horizontally as
// a continuous marquee via the project's synapse-marquee animation.
// We render the 5-pill set twice so the loop seam is invisible.
function TickerBanner() {
  const pills: { bg: string; text: string }[] = [
    { bg: "bg-[var(--moss-100-alpha-5)]", text: "text-moss-200" },
    { bg: "bg-[var(--orchid-100-alpha-5)]", text: "text-orchid-200" },
    { bg: "bg-[var(--azure-100-alpha-5)]", text: "text-azure-200" },
    { bg: "bg-[var(--amethyst-100-alpha-5)]", text: "text-amethyst-200" },
    { bg: "bg-[var(--oxide-100-alpha-5)]", text: "text-oxide-200" },
  ];
  const message = "San Diego, CA · Oct 9-11, 2026 · 100 guests";
  return (
    <section
      aria-label="Conference dates and place"
      className="marquee-pause overflow-hidden border-y border-off-black/50 bg-off-white"
    >
      <div className="animate-marquee flex w-max items-center py-[30px]">
        {/* Duplicate the pill set twice so the marquee loops seamlessly
            at translateX(-50%). */}
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1 ? "true" : undefined}
            className="flex shrink-0 items-center gap-5 px-[10px]"
          >
            {pills.map((pill, i) => (
              <span
                key={`${copy}-${i}`}
                className={`shrink-0 whitespace-nowrap rounded px-3 py-1.5 font-mono text-base font-light italic ${pill.bg} ${pill.text}`}
              >
                {message}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
