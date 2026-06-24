/* ============================================================
   CREATIVE MONK — SITE CONTENT
   Single source of truth. Swap copy / add real reel & work assets
   here; components stay untouched.
   ============================================================ */

export const SITE = {
  name: "Creative Monk",
  tagline: "Helping businesses grow digitally",
  promise: "Growth, with intention.",
  email: "info@thecreativemonk.in",
  phone: "+91 94634 45566",
  phoneHref: "+919463445566",
  whatsapp: "https://wa.me/919463445566",
  address: "Office 11–12, 9th Floor, Sushma Infinium, Zirakpur, Punjab 140603",
  city: "Chandigarh · India",
  founded: 2016,
  socials: [
    { label: "Instagram", handle: "@creativemonkindia", href: "https://instagram.com/creativemonkindia" },
    { label: "Facebook", handle: "@creativemonkindia", href: "https://facebook.com/creativemonkindia" },
    { label: "YouTube", handle: "Creative Monk", href: "https://youtube.com/@creativemonkindia" },
    { label: "WhatsApp", handle: "Chat", href: "https://wa.me/919463445566" },
  ],
} as const;

export const NAV = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const HERO = {
  kicker: "Best Marketing & Advertising Firm — Global 100, 2026",
  // Each line renders as a clipped, staggered reveal.
  headline: ["We build", "brands that", "compound."],
  serifWord: "compound", // word rendered in the serif accent
  lede:
    "A full-service creative & digital growth studio from Chandigarh. We pair the patience of a craftsman with the ambition of a challenger — strategy, design, code and content under one roof.",
  ctaPrimary: { label: "Start a project", href: "#contact" },
  ctaSecondary: { label: "See the work", href: "/work" },
} as const;

export const MARQUEE = [
  "Brand Strategy",
  "Web Design",
  "SEO",
  "Performance Marketing",
  "Social",
  "Motion & Reels",
  "E-commerce",
  "Identity",
] as const;

export type Service = {
  id: string;
  index: string;
  title: string;
  blurb: string;
  capabilities: string[];
  deliverables: string[]; // concrete outputs the client receives
  outcome: { value: string; label: string }; // a representative result
};

export const SERVICES: Service[] = [
  {
    id: "digital-marketing",
    index: "01",
    title: "Digital Marketing",
    blurb:
      "Demand that doesn't sleep. Full-funnel growth engineered around your unit economics — not vanity metrics.",
    capabilities: [
      "SEO & Content",
      "Paid Search / PPC",
      "Social Media",
      "Lead Generation",
      "Conversion Rate Optimisation",
      "Local Business Marketing",
    ],
    deliverables: [
      "Quarterly growth roadmap",
      "Always-on campaign calendar",
      "Monthly performance reporting",
    ],
    outcome: { value: "4.1×", label: "avg. blended ROAS" },
  },
  {
    id: "web",
    index: "02",
    title: "Web Design & Development",
    blurb:
      "Sites that feel inevitable. Fast, accessible, conversion-shaped builds — from landing pages to full e-commerce.",
    capabilities: [
      "Next.js & Headless",
      "Shopify & WooCommerce",
      "WordPress / Laravel",
      "Landing Pages",
      "E-commerce",
      "Core Web Vitals",
    ],
    deliverables: [
      "Design system + UI kit",
      "Production build & CMS",
      "Analytics & A/B setup",
    ],
    outcome: { value: "98", label: "avg. Lighthouse score" },
  },
  {
    id: "design",
    index: "03",
    title: "Graphic & Brand Design",
    blurb:
      "Identity with a backbone. The logo, the system, and everything it touches — built to scale across every surface.",
    capabilities: [
      "Logo & Identity",
      "Brand Systems",
      "Packaging",
      "Social Creative",
      "Stationery",
      "Campaign Design",
    ],
    deliverables: [
      "Logo suite & guidelines",
      "Brand book & tokens",
      "Templates & asset library",
    ],
    outcome: { value: "100%", label: "in-house, no outsourcing" },
  },
  {
    id: "motion",
    index: "04",
    title: "Video & Motion",
    blurb:
      "Stories that scroll-stop. Short-form reels, brand films and motion graphics tuned for the feed and the boardroom.",
    capabilities: [
      "Reels & Shorts",
      "Brand Films",
      "Motion Graphics",
      "Video Editing",
      "2D Animation",
      "Ad Creative",
    ],
    deliverables: [
      "Monthly reel package",
      "Brand film + cutdowns",
      "Motion & ad creative",
    ],
    outcome: { value: "3.4×", label: "avg. engagement lift" },
  },
];

export type Reel = {
  id: string;
  title: string;
  category: string;
  // Drop a real file in /public/reels and set `src`, or wire a Mux playbackId.
  src?: string;
  poster?: string;
  ratio: "9/16" | "1/1" | "16/9";
  accent: string; // gradient seed for the animated placeholder
};

export const REELS: Reel[] = [
  { id: "r1", title: "Tvisva — Festival Edit", category: "Jewellery / Social", ratio: "9/16", accent: "0deg" },
  { id: "r2", title: "The Avenry — Plated", category: "F&B / Reels", ratio: "9/16", accent: "40deg" },
  { id: "r3", title: "White Wolf — Unboxing", category: "Grooming", ratio: "1/1", accent: "20deg" },
  { id: "r4", title: "IBC — Prelaunch", category: "Real Estate", ratio: "9/16", accent: "60deg" },
  { id: "r5", title: "Café Zoya — Daily Brew", category: "Café", ratio: "1/1", accent: "10deg" },
];

