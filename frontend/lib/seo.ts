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
  /** The generic service ("SEO") when `name` is a keyword heading. */
  serviceType?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: stripHtml(opts.name),
    ...(opts.description ? { description: metaDescription(opts.description, 300) } : {}),
    url: absoluteUrl(opts.path),
    provider: { "@id": ORG_ID },
    areaServed: opts.areaServed || "IN",
    serviceType: stripHtml(opts.serviceType || opts.name),
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

/* ───────────── JobPosting (Google Jobs) ───────────── */

type SalaryUnit = "MONTH" | "YEAR" | "HOUR";

const PERIOD_UNIT: Record<string, SalaryUnit> = { Month: "MONTH", Year: "YEAR", Hour: "HOUR" };

const EMPLOYMENT_TYPE: Record<string, string> = {
  "Full-time": "FULL_TIME",
  "Part-time": "PART_TIME",
  Contract: "CONTRACTOR",
  Internship: "INTERN",
};

/**
 * Reads a pay range from display text such as "₹20,000–₹35,000/mo",
 * "₹60k–1.1L/mo" or "4–6 LPA". Returns null unless both an amount and a pay
 * period are stated, so nothing is guessed.
 */
export function parseSalary(text?: string): { min: number; max?: number; unit: SalaryUnit } | null {
  if (!text) return null;
  const t = text.toLowerCase().replace(/,/g, "");
  const unit: SalaryUnit | null = /lpa|\/\s*(yr|year|annum)|per (year|annum)|p\.?a\b/.test(t)
    ? "YEAR"
    : /\/\s*(hr|hour)|per hour/.test(t)
      ? "HOUR"
      : /\/\s*(mo|month)|per month/.test(t)
        ? "MONTH"
        : null;
  if (!unit) return null;

  const MULT: Record<string, number> = { k: 1e3, l: 1e5, lakh: 1e5, lac: 1e5, lpa: 1e5, cr: 1e7 };
  const tokens = [...t.matchAll(/(\d+(?:\.\d+)?)\s*(lakh|lac|lpa|cr|k|l)?(?![a-z])/g)].map((m) => ({
    n: parseFloat(m[1]),
    suffix: m[2],
  }));
  // "4–6 LPA": a bare number takes the suffix of the one after it.
  for (let i = tokens.length - 2; i >= 0; i--) tokens[i].suffix ??= tokens[i + 1].suffix;
  const amounts = tokens.map((x) => Math.round(x.n * (x.suffix ? MULT[x.suffix] : 1))).filter((n) => n >= 100);
  if (!amounts.length) return null;
  const min = Math.min(...amounts);
  const max = Math.max(...amounts);
  return max > min ? { min, max, unit } : { min, unit };
}

/** "2–4 years" → 24 (the lower bound, in months). */
function experienceMonths(text?: string): number | null {
  if (!text || !/year|yr/i.test(text)) return null;
  const m = text.match(/(\d+(?:\.\d+)?)/);
  return m ? Math.round(parseFloat(m[1]) * 12) : null;
}

const isoDate = (v?: string) => {
  if (!v) return undefined;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString().slice(0, 10);
};

export function jobPostingSchema(role: {
  title: string;
  slug: string;
  summary?: string;
  description?: string;
  type?: string;
  experience?: string;
  salary?: string;
  salaryMin?: number;
  salaryMax?: number;
  salaryPeriod?: string;
  workplace?: string;
  datePosted?: string;
  validThrough?: string;
  applyUrl?: string;
  _createdAt?: string;
}) {
  const posted = isoDate(role.datePosted) || isoDate(role._createdAt);
  const closes = isoDate(role.validThrough);
  const remote = role.workplace === "Remote";

  const salary =
    role.salaryMin && role.salaryPeriod
      ? { min: role.salaryMin, max: role.salaryMax, unit: PERIOD_UNIT[role.salaryPeriod] ?? "MONTH" }
      : parseSalary(role.salary);
  const months = experienceMonths(role.experience);

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: role.title,
    description: role.description || `<p>${role.summary || role.title}</p>`,
    identifier: { "@type": "PropertyValue", name: SITE.name, value: role.slug },
    ...(posted ? { datePosted: posted } : {}),
    ...(closes ? { validThrough: `${closes}T23:59:59+05:30` } : {}),
    employmentType: EMPLOYMENT_TYPE[role.type || "Full-time"] ?? "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: SITE.name,
      sameAs: SITE_URL,
      logo: `${SITE_URL}/icon.png`,
    },
    ...(remote
      ? {
          jobLocationType: "TELECOMMUTE",
          applicantLocationRequirements: { "@type": "Country", name: "India" },
        }
      : {
          jobLocation: {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Office 11–12, 9th Floor, Sushma Infinium",
              addressLocality: "Zirakpur",
              addressRegion: "Punjab",
              postalCode: "140603",
              addressCountry: "IN",
            },
          },
        }),
    ...(salary
      ? {
          baseSalary: {
            "@type": "MonetaryAmount",
            currency: "INR",
            value: {
              "@type": "QuantitativeValue",
              ...(salary.max ? { minValue: salary.min, maxValue: salary.max } : { value: salary.min }),
              unitText: salary.unit,
            },
          },
        }
      : {}),
    ...(months
      ? {
          experienceRequirements: {
            "@type": "OccupationalExperienceRequirements",
            monthsOfExperience: months,
          },
        }
      : {}),
    industry: "Marketing and Advertising",
    directApply: !role.applyUrl,
    url: absoluteUrl(`/careers/${role.slug}`),
  };
}
