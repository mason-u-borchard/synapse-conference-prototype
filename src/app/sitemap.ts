import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://masonborchard.com";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

function url(path: string): string {
  const normalized = path === "/" ? "" : path;
  return `${siteUrl}${basePath}${normalized}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  // /speakers and /speakers/<slug> are excluded until the participant
  // roster is confirmed.
  const staticRoutes = ["/", "/schedule", "/about", "/register", "/donate", "/faq"];
  return staticRoutes.map((path) => ({
    url: url(path),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));
}
