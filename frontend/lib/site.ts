/** Canonical site origin. Override with NEXT_PUBLIC_SITE_URL if needed;
    defaults to the production domain. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://thecreativemonk.in"
).replace(/\/$/, "");
