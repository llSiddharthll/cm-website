/** Canonical site origin. Override with NEXT_PUBLIC_SITE_URL if needed;
    defaults to the production domain. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://thecreativemonk.in"
).replace(/\/$/, "");

/** GA4 measurement ID. Loading gtag.js also satisfies Google Search Console's
    "Google Analytics" ownership verification method. */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-1XX3SG68HR";

/** Optional GTM container (e.g. "GTM-XXXXXXX") — set to also load Tag Manager,
    which is the method Search Console currently has on file. */
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "";

/** Optional `google-site-verification` token — the value from Search Console's
    "HTML tag" method, as a belt-and-braces backup to the Analytics method. */
export const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION || "";

/** Cloudflare Turnstile public site key. When empty, forms render without a
    captcha so nothing breaks before the keys are configured. */
export const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";
