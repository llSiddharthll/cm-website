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
  { no: "13", title: "AI & Automation", desc: "Assistants, generative content and automations wired into your funnel." },
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
    { label: "Creatives", href: "/services/creatives" },
    { label: "Development", href: "/services/development" },
    { label: "Marketing", href: "/services/marketing" },
    { label: "Content", href: "/services/content" },
    { label: "AI", href: "/services/ai" },
  ],
  Industries: [
    { label: "Real Estate", href: "/industries/real-estate" },
    { label: "D2C & E-commerce", href: "/industries/d2c-ecommerce" },
    { label: "Hospitality", href: "/industries/hospitality" },
    { label: "FMCG", href: "/industries/fmcg" },
    { label: "Healthcare", href: "/industries/healthcare" },
    { label: "SaaS", href: "/industries/saas" },
  ],
  Locations: [
    { label: "Chandigarh", href: "/locations/chandigarh" },
    { label: "Mohali", href: "/locations/mohali" },
    { label: "Panchkula", href: "/locations/panchkula" },
    { label: "Zirakpur", href: "/locations/zirakpur" },
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

/* ---- Careers ---- */
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
  ctaLead: string;
  ctaMuted: string;
  ctaBody: string;
  ctaButtonLabel: string;
  ctaButtonHref: string;
  /** Embedded application form (external ATS, Google Form, Typeform…).
      `applyEmbedUrl` renders a sandboxed iframe; `applyEmbedCode` accepts a raw
      <iframe>/script snippet. Either one replaces the built-in form. */
  applyEmbedUrl?: string;
  applyEmbedCode?: string;
  /** Iframe height in px when using applyEmbedUrl (default 1100). */
  applyEmbedHeight?: number;
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
  ctaLead: "Think you belong here?",
  ctaMuted: "Pitch us.",
  ctaBody:
    "If you're great at something we'll need, tell us what you'd build here. The best hires rarely come from a job post.",
  ctaButtonLabel: "Get in touch",
  ctaButtonHref: "/contact",
};

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
  {
    slug: "ai",
    index: "05",
    name: "AI",
    tagline: "Intelligence, put to work",
    intro:
      "AI without the hype. We build the assistants, automations and AI-ready content that actually move your numbers — wired into the brand, site and funnel you already have.",
    items: [
      { slug: "ai-strategy", name: "AI Strategy & Consulting", desc: "Find where AI actually moves your numbers — and a roadmap to get there." },
      { slug: "generative-content", name: "Generative Content & Creative", desc: "On-brand copy, images and video produced at a pace humans can't match." },
      { slug: "ai-chatbots", name: "AI Chatbots & Assistants", desc: "Custom assistants that answer, qualify and convert around the clock." },
      { slug: "ai-automation", name: "AI Automation & Workflows", desc: "Wire the busywork to AI — replies, routing and reporting on autopilot." },
      { slug: "ai-search-aeo", name: "AI Search Optimisation (AEO)", desc: "Get cited by ChatGPT, Perplexity and Google's AI answers, not just ranked." },
      { slug: "custom-ai-solutions", name: "Custom AI Solutions", desc: "RAG assistants, integrations and AI features built into your product." },
    ],
  },
];

/* ============================================================
   INDUSTRY PAGES — vertical-specific landing pages.
   /industries and /industries/[slug]
   ============================================================ */
export type LinkRef = { label: string; href: string };

export type IndustryPage = {
  slug: string;
  index: string;
  name: string;
  /** short line under the hero eyebrow / footer blurb */
  tagline: string;
  /** hero lede */
  intro: string;
  /** long-form overview paragraphs */
  overview: string[];
  /** what the vertical is up against */
  challenges: { title: string; desc: string }[];
  /** how Creative Monk wins it */
  approach: { title: string; desc: string }[];
  /** the disciplines that matter most here → link to /services */
  services: LinkRef[];
  metric?: { value: string; label: string };
  faqs?: { q: string; a: string }[];
};

