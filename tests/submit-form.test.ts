import { describe, expect, it, beforeEach, vi } from "vitest";
import type { NextRequest } from "next/server";

vi.mock("@/lib/sheets-sink", () => ({
  recordSubmission: vi.fn(async () => ({ confirmationId: "SYN-TEST", persisted: "log" as const })),
}));
vi.mock("@/lib/email", () => ({
  sendConfirmationEmail: vi.fn(async () => ({ sent: false, reason: "no-credentials" as const })),
  sendAdminNotification: vi.fn(async () => ({ sent: false, reason: "no-credentials" as const })),
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

// A complete registration payload that satisfies the current schema.
// Individual tests override or add fields (honeypot, etc.) as needed.
function validRegistration(overrides: Record<string, unknown> = {}) {
  return {
    kind: "registration",
    payload: {
      fullName: "Valid Attendee",
      email: "attendee@example.com",
      city: "San Diego",
      country: "United States",
      affiliation: "Independent",
      gender: "female",
      bio: "Researcher working across cognitive science and consciousness studies.",
      directoryConsent: "yes",
      contribute: "no",
      essay1: "This room brings together fields that rarely share a table.",
      essay2: "I cite, hire, and amplify women's work in my field.",
      guidelinesAgreement: "on",
      ...overrides,
    },
  };
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

  it("saves and flags honeypot hits instead of dropping them", async () => {
    const r = await POST(
      request(validRegistration({ fullName: "Imposter", company_website: "https://bots.example" })),
    );
    // Fail closed: the submission is persisted (a real applicant whose
    // autofill tripped the honeypot must not be silently lost), flagged
    // for the team, and no confirmation email is sent to the address.
    expect(r.status).toBe(200);
    expect(sheets.recordSubmission).toHaveBeenCalledOnce();
    const persisted = vi.mocked(sheets.recordSubmission).mock.calls[0]![1] as Record<string, unknown>;
    expect(persisted.flag).toMatch(/honeypot/i);
    expect(persisted.company_website).toBeUndefined();
    expect(email.sendConfirmationEmail).not.toHaveBeenCalled();
  });

  it("records valid registrations and triggers confirmation email", async () => {
    const r = await POST(request(validRegistration()));
    expect(r.status).toBe(200);
    expect(sheets.recordSubmission).toHaveBeenCalledOnce();
    expect(email.sendConfirmationEmail).toHaveBeenCalledOnce();
  });

  it("still returns 200 when the confirmation email fails after the save", async () => {
    // The core hardening: once the application is persisted, a downstream
    // email failure (Resend outage, thrown error) must NOT surface to the
    // applicant as a failed submission -- that was the "we have your
    // application but you saw an error" report.
    vi.mocked(email.sendConfirmationEmail).mockRejectedValueOnce(new Error("resend down"));
    const r = await POST(request(validRegistration()));
    expect(r.status).toBe(200);
    expect(sheets.recordSubmission).toHaveBeenCalledOnce();
    const body = (await r.json()) as { confirmationId: string };
    expect(body.confirmationId).toBe("SYN-TEST");
  });

  it("returns 429 when rate-limited", async () => {
    vi.mocked(limiter.rateLimit).mockResolvedValueOnce({ allowed: false, remaining: 0, reset: Date.now() + 60_000 });
    const r = await POST(request(validRegistration()));
    expect(r.status).toBe(429);
  });

  it("surfaces sink errors as a 500 with a helpful message", async () => {
    vi.mocked(sheets.recordSubmission).mockRejectedValueOnce(new Error("503"));
    const r = await POST(request(validRegistration()));
    expect(r.status).toBe(500);
    const body = (await r.json()) as { message: string };
    expect(body.message).toMatch(/couldn't finish processing it/);
  });
});
