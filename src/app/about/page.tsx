import type { Metadata } from "next";
import Link from "next/link";
import { FlaskConical, HandHeart, Atom, Flame, Sparkles } from "lucide-react";
import { OrganizingTeam } from "@/components/organizing-team";

export const metadata: Metadata = {
  title: { absolute: "About The Synapse | A New Kind of Futures Gathering" },
  description:
    "The Synapse convenes women across AI, robotics, neuroscience, cognitive science, and consciousness to shape what comes next.",
};

const fieldStatements = [
  "Artificial Intelligence: What does AI become capable of when the room that builds it changes?",
  "Robotics: What do we choose to build into the things that act on our behalf?",
  "Cognitive science: What opens when more than one way of knowing sets the terms?",
  "Consciousness: What becomes available when we treat the hardest question as the starting point?",
];

// Audience list per IA copy + Figma 20:2251 icon set. Icon glyphs
// are chosen to mirror the oxide-tinted ones in Taylor's design:
// flask for researchers, hand-heart for institutional bridge-builders,
// atom for early-career scholars, flame for fuelers, sparkles for
// artists.
const audience = [
  { label: "Leaders in research, industry, and movements shaping what gets built", Icon: FlaskConical },
  { label: "Academics and executives who see across the lines their institutions draw", Icon: HandHeart },
  { label: "Early-career scholars with fresh visions seeking mentorship and collaboration", Icon: Atom },
  { label: "Allies, funders, and partners fueling the mission", Icon: Flame },
  { label: "Artists and practitioners holding what research can't yet name", Icon: Sparkles },
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

      {/* === Moon + Dedication card (Figma 39:1335) ===
          The moon photograph is now FULL-BLEED across the section,
          serving as a textured backdrop. The dedication card floats
          centered on top of the moon. The page-level squiggle still
          sweeps behind the card across both this section and the
          hero above.

          Layout note: on desktop the moon sets the section's intrinsic
          height and the card is absolutely centered over it. On mobile
          the moon, scaled to viewport width, isn't tall enough to
          contain the card -- the card was overflowing into the moss
          section below and Julia's signature got clipped. So on mobile
          we flow the card normally inside the section and pin the moon
          absolutely as a backdrop, letting the card define section
          height. */}
      <section className="relative pb-12 md:pb-section">
        <div className="relative">
          {/* Full-bleed moon. Acts as an absolutely-pinned backdrop on
              mobile (so the card -- in normal flow -- can define the
              section's height) and resumes its intrinsic-height role
              on md+ where the absolute card sits on top of it. */}
          <img
            src="/figma/moon.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full select-none object-cover md:relative md:block md:h-auto md:object-fill"
          />
          {/* Dedication card. On mobile it's in normal flow with
              breathing room above/below so the moon shows through and
              the next section can't overlap. On md+ it returns to the
              absolutely-centered overlay layout. z-10 so it sits above
              the page squiggle. */}
          <div className="relative z-10 flex items-center justify-center px-gutter py-16 md:absolute md:inset-0 md:py-0">
            <DedicationCard />
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
            <p className="font-mono text-sm uppercase tracking-[0.2em] text-off-white/70">
              Who belongs here
            </p>
            <ul className="mt-5 space-y-3">
              {audience.map(({ label, Icon }) => (
                <li
                  key={label}
                  className="flex items-center gap-5 rounded-2xl bg-moss-400 px-6 py-5"
                >
                  <Icon
                    size={22}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="shrink-0 text-oxide-100"
                  />
                  <span className="font-sans text-lg leading-[1.35] text-off-white">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* === Organizing team (Figma 20:1764) ===
          Same dark moss-300 surface as the section above. Two bio
          cards (was three: Elatia stepped off the committee on
          2026-06-03): Julia and Beth, each card a photograph with a
          fade-to-moss-400 gradient at the bottom and the name
          rendered in Fraunces. */}
      <section className="relative isolate overflow-hidden bg-moss-300 px-gutter pb-24 md:pb-section">
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

      {/* === Why this city? (Figma 20:2573) ===
          Centered, off-white surface. A moss-green four-petal
          ornament (built from Taylor's four exported vectors,
          composited in /figma/atlanta-ornament.svg with the
          rotate-45 + Y-flip arrangement baked in) sits above the
          headline; body wraps at ~750px; single outline "Apply to
          attend" CTA below.
          TODO 2026-06-02: city moved Atlanta -> San Diego. Headline
          and body copy below still reference Atlanta because the
          rationale (civil rights, Atlanta tech ecosystem) does not
          transfer. Waiting on Beth/Kelly for new "Why San Diego?"
          paragraph; will swap headline + body in one edit when it
          arrives. Image ref also pending Taylor's new ornament if she
          decides the existing four-petal piece doesn't fit. */}
      <section className="relative isolate overflow-hidden bg-off-white py-24 md:py-section">
        <div className="container-gutter flex flex-col items-center text-center">
          <img
            src="/figma/atlanta-ornament.svg"
            alt=""
            aria-hidden="true"
            width={144}
            height={144}
            className="h-[120px] w-[120px] md:h-[144px] md:w-[144px]"
          />
          <h2 className="mt-6 font-serif text-[clamp(2.5rem,4vw+0.5rem,3rem)] leading-[1.2] text-off-black">
            Why Atlanta?
          </h2>
          <p className="mt-6 max-w-[751px] font-sans text-xl leading-[1.6] text-off-black">
            Atlanta has deep roots in civil rights, a thriving tech and research ecosystem, and a demonstrated commitment to lifting women's voices. It is not a neutral backdrop — it is a deliberate choice.
          </p>
          <div className="mt-12">
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

// Page-spanning dotted squiggle per Figma 39:1335. A gentle S-curve
// runs down the right side of the hero + moon-dedication sections,
// rendered as a string of small dots (stroke-dasharray) with the
// same Fraunces italic ticker text flowing alongside it on a parallel
// offset path. SMIL animates startOffset to keep the text in motion.
// Hidden below md where the right-column space disappears.
function FlowingSquiggle() {
  const tickerText =
    "This is not a conference about the future; This is the future, in formation. · ";
  // Single gentle S-bend down the right side of the page. The text
  // path is offset 36px LEFT of the dot path so the italic text reads
  // alongside the dots rather than on top of them.
  const dotPath =
    "M 1430,40 C 1430,360 1180,520 1180,840 C 1180,1160 1430,1320 1430,1640 C 1430,1960 1240,2150 1080,2440";
  const textPath =
    "M 1394,40 C 1394,360 1144,520 1144,840 C 1144,1160 1394,1320 1394,1640 C 1394,1960 1204,2150 1044,2440";
  return (
    <svg
      viewBox="0 0 1500 2500"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 z-[1] hidden h-full w-full text-oxide-200 md:block"
      aria-hidden="true"
    >
      <defs>
        <path id="about-squiggle-dots" d={dotPath} fill="none" />
        <path id="about-squiggle-text" d={textPath} fill="none" />
      </defs>
      {/* The dotted line itself: zero-width dashes spaced ~18px apart
          render as a chain of small circles when paired with a round
          stroke-linecap. */}
      <use
        href="#about-squiggle-dots"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="0,18"
        fill="none"
      />
      {/* Ticker text running along the parallel offset path. */}
      <text
        fill="currentColor"
        style={{
          fontFamily: "var(--font-fraunces), serif",
          fontSize: "22px",
          fontStyle: "italic",
          letterSpacing: "0.04em",
        }}
      >
        <textPath href="#about-squiggle-text" startOffset="0%">
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