export const INDUSTRY_PAGES: IndustryPage[] = [
  {
    slug: "real-estate",
    index: "01",
    name: "Real Estate",
    tagline: "Premium projects, sold before launch.",
    intro:
      "We help developers and channel partners fill inventory faster — with brand, film and paid funnels that turn a plot of land into a project people want in on.",
    overview: [
      "Real estate is sold on trust and aspiration, long before a single flat is booked. We build the brand world around a project — name, identity, walkthrough film, microsite — and then wire a lead engine underneath it that qualifies buyers instead of just collecting numbers.",
      "From pre-launch teasers to possession-day content, we run the whole campaign as one system: creative that makes the project feel inevitable, and performance marketing tuned to cost-per-qualified-site-visit — the only metric a sales team actually cares about.",
    ],
    challenges: [
      { title: "Long, high-ticket decisions", desc: "Buyers take months and compare hard. Weak follow-up and generic creative lose the deal to the next hoarding." },
      { title: "Lead quality over volume", desc: "Cheap leads flood the CRM and burn the sales team. The real cost is per qualified site visit, not per form fill." },
      { title: "Undifferentiated projects", desc: "Every brochure looks the same — glass towers and stock families. Nothing tells the buyer why this address." },
    ],
    approach: [
      { title: "A project brand, not a brochure", desc: "Name, identity, walkthrough film and a microsite that make the project feel premium and specific." },
      { title: "Funnels tuned to site visits", desc: "Meta and Google campaigns optimised down-funnel — qualified enquiries and booked visits, with creative to match each stage." },
      { title: "Content that carries momentum", desc: "Construction updates, RERA-safe reels and testimonials that keep the project alive across the whole sales cycle." },
    ],
    services: [
      { label: "Brand & Identity", href: "/services/creatives" },
      { label: "Websites & Microsites", href: "/services/development" },
      { label: "Performance Marketing", href: "/services/marketing" },
      { label: "Video & Motion", href: "/services/creatives/video-editing" },
    ],
    metric: { value: "Pre-sold", label: "projects launched with full funnels" },
    faqs: [
      { q: "Do you work with developers or channel partners?", a: "Both. We run project-brand campaigns for developers and lead-gen funnels for channel partners and broking teams — the creative and targeting differ, but the discipline is the same." },
      { q: "Can you handle RERA-compliant creative?", a: "Yes. We keep claims, disclaimers and pricing language within RERA norms while still making the work feel premium." },
      { q: "How do you measure success?", a: "Cost per qualified site visit and booking, not raw lead count. We report against sales-relevant milestones from day one." },
    ],
  },
  {
    slug: "d2c-ecommerce",
    index: "02",
    name: "D2C & E-commerce",
    tagline: "Launch-to-scale brands that live on ROAS.",
    intro:
      "From first product to profitable scale — brand, store and performance built as one machine, so every rupee of ad spend compounds into an asset you own.",
    overview: [
      "A D2C brand wins on two things: a store that converts and a media engine that stays profitable as it scales. We build both — a fast Shopify or headless storefront wired for conversion, and a creative-led paid engine that keeps CAC honest.",
      "We treat the whole funnel as one system: thumb-stopping ad creative, landing experiences that carry the promise through to checkout, and retention flows that turn a first order into a lifetime. The brand isn't decoration — it's the reason people pay full price and come back.",
    ],
    challenges: [
      { title: "Rising CAC", desc: "Ad costs climb every quarter. Without fresh creative and tight funnels, unit economics quietly break." },
      { title: "Conversion leaks", desc: "Slow stores, weak PDPs and clunky checkout bleed the traffic you paid for right before the sale." },
      { title: "One-and-done buyers", desc: "No retention system means every sale starts from zero — and the LTV never catches up to the CAC." },
    ],
    approach: [
      { title: "A store engineered to convert", desc: "Fast Shopify or headless builds with PDPs, bundles and checkout tuned for AOV and Core Web Vitals." },
      { title: "Creative-led paid growth", desc: "A steady stream of test-ready ad creative across Meta and Google, managed to profit — not vanity ROAS." },
      { title: "Retention that compounds", desc: "Email and WhatsApp flows that turn first orders into repeat revenue and push LTV past CAC." },
    ],
    services: [
      { label: "Shopify & E-commerce", href: "/services/development/shopify-ecommerce" },
      { label: "Meta & Google Ads", href: "/services/marketing" },
      { label: "Social Creatives", href: "/services/creatives/social-creatives" },
      { label: "Email & Retention", href: "/services/content/email-newsletters" },
    ],
    metric: { value: "ROAS-first", label: "growth managed to profit" },
    faqs: [
      { q: "Do you build on Shopify only?", a: "Shopify is our default for speed and reliability, but we also build headless Next.js storefronts when a brand needs a fully custom experience." },
      { q: "Can you take over an existing store and ad account?", a: "Yes. We audit what's there, fix the conversion and tracking leaks first, then scale spend once the funnel holds." },
      { q: "What's a realistic starting point?", a: "Most brands start with a store/CRO sprint plus a creative-and-paid engagement, then layer in retention as volume grows." },
    ],
  },
  {
    slug: "hospitality",
    index: "03",
    name: "Hospitality",
    tagline: "Places people travel for — and post about.",
    intro:
      "Restaurants, cafés and hotels live and die by how they look on a feed and read on a map. We make yours the one people save, share and book.",
    overview: [
      "Hospitality is a visual, local business. The buying decision happens on Instagram, Google Maps and a friend's story — long before anyone walks in. We build a brand and content system that makes the place feel worth the trip, then make sure it's the first result when someone nearby is hungry or booking a stay.",
      "We've done this for cafés, restaurants and hotels across the Tricity — identity, menu and interior-led photography direction, always-on social, and local SEO that owns the 'near me' moment. The goal is simple: more covers, more bookings, more regulars.",
    ],
    challenges: [
      { title: "The decision happens online", desc: "Feed, Maps and reviews decide the visit. A weak grid or thin profile loses the table to the place next door." },
      { title: "Seasonality and footfall swings", desc: "Slow days and off-seasons need always-on demand, not one-off bursts of posting." },
      { title: "Local discovery is everything", desc: "If you don't own 'restaurants near me' and the map pack, you're invisible at the exact moment of intent." },
    ],
    approach: [
      { title: "A brand you'd travel for", desc: "Identity, menus, signage and content direction that make the place feel like a destination, not a default." },
      { title: "Always-on social that fills tables", desc: "Reels, stories and campaigns tuned to the local audience and the seasons — built to be saved and shared." },
      { title: "Local SEO that owns 'near me'", desc: "Google Business Profile, reviews and location pages that put you top of the map when it counts." },
    ],
    services: [
      { label: "Brand & Identity", href: "/services/creatives" },
      { label: "Social Media Marketing", href: "/services/marketing/social-marketing" },
      { label: "Reels & Motion", href: "/services/creatives/video-editing" },
      { label: "Local SEO", href: "/services/marketing/seo" },
    ],
    metric: { value: "Tricity", label: "cafés, restaurants & hotels served" },
    faqs: [
      { q: "Do you shoot the food and interiors?", a: "We art-direct and manage shoots with trusted partners, then build the content system around the footage so it lasts months, not one post." },
      { q: "Can you manage our Instagram end-to-end?", a: "Yes — strategy, creative, captions, posting and community management, with reporting tied to reach, saves and footfall." },
      { q: "We're a single outlet. Is that too small?", a: "Not at all. Single outlets are where local SEO and a sharp feed move the needle fastest." },
    ],
  },
  {
    slug: "fmcg",
    index: "04",
    name: "FMCG",
    tagline: "Heritage brands, re-lit for the feed and the shelf.",
    intro:
      "Legacy and new-age FMCG brands trust us to modernise the identity, win the shelf and build a direct line to the customer — without losing what made them loved.",
    overview: [
      "FMCG lives in two places at once: the retail shelf and the phone screen. We refresh the brand so it stands out in both — packaging that earns the pick-up, and a content and commerce layer that builds demand before the customer ever reaches the aisle.",
      "For heritage brands, the job is evolution, not erasure — keep the equity, lose the dated. For challengers, it's velocity — a distinctive brand and a D2C channel that proves demand fast. Either way, we connect brand, packaging and performance into one growth story.",
    ],
    challenges: [
      { title: "Winning a crowded shelf", desc: "Dozens of near-identical products. If the pack doesn't earn the pick-up in two seconds, the sale is lost." },
      { title: "Dated brand equity", desc: "Loved but tired brands risk alienating a new generation — or losing their base if the refresh goes too far." },
      { title: "No direct customer line", desc: "Selling only through distribution means zero data and zero relationship with the people who buy you." },
    ],
    approach: [
      { title: "Packaging that earns the pick-up", desc: "Structure, hierarchy and design that stand out on shelf and read instantly in a thumbnail." },
      { title: "A respectful, modern refresh", desc: "Evolve the identity so it feels current without throwing away decades of equity." },
      { title: "A direct-to-consumer channel", desc: "A D2C store and content engine that build demand, capture data and prove the brand beyond distribution." },
    ],
    services: [
      { label: "Brand Systems", href: "/services/creatives/brand-systems" },
      { label: "Packaging & Print", href: "/services/creatives/packaging-print" },
      { label: "Social & Content", href: "/services/content/social-content" },
      { label: "E-commerce", href: "/services/development/shopify-ecommerce" },
    ],
    metric: { value: "Shelf-to-feed", label: "brand systems built end-to-end" },
    faqs: [
      { q: "Can you handle packaging across a large SKU range?", a: "Yes. We build a scalable packaging system with clear rules so new SKUs stay on-brand and ship fast." },
      { q: "We're a heritage brand nervous about change. How do you approach a refresh?", a: "Carefully. We audit the equity first, keep what's loved, and evolve only what's holding the brand back — always with your team in the loop." },
      { q: "Do you set up the D2C side too?", a: "We build the store, content and paid engine so you own a direct relationship and first-party data, not just distribution." },
    ],
  },
  {
    slug: "healthcare",
    index: "05",
    name: "Healthcare & Wellness",
    tagline: "Trust-first marketing for clinics and wellness brands.",
    intro:
      "Clinics, hospitals and wellness brands come to us to build credibility and a steady flow of the right patients — with marketing that's ethical, clear and quietly persuasive.",
    overview: [
      "Healthcare marketing is a trust business. Patients research, compare and hesitate — so the brand has to feel credible, the website has to answer real questions, and the content has to educate before it ever sells. We build all three, within the guardrails the category demands.",
      "From Ayurveda and wellness brands to specialist clinics, we create identities that reassure, sites that convert enquiries into appointments, and local SEO and content that make you the obvious, trustworthy choice — no fear-mongering, no over-claiming.",
    ],
    challenges: [
      { title: "Trust is the whole game", desc: "Patients won't book a clinic that looks amateur or over-promises. Credibility has to be visible everywhere." },
      { title: "Sensitive, regulated claims", desc: "Health messaging has to persuade without crossing ethical or compliance lines — a narrow path most agencies fumble." },
      { title: "High-intent, local demand", desc: "Most patients search locally and decide fast. Losing the map pack and reviews means losing the appointment." },
    ],
    approach: [
      { title: "A brand that reassures", desc: "Calm, credible identity and messaging that make patients feel safe choosing you." },
      { title: "Educational content that converts", desc: "Clear answers to real patient questions — building authority and trust before the enquiry." },
      { title: "Ethical local growth", desc: "Local SEO, reviews and appointment-shaped funnels that bring in the right patients, responsibly." },
    ],
    services: [
      { label: "Brand & Identity", href: "/services/creatives" },
      { label: "Websites", href: "/services/development/web-development" },
      { label: "SEO & Content", href: "/services/marketing/seo" },
      { label: "Social Content", href: "/services/content/social-content" },
    ],
    metric: { value: "Ethics-first", label: "clinics & wellness brands grown" },
    faqs: [
      { q: "Do you follow advertising rules for healthcare?", a: "Yes. We keep claims evidence-based and within platform and category guidelines — persuasive, never misleading." },
      { q: "Can you help a single clinic compete locally?", a: "Absolutely. Local SEO, a strong profile and review strategy are where a single clinic gains the most, fastest." },
      { q: "We're a wellness/Ayurveda brand — do you get the space?", a: "We do — we've worked with Ayurveda and wellness brands and know how to balance tradition, credibility and modern demand." },
    ],
  },
  {
    slug: "saas",
    index: "06",
    name: "SaaS & Tech",
    tagline: "Demand engines for product-led teams.",
    intro:
      "We help SaaS and tech companies turn a great product into a growth story — positioning, a site that sells, and content-led demand that compounds.",
    overview: [
      "Great products don't sell themselves — clear positioning and a site that makes the value obvious do. We sharpen the message, rebuild the marketing site around conversion, and stand up a content and SEO engine that brings in qualified pipeline month after month.",
      "For product-led teams, we tune the whole funnel: landing pages for each campaign, activation-shaped onboarding content, and AEO so your product gets cited by AI answers, not just ranked on Google. Marketing that behaves like part of the product, not a bolt-on.",
    ],
    challenges: [
      { title: "Vague positioning", desc: "If a visitor can't tell what you do and why it's better in five seconds, no amount of traffic converts." },
      { title: "A site that explains but doesn't sell", desc: "Feature lists and jargon don't move buyers. The site has to carry outcomes, proof and a clear next step." },
      { title: "Unpredictable pipeline", desc: "Without a content and SEO engine, growth depends on paid alone — and stops the moment budget does." },
    ],
    approach: [
      { title: "Positioning that clicks", desc: "Messaging and a narrative that make the value obvious to the buyer who matters." },
      { title: "A marketing site that converts", desc: "Fast, modern Next.js builds with landing pages tuned for demos, trials and sign-ups." },
      { title: "Compounding demand", desc: "SEO, content and AEO that build a pipeline which grows even when you pause the ads." },
    ],
    services: [
      { label: "Next.js / Headless", href: "/services/development/headless-nextjs" },
      { label: "SEO & AEO", href: "/services/ai/ai-search-aeo" },
      { label: "Content Strategy", href: "/services/content/content-strategy" },
      { label: "Landing Pages", href: "/services/development/landing-pages" },
    ],
    metric: { value: "Product-led", label: "demand engines built" },
    faqs: [
      { q: "Do you work with early-stage startups?", a: "Yes — from pre-launch positioning and a first marketing site to scaling a content engine post-PMF." },
      { q: "What's AEO and why should we care?", a: "Answer Engine Optimisation gets your product cited inside ChatGPT, Perplexity and Google's AI answers — increasingly where buyers start their research." },
      { q: "Can you build the site on our stack?", a: "We default to Next.js for performance, but we'll work within your existing stack or CMS when it makes sense." },
    ],
  },
];

