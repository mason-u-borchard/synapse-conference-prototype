import type { Metadata } from "next";
import Link from "next/link";
import { Plane, Building2, Ticket, Briefcase, ArrowRight as LucideArrowRight, ExternalLink } from "lucide-react";
import { DonateForm } from "@/components/donate-form";
import { getDonationProvider } from "@/lib/donations/provider";

// Sponsorship intake form. Lives in Google Forms while the committee
// shakes out tier pricing; if we ever swap to a CRM-backed intake the
// only change needed is this URL.
const SPONSORSHIP_FORM_URL = "https://forms.gle/bQctfqYjbbXiXEc5A";

export const metadata: Metadata = {
  title: { absolute: "Invest in The Synapse | Funding the Future of Intelligence" },
  description:
    "Support a living laboratory where women at the frontier of AI, robotics, cognitive science, and consciousness gather to shape the future.",
};

// Where-your-investment-goes line items. Copy verbatim from the IA.
const allocation = [
  {
    label: "Speaker travel & compensation",
    body: "We are committed to compensating those who contribute from the front of the room.",
    icon: <Plane size={20} strokeWidth={1.6} aria-hidden="true" />,
  },
  {
    label: "Venue & A/V",
    body: "Physical space matters. We're building an experience, not renting a conference room.",
    icon: <Building2 size={20} strokeWidth={1.6} aria-hidden="true" />,
  },
  {
    label: "Tickets for all attendees",
    body: "Because of our curated size, we are covering the cost of each ticket.",
    icon: <Ticket size={20} strokeWidth={1.6} aria-hidden="true" />,
  },
  {
    label: "Organizational cost",
    body: "Convening this gathering is real work. These funds ensure that the resources are available to make the space real.",
    icon: <Briefcase size={20} strokeWidth={1.6} aria-hidden="true" />,
  },
];

// Sponsor-tier rows per Taylor's 2026-06-16 audit (Figma 411:1095).
// Each tier band reads left-to-right: a pill-rounded amount block in
// the tier color, a white content card with headline + body + "what's
// included" bullets, and a flame photograph anchored on the right.
// On mobile the row collapses to a stacked layout (amount on top,
// content below) and the flame photo is hidden to keep the card legible.
//
// Colors follow Figma's Ember→Beacon ramp:
//   Ember  -> bg-oxide-100  (#F0AA71, off-black text)
//   Flame  -> bg-oxide-200  (#C15918, true-white text)
//   Blaze  -> bg-fire       (#A13014, true-white text -- new "fire" token)
//   Beacon -> bg-oxide-300  (#58200B, true-white text)
type Tier = {
  name: string;
  amount: string;
  headline: string;
  body: string;
  included: { strong: string; rest: string }[];
  blockBg: string;
  blockText: string;
  photo: string;
  leafSvg: string;
  // Per-tier min-height at lg+ from Figma 73:2560. Each row grows
  // taller as the tier scales up, mirroring the value increment.
  heightLg: number;
};

const tiers: Tier[] = [
  {
    name: "Ember",
    amount: "10k",
    headline: "Every fire begins here.",
    body: "Ember sponsors are the first heat. The reason the fire catches at all.",
    included: [
      { strong: "Name listed", rest: "in event program and website" },
      { strong: "Select 1 invitee,", rest: "approved by conference team" },
      { strong: "Two social media", rest: "recognition posts" },
    ],
    blockBg: "bg-oxide-100",
    blockText: "text-true-white",
    photo: "/figma/tier-ember.jpg",
    leafSvg: "/figma/tier-ember-leaf.svg",
    heightLg: 234,
  },
  {
    name: "Flame",
    amount: "25k",
    headline: "Steady, sustaining, drawing others toward it.",
    body: "Flame sponsors are the steady energy that keeps everything burning.",
    included: [
      { strong: "Logo placement:", rest: "program, website, signage, main stage, select materials" },
      { strong: "Select 2 invitees,", rest: "approved by conference team" },
      { strong: "Two social media", rest: "recognition posts + dedicated spotlight" },
    ],
    blockBg: "bg-oxide-200",
    blockText: "text-true-white",
    photo: "/figma/tier-flame.jpg",
    leafSvg: "/figma/tier-flame-leaf.svg",
    heightLg: 278,
  },
  {
    name: "Blaze",
    amount: "50k",
    headline: "A force that reshapes what surrounds it.",
    body: "Blaze sponsors power the higher-order thinking at the core of The Synapse's mission.",
    included: [
      { strong: "Logo placement:", rest: "program, website, signage, main stage, select materials" },
      { strong: "Select 2 invitees,", rest: "approved by conference team" },
      { strong: "Two social media", rest: "recognition posts + dedicated spotlight" },
      { strong: "Featured", rest: "interview, project, or quote in event communications" },
    ],
    blockBg: "bg-fire",
    blockText: "text-true-white",
    photo: "/figma/tier-blaze.jpg",
    leafSvg: "/figma/tier-blaze-leaf.svg",
    heightLg: 346,
  },
  {
    name: "Beacon",
    amount: "100k",
    headline: "Fire with direction. Visible from a distance.",
    body: "Beacon sponsors are the animating force behind everything The Synapse aspires to be.",
    included: [
      { strong: "Exclusive", rest: "naming rights to a signature event moment" },
      { strong: "Dedicated", rest: "branded space or experience, designed collaboratively" },
      { strong: "Year-round", rest: "recognition on The Synapse website + communications" },
      { strong: "Select 4 invitees,", rest: "approved by conference team" },
      { strong: "Direct introduction", rest: "to speakers and community leaders" },
    ],
    blockBg: "bg-oxide-300",
    blockText: "text-true-white",
    photo: "/figma/tier-beacon.jpg",
    leafSvg: "/figma/tier-beacon-leaf.svg",
    heightLg: 528,
  },
];

