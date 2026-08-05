import type { MetadataRoute } from "next";

const WEBSITE_URL = "https://www.marutibag.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/"],
    },

    sitemap: `${WEBSITE_URL}/sitemap.xml`,

    host: WEBSITE_URL,
  };
}