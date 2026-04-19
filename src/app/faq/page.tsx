import type { Metadata } from "next";
import { faq } from "@/lib/content";
import { FaqAccordion } from "@/components/faq-accordion";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to the questions we receive most often, updated as the conference approaches.",
};

export default function FaqPage() {
  const grouped = {
    registration: faq.filter((f) => f.category === "registration"),
    submissions: faq.filter((f) => f.category === "submissions"),
    travel: faq.filter((f) => f.category === "travel"),
    access: faq.filter((f) => f.category === "access"),
    conduct: faq.filter((f) => f.category === "conduct"),
    program: faq.filter((f) => f.category === "program"),
  };
  return (
    <div className="container-gutter py-section">
      <header className="max-w-3xl">
        <p className="eyebrow mb-4">FAQ</p>
        <h1 className="text-display-lg text-balance">The short answers.</h1>
        <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted-foreground text-pretty">
          If your question is not here, ask Ada in the bottom-right corner --
          she has read every page on this site -- or email us directly.
        </p>
      </header>
      <div className="mt-14 space-y-14">
        {Object.entries(grouped).map(([key, rows]) =>
          rows.length === 0 ? null : (
            <section key={key} id={key}>
              <h2 className="font-serif text-2xl capitalize text-ink">{key}</h2>
              <FaqAccordion items={rows} />
            </section>
          ),
        )}
      </div>
    </div>
  );
}
