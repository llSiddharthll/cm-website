/* ============================================================
   AGENCY (TML-style) CONTENT — original copy, Creative Monk brand.
   All figures/quotes are realistic placeholders, not real data.
   ============================================================ */

export const AGENCY_HERO = {
  eyebrow: "Creative & growth studio · since 2017",
  headline: ["Own your", "growth."],
  accentWord: "growth.",
  sub: "We design brands and build the growth engines behind them — strategy, web, content and performance under one roof, engineered to compound into something you own.",
  ctaPrimary: { label: "Book a strategy call", href: "#contact" },
  ctaSecondary: { label: "See our work", href: "#work" },
};

export const STAT_BAR = [
  { value: "100", suffix: "+", label: "Businesses grown" },
  { value: "9", suffix: " yrs", label: "In the game" },
  { value: "20", suffix: "+", label: "In-house specialists" },
  { value: "33", suffix: "+", label: "Google reviews" },
] as const;

export const TIMELINE = [
  { value: "2017", label: "Founded near Chandigarh" },
  { value: "20", suffix: "+", label: "In-house specialists" },
  { value: "10", suffix: "+", label: "Industries served" },
  { value: "7", suffix: " countries", label: "Clients shipped to" },
] as const;

export const AGENCY_STORY = {
  index: "01",
  kicker: "The studio",
  q: "Why does growth marketing feel like renting?",
  a: "Because most agencies optimise the ad account and ignore the asset. We flipped it. Brand, web, content and performance live under one roof here — every rupee of spend builds something that keeps working after the campaign ends.",
  signature: "— The Creative Monk team",
};

/** Platforms & tools (rendered as text wordmarks in a marquee). */
export const TOOLS = [
  "Google Ads",
  "Meta",
  "Shopify",
  "GA4",
  "HubSpot",
  "Klaviyo",
  "Webflow",
  "Figma",
  "Next.js",
  "WordPress",
  "Semrush",
  "Mailchimp",
] as const;

export type GridService = {
  no: string;
  title: string;
  desc: string;
};

export const SERVICES_12: GridService[] = [
  { no: "01", title: "Branding", desc: "Identity systems built to scale across every surface." },
  { no: "02", title: "Web Development", desc: "Fast, accessible, conversion-shaped sites & stores." },
  { no: "03", title: "Graphic Design", desc: "Campaigns, decks and social creative, on-brand." },
  { no: "04", title: "Lead Generation", desc: "Funnels engineered around your unit economics." },
  { no: "05", title: "Social Media", desc: "Always-on content that earns attention." },
  { no: "06", title: "Google Ads", desc: "Search & shopping that buys profit, not clicks." },
  { no: "07", title: "SEO", desc: "Compounding organic visibility, technical to content." },
  { no: "08", title: "Meta Ads", desc: "Paid social creative tuned for the feed." },
  { no: "09", title: "Content", desc: "Words that rank and persuade, in your voice." },
  { no: "10", title: "Video & Motion", desc: "Reels, films and motion built to travel." },
  { no: "11", title: "UI / UX", desc: "Product and site experiences people finish." },
  { no: "12", title: "Analytics & CRO", desc: "Measure, learn, reinvest — month after month." },
];

export type VideoProject = {
  id: string;
  title: string;
  category: string;
};

export const VIDEO_PROJECTS: VideoProject[] = [
  { id: "v1", title: "Tvisva — Brand Film", category: "Jewellery" },
  { id: "v2", title: "The Avenry — Food Reel", category: "F&B" },
  { id: "v3", title: "White Wolf — Product Reel", category: "Grooming" },
  { id: "v4", title: "Best Western Plus — Property Film", category: "Hospitality" },
  { id: "v5", title: "IBC — Launch Campaign", category: "Real Estate" },
  { id: "v6", title: "Trix — Product Reel", category: "Lighting" },
];

export const CERTS = [
  "Global 100 — Best Marketing Firm '26",
  "Google Partner",
  "Meta Business Partner",
] as const;

export type Tier = {
  name: string;
  tag: string;
  price: string;
  cadence: string;
  features: string[];
  featured?: boolean;
};

