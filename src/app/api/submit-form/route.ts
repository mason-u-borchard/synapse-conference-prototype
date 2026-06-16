import { NextRequest } from "next/server";
import { z } from "zod";
import { identifierFromHeaders, rateLimit } from "@/lib/rate-limit";
import { recordSubmission } from "@/lib/sheets-sink";
import { sendAdminNotification, sendConfirmationEmail } from "@/lib/email";

export const runtime = "nodejs";

const registrationSchema = z.object({
  fullName: z.string().min(2).max(120),
  email: z.string().email(),
  city: z.string().min(1).max(120),
  country: z.string().min(1).max(120),
  usState: z.string().max(120).optional().default(""),
  affiliation: z.string().min(1).max(200),
  gender: z.enum([
    "male",
    "female",
    "non-binary",
    "intersex",
    "other",
    "prefer-not-to-say",
  ]),
  genderOther: z.string().max(60).optional().default(""),
  bio: z.string().min(1).max(2000),
  directoryConsent: z.enum(["yes", "no"]),
  // Contributor section (Kelly's 2026-05-26 redesign). contribute
  // replaces the old isSpeaker; contributionType + the per-type fields
  // are only present when contribute === "yes" and one type is picked,
  // so everything past `contribute` is optional.
  contribute: z.enum(["yes", "no"]),
  contributionType: z.enum(["present", "experience", "facilitate"]).optional(),
  attendIfNotSelected: z.enum(["yes", "no"]).optional(),
  presentTitle: z.string().max(300).optional().default(""),
  presentAbstract: z.string().max(5000).optional().default(""),
  presentCoauthors: z.string().max(1000).optional().default(""),
  presentResisted: z.string().max(3000).optional().default(""),
  experienceTitle: z.string().max(300).optional().default(""),
  experienceDescription: z.string().max(3000).optional().default(""),
  experienceMedium: z.string().max(500).optional().default(""),
  experienceNeeds: z.string().max(500).optional().default(""),
  experienceLink: z.string().max(500).optional().default(""),
  facilitateOffering: z.string().max(3000).optional().default(""),
  facilitateExperience: z.string().max(2000).optional().default(""),
  facilitateMatching: z.string().max(40).optional().default(""),
  essay1: z.string().min(1).max(3000),
  essay2: z.string().min(1).max(3000),
  guidelinesAgreement: z.string().refine((v) => v === "on", {
    message: "Please agree to the community guidelines.",
  }),
  pronouns: z.string().max(60).optional().default(""),
  referral: z.string().max(300).optional().default(""),
  reflection: z.string().max(2000).optional().default(""),
  dietary: z.string().max(400).optional().default(""),
  access: z.string().max(2000).optional().default(""),
  company_website: z.string().max(0).optional(),
});

const contactSchema = z.object({
  fullName: z.string().min(2).max(120),
  email: z.string().email(),
  message: z.string().min(8).max(4000),
  company_website: z.string().max(0).optional(),
});

const bodySchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("registration"), payload: z.unknown() }),
  z.object({ kind: z.literal("contact"), payload: z.unknown() }),
]);

export async function POST(req: NextRequest) {
  const identifier = identifierFromHeaders(req.headers);
  const limit = await rateLimit(`form:${identifier}`);
  if (!limit.allowed) {
    return json({ message: "Too many submissions from this address. Please try again in a minute." }, 429);
  }

  let parsedBody;
  try {
    parsedBody = bodySchema.parse(await req.json());
  } catch {
    return json({ message: "The form submission could not be decoded. Refresh and try again." }, 400);
  }

  const schema = parsedBody.kind === "registration" ? registrationSchema : contactSchema;
  const normalized = normalizePayload(parsedBody.payload);
  const payload = schema.safeParse(normalized);

  if (!payload.success) {
    const message = payload.error.issues[0]?.message ?? "One of the form fields looks off.";
    return json({ message }, 422);
  }

  const persistPayload = buildPersistPayload(parsedBody.kind, payload.data);

  try {
    const { confirmationId, persisted } = await recordSubmission(
      parsedBody.kind,
      persistPayload,
    );

    if (parsedBody.kind === "registration") {
      const data = payload.data as z.infer<typeof registrationSchema>;
      await sendConfirmationEmail({ to: data.email, fullName: data.fullName, confirmationId });
      // Admin notification runs in a non-blocking try/catch so a Resend
      // failure on the internal copy does not surface as a 500 to the
      // applicant, whose submission has already been persisted.
      try {
        await sendAdminNotification({
          confirmationId,
          payload: persistPayload,
        });
      } catch (notifyError) {
        console.error("[submit-form] admin notification failed", notifyError);
      }
    }

    return json({ confirmationId, persisted }, 200);
  } catch (error) {
    console.error("[submit-form] unhandled error", error);
    // TEMPORARY: surfacing the underlying error message in the 500
    // response so the prod failure mode is observable without reading
    // Vercel logs. Revert this block once the live submission path is
    // confirmed working. No PII surfaces here — errors originate in
    // the Sheets API or Resend and describe infrastructure state.
    const debugMessage =
      error instanceof Error ? error.message : String(error);
    return json(
      {
        message:
          "The submission reached us but we couldn't finish processing it. Try again in a few minutes or email hello@thesynapse.co.",
        debug: debugMessage,
      },
      500,
    );
  }
}

function normalizePayload(raw: unknown): Record<string, unknown> {
  if (!raw || typeof raw !== "object") return {};
  return { ...(raw as Record<string, unknown>) };
}

// Collapses the "Other" gender split-field into a single sheet value:
// blank text → "Other", typed text → "Other: <text>". Drops genderOther
// so it doesn't surface as a separate column or in the JSON dump.
function buildPersistPayload(
  kind: "registration" | "contact",
  data: Record<string, unknown>,
): Record<string, unknown> {
  if (kind !== "registration") return data;
  const next = { ...data };
  if (next.gender === "other") {
    const extra = typeof next.genderOther === "string" ? next.genderOther.trim() : "";
    next.gender = extra ? `Other: ${extra}` : "Other";
  }
  delete next.genderOther;
  return next;
}

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
}
