import type { Metadata } from "next";
import Link from "next/link";
import { KeepInLoopForm } from "@/components/keep-in-loop-form";
import { ApplicationForm } from "@/components/application-form";

// #PLACEHOLDER: To preview the prototype application form on /register
// locally (e.g. for committee walkthroughs), uncomment the import below
// and follow the LIVE/PROTOTYPE swap inside RegisterPage. Revert with
// `git checkout -- src/app/register/page.tsx` before committing.
// import { ApplicationForm } from "@/components/application-form";

export const metadata: Metadata = {
  title: "Apply to Participate",
  description: "The Synapse is a curated gathering of 75 participants. Leave your details and we'll reach out when the application window opens.",
};

export default function RegisterPage() {
  return (
    <div className="container-gutter py-section">
      {/* === LIVE === keep this block uncommented for production === */}
      {/* <header className="max-w-2xl">
        <p className="eyebrow mb-4">Apply</p>
        <h1 className="text-display-lg text-balance">Applications open soon.</h1>
        <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted-foreground text-pretty">
          The Synapse is a curated gathering of 75 participants. Most
          places are invitation-based; a limited number will open through
          an application window that will be available soon. Leave your
          details below and we'll reach out to everyone who asked to be
          kept in the loop as soon as the window opens.
        </p>
        <p className="mt-4 max-w-prose text-sm text-muted-foreground">
          Questions in the meantime? Ask Ava -- the concierge in the
          bottom-right corner -- or use the links below.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/#apply" className="btn btn-ghost">How participation works</Link>
          <Link href="/schedule" className="btn btn-ghost">The program arc</Link>
          <Link href="/donate" className="btn btn-ghost">Support the convening</Link>
        </div>
      </header>

      <section aria-labelledby="keep-in-loop-heading" className="mt-16 max-w-2xl">
        <h2 id="keep-in-loop-heading" className="font-serif text-2xl text-ink">
          Keep me in the loop
        </h2>
        <p className="mt-3 max-w-prose text-sm text-muted-foreground">
          Tell us who you are and we'll notify you the moment the
          application opens.
        </p>
        <div className="mt-6">
          <KeepInLoopForm />
        </div>
      </section> */}
      {/* === END LIVE === */}

      {/* === PROTOTYPE === #PLACEHOLDER -- keep COMMENTED in committed code === */}
      <header className="max-w-2xl">
        <p className="eyebrow mb-4">Apply</p>
        <h1 className="text-display-lg text-balance">Apply to participate.</h1>
        <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted-foreground text-pretty">
          The Synapse is a curated gathering of 75 participants in
          San Diego this October. Most places are invitation-based; a
          small number open through this application window. Take your
          time -- we read every submission carefully and will be in
          touch within two weeks.
        </p>
      </header>
      <section aria-labelledby="application-heading" className="mt-12 max-w-2xl">
        <h2 id="application-heading" className="sr-only">Participant application</h2>
        <ApplicationForm />
      </section>
      {/* === END PROTOTYPE === */}
    </div>
  );
}
