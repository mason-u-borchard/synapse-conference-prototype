import { NextRequest } from "next/server";
import { streamText, convertToCoreMessages } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";
import { assembleConciergePrompt } from "@/lib/concierge-prompt";
import { identifierFromHeaders, rateLimit } from "@/lib/rate-limit";

const messageSchema = z.object({
  role: z.enum(["user", "assistant", "system"]),
  content: z.string(),
});

const bodySchema = z.object({
  messages: z.array(messageSchema).min(1).max(40),
});

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Provider selection: Anthropic is the committee's preference (per the
// build spec). OpenAI is available as a fallback so development can
// proceed with whichever key is handy. If both keys are set, Anthropic
// wins. If neither is set, /api/chat returns a polite 503.
function pickProvider() {
  if (process.env.ANTHROPIC_API_KEY) {
    return {
      kind: "anthropic" as const,
      client: createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY }),
      defaultModel: "claude-sonnet-4-20250514",
    };
  }
  if (process.env.OPENAI_API_KEY) {
    return {
      kind: "openai" as const,
      client: createOpenAI({ apiKey: process.env.OPENAI_API_KEY }),
      defaultModel: "gpt-4o-mini",
    };
  }
  return null;
}

export async function POST(req: NextRequest) {
  const identifier = identifierFromHeaders(req.headers);
  const limit = await rateLimit(`chat:${identifier}`);
  if (!limit.allowed) {
    return new Response(
      JSON.stringify({
        error: "rate-limited",
        message: "Ava is answering a lot of folks right now. Please give it about a minute before asking again.",
        retryAfter: Math.max(1, Math.ceil((limit.reset - Date.now()) / 1000)),
      }),
      { status: 429, headers: { "Content-Type": "application/json" } },
    );
  }

  const provider = pickProvider();
  if (!provider) {
    return new Response(
      JSON.stringify({
        error: "no-credentials",
        message: "Ava is offline right now because no model provider key is set in this environment. Reach out at hello@thesynapse.example -- a human will answer the same question faster anyway.",
      }),
      { status: 503, headers: { "Content-Type": "application/json" } },
    );
  }

  let parsed;
  try {
    parsed = bodySchema.parse(await req.json());
  } catch {
    return new Response(JSON.stringify({ error: "bad-request" }), { status: 400, headers: { "Content-Type": "application/json" } });
  }

  const modelId = process.env.CONCIERGE_MODEL_ID || provider.defaultModel;

  const result = await streamText({
    model: provider.client(modelId),
    system: assembleConciergePrompt(provider.kind),
    messages: convertToCoreMessages(parsed.messages),
    maxTokens: 700,
    temperature: 0.55,
  });

  return result.toDataStreamResponse({
    getErrorMessage: (error) => {
      console.error("[chat] streamText error", error);
      if (error instanceof Error) return error.message;
      return "Ava hit an unexpected error. Please try again.";
    },
  });
}
