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

  it("schedule spans three days", () => {
    const days = new Set(schedule.map((s) => s.day));
    expect(days).toEqual(new Set([1, 2, 3]));
  });

  it("Atlanta is the declared city and the fiscal sponsor is a placeholder", () => {
    expect(meta.city).toMatch(/Atlanta/);
    expect(meta.fiscalSponsor.name).toMatch(/TBD|placeholder/i);
  });
});
