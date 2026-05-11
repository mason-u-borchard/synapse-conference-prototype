// HOLD: Taylor (May 7, 10:13 AM) asked to pause /attend work pending her hero revision.
// She wants where/when/cost surfaced more prominently in the hero and is awaiting Beth/Elatia confirmation on tickets-covered + lunches-on-three-days, plus a new FAQ entry on cost.
// Body content (Who it's for, four fields, email capture) is likely keep-as-is; the hero is the at-risk part.
// Do not progress this file without Taylor's go-ahead. The skeleton below remains so that the /register -> /attend redirect has a target page.

import type { Metadata } from "next";
import Link from "next/link";
import { KeepInLoopForm } from "@/components/keep-in-loop-form";

export const metadata: Metadata = {
  title: "Attend",
  description: "An invitation. One hundred participants. Intentionally convened. Leave your email and we'll let you know when applications open.",
};

const audience = [
  "Leaders in research, industry, and movements shaping what gets built",
  "Academics and executives who see across the lines their institutions draw",
  "Early-career scholars with fresh visions seeking mentorship and collaboration",
  "Allies, funders, and partners fueling the mission",
  "Artists and practitioners holding what research can't yet name",
];

const fields = [
  {
    name: "Artificial Intelligence",
    body: "Every model encodes a worldview. Most encode the same blind spots.",
  },
  {
    name: "Robotics",
    body: "The moment intelligence gets a body, the consequences stop being theoretical.",
  },
  {
    name: "Cognitive Science",
    body: "When one theory of mind wins, every other way of knowing disappears from the blueprint.",
  },
  {
    name: "Consciousness",
    body: "Consciousness isn't a philosophical luxury. It's the missing variable in every system we're building.",
  },
];

export default function AttendPage() {
  return (
    <div className="container-gutter py-section">
      <header className="max-w-3xl">
        <p className="eyebrow mb-4">Attend</p>
        <h1 className="text-display-lg text-balance">An invitation.</h1>
        <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink">
          One hundred participants. Intentionally convened.
        </p>
        <div className="mt-6 max-w-prose space-y-4 text-base leading-relaxed text-muted-foreground text-pretty">
          <p>
            This is a small gathering by design, selected to support a high-trust, high-contribution environment. A limited number of places are open to applicants whose perspectives will expand and deepen the room.
          </p>
          <p>
            Applications open soon. Leave your email and we'll let you know when they do.
          </p>
        </div>
      </header>

      <section id="notify" aria-labelledby="notify-heading" className="mt-12 max-w-2xl">
        <h2 id="notify-heading" className="sr-only">Get notified when applications open</h2>
        <KeepInLoopForm />
      </section>

      <section aria-labelledby="who-its-for" className="mt-24 max-w-3xl">
        <h2 id="who-its-for" className="font-serif text-3xl text-ink">For those who are building at the edges.</h2>
        <div className="mt-6 max-w-prose space-y-4 text-base leading-relaxed text-muted-foreground text-pretty">
          <p>
            This room is for the women who are working where the disciplines don't have names yet, and for those committed enough to stand with them. Researchers and builders. Scholars and practitioners. Academics and executives.
          </p>
          <p>
            The common thread isn't a credential. It's a disposition: the desire to build over the comfort of what already exists.
          </p>
        </div>
        <ul className="mt-8 space-y-3">
          {audience.map((line) => (
            <li key={line} className="flex gap-3 text-base text-muted-foreground">
              <span aria-hidden="true" className="mt-2 inline-block h-1 w-3 shrink-0 bg-gold" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <Link href="#notify" className="btn btn-ghost">Get notified<ArrowRight /></Link>
        </div>
      </section>

      <section aria-labelledby="four-fields" className="mt-24 max-w-4xl">
        <p className="eyebrow mb-3">Four fields. One frontier.</p>
        <h2 id="four-fields" className="font-serif text-3xl text-ink">AI, robotics, cognitive science, and consciousness are being developed in silos. The questions that matter most live between them.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {fields.map((f) => (
            <article key={f.name} className="paper p-6">
              <h3 className="font-serif text-xl text-ink">{f.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">{f.body}</p>
            </article>
          ))}
        </div>
        <div className="mt-10">
          <Link href="#notify" className="btn btn-ghost">Get notified<ArrowRight /></Link>
        </div>
      </section>
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
