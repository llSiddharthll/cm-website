import type { MetadataRoute } from "next";
import { CASES } from "@/lib/content";
import { POSTS, SERVICE_CATEGORIES } from "@/lib/agency";
import { SITE_URL as BASE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/portfolio",
    "/work",
    "/blog",
    "/careers",
    "/contact",
  ].map((path) => ({
    url: `${BASE}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const services = SERVICE_CATEGORIES.flatMap((c) => [
    { url: `${BASE}/services/${c.slug}`, changeFrequency: "monthly" as const, priority: 0.7 },
    ...c.items.map((it) => ({
      url: `${BASE}/services/${c.slug}/${it.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ]);

  const cases = CASES.map((c) => ({
    url: `${BASE}/work/${c.id}`,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const posts = POSTS.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...services, ...cases, ...posts];
}
