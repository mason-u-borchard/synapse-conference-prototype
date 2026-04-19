import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

type RateOutcome = { allowed: boolean; remaining: number; reset: number };

const hasUpstash = !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN;

const upstashLimiter = hasUpstash
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(10, "60 s"),
      analytics: false,
      prefix: "synapse",
    })
  : null;

const memoryStore = new Map<string, number[]>();

function memoryAllow(identifier: string, limit: number, windowMs: number): RateOutcome {
  const now = Date.now();
  const windowStart = now - windowMs;
  const hits = (memoryStore.get(identifier) ?? []).filter((t) => t > windowStart);
  if (hits.length >= limit) {
    return { allowed: false, remaining: 0, reset: (hits[0] ?? now) + windowMs };
  }
  hits.push(now);
  memoryStore.set(identifier, hits);
  return { allowed: true, remaining: Math.max(0, limit - hits.length), reset: now + windowMs };
}

export async function rateLimit(identifier: string): Promise<RateOutcome> {
  if (upstashLimiter) {
    const r = await upstashLimiter.limit(identifier);
    return { allowed: r.success, remaining: r.remaining, reset: r.reset };
  }
  return memoryAllow(identifier, 10, 60_000);
}

export function identifierFromHeaders(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  const real = headers.get("x-real-ip");
  if (real) return real.trim();
  return "anonymous";
}
