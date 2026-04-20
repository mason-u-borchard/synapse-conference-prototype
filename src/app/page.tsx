import Link from "next/link";
import type { Metadata } from "next";
import { meta, schedule, faq } from "@/lib/content";
import { Section } from "@/components/section";
import { SynapseField } from "@/components/synapse-field";
import { ScheduleGlance } from "@/components/schedule-glance";
import { PrinciplesGrid } from "@/components/principles-grid";
import { FaqPreview } from "@/components/faq-preview";
import { FieldsGrid } from "@/components/fields-grid";

export const metadata: Metadata = {
  title: `${meta.name} -- ${meta.subtitle}`,
  description: meta.mission,
};

export default function HomePage() {
  const openers = schedule.filter((s) => s.day === 1 && s.kind !== "break").slice(0, 4);
  const openFaq = faq.slice(0, 4);

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border bg-surface">
        <div className="absolute inset-0" aria-hidden="true">
          <SynapseField />
        </div>
        <div className="relative mx-auto flex min-h-[88vh] w-full max-w-gallery flex-col justify-center px-gutter pb-20 pt-28 md:min-h-[92vh] md:pb-28 md:pt-36">
          <p className="eyebrow mb-3 flex items-center gap-3">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
            Atlanta, GA &middot; {meta.dates.display}
          </p>
          <p className="eyebrow mb-6 text-muted-foreground">
            3 days &middot; {meta.capacityDisplay} &middot; Invitation only
          </p>
          <h1 className="max-w-[22ch] text-display-xl text-balance">
            Where women connect{" "}
            <span className="font-serif italic text-aubergine-800 dark:text-aubergine-600">mind</span>,{" "}
            <span className="font-serif italic text-aubergine-800 dark:text-aubergine-600">machine</span>, and what comes next.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            A women-centered gathering at the frontier of consciousness,
            AI, cognitive science, and robotics. Hosted by{" "}
            <a
              href={meta.fiscalSponsor.href}
              target="_blank"
              rel="noreferrer"
              className="text-ink underline decoration-gold/50 decoration-2 underline-offset-4 hover:decoration-gold"
            >
              {meta.fiscalSponsor.name}
            </a>. Sparse keynotes, more workshops and facilitated dialogue
            than panels. Every person here on purpose.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/donate"
              className="btn px-8 py-3 text-base font-medium text-[#1e0e22] shadow-[0_1px_0_hsl(var(--gold-deep)/0.8),0_14px_40px_-18px_hsl(var(--gold)/0.8)]"
              style={{ backgroundColor: "hsl(var(--gold))", borderColor: "hsl(var(--gold-deep) / 0.8)" }}
            >
              Support the convening
              <ArrowRight />
            </Link>
            <Link href="/register" className="btn btn-ghost">Apply to attend</Link>
            <Link href="/schedule" className="btn btn-ghost">The three-day arc</Link>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Donations are tax-deductible through Applied Love Labs and ring-fenced from operating costs.
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
              Gifts flow through {meta.fiscalSponsor.short}. Allocation
              categories shown on /donate are illustrative placeholders the
              committee will confirm.
            </p>
          </div>
          <Link href="/donate" className="btn btn-ghost shrink-0">
            Support the convening <ArrowRight />
          </Link>
        </div>
      </div>

      <Section
        eyebrow="Four fields, one thread"
        heading="One conversation across consciousness, cognition, and the machines we are building."
        lede="The Synapse is organized around the question these fields already share but rarely ask together: what kind of mind are we studying, and what kind are we making?"
      >
        <FieldsGrid />
      </Section>

      <Section tone="raised" eyebrow="How the room is run" heading="Power without permission. Rigor with love." lede="A handful of principles that shape how we invite, schedule, host, and close the days.">
        <PrinciplesGrid />
      </Section>

      <Section eyebrow="The three-day arc" heading="A program that respects your attention." lede="Days are shaped around conversation, not broadcast. Sparse plenaries, protected quiet time, workshops, and a poster session built for reading. Full arc on the schedule page.">
        <ScheduleGlance items={openers} />
        <div className="mt-8">
          <Link href="/schedule" className="btn btn-ghost">The three-day arc<ArrowRight /></Link>
        </div>
      </Section>

      <Section tone="raised" eyebrow="Questions, briefly answered" heading="Logistics without the maze.">
        <FaqPreview items={openFaq} />
        <div className="mt-8">
          <Link href="/faq" className="btn btn-ghost">All FAQ<ArrowRight /></Link>
        </div>
      </Section>

      <Section eyebrow="Support the convening" heading="Fund the parts registration will not cover.">
        <div className="paper mt-2 flex flex-col gap-6 p-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-lg text-pretty text-muted-foreground">
              Gifts underwrite travel for early-career participants, access
              accommodations, and the facilitation work that keeps the
              format from collapsing into a panel-after-panel lineup.
              Specific categories and percentages are placeholders the
              committee will confirm; funds flow through {meta.fiscalSponsor.name}.
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              Donations are tax-deductible through {meta.fiscalSponsor.short} and ring-fenced from operating costs.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/donate" className="btn btn-primary">Support the convening</Link>
            <Link href="/register" className="btn btn-ghost">Apply to attend</Link>
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
