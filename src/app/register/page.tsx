import type { Metadata } from "next";
import { RegisterForm } from "@/components/register-form";

export const metadata: Metadata = {
  title: "Request an invitation",
  description: "Attendance is by application. The Synapse is building the room intentionally -- 50 to 75 people. Tell us who you are and what you are working on.",
};

export default function RegisterPage() {
  return (
    <div className="container-gutter py-section">
      <header className="max-w-3xl">
        <p className="eyebrow mb-4">Apply to attend</p>
        <h1 className="text-display-lg text-balance">Tell us who you are and what you're building.</h1>
        <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted-foreground text-pretty">
          Attendance is by application. We're building the room
          intentionally -- 50 to 75 people over three days in Atlanta --
          and the form below is how that works. Tell us who you are and
          what you're working on; we'll be in touch as review opens.
        </p>
        <p className="mt-3 text-xs text-muted-foreground">
          Applications open in late spring 2026. Submitting now adds you
          to the notification list and captures access needs so the
          committee can plan around them early.
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
