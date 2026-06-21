/* ============================================================
   SEED — loads the original Creative Monk content into Turso.
   Run:  npm run seed         (only fills empty collections)
         npm run seed:force   (wipes ALL entries, then reseeds)
   ============================================================ */
import { db, migrate } from "./db";
import { ensureBootstrapAdmin } from "./lib/auth";
import { getCollection } from "./schema";
import { createEntry, putSingleton, countEntries } from "./store";
import { SERVICE_PAGES } from "./data/service-pages";
import { CASE_SECTIONS } from "./data/case-sections";

const force = process.argv.includes("--force");

/* ───────────── source content (from the original site) ───────────── */

const SITE = {
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
};

const HOME_HERO = {
  eyebrow: "Creative & growth studio · since 2016",
  headline: ["Own your", "growth."],
  accentWord: "growth.",
  sub: "We design brands and build the growth engines behind them — strategy, web, content and performance under one roof, engineered to compound into something you own.",
  ctaPrimary: { label: "Book a strategy call", href: "#contact" },
  ctaSecondary: { label: "See our work", href: "#work" },
};

const STORY = {
  index: "01",
  kicker: "The studio",
  q: "Why does growth marketing feel like renting?",
  a: "Because most agencies optimise the ad account and ignore the asset. We flipped it. Brand, web, content and performance live under one roof here — every rupee of spend builds something that keeps working after the campaign ends.",
  signature: "— The Creative Monk team",
};

const REVIEW_SUMMARY = { rating: "4.9", count: "350+", platforms: "Google · Clutch" };

const LOCATIONS = {
  india: ["Chandigarh", "Delhi", "Mumbai", "Bangalore", "Pune", "Hyderabad"],
  global: ["Dubai", "London", "New York", "Sydney", "Auckland", "Singapore"],
};

const FOOTER_GROUPS = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Case Studies", href: "/work" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Branding", href: "/services" },
      { label: "Web Development", href: "/services" },
      { label: "Performance", href: "/services" },
      { label: "SEO", href: "/services" },
      { label: "Video & Motion", href: "/services" },
    ],
  },
];

const SERVICES = [
  {
    id: "digital-marketing",
    index: "01",
    title: "Digital Marketing",
    blurb: "Demand that doesn't sleep. Full-funnel growth engineered around your unit economics — not vanity metrics.",
    capabilities: ["SEO & Content", "Paid Search / PPC", "Social Media", "Lead Generation", "Conversion Rate Optimisation", "Local Business Marketing"],
    deliverables: ["Quarterly growth roadmap", "Always-on campaign calendar", "Monthly performance reporting"],
    outcome: { value: "4.1×", label: "avg. blended ROAS" },
  },
  {
    id: "web",
    index: "02",
    title: "Web Design & Development",
    blurb: "Sites that feel inevitable. Fast, accessible, conversion-shaped builds — from landing pages to full e-commerce.",
    capabilities: ["Next.js & Headless", "Shopify & WooCommerce", "WordPress / Laravel", "Landing Pages", "E-commerce", "Core Web Vitals"],
    deliverables: ["Design system + UI kit", "Production build & CMS", "Analytics & A/B setup"],
    outcome: { value: "98", label: "avg. Lighthouse score" },
  },
  {
    id: "design",
    index: "03",
    title: "Graphic & Brand Design",
    blurb: "Identity with a backbone. The logo, the system, and everything it touches — built to scale across every surface.",
    capabilities: ["Logo & Identity", "Brand Systems", "Packaging", "Social Creative", "Stationery", "Campaign Design"],
    deliverables: ["Logo suite & guidelines", "Brand book & tokens", "Templates & asset library"],
    outcome: { value: "100%", label: "in-house, no outsourcing" },
  },
  {
    id: "motion",
    index: "04",
    title: "Video & Motion",
    blurb: "Stories that scroll-stop. Short-form reels, brand films and motion graphics tuned for the feed and the boardroom.",
    capabilities: ["Reels & Shorts", "Brand Films", "Motion Graphics", "Video Editing", "2D Animation", "Ad Creative"],
    deliverables: ["Monthly reel package", "Brand film + cutdowns", "Motion & ad creative"],
    outcome: { value: "3.4×", label: "avg. engagement lift" },
  },
];

