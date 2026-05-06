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

      <section aria-label="Application form preview" className="mt-12 max-w-2xl">
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
