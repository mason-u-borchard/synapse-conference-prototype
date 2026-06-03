import Link from "next/link";
import { meta } from "@/lib/content";
import { SynapseField } from "@/components/synapse-field";
import { HeroTicker } from "@/components/hero-ticker";
import { DisciplineCard } from "@/components/discipline-card";

// Home title + description come from the layout's default metadata
// (Kelly's 2026-05-26 SEO copy) so there's a single source of truth.

// Event structured data (schema.org/Event) so Google can render an
// event rich result. Built from meta.json where possible to stay in
// sync with the dates/location/sponsor. Per Kelly's 2026-05-26 spec,
// with three corrections: the organizer is an array (the original
// `eventOrganizer` is not a valid schema.org property), Applied Love
// Labs points to applied.love, and the image points at a live static
// asset since the proposed /og-image.jpg does not exist.
const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: `${meta.name} ${meta.edition}`,
  description:
    "A three-day interdisciplinary gathering where women explore AI, robotics, cognitive science, and consciousness.",
  startDate: meta.dates.start,
  endDate: meta.dates.end,
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "Place",
    name: "San Diego, California",
    address: {
      "@type": "PostalAddress",
      addressLocality: "San Diego",
      addressRegion: "CA",
      addressCountry: "US",
    },
  },
  organizer: [
    { "@type": "Organization", name: meta.name, url: "https://thesynapse.co" },
    { "@type": "Organization", name: meta.fiscalSponsor.name, url: meta.fiscalSponsor.href },
  ],
  url: "https://thesynapse.co/attend",
  image: ["https://thesynapse.co/figma/atlanta-skyline.png"],
  keywords: [
    "AI",
    "robotics",
    "cognitive science",
    "consciousness",
    "women in AI",
    "future of intelligence",
    "interdisciplinary conference",
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      {/* Hero per Taylor's Figma (node 19:1070). Dark amethyst-300
          background with the SynapseField cosmic backdrop preserved
          as a subtle overlay (per Mason's "keep the starry bg" note).
          Headline + subhead use the IA Alt 2 copy Mason confirmed;
          ticker copy comes from the Figma export with capacity
          updated from 75 to 100 to match the rest of the site. */}
      {/* Hero + Investment Pitch share a wrapper so the S-shape Wave
          can flow visibly across the section boundary, like in
          Taylor's Figma. The wave is positioned absolutely against
          this wrapper at the top, with `mix-blend-mode: lighten` to
          drop the dark grey backdrop the PNG ships with so only the
          colorful organic shape shows through. */}
      <div className="relative">
        {/* Wave 1 -- spans Hero through Investment Pitch. Flat right
            edge sits flush with the page's right edge (right-0 always,
            no inward indent). Width 36% of wrapper, capped at 460px,
            so the wave's proportions are preserved at every zoom
            level and the text column on the left never gets covered.
            lg-only display: below 1024px the layout is too narrow to
            fit both the wave and the headline without overlap, so
            the wave hides and the text takes the full width. */}
        <img
          src="/figma/wave-1.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-[5%] z-[5] hidden h-auto w-[44%] max-w-[640px] lg:block"
        />

        <section className="relative isolate bg-amethyst-300 -mt-[88px] pt-[88px]">
          {/* SynapseField cosmic backdrop -- the constellation pattern
              from v1 layered over the dark amethyst surface so the hero
              reads as a starry sky. Higher opacity (no blend mode) so
              the dim points of light actually show against the amethyst
              instead of being multiplied away. */}
          <div className="absolute inset-0 overflow-hidden opacity-70 pointer-events-none" aria-hidden="true">
            <SynapseField />
          </div>
        {/* Hero content. min-height removed -- the v1 80vh forced the
            section to nearly fill the viewport, which made the dark
            block feel oppressively tall vs Figma. py-* now sets the
            vertical rhythm. The text content itself is constrained to
            ~58% of the container on lg+ so the wave column on the
            right stays clear regardless of viewport width. */}
        {/* py-28 (was py-20 md:py-28): Figma hero gives the headline a generous top void before the H1 lands. Bumping vertical padding so the headline doesn't sit right under the sticky header. */}
        <div className="relative z-10 mx-auto w-full max-w-gallery px-gutter py-24 md:py-32 lg:py-40">
          <div className="w-full lg:max-w-[60%]">
            {/* Headline updated 2026-05-08 per Taylor's Figma comment: "the headline changed to this. We went back to the old tagline of the conference." */}
            {/* tracking-normal (not -tight): Fraunces in Figma sits with default tracking; pulling it tighter makes the headline look squished against the wave column. */}
            <h1 className="font-serif text-[clamp(2.5rem,4vw+1rem,5rem)] leading-[1.05] text-off-white text-balance">
              Where women connect mind, machine, and what comes next.
            </h1>
            <p className="mt-7 max-w-[40ch] font-sans text-[clamp(1.125rem,0.8vw+0.75rem,1.5rem)] leading-[1.55] text-off-white/95">
              Four fields. Three days. The conversations that don't happen anywhere else. The futures that don't exist without them.
            </p>
            <p className="mt-5 font-mono text-[clamp(0.875rem,0.4vw+0.65rem,1.125rem)] tracking-[0.04em] text-off-white/85">
              AI &middot; Robotics &middot; Cognitive Science &middot; Consciousness
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
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
        </div>

        {/* Multi-color repeating ticker -- now horizontally scrolling
            per Taylor's Figma note. See HeroTicker component for the
            marquee + dual-strip implementation. */}
        <HeroTicker />
      </section>

      {/* Investment Pitch ("Fund the room") per Figma node 19:1092.
          Off-white background, centered content, oxide-200 italic
          accent on the headline. Replaces the v1 highlight-bar +
          support section duplication. */}
      <section className="relative isolate overflow-hidden bg-off-white py-section">
        <div className="container-gutter flex flex-col items-center text-center">
          {/* Circle graphic with slow rotation + gentle pulse per
              Taylor's note ("Like a spinning, gentle heartbeat"). */}
          <img
            src="/figma/circle-graphic.svg"
            alt=""
            width={102}
            height={111}
            className="animate-spin-pulse mb-6 h-[111px] w-[102px]"
            aria-hidden="true"
          />
          <h2 className="max-w-[20ch] font-serif text-[clamp(2.25rem,4vw+0.5rem,3rem)] leading-tight text-off-black">
            The room where this gets built{" "}
            <span className="italic text-oxide-200">needs financial fuel</span>
            <span className="text-oxide-200">.</span>
          </h2>
          <div className="mt-8 max-w-[60ch] font-sans text-lg leading-[1.6] text-off-black">
            <p>The Synapse is a demonstration of a different future, convened by women who are already building it. Your investment puts the right people in the room.</p>
          </div>
          <div className="mt-12 flex flex-col items-center gap-3">
            <Link
              href="/invest"
              className="inline-flex h-[50px] items-center btn-solid-glow rounded-full bg-oxide-100 px-6 font-noto text-lg font-semibold text-off-black transition-transform hover:-translate-y-0.5"
            >
              Fund the room
            </Link>
            <p className="font-sans text-sm text-neutral-300">Gifts are tax deductible</p>
          </div>
        </div>
      </section>
      </div>{/* end Hero+Investment-Pitch wave wrapper */}

      {/* Four Fields per Figma node 19:1107. Discipline cards split
          into a dark text panel (top) and a saturated graphic panel
          (bottom). Card-flip animation is a follow-up; cards are
          static for now. */}
      <section className="relative isolate overflow-hidden bg-off-white pb-section">
        <div className="container-gutter flex flex-col items-center text-center">
          <h2 className="max-w-[18ch] font-serif text-[clamp(2.25rem,4vw+0.5rem,3rem)] leading-tight text-off-black">
            Four fields. One frontier.
          </h2>
          <p className="mt-6 max-w-[58ch] font-sans text-lg leading-[1.6] text-off-black">
            AI, robotics, cognitive science, and consciousness aren't separate stories. The future is written where they converge.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
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
          <div className="mt-20 grid w-full max-w-[1488px] grid-cols-1 gap-3 min-[440px]:grid-cols-2 min-[440px]:gap-4 lg:grid-cols-4 lg:gap-6">
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
              back="This is the threshold — where intention meets material, and what we make becomes real."
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

      {/* Built by women, leading this frontier (Figma 19:1156).
          Dark moss-300 surface with a subtle leaf-pattern background
          on the right. Three pill-shaped bio cards: Julia horizontal
          across the top, Elatia + Beth vertical (rotated -90 / +90)
          along the bottom. Wave 2 of the S-shape graphic visually
          flows behind this section in Taylor's design; placed below
          via absolute positioning. */}
      <section className="relative isolate bg-moss-300 pt-24 pb-10 md:py-section">
        {/* Background leaf pattern, right-anchored, low opacity.
            Inside an overflow-hidden wrapper so it doesn't bleed
            into adjacent sections. */}
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src="/figma/moss-pattern.svg"
            alt=""
            className="absolute right-[-10%] top-0 h-full w-auto opacity-30"
          />
        </div>
        {/* Wave 2 -- the lower portion of the S-shape (Figma 19:1193).
            Now sits at the section's left edge, sized large so its
            green / oxide / amethyst lobes are visible across viewport
            sizes. Hidden on small phones where it would crowd the
            single-column layout. */}
        <img
          src="/figma/wave-2.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-[-15%] top-[-10%] z-[1] hidden h-[120%] w-auto opacity-95 md:block lg:left-[-10%]"
        />
        <div className="container-gutter relative z-10 grid items-center gap-12 lg:grid-cols-[minmax(0,558px)_minmax(0,1fr)]">
          <div className="text-off-white">
            <h2 className="max-w-[12ch] font-serif text-[clamp(2.25rem,4vw+0.5rem,3rem)] leading-[1.2]">
              Built by women leading this frontier
            </h2>
            <p className="mt-8 max-w-[44ch] font-sans text-xl leading-[1.6]">
              Alongside an organizing committee of 25.{" "}
              <Link href="/about" className="text-oxide-100 underline decoration-oxide-100 underline-offset-4 hover:no-underline">
                Read their full bios
              </Link>
              . Gifts are tax-deductible through Applied Love Labs.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
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
          {/* Bio card cluster per Taylor's Figma (node 19:1439).
              Three cards on a 480x716 canvas:
                - Julia: full-width HORIZONTAL card across the top
                  (text-LEFT panel, photo-RIGHT, semicircular RIGHT end)
                - Elatia: VERTICAL card at bottom-LEFT (photo-TOP,
                  text-BOTTOM panel, semicircular TOP)
                - Beth: VERTICAL card at bottom-RIGHT (text-TOP panel,
                  photo-BOTTOM, semicircular BOTTOM)
              The mismatched rounded ends and the
              horizontal/vertical mix is what gives the cluster its
              hand-cut feel in the design. */}
          <div
            className="relative mx-auto w-full max-w-[560px]"
            style={{ aspectRatio: "480 / 716" }}
          >
            {/* Julia -- top, full-width horizontal. Mildly rounded
                LEFT corners, semicircular RIGHT end. */}
            <article
              className="absolute left-0 right-0 top-0 flex items-stretch overflow-hidden"
              style={{
                height: "32.12%",
                borderTopLeftRadius: "24px",
                borderBottomLeftRadius: "24px",
                borderTopRightRadius: "1000px",
                borderBottomRightRadius: "1000px",
              }}
            >
              <div className="flex w-[48%] flex-col justify-end gap-2 bg-orchid-300 p-[clamp(1rem,2vw,1.75rem)] text-off-white">
                <p className="font-sans text-[clamp(1rem,1.2vw+0.4rem,1.25rem)] font-semibold leading-[1.4]">Julia Mossbridge, PhD</p>
                <p className="font-sans text-[clamp(0.85rem,0.7vw+0.5rem,1rem)] leading-[1.4]">Neuroscientist and founder, Applied Love Labs & American Electrodynamics Corp.</p>
              </div>
              <div className="relative flex-1 overflow-hidden">
                <img
                  src="/figma/home-julia.jpg"
                  alt="Julia Mossbridge"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </article>
            {/* Elatia -- bottom-left vertical. Photo on TOP, text panel
                on BOTTOM. Semicircular TOP, mildly rounded BOTTOM. */}
            <article
              className="absolute left-0 flex flex-col items-stretch overflow-hidden"
              style={{
                top: "34.36%",
                width: "47.92%",
                height: "65.64%",
                borderTopLeftRadius: "1000px",
                borderTopRightRadius: "1000px",
                borderBottomLeftRadius: "24px",
                borderBottomRightRadius: "24px",
              }}
            >
              <div className="relative h-[52%] w-full overflow-hidden bg-moss-100">
                <img
                  src="/figma/elatia.jpg"
                  alt="Elatia Abate"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col justify-end gap-2 bg-amethyst-300 p-[clamp(1rem,2vw,1.75rem)] text-off-white">
                <p className="font-sans text-[clamp(1rem,1.2vw+0.4rem,1.25rem)] font-semibold leading-[1.4]">Elatia Abate</p>
                <p className="font-sans text-[clamp(0.85rem,0.7vw+0.5rem,1rem)] leading-[1.4]">Strategy advisor to CEOs in the age of AI; Future of Now.</p>
              </div>
            </article>
            {/* Beth -- bottom-right vertical, mirror of Elatia. Text
                panel on TOP, photo on BOTTOM. Mildly rounded TOP,
                semicircular BOTTOM. */}
            <article
              className="absolute right-0 flex flex-col items-stretch overflow-hidden"
              style={{
                top: "34.36%",
                width: "47.92%",
                height: "65.64%",
                borderTopLeftRadius: "24px",
                borderTopRightRadius: "24px",
                borderBottomLeftRadius: "1000px",
                borderBottomRightRadius: "1000px",
              }}
            >
              <div className="flex flex-col gap-2 bg-azure-300 p-[clamp(1rem,2vw,1.75rem)] text-off-white">
                <p className="font-sans text-[clamp(1rem,1.2vw+0.4rem,1.25rem)] font-semibold leading-[1.4]">Beth Glick</p>
                <p className="font-sans text-[clamp(0.85rem,0.7vw+0.5rem,1rem)] leading-[1.4]">Consciousness researcher and field-builder.</p>
              </div>
              <div className="relative flex-1 overflow-hidden bg-moss-100">
                <img
                  src="/figma/home-beth.png"
                  alt="Beth Glick"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Program Arc preview (Figma 19:1198). Off-white, two-column.
          Left column: small decorative photo, Fraunces "Not a lecture
          hall. / A living laboratory." headline, body, outlined CTA.
          Right column: a 3-row table titled "THE PROGRAM ARC" listing
          Day 1 Expand / Day 2 Weave / Day 3 Emerge with one-line
          descriptions per day. */}
      <section className="relative isolate overflow-hidden bg-off-white py-section">
        <div className="container-gutter relative grid items-center gap-12 lg:grid-cols-[auto_minmax(0,1fr)_auto]">
          {/* Decorative photo. Hidden on narrow viewports since it's
              just a sliver of imagery in Figma. */}
          <div className="relative hidden h-[461px] w-[108px] overflow-hidden rounded-r-3xl lg:block" aria-hidden="true">
            <img
              src="/figma/program-arc-image.jpg"
              alt=""
              className="absolute h-full w-[381px] max-w-none object-cover"
              style={{ left: "-42.55%", top: 0 }}
            />
          </div>
          <div className="max-w-[599px] text-off-black">
            <h2 className="font-serif text-[clamp(2.25rem,4vw+0.5rem,3rem)] leading-[1.2]">
              Not a lecture hall.<br />A living laboratory.
            </h2>
            <p className="mt-6 font-sans text-xl leading-[1.6]">
              Three days built around four disciplines — and the spaces between them. Workshops, facilitated dialogue, and structured time for the conversations that usually only happen in hallways.
            </p>
            <div className="mt-8">
              <Link
                href="/program"
                className="inline-flex h-[50px] items-center btn-outline-glow rounded-full border border-off-black/80 px-6 font-noto text-lg font-semibold text-off-black/80 transition-colors hover:bg-off-black/5"
              >
                Explore the program
              </Link>
            </div>
          </div>
          {/* Program-arc table. Tab heading sits as a flag above the
              card body; the body is rounded only on the bottom-left
              and both-right corners so the tab visually attaches. */}
          <div className="lg:max-w-[665px]">
            <div className="inline-block rounded-tr-3xl bg-off-black/5 px-7 py-4">
              <p className="font-mono text-base uppercase tracking-[0.4em] text-off-black">
                The program arc
              </p>
            </div>
            <ol className="overflow-hidden rounded-bl-3xl rounded-br-3xl rounded-tr-3xl bg-off-black/5">
              <ProgramRow day="DAY 1: Expand" body="Each field brings its frontier claim. The day widens perception before the weaving begins." />
              <li className="mx-7 h-px bg-off-black/15" aria-hidden="true" />
              <ProgramRow day="DAY 2: Weave" body="Where the disciplines meet. Cross-field fishbowls, power sessions, and an open space where ideas find their people." />
              <li className="mx-7 h-px bg-off-black/15" aria-hidden="true" />
              <ProgramRow day="DAY 3: Emerge" body="Three visions. A futures lab. Real commitments before you leave the room." />
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}

// Program-arc row.
// Mono-cased day label + body, padded for the rounded card surround.
function ProgramRow({ day, body }: { day: string; body: string }) {
  return (
    <li className="flex flex-col gap-2 px-7 py-7 md:flex-row md:gap-6">
      <p className="font-mono text-base text-off-black md:w-[135px] md:shrink-0">{day}</p>
      <p className="font-sans text-base leading-[1.4] text-off-black">{body}</p>
    </li>
  );
}

// DisciplineCard lives in src/components/discipline-card.tsx -- it needs hooks for the click-to-flip interaction so it has its own client-component file.
// HeroTicker similarly extracted.
