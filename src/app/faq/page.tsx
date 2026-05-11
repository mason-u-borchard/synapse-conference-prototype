import type { Metadata } from "next";
import { faq } from "@/lib/content";
import { FaqAccordion } from "@/components/faq-accordion";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to the questions we receive most often, updated as the conference approaches.",
};

export default function FaqPage() {
  const grouped = {
    attend: faq.filter((f) => f.category === "attend"),
    invest: faq.filter((f) => f.category === "invest"),
    travel: faq.filter((f) => f.category === "travel"),
    accessibility: faq.filter((f) => f.category === "accessibility"),
    program: faq.filter((f) => f.category === "program"),
  };
  return (
    <div className="container-gutter py-section">
      <header className="max-w-3xl">
        <p className="eyebrow mb-4">FAQ</p>
        <h1 className="text-display-lg text-balance">Good questions.</h1>
        <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted-foreground text-pretty">
          Something we didn't cover? Ask Ava in the bottom right, or drop us a
          line at <a href="mailto:hello@thesynapse.co" className="text-ink underline decoration-gold-deep decoration-2 underline-offset-4 link-glow">hello@thesynapse.co</a>.
        </p>
      </header>
      <div className="mt-14 space-y-14">
        {Object.entries(grouped).map(([key, rows]) =>
          rows.length === 0 ? null : (
            <section key={key} id={key}>
              <h2 className="font-serif text-2xl uppercase tracking-[0.2em] text-ink">{key}</h2>
              <FaqAccordion items={rows} />
            </section>
          ),
        )}
      </div>
    </div>
  );
}
