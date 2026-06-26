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

  /* ── lighter cases (remaining deck clients) ── */
  { id: "veloire", client: "Veloire", title: "A beauty label, branded to glow", category: ["Branding", "Social", "Logo"], year: "2024", result: "Logo, identity and social content for a beauty & fashion label.", metric: { value: "Identity", label: "+ social" }, accent: "12deg", cover: "/work/veloire-040.jpg" },
  { id: "inaysha", client: "Inaysha", title: "A fashion brand, on feed and in print", category: ["Branding", "Social", "Print"], year: "2024", result: "Identity, social content and print & newspaper ads for a fashion brand.", metric: { value: "Brand", label: "+ print ads" }, accent: "30deg", cover: "/work/inaysha-044.jpg" },
  { id: "fabie", client: "Fabie — The Beauty Salon", title: "A salon brand, booked online", category: ["Website", "Social", "Branding"], year: "2024", result: "Website management and social content for a beauty salon.", metric: { value: "Website", label: "+ social" }, accent: "48deg", cover: "/work/fabie-054.jpg" },
  { id: "al-palm", client: "Al Palm", title: "A restaurant, menu to table tent", category: ["Menu", "Print", "Branding"], year: "2024", result: "Menu design and dine-in print collateral for a restaurant.", metric: { value: "Menus", label: "+ table collateral" }, accent: "22deg", cover: "/work/al-palm-064.jpg" },
  { id: "binnys-kitchen", client: "Binny's Kitchen", title: "A kitchen with an appetite for feed", category: ["Social", "Menu", "Branding"], year: "2024", result: "Social content, menu design and table collateral for a restaurant.", metric: { value: "Social", label: "+ menus" }, accent: "6deg", cover: "/work/binnys-kitchen-071.jpg" },
  { id: "zafraan", client: "Zafraan", title: "A restaurant, plated for social", category: ["Social", "Menu", "Branding"], year: "2024", result: "Brand, social content and menu design for a restaurant.", metric: { value: "Brand", label: "+ social & menu" }, accent: "40deg", cover: "/work/zafraan-080.jpg" },
  { id: "skyeline", client: "Skyeline", title: "An F&B brand, always on feed", category: ["Social", "F&B"], year: "2024", result: "Always-on social media content for a food & beverage brand.", metric: { value: "Social", label: "content" }, accent: "16deg", cover: "/work/skyeline-086.jpg" },
  { id: "ascure", client: "Ascure", title: "Real estate, sold on social", category: ["Real Estate", "Social"], year: "2025", result: "Social media content for a real-estate brand.", metric: { value: "Social", label: "content" }, accent: "52deg", cover: "/work/ascure-091.jpg" },
  { id: "cp67-offices", client: "CP.67 Offices", title: "An office address, built for the feed", category: ["Real Estate", "Social"], year: "2025", result: "A social-media campaign for a commercial real-estate project.", metric: { value: "Campaign", label: "social" }, accent: "28deg", cover: "/work/cp67-offices-094.jpg" },
  { id: "felicity-adobe", client: "Felicity Adobe", title: "A property brand, online and on feed", category: ["Website", "Real Estate", "Social"], year: "2025", result: "Website management and social content for a real-estate brand.", metric: { value: "Website", label: "+ social" }, accent: "34deg", cover: "/work/felicity-adobe-096.jpg" },
  { id: "felix-plaza", client: "Felix Plaza", title: "From plot to landmark, on social", category: ["Real Estate", "Social"], year: "2025", result: "Social media content for a real-estate project.", metric: { value: "Social", label: "content" }, accent: "10deg", cover: "/work/felix-plaza-098.jpg" },
  { id: "export-house", client: "Export House", title: "A handloom store, dressed for retail", category: ["Website", "Retail", "Print"], year: "2024", result: "Website and in-mall retail collateral — standees, danglers and banners.", metric: { value: "Retail", label: "web + signage" }, accent: "44deg", cover: "/work/export-house-113.jpg" },
  { id: "cii-coolex", client: "CII Coolex", title: "An exhibition brand, on every channel", category: ["Events", "Social", "PR"], year: "2024", result: "Social content, a news article and exhibition standees for an event.", metric: { value: "Event", label: "social + PR" }, accent: "58deg", cover: "/work/cii-coolex-115.jpg" },
  { id: "yukti-herbs", client: "Yukti Herbs", title: "An ayurveda brand, boxed with care", category: ["Packaging", "Branding"], year: "2024", result: "Brand identity and product packaging for an ayurvedic wellness brand.", metric: { value: "Packaging", label: "+ identity" }, accent: "18deg", cover: "/work/yukti-herbs-121.jpg" },
  { id: "ayutrust-ayurveda", client: "Ayutrust Ayurveda", title: "Ayurvedic care, on feed", category: ["Healthcare", "Social"], year: "2025", result: "Social media content for an ayurvedic healthcare brand.", metric: { value: "Social", label: "content" }, accent: "36deg", cover: "/work/ayutrust-ayurveda-123.jpg" },
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

  /* ── lighter case galleries ── */
  { case: "veloire", kind: "gallery", discipline: "Brand · Social", title: "Selected work", intro: "Logo and identity for a beauty & fashion label, extended into a social-media content system and a lucky-draw coupon.", images: [g("/work/veloire-040.jpg", "Logo & identity"), g("/work/veloire-041.jpg", "Social media grid"), g("/work/veloire-042.jpg", "Lucky-draw coupon")] },
  { case: "inaysha", kind: "gallery", discipline: "Brand · Print", title: "Selected work", intro: "Brand identity for a fashion label, carried across social media, pamphlets and newspaper advertising.", images: [g("/work/inaysha-044.jpg", "Brand identity"), g("/work/inaysha-045.jpg", "Social media"), g("/work/inaysha-047.jpg", "Newspaper ads")] },
  { case: "fabie", kind: "gallery", discipline: "Web · Social", title: "Selected work", intro: "Website management and an always-on social-media feed for a beauty salon.", images: [g("/work/fabie-054.jpg", "Website management"), g("/work/fabie-053.jpg", "Social media")] },
  { case: "al-palm", kind: "gallery", discipline: "Menu · Print", title: "Selected work", intro: "Menu design and dine-in collateral — food and breakfast menus, an acrylic stand and a QR table tent — for a restaurant.", images: [g("/work/al-palm-064.jpg", "Menu design"), g("/work/al-palm-065.jpg", "Breakfast menu"), g("/work/al-palm-067.jpg", "Table tent & QR")] },
  { case: "binnys-kitchen", kind: "gallery", discipline: "Social · Menu", title: "Selected work", intro: "Social-media content, menu design and a buffet table tent for a restaurant kitchen.", images: [g("/work/binnys-kitchen-071.jpg", "Food menu"), g("/work/binnys-kitchen-070.jpg", "Social media grid"), g("/work/binnys-kitchen-073.jpg", "Buffet table tent")] },
  { case: "zafraan", kind: "gallery", discipline: "Brand · Menu", title: "Selected work", intro: "Brand board, social-media content, menu design and a feedback form for a restaurant.", images: [g("/work/zafraan-080.jpg", "Menu design"), g("/work/zafraan-079.jpg", "Brand board & social"), g("/work/zafraan-081.jpg", "Feedback form")] },
  { case: "cp67-offices", kind: "gallery", discipline: "Social", title: "Selected work", intro: "A social-media campaign for a commercial real-estate project — office spaces, the ecosystem and an Instagram feed.", images: [g("/work/cp67-offices-094.jpg", "Instagram feed"), g("/work/cp67-offices-093.jpg", "Social campaign")] },
  { case: "felicity-adobe", kind: "gallery", discipline: "Web · Social", title: "Selected work", intro: "Multi-device website management and social-media content for a real-estate brand.", images: [g("/work/felicity-adobe-096.jpg", "Website"), g("/work/felicity-adobe-097.jpg", "Social media")] },
  { case: "export-house", kind: "gallery", discipline: "Retail · Web", title: "Selected work", intro: "Website management and in-mall retail collateral — a roll-up mall banner, a website, standees and hanging danglers — for a handloom store.", images: [g("/work/export-house-113.jpg", "Mall banner"), g("/work/export-house-110.jpg", "Website"), g("/work/export-house-111.jpg", "Standee")] },
  { case: "cii-coolex", kind: "gallery", discipline: "Social · PR", title: "Selected work", intro: "Social-media content, a published news article and exhibition standees for an events & exhibition brand.", images: [g("/work/cii-coolex-115.jpg", "Social media"), g("/work/cii-coolex-116.jpg", "News article"), g("/work/cii-coolex-117.jpg", "Standee")] },
  { case: "yukti-herbs", kind: "gallery", discipline: "Packaging", title: "Selected work", intro: "Brand identity and product packaging for an ayurvedic wellness brand.", images: [g("/work/yukti-herbs-121.jpg", "Packaging"), g("/work/yukti-herbs-120.jpg", "Brand identity")] },
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

/* Real client logos (white-on-dark, rendered via mix-blend-screen on the wall),
   keyed by the client NAME as stored in the `clients` collection. */
export const CLIENT_LOGOS: Record<string, string> = {
  "White Wolf": "/work/logos/white-wolf.png",
  "Café Zoya": "/work/logos/cafe-zoya.png",
  "Avenry": "/work/logos/avenry.png",
  "Yukti Herbs": "/work/logos/yukti-herbs.png",
  "Veloire": "/work/logos/veloire.png",
};

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
