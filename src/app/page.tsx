import Link from "next/link";
import type { Metadata } from "next";
import { meta, faq } from "@/lib/content";
import { Section } from "@/components/section";
import { SynapseField } from "@/components/synapse-field";
import { PrinciplesGrid } from "@/components/principles-grid";
import { FaqPreview } from "@/components/faq-preview";
import { FieldsGrid } from "@/components/fields-grid";

export const metadata: Metadata = {
  title: `${meta.name} -- ${meta.subtitle}`,
  description: meta.mission,
};

export default function HomePage() {
  const openFaq = faq.slice(0, 4);

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border bg-surface">
        <div className="absolute inset-0" aria-hidden="true">
          <SynapseField />
        </div>
        <div className="relative mx-auto flex min-h-[88vh] w-full max-w-gallery flex-col justify-center px-gutter pb-20 pt-28 md:min-h-[92vh] md:pb-28 md:pt-36">
          <p className="eyebrow mb-6 flex items-center gap-3">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
            The Synapse &middot; {meta.city} &middot; {meta.dates.display}
          </p>
          <h1 className="max-w-[22ch] text-display-xl text-balance">
            Where women connect{" "}
            <span className="font-serif italic text-aubergine-800 dark:text-aubergine-600">mind</span>,{" "}
            <span className="font-serif italic text-aubergine-800 dark:text-aubergine-600">machine</span>, and what comes next.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Across AI, robotics, cognitive science, and consciousness,
            the inherited rules are no longer sufficient. The Synapse
            is an invitation to the women -- and those who stand with
            them -- who are building what comes next.
          </p>
          <p className="mt-4 eyebrow text-muted-foreground">
            3 days &middot; {meta.capacityDisplay} &middot; {meta.city}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/register"
              className="btn px-8 py-3 text-base font-medium text-[#1e0e22] shadow-[0_1px_0_hsl(var(--gold-deep)/0.8),0_14px_40px_-18px_hsl(var(--gold)/0.8)]"
              style={{ backgroundColor: "hsl(var(--gold))", borderColor: "hsl(var(--gold-deep) / 0.8)" }}
            >
              Apply to Participate
              <ArrowRight />
            </Link>
            <Link href="/donate" className="btn btn-ghost">Become a funding partner</Link>
            <Link href="/schedule" className="btn btn-ghost">The arc</Link>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            An initiative of <a href={meta.fiscalSponsor.href} target="_blank" rel="noreferrer" className="underline decoration-gold-deep decoration-2 underline-offset-4 link-glow">Applied Love Labs</a>. Gifts are tax-deductible through ALL and ring-fenced from operating costs.
          </p>
          <dl className="mt-16 grid max-w-2xl grid-cols-2 gap-6 text-sm md:grid-cols-4">
            <HeroStat label="When" value={meta.dates.display} />
            <HeroStat label="Where" value={meta.city} />
            <HeroStat label="Size" value={meta.capacityDisplay} />
            <HeroStat label="Host" value={meta.fiscalSponsor.name} />
          </dl>
        </div>
      </section>

      <div className="border-y border-border bg-surface-raised">
        <div className="mx-auto flex w-full max-w-gallery flex-col gap-4 px-gutter py-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow mb-1">Hosted by {meta.fiscalSponsor.name} &middot; tax-deductible</p>
            <p className="text-sm text-muted-foreground">
              Gifts flow through {meta.fiscalSponsor.short} and are
              ring-fenced from operating costs.
            </p>
          </div>
          <Link href="/donate" className="btn btn-ghost shrink-0">
            Support the convening <ArrowRight />
          </Link>
        </div>
      </div>

      <Section
        id="fields"
        eyebrow="Four fields, one thread"
        heading="Consciousness is the thread that runs through all of it."
        lede="We convene across disciplines that are usually siloed, because the questions that matter now live in between them."
      >
        <FieldsGrid />
      </Section>

      <Section id="ethos" tone="raised" eyebrow="Our ethos" heading="Power without permission. Rigor with love." lede="The principles that shape how we invite, schedule, host, and close the days.">
        <PrinciplesGrid />
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/schedule" className="btn btn-ghost">The program arc<ArrowRight /></Link>
          <Link href="/about" className="btn btn-ghost">Who it's for<ArrowRight /></Link>
        </div>
      </Section>

      <Section id="apply" eyebrow="Apply" heading="A curated group of 75.">
        <div className="max-w-3xl space-y-4 text-lg leading-relaxed text-pretty text-muted-foreground">
          <p>We are convening a curated group of 75 participants.</p>
          <p>Most attendees are invited. A limited number of additional places are held for individuals whose perspectives will expand and deepen the room.</p>
          <p>Participation is intentionally selected to support a high-trust, high-contribution environment.</p>
        </div>
        <div className="mt-10">
          <Link href="/register" className="btn btn-primary">Apply to Participate<ArrowRight /></Link>
        </div>
      </Section>

      <Section tone="raised" eyebrow="Questions, briefly answered" heading="Logistics without the maze.">
        <FaqPreview items={openFaq} />
        <div className="mt-8">
          <Link href="/faq" className="btn btn-ghost">All FAQ<ArrowRight /></Link>
        </div>
      </Section>

      <Section id="support" eyebrow="Support" heading="Invest in the room where this gets built.">
        <div className="paper mt-2 flex flex-col gap-6 p-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-lg text-pretty text-muted-foreground">
              The Synapse is a living proof of what it looks like when
              women determine how intelligence is designed -- not as a
              corrective, but as a new model entirely. We are raising an
              initial {meta.fundingTarget.amount} by {meta.fundingTarget.by} to
              cover organizer salaries, speaker compensation and travel,
              venue and A/V, and registration scholarships. Every dollar
              ensures the right people are in the room, regardless of who
              can afford to be.
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              Gifts are tax-deductible through <a href={meta.fiscalSponsor.href} target="_blank" rel="noreferrer" className="underline decoration-gold-deep decoration-2 underline-offset-4 link-glow">{meta.fiscalSponsor.name}</a> and ring-fenced from operating costs.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/donate" className="btn btn-primary">Fund the work</Link>
            <Link href="/register" className="btn btn-ghost">Apply to Participate</Link>
          </div>
        </div>
      </Section>
    </>
  );
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="eyebrow mb-1">{label}</dt>
      <dd className="font-serif text-lg text-ink">{value}</dd>
    </div>
  );
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
