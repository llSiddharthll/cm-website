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
  { id: "r1", title: "Sunburst — Launch Film", category: "Brand Film", ratio: "9/16", accent: "0deg" },
  { id: "r2", title: "Aether — Product Reel", category: "Social / Reels", ratio: "9/16", accent: "40deg" },
  { id: "r3", title: "Kettle & Co.", category: "E-commerce", ratio: "1/1", accent: "20deg" },
  { id: "r4", title: "Meridian Realty", category: "Campaign", ratio: "9/16", accent: "60deg" },
  { id: "r5", title: "Pulse Fitness", category: "Motion", ratio: "1/1", accent: "10deg" },
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
};

export const CASES: CaseStudy[] = [
  {
    id: "sunburst",
    client: "Sunburst Foods",
    title: "A heritage FMCG brand, re-lit for the feed",
    category: ["Brand", "Social", "Motion"],
    year: "2025",
    result: "Rebuilt identity + always-on social engine.",
    metric: { value: "3.4×", label: "engagement lift" },
    accent: "8deg",
  },
  {
    id: "aether",
    client: "Aether Skincare",
    title: "D2C launch from zero to shelf-fame",
    category: ["E-commerce", "Performance", "Web"],
    year: "2025",
    result: "Shopify build + paid acquisition, profitable in 90 days.",
    metric: { value: "4.1", label: "blended ROAS" },
    accent: "44deg",
  },
  {
    id: "meridian",
    client: "Meridian Realty",
    title: "Premium real-estate, sold before launch",
    category: ["Web", "Lead Gen", "SEO"],
    year: "2024",
    result: "Microsite + lead funnel for a flagship project.",
    metric: { value: "1,200+", label: "qualified leads" },
    accent: "24deg",
  },
  {
    id: "kettle",
    client: "Kettle & Co.",
    title: "Specialty coffee with a cult following",
    category: ["Brand", "E-commerce", "Reels"],
    year: "2024",
    result: "Identity, packaging and a reel series that travels.",
    metric: { value: "+212%", label: "organic reach" },
    accent: "16deg",
  },
  {
    id: "pulse",
    client: "Pulse Fitness",
    title: "Local gyms, national-grade presence",
    category: ["Local SEO", "Social", "Motion"],
    year: "2024",
    result: "Local marketing system across 6 locations.",
    metric: { value: "#1", label: "map rank, 6 cities" },
    accent: "58deg",
  },
  {
    id: "northwind",
    client: "Northwind Travel",
    title: "Wanderlust, engineered into bookings",
    category: ["Web", "Content", "PPC"],
    year: "2023",
    result: "Content engine + performance for a travel brand.",
    metric: { value: "62%", label: "lower cost / lead" },
    accent: "36deg",
  },
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
