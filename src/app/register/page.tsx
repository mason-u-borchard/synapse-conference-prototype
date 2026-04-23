import type { Metadata } from "next";
import Link from "next/link";
import { KeepInLoopForm } from "@/components/keep-in-loop-form";

export const metadata: Metadata = {
  title: "Apply to Participate",
  description: "The Synapse is a curated gathering of 75 participants. Leave your details and we'll reach out when the application window opens.",
};

export default function RegisterPage() {
  return (
    <div className="container-gutter py-section">
      <header className="max-w-2xl">
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
      </section>
    </div>
  );
}
