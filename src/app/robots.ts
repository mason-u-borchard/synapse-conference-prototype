import type { MetadataRoute } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
// Same fallback as sitemap.ts. The Sitemap directive in robots.txt
// must be an absolute URL per the sitemaps protocol -- a relative
// path is ignored by Google and others.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thesynapse.co";

// Known AI training crawlers. Blocked from the entire site -- these
// are scraped purely for model training, not for search or answer
// citation. Search bots (Googlebot, Bingbot) and answer bots that
// cite sources (PerplexityBot, OAI-SearchBot, ChatGPT-User, etc.) are
// covered by the wildcard "Allow: /" rule at the bottom and are not
// blocked. List sourced from github.com/ai-robots-txt/ai.robots.txt
// (community-maintained). Re-audit every ~6 months as bot names shift.
const TRAINING_BOTS: readonly string[] = [
  "GPTBot",
  "ClaudeBot",
  "anthropic-ai",
  "Claude-Web",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "Bytespider",
  "Meta-ExternalAgent",
  "FacebookBot",
  "AI2Bot",
  "Diffbot",
  "cohere-ai",
  "Omgilibot",
  "PetalBot",
  "Timpibot",
];

// Page-level `robots: { index: false, follow: false }` metadata on
// /apply, /program, and /constellation handles per-page noindex
// independently of this file -- robots.txt controls *crawling*, page
// metadata controls *indexing*. Opening up robots.txt does not expose
// those unlisted pages to search results.
export default function robots(): MetadataRoute.Robots {
  const root = basePath ? `${basePath}/` : "/";
  return {
    rules: [
      ...TRAINING_BOTS.map((userAgent) => ({ userAgent, disallow: root })),
      { userAgent: "*", allow: root },
    ],
    sitemap: `${siteUrl}${basePath}/sitemap.xml`,
  };
}
