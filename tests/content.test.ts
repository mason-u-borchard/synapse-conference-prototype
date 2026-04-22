import { describe, expect, it } from "vitest";
import { speakers, schedule, faq, committee, sponsors, meta } from "@/lib/content";
import type { FaqEntry } from "@/types/content";

describe("content integrity", () => {
  it("has exactly twenty speakers", () => {
    expect(speakers.length).toBe(20);
  });

  it("every speaker has a unique slug", () => {
    const slugs = new Set(speakers.map((s) => s.slug));
    expect(slugs.size).toBe(speakers.length);
  });

  it("every scheduled speaker slug resolves to a speaker", () => {
    const slugs = new Set(speakers.map((s) => s.slug));
    for (const session of schedule) {
      for (const slug of session.speakerSlugs ?? []) {
        expect(slugs.has(slug), `missing speaker ${slug}`).toBe(true);
      }
    }
  });

  it("the FAQ covers all expected categories", () => {
    const expected: FaqEntry["category"][] = ["registration", "access", "travel", "submissions", "conduct", "program"];
    const categories = new Set(faq.map((f) => f.category));
    for (const c of expected) {
      expect(categories.has(c)).toBe(true);
    }
  });

  it("committee and sponsors are populated", () => {
    expect(committee.length).toBeGreaterThanOrEqual(6);
    expect(sponsors.length).toBeGreaterThanOrEqual(3);
  });

  it("schedule is empty while the Program team finalizes the arc", () => {
    expect(schedule.length).toBe(0);
  });

  it("Atlanta is the declared city and Applied Love Labs is the host", () => {
    expect(meta.city).toMatch(/Atlanta/);
    expect(meta.fiscalSponsor.name).toBe("Applied Love Labs");
  });
});
