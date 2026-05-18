import { NextRequest } from "next/server";
import { z } from "zod";
import { identifierFromHeaders, rateLimit } from "@/lib/rate-limit";
import { recordSubmission } from "@/lib/sheets-sink";
import { sendConfirmationEmail } from "@/lib/email";

export const runtime = "nodejs";

const registrationSchema = z.object({
  fullName: z.string().min(2).max(120),
  email: z.string().email(),
  city: z.string().min(1).max(120),
  country: z.string().min(1).max(120),
  affiliation: z.string().min(1).max(200),
  gender: z.enum([
    "male",
    "female",
    "non-binary",
    "intersex",
    "other",
    "prefer-not-to-say",
  ]),
  bio: z.string().min(1).max(2000),
  directoryConsent: z.enum(["yes", "no"]),
  isSpeaker: z.enum(["yes", "no"]),
  attendIfNotSpeaker: z.enum(["yes", "no"]).optional(),
  essay1: z.string().min(1).max(3000),
  essay2: z.string().min(1).max(3000),
  guidelinesAgreement: z.string().refine((v) => v === "on", {
    message: "Please agree to the community guidelines.",
  }),
  pronouns: z.string().max(60).optional().default(""),
  referral: z.string().max(300).optional().default(""),
  speakerUploadFilename: z.string().max(500).optional().default(""),
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

  try {
    const { confirmationId, persisted } = await recordSubmission(
      parsedBody.kind,
      payload.data as Record<string, unknown>,
    );

    if (parsedBody.kind === "registration") {
      const data = payload.data as z.infer<typeof registrationSchema>;
      await sendConfirmationEmail({ to: data.email, fullName: data.fullName, confirmationId });
    }

    return json({ confirmationId, persisted }, 200);
  } catch (error) {
    console.error("[submit-form] unhandled error", error);
    return json(
      {
        message:
          "The submission reached us but we couldn't finish processing it. Try again in a few minutes or email hello@thesynapse.co.",
      },
      500,
    );
  }
}

function normalizePayload(raw: unknown): Record<string, unknown> {
  if (!raw || typeof raw !== "object") return {};
  return { ...(raw as Record<string, unknown>) };
}

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
}