const SERVICE_CATEGORIES = [
  {
    slug: "content", index: "01", name: "Content", tagline: "Words that rank and persuade",
    intro: "Strategy and words that earn attention and hold it — built to rank, read like a human wrote them, and move people to act.",
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
    slug: "creatives", index: "02", name: "Creatives", tagline: "Brand, design & motion",
    intro: "Identity, design and motion that make a brand unmistakable — from the logo to the last frame of the reel.",
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
    slug: "marketing", index: "03", name: "Marketing", tagline: "Demand that compounds",
    intro: "Full-funnel growth engineered around your unit economics — not vanity metrics. Demand that builds on itself, month after month.",
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
    slug: "development", index: "04", name: "Development", tagline: "Sites that convert",
    intro: "Fast, accessible, conversion-shaped builds — from landing pages to full e-commerce, engineered for Core Web Vitals and scale.",
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

const SERVICES_GRID = [
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

const CASES = [
  { id: "sunburst", client: "Sunburst Foods", title: "A heritage FMCG brand, re-lit for the feed", category: ["Brand", "Social", "Motion"], year: "2025", result: "Rebuilt identity + always-on social engine.", metric: { value: "3.4×", label: "engagement lift" }, accent: "8deg" },
  { id: "aether", client: "Aether Skincare", title: "D2C launch from zero to shelf-fame", category: ["E-commerce", "Performance", "Web"], year: "2025", result: "Shopify build + paid acquisition, profitable in 90 days.", metric: { value: "4.1", label: "blended ROAS" }, accent: "44deg" },
  { id: "meridian", client: "Meridian Realty", title: "Premium real-estate, sold before launch", category: ["Web", "Lead Gen", "SEO"], year: "2024", result: "Microsite + lead funnel for a flagship project.", metric: { value: "1,200+", label: "qualified leads" }, accent: "24deg" },
  { id: "kettle", client: "Kettle & Co.", title: "Specialty coffee with a cult following", category: ["Brand", "E-commerce", "Reels"], year: "2024", result: "Identity, packaging and a reel series that travels.", metric: { value: "+212%", label: "organic reach" }, accent: "16deg" },
  { id: "pulse", client: "Pulse Fitness", title: "Local gyms, national-grade presence", category: ["Local SEO", "Social", "Motion"], year: "2024", result: "Local marketing system across 6 locations.", metric: { value: "#1", label: "map rank, 6 cities" }, accent: "58deg" },
  { id: "northwind", client: "Northwind Travel", title: "Wanderlust, engineered into bookings", category: ["Web", "Content", "PPC"], year: "2023", result: "Content engine + performance for a travel brand.", metric: { value: "62%", label: "lower cost / lead" }, accent: "36deg" },
];

const REELS = [
  { id: "r1", title: "Sunburst — Launch Film", category: "Brand Film", ratio: "9/16", accent: "0deg" },
  { id: "r2", title: "Aether — Product Reel", category: "Social / Reels", ratio: "9/16", accent: "40deg" },
  { id: "r3", title: "Kettle & Co.", category: "E-commerce", ratio: "1/1", accent: "20deg" },
  { id: "r4", title: "Meridian Realty", category: "Campaign", ratio: "9/16", accent: "60deg" },
  { id: "r5", title: "Pulse Fitness", category: "Motion", ratio: "1/1", accent: "10deg" },
];

const VIDEO_PROJECTS = [
  { id: "v1", title: "Luxe Retail — Brand Film", category: "Brand Film" },
  { id: "v2", title: "Nova — Product Reel", category: "Social" },
  { id: "v3", title: "Meridian — Launch", category: "Real Estate" },
  { id: "v4", title: "Kettle & Co. — Series", category: "E-commerce" },
  { id: "v5", title: "Pulse — Motion", category: "Fitness" },
  { id: "v6", title: "Aether — Cinematic Ad", category: "Beauty" },
];

const POSTS = [
  {
    slug: "rent-vs-own-marketing", title: "Stop renting attention. Start owning it.",
    excerpt: "Why the smartest brands treat marketing spend like a balance-sheet asset, not a monthly expense.",
    category: "Strategy", date: "2026-05-18", read: "6 min",
    body: [
      "Most marketing budgets are rented. You pay, attention shows up, and the moment you stop paying it disappears. It is the treadmill almost every brand ends up on — faster and faster just to stay in place.",
      "Owned growth works differently. A brand system, an email list, a library of content, a website that ranks — these keep working long after the invoice is paid. They compound. They are assets.",
      "The shift is less about channels and more about intent: every campaign should leave something behind that makes the next one cheaper. That is the whole game.",
    ],
  },
  {
    slug: "reels-that-travel", title: "Anatomy of a reel that travels",
    excerpt: "The first second, the loop, and the one idea — a teardown of what makes short-form actually move.",
    category: "Motion", date: "2026-04-30", read: "5 min",
    body: [
      "A reel that travels earns the second second. The opening frame is a promise; if it is not specific, the scroll wins.",
      "Then the loop. The best short-form is built to be watched twice without the viewer noticing — the end feeds the beginning.",
      "And one idea. Not three. The reels that spread are ruthless about cutting everything that is not the single thing worth remembering.",
    ],
  },
  {
    slug: "design-system-for-small-brands", title: "Design systems aren't just for big brands",
    excerpt: "How a lightweight token system saves small teams from the slow death of inconsistency.",
    category: "Design", date: "2026-04-12", read: "7 min",
    body: [
      "A design system sounds like enterprise overhead. For a small brand it is the opposite — it is how five people ship like fifty without everything drifting.",
      "Start with tokens: color, type, spacing. Then a handful of components. That is enough to make every new page, post and ad feel like the same company.",
      "Consistency is not a constraint on creativity. It is what gives the bold moments somewhere to land.",
    ],
  },
  {
    slug: "measuring-what-matters", title: "Measuring what actually matters",
    excerpt: "A practical framework for cutting through dashboard noise to the three numbers that move your business.",
    category: "Growth", date: "2026-03-22", read: "8 min",
    body: [
      "Dashboards are where focus goes to die. Forty metrics, none of them decisions. The fix is brutal subtraction.",
      "For most brands it comes down to three: cost to acquire, value over a lifetime, and the ratio between them. Everything else is a supporting actor.",
      "Once those three are on the wall, every meeting gets shorter and every experiment gets a clearer verdict.",
    ],
  },
];

const TEAM = [
  { name: "Aarav Khanna", role: "Founder & Creative Director" },
  { name: "Ishita Verma", role: "Head of Strategy" },
  { name: "Rohan Mehta", role: "Design Lead" },
  { name: "Priya Nair", role: "Head of Growth" },
  { name: "Dev Arora", role: "Lead Engineer" },
];

const ROLES = [
  { title: "Senior Brand Designer", team: "Design", type: "Full-time", location: "Chandigarh / Remote" },
  { title: "Performance Marketing Manager", team: "Growth", type: "Full-time", location: "Chandigarh" },
  { title: "Frontend Engineer (React/Next.js)", team: "Engineering", type: "Full-time", location: "Remote" },
  { title: "Motion Designer", team: "Video", type: "Full-time", location: "Chandigarh / Remote" },
  { title: "Content Strategist", team: "Content", type: "Full-time", location: "Remote" },
  { title: "Account Lead", team: "Client Services", type: "Full-time", location: "Chandigarh" },
];

const REVIEWS = [
  { name: "Rhea Malhotra", role: "Founder, Aether Skincare", rating: 5, quote: "They didn't just make us look good — they made us make sense. Sharp strategy, relentless execution.", service: "Brand · Performance" },
  { name: "Arjun Sethi", role: "Director, Meridian Realty", rating: 5, quote: "The only team we've worked with that treats our P&L like their own. Calm people, loud results.", service: "Web · Lead Gen" },
  { name: "Karan Bedi", role: "CMO, Sunburst Foods", rating: 5, quote: "Our reels finally feel like us. Reach tripled and it still feels effortless on their side.", service: "Social · Motion" },
  { name: "Nadia Khan", role: "Founder, Kettle & Co.", rating: 5, quote: "From packaging to paid, everything matched. Organic reach is up triple digits and climbing.", service: "Brand · E-commerce" },
  { name: "Vikram Rao", role: "GM, Northwind Travel", rating: 4.9, quote: "A content engine that actually books trips. Cost per lead fell while volume went up.", service: "Content · PPC" },
  { name: "Simran Gill", role: "Owner, Pulse Fitness", rating: 5, quote: "Ranked #1 on the map across six cities. They make local feel national.", service: "Local SEO · Social" },
];

const FAQS = [
  { q: "How is Creative Monk different from a typical agency?", a: "Everything is in-house — brand, web, content and performance. Nothing gets lost between hand-offs, and your spend builds an asset instead of renting attention." },
  { q: "Do you work on retainer or per project?", a: "Both. Most clients start with a defined project, then move to a monthly retainer once the engine is running. Pick whatever fits your stage." },
  { q: "How soon will we see results?", a: "Paid channels can move in weeks; brand and SEO compound over months. We set honest milestones up front and report against them, not vanity metrics." },
  { q: "Which industries do you specialise in?", a: "FMCG, D2C & e-commerce, real estate, SaaS, hospitality and local services — but our system travels well across categories." },
  { q: "Do you only work with brands in India?", a: "No. We're based in Chandigarh but ship work for clients across 27+ countries, working in their time zone when it matters." },
  { q: "Who owns the work you produce?", a: "You do — outright. Brand files, code, content and ad accounts are yours. That's the whole point of building an asset." },
];

const INDUSTRIES = [
  { name: "D2C & E-commerce", blurb: "Launch-to-scale brands that live and die by ROAS." },
  { name: "Real Estate", blurb: "Premium projects sold before launch with funnels + film." },
  { name: "FMCG", blurb: "Heritage brands re-lit for the feed and the shelf." },
  { name: "SaaS", blurb: "Demand engines for product-led growth teams." },
  { name: "Hospitality", blurb: "Places people travel for — and post about." },
  { name: "Healthcare", blurb: "Trust-first marketing for clinics and wellness brands." },
];

const VALUES = [
  { no: "01", title: "Own the asset", body: "Every rupee of work should build something you keep — a brand, a system, a channel — not attention you rent and lose." },
  { no: "02", title: "Proof over promises", body: "We set honest milestones up front and report against outcomes, not vanity metrics. The numbers do the talking." },
  { no: "03", title: "One roof, one craft", body: "Brand, web, content and performance live in-house, so nothing gets lost between hand-offs and the quality never drops." },
  { no: "04", title: "Patience, then pace", body: "We move like a monk — listen first, then execute relentlessly. Compounding beats sprinting every single time." },
];

const PROCESS = [
  { step: "01", title: "Listen", body: "We start where a monk starts — with attention. Deep discovery into your market, margins and the job your customer is hiring you for." },
  { step: "02", title: "Shape", body: "Strategy becomes a system: positioning, identity, message and the channels that will carry them. Decisions, not decoration." },
  { step: "03", title: "Make", body: "Design, code, content and campaigns produced in-house — so the craft stays consistent from the first pixel to the last post." },
  { step: "04", title: "Compound", body: "We measure, learn and reinvest. Growth that builds on itself, month after month, instead of resetting every quarter." },
];

const STATS = [
  { group: "stat_bar", value: "480", suffix: "+", label: "Brands scaled" },
  { group: "stat_bar", value: "9", suffix: " yrs", label: "In the game" },
  { group: "stat_bar", value: "96", suffix: "%", label: "Client retention" },
  { group: "stat_bar", value: "4.9", suffix: "/5", label: "Average rating" },
  { group: "timeline", value: "2016", suffix: "", label: "Founded in Chandigarh" },
  { group: "timeline", value: "40", suffix: "+", label: "In-house specialists" },
  { group: "timeline", value: "12", suffix: "+", label: "Industries served" },
  { group: "timeline", value: "27", suffix: " countries", label: "Clients shipped to" },
  { group: "culture", value: "40", suffix: "+", label: "In the studio" },
  { group: "culture", value: "92", suffix: "%", label: "Team retention" },
  { group: "home", value: "480", suffix: "+", label: "Projects shipped" },
  { group: "home", value: "9", suffix: "yrs", label: "Crafting growth" },
  { group: "home", value: "27", suffix: "+", label: "Industries served" },
  { group: "home", value: "96", suffix: "%", label: "Retained clients" },
];

const PRICING = [
  { name: "Launch", tag: "For new brands finding their feet", price: "₹60k", cadence: "/ month", featured: false, features: ["Brand starter kit", "Landing page or microsite", "2 channels, managed", "Monthly reporting", "Email support"] },
  { name: "Growth", tag: "For brands ready to scale", price: "₹1.4L", cadence: "/ month", featured: true, features: ["Everything in Launch", "Full website + CMS", "4 channels, always-on", "Reels & content engine", "Bi-weekly strategy calls", "Dedicated team lead"] },
  { name: "Scale", tag: "For enterprises & ambitious bets", price: "Custom", cadence: "tailored", featured: false, features: ["Everything in Growth", "Brand system + design ops", "Performance at scale", "Quarterly roadmaps", "Priority SLA", "Embedded squad"] },
];

const AWARDS = [
  { title: "Best Marketing & Advertising Firm of the Year", org: "Global 100 Awards", year: "2026" },
  { title: "Top Digital Marketing Agency — India", org: "Industry Recognition", year: "2025" },
  { title: "Excellence in Brand Design", org: "Creative Index", year: "2024" },
  { title: "Performance Marketing — Finalist", org: "Growth Summit", year: "2024" },
];

const TOOLS = ["Google Ads", "Meta", "Shopify", "GA4", "HubSpot", "Klaviyo", "Webflow", "Figma", "Next.js", "WordPress", "Semrush", "Mailchimp"];
const CERTS = ["Global 100 — Firm of the Year '26", "Top Digital Marketing — India", "ISO 9001", "ISO 27001", "Google Partner", "Meta Business Partner"];
const MARQUEE = ["Brand Strategy", "Web Design", "SEO", "Performance Marketing", "Social", "Motion & Reels", "E-commerce", "Identity"];
const BENEFITS = ["Team first", "Remote-friendly", "Learning budget", "Pet friendly", "Food & snacks", "Flexible hours", "Health cover", "No-ego culture"];

/* ───────────── seed plan ───────────── */

const SINGLETONS: Record<string, Record<string, unknown>> = {
  site: SITE,
  home_hero: HOME_HERO,
  story: STORY,
  review_summary: REVIEW_SUMMARY,
  locations: LOCATIONS,
};

const COLLECTIONS: Record<string, Record<string, unknown>[]> = {
  footer_groups: FOOTER_GROUPS,
  services: SERVICES,
  service_categories: SERVICE_CATEGORIES,
  services_grid: SERVICES_GRID,
  service_pages: SERVICE_PAGES as unknown as Record<string, unknown>[],
  cases: CASES,
  case_sections: CASE_SECTIONS as unknown as Record<string, unknown>[],
  reels: REELS,
  video_projects: VIDEO_PROJECTS,
  posts: POSTS,
  team: TEAM,
  roles: ROLES,
  reviews: REVIEWS,
  faqs: FAQS,
  industries: INDUSTRIES,
  values: VALUES,
  process: PROCESS,
  stats: STATS,
  pricing: PRICING,
  awards: AWARDS,
  tools: TOOLS.map((name) => ({ name })),
  certs: CERTS.map((name) => ({ name })),
  marquee: MARQUEE.map((name) => ({ name })),
  benefits: BENEFITS.map((name) => ({ name })),
};

async function run() {
  await migrate();
  await ensureBootstrapAdmin();

  if (force) {
    console.log("[seed] --force: wiping all entries");
    await db.execute("DELETE FROM entries");
  }

  for (const [slug, data] of Object.entries(SINGLETONS)) {
    const col = getCollection(slug);
    if (!col) { console.warn(`[seed] unknown collection ${slug}`); continue; }
    if (!force && (await countEntries(slug)) > 0) { console.log(`[seed] skip ${slug} (exists)`); continue; }
    await putSingleton(col, data);
    console.log(`[seed] singleton ${slug}`);
  }

  for (const [slug, rows] of Object.entries(COLLECTIONS)) {
    const col = getCollection(slug);
    if (!col) { console.warn(`[seed] unknown collection ${slug}`); continue; }
    if (!force && (await countEntries(slug)) > 0) { console.log(`[seed] skip ${slug} (exists)`); continue; }
    for (const row of rows) await createEntry(col, row);
    console.log(`[seed] ${slug}: ${rows.length} rows`);
  }

  console.log("[seed] done");
  process.exit(0);
}

run().catch((err) => {
  console.error("[seed] failed:", err);
  process.exit(1);
});