export const PRICING: Tier[] = [
  {
    name: "Launch",
    tag: "For new brands finding their feet",
    price: "₹60k",
    cadence: "/ month",
    features: [
      "Brand starter kit",
      "Landing page or microsite",
      "2 channels, managed",
      "Monthly reporting",
      "Email support",
    ],
  },
  {
    name: "Growth",
    tag: "For brands ready to scale",
    price: "₹1.4L",
    cadence: "/ month",
    featured: true,
    features: [
      "Everything in Launch",
      "Full website + CMS",
      "4 channels, always-on",
      "Reels & content engine",
      "Bi-weekly strategy calls",
      "Dedicated team lead",
    ],
  },
  {
    name: "Scale",
    tag: "For enterprises & ambitious bets",
    price: "Custom",
    cadence: "tailored",
    features: [
      "Everything in Growth",
      "Brand system + design ops",
      "Performance at scale",
      "Quarterly roadmaps",
      "Priority SLA",
      "Embedded squad",
    ],
  },
];

export type Review = {
  name: string;
  role: string;
  rating: number;
  quote: string;
  service: string;
};

// Real, attributed Google reviews from Creative Monk's Google Business Profile.
export const REVIEWS: Review[] = [
  { name: "Sachin D.", role: "Google review", rating: 5, quote: "A wonderful experience working with Creative Monk — the best digital marketing agency in Zirakpur. The team provided exceptional service.", service: "Digital Marketing" },
  { name: "Kanika S.", role: "Google review", rating: 5, quote: "The go-to team for digital marketing. Their strategies are result-driven and tailored to the business.", service: "Strategy" },
  { name: "Amisha R.", role: "Google review", rating: 5, quote: "I really appreciate how transparent and friendly the team is — no hidden charges, no jargon.", service: "Branding" },
  { name: "Laxman S.", role: "Google review", rating: 5, quote: "If you want real business growth — not just fancy reports — go with Creative Monk.", service: "Growth" },
  { name: "Shivani M.", role: "Google review", rating: 5, quote: "Very reliable and professional people. They improved my website's ranking faster than I expected.", service: "SEO" },
  { name: "Ashpreet K.", role: "Google review", rating: 5, quote: "An exceptional digital agency. The team is highly skilled and dedicated to delivering top-notch results.", service: "Web · Social" },
];

export const REVIEW_SUMMARY = { rating: "4.4", count: "33", platforms: "Google" };

export const FAQS = [
  {
    q: "How is Creative Monk different from a typical agency?",
    a: "Everything is in-house — brand, web, content and performance. Nothing gets lost between hand-offs, and your spend builds an asset instead of renting attention.",
  },
  {
    q: "Do you work on retainer or per project?",
    a: "Both. Most clients start with a defined project, then move to a monthly retainer once the engine is running. Pick whatever fits your stage.",
  },
  {
    q: "How soon will we see results?",
    a: "Paid channels can move in weeks; brand and SEO compound over months. We set honest milestones up front and report against them, not vanity metrics.",
  },
  {
    q: "Which industries do you specialise in?",
    a: "FMCG, D2C & e-commerce, real estate, SaaS, hospitality and local services — but our system travels well across categories.",
  },
  {
    q: "Do you only work with brands in India?",
    a: "No. We're based in Chandigarh but ship work for clients across 27+ countries, working in their time zone when it matters.",
  },
  {
    q: "Who owns the work you produce?",
    a: "You do — outright. Brand files, code, content and ad accounts are yours. That's the whole point of building an asset.",
  },
];

export const BENEFITS = [
  "Team first",
  "Remote-friendly",
  "Learning budget",
  "Pet friendly",
  "Food & snacks",
  "Flexible hours",
  "Health cover",
  "No-ego culture",
] as const;

export const CULTURE_STATS = [
  { value: "20", suffix: "+", label: "In the studio" },
  { value: "100", suffix: "+", label: "Businesses grown" },
] as const;

export const RATINGS = [
  { source: "Google", value: "4.4" },
] as const;

/** Footer location — real HQ (Zirakpur / Tricity) + reach. */
export const LOCATIONS = {
  india: ["Zirakpur, Punjab", "Chandigarh", "Mohali"],
  global: ["Clients across 7 countries"],
};

export const FOOTER_LINKS: Record<string, { label: string; href: string }[]> = {
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Case Studies", href: "/work" },
    { label: "Contact", href: "/contact" },
  ],
  Services: [
    { label: "Branding", href: "/services" },
    { label: "Web Development", href: "/services" },
    { label: "Performance", href: "/services" },
    { label: "SEO", href: "/services" },
    { label: "Video & Motion", href: "/services" },
  ],
};

