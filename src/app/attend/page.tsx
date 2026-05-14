import type { Metadata } from "next";
import Link from "next/link";
import { DisciplineCard } from "@/components/discipline-card";
import { NotifyForm } from "@/components/notify-form";

export const metadata: Metadata = {
  title: "Attend",
  description:
    "An invitation. One hundred participants. Intentionally convened. Leave your email and we'll let you know when applications open.",
};

// Audience list per IA "Who It's For" section (~line 477).
// Copy is verbatim from may10Synapse Site IA.md.
const audience = [
  "Leaders in research, industry, and movements shaping what gets built",
  "Academics and executives who see across the lines their institutions draw",
  "Early-career scholars with fresh visions seeking mentorship and collaboration",
  "Allies, funders, and partners fueling the mission",
  "Artists and practitioners holding what research can't yet name",
];

export default function AttendPage() {
  return (
    <>
      {/* === Hero (Figma 56:4447, top band) ===
          Two columns: left holds eyebrow, "An invitation" headline,
          subhead block, and the inline email capture. Right holds a
          dark photo card with the Oct 9-11 / Atlanta date stamp,
          framed by the venue line. Pulls under the sticky header via
          the negative-margin pattern shared with /about. */}
      <section className="relative isolate overflow-hidden bg-off-white -mt-[88px] pt-[88px]">
        <div className="container-gutter grid gap-12 py-20 md:py-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] lg:gap-16">
          <div className="max-w-[58ch]">
            <p className="font-mono text-sm tracking-[0.08em] uppercase text-off-black/70">
              Attend
            </p>
            <h1 className="mt-5 font-serif text-[clamp(2.75rem,5vw+0.5rem,4.5rem)] leading-[1.02] tracking-tight text-off-black text-balance">
              An invitation
            </h1>
            <div className="mt-8 max-w-[55ch] space-y-5 font-sans text-lg leading-[1.55] text-off-black">
              <p className="text-pretty">
                One hundred participants. Intentionally convened.
              </p>
              <p className="text-pretty">
                This is a small gathering by design &mdash; selected to support a high-trust, high-contribution environment. A limited number of places are open to applicants whose perspectives will expand and deepen the room.
              </p>
              <p className="text-pretty">
                Applications open soon. Leave your email and we'll let you know when they do.
              </p>
            </div>
            <NotifyForm id="notify-hero" className="mt-10" />
          </div>

          {/* Date / venue card. Dark moss surface, photo backdrop with
              a low-opacity overlay so the stacked Oct 9-11 / Atlanta
              type stays legible. Caption beneath calls out the venue. */}
          <aside className="relative">
            <div className="relative overflow-hidden rounded-3xl bg-moss-300 text-off-white shadow-[0_24px_48px_-24px_rgba(0,0,0,0.35)]">
              <div className="absolute inset-0">
                <img
                  src="/figma/atlanta-skyline.png"
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-moss-300/40 via-moss-300/55 to-moss-300/85" />
              </div>
              <div className="relative flex aspect-[4/5] flex-col justify-between p-8">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-off-white/80">
                  The Synapse 2026
                </p>
                <div>
                  <p className="font-serif text-[clamp(2.25rem,3vw+1rem,3rem)] leading-[1.05]">
                    Oct 09&ndash;11
                  </p>
                  <p className="mt-2 font-serif text-[clamp(2.25rem,3vw+1rem,3rem)] leading-[1.05]">
                    Atlanta, GA
                  </p>
                </div>
                <p className="max-w-[28ch] font-sans text-sm leading-[1.5] text-off-white/85 text-pretty">
                  Three days at a private venue in Atlanta &mdash; details shared with accepted applicants.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* === Who it's for (Figma 56:4447, mid band) ===
          Two columns: framing copy on the left, checked audience list
          on the right. Headline follows the IA verbatim. */}
      <section className="relative isolate overflow-hidden bg-off-white pb-24 md:pb-section">
        <div className="container-gutter grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <h2 className="font-serif text-[clamp(2rem,3vw+0.5rem,3rem)] leading-[1.05] text-off-black text-balance">
              For those who are building beyond the blueprint.
            </h2>
            <div className="mt-8 max-w-[52ch] space-y-5 font-sans text-lg leading-[1.55] text-off-black">
              <p className="text-pretty">
                This room is for the women who are working where the disciplines don't have names yet &mdash; and for those committed enough to stand with them. Researchers and builders. Scholars and practitioners. Academics and executives.
              </p>
              <p className="text-pretty">
                The common thread isn't a credential. It's a disposition: the desire to build over the comfort of what already exists.
              </p>
              <p className="text-pretty">
                Applications open soon. Leave your email and we'll let you know when they do.
              </p>
            </div>
            <NotifyForm id="notify-who" className="mt-10" />
          </div>

          <div className="lg:pt-4">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-off-black/70">
              Who belongs here
            </p>
            <ul className="mt-6 space-y-4">
              {audience.map((entry) => (
                <li
                  key={entry}
                  className="flex gap-4 border-b border-off-black/10 pb-4 last:border-b-0"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-oxide-100 text-off-black"
                  >
                    <CheckGlyph />
                  </span>
                  <span className="font-sans text-base leading-[1.5] text-off-black text-pretty">
                    {entry}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* === Four fields (Figma 56:4447, lower band) ===
          Same DisciplineCard set used on the homepage so the cards
          stay in lockstep across the site. CTA anchors back up to the
          hero email capture. */}
      <section className="relative isolate overflow-hidden bg-off-white pb-24 md:pb-section">
        <div className="container-gutter flex flex-col items-center text-center">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-off-black/70">
            Four fields. One frontier.
          </p>
          <h2 className="mt-4 max-w-[36ch] font-serif text-[clamp(1.75rem,2.5vw+0.5rem,2.5rem)] leading-[1.15] text-off-black text-balance">
            AI, robotics, cognitive science, and consciousness are being developed in silos. The questions that matter most live between them.
          </h2>
          <div className="mt-10">
            <Link
              href="#notify-hero"
              className="inline-flex h-[50px] items-center btn-solid-glow rounded-full bg-oxide-100 px-6 font-noto text-lg font-semibold text-off-black transition-transform hover:-translate-y-0.5"
            >
              Get notified
            </Link>
          </div>
          <div className="mt-16 grid w-full max-w-[1488px] gap-6 md:grid-cols-2 lg:grid-cols-4">
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
    </>
  );
}

function CheckGlyph() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M2 6.5L4.75 9L10 3.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
