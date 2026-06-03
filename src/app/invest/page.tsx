import type { Metadata } from "next";
import Link from "next/link";
import { Plane, Building2, Ticket, Briefcase, ArrowRight as LucideArrowRight } from "lucide-react";
import { DonateForm } from "@/components/donate-form";
import { getDonationProvider } from "@/lib/donations/provider";
import { meta } from "@/lib/content";

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

// Sponsor-tier rows per Figma 55:707. Each tier reads as a horizontal
// band: colored "amount" block on the left, headline + italic body in
// the middle, "what's included" bullets on the right. The four-step
// color ramp (oxide-100 → 400) is the visual through-line.
type Tier = {
  name: string;
  amount: string;
  headline: string;
  body: string;
  included: { strong: string; rest: string }[];
  blockClass: string;
  blockText: string;
};

const tiers: Tier[] = [
  {
    name: "Ember",
    amount: "$10k",
    headline: "Every fire begins here.",
    body: "Ember sponsors are the first heat. The reason the fire catches at all.",
    included: [
      { strong: "Name listed", rest: "in event program and website" },
      { strong: "Select 1 invitee,", rest: "approved by conference team" },
      { strong: "Two social media", rest: "recognition posts" },
    ],
    blockClass: "bg-oxide-100 text-off-black",
    blockText: "text-off-black",
  },
  {
    name: "Flame",
    amount: "$25k",
    headline: "Steady, sustaining, drawing others toward it.",
    body: "Flame sponsors are the steady energy that keeps everything burning.",
    included: [
      { strong: "Logo placement:", rest: "program, website, signage, main stage, select materials" },
      { strong: "Select 2 invitees,", rest: "approved by conference team" },
      { strong: "Two social media", rest: "recognition posts + dedicated spotlight" },
    ],
    blockClass: "bg-oxide-200 text-true-white",
    blockText: "text-true-white",
  },
  {
    name: "Blaze",
    amount: "$50k",
    headline: "A force that reshapes what surrounds it.",
    body: "Blaze sponsors power the higher-order thinking at the core of The Synapse's mission.",
    included: [
      { strong: "Logo placement:", rest: "program, website, signage, main stage, select materials" },
      { strong: "Select 2 invitees,", rest: "approved by conference team" },
      { strong: "Two social media", rest: "recognition posts + dedicated spotlight" },
      { strong: "Featured", rest: "interview, project, or quote in event communications" },
    ],
    blockClass: "bg-oxide-300 text-true-white",
    blockText: "text-true-white",
  },
  {
    name: "Beacon",
    amount: "$100k",
    headline: "Fire with direction. Visible from a distance.",
    body: "Beacon sponsors are the animating force behind everything The Synapse aspires to be.",
    included: [
      { strong: "Exclusive", rest: "naming rights to a signature event moment" },
      { strong: "Dedicated", rest: "branded space or experience, designed collaboratively" },
      { strong: "Year-round", rest: "recognition on The Synapse website + communications" },
      { strong: "Select 4 invitees,", rest: "approved by conference team" },
      { strong: "Direct introduction", rest: "to speakers and community leaders" },
    ],
    blockClass: "bg-oxide-400 text-true-white",
    blockText: "text-true-white",
  },
];

