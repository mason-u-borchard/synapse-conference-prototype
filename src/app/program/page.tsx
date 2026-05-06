import type { Metadata } from "next";
import Link from "next/link";
import { meta } from "@/lib/content";

export const metadata: Metadata = {
  title: "Program",
  description: "Three days, four registers. Expand, Weave, Emerge.",
};

export default function ProgramPage() {
  return (
    <div className="container-gutter py-section">
      <header className="max-w-3xl">
        <p className="eyebrow mb-4">Program</p>
        <h1 className="text-display-lg text-balance">Not a lecture hall. A living laboratory.</h1>
        <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted-foreground text-pretty">
          Three days built around four disciplines and the spaces between them. Workshops, facilitated dialogue, and structured time for the conversations that usually only happen in hallways.
        </p>
        <p className="mt-4 max-w-prose text-sm text-muted-foreground">
          {meta.dates.display} &middot; {meta.city}
        </p>
      </header>

      <section aria-labelledby="three-day-arc" className="mt-16 max-w-4xl">
        <h2 id="three-day-arc" className="eyebrow mb-6">The three-day arc</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <DayCard
            day="Day 1"
            title="Expand"
            body="Each field brings its frontier claim. The day widens perception before the weaving begins."
          />
          <DayCard
            day="Day 2"
            title="Weave"
            body="Where the disciplines meet. Cross-field fishbowls, power sessions, and an open space where ideas find their people."
          />
          <DayCard
            day="Day 3"
            title="Emerge"
            body="Three visions. A futures lab. Real commitments before you leave the room."
          />
        </div>
      </section>

      <section aria-labelledby="four-registers" className="mt-20 max-w-4xl">
        <h2 id="four-registers" className="eyebrow mb-6">Four registers</h2>
        <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 text-sm">
          <RegisterPill name="Embody" />
          <RegisterPill name="Encounter" />
          <RegisterPill name="Imagine" />
          <RegisterPill name="Create" />
        </ul>
        <p className="mt-6 max-w-prose text-sm text-muted-foreground">
          {/* #PLACEHOLDER -- session-by-session detail published once the program team finalizes the arc */}
          Session titles, times, and tracks are being finalized by the program team and will be published soon.
        </p>
      </section>

      <section aria-labelledby="format" className="mt-20 max-w-3xl">
        <h2 id="format" className="eyebrow mb-6">How the days are built</h2>
        <p className="text-base leading-relaxed text-muted-foreground text-pretty">
          Sparse keynotes. More workshops, facilitated dialogue, art, movement, and structured time for the conversations that usually only happen in hallways. We're building a container, not a lecture hall.
        </p>
      </section>

      <div className="mt-16 flex flex-wrap gap-3">
        <Link href="/invest" className="btn btn-primary">Fund the room<ArrowRight /></Link>
        <Link href="/attend" className="btn btn-ghost">Apply to attend<ArrowRight /></Link>
      </div>
    </div>
  );
}

function DayCard({ day, title, body }: { day: string; title: string; body: string }) {
  return (
    <div className="paper p-6">
      <p className="eyebrow mb-2">{day}</p>
      <h3 className="font-serif text-2xl text-ink">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">{body}</p>
    </div>
  );
}

function RegisterPill({ name }: { name: string }) {
  return (
    <li className="rounded-md border border-border bg-surface-raised px-4 py-3 text-center font-serif text-base text-ink">
      {name}
    </li>
  );
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
