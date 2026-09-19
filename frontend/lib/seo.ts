/* ============================================================
   SEO helpers, canonical URLs, per-page OpenGraph/Twitter, and
   JSON-LD (structured data) builders. Keep page files thin: they
   call buildMetadata() for <head> tags and the *Schema() helpers
   for structured data rendered via <JsonLd>.
   ============================================================ */
import type { Metadata } from "next";
import { SITE_URL } from "./site";
import { SITE } from "./content";
import { stripHtml } from "./admin/html";

/** Absolute URL for a route path (leaves already-absolute URLs untouched). */
export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

/** Trim to a clean, tag-free meta description of a sensible length. */
export function metaDescription(input: unknown, max = 160): string {
  const s = stripHtml(input);
  if (s.length <= max) return s;
  return s.slice(0, max - 1).replace(/\s+\S*$/, "").trimEnd() + "…";
}

type BuildMeta = {
  title?: string;
  description?: string;
  /** Route path, used for the canonical URL and og:url. */
  path: string;
  /** Social image (absolute or site-relative). Falls back to the site OG image. */
  image?: string;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
};

/**
 * Metadata with canonical + OpenGraph + Twitter, all consistent. Titles/
 * descriptions are HTML-stripped so legacy WordPress markup never leaks into
 * <title> or social previews. Title flows through the layout's `%s · Creative
 * Monk` template; og/twitter titles are set explicitly so they're never empty.
 */
export function buildMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
  modifiedTime,
  noIndex,
}: BuildMeta): Metadata {
  const url = absoluteUrl(path);
  const cleanTitle = title ? stripHtml(title) : undefined;
  const desc = description ? metaDescription(description) : undefined;
  const img = absoluteUrl(image || "/opengraph-image");

  return {
    ...(cleanTitle ? { title: cleanTitle } : {}),
    ...(desc ? { description: desc } : {}),
    alternates: { canonical: url },
    openGraph: {
      ...(cleanTitle ? { title: cleanTitle } : {}),
      ...(desc ? { description: desc } : {}),
      url,
      type: type === "profile" ? "website" : type,
      siteName: SITE.name,
      images: [{ url: img, width: 1200, height: 630 }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      ...(cleanTitle ? { title: cleanTitle } : {}),
      ...(desc ? { description: desc } : {}),
      images: [img],
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

/* ───────────────────────── JSON-LD builders ───────────────────────── */

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/** The brand entity, referenced by @id from other schemas. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.name,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.png`,
    email: SITE.email,
    telephone: SITE.phoneHref,
    foundingDate: String(SITE.founded),
    description:
      "A full-service creative & digital growth studio from Chandigarh, India, brand, web, performance marketing and motion under one roof.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Office 11–12, 9th Floor, Sushma Infinium",
      addressLocality: "Zirakpur",
      addressRegion: "Punjab",
      postalCode: "140603",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE.phoneHref,
      email: SITE.email,
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
    sameAs: SITE.socials.map((s) => s.href),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE.name,
    url: SITE_URL,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-IN",
  };
}

/** BreadcrumbList from ordered {name, path} crumbs. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: stripHtml(it.name),
      item: absoluteUrl(it.path),
    })),
  };
}

/** FAQPage from {q,a} pairs (drives FAQ rich results). */
export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: stripHtml(f.q),
      acceptedAnswer: { "@type": "Answer", text: stripHtml(f.a) },
    })),
  };
}

/** Article (blog post) schema. */
export function articleSchema(post: {
  slug: string;
  title: string;
  excerpt?: string;
  date: string;
  cover?: string;
  category?: string;
}) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    mainEntityOfPage: url,
    headline: stripHtml(post.title).slice(0, 110),
    ...(post.excerpt ? { description: metaDescription(post.excerpt) } : {}),
    image: [absoluteUrl(post.cover || "/opengraph-image")],
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    ...(post.category ? { articleSection: post.category } : {}),
    author: { "@id": ORG_ID, name: SITE.name },
    publisher: { "@id": ORG_ID },
  };
}

/** Service offered by the studio. */
export function serviceSchema(opts: {
  name: string;
  description?: string;
  path: string;
  areaServed?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: stripHtml(opts.name),
    ...(opts.description ? { description: metaDescription(opts.description, 300) } : {}),
    url: absoluteUrl(opts.path),
    provider: { "@id": ORG_ID },
    areaServed: opts.areaServed || "IN",
    serviceType: stripHtml(opts.name),
  };
}

/** Location landing page → a local business entity for that city. */
export function localBusinessSchema(opts: {
  city: string;
  region?: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${absoluteUrl(opts.path)}#localbusiness`,
    name: `${SITE.name}, ${opts.city}`,
    url: absoluteUrl(opts.path),
    image: `${SITE_URL}/opengraph-image`,
    logo: `${SITE_URL}/icon.png`,
    telephone: SITE.phoneHref,
    email: SITE.email,
    priceRange: "₹₹",
    parentOrganization: { "@id": ORG_ID },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Office 11–12, 9th Floor, Sushma Infinium",
      addressLocality: "Zirakpur",
      addressRegion: "Punjab",
      postalCode: "140603",
      addressCountry: "IN",
    },
    areaServed: { "@type": "City", name: opts.city },
    sameAs: SITE.socials.map((s) => s.href),
  };
}
