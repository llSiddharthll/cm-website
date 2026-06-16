import type { MetadataRoute } from "next";
import { CASES } from "@/lib/content";
import { POSTS } from "@/lib/agency";

const BASE = "https://thecreativemonk.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/work",
    "/blog",
    "/careers",
    "/contact",
  ].map((path) => ({
    url: `${BASE}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

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

  return [...staticRoutes, ...cases, ...posts];
}
