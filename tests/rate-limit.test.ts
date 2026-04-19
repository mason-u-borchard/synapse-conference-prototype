import { describe, expect, it } from "vitest";
import { identifierFromHeaders, rateLimit } from "@/lib/rate-limit";

describe("memory rate limiter", () => {
  it("permits the first ten calls within the window and blocks the eleventh", async () => {
    const id = `memory-${Math.random()}`;
    for (let i = 0; i < 10; i++) {
      const r = await rateLimit(id);
      expect(r.allowed).toBe(true);
    }
    const eleventh = await rateLimit(id);
    expect(eleventh.allowed).toBe(false);
  });
});

describe("identifierFromHeaders", () => {
  it("prefers x-forwarded-for", () => {
    const h = new Headers({ "x-forwarded-for": "1.2.3.4, 5.6.7.8" });
    expect(identifierFromHeaders(h)).toBe("1.2.3.4");
  });
  it("falls back to x-real-ip", () => {
    const h = new Headers({ "x-real-ip": "9.9.9.9" });
    expect(identifierFromHeaders(h)).toBe("9.9.9.9");
  });
  it("returns anonymous when no headers", () => {
    expect(identifierFromHeaders(new Headers())).toBe("anonymous");
  });
});
