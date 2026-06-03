import type { Metadata } from "next";
import Link from "next/link";
import { ApplicationForm } from "@/components/application-form";

export const metadata: Metadata = {
  title: "Apply",
  description:
    "Apply to The Synapse -- a three-day gathering of 100 leaders working at the intersection of AI, robotics, cognitive science, and consciousness, anchored by women shaping these fields.",
  robots: { index: false, follow: false },
};

export default function ApplyPage() {
  return (
    <div className="container-gutter py-section">
      <header className="max-w-2xl">
        <p className="eyebrow mb-4">Apply</p>
        <h1 className="text-display-lg text-balance">
          Apply to The Synapse.
        </h1>
      </header>

      {/* Framing copy per Kelly's 2026-05-26 application draft -- the
          top-of-application intro that goes live with the form. */}
      <section aria-label="About the application" className="mt-10 max-w-2xl space-y-5 text-lg leading-relaxed text-muted-foreground text-pretty">
        <p>
          <span className="font-serif text-ink">The Synapse</span> is a first-of-its-kind
          convening of 100 leaders working at the intersection of AI, consciousness, robotics,
          and cognitive science — anchored by women whose work is shaping these fields. These
          fields are converging on questions none of them can answer alone.
        </p>
        <p>
          The program moves through three dynamic phases: Expand, Weave, Emerge. This is not a
          conference you sit through. Everyone in the room shapes it through keynotes,
          provocations, hands-on labs, dialogues, and sessions where fruitful collaborations take
          shape.
        </p>
        <p>
          We're centering women who are doing the work — researchers, executives, builders,
          entrepreneurs, and practitioners — and we welcome participants of all genders who want
          to be in a room where the conversation goes further than it can in any single field.
        </p>
        <p>
          If you want to be part of these conversations, we invite you to apply. Attendance is
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
