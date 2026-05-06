import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thesynapse.co";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

function url(path: string): string {
  const normalized = path === "/" ? "" : path;
  return `${siteUrl}${basePath}${normalized}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  // v2 IA: About / Ethos / Program are primary text nav, Invest /
  // Attend are CTA buttons, FAQ is footer-only. /apply is private
  // and noindex; speakers and the legacy /donate, /register,
  // /schedule paths are excluded (the latter three redirect via
  // next.config.js).
  const staticRoutes = ["/", "/about", "/ethos", "/program", "/attend", "/invest", "/faq"];
  return staticRoutes.map((path) => ({
    url: url(path),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));
}
