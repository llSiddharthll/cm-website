/* Real Creative Monk case studies, galleries and video work — built from the
   Tricity client deck. Images live in frontend/public/work (served by Vercel).
   Copy is factual: real names, real deliverables, NO invented metrics. */

export const REAL_CASES = [
  {
    id: "tvisva",
    client: "Tvisva Jewels",
    title: "A jewellery house, dressed for every surface",
    category: ["Branding", "Social", "Print", "Website"],
    year: "2025",
    result: "A complete brand identity and collateral system — social, print, in-store signage, packaging and website.",
    metric: { value: "20+", label: "brand assets" },
    accent: "8deg",
    cover: "/work/tvisva-014.jpg",
  },
  {
    id: "white-wolf",
    client: "White Wolf",
    title: "A men's grooming identity with bite",
    category: ["Branding", "Packaging", "Social", "Logo"],
    year: "2024",
    result: "A full identity for a men's grooming brand — logo system, palette, social templates and a packaging line.",
    metric: { value: "Identity", label: "+ packaging line" },
    accent: "44deg",
    cover: "/work/white-wolf-049.jpg",
  },
  {
    id: "avenry",
    client: "The Avenry",
    title: "Café, kitchen & bar — one identity",
    category: ["Branding", "Social", "Menu", "Print"],
    year: "2025",
    result: "A script-led identity with social, story creatives and a full suite of printed menus.",
    metric: { value: "3 menus", label: "+ brand & social" },
    accent: "24deg",
    cover: "/work/avenry-059.jpg",
  },
  {
    id: "cafe-zoya",
    client: "Café Zoya",
    title: "A café brand with a friendly bite",
    category: ["Branding", "Social", "Menu", "Packaging"],
    year: "2024",
    result: "Brand identity, logo system, social content and printed menu and packaging.",
    metric: { value: "Brand", label: "+ menu & packaging" },
    accent: "16deg",
    cover: "/work/cafe-zoya-076.jpg",
  },
  {
    id: "best-western",
    client: "Best Western Plus Mohali",
    title: "Hospitality, always-on and on-brand",
    category: ["Social", "Branding", "Hospitality"],
    year: "2025",
    result: "Always-on social content and print-ready branding collateral for the hotel.",
    metric: { value: "Always-on", label: "social + collateral" },
    accent: "58deg",
    cover: "/work/best-western-083.jpg",
  },
  {
    id: "chatha-foods",
    client: "Chatha Foods",
    title: "A frozen-food brand, served responsive",
    category: ["Website", "Web Design", "Branding"],
    year: "2025",
    result: "Website design and ongoing management, shown across desktop, tablet and mobile.",
    metric: { value: "Website", label: "design + management" },
    accent: "36deg",
    cover: "/work/chatha-foods-088.jpg",
  },
  {
    id: "ibc",
    client: "IBC — Indian Business Centre",
    title: "Selling real estate before launch",
    category: ["Real Estate", "Advertising", "Social"],
    year: "2025",
    result: "A four-piece vertical ad campaign for a commercial real-estate prelaunch.",
    metric: { value: "Campaign", label: "prelaunch ad set" },
    accent: "0deg",
    cover: "/work/ibc-100.jpg",
  },
  {
    id: "trix",
    client: "Trix",
    title: "A lighting brand, boxed and broadcast",
    category: ["Branding", "Packaging", "Social", "Product"],
    year: "2024",
    result: "Brand identity, a multi-SKU packaging system and an Instagram social grid.",
    metric: { value: "4 SKUs", label: "packaging system" },
    accent: "20deg",
    cover: "/work/trix-102.jpg",
  },
] as const;

const g = (image: string, caption: string) => ({ image, caption });

