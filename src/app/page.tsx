import Link from "next/link";
import type { Metadata } from "next";
import { meta, speakers, schedule, faq } from "@/lib/content";
import { Section } from "@/components/section";
import { SynapseField } from "@/components/synapse-field";
import { SpeakerCard } from "@/components/speaker-card";
import { ScheduleGlance } from "@/components/schedule-glance";
import { PrinciplesGrid } from "@/components/principles-grid";
import { FaqPreview } from "@/components/faq-preview";

export const metadata: Metadata = {
  title: `${meta.name} -- ${meta.subtitle}`,
  description: meta.mission,
};

export default function HomePage() {
  const keynotes = speakers.filter((s) => s.keynote);
  const openers = schedule.filter((s) => s.day === 1 && s.kind !== "break").slice(0, 4);
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
            {meta.dates.display} &middot; {meta.city}
          </p>
          <h1 className="max-w-[22ch] text-display-xl text-balance">
            Where women connect{" "}
            <span className="font-serif italic text-aubergine-800 dark:text-aubergine-600">mind</span>,{" "}
            <span className="font-serif italic text-aubergine-800 dark:text-aubergine-600">machine</span>, and what comes next.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Three working days in Atlanta. Twenty speakers across
            consciousness studies, cognitive neuroscience, philosophy of
            mind, and AI alignment. Forty-plus posters, panels, and quiet
            rooms. One single live conversation.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/donate"
              className="btn px-8 py-3 text-base font-medium text-[#1e0e22] shadow-[0_1px_0_hsl(var(--gold-deep)/0.8),0_14px_40px_-18px_hsl(var(--gold)/0.8)]"
              style={{ backgroundColor: "hsl(var(--gold))", borderColor: "hsl(var(--gold-deep) / 0.8)" }}
            >
              Donate
              <ArrowRight />
            </Link>
            <Link href="/register" className="btn btn-ghost">Register</Link>
            <Link href="/schedule" className="btn btn-ghost">Learn more</Link>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Donations will be tax-deductible through a fiscal sponsor the committee is finalizing. Funds will be ring-fenced from operating costs.
          </p>
          <dl className="mt-16 grid max-w-2xl grid-cols-2 gap-6 text-sm md:grid-cols-4">
            <HeroStat label="Dates" value={meta.dates.display} />
            <HeroStat label="Venue" value={meta.venue} />
            <HeroStat label="Capacity" value={`~${meta.capacity} seats`} />
            <HeroStat label="Fiscal sponsor" value={meta.fiscalSponsor.name} />
          </dl>
        </div>
      </section>

      <div className="border-y border-border bg-surface-raised">
        <div className="mx-auto flex w-full max-w-gallery flex-col gap-4 px-gutter py-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow mb-1">Fiscal sponsor placeholder &middot; partnership TBD</p>
            <p className="text-sm text-muted-foreground">
              An illustrative allocation is shown on /donate; specific
              funding categories and percentages are placeholders the
              committee will confirm once a sponsor is chosen.
            </p>
          </div>
          <Link href="/donate" className="btn btn-ghost shrink-0">
            Donate <ArrowRight />
          </Link>
        </div>
      </div>

      <Section eyebrow="The premise" heading="One conversation across three disciplines." lede={meta.mission}>
        <PrinciplesGrid />
      </Section>

      <Section
        tone="raised"
        eyebrow="Headline speakers"
        heading="Work that makes the committee take notes, not photos."
        lede="Six keynote slots within a twenty-speaker roster. Speakers are numbered placeholders while the committee finalizes invitations; full abstracts are on the speakers page."
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {keynotes.map((speaker) => (
            <SpeakerCard key={speaker.slug} speaker={speaker} featured />
          ))}
        </div>
        <div className="mt-10">
          <Link href="/speakers" className="btn btn-ghost">All speakers<ArrowRight /></Link>
        </div>
      </Section>

      <Section eyebrow="Day one, early" heading="A program that respects your attention." lede="Sessions are built to be attended, not scanned. The full, filterable schedule lives on the /schedule page.">
        <ScheduleGlance items={openers} />
        <div className="mt-8">
          <Link href="/schedule" className="btn btn-ghost">Full schedule<ArrowRight /></Link>
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
              Contributions will support parts of the convening that
              registration fees cannot cover. Specific funding categories,
              allocation percentages, and the fiscal sponsor are all
              placeholders while the committee finalizes its priorities.
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              Donations will be tax-deductible through the chosen fiscal sponsor and ring-fenced from operating costs.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/donate" className="btn btn-primary">Donate</Link>
            <Link href="/register" className="btn btn-ghost">Register</Link>
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