export default function InvestPage() {
  const provider = getDonationProvider();
  return (
    <>
      {/* === Hero (Figma 72:1589) === Left column carries the
          sponsorship headline + body + stat-row hairlines + the
          Request to sponsor pill with an inline "Or, donate below"
          link. Right column at lg+ is the rotating ring badge
          wrapping the leaf-circle ornament. */}
      <section className="relative isolate overflow-hidden bg-off-white -mt-[88px] pt-[88px]">
        <div className="container-gutter relative z-10 grid items-center gap-12 py-24 md:py-32 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div className="max-w-[820px]">
            <h1
              className="font-serif text-[clamp(2.5rem,5vw+0.5rem,3.75rem)] leading-[1.05] text-off-black text-balance"
              style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
            >
              This is a demonstration of a different future.
            </h1>
            <div className="mt-8 max-w-[55ch] space-y-6 font-sans text-xl leading-[1.4] text-off-black">
              <p>Your investment makes this possible.</p>
              <p>
                AI, robotics, cognitive science, and consciousness are the fields shaping the future of humanity. The people best positioned to ask the hardest questions have been systematically kept out of the rooms where those questions get answered.
              </p>
            </div>
            <dl className="mt-12 max-w-[535px] divide-y divide-off-black/15">
              <StatRow label="100" body="researchers, executives, builders, and practitioners" />
              <StatRow label="3 days." body="San Diego, California · October 2026" />
              <StatRow
                label="Convened by"
                body="women already doing the work and those committed to standing with them"
              />
            </dl>
            <div className="mt-12 flex flex-col items-start gap-3">
              <Link
                href={SPONSORSHIP_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-[50px] items-center btn-solid-glow gap-2 rounded-full bg-oxide-100 px-6 font-noto text-lg font-semibold text-off-black transition-transform hover:-translate-y-0.5"
              >
                Request to sponsor
                <ExternalLink size={18} strokeWidth={1.6} aria-hidden="true" />
              </Link>
              <p className="font-sans text-base text-off-black">
                Or,{" "}
                <Link
                  href="#donate"
                  className="text-oxide-200 underline underline-offset-2 hover:text-oxide-300"
                >
                  donate
                </Link>{" "}
                below
              </p>
            </div>
          </div>
          {/* Rotating ring badge per Figma 73:2171. Single SVG asset
              with the outer thin border, ring text, and leaf-circle
              composition baked together; the whole thing rotates slowly. */}
          <div className="relative mx-auto hidden h-[440px] w-[440px] shrink-0 lg:block">
            <img
              src="/figma/invest-badge.svg"
              alt=""
              aria-hidden="true"
              className="animate-slow-spin absolute inset-0 h-full w-full"
            />
          </div>
        </div>
      </section>

      {/* === Sponsor tiers ===
          Centered heading + intro + single Request CTA, then a vertical
          stack of four horizontal tier rows. Each row pairs a colored
          amount block (oxide-100 → 400 ramp) with body + benefits. */}
      <section
        id="sponsor-tiers"
        aria-labelledby="sponsor-tiers-heading"
        className="relative isolate overflow-hidden bg-off-white py-24 md:py-section"
      >
        <div className="container-gutter">
          <div className="mx-auto max-w-[826px] text-center">
            <div className="mx-auto flex h-[122px] w-[122px] items-center justify-center">
              <img
                src="/figma/tier-section-ornament.svg"
                alt=""
                aria-hidden="true"
                className="h-[86px] w-[86px] rotate-45"
              />
            </div>
            <h2
              id="sponsor-tiers-heading"
              className="mt-6 font-serif text-[clamp(2.25rem,4vw+0.5rem,3rem)] leading-[1.2] text-off-black"
            >
              Four tiers of sponsorship
            </h2>
            <p className="mt-6 font-sans text-xl leading-[1.4] text-off-black">
              We approach sponsorship as mutual, transparent <em>partnership</em>.
            </p>
            <p className="mt-6 font-sans text-xl leading-[1.4] text-off-black">
              Sponsors gain meaningful visibility and relationships. The gathering gains the resources to come to life. Together, we build something none of us could build alone.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3">
              <Link
                href={SPONSORSHIP_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-[50px] items-center btn-solid-glow gap-2 rounded-full bg-oxide-100 px-6 font-noto text-lg font-semibold text-off-black transition-transform hover:-translate-y-0.5"
              >
                Request to sponsor
                <ExternalLink size={18} strokeWidth={1.6} aria-hidden="true" />
              </Link>
              <p className="font-sans text-base text-off-black">
                Or,{" "}
                <Link
                  href="#donate"
                  className="text-oxide-200 underline underline-offset-2 hover:text-oxide-300"
                >
                  donate
                </Link>{" "}
                below
              </p>
            </div>
          </div>
          <div className="mt-14 flex flex-col gap-10">
            {tiers.map((tier) => (
              <TierRow key={tier.name} tier={tier} />
            ))}
          </div>
        </div>
      </section>

      {/* === Goal + Allocation + Donate band (Figma 73:3051) ===
          The $100k goal section, the Where Your Investment Goes panel,
          and the Believe in the room donate card all share a single
          relatively-positioned wrapper so the Wave 1 graphic can span
          all three -- aaron-burden enters above the donate card,
          michael-bauser threads behind the card between the form
          fields, and emanuel-haas flows down past the section into
          the footer beneath. */}
      <div className="relative isolate overflow-visible bg-off-white">
        <img
          src="/figma/invest-wave.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-1/2 bottom-0 z-0 hidden h-auto w-[50vw] object-contain opacity-95 lg:block"
        />
        <section className="relative z-10 py-24 md:py-section">
        <div className="container-gutter relative grid items-start gap-20 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
          <div>
            <h2 className="font-serif text-[clamp(2.25rem,4vw+0.5rem,3rem)] leading-[1.2] text-off-black">
              $100k by June 30
            </h2>
            <p className="mt-6 font-sans text-xl leading-[1.4] text-off-black">
              This is the threshold that makes The Synapse viable. Below it, we cannot commit to the people, the place, or the program. Your investment is what puts the right people in the room.
            </p>
            <div className="mt-12 flex flex-col items-center gap-3">
              <Link
                href={SPONSORSHIP_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-[50px] items-center btn-solid-glow gap-2 rounded-full bg-oxide-100 px-6 font-noto text-lg font-semibold text-off-black transition-transform hover:-translate-y-0.5"
              >
                Request to sponsor
                <ExternalLink size={18} strokeWidth={1.6} aria-hidden="true" />
              </Link>
              <p className="font-sans text-base text-off-black">
                Or, <Link href="#donate" className="text-oxide-200 underline underline-offset-2">donate</Link> below
              </p>
            </div>
          </div>
          <div>
            <p className="font-mono text-base uppercase tracking-[0.14em] text-off-black/85">
              Where your investment goes
            </p>
            <ul className="mt-4 divide-y divide-oxide-300/30 rounded-xl border border-oxide-300/30 bg-true-white py-2">
              {allocation.map((item) => (
                <li key={item.label} className="flex items-center gap-5 px-6 py-5">
                  <span aria-hidden="true" className="shrink-0 text-oxide-200">
                    {item.icon}
                  </span>
                  <div className="flex flex-col gap-2">
                    <p className="font-sans text-lg text-off-black">{item.label}</p>
                    <p className="font-sans text-base font-light text-off-black/80">{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* === Donation form (Figma 73:3061) ===
          Card wraps the Virtuous embed. The wave graphic is owned by
          the parent wrapper so it can span this section + the goal
          section above. */}
      <section
        id="donate"
        aria-labelledby="donate-heading"
        className="relative z-10 pb-24 md:pb-section"
      >
        <div className="container-gutter relative z-10 flex justify-center">
          <div className="w-full max-w-[650px] overflow-hidden rounded-xl shadow-[0_24px_60px_-30px_rgba(88,32,11,0.35)]">
            <header className="bg-oxide-300 px-[30px] py-9 text-center text-true-white">
              <h2
                id="donate-heading"
                className="font-serif text-[26px] font-semibold leading-[1.4]"
                style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 1" }}
              >
                Believe in the room
              </h2>
              <p className="mt-3 font-sans text-base leading-[1.4]">
                Sponsorship isn&apos;t the only way to invest in this gathering. If the mission matters to you, your gift in any amount goes directly toward making it real.
              </p>
            </header>
            <div className="border-b border-l border-r border-oxide-300 bg-off-white p-6 md:p-10">
              <DonateForm
                providerName={provider.name}
                providerLabel={provider.label}
                embedOnly={provider.embedOnly}
                embedUrl={provider.embedUrl}
                virtuous={provider.virtuous}
              />
              <p className="mt-6 text-center font-sans text-xs italic leading-[1.4] text-[#66564d]">
                Gifts are fully tax deductible. Receipts issued by Applied Love Labs.
              </p>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}

// Bold label + plain detail, separated by hairlines. Used in the hero
// stat list to surface the headcount / duration / convener line at a glance.
function StatRow({ label, body }: { label: string; body: string }) {
  return (
    <div className="py-5 first:pt-0 last:pb-0">
      <p className="font-sans text-xl leading-[1.4] text-off-black">
        <span className="font-semibold">{label}</span>{" "}
        <span>{body}</span>
      </p>
    </div>
  );
}

function ArrowRight() {
  return <LucideArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />;
}

// Horizontal tier band per Figma 73:2560. Three pieces sit flush in
// a 313px / fluid / 234px grid at lg+, each carrying its own corner
// rounding: the amount pill takes a 1000px radius on the left only
// (capped to half its width, so smaller tiers read circular and the
// tall Beacon stretches into an oval), and the flame photo on the
// right takes a 20px radius -- those are the only two rounded edges
// in the visible row. Per-tier min-height (from Figma) makes each
// row grow taller as the sponsorship value increases. Mobile drops
// to a stacked card layout, photo hidden.
function TierRow({ tier }: { tier: Tier }) {
  return (
    <article
      className="grid grid-cols-1 gap-3 lg:grid-cols-[313px_minmax(0,1fr)_234px] lg:gap-0"
      style={{ ["--tier-h" as string]: `${tier.heightLg}px` }}
    >
      {/* Amount pill -- left semi-pill on lg+, rounded-2xl card on
          mobile. Right corners go flat at lg+ so the pill butts up
          against the white middle with no visible seam. */}
      <div
        className={`relative flex flex-col items-center justify-center overflow-hidden rounded-2xl px-10 py-12 ${tier.blockBg} ${tier.blockText} lg:rounded-l-[1000px] lg:rounded-r-none lg:px-0 lg:py-0 lg:min-h-[var(--tier-h)]`}
      >
        <img
          src={tier.leafSvg}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-50 mix-blend-multiply"
        />
        <p className="relative flex items-start font-serif font-bold leading-none">
          <span className="text-[44px] leading-[1.4] [font-variation-settings:'SOFT'_0,'WONK'_1]">$</span>
          <span className="text-[58px] leading-none [font-variation-settings:'SOFT'_0,'WONK'_1]">
            {tier.amount}
          </span>
        </p>
        <p className="relative mt-2 font-mono text-[22px] font-medium uppercase tracking-[0.1em]">
          {tier.name}
        </p>
      </div>
      {/* White middle. Flat all around at lg+ (the pill on its left
          and the photo on its right carry the visible rounding);
          headline column is vertically centered while the bullets
          column hangs from the top, matching Figma. */}
      <div className="flex flex-col gap-8 rounded-2xl bg-true-white px-8 py-8 lg:flex-row lg:gap-10 lg:rounded-none lg:p-10 lg:min-h-[var(--tier-h)]">
        <div className="flex flex-col gap-5 lg:w-[280px] lg:shrink-0 lg:justify-center">
          <h3 className="font-serif text-2xl leading-[1.2] text-off-black">{tier.headline}</h3>
          <p className="font-sans text-base italic leading-[1.5] text-oxide-300/80">
            {tier.body}
          </p>
        </div>
        <div className="flex flex-1 flex-col gap-5">
          <p className="font-mono text-sm font-light uppercase tracking-[0.14em] text-oxide-200">
            What&apos;s included
          </p>
          <ul className="divide-y divide-off-black/10">
            {tier.included.map((row, i) => (
              <li
                key={i}
                className="py-3 font-sans text-base leading-[1.45] text-off-black first:pt-0 last:pb-0"
              >
                <span className="font-semibold">{row.strong}</span> {row.rest}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Flame photo. 20px rounding on the right edge only -- the
          left edge sits flat against the white middle. */}
      <div className="hidden overflow-hidden lg:block lg:rounded-r-[20px] lg:min-h-[var(--tier-h)]">
        <img
          src={tier.photo}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
    </article>
  );
}
