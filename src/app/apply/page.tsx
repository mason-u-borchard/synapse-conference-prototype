// _Last updated: 2026-06-26_
import type { Metadata } from "next";
import Link from "next/link";
import { ApplicationForm } from "@/components/application-form";

export const metadata: Metadata = {
  title: "Apply",
  description:
    "Apply to The Synapse -- a three-day gathering of 100 leaders working at the intersection of AI, robotics, cognitive science, and consciousness, anchored by women shaping these fields.",
};

export default function ApplyPage() {
  return (
    <div className="container-gutter py-section">
      <header className="max-w-2xl">
        <h1 className="text-display-lg text-balance">
          Apply to attend
        </h1>
        <p className="mt-4 font-mono text-sm uppercase tracking-[0.18em] text-muted-foreground">
          Applications close July 22, 2026
        </p>
      </header>

      {/* Framing copy per Kelly's 2026-05-26 application draft -- the
          top-of-application intro that goes live with the form. */}
      <section aria-label="About the application" className="mt-10 max-w-2xl space-y-5 text-lg leading-relaxed text-muted-foreground text-pretty">
        <p>
          <span className="font-serif text-ink">The Synapse</span> is a first-of-its-kind
          convening of 100 leaders working at the intersection of AI, consciousness, robotics,
          and cognitive science — anchored by women whose work is shaping these fields. These
          fields are converging on questions none of us can answer alone.
        </p>
        <p>
          The program moves through three dynamic phases: Expand, Weave, Emerge. In other words,
          we are excited to say that no one will be sitting through this conference. We'll all be
          working and playing together. Everyone in the room shapes it through keynotes,
          provocations, hands-on labs, dialogues, and sessions where fruitful collaborations take
          shape.
        </p>
        <p>
          For our selected leaders and facilitators, we're centering women who are doing the
          work — researchers, executives, builders, entrepreneurs, and practitioners — and we
          welcome participants of all genders who want to be in a room where the conversation
          goes further than it can in any single field.
        </p>
        <p>
          If this work and play feels right to you, we invite you to apply. Attendance is
          intentionally curated to create a high-trust, interdisciplinary environment. We read
          every application carefully.
        </p>
      </section>

      <section aria-label="Application form" className="mt-10 max-w-2xl">
        <ApplicationForm />
      </section>

      <footer className="mt-16 max-w-2xl">
        <div className="flex flex-wrap gap-3">
          <Link href="/about" className="btn btn-ghost">
            What you're applying to
          </Link>
        </div>
      </footer>
    </div>
  );
}
