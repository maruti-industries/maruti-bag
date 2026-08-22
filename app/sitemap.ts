import { MetadataRoute } from "next";

import { products } from "./data/products";

const WEBSITE_URL = "https://www.marutibag.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const productPages = products.map((product) => ({
    url: `${WEBSITE_URL}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [
    {
      url: WEBSITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },

    {
      url: `${WEBSITE_URL}/products`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    },

    {
      url: `${WEBSITE_URL}/gallery`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    },

    ...productPages,
  ];
}
