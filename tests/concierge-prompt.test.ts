import { describe, expect, it } from "vitest";
import { assembleConciergePrompt } from "@/lib/concierge-prompt";
import { meta, speakers, schedule, faq } from "@/lib/content";

describe("concierge prompt", () => {
  const prompt = assembleConciergePrompt("anthropic");

  it("introduces Ava as the concierge", () => {
    expect(prompt).toMatch(/You are Ava/);
  });

  it("discloses AI identity plainly", () => {
    expect(prompt).toMatch(/AI assistant/i);
    expect(prompt).toMatch(/you are an AI concierge/i);
    expect(prompt).toMatch(/answer directly and plainly/i);
  });

  it("names the active provider in the disclosure", () => {
    expect(assembleConciergePrompt("anthropic")).toMatch(/Anthropic's Claude/);
    expect(assembleConciergePrompt("openai")).toMatch(/OpenAI model/);
    expect(assembleConciergePrompt("none")).toMatch(/AI assistant/);
  });

  it("carries conference metadata and the fiscal sponsor", () => {
    expect(prompt).toContain(meta.name);
    expect(prompt).toContain(meta.city);
    expect(prompt).toContain(meta.fiscalSponsor.name);
  });

  it("includes every speaker by name and talk title", () => {
    for (const s of speakers) {
      expect(prompt).toContain(s.name);
      expect(prompt).toContain(s.talkTitle);
    }
  });

  it("lists every scheduled session title", () => {
    for (const session of schedule) expect(prompt).toContain(session.title);
  });

  it("includes every FAQ question", () => {
    for (const entry of faq) expect(prompt).toContain(entry.question);
  });

  it("carries the off-topic deflection scaffold", () => {
    expect(prompt).toMatch(/I'm here to help with questions about The Synapse/);
  });

  it("names the placeholder caveat", () => {
    expect(prompt).toMatch(/placeholder/i);
  });
});
