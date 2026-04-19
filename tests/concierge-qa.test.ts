import { describe, expect, it } from "vitest";
import { assembleConciergePrompt } from "@/lib/concierge-prompt";

// We do not hit a live model here. Instead we verify that the
// assembled system prompt carries enough grounding that Ada COULD
// accurately answer each of the ten representative committee
// questions. If this drifts, the chatbot grounding has regressed.

const prompt = assembleConciergePrompt("anthropic");

const groundingChecks: { question: string; requires: string[] }[] = [
  { question: "Who is giving the opening keynote?", requires: ["Speaker 1", "The Striate Window"] },
  { question: "When and where is the conference?", requires: ["October", "2026", "Atlanta"] },
  { question: "How do I register?", requires: ["Registration opens", "late spring 2026"] },
  { question: "Is childcare available?", requires: ["Onsite childcare", "ages 1-10"] },
  { question: "What accessibility accommodations are provided?", requires: ["Step-free", "induction loop", "live captioning"] },
  { question: "Who is the fiscal sponsor?", requires: ["Applied Love Labs"] },
  { question: "Can I apply for a travel grant?", requires: ["travel grant"] },
  { question: "How many speakers are there?", requires: ["Speaker 1", "Speaker 20"] },
  { question: "Will sessions be recorded?", requires: ["Plenary sessions are recorded", "six weeks"] },
  { question: "Are you a real person?", requires: ["AI assistant", "AI concierge"] },
];

describe("concierge grounding across 10 committee-style questions", () => {
  for (const check of groundingChecks) {
    it(`grounds: "${check.question}"`, () => {
      for (const needle of check.requires) {
        expect(prompt, `missing grounding: ${needle}`).toContain(needle);
      }
    });
  }
});
