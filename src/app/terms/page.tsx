import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that apply when you use thesynapse.co, apply to attend, or make a donation through the site.",
};

const LAST_UPDATED = "May 11, 2026";

export default function TermsPage() {
  return (
    <div className="container-gutter py-section">
      <header className="max-w-3xl">
        <p className="eyebrow mb-4">Terms</p>
        <h1 className="text-display-lg text-balance">Terms of Service</h1>
        <p className="mt-4 font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground">
          Last updated: {LAST_UPDATED}
        </p>
        <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted-foreground text-pretty">
          These terms apply when you use <strong>thesynapse.co</strong>,
          submit an application, ask us a question, or make a donation. By
          using the site you agree to them. If you don&apos;t agree,
          please don&apos;t use the site.
        </p>
      </header>

      <div className="mt-14 max-w-3xl space-y-12 text-base leading-relaxed text-ink">
        <Section title="Who we are">
          <p>
            The Synapse is a conference organized by Applied Love Labs, a
            nonprofit fiscal sponsor based in the United States. References
            to &quot;we,&quot; &quot;us,&quot; or &quot;The Synapse&quot;
            mean Applied Love Labs acting on behalf of the conference.
          </p>
        </Section>

        <Section title="Using the site">
          <p>
            You agree to use the site only for lawful purposes and not to:
          </p>
          <List>
            <li>Submit false, misleading, or deliberately misrepresented information.</li>
            <li>Attempt to break, overload, scrape, or otherwise interfere with the site.</li>
            <li>Use the site to send spam, harass anyone, or distribute malware.</li>
            <li>
              Pretend to be someone else, or imply an affiliation with The
              Synapse or Applied Love Labs that doesn&apos;t exist.
            </li>
          </List>
          <p>
            We may suspend or remove access if we believe the site is being
            misused.
          </p>
        </Section>

        <Section title="Applications and attendance">
          <p>
            Submitting an application doesn&apos;t guarantee a seat at the
            conference. The Synapse is invitation-based, and the organizing
            committee makes the final call on who&apos;s invited. If you
            applied, you agree that:
          </p>
          <List>
            <li>The information you provided is accurate.</li>
            <li>
              You understand the committee may decline applications without
              providing a specific reason.
            </li>
            <li>
              If invited and confirmed, you&apos;ll abide by the community
              guidelines you agreed to in the application.
            </li>
          </List>
          <p>
            Once tickets are issued, registration fees and conditions
            (refunds, transfers, no-shows) will be detailed at the point of
            purchase and become part of these terms.
          </p>
        </Section>

        <Section title="Donations">
          <p>
            Donations are processed through Applied Love Labs as fiscal
            sponsor. Charitable contributions are generally tax-deductible
            to the extent allowed by law; we&apos;ll provide a receipt for
            your records. Donations are non-refundable except as required
            by law or where we determine, in our discretion, that a refund
            is appropriate (for example, a duplicate charge or a clear
            error).
          </p>
        </Section>

        <Section title="Ava, the AI concierge">
          <p>
            Ava is an AI-powered assistant designed to answer questions
            about the conference. She does her best to ground answers in
            the information published on this site, but she can be wrong
            or out of date. Treat her answers as a starting point, not a
            commitment. If a decision matters &mdash; travel, funding, the
            program &mdash; verify with{" "}
            <a
              href="mailto:hello@thesynapse.co"
              className="text-ink underline decoration-gold-deep decoration-2 underline-offset-4 link-glow"
            >
              hello@thesynapse.co
            </a>
            .
          </p>
          <p>
            Don&apos;t share confidential, sensitive, or regulated
            information in the chat. Conversations may be briefly logged
            for debugging and quality.
          </p>
        </Section>

        <Section title="Content on the site">
          <p>
            The text, images, branding, and code on thesynapse.co belong to
            Applied Love Labs and its contributors, except where another
            credit is given. You&apos;re welcome to share and quote from
            the site with attribution. You may not copy substantial
            portions, republish, or use the brand and logos commercially
            without written permission.
          </p>
          <p>
            If you submit text, images, or other content through a form
            (for example, your application or a speaker proposal), you
            keep ownership of it but grant us a non-exclusive, royalty-free
            license to use it for the purpose of reviewing the submission,
            communicating with you about it, and &mdash; if you&apos;re
            invited and consent &mdash; promoting the conference.
          </p>
        </Section>

        <Section title="Third-party links and services">
          <p>
            The site links to and depends on third-party services (the
            payment processor, the fiscal sponsor&apos;s site, the hosting
            provider, and others). We don&apos;t control those services
            and we&apos;re not responsible for their content or practices.
            Their own terms and privacy policies apply when you use them.
          </p>
        </Section>

        <Section title="No warranties">
          <p>
            The site is provided &quot;as is.&quot; We do our best to keep
            it accurate, available, and free of bugs, but we don&apos;t
            promise it will always be. To the maximum extent permitted by
            law, we disclaim all implied warranties &mdash; including
            merchantability, fitness for a particular purpose, and
            non-infringement.
          </p>
        </Section>

        <Section title="Limits on liability">
          <p>
            To the maximum extent permitted by law, neither Applied Love
            Labs, The Synapse, nor anyone involved in operating the site
            will be liable for indirect, incidental, consequential, or
            punitive damages arising from your use of the site or the
            conference, even if we&apos;ve been told such damages are
            possible. Our total liability for any direct damages will not
            exceed the amount you paid us, if any, in the twelve months
            before the claim arose.
          </p>
          <p>
            Nothing in these terms limits liability we&apos;re not
            permitted by law to limit (for example, for gross negligence
            or willful misconduct).
          </p>
        </Section>

        <Section title="Indemnification">
          <p>
            You agree to indemnify and hold harmless Applied Love Labs,
            The Synapse, and their officers, directors, employees, and
            volunteers from claims arising out of your misuse of the site,
            your violation of these terms, or content you submit through
            the site that infringes someone else&apos;s rights.
          </p>
        </Section>

        <Section title="Governing law">
          <p>
            These terms are governed by the laws of the State of Georgia,
            United States, without regard to its conflict-of-laws rules.
            Any dispute that can&apos;t be resolved informally will be
            brought in the state or federal courts located in Fulton
            County, Georgia, and you agree to that jurisdiction.
          </p>
        </Section>

        <Section title="Changes to these terms">
          <p>
            We may update these terms from time to time. When we do,
            we&apos;ll change the &quot;Last updated&quot; date at the top
            of the page. Material changes will be announced more
            prominently. Continued use of the site after a change means
            you accept the new terms.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            Questions about these terms:
          </p>
          <p>
            <a
              href="mailto:hello@thesynapse.co"
              className="text-ink underline decoration-gold-deep decoration-2 underline-offset-4 link-glow"
            >
              hello@thesynapse.co
            </a>
          </p>
          <p className="text-muted-foreground">
            The Synapse / Applied Love Labs &mdash;{" "}
            <Link
              href="https://applied.love"
              className="text-ink underline decoration-gold-deep decoration-2 underline-offset-4 link-glow"
            >
              applied.love
            </Link>
          </p>
        </Section>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="font-serif text-2xl uppercase tracking-[0.2em] text-ink">
        {title}
      </h2>
      {children}
    </section>
  );
}

function List({ children }: { children: React.ReactNode }) {
  return (
    <ul className="ml-5 list-disc space-y-2 marker:text-muted-foreground">
      {children}
    </ul>
  );
}
