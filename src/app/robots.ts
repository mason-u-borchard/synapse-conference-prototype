import type { MetadataRoute } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

// While the prototype lives on masonborchard.com we keep it out of
// search indexes; the committee will decide when to promote it.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", disallow: basePath ? `${basePath}/` : "/" }],
    sitemap: basePath ? `${basePath}/sitemap.xml` : "/sitemap.xml",
  };
}
