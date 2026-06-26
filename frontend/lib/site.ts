/** Canonical site origin. Set NEXT_PUBLIC_SITE_URL to the real domain in prod;
    falls back to the Vercel production URL, then the current deploy alias. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "") ||
  "https://cm-website-five.vercel.app"
).replace(/\/$/, "");
