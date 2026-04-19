import { NextRequest } from "next/server";
import { z } from "zod";
import { identifierFromHeaders, rateLimit } from "@/lib/rate-limit";
import { getDonationProvider } from "@/lib/donations/provider";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const bodySchema = z.object({
  amount: z.number().int().min(500).max(5_000_00),
  recurring: z.boolean().optional().default(false),
});

export async function POST(req: NextRequest) {
  const identifier = identifierFromHeaders(req.headers);
  const limit = await rateLimit(`donate:${identifier}`);
  if (!limit.allowed) {
    return json({ message: "Too many donation attempts. Please try again in a minute." }, 429);
  }

  let parsed;
  try {
    parsed = bodySchema.parse(await req.json());
  } catch {
    return json({ message: "Invalid donation amount." }, 400);
  }

  const provider = getDonationProvider();

  if (provider.embedOnly) {
    return json({
      kind: "embed",
      message:
        "This deployment uses an embed-based donation provider. The /donate page should redirect directly instead of calling this endpoint.",
      provider: provider.name,
    }, 400);
  }

  if (!provider.createCheckout) {
    return json({ kind: "disabled", message: provider.blurb }, 200);
  }

  try {
    const result = await provider.createCheckout({
      amountCents: parsed.amount,
      recurring: parsed.recurring,
      successUrl: `${siteUrl()}/donate?thankyou=1`,
      cancelUrl: `${siteUrl()}/donate`,
    });
    if (result.kind === "redirect") return json({ redirectUrl: result.url });
    if (result.kind === "stub") return json({ kind: "stub", message: result.message });
    return json({ kind: "disabled", message: result.message });
  } catch (error) {
    console.error("[donate] provider error", error);
    return json({ message: "Unable to create checkout session." }, 502);
  }
}

function siteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3021";
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return `${url}${basePath}`;
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
}
