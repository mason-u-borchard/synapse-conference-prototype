import type { Metadata } from "next";
import { schedule, speakers, meta } from "@/lib/content";
import { ScheduleExplorer } from "@/components/schedule-explorer";

export const metadata: Metadata = {
  title: "The three-day arc",
  description: "Three days in Atlanta. A high-level arc -- orientation and opening keynote, core workshops and panels, closing reflection. Session titles below are placeholder labels the committee will refine.",
};

const arc = [
  {
    label: "Day one",
    title: "Arrive, meet, begin.",
    body: "Registration and informal orientation. An opening plenary keynote in the afternoon. An evening reception on-site. The day is paced to absorb travel, not to front-load content.",
  },
  {
    label: "Day two",
    title: "The working day.",
    body: "Sparse plenaries; more workshops and facilitated dialogue than panels. A protected poster session in the afternoon, built for reading rather than performing. Mentor-matching tables at lunch.",
  },
  {
    label: "Day three",
    title: "Close with care.",
    body: "A final plenary and a closing panel drawn across the fields. Closing remarks short. The intention is that participants leave with a working relationship or two they did not arrive with.",
  },
];

export default function SchedulePage() {
  return (
    <div className="container-gutter py-section">
      <header className="max-w-3xl">
        <p className="eyebrow mb-4">The three-day arc</p>
        <h1 className="text-display-lg text-balance">Three days, shaped around conversation.</h1>
        <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted-foreground text-pretty">
          Days are paced to absorb travel, protect the work, and close
          with something to carry. Specific session titles below are
          placeholder labels while the committee finalizes who is
          presenting what; the shape of the arc is what is decided.
        </p>
      </header>
      <div className="mt-8 flex gap-6 text-sm text-muted-foreground">
        <p>
          <span className="eyebrow">When</span>
          <br />{meta.dates.display}
        </p>
        <p>
          <span className="eyebrow">Where</span>
          <br />{meta.city}
        </p>
      </div>

      <section className="mt-14" aria-labelledby="arc-heading">
        <h2 id="arc-heading" className="sr-only">The three-day arc</h2>
        <ol className="grid gap-6 md:grid-cols-3 md:gap-8">
          {arc.map((day, idx) => (
            <li key={day.label} className="paper relative flex flex-col p-7">
              <span className="eyebrow absolute left-7 top-6 text-muted-foreground">
                0{idx + 1}
              </span>
              <div className="mt-10">
                <p className="eyebrow mb-2 text-muted-foreground">{day.label}</p>
                <h3 className="font-serif text-2xl text-ink">{day.title}</h3>
                <p className="mt-3 text-pretty text-muted-foreground">{day.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-section" aria-labelledby="detail-heading">
        <h2 id="detail-heading" className="eyebrow mb-4 text-muted-foreground">Session detail (placeholder)</h2>
        <p className="mb-8 max-w-prose text-sm text-muted-foreground">
          An indicative grid of sessions, included for committee review.
          All session titles are generic (Keynote 1, Talk 1, Workshop 1,
          etc.) and the parallel-track structure will likely simplify
          once the final format is set.
        </p>
        <ScheduleExplorer sessions={schedule} speakers={speakers} />
      </section>
    </div>
  );
}
