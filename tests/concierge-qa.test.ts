import { describe, expect, it } from "vitest";
import { assembleConciergePrompt } from "@/lib/concierge-prompt";

// We do not hit a live model here. Instead we verify that the
// assembled system prompt carries enough grounding that Ava COULD
// accurately answer each of the ten representative committee
// questions. If this drifts, the chatbot grounding has regressed.

const prompt = assembleConciergePrompt("anthropic");

const groundingChecks: { question: string; requires: string[] }[] = [
  { question: "When and where is the conference?", requires: ["October", "2026", "Atlanta"] },
  { question: "How do I apply?", requires: ["Applications open", "late spring 2026", "invitation"] },
  { question: "Is childcare available?", requires: ["Onsite childcare", "ages 1-10"] },
  { question: "What accessibility accommodations are provided?", requires: ["Step-free", "induction loop", "live captioning"] },
  { question: "Who is the fiscal sponsor?", requires: ["Applied Love Labs"] },
  { question: "Can I apply for a travel grant?", requires: ["travel grant"] },
  { question: "Who are the speakers this year?", requires: ["NOT yet confirmed", "Do NOT invent names"] },
  { question: "How many keynotes are there?", requires: ["Do NOT state a count of speakers", "speaker/attendee hierarchies"] },
  { question: "Who is organizing this?", requires: ["Elatia Abate", "Beth Glick", "organizing team"] },
  { question: "How big is the conference?", requires: ["75 guests", "depth, not scale"] },
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
