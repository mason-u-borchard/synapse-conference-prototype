import type { Metadata } from "next";
import { RegisterForm } from "@/components/register-form";

export const metadata: Metadata = {
  title: "Apply to attend",
  description: "Apply to attend The Synapse 2026 in Atlanta. An invitation-based convening; the short form captures who you are, what you are working on, and any access needs.",
};

export default function RegisterPage() {
  return (
    <div className="container-gutter py-section">
      <header className="max-w-3xl">
        <p className="eyebrow mb-4">Apply to attend</p>
        <h1 className="text-display-lg text-balance">Tell us who you are and what you are working on.</h1>
        <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted-foreground text-pretty">
          The Synapse is invitation-shaped. The committee is building the
          room intentionally, so the form below asks for the short version
          of who you are, what you are working on right now, and any access
          needs. We read every submission.
        </p>
        <p className="mt-3 text-xs text-muted-foreground">
          Applications open in late spring 2026. Submitting now adds you to
          the notification list and captures access needs so the committee
          can plan around them early.
        </p>
      </header>

      <div className="mt-14 grid gap-12 md:grid-cols-[1.4fr_1fr]">
        <RegisterForm />
        <aside className="space-y-8">
          <section className="paper p-6">
            <h2 className="eyebrow mb-4 text-muted-foreground">What we look for</h2>
            <p className="text-sm text-muted-foreground">
              Researchers, practitioners, and independent thinkers whose
              work touches at least one of the convening's four fields --
              consciousness, cognitive neuroscience, philosophy of mind,
              machine intelligence. The committee leans toward people who
              came to make an argument, not to be seen.
            </p>
          </section>
          <section id="access" className="paper p-6">
            <h2 className="eyebrow mb-3 text-muted-foreground">Access</h2>
            <p className="text-sm text-pretty text-muted-foreground">
              The form asks directly about access needs. The access lead
              follows up within 72 hours with specifics -- captioning,
              childcare, quiet room, dietary. No gatekeeping, no separate
              form.
            </p>
          </section>
          <section className="paper p-6">
            <h2 className="eyebrow mb-3 text-muted-foreground">Travel grants</h2>
            <p className="text-sm text-pretty text-muted-foreground">
              Doctoral researchers and early-career practitioners without
              institutional support can indicate interest in a travel
              grant. Funded through Applied Love Labs.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
