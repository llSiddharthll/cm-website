/* Keyword-led headings for the national service pages ("SEO Company in
   India"). City and industry pages use "in <City>" / "for <Industry>" from
   lib/pseo.ts, so the two sets never compete for the same phrase. Each
   heading can be overridden per entry in the admin via `headline`. */

/** Hub: /services */
export const SERVICES_HUB_HEADLINE = "Digital Marketing Services in India";

/** Category pages: /services/<category> */
const CATEGORY_HEADLINES: Record<string, string> = {
  "get-found": "SEO & Performance Marketing Services in India",
  "get-chosen": "Branding & Design Services in India",
  "get-leads": "Web Development & Lead Generation Services in India",
  "get-remembered": "Content & Video Production Services in India",
  "get-better": "Analytics, CRO & AI Marketing Services in India",
  "get-it-all": "Full-Service Digital Marketing in India",
};

/** Sub-service pages: /services/<category>/<slug> */
const SERVICE_HEADLINES: Record<string, string> = {
  "get-found/seo": "SEO Company in India",
  "get-found/google-ads": "Google Ads Agency in India",
  "get-found/meta-ads": "Meta Ads Agency in India",
  "get-found/social-media-marketing": "Social Media Marketing Agency in India",
  "get-chosen/branding": "Branding Agency in India",
  "get-chosen/graphic-design": "Graphic Design Agency in India",
  "get-leads/web-development": "Web Development Company in India",
  "get-leads/ui-ux": "UI/UX Design Agency in India",
  "get-leads/lead-generation": "Lead Generation Agency in India",
  "get-remembered/content": "Content Writing Agency in India",
  "get-remembered/video-motion": "Video Production Agency in India",
  "get-remembered/social-content": "Social Media Content Agency in India",
  "get-better/analytics-cro": "CRO & Analytics Agency in India",
  "get-better/ai-optimization": "AI Marketing Agency in India",
  "get-it-all/growth-system-360": "360° Digital Marketing Agency in India",
};

export function categoryHeadline(cat: { slug: string; name: string; headline?: string }): string {
  return cat.headline || CATEGORY_HEADLINES[cat.slug] || `${cat.name} Services in India`;
}

export function serviceHeadline(page: {
  category: string;
  slug: string;
  name: string;
  headline?: string;
}): string {
  return page.headline || SERVICE_HEADLINES[`${page.category}/${page.slug}`] || `${page.name} Services in India`;
}
