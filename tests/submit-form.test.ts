import { describe, expect, it, beforeEach, vi } from "vitest";
import type { NextRequest } from "next/server";

vi.mock("@/lib/sheets-sink", () => ({
  recordSubmission: vi.fn(async () => ({ confirmationId: "SYN-TEST", persisted: "log" as const })),
}));
vi.mock("@/lib/email", () => ({
  sendConfirmationEmail: vi.fn(async () => ({ sent: false, reason: "no-credentials" as const })),
}));
vi.mock("@/lib/rate-limit", () => ({
  rateLimit: vi.fn(async () => ({ allowed: true, remaining: 9, reset: Date.now() + 60_000 })),
  identifierFromHeaders: () => "127.0.0.1",
}));

const { POST } = await import("@/app/api/submit-form/route");
const sheets = await import("@/lib/sheets-sink");
const email = await import("@/lib/email");
const limiter = await import("@/lib/rate-limit");

function request(body: unknown): NextRequest {
  return new Request("http://localhost/api/submit-form", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  }) as unknown as NextRequest;
}

beforeEach(() => { vi.clearAllMocks(); });

describe("POST /api/submit-form", () => {
  it("rejects unknown submission shapes", async () => {
    expect((await POST(request({ whatever: true }))).status).toBe(400);
  });

  it("rejects registrations missing required fields", async () => {
    const r = await POST(request({ kind: "registration", payload: { fullName: "A" } }));
    expect(r.status).toBe(422);
  });

  it("rejects honeypot hits without persisting", async () => {
    const r = await POST(
      request({
        kind: "registration",
        payload: {
          fullName: "Imposter",
          email: "a@b.co",
          affiliation: "x",
          role: "researcher",
          company_website: "https://bots.example",
        },
      }),
    );
    expect(r.status).toBe(422);
    expect(sheets.recordSubmission).not.toHaveBeenCalled();
  });

  it("records valid registrations and triggers confirmation email", async () => {
    const r = await POST(
      request({
        kind: "registration",
        payload: {
          fullName: "Valid Attendee",
          email: "attendee@example.com",
          affiliation: "Lab",
          role: "student",
          interests: "consciousness",
        },
      }),
    );
    expect(r.status).toBe(200);
    expect(sheets.recordSubmission).toHaveBeenCalledOnce();
    expect(email.sendConfirmationEmail).toHaveBeenCalledOnce();
  });

  it("returns 429 when rate-limited", async () => {
    vi.mocked(limiter.rateLimit).mockResolvedValueOnce({ allowed: false, remaining: 0, reset: Date.now() + 60_000 });
    const r = await POST(
      request({
        kind: "registration",
        payload: { fullName: "A", email: "a@b.co", affiliation: "x", role: "researcher" },
      }),
    );
    expect(r.status).toBe(429);
  });

  it("surfaces sink errors as a 500 with a helpful message", async () => {
    vi.mocked(sheets.recordSubmission).mockRejectedValueOnce(new Error("503"));
    const r = await POST(
      request({
        kind: "registration",
        payload: { fullName: "Valid", email: "a@b.co", affiliation: "x", role: "researcher" },
      }),
    );
    expect(r.status).toBe(500);
    const body = (await r.json()) as { message: string };
    expect(body.message).toMatch(/couldn't finish processing it/);
  });
});
