import type { MetadataRoute } from "next";
import { getAllProducts, getCategories } from "@/lib/data";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/collections`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/quote`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/process`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/faqs`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/wishlist`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${base}/search`, lastModified: now, changeFrequency: "monthly", priority: 0.2 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = getCategories().map((c) => ({
    url: `${base}/categories/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const productRoutes: MetadataRoute.Sitemap = getAllProducts()
    .filter((p) => !p.needsReview)
    .map((p) => ({
      url: `${base}/product/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}