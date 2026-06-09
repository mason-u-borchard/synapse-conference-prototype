import type { Metadata } from "next";
import { faq } from "@/lib/content";
import { FaqAccordion } from "@/components/faq-accordion";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to the questions we receive most often, updated as the conference approaches.",
};

// Category ordering follows the IA (ATTEND / INVEST / TRAVEL / ACCESSIBILITY / PROGRAM).
const CATEGORIES = ["attend", "invest", "travel", "accessibility", "program"] as const;

export default function FaqPage() {
  const grouped: Record<(typeof CATEGORIES)[number], typeof faq> = {
    attend: faq.filter((f) => f.category === "attend"),
    invest: faq.filter((f) => f.category === "invest"),
    travel: faq.filter((f) => f.category === "travel"),
    accessibility: faq.filter((f) => f.category === "accessibility"),
    program: faq.filter((f) => f.category === "program"),
  };

  return (
    // Off-white surface across the whole page per Taylor's 06-08
    // R1 audit ("Page should be white"). Sits beneath the sticky
    // header via the standard -mt-[88px] pt-[88px] offset.
    <div className="relative isolate -mt-[88px] bg-off-white pt-[88px] text-off-black">
      {/* === Hero (Figma 56:5283) ===
          Centered headline + intro. Email link uses the warm oxide
          underline that recurs across the v2 site. */}
      <section className="container-gutter pt-20 pb-12 md:pt-28 md:pb-16">
        <div className="mx-auto flex max-w-[760px] flex-col items-center text-center">
          <p className="font-mono text-sm uppercase tracking-[0.24em] text-oxide-200">
            FAQ
          </p>
          <h1 className="mt-5 font-serif text-[clamp(3rem,5.5vw+0.5rem,4.5rem)] leading-[1.05] text-off-black text-balance">
            Good questions.
          </h1>
          <p className="mt-6 max-w-[58ch] font-sans text-lg leading-[1.55] text-off-black/75 text-pretty">
            Something we didn't cover? Ask Ava in the bottom right, or drop us a line at{" "}
            <a
              href="mailto:hello@thesynapse.co"
              className="text-oxide-200 underline decoration-oxide-200 decoration-2 underline-offset-4 link-glow"
            >
              hello@thesynapse.co
            </a>
            .
          </p>
        </div>
      </section>

      {/* === Accordion sections ===
          Per Taylor's 06-08 R1 audit, the hairline border above each
          category was removed -- category eyebrow now sits alone above
          the accordion rows. */}
      <section className="container-gutter pb-24 md:pb-section">
        <div className="mx-auto max-w-[960px] space-y-16 md:space-y-20">
          {CATEGORIES.map((key) =>
            grouped[key].length === 0 ? null : (
              <section key={key} id={key}>
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-off-black/55">
                  {key}
                </p>
                <FaqAccordion items={grouped[key]} />
              </section>
            ),
          )}
        </div>
      </section>
    </div>
  );
}
