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
};

const INSTAGRAM_BODY = `
<p>Most businesses think growth equals followers. But real growth is more engagement, more inquiries, more conversions and stronger brand recall. A page with 5,000 engaged followers is far more valuable than one with 50,000 inactive ones — and that shift in thinking is where most brands either grow or stay stuck.</p>
<h2>Step 1 — Define your content direction</h2>
<p>Before posting anything, get clarity on what your page stands for. Ask yourself what value you offer, who your audience is, and why someone should follow you. Your content shouldn't feel random; it should fall into clear categories:</p>
<ul><li>Educational</li><li>Informational</li><li>Relatable</li><li>Promotional</li></ul>
<h2>Step 2 — Focus on reels, but with strategy</h2>
<p>Reels are still the biggest growth driver, but random reels won't work anymore. Yours should hook attention in the first 2–3 seconds, be easy to understand, deliver one clear message, and feel natural rather than forced. Trend-based content works only when it's aligned with your brand.</p>
<h2>Step 3 — Make your profile conversion-ready</h2>
<p>Your profile is your first impression — visitors decide within seconds whether to follow or leave. Treat it like a landing page: a clear bio, what you do and who you help, a simple call to action, relevant highlights and a consistent visual identity.</p>
<h2>Step 4 — Create scroll-stopping visuals</h2>
<p>Instagram is a visual platform; if your content doesn't stand out, it gets ignored. Focus on clean design, consistent colours, readable text and strong hooks. Good design doesn't just look nice — it improves engagement.</p>
<h2>Step 5 — Be consistent, not random</h2>
<p>Posting daily isn't the goal; posting consistently with quality is. A simple rhythm works well: three to five posts a week, a mix of reels and carousels, and stories for daily engagement. Consistency builds familiarity, and familiarity builds trust.</p>
<h2>Step 6 — Write captions that add value</h2>
<p>Captions are often ignored, but they matter. A good caption expands on the content, adds context and encourages engagement. Avoid generic lines — speak like you would to a real person.</p>
<h2>Step 7 — Engage with your audience</h2>
<p>Growth isn't one-way. Reply to comments, respond to DMs, engage with other accounts and join conversations. The more active you are, the more visible you become — engagement signals tell Instagram your content is worth showing.</p>
<h2>Step 8 — Use hashtags smartly</h2>
<p>Hashtags still work, but not the way they used to. Instead of random popular tags, focus on niche hashtags, location-based tags and industry-specific keywords like #ChandigarhBusiness or #DigitalMarketingChandigarh to reach a more relevant audience.</p>
<h2>Step 9 — Track what works</h2>
<p>Not every post performs equally. Track which posts get saves, which reels get reach and which content drives inquiries. Over time the patterns become clear, and strategy evolves from guesswork to clarity.</p>
<h2>Step 10 — Build a brand, not just content</h2>
<p>The biggest mistake businesses make is focusing only on content, not brand. A strong brand has a clear voice, looks consistent, feels relatable and builds trust over time. People don't follow content — they follow brands they connect with.</p>
<h2>Final thought</h2>
<p>Instagram in 2026 isn't about doing more. It's about doing it right. When your content is clear, your visuals are strong and your message is consistent, growth follows naturally. The goal isn't just to be seen — it's to be remembered.</p>
`.trim();