export default function InvestPage() {
  const provider = getDonationProvider();
  return (
    <>
      {/* === Hero (Figma 55:707 top) ===
          Off-white surface. Left: Fraunces headline + Inter subhead
          + 3-stat hairline list + single oxide "Request to sponsor"
          CTA. Right: rotating ring text around the leaf-circle. */}
      <section className="relative isolate overflow-hidden bg-off-white -mt-[88px] pt-[88px]">
        <div className="container-gutter relative z-10 grid items-center gap-12 py-24 md:py-32 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div className="max-w-[820px]">
            <h1 className="font-serif text-[clamp(2.5rem,5vw+0.5rem,3.75rem)] leading-[1.0] text-off-black text-balance">
              Not a proposal for a different future. A demonstration of one.
            </h1>
            <div className="mt-12 max-w-[55ch] space-y-6 font-sans text-xl leading-[1.4] text-off-black">
              <p>Your investment makes this possible.</p>
              <p>
                AI, robotics, cognitive science, and consciousness are the fields shaping the future of humanity. The people best positioned to ask the hardest questions have been systematically kept out of the rooms where those questions get answered.
              </p>
            </div>
            <dl className="mt-12 max-w-[535px] divide-y divide-off-black/15">
              <StatRow label="100" body="researchers, builders, and practitioners." />
              <StatRow label="3 days." body="San Diego, California. October 2026." />
              <StatRow
                label="Convened by"
                body="women already doing the work — and those committed to standing with them."
              />
            </dl>
            <div className="mt-12 flex flex-wrap items-center gap-3">
              <Link
                href={SPONSORSHIP_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-[50px] items-center btn-solid-glow gap-2 rounded-full bg-oxide-100 px-6 font-noto text-lg font-semibold text-off-black transition-transform hover:-translate-y-0.5"
              >
                Request to sponsor
                <ArrowRight />
              </Link>
              <Link
                href="#donate"
                className="inline-flex h-[50px] items-center btn-outline-glow rounded-full border border-off-black/80 px-6 font-noto text-lg font-semibold text-off-black/80 transition-colors hover:bg-off-black/5"
              >
                Or, donate below
              </Link>
            </div>
          </div>
          {/* Circle badge. Rotating ring text wraps a textPath around a
              circle; the leaf-circle SVG sits in the center. */}
          <div className="relative mx-auto hidden h-[440px] w-[440px] shrink-0 lg:block">
            <svg
              viewBox="0 0 440 440"
              className="animate-slow-spin absolute inset-0 h-full w-full text-off-black/85"
              aria-hidden="true"
            >
              <defs>
                <path
                  id="invest-badge-ring"
                  d="M 220, 220 m -195, 0 a 195,195 0 1,1 390,0 a 195,195 0 1,1 -390,0"
                  fill="none"
                />
              </defs>
              <text
                fill="currentColor"
                style={{ fontFamily: "var(--font-noto-sans), sans-serif", fontSize: "16px", letterSpacing: "0.18em", textTransform: "uppercase" }}
              >
                <textPath href="#invest-badge-ring" startOffset="0">
                  FOUR FIELDS · ONE FRONTIER · A DEMONSTRATION OF A DIFFERENT FUTURE ·
                </textPath>
              </text>
            </svg>
            <img
              src="/figma/circle-graphic.svg"
              alt=""
              aria-hidden="true"
              className="animate-spin-pulse absolute inset-0 m-auto h-[260px] w-[260px]"
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
          <div className="mx-auto max-w-[720px] text-center">
            <img
              src="/figma/circle-graphic.svg"
              alt=""
              aria-hidden="true"
              className="mx-auto h-12 w-12"
            />
            <h2
              id="sponsor-tiers-heading"
              className="mt-6 font-serif text-[clamp(2.25rem,4vw+0.5rem,3rem)] leading-[1.2] text-off-black"
            >
              Four tiers of sponsorship.
            </h2>
            <p className="mt-6 font-sans text-xl leading-[1.4] text-off-black">
              We approach sponsorship as mutual, transparent <em>partnership</em>. Sponsors gain meaningful visibility and relationships. The gathering gains the resources to come to life. Together, we build something none of us could build alone.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href={SPONSORSHIP_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-[50px] items-center btn-solid-glow gap-2 rounded-full bg-oxide-100 px-6 font-noto text-lg font-semibold text-off-black transition-transform hover:-translate-y-0.5"
              >
                Request to sponsor
                <ArrowRight />
              </Link>
            </div>
          </div>
          <div className="mt-14 flex flex-col gap-6">
            {tiers.map((tier) => (
              <TierRow key={tier.name} tier={tier} />
            ))}
          </div>
        </div>
      </section>

      {/* === $100k by June 30 + Where Your Investment Goes ===
          Two-column. Left: Fraunces ask + body + single primary CTA.
          Right: a clean "WHERE YOUR INVESTMENT GOES" panel with four
          icon + title + body rows. */}
      <section className="relative isolate overflow-hidden bg-off-white py-24 md:py-section">
        <div className="container-gutter relative grid items-start gap-20 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
          <div>
            <h2 className="font-serif text-[clamp(2.25rem,4vw+0.5rem,3rem)] leading-[1.2] text-off-black">
              $100k by June 30
            </h2>
            <p className="mt-6 font-sans text-xl leading-[1.4] text-off-black">
              This is the threshold that makes The Synapse viable. Below it, we cannot commit to the people, the place, or the program. Your investment is what puts the right people in the room.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href={SPONSORSHIP_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-[50px] items-center btn-solid-glow gap-2 rounded-full bg-oxide-100 px-6 font-noto text-lg font-semibold text-off-black transition-transform hover:-translate-y-0.5"
              >
                Request to sponsor
                <ArrowRight />
              </Link>
            </div>
          </div>
          <div>
            <p className="font-mono text-base uppercase tracking-[0.14em] text-off-black/85">
              Where your investment goes
            </p>
            <ul className="mt-4 divide-y divide-oxide-300/30 rounded-xl border border-oxide-300/30 bg-true-white/50 py-2">
              {allocation.map((item) => (
                <li key={item.label} className="flex items-start gap-5 px-6 py-5">
                  <span aria-hidden="true" className="mt-1 shrink-0 text-oxide-300">
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

      {/* === Donation form (Figma 55:707 bottom) ===
          Card wraps the Virtuous embed. Oxide-300 header with "Believe
          in the room" + tax-deductible blurb; body off-white with an
          oxide-300 outline. Wave-2 graphic left-anchored as counterweight. */}
      <section
        id="donate"
        aria-labelledby="donate-heading"
        className="relative isolate overflow-hidden bg-off-white pb-24 md:pb-section"
      >
        <img
          src="/figma/wave-2.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -left-[15%] top-0 z-0 hidden h-full w-auto opacity-90 lg:block"
        />
        <div className="container-gutter relative z-10 flex justify-center lg:justify-end">
          <div className="w-full max-w-[650px] overflow-hidden rounded-xl border border-oxide-300 shadow-[0_24px_60px_-30px_rgba(88,32,11,0.35)]">
            <header className="bg-oxide-300 px-8 py-7 text-center text-true-white">
              <h2 id="donate-heading" className="font-serif text-[26px] font-semibold leading-[1.2]">
                Believe in the room
              </h2>
              <p className="mt-3 font-sans text-base leading-[1.4]">
                Sponsorship isn't the only way to invest in this gathering. If the mission matters to you, your gift in any amount goes directly toward making it real.
              </p>
            </header>
            <div className="bg-off-white p-6 md:p-10">
              <DonateForm
                providerName={provider.name}
                providerLabel={provider.label}
                embedOnly={provider.embedOnly}
                embedUrl={provider.embedUrl}
                virtuous={provider.virtuous}
              />
              <p className="mt-6 font-sans text-sm text-off-black/70">
                Gifts flow through{" "}
                <a
                  href={meta.fiscalSponsor.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-off-black underline decoration-oxide-200 decoration-2 underline-offset-4"
                >
                  {meta.fiscalSponsor.name}
                </a>
                ; receipts issued in ALL's name. {provider.blurb}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// --- Stat row ---------------------------------------------------------
// Hero stats block. Bold label + plain detail, separated by hairlines.
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

// Horizontal tier row: pill-shaped amount block on the left, body in
// the middle, "what's included" bullets on the right. The amount block
// uses the per-tier oxide ramp color.
function TierRow({ tier }: { tier: Tier }) {
  return (
    <article className="grid overflow-hidden rounded-2xl border border-oxide-300/20 bg-true-white/60 md:grid-cols-[minmax(180px,220px)_minmax(0,1fr)] lg:grid-cols-[220px_minmax(0,1.1fr)_minmax(0,1.4fr)]">
      <div
        className={`flex flex-col justify-center px-8 py-10 ${tier.blockClass} relative overflow-hidden`}
      >
        {/* Subtle inner contour echoing the Figma's blob backdrop. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-8 -top-8 h-44 w-44 rounded-full opacity-15"
          style={{ background: "currentColor" }}
        />
        <p className={`font-serif text-[3.25rem] leading-none ${tier.blockText}`}>
          {tier.amount}
        </p>
        <p className={`mt-3 font-mono text-sm uppercase tracking-[0.32em] ${tier.blockText}`}>
          {tier.name}
        </p>
      </div>
      <div className="flex flex-col gap-4 px-8 py-8 lg:py-10">
        <h3 className="font-serif text-2xl leading-[1.15] text-off-black">{tier.headline}</h3>
        <p className="font-sans text-base italic leading-[1.5] text-off-black/75">
          {tier.body}
        </p>
      </div>
      <div className="border-t border-oxide-300/15 px-8 py-8 lg:border-l lg:border-t-0 lg:py-10">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-oxide-200">
          What&apos;s included
        </p>
        <ul className="mt-4 divide-y divide-oxide-300/15">
          {tier.included.map((row, i) => (
            <li key={i} className="py-3 font-sans text-[15px] leading-[1.45] text-off-black first:pt-0 last:pb-0">
              <span className="font-semibold">{row.strong}</span> {row.rest}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