export const REAL_CASE_SECTIONS = [
  {
    case: "tvisva",
    kind: "gallery",
    discipline: "Brand · Web · Social",
    title: "Selected work",
    intro:
      "A full brand and campaign build for Tvisva Jewels, an Indian jewellery retailer. The work spans social post grids, festival and anniversary collateral, in-store signage (standees, danglers, arc gates, table tents), print (invitations, coupons, certificates, brochures), packaging and website design — across two identity directions: an original maroon-and-gold system and a teal-and-gold rebrand.",
    images: [
      g("/work/tvisva-014.jpg", "Social media grid"),
      g("/work/tvisva-016.jpg", "Standee campaign series"),
      g("/work/tvisva-024.jpg", "Festival table tents"),
      g("/work/tvisva-026.jpg", "Rebrand system — palette & type"),
      g("/work/tvisva-030.jpg", "Website design"),
      g("/work/tvisva-038.jpg", "Grand-launch hoarding"),
    ],
  },
  {
    case: "white-wolf",
    kind: "gallery",
    discipline: "Brand · Packaging",
    title: "Selected work",
    intro:
      "White Wolf is a men's grooming brand built around a bold wolf-monogram identity. The work spans a complete logo system, a black-and-gold palette paired with Baskerville Old Face, a set of social media templates, and packaging across a full range of grooming products — a premium look applied consistently from screen to shelf.",
    images: [
      g("/work/white-wolf-049.jpg", "Logo system, palette & type"),
      g("/work/white-wolf-050.jpg", "Social media templates"),
      g("/work/white-wolf-051.jpg", "Product packaging range"),
    ],
  },
  {
    case: "avenry",
    kind: "gallery",
    discipline: "Brand · Menu · Social",
    title: "Selected work",
    intro:
      "A full identity and collateral system for The Avenry — a café, kitchen and bar — built around a flowing signature wordmark, the Cinzel serif and a warm gold, black and cream palette. The work spans social posts and story creatives, plated-food content, and a suite of printed menus: food, drinks and bar, and a dine-in table tent.",
    images: [
      g("/work/avenry-057.jpg", "Brand identity & social system"),
      g("/work/avenry-058.jpg", "Food-focused social grid"),
      g("/work/avenry-059.jpg", "Instagram story creatives"),
      g("/work/avenry-060.jpg", "Food menu"),
      g("/work/avenry-061.jpg", "Drinks & bar menu"),
      g("/work/avenry-062.jpg", "Dine-in table tent"),
    ],
  },
  {
    case: "cafe-zoya",
    kind: "gallery",
    discipline: "Brand · Menu",
    title: "Selected work",
    intro:
      "A café brand built around a playful coffee-cup mascot, an earthy green-and-brown palette and the Mochica and Kenarose typefaces. The work spans a logo system, an Instagram content grid pairing food photography with branded graphics, and printed collateral including a sectioned food menu and a takeaway bag.",
    images: [
      g("/work/cafe-zoya-075.jpg", "Brand board & logo system"),
      g("/work/cafe-zoya-076.jpg", "Instagram content grid"),
      g("/work/cafe-zoya-077.jpg", "Printed menu & takeaway bag"),
    ],
  },
  {
    case: "best-western",
    kind: "gallery",
    discipline: "Social · Collateral",
    title: "Selected work",
    intro:
      "A hospitality engagement for Best Western Plus Mohali spanning social media content and print-ready branding collateral. The feed pairs lifestyle imagery of rooms, spa and dining with on-brand promotional posts, alongside a maroon-and-gold event flyer promoting a corporate dining offer.",
    images: [
      g("/work/best-western-083.jpg", "Social media grid"),
      g("/work/best-western-084.jpg", "Branding collateral flyer"),
    ],
  },
  {
    case: "chatha-foods",
    kind: "gallery",
    discipline: "Web Design",
    title: "Selected work",
    intro:
      "Website design and ongoing management for Chatha Foods, a processed and frozen-food brand. The site is shown as a responsive multi-device build featuring the ChathaFoods identity, a production-facility hero and a products section — across desktop, laptop, tablet and phone.",
    images: [g("/work/chatha-foods-088.jpg", "Responsive website mockup")],
  },
  {
    case: "ibc",
    kind: "gallery",
    discipline: "Campaign",
    title: "Selected work",
    intro:
      'A digital ad campaign for IBC — Indian Business Centre, a commercial, industrial and residential real-estate brand. The set comprises four vertical story creatives built around prelaunch messaging — "The Perfect Plot", "Prelaunch Offers", "Exclusive Prelaunch Deals" and "Prelaunch Updates" — pairing skyline and plot photography with the IBC lockup in a navy-and-gold palette.',
    images: [g("/work/ibc-100.jpg", "Prelaunch ad campaign — story creatives")],
  },
  {
    case: "trix",
    kind: "gallery",
    discipline: "Brand · Packaging",
    title: "Selected work",
    intro:
      "Trix is a lighting-fixtures brand for which we built a complete visual identity spanning packaging and social. The packaging system covers multiple product lines — Comet trackspots, Delta downlights, Tubus-D and Vista — each on a consistent box design with the Trix wordmark and a warm gold-and-black palette, translated into Instagram product posts and a feed grid.",
    images: [
      g("/work/trix-102.jpg", "Comet trackspot packaging"),
      g("/work/trix-103.jpg", "Delta downlight packaging"),
      g("/work/trix-104.jpg", "Tubus-D fixture packaging"),
      g("/work/trix-105.jpg", "Vista fixture packaging"),
    ],
  },
] as const;

