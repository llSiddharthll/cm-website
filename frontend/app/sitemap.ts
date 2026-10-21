import type { MetadataRoute } from "next";
import { INDUSTRY_PAGES, LOCATION_PAGES } from "@/lib/agency";
import { allPseoSlugs } from "@/lib/pseo";
import { getCases, getPosts, getRoles, getServiceCategories } from "@/lib/cms";
import { SITE_URL as BASE } from "@/lib/site";

// Rebuilt from the CMS hourly, so anything published in the admin (posts,
// case studies, open roles) reaches Google without a redeploy.
export const revalidate = 3600;

const date = (v?: string) => {
  if (!v) return undefined;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? undefined : d;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, cases, posts, roles] = await Promise.all([
    getServiceCategories(),
    getCases(),
    getPosts(),
    getRoles(),
  ]);

  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/industries",
    "/locations",
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

  const services = categories.flatMap((c) => [
    { url: `${BASE}/services/${c.slug}`, changeFrequency: "monthly" as const, priority: 0.8 },
    ...c.items.map((it) => ({
      url: `${BASE}/services/${c.slug}/${it.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ]);

  // City and industry service pages carry the highest-intent searches.
  const pseo = allPseoSlugs().map((slug) => ({
    url: `${BASE}/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const hubs = [
    ...INDUSTRY_PAGES.map((p) => `/industries/${p.slug}`),
    ...LOCATION_PAGES.map((p) => `/locations/${p.slug}`),
  ].map((path) => ({ url: `${BASE}${path}`, changeFrequency: "monthly" as const, priority: 0.7 }));

  const jobs = roles
    .filter((r) => r.slug)
    .map((r) => ({
      url: `${BASE}/careers/${r.slug}`,
      lastModified: date(r.datePosted) ?? date(r._createdAt),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

  const work = cases.map((c) => ({
    url: `${BASE}/work/${c.id}`,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const blog = posts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: date(p.date),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...services, ...pseo, ...hubs, ...jobs, ...work, ...blog];
}