/* ---- Team ---- */
export type Member = { name: string; role: string; photo?: string };
export const TEAM: Member[] = [
  { name: "Sahil Sehgal", role: "Founder & Creative Director" },
  { name: "Tanik", role: "Developer" },
  { name: "Siddharth Tiwari", role: "Lead Developer" },
  { name: "Rajwant Singh", role: "Team" },
  { name: "Anku", role: "Team" },
];

/* ---- Values / principles ---- */
export const VALUES = [
  {
    no: "01",
    title: "Own the asset",
    body: "Every rupee of work should build something you keep — a brand, a system, a channel — not attention you rent and lose.",
  },
  {
    no: "02",
    title: "Proof over promises",
    body: "We set honest milestones up front and report against outcomes, not vanity metrics. The numbers do the talking.",
  },
  {
    no: "03",
    title: "One roof, one craft",
    body: "Brand, web, content and performance live in-house, so nothing gets lost between hand-offs and the quality never drops.",
  },
  {
    no: "04",
    title: "Patience, then pace",
    body: "We move like a monk — listen first, then execute relentlessly. Compounding beats sprinting every single time.",
  },
] as const;

/* ---- Industries ---- */
export const INDUSTRIES = [
  { name: "D2C & E-commerce", blurb: "Launch-to-scale brands that live and die by ROAS." },
  { name: "Real Estate", blurb: "Premium projects sold before launch with funnels + film." },
  { name: "FMCG", blurb: "Heritage brands re-lit for the feed and the shelf." },
  { name: "SaaS", blurb: "Demand engines for product-led growth teams." },
  { name: "Hospitality", blurb: "Places people travel for — and post about." },
  { name: "Healthcare", blurb: "Trust-first marketing for clinics and wellness brands." },
] as const;

/* ---- Open roles (careers) ---- */
export type Role = {
  title: string;
  team: string;
  type: string;
  location: string;
  description?: string;
  applyUrl?: string;
};

export type Careers = {
  heroKicker: string;
  heroTitle1: string;
  heroTitle2: string;
  heroLede: string;
  whyEyebrow: string;
  whyLead: string;
  whyMuted: string;
  perksEyebrow: string;
  perksHeading: string;
  rolesEyebrow: string;
  rolesIntro: string;
  ctaLead: string;
  ctaMuted: string;
  ctaBody: string;
  ctaButtonLabel: string;
  ctaButtonHref: string;
};

export const CAREERS: Careers = {
  heroKicker: "Careers",
  heroTitle1: "Build things",
  heroTitle2: "worth owning",
  heroLede:
    "We're a small, in-house team that values craft, ownership and the long game — people who'd rather build an asset than rent attention.",
  whyEyebrow: "Why Creative Monk",
  whyLead: "No hand-offs, no ego, no busywork —",
  whyMuted: "just sharp people shipping work they're proud to sign.",
  perksEyebrow: "Perks",
  perksHeading: "The things that keep good people building.",
  rolesEyebrow: "Open roles",
  rolesIntro:
    "Don't fit one neatly? Apply to the closest — we hire for craft, not checklists.",
  ctaLead: "Don't see your role?",
  ctaMuted: "Pitch us.",
  ctaBody:
    "If you're great at something we'll need, tell us what you'd build here. The best hires rarely come from a job post.",
  ctaButtonLabel: "Get in touch",
  ctaButtonHref: "/contact",
};
export const ROLES: Role[] = [
  { title: "Senior Brand Designer", team: "Design", type: "Full-time", location: "Chandigarh / Remote" },
  { title: "Performance Marketing Manager", team: "Growth", type: "Full-time", location: "Chandigarh" },
  { title: "Frontend Engineer (React/Next.js)", team: "Engineering", type: "Full-time", location: "Remote" },
  { title: "Motion Designer", team: "Video", type: "Full-time", location: "Chandigarh / Remote" },
  { title: "Content Strategist", team: "Content", type: "Full-time", location: "Remote" },
  { title: "Account Lead", team: "Client Services", type: "Full-time", location: "Chandigarh" },
];

/* ---- Blog ---- */
export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  read: string;
  body: string; // rich-text HTML (empty → falls back to the source link)
  source?: string; // original article on thecreativemonk.in
  cover?: string; // featured/hero image (Cloudinary)
};


