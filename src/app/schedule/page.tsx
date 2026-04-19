import type { Metadata } from "next";
import { schedule, speakers, meta } from "@/lib/content";
import { ScheduleExplorer } from "@/components/schedule-explorer";

export const metadata: Metadata = {
  title: "Schedule",
  description: "Two working days in Atlanta, four tracks, six keynotes, plus workshops, panels, poster sessions, and mentor-matching.",
};

export default function SchedulePage() {
  return (
    <div className="container-gutter py-section">
      <header className="max-w-3xl">
        <p className="eyebrow mb-4">Program</p>
        <h1 className="text-display-lg text-balance">Two days, four tracks, cross-linked throughout.</h1>
        <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted-foreground text-pretty">
          Plenaries run in the main theater; parallel sessions move between
          galleries and seminar rooms. Every session is cross-linked to its
          speakers and abstracts. Exact dates and final session placements
          are placeholders until the committee sets them.
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
      <div className="mt-12">
        <ScheduleExplorer sessions={schedule} speakers={speakers} />
      </div>
    </div>
  );
}
