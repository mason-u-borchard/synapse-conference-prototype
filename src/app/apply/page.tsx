import type { Metadata } from "next";
import Link from "next/link";
import { ApplicationForm } from "@/components/application-form";

export const metadata: Metadata = {
  title: "Application Preview",
  description:
    "A working preview of the participant application form. Applications are not yet open.",
  robots: { index: false, follow: false },
};

export default function ApplyPage() {
  return (
    <div className="container-gutter py-section">
      <header className="max-w-2xl">
        <p className="eyebrow mb-4">Preview</p>
        <h1 className="text-display-lg text-balance">
          What the application will look like.
        </h1>
        <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted-foreground text-pretty">
          This is the form participants will fill out when applications
          open. The committee is using it now to align on the questions
          before the window is announced. Submissions are real -- they
          land in the committee's submissions sheet -- so test entries
          help us pressure-test the flow end to end.
        </p>
        <p className="mt-4 max-w-prose text-sm text-muted-foreground">
          If you're here to be notified when applications open publicly,
          head to the{" "}
          <Link
            href="/attend"
            className="text-ink underline decoration-gold-deep decoration-2 underline-offset-4 link-glow"
          >
            attend page
          </Link>
          .
        </p>
      </header>

      <aside
        role="note"
        className="mt-10 ml-1 max-w-2xl rounded-md border border-dashed border-border p-4 text-sm text-muted-foreground"
      >
        <span className="font-serif text-ink">Heads up.</span> This route
        isn't linked from anywhere yet -- it's a private URL the committee
        is using to align on the questions. Submissions are stored, so
        please use a recognizable name on test entries (or expect to be
        asked about a real-looking application later).
      </aside>

      {/* Framing copy per Kelly's 2026-05-26 application draft -- the
          real top-of-application intro that goes live with the form. */}
      <section aria-label="About the application" className="mt-12 max-w-2xl space-y-5 text-lg leading-relaxed text-muted-foreground text-pretty">
        <p>
          <span className="font-serif text-ink">The Synapse</span> is a first-of-its-kind
          convening of 100 women working at the intersection of AI, consciousness, robotics, and
          cognitive science. These fields are converging on questions none of them can answer
          alone.
        </p>
        <p>
          The program moves through three dynamic phases: Expand, Weave, Emerge. This is not a
          conference you sit through. Everyone in the room shapes it through keynotes,
          provocations, hands-on labs, dialogues, and sessions where fruitful collaborations take
          shape.
        </p>
        <p>
          We're looking for women who are doing the work: researchers, executives, builders,
          entrepreneurs, and practitioners who want to be in a room where the conversation goes
          further than it can in any single field.
        </p>
        <p>
          If you want to be part of these conversations, we invite you to apply. Attendance is
          intentionally curated to create a high-trust, interdisciplinary environment. We read
          every application carefully.
        </p>
      </section>

      <section aria-label="Application form preview" className="mt-10 max-w-2xl">
        <ApplicationForm />
      </section>

      <footer className="mt-16 max-w-2xl">
        <div className="flex flex-wrap gap-3">
          <Link href="/program" className="btn btn-ghost">
            The program arc
          </Link>
          <Link href="/about" className="btn btn-ghost">
            What you're applying to
          </Link>
        </div>
      </footer>
    </div>
  );
}
