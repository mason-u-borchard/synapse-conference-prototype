import type { Metadata } from "next";
import { meta } from "@/lib/content";

export const metadata: Metadata = {
  title: "Three days. A deliberate arc.",
  description: "Each day moves through Embody, Encounter, Imagine, Create -- weighted differently as the conference progresses. Day 1 opens perception. Day 2 builds frameworks. Day 3 makes things.",
};

// Arc copy follows Kelly's approved Website Copy doc (Section 06).
const arc = [
  {
    label: "Day 1",
    title: "Expand Mind",
    body: "We open by expanding what we recognize as mind -- human, artificial, biological, hybrid, embodied, distributed. Through somatic arrival, facilitated encounter across difference, and the questions each of us is carrying into this room.",
  },
  {
    label: "Day 2",
    title: "Rethink Intelligence",
    body: "If mind is broader than we assumed, what is intelligence? Day 2 pushes into the hardest questions: intelligence as relational, developmental, collective, and emergent -- not as optimization, not as control. Frameworks begin to form.",
  },
  {
    label: "Day 3",
    title: "Shapeshift",
    body: "The center of gravity shifts to making. How should minds interact -- human to AI, human to human, mind to system? We move through design, ethics, and what we intend to build together. The day ends not with a summary but with outputs: commitments, collaborations, and a shared declaration.",
  },
];

export default function SchedulePage() {
  return (
    <div className="container-gutter py-section">
      <header className="max-w-3xl">
        <p className="eyebrow mb-4">What to expect</p>
        <h1 className="text-display-lg text-balance">Three days. A deliberate arc.</h1>
        <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted-foreground text-pretty">
          Each day moves through the same four phases -- Embody,
          Encounter, Imagine, Create -- but the weight shifts
          deliberately as the conference progresses. Day 1 opens
          perception. Day 2 builds frameworks. Day 3 makes things. A
          provisional arc; exact sessions, speakers, and format will be
          shaped with the community in the months ahead.
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

      <p className="mt-14 max-w-prose text-sm text-muted-foreground">
        Session titles, times, speaker slots, and tracks will be published
        soon.
      </p>
    </div>
  );
}
