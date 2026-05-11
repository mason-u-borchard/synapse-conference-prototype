import type { Metadata } from "next";
import Link from "next/link";
import { Plane, Building2, Ticket, Briefcase, ArrowRight as LucideArrowRight } from "lucide-react";
import { DonateForm } from "@/components/donate-form";
import { getDonationProvider } from "@/lib/donations/provider";
import { meta } from "@/lib/content";

export const metadata: Metadata = {
  title: "Invest",
  description:
    "Not a proposal for a different future. A demonstration of one. Invest in the room where this gets built.",
};

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

export default function InvestPage() {
  const provider = getDonationProvider();
  return (
    <>
      {/* === Hero (Figma 73:3707) ===
          Off-white surface. Left: Fraunces 60px headline + Inter
          subhead + 3-stat block separated by hairlines + oxide CTA.
          Right: a circle "badge" with the leaf-circle graphic in the
          center and rotating text wrapped around its perimeter
          ("FOUR FIELDS · ONE FRONTIER · A DEMONSTRATION OF A
          DIFFERENT FUTURE ·"). The text ring rotates slowly via
          .animate-slow-spin. */}
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
              <StatRow label="3 days." body="Atlanta, Georgia. October 2026." />
              <StatRow
                label="Convened by"
                body="women already doing the work — and those committed to standing with them."
              />
            </dl>
            <div className="mt-12 flex flex-wrap items-center gap-3">
              {/* Primary CTA points to the sponsor-request Google form
                  per the v2 IA. The form URL is still TBD with the
                  committee; until it lands, the link jumps to the
                  tiers section so visitors see the partnership context
                  rather than dead-ending on a missing form. */}
              <Link
                href="#sponsor-tiers"
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
          {/* Circle badge -- rotating text wraps a textPath around a
              perfect circle; the leaf-circle SVG sits in the center. */}
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
          Four-tier sponsorship grid per the v2 IA. The tier copy
          mirrors the sponsorship PDF the committee shops directly.
          Heading anchors the "Request to sponsor" CTA above so a
          clicked CTA lands in the partnership context. */}
      <section
        id="sponsor-tiers"
        aria-labelledby="sponsor-tiers-heading"
        className="relative isolate overflow-hidden bg-off-white py-24 md:py-section"
      >
        <div className="container-gutter">
          <div className="max-w-[820px]">
            <h2
              id="sponsor-tiers-heading"
              className="font-serif text-[clamp(2.25rem,4vw+0.5rem,3rem)] leading-[1.2] text-off-black"
            >
              Four tiers of sponsorship.
            </h2>
            <p className="mt-6 max-w-[60ch] font-sans text-xl leading-[1.4] text-off-black">
              We approach sponsorship as mutual, transparent <em>partnership</em>. Sponsors gain meaningful visibility and relationships. The gathering gains the resources to come to life. Together, we build something none of us could build alone.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="#sponsor-tiers"
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
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <TierCard
              name="Ember"
              amount="$10k"
              body="Every fire begins here. Ember sponsors are the first heat — the reason the fire catches at all."
            />
            <TierCard
              name="Flame"
              amount="$25k"
              body="Steady, sustaining, drawing others toward it. Flame sponsors are the steady energy that keeps everything burning."
            />
            <TierCard
              name="Blaze"
              amount="$50k"
              body="A force that reshapes what surrounds it. Blaze sponsors power the higher-order thinking at the core of The Synapse's mission."
            />
            <TierCard
              name="Beacon"
              amount="$100k"
              body="Fire with direction. Visible from a distance. Beacon sponsors are the animating force behind everything The Synapse aspires to be."
            />
          </div>
        </div>
      </section>

      {/* === $100k by June 30 + Where Your Investment Goes (Figma 73:3733 upper) ===
          Two-column. Left: Fraunces "$100k by June 30" + body + CTA.
          Right: a translucent "WHERE YOUR INVESTMENT GOES" panel with
          four icon + title + body rows. */}
      <section className="relative isolate overflow-hidden bg-off-white py-24 md:py-section">
        <div className="container-gutter relative grid items-start gap-20 lg:grid-cols-[minmax(0,508px)_minmax(0,1fr)]">
          <div>
            <h2 className="font-serif text-[clamp(2.25rem,4vw+0.5rem,3rem)] leading-[1.2] text-off-black">
              $100k by June 30
            </h2>
            <p className="mt-6 font-sans text-xl leading-[1.4] text-off-black">
              This is the threshold that makes The Synapse viable. Below it, we cannot commit to the people, the place, or the program. Your investment is what puts the right people in the room.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="#sponsor-tiers"
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

      {/* === Donation form (Figma 73:3775) ===
          A styled card wraps the actual Virtuous embed. Header in
          oxide-300 with "Fund the room" + tax-deductible blurb;
          body off-white with an oxide-300 outline. Wave 2 of the
          S-shape graphic placed left-anchored as decorative
          counterweight to the form on the right. */}
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
              {/* Virtuous embed. Field set + visual treatment of the
                  inputs is controlled by Virtuous; we can't override
                  to match Taylor's exact mockup pixel-for-pixel, but
                  the card surround puts it in the right context. */}
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
// Used in the Hero to render the 3-line stats block, separated by
// hairline dividers per Figma.
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

// Sponsorship tier card. Heading row (name + amount), single paragraph
// of body copy. Hairline border, off-white surface, oxide-300 accent
// on the amount so the four tiers read as a related set.
function TierCard({ name, amount, body }: { name: string; amount: string; body: string }) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-oxide-300/30 bg-true-white/60 p-7">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-serif text-2xl text-off-black">{name}</h3>
        <p className="font-mono text-base text-oxide-300">{amount}</p>
      </div>
      <p className="mt-5 font-sans text-base leading-[1.5] text-off-black/80">{body}</p>
    </article>
  );
}