const SEO_BODY = `
<p>Ranking on Google in 2026 isn't about tricks or shortcuts anymore — it's about being genuinely useful. Google no longer just scans keywords; it understands intent, behaviour and how users interact with your site. If your website actually helps people, you have a real chance of ranking.</p>
<h2>How Google ranking works today</h2>
<p>Google's job is simple: show the most relevant result for every search. To do that it evaluates the relevance of your content, its depth and usefulness, your website experience, and your trust and authority. So instead of trying to "beat the algorithm," focus on building something worth showing.</p>
<h2>Step 1 — Start with the right keywords</h2>
<p>Everything begins with understanding what your audience is searching for. In 2026, keyword research is less about volume and more about intent. "SEO tips" is broad; "SEO expert in Chandigarh" shows clear intent — and is far more likely to convert.</p>
<h2>Step 2 — Create content that actually helps</h2>
<p>Content is still the backbone of SEO, but the bar is higher. Google prefers content that solves real problems, is easy to understand, feels natural and keeps users engaged. If your content exists just to fill space, it won't perform.</p>
<h2>Step 3 — Structure your pages properly</h2>
<p>Even great content needs structure. Clear headings, well-written titles, meta descriptions, internal linking and natural keyword placement make it easy for both users and Google to understand your page. Clean, readable pages always beat keyword-heavy ones.</p>
<h2>Step 4 — Improve website experience</h2>
<p>A good website doesn't just look nice — it feels easy to use. Google now prioritises fast loading speed, mobile responsiveness, simple navigation and clean design. If a user lands and leaves within seconds, rankings drop over time.</p>
<h2>Step 5 — Build trust through backlinks</h2>
<p>Backlinks still play a major role. When other websites link to yours, it signals credibility — but quality matters. Relevant websites, genuine mentions and industry-specific platforms help; spammy links can even harm you.</p>
<h2>Step 6 — Strengthen your local presence</h2>
<p>For local businesses, local SEO isn't optional. Keep your Google Business Profile updated, collect genuine reviews, use location-based keywords and maintain consistent contact details. Local visibility often brings the most qualified leads.</p>
<h2>Step 7 — Align content with user intent</h2>
<p>Google understands <em>why</em> someone is searching. Match the three types of intent — informational, commercial and transactional — or your content won't rank well.</p>
<h2>Step 8 — Fix the technical basics</h2>
<p>Technical SEO isn't visible, but it matters. Make sure your site is properly indexed, has clean URLs, uses HTTPS, has no broken links and loads efficiently.</p>
<h2>Step 9 — Keep improving over time</h2>
<p>SEO isn't a one-time task. Instead of constantly creating new pages, improve what already exists — update old blogs, add new information, improve clarity and refresh keywords. Consistent updates signal that your website is active and relevant.</p>
<h2>Step 10 — Track and refine</h2>
<p>Without tracking, there's no direction. Monitor traffic, rankings, user behaviour and conversions. Over time you'll see what works and what doesn't — and that's where real, compounding growth comes from.</p>
<h2>Final thought</h2>
<p>Ranking on Google in 2026 is less about doing more and more about doing things right. When your website is helpful, easy to use and built with intent, results follow naturally.</p>
`.trim();

