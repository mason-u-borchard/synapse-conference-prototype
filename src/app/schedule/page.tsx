import type { Metadata } from "next";
import { meta } from "@/lib/content";

export const metadata: Metadata = {
  title: "Three days. A deliberate arc.",
  description: "Each day moves through Embody, Encounter, Imagine, Create. Day 1 expands the aperture across AI, robotics, cognitive science, and consciousness. Day 2 weaves them through four crossing points. Day 3 brings what emerges into form.",
};

// Arc copy follows the committee's current draft of "The Synapse: Draft Arc + Modalities."
const arc = [
  {
    label: "Day 1",
    title: "Expand",
    body: "Day 1 widens the aperture. Each of AI, robotics, cognitive science, and consciousness studies brings a frontier claim -- something emerging at its edges that the others need to see. The day opens perception before it begins to weave.",
  },
  {
    label: "Day 2",
    title: "Weave",
    body: "Day 2 passes the threads through each other. Four crossing points -- Experience x Architecture, Body x Boundary, Knowing x Power, Growth x Optimization -- produce questions none of the fields can answer alone. Each crossing leaves an artifact by the end of the day: a provocation, a set of design principles, or a research agenda.",
  },
  {
    label: "Day 3",
    title: "Emerge",
    body: "A half day. The morning pulls the threads of the first two days into focus, names what emerged and where the strongest resonances are, then small groups pressure-test the most alive work from Day 2 into something with form and a next step.",
  },
];

export default function SchedulePage() {
  return (
    <div className="container-gutter py-section">
      <header className="max-w-3xl">
        <p className="eyebrow mb-4">What to expect</p>
        <h1 className="text-display-lg text-balance">Three days. A deliberate arc.</h1>
        <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted-foreground text-pretty">
          Each day moves through four registers -- Embody, Encounter,
          Imagine, Create -- though the weight shifts as the conference
          progresses. Day 1 expands the aperture. Day 2 weaves the
          threads where the fields cross. Day 3 brings forward what was
          born. A provisional arc; specific sessions, leaders, and
          formats will be shaped by the committee in the months ahead.
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