/* ============================================================
   SERVICE CATEGORIES — the mega-menu + internal /services/[slug] pages.
   Four buckets: Content · Creatives · Marketing · Development.
   ============================================================ */
export type ServiceItem = { slug: string; name: string; desc: string };
export type ServiceCategory = {
  slug: string;
  index: string;
  name: string;
  tagline: string;
  intro: string;
  items: ServiceItem[];
};

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    slug: "content",
    index: "01",
    name: "Content",
    tagline: "Words that rank and persuade",
    intro:
      "Strategy and words that earn attention and hold it — built to rank, read like a human wrote them, and move people to act.",
    items: [
      { slug: "content-strategy", name: "Content Strategy", desc: "A roadmap for what to say, where, and why it converts." },
      { slug: "seo-copywriting", name: "SEO Copywriting", desc: "Pages and posts that rank and still read like a human wrote them." },
      { slug: "blog-articles", name: "Blog & Articles", desc: "Long-form that builds authority and pulls in organic traffic." },
      { slug: "social-content", name: "Social Content", desc: "Captions, carousels and hooks tuned for each platform." },
      { slug: "scriptwriting", name: "Scriptwriting", desc: "Scripts for reels, ads and brand films that hold attention." },
      { slug: "email-newsletters", name: "Email & Newsletters", desc: "Sequences and broadcasts that nurture, and sell." },
    ],
  },
  {
    slug: "creatives",
    index: "02",
    name: "Creatives",
    tagline: "Brand, design & motion",
    intro:
      "Identity, design and motion that make a brand unmistakable — from the logo to the last frame of the reel.",
    items: [
      { slug: "logo-identity", name: "Logo & Identity", desc: "Marks and identity systems that scale across every surface." },
      { slug: "brand-systems", name: "Brand Systems", desc: "Guidelines, tokens and templates that keep everything consistent." },
      { slug: "packaging-print", name: "Packaging & Print", desc: "Packaging, stationery and collateral that feel premium." },
      { slug: "social-creatives", name: "Social Creatives", desc: "Posters, ads and carousels built to stop the scroll." },
      { slug: "video-editing", name: "Video Editing", desc: "Reels, ads and brand films cut for the feed and the boardroom." },
      { slug: "motion-animation", name: "Motion & Animation", desc: "2D motion graphics that explain and delight." },
    ],
  },
  {
    slug: "marketing",
    index: "03",
    name: "Marketing",
    tagline: "Demand that compounds",
    intro:
      "Full-funnel growth engineered around your unit economics — not vanity metrics. Demand that builds on itself, month after month.",
    items: [
      { slug: "seo", name: "SEO", desc: "Technical, on-page and content SEO that compounds over time." },
      { slug: "google-ads", name: "Google Ads / PPC", desc: "Search and shopping campaigns that buy profit, not clicks." },
      { slug: "meta-ads", name: "Meta Ads", desc: "Paid-social creative and targeting tuned for ROAS." },
      { slug: "social-marketing", name: "Social Media Marketing", desc: "Always-on management that grows a real audience." },
      { slug: "lead-generation", name: "Lead Generation", desc: "Funnels engineered around your unit economics." },
      { slug: "conversion-optimisation", name: "Conversion Optimisation", desc: "Test, learn and lift the numbers that actually matter." },
    ],
  },
  {
    slug: "development",
    index: "04",
    name: "Development",
    tagline: "Sites that convert",
    intro:
      "Fast, accessible, conversion-shaped builds — from landing pages to full e-commerce, engineered for Core Web Vitals and scale.",
    items: [
      { slug: "web-development", name: "Web Development", desc: "Fast, accessible, conversion-shaped websites." },
      { slug: "shopify-ecommerce", name: "Shopify & E-commerce", desc: "Stores that load fast and sell harder." },
      { slug: "wordpress", name: "WordPress", desc: "Flexible, editable sites your team can actually run." },
      { slug: "headless-nextjs", name: "Next.js / Headless", desc: "Modern headless builds for performance and scale." },
      { slug: "landing-pages", name: "Landing Pages", desc: "High-intent pages built to convert paid traffic." },
      { slug: "ui-ux", name: "UI / UX Design", desc: "Product and site experiences people actually finish." },
    ],
  },
];