// Creative Monk's real published articles (thecreativemonk.in/our-blogs).
export const POSTS: Post[] = [
  {
    slug: "how-to-grow-your-business-on-instagram-in-2026",
    title: "How to Grow Your Business on Instagram in 2026",
    excerpt:
      "Instagram is no longer just a content platform — in 2026 it's a full business ecosystem. Here's how to actually grow.",
    category: "Social Media",
    date: "2026-04-30",
    read: "7 min",
    body: INSTAGRAM_BODY,
    source: "https://thecreativemonk.in/how-to-grow-your-business-on-instagram-in-2026/",
  },
  {
    slug: "google-ranking-guide-2026-seo-tips-that-actually-work",
    title: "How to Rank Your Website on Google in 2026 (Complete Guide)",
    excerpt:
      "Ranking on Google in 2026 isn't about tricks or shortcuts anymore. It's about being genuinely useful.",
    category: "SEO",
    date: "2026-04-03",
    read: "8 min",
    body: SEO_BODY,
    source: "https://thecreativemonk.in/google-ranking-guide-2026-seo-tips-that-actually-work/",
  },
  {
    slug: "start-your-first-google-ads-campaign-the-creative-monk-guide",
    title: "How to Set Up Your First Google Ads Campaign (Beginner Guide)",
    excerpt:
      "Running ads on Google can feel confusing at first — too many options, too many settings. A plain-English first campaign.",
    category: "Google Ads",
    date: "2026-04-12",
    read: "6 min",
    body: "",
    source: "https://thecreativemonk.in/start-your-first-google-ads-campaign-the-creative-monk-guide/",
  },
  {
    slug: "best-digital-marketing-company-chandigarh",
    title: "The Secret Behind Becoming the Best Digital Marketing Agencies",
    excerpt:
      "What actually separates the best digital marketing agencies — beyond the pitch and the promises.",
    category: "Digital Marketing",
    date: "2026-03-11",
    read: "6 min",
    body: "",
    source: "https://thecreativemonk.in/best-digital-marketing-company-chandigarh/",
  },
  {
    slug: "how-ppc-advertising-can-generate-instant-leads-for-chandigarh-businesses",
    title: "How PPC Advertising Can Generate Instant Leads for Chandigarh Businesses",
    excerpt:
      "How paid advertising generates fast, qualified leads for local businesses — without waiting months for results.",
    category: "PPC",
    date: "2026-02-27",
    read: "5 min",
    body: "",
    source: "https://thecreativemonk.in/how-ppc-advertising-can-generate-instant-leads-for-chandigarh-businesses/",
  },
  {
    slug: "google-ads-success-guide-how-the-best-ppc-company-in-chandigarh-maximizes-your-ad-budget",
    title: "Google Ads Success Guide: Maximising Your Ad Budget",
    excerpt:
      "How the best PPC team in Chandigarh stretches every rupee of ad budget for maximum return.",
    category: "Google Ads",
    date: "2026-02-13",
    read: "6 min",
    body: "",
    source: "https://thecreativemonk.in/google-ads-success-guide-how-the-best-ppc-company-in-chandigarh-maximizes-your-ad-budget/",
  },
  {
    slug: "best-ppc-company-in-chandigarh-how-creative-monk-drives-high-roi-ad-campaigns",
    title: "How Creative Monk Drives High-ROI Ad Campaigns",
    excerpt:
      "Why paid advertising is the fastest route to growth — and how to run campaigns that buy profit, not clicks.",
    category: "PPC",
    date: "2026-01-28",
    read: "5 min",
    body: "",
    source: "https://thecreativemonk.in/best-ppc-company-in-chandigarh-how-creative-monk-drives-high-roi-ad-campaigns/",
  },
  {
    slug: "digital-marketing-strategies-that-work-for-local-businesses-in-chandigarh",
    title: "Digital Marketing Strategies That Work for Local Businesses",
    excerpt:
      "Local business marketing has changed. The strategies that actually move the needle in Chandigarh now.",
    category: "Digital Marketing",
    date: "2026-01-22",
    read: "6 min",
    body: "",
    source: "https://thecreativemonk.in/digital-marketing-strategies-that-work-for-local-businesses-in-chandigarh/",
  },
  {
    slug: "aeo-vs-seo-simple-guide-to-understand-the-key-difference",
    title: "AEO vs SEO: A Simple Guide to the Key Difference",
    excerpt:
      "Answer Engine Optimisation vs traditional SEO — a plain-language guide to what's changing and why it matters.",
    category: "SEO",
    date: "2026-01-15",
    read: "5 min",
    body: "",
    source: "https://thecreativemonk.in/aeo-vs-seo-simple-guide-to-understand-the-key-difference/",
  },
  {
    slug: "facebook-marketing-tips-2026-how-to-use-facebook-to-promote-your-business",
    title: "Facebook Marketing Tips 2026: How to Promote Your Business",
    excerpt:
      "Facebook is still a powerful business platform — far beyond casual scrolling. How to use it to grow in 2026.",
    category: "Social Media",
    date: "2026-01-07",
    read: "6 min",
    body: "",
    source: "https://thecreativemonk.in/facebook-marketing-tips-2026-how-to-use-facebook-to-promote-your-business/",
  },
  {
    slug: "organic-search-vs-paid-search-simple-guide-for-beginners",
    title: "Organic Search vs Paid Search: A Simple Guide for Beginners",
    excerpt:
      "Organic vs paid search, explained simply — what each one is, and when to lean on which.",
    category: "SEO",
    date: "2026-01-03",
    read: "5 min",
    body: "",
    source: "https://thecreativemonk.in/organic-search-vs-paid-search-simple-guide-for-beginners/",
  },
  {
    slug: "10-skills-required-for-digital-marketing-that-every-marketer-should-have-in-2026",
    title: "10 Skills Every Digital Marketer Should Have in 2026",
    excerpt:
      "The ten skills every marketer needs in 2026 — from data and strategy to creative and AI.",
    category: "Digital Marketing",
    date: "2025-11-13",
    read: "7 min",
    body: "",
    source: "https://thecreativemonk.in/10-skills-required-for-digital-marketing-that-every-marketer-should-have-in-2026/",
  },
];

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
