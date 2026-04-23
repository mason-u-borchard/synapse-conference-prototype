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

  it("carries conference metadata", () => {
    expect(prompt).toContain(meta.name);
    expect(prompt).toContain(meta.city);
    expect(prompt).toContain(meta.fiscalSponsor.name);
  });

  it("does NOT stream placeholder speaker names into the prompt", () => {
    // The committee has not confirmed a roster; Ava must not see
    // Speaker 1..N, Talk1_Title, etc. as grounding data or she will
    // regurgitate them.
    for (const s of speakers) {
      expect(prompt, `leaked placeholder speaker name: ${s.name}`).not.toContain(s.name);
      expect(prompt, `leaked placeholder talk title: ${s.talkTitle}`).not.toContain(s.talkTitle);
    }
  });

  it("tells Ava not to invent speakers, keynote counts, or hierarchies", () => {
    expect(prompt).toMatch(/NOT yet confirmed/i);
    expect(prompt).toMatch(/Do NOT invent names/);
    expect(prompt).toMatch(/Do NOT state a count of speakers/);
    expect(prompt).toMatch(/speaker.attendee hierarchies/i);
  });

  it("names the organizing co-leads for Ava to reference", () => {
    expect(prompt).toMatch(/Elatia Abate/);
    expect(prompt).toMatch(/Beth Glick/);
  });

  it("handles the currently-empty schedule with a holding line", () => {
    if (schedule.length === 0) {
      expect(prompt).toMatch(/published soon/i);
    } else {
      for (const session of schedule) expect(prompt).toContain(session.title);
    }
  });

  it("includes every FAQ question", () => {
    for (const entry of faq) expect(prompt).toContain(entry.question);
  });

  it("carries the off-topic deflection scaffold", () => {
    expect(prompt).toMatch(/I'm here to help with questions about The Synapse/);
  });

  it("loads the committee's current source documents", () => {
    // Markers taken from each of the four docs that are fed in.
    expect(prompt).toMatch(/A Living Ethic/);
    expect(prompt).toMatch(/Love Over Ego/); // ALivingEthic.md
    expect(prompt).toMatch(/Messaging & Strategy Guide/);
    expect(prompt).toMatch(/Integration over fragmentation/); // Synapse_Messaging_Guide.md
    expect(prompt).toMatch(/Program Arc/);
    expect(prompt).toMatch(/Daily structure/); // conference_program_arc.docx.md
    expect(prompt).toMatch(/Draft Arc \+ Modalities/);
    expect(prompt).toMatch(/Day 1: Expand/); // The Synapse_ Draft Arc + Modalities.md
  });

  it("does NOT pull in the internal committee task tracker", () => {
    // Marketing & Comms Committee.md is a private planning doc. It must
    // never be fed to Ava or she will surface committee names, deadlines,
    // and the prototype URL.
    expect(prompt).not.toMatch(/Key Marketing & Comms Tasks/);
    expect(prompt).not.toMatch(/masonborchard\.com/);
    expect(prompt).not.toMatch(/TheSynapse\.love/);
  });

  it("warns Ava off quoting internal donor/strategy material", () => {
    expect(prompt).toMatch(/Do NOT quote or paraphrase internal-facing material/);
    expect(prompt).toMatch(/avatar/i);
    expect(prompt).toMatch(/First 90 Days/);
  });
});
