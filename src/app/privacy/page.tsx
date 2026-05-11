import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What information we collect on thesynapse.co, how we use it, who we share it with, and the choices you have.",
};

const LAST_UPDATED = "May 11, 2026";

export default function PrivacyPage() {
  return (
    <div className="container-gutter py-section">
      <header className="max-w-3xl">
        <p className="eyebrow mb-4">Privacy</p>
        <h1 className="text-display-lg text-balance">Privacy Policy</h1>
        <p className="mt-4 font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground">
          Last updated: {LAST_UPDATED}
        </p>
        <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted-foreground text-pretty">
          The Synapse is a project of Applied Love Labs. This page explains
          what we collect when you visit <strong>thesynapse.co</strong>, what
          we do with it, and how to reach us if you have questions or want
          your data removed.
        </p>
      </header>

      <div className="mt-14 max-w-3xl space-y-12 text-base leading-relaxed text-ink">
        <Section title="The short version">
          <p>
            We collect the information you give us when you apply to attend,
            ask a question, or make a donation. We use it to run the
            conference, write back to you, and process gifts. We don&apos;t
            sell it. We share it only with the service providers we need to
            do those things, and we keep it only as long as we have reason
            to.
          </p>
        </Section>

        <Section title="What we collect">
          <p>The information we hold falls into three buckets:</p>
          <List>
            <li>
              <strong>Application data.</strong> When you fill out the
              participant application, we collect your name, email, city and
              country, affiliation, optional pronouns, gender (used only for
              aggregate composition reporting and never shown publicly), a
              short bio, your written responses to the application
              questions, and any optional notes you share about
              accessibility, dietary needs, referrals, or a speaker
              proposal.
            </li>
            <li>
              <strong>Contact-form and email data.</strong> If you write to
              us via a contact form or email{" "}
              <a
                href="mailto:hello@thesynapse.co"
                className="text-ink underline decoration-gold-deep decoration-2 underline-offset-4 link-glow"
              >
                hello@thesynapse.co
              </a>
              , we keep your message and reply.
            </li>
            <li>
              <strong>Donation data.</strong> Charitable contributions are
              processed through our payment provider; we receive the
              donor&apos;s name, email, and amount so we can issue a
              tax-deductible receipt through Applied Love Labs. We do not
              see or store full card numbers.
            </li>
            <li>
              <strong>Concierge conversations.</strong> If you chat with
              Ava, the AI concierge on this site, your messages are sent to
              the language-model provider that powers her so she can
              respond. We may also log conversations briefly to debug
              problems and improve answers.
            </li>
            <li>
              <strong>Basic technical data.</strong> Like most websites, we
              log the standard things browsers send: IP address, user
              agent, requested page, and timestamps. We use this for
              security, rate-limiting, and aggregate traffic understanding.
            </li>
          </List>
        </Section>

        <Section title="How we use it">
          <List>
            <li>Review and respond to applications.</li>
            <li>
              Send confirmation, logistics, and program updates to people
              who&apos;ve applied, registered, or asked to be contacted.
            </li>
            <li>Process donations and issue receipts.</li>
            <li>Answer questions you send to us directly or through Ava.</li>
            <li>
              Keep the site running: prevent abuse, debug issues, and
              understand how people use the pages.
            </li>
          </List>
          <p>
            We do not sell your data, and we do not use it for advertising
            or send it to data brokers.
          </p>
        </Section>

        <Section title="Who we share it with">
          <p>
            We rely on a small set of service providers to operate the
            site. Each of them sees only the data they need to do their
            job:
          </p>
          <List>
            <li>
              <strong>Vercel</strong> &mdash; hosting and serverless
              functions.
            </li>
            <li>
              <strong>Google Sheets</strong> &mdash; where applications and
              contact-form submissions are recorded for the organizing
              committee.
            </li>
            <li>
              <strong>Resend</strong> &mdash; sends transactional email
              (application confirmations, replies).
            </li>
            <li>
              <strong>Stripe</strong> (or our equivalent donation platform)
              &mdash; processes payments. Stripe&apos;s privacy policy
              governs the card data it collects.
            </li>
            <li>
              <strong>Anthropic and/or OpenAI</strong> &mdash; provide the
              language models behind the Ava concierge.
            </li>
            <li>
              <strong>Upstash</strong> &mdash; rate-limit storage that
              briefly records IP-derived identifiers to stop abuse.
            </li>
          </List>
          <p>
            We may also share information when we&apos;re legally required
            to (a subpoena, a court order, or a comparable obligation), or
            when it&apos;s necessary to protect the safety of attendees,
            staff, or the public.
          </p>
        </Section>

        <Section title="Cookies and analytics">
          <p>
            The site uses a small number of cookies for things like
            remembering your theme preference and keeping your Ava
            conversation in sync. We do not use third-party advertising or
            cross-site tracking cookies. If we add analytics, we&apos;ll
            update this page and disclose what we use.
          </p>
        </Section>

        <Section title="Your choices and rights">
          <p>
            You can ask us at any time to:
          </p>
          <List>
            <li>See what information we hold about you.</li>
            <li>Correct something that&apos;s wrong.</li>
            <li>Delete your data (subject to records we&apos;re required to keep, like donation receipts).</li>
            <li>Stop emailing you, even if you applied or donated.</li>
          </List>
          <p>
            Email{" "}
            <a
              href="mailto:hello@thesynapse.co"
              className="text-ink underline decoration-gold-deep decoration-2 underline-offset-4 link-glow"
            >
              hello@thesynapse.co
            </a>{" "}
            and we&apos;ll handle it. If you&apos;re a resident of the EU,
            UK, California, or another jurisdiction with specific privacy
            laws, the same address reaches the right people; tell us what
            you&apos;re asking for and we&apos;ll respond within the
            timeframe your law requires.
          </p>
        </Section>

        <Section title="How long we keep it">
          <p>
            Applications and contact-form submissions stay with us through
            the end of the 2026 conference cycle, plus a reasonable period
            for follow-up and reporting. Donation records are kept as long
            as Applied Love Labs is required to retain them for tax and
            accounting purposes. Ava conversation logs are short-lived and
            used only for operational debugging.
          </p>
        </Section>

        <Section title="Children">
          <p>
            The Synapse is a professional gathering for adults. The site
            isn&apos;t directed to children, and we don&apos;t knowingly
            collect information from anyone under 16. If you believe a
            child has submitted something to us, write to{" "}
            <a
              href="mailto:hello@thesynapse.co"
              className="text-ink underline decoration-gold-deep decoration-2 underline-offset-4 link-glow"
            >
              hello@thesynapse.co
            </a>{" "}
            and we&apos;ll remove it.
          </p>
        </Section>

        <Section title="International visitors">
          <p>
            The Synapse is organized in the United States, and the
            providers listed above process data in the US and other
            countries. By using the site, you understand your information
            may be transferred to and processed in jurisdictions with
            different data-protection rules than your own.
          </p>
        </Section>

        <Section title="Changes to this policy">
          <p>
            We&apos;ll update this page when our practices change. The
            &quot;Last updated&quot; date at the top of the page reflects
            the most recent revision. Material changes will also be
            announced to people on our email list.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            Questions, requests, or anything that doesn&apos;t fit cleanly
            into the categories above:
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