export type CaseStudy = {
  id: string;
  client: string;
  title: string;
  category: string[];
  year: string;
  result: string;
  metric: { value: string; label: string };
  accent: string;
  cover?: string;
};

// Real Creative Monk clients (from the Tricity deck). Images in /public/work.
export const CASES: CaseStudy[] = [
  { id: "tvisva", client: "Tvisva Jewels", title: "A jewellery house, dressed for every surface", category: ["Branding", "Social", "Print", "Website"], year: "2025", result: "A complete brand identity and collateral system — social, print, in-store signage, packaging and website.", metric: { value: "20+", label: "brand assets" }, accent: "8deg", cover: "/work/tvisva-014.jpg" },
  { id: "white-wolf", client: "White Wolf", title: "A men's grooming identity with bite", category: ["Branding", "Packaging", "Social", "Logo"], year: "2024", result: "A full identity for a men's grooming brand — logo system, palette, social templates and a packaging line.", metric: { value: "Identity", label: "+ packaging line" }, accent: "44deg", cover: "/work/white-wolf-049.jpg" },
  { id: "avenry", client: "The Avenry", title: "Café, kitchen & bar — one identity", category: ["Branding", "Social", "Menu", "Print"], year: "2025", result: "A script-led identity with social, story creatives and a full suite of printed menus.", metric: { value: "3 menus", label: "+ brand & social" }, accent: "24deg", cover: "/work/avenry-059.jpg" },
  { id: "cafe-zoya", client: "Café Zoya", title: "A café brand with a friendly bite", category: ["Branding", "Social", "Menu", "Packaging"], year: "2024", result: "Brand identity, logo system, social content and printed menu and packaging.", metric: { value: "Brand", label: "+ menu & packaging" }, accent: "16deg", cover: "/work/cafe-zoya-076.jpg" },
  { id: "best-western", client: "Best Western Plus Mohali", title: "Hospitality, always-on and on-brand", category: ["Social", "Branding", "Hospitality"], year: "2025", result: "Always-on social content and print-ready branding collateral for the hotel.", metric: { value: "Always-on", label: "social + collateral" }, accent: "58deg", cover: "/work/best-western-083.jpg" },
  { id: "chatha-foods", client: "Chatha Foods", title: "A frozen-food brand, served responsive", category: ["Website", "Web Design", "Branding"], year: "2025", result: "Website design and ongoing management, shown across desktop, tablet and mobile.", metric: { value: "Website", label: "design + management" }, accent: "36deg", cover: "/work/chatha-foods-088.jpg" },
  { id: "ibc", client: "IBC — Indian Business Centre", title: "Selling real estate before launch", category: ["Real Estate", "Advertising", "Social"], year: "2025", result: "A four-piece vertical ad campaign for a commercial real-estate prelaunch.", metric: { value: "Campaign", label: "prelaunch ad set" }, accent: "0deg", cover: "/work/ibc-100.jpg" },
  { id: "trix", client: "Trix", title: "A lighting brand, boxed and broadcast", category: ["Branding", "Packaging", "Social", "Product"], year: "2024", result: "Brand identity, a multi-SKU packaging system and an Instagram social grid.", metric: { value: "4 SKUs", label: "packaging system" }, accent: "20deg", cover: "/work/trix-102.jpg" },
];

export const STATS = [
  { value: 480, suffix: "+", label: "Projects shipped" },
  { value: 9, suffix: "yrs", label: "Crafting growth" },
  { value: 27, suffix: "+", label: "Industries served" },
  { value: 96, suffix: "%", label: "Retained clients" },
] as const;

export const PROCESS = [
  {
    step: "01",
    title: "Listen",
    body: "We start where a monk starts — with attention. Deep discovery into your market, margins and the job your customer is hiring you for.",
  },
  {
    step: "02",
    title: "Shape",
    body: "Strategy becomes a system: positioning, identity, message and the channels that will carry them. Decisions, not decoration.",
  },
  {
    step: "03",
    title: "Make",
    body: "Design, code, content and campaigns produced in-house — so the craft stays consistent from the first pixel to the last post.",
  },
  {
    step: "04",
    title: "Compound",
    body: "We measure, learn and reinvest. Growth that builds on itself, month after month, instead of resetting every quarter.",
  },
] as const;

export const AWARDS = [
  { title: "Best Marketing & Advertising Firm of the Year", org: "Global 100 Awards", year: "2026" },
  { title: "Top Digital Marketing Agency — India", org: "Industry Recognition", year: "2025" },
  { title: "Excellence in Brand Design", org: "Creative Index", year: "2024" },
  { title: "Performance Marketing — Finalist", org: "Growth Summit", year: "2024" },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "They didn't just make us look good — they made us make sense. The strategy was sharp and the execution was relentless.",
    name: "Rhea Malhotra",
    role: "Founder, Aether Skincare",
  },
  {
    quote:
      "The only agency we've worked with that treats our P&L like their own. Calm people, loud results.",
    name: "Arjun Sethi",
    role: "Director, Meridian Realty",
  },
  {
    quote:
      "Our reels finally feel like us. Reach tripled and it still feels effortless on their side.",
    name: "Karan Bedi",
    role: "CMO, Sunburst Foods",
  },
] as const;
