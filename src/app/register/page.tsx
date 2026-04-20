import type { Metadata } from "next";
import { RegisterForm } from "@/components/register-form";

export const metadata: Metadata = {
  title: "Register",
  description: "Register for The Synapse 2026 in Atlanta. Rates, access accommodations, travel grants, and waivers are all handled through this single form.",
};

export default function RegisterPage() {
  return (
    <div className="container-gutter py-section">
      <header className="max-w-3xl">
        <p className="eyebrow mb-4">Register</p>
        <h1 className="text-display-lg text-balance">[Placeholder — replace with the one-line promise about the registration experience: what the form handles in one pass that usually takes three.]</h1>
        <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted-foreground text-pretty">
          The form below is how everything gets handled -- tier, access,
          travel grants, waiver requests, and mentor matching.
        </p>
        <p className="mt-3 text-xs text-muted-foreground">
          Registration opens in late spring 2026. Submitting now adds you to
          the notification list; the form also captures access needs so the
          committee can plan around them early.
        </p>
      </header>

      <div className="mt-14 grid gap-12 md:grid-cols-[1.4fr_1fr]">
        <RegisterForm />
        <aside className="space-y-8">
          <section className="paper p-6">
            <h2 className="eyebrow mb-4 text-muted-foreground">Rates</h2>
            <p className="text-sm text-muted-foreground">
              Tiered rates (faculty/industry, postdoc/independent, student)
              will be finalized by the committee before registration opens.
              Need-based waivers will be available.
            </p>
          </section>
          <section id="access" className="paper p-6">
            <h2 className="eyebrow mb-3 text-muted-foreground">Access</h2>
            <p className="text-sm text-pretty text-muted-foreground">
              The form asks directly about access needs. The access lead will
              follow up within 72 hours with specifics -- captioning,
              childcare, quiet room, dietary. No gatekeeping, no separate form.
            </p>
          </section>
          <section className="paper p-6">
            <h2 className="eyebrow mb-3 text-muted-foreground">Travel grants</h2>
            <p className="text-sm text-pretty text-muted-foreground">
              Doctoral researchers and early-career practitioners without
              institutional support can indicate interest in a travel grant.
              Funded through the fiscal sponsor the committee is finalizing.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