/* ============================================================
   LOCATION PAGES — local-SEO landing pages.
   /locations and /locations/[slug]
   ============================================================ */
export type LocationPage = {
  slug: string;
  index: string;
  city: string;
  /** region line, e.g. "Punjab · Tricity" */
  region: string;
  /** short line for hero meta / footer */
  tagline: string;
  /** hero lede */
  intro: string;
  overview: string[];
  /** headline local stats */
  stats: { value: string; label: string }[];
  /** areas / sectors served nearby */
  areas: string[];
  /** disciplines offered locally → link to /services */
  services: LinkRef[];
  faqs?: { q: string; a: string }[];
};

export const LOCATION_PAGES: LocationPage[] = [
  {
    slug: "chandigarh",
    index: "01",
    city: "Chandigarh",
    region: "The City Beautiful · Tricity",
    tagline: "The full-service studio Chandigarh brands grow with.",
    intro:
      "A creative and digital growth studio in the heart of the Tricity — brand, web, content and performance under one roof, built for Chandigarh businesses that want to own their growth.",
    overview: [
      "Chandigarh is our home ground. From Sector 17 retail to Industrial Area startups and IT Park tech teams, we've helped local brands look sharper and grow faster — without the hand-offs and hidden costs of stringing five vendors together.",
      "Working with a studio in your own city means faster shoots, in-person strategy sessions and a team that understands the local market. Brand, website, social, ads and SEO all live under one roof, wired to compound month after month.",
    ],
    stats: [
      { value: "1", label: "roof — brand, web, content & growth" },
      { value: "7", label: "countries served from Chandigarh" },
      { value: "Local", label: "shoots, strategy & support in person" },
    ],
    areas: [
      "Sector 17 & 22",
      "IT Park / Rajiv Gandhi Chandigarh Technology Park",
      "Industrial Area Phase 1 & 2",
      "Madhya Marg & Sector 35",
      "Manimajra",
    ],
    services: [
      { label: "Branding & Design", href: "/services/creatives" },
      { label: "Web Development", href: "/services/development" },
      { label: "SEO & Marketing", href: "/services/marketing" },
      { label: "Social & Content", href: "/services/content" },
    ],
    faqs: [
      { q: "Where are you based in the Tricity?", a: "Our studio is at Sushma Infinium, Zirakpur — a few minutes from Chandigarh, Mohali and Panchkula, so in-person meetings are easy across the Tricity." },
      { q: "Do you only work with Chandigarh businesses?", a: "No — we serve clients across seven countries. But being local means Chandigarh brands get faster shoots, in-person strategy and a team that knows the market." },
      { q: "Can you do everything in-house?", a: "Yes. Brand, website, content, social, ads and SEO all live under one roof — no chasing five different vendors." },
    ],
  },
  {
    slug: "mohali",
    index: "02",
    city: "Mohali",
    region: "SAS Nagar · Tricity",
    tagline: "Growth partner for Mohali's businesses and startups.",
    intro:
      "From IT and real estate to hospitality and D2C, Mohali brands work with us for creative and performance marketing that's built to compound — right next door.",
    overview: [
      "Mohali has become the Tricity's growth engine — IT companies, real-estate projects, hospitals and new-age brands all scaling fast. We help them stand out and sell, with brand, website and paid marketing run as one system rather than disconnected pieces.",
      "Being minutes away means we can move quickly: on-site shoots, in-person strategy and a team that treats your growth like a neighbour would. Everything from identity to lead-gen funnels, under one roof.",
    ],
    stats: [
      { value: "1", label: "roof — brand, web, content & growth" },
      { value: "Minutes", label: "away for shoots & strategy" },
      { value: "Tricity", label: "clients across every sector" },
    ],
    areas: [
      "Phase 8 & Industrial Area",
      "Aerocity & IT City",
      "Sector 82 / Quark City",
      "Kharar & New Chandigarh",
      "Airport Road corridor",
    ],
    services: [
      { label: "Branding & Design", href: "/services/creatives" },
      { label: "Web & E-commerce", href: "/services/development" },
      { label: "Performance Marketing", href: "/services/marketing" },
      { label: "Content & Social", href: "/services/content" },
    ],
    faqs: [
      { q: "How close are you to Mohali?", a: "Our Zirakpur studio is a short drive from every Mohali sector, so in-person meetings and shoots are simple to arrange." },
      { q: "Do you work with Mohali IT and real-estate firms?", a: "Yes — from IT City tech teams to real-estate projects around Aerocity and New Chandigarh, we run brand and demand campaigns across sectors." },
      { q: "Can you handle both creative and ads?", a: "That's the point of one roof — identity, website, content and paid marketing are all built and managed together." },
    ],
  },
  {
    slug: "panchkula",
    index: "03",
    city: "Panchkula",
    region: "Haryana · Tricity",
    tagline: "Creative and marketing muscle for Panchkula brands.",
    intro:
      "Retailers, clinics, restaurants and manufacturers in Panchkula trust us to build a sharper brand and a steady flow of local customers.",
    overview: [
      "Panchkula blends established retail and industry with a fast-growing residential and wellness scene. We help local businesses win their neighbourhood — with a brand that stands out, a website that converts, and local SEO that owns the 'near me' searches that matter.",
      "As a Tricity studio, we're close enough to work hands-on: shoots, meetings and quick turnarounds, plus the full stack of brand, web and performance marketing under one roof.",
    ],
    stats: [
      { value: "1", label: "roof — brand, web, content & growth" },
      { value: "Local", label: "SEO tuned to 'near me' intent" },
      { value: "Tricity", label: "team, in person when it counts" },
    ],
    areas: [
      "Sectors 5, 8 & 9",
      "Industrial Area Phase 1 & 2",
      "MDC / Mansa Devi Complex",
      "Pinjore & Kalka belt",
      "Zirakpur–Panchkula corridor",
    ],
    services: [
      { label: "Branding & Design", href: "/services/creatives" },
      { label: "Websites", href: "/services/development" },
      { label: "Local SEO", href: "/services/marketing/seo" },
      { label: "Social & Content", href: "/services/content" },
    ],
    faqs: [
      { q: "Do you help Panchkula shops and clinics get found locally?", a: "Yes — local SEO, Google Business Profile and review strategy are core to what we do for neighbourhood businesses." },
      { q: "Are you far from Panchkula?", a: "No — our Zirakpur studio sits right on the corridor between Zirakpur and Panchkula, so we're easy to reach." },
      { q: "Can you run everything for a small business?", a: "Yes. We scale the engagement to fit — from a brand-and-website sprint to always-on social and ads." },
    ],
  },
  {
    slug: "zirakpur",
    index: "04",
    city: "Zirakpur",
    region: "Punjab · Tricity — our home",
    tagline: "Your neighbourhood studio, on the Tricity's fastest-growing strip.",
    intro:
      "Zirakpur is where our studio lives — so local brands get the closest thing to an in-house creative and growth team, without hiring one.",
    overview: [
      "Zirakpur has exploded — highrises, retail, restaurants and D2C brands all racing to establish themselves. As a studio based right here at Sushma Infinium, we help local businesses cut through with a distinctive brand, a fast website and marketing that actually brings customers in.",
      "Being in your own backyard means the fastest turnarounds in the Tricity: drop-in strategy sessions, same-week shoots, and one team owning brand, web, content and performance end-to-end.",
    ],
    stats: [
      { value: "Home", label: "our studio at Sushma Infinium" },
      { value: "1", label: "roof — brand, web, content & growth" },
      { value: "Fastest", label: "turnarounds in the Tricity" },
    ],
    areas: [
      "VIP Road & Patiala Road",
      "Dhakoli & Baltana",
      "Zirakpur–Chandigarh highway strip",
      "Sushma / Airport Road belt",
      "Peer Muchalla",
    ],
    services: [
      { label: "Branding & Design", href: "/services/creatives" },
      { label: "Web & E-commerce", href: "/services/development" },
      { label: "Performance Marketing", href: "/services/marketing" },
      { label: "Content & Social", href: "/services/content" },
    ],
    faqs: [
      { q: "Where exactly is your studio?", a: "Office 11–12, 9th Floor, Sushma Infinium, Zirakpur — easy to reach from VIP Road, Patiala Road and the Chandigarh highway." },
      { q: "Do local Zirakpur businesses get any advantage?", a: "The biggest one: speed and access. Drop-in strategy sessions, same-week shoots and a team you can actually sit across from." },
      { q: "Can you handle a brand-new business from scratch?", a: "Yes — naming, identity, website, social and launch marketing, all built together so you start with a complete, cohesive presence." },
    ],
  },
];