export const REAL_REELS = [
  { id: "r1", title: "Tvisva — Festival Edit", category: "Jewellery / Social", ratio: "9/16", accent: "0deg" },
  { id: "r2", title: "The Avenry — Plated", category: "F&B / Reels", ratio: "9/16", accent: "40deg" },
  { id: "r3", title: "White Wolf — Unboxing", category: "Grooming", ratio: "1/1", accent: "20deg" },
  { id: "r4", title: "IBC — Prelaunch", category: "Real Estate", ratio: "9/16", accent: "60deg" },
  { id: "r5", title: "Café Zoya — Daily Brew", category: "Café", ratio: "1/1", accent: "10deg" },
] as const;

export const REAL_VIDEO_PROJECTS = [
  { id: "v1", title: "Tvisva — Brand Film", category: "Jewellery" },
  { id: "v2", title: "The Avenry — Food Reel", category: "F&B" },
  { id: "v3", title: "White Wolf — Product Reel", category: "Grooming" },
  { id: "v4", title: "Best Western Plus — Property Film", category: "Hospitality" },
  { id: "v5", title: "IBC — Launch Campaign", category: "Real Estate" },
  { id: "v6", title: "Trix — Product Reel", category: "Lighting" },
] as const;

/* Real work images used as service-page hero covers, pooled by category. */
export const SERVICE_COVERS: Record<string, string[]> = {
  creatives: [
    "/work/tvisva-014.jpg",
    "/work/white-wolf-051.jpg",
    "/work/cafe-zoya-076.jpg",
    "/work/trix-103.jpg",
    "/work/avenry-059.jpg",
    "/work/tvisva-016.jpg",
  ],
  development: [
    "/work/tvisva-030.jpg",
    "/work/chatha-foods-088.jpg",
  ],
  marketing: [
    "/work/ibc-100.jpg",
    "/work/best-western-083.jpg",
    "/work/avenry-058.jpg",
    "/work/tvisva-016.jpg",
    "/work/cafe-zoya-076.jpg",
    "/work/white-wolf-050.jpg",
  ],
  content: [
    "/work/avenry-060.jpg",
    "/work/cafe-zoya-077.jpg",
    "/work/avenry-061.jpg",
    "/work/tvisva-024.jpg",
    "/work/avenry-062.jpg",
    "/work/best-western-084.jpg",
  ],
};
