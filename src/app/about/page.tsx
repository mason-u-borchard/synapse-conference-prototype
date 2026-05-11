import type { Metadata } from "next";
import Link from "next/link";
import { OrganizingTeam } from "@/components/organizing-team";

export const metadata: Metadata = {
  title: "About",
  description:
    "Four fields. The questions that matter live in the spaces between AI, robotics, cognitive science, and consciousness.",
};

const fieldStatements = [
  "Artificial Intelligence: What does AI become capable of when the room that builds it changes?",
  "Robotics: What do we choose to build into the things that act on our behalf?",
  "Cognitive science: What opens when more than one way of knowing sets the terms?",
  "Consciousness: What becomes available when we treat the hardest question as the starting point?",
];

// Audience list copy updated 2026-05-08 to match Figma. Was previously
// the older list with "Women leading research labs..." -- replaced
// per the screenshot Mason flagged.
const audience = [
  "Leaders in research, industry, and movements shaping what gets built",
  "Academics and executives who see across the lines their institutions draw",
  "Early-career scholars with fresh visions seeking mentorship and collaboration",
  "Allies, funders, and partners fueling the mission",
  "Artists and practitioners holding what research can't yet name",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero + moon-dedication share a common off-white background and
          a single page-spanning flowing-text squiggle that weaves from
          the upper-right down through both sections. The squiggle is a
          tall absolutely-positioned SVG; it lives behind the hero text
          (z-10) and dedication card (z-10) but in front of the moon
          image so the orange ticker reads across the moon's surface,
          matching Taylor's Figma. */}
      <div className="relative isolate overflow-hidden bg-off-white -mt-[88px] pt-[88px]">
        <FlowingSquiggle />
      {/* === Hero (Figma 18:612) ===
          Eyebrow + 4-line "spaces between" headline, field statements
          separated by hairlines, closing paragraph, two CTAs. The moon
          image with the dedication card overlay follows in the next
          section. */}
      <section className="relative">
        <div className="container-gutter relative z-10 flex flex-col py-24 md:py-32">
          <div className="max-w-[55ch]">
            <p className="font-mono text-base tracking-[0.04em] text-off-black">
              AI &middot; Robotics &middot; Cognitive Science &middot; Consciousness
            </p>
            <h1 className="mt-5 font-serif text-[clamp(2.5rem,5vw+0.5rem,3.75rem)] leading-[1.05] text-off-black text-balance">
              The questions that matter live in the spaces{" "}
              <span className="italic">between.</span>
            </h1>
          </div>
          <div className="mt-12 max-w-[60ch] divide-y divide-off-black/15">
            {fieldStatements.map((line) => (
              <p
                key={line}
                className="font-sans text-xl leading-[1.4] text-off-black py-5 first:pt-0 last:pb-0"
              >
                {line}
              </p>
            ))}
          </div>
          <p className="mt-10 max-w-[60ch] font-sans text-xl leading-[1.4] text-off-black">
            These four fields are not separate conversations. They are one conversation that hasn't happened yet. The Synapse is where it begins.
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

      {/* === Moon + Dedication card (Figma 18:634 + 19:1058) ===
          Moon image is contained inside the section (not full-bleed).
          The dedication card sits center-right OVER the moon. The
          flowing-text squiggle (rendered in the page-level wrapper
          above) sweeps across this section behind the card. Copy
          updated 2026-05-08 per Taylor's newer Figma version
          (headline now "This is a dedication"; second paragraph
          opens with "The Synapse is a dedication"). */}
      <section className="relative py-12 md:py-section">
        <div className="container-gutter relative">
          <div className="relative mx-auto grid w-full max-w-[1180px] items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:gap-0">
            {/* Moon photograph -- contained, not full-bleed. Sits on
                the LEFT half on md+, full-width on smaller viewports.
                No z-index so the squiggle text reads across its face. */}
            <div className="md:col-start-1 md:row-start-1 md:-mr-16 lg:-mr-24">
              <img
                src="/figma/moon.png"
                alt=""
                aria-hidden="true"
                className="block w-full max-w-[720px]"
              />
            </div>

            {/* Dedication card. z-10 so it sits in front of the
                page-level squiggle. */}
            <div className="relative z-10 md:col-start-2 md:row-start-1">
              <DedicationCard />
            </div>
          </div>
        </div>
      </section>
      </div>

      {/* === For the women / Who belongs here (Figma 18:649) ===
          Dark moss-300 surface with a 2-column layout: pitch + CTAs on
          the left, a moss-400 audience-list panel on the right. */}
      <section className="relative isolate bg-moss-300 px-gutter py-24 md:py-section">
        <div className="container-gutter grid items-center gap-16 lg:grid-cols-[minmax(0,494px)_minmax(0,1fr)]">
          <div className="text-off-white">
            <h2 className="font-serif text-[clamp(2.25rem,4vw+0.5rem,3rem)] leading-[1.2]">
              For those who are building beyond the blueprint.
            </h2>
            <div className="mt-6 space-y-5 font-sans text-xl leading-[1.4]">
              <p>
                This room is for the women who are working where the disciplines don't have names yet — and for those committed enough to stand with them. Researchers and builders. Scholars and practitioners. Academics and executives.
              </p>
              <p>
                The common thread isn't a credential. It's a disposition: the desire to build over the comfort of what already exists.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="/invest"
                className="inline-flex h-[50px] items-center btn-solid-glow rounded-full bg-oxide-100 px-6 font-noto text-lg font-semibold text-off-black transition-transform hover:-translate-y-0.5"
              >
                Fund the room
              </Link>
              <Link
                href="/attend"
                className="inline-flex h-[50px] items-center btn-outline-glow rounded-full border border-off-white/80 px-6 font-noto text-lg font-semibold text-off-white transition-colors hover:bg-off-white/10"
              >
                Apply to attend
              </Link>
            </div>
          </div>
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.14em] text-off-white/80">
              Who belongs here
            </p>
            <ul className="mt-4 divide-y divide-moss-200 rounded-xl border border-moss-200 bg-moss-400">
              {audience.map((item) => (
                <li key={item} className="flex items-center gap-5 px-6 py-5">
                  <span
                    aria-hidden="true"
                    className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-off-white/40"
                  >
                    <span className="h-1.5 w-1.5 btn-solid-glow rounded-full bg-oxide-100" />
                  </span>
                  <span className="font-sans text-lg text-off-white">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* === Organizing team (Figma 20:1764) ===
          Same dark moss-300 surface as the section above. Three bio
          cards: Elatia (left, smaller), Julia (center, larger),
          Beth (right, smaller). Each card is a photograph with a
          fade-to-moss-400 gradient at the bottom and the name
          rendered in Fraunces. */}
      <section className="relative isolate bg-moss-300 px-gutter pb-24 md:pb-section">
        <div className="container-gutter flex flex-col items-center text-off-white">
          <h2 className="font-serif text-[clamp(2.25rem,4vw+0.5rem,3rem)] leading-[1.2]">
            The organizing team
          </h2>
          {/* Three clickable bio cards. Active card grows in place,
              other cards stay in position but smaller. The active
              person's bio renders below all three -- per Taylor's
              Figma spec ("On click, the card/name grows and correct
              bio is printed below. Cards can stay in their original
              location, just growing/shrinking in size with the
              interaction"). Default active = Julia. */}
          <OrganizingTeam />
          <div className="mt-12 h-px w-full max-w-[1040px] bg-off-white/15" aria-hidden="true" />
          <p className="mt-12 max-w-[528px] text-center font-sans text-base leading-[1.4]">
            The Synapse is also shaped by an organizing committee of 25 researchers, builders, and practitioners from across the four fields.
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/invest"
              className="inline-flex h-[50px] items-center btn-solid-glow rounded-full bg-oxide-100 px-6 font-noto text-lg font-semibold text-off-black transition-transform hover:-translate-y-0.5"
            >
              Fund the room
            </Link>
            <Link
              href="/attend"
              className="inline-flex h-[50px] items-center btn-outline-glow rounded-full border border-off-white/80 px-6 font-noto text-lg font-semibold text-off-white transition-colors hover:bg-off-white/10"
            >
              Apply to attend
            </Link>
          </div>
        </div>
      </section>

      {/* === Why Atlanta? (Figma 20:1838) ===
          Off-white bg with two flanking decorative leaf clusters at
          20% opacity. Skipping the multi-vector pattern reconstruction
          for now and using the existing discipline graphic SVGs as
          atmospheric fillers; can be replaced once Taylor exports the
          actual pattern set. */}
      <section className="relative isolate overflow-hidden bg-off-white py-24 md:py-section">
        <div className="container-gutter relative flex items-center justify-center">
          <div className="hidden lg:flex shrink-0 opacity-20" aria-hidden="true">
            <img src="/figma/graphic-consciousness.svg" alt="" className="h-[315px] w-[315px]" />
          </div>
          <div className="relative max-w-[599px] flex-1 px-gutter text-off-black">
            <h2 className="font-serif text-[clamp(2.25rem,4vw+0.5rem,3rem)] leading-[1.2]">
              Why Atlanta?
            </h2>
            <p className="mt-6 font-sans text-xl leading-[1.6]">
              Atlanta has deep roots in civil rights, a thriving tech and research ecosystem, and a demonstrated commitment to lifting women's voices. It is not a neutral backdrop — it is a deliberate choice.
            </p>
          </div>
          <div className="hidden lg:flex shrink-0 gap-10 opacity-20" aria-hidden="true">
            <img src="/figma/graphic-ai.svg" alt="" className="h-[315px] w-[315px]" />
            <img src="/figma/graphic-cs.svg" alt="" className="h-[315px] w-[315px]" />
            <img src="/figma/graphic-robotics.svg" alt="" className="h-[315px] w-[315px]" />
          </div>
        </div>
      </section>

      {/* Press / contact carry-over from v1 -- not in Figma, kept as
          an inbound channel until Taylor designs an explicit one. */}
      <section className="relative isolate bg-off-white px-gutter pb-24">
        <div className="container-gutter mx-auto max-w-3xl">
          <h2 className="font-serif text-3xl text-off-black">Press and inquiries</h2>
          <p className="mt-4 font-sans text-lg leading-[1.6] text-off-black/85">
            For media passes, speaker interviews, or the official press kit, reach the organizing committee at{" "}
            <a
              href="mailto:hello@thesynapse.co"
              className="text-off-black underline decoration-oxide-200 decoration-2 underline-offset-4"
            >
              hello@thesynapse.co
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}

// Page-spanning flowing-text squiggle. Sits behind the hero text and
// dedication card but in front of the moon image, per Taylor's Figma.
// The path traces four wide horizontal sweeps from upper-right down
// to bottom-right, weaving edge to edge across the page so the
// "ticker" reads as a single continuous flow. SMIL animates
// startOffset for the continuous-flow effect Taylor called out in
// the pink note ("would be cool if this text could continuously flow
// along this path, like a ticker"). Hidden below md because the
// horizontal sweeps don't read on narrow screens.
function FlowingSquiggle() {
  const tickerText =
    "This is not a conference about the future; This is the future, in formation. · ";
  return (
    <svg
      viewBox="0 0 1500 2500"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 z-[1] hidden h-full w-full text-oxide-200 md:block"
      aria-hidden="true"
    >
      <defs>
        <path
          id="about-flowing-squiggle"
          d="M 1490,30 C 1500,200 1100,200 1100,380 C 1100,540 1490,540 1490,720 C 1490,900 1100,900 1100,1080 C 1100,1240 1490,1240 1490,1400 C 1490,1600 1100,1750 850,1900 C 650,2050 500,2250 400,2480"
          fill="none"
        />
      </defs>
      <text
        fill="currentColor"
        style={{
          fontFamily: "var(--font-fraunces), serif",
          fontSize: "26px",
          fontStyle: "italic",
          letterSpacing: "0.04em",
        }}
      >
        <textPath href="#about-flowing-squiggle" startOffset="0%">
          {tickerText.repeat(8)}
          <animate
            attributeName="startOffset"
            from="0%"
            to="-12.5%"
            dur="80s"
            repeatCount="indefinite"
          />
        </textPath>
      </text>
    </svg>
  );
}

// Dedication card. The flowing-text squiggle that wraps around the
// card is rendered at the page level (FlowingSquiggle) so it can
// span both the hero and the moon-dedication section.
function DedicationCard() {
  return (
    <div className="relative mx-auto w-full max-w-[630px]">
      {/* The card itself */}
      <article
        className="relative rounded-[40px] bg-off-white p-8 md:p-12"
        style={{
          boxShadow:
            "8px 8px 24px 0 rgba(0,0,0,0.18), inset -8px -8px 16px 0 rgba(0,0,0,0.04)",
        }}
      >
        <h2 className="font-serif text-[clamp(1.75rem,2.5vw+0.5rem,2.5rem)] leading-[1.15] text-off-black">
          This is a dedication
        </h2>
        <div className="mt-7 space-y-5 font-sans text-[clamp(0.95rem,0.5vw+0.6rem,1.0625rem)] leading-[1.6] text-off-black">
          <p>
            AI, consciousness, cognitive science, and robotics are the fields shaping the future of humanity. They remain overwhelmingly led by elite, male-ordered institutions. After the Epstein files made plain how actively women have been suppressed in these disciplines, a small group of us decided to stop waiting for a better invitation and build one.
          </p>
          <p>
            <strong className="font-semibold">The Synapse is a dedication</strong> to the rigorous, controversial, embodied, relational work women are already doing, and to the collaborative future we intend to build together.
          </p>
        </div>
        <div className="mt-8">
          <p
            className="text-[clamp(2.5rem,3vw+1rem,3.5rem)] leading-none text-off-black"
            style={{ fontFamily: "var(--font-style-script), cursive" }}
          >
            Julia
          </p>
          <p className="mt-3 font-sans italic text-[clamp(0.875rem,0.4vw+0.5rem,1rem)] text-off-black/85">
            Julia Mossbridge, PhD
            <br aria-hidden="true" />
            Founder, Applied Love Labs
          </p>
        </div>
      </article>
    </div>
  );
}

// (BioCard component removed -- replaced by the interactive
// <OrganizingTeam> client component in src/components/.)
