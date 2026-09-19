/* ============================================================
   SEED, loads the original Creative Monk content into Turso.
   Run:  npm run seed         (only fills empty collections)
         npm run seed:force   (wipes ALL entries, then reseeds)
   ============================================================ */
import { db, migrate } from "./db";
import { ensureBootstrapAdmin } from "./lib/auth";
import { getCollection } from "./schema";
import { createEntry, putSingleton, countEntries } from "./store";
import { SERVICE_PAGES } from "./data/service-pages";
import { REAL_CASES, REAL_CASE_SECTIONS, REAL_REELS, REAL_VIDEO_PROJECTS, PORTFOLIO } from "./data/work";
import { CLIENTS } from "./data/clients";
import BLOG_POSTS from "./data/blog-posts.json";

const force = process.argv.includes("--force");
// --only=<slug> replaces just one collection (delete + reinsert), leaves the rest untouched.
const only = process.argv.find((a) => a.startsWith("--only="))?.split("=")[1] || null;

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
  founded: 2017,
  socials: [
    { label: "Instagram", handle: "@creativemonkindia", href: "https://instagram.com/creativemonkindia" },
    { label: "Facebook", handle: "@creativemonkindia", href: "https://facebook.com/creativemonkindia" },
    { label: "YouTube", handle: "Creative Monk", href: "https://youtube.com/@creativemonkindia" },
    { label: "WhatsApp", handle: "Chat", href: "https://wa.me/919463445566" },
  ],
};

const HOME_HERO = {
  eyebrow: "Creative & growth studio · since 2017",
  headline: ["Own your", "growth."],
  accentWord: "growth.",
  sub: "We design brands and build the growth engines behind them, strategy, web, content and performance under one roof, engineered to compound into something you own.",
  ctaPrimary: { label: "Book a strategy call", href: "#contact" },
  ctaSecondary: { label: "See our work", href: "#work" },
};

const STORY = {
  index: "01",
  kicker: "The studio",
  q: "Why does growth marketing feel like renting?",
  a: "Because most agencies optimise the ad account and ignore the asset. We flipped it. Brand, web, content and performance live under one roof here, every rupee of spend builds something that keeps working after the campaign ends.",
  signature: "The Creative Monk team",
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
      { label: "Design", href: "/services/design" },
      { label: "Market", href: "/services/market" },
      { label: "Develop", href: "/services/develop" },
      { label: "Growth", href: "/services/growth" },
      { label: "AI", href: "/services/ai" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Real Estate", href: "/digital-marketing-for-real-estate" },
      { label: "D2C & E-commerce", href: "/digital-marketing-for-d2c-ecommerce" },
      { label: "Hospitality", href: "/digital-marketing-for-hospitality" },
      { label: "FMCG", href: "/digital-marketing-for-fmcg" },
      { label: "Healthcare", href: "/digital-marketing-for-healthcare" },
      { label: "SaaS", href: "/digital-marketing-for-saas" },
    ],
  },
  {
    title: "Locations",
    links: [
      { label: "Chandigarh", href: "/digital-marketing-in-chandigarh" },
      { label: "Mohali", href: "/digital-marketing-in-mohali" },
      { label: "Panchkula", href: "/digital-marketing-in-panchkula" },
      { label: "Zirakpur", href: "/digital-marketing-in-zirakpur" },
    ],
  },
];

const SERVICES = [
  {
    id: "digital-marketing",
    index: "01",
    title: "Digital Marketing",
    blurb: "Demand that doesn't sleep. Full-funnel growth engineered around your unit economics, not vanity metrics.",
    capabilities: ["SEO & Content", "Paid Search / PPC", "Social Media", "Lead Generation", "Conversion Rate Optimisation", "Local Business Marketing"],
    deliverables: ["Quarterly growth roadmap", "Always-on campaign calendar", "Monthly performance reporting"],
    outcome: { value: "4.1×", label: "avg. blended ROAS" },
  },
  {
    id: "web",
    index: "02",
    title: "Web Design & Development",
    blurb: "Sites that feel inevitable. Fast, accessible, conversion-shaped builds, from landing pages to full e-commerce.",
    capabilities: ["Next.js & Headless", "Shopify & WooCommerce", "WordPress / Laravel", "Landing Pages", "E-commerce", "Core Web Vitals"],
    deliverables: ["Design system + UI kit", "Production build & CMS", "Analytics & A/B setup"],
    outcome: { value: "98", label: "avg. Lighthouse score" },
  },
  {
    id: "design",
    index: "03",
    title: "Graphic & Brand Design",
    blurb: "Identity with a backbone. The logo, the system, and everything it touches, built to scale across every surface.",
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
    slug: "design", index: "01", name: "Design", tagline: "The identity and creative assets you own, not rent",
    intro: "Identity, design and motion built as assets you own outright, a system that compounds recognition across every surface, from the first logo to the last frame of the reel.",
    items: [
      { slug: "brand-identity-systems", name: "Brand Identity & Systems", desc: "A system that compounds recognition, not a one-off logo file." },
      { slug: "graphic-design-creative", name: "Graphic Design & Creative", desc: "Campaign and social creative built once, reused everywhere on-brand." },
      { slug: "video-motion", name: "Video & Motion", desc: "Motion assets that keep earning attention after the shoot is paid for." },
      { slug: "ui-ux-design", name: "UI/UX Design", desc: "Experience design that becomes a permanent conversion asset, not a redesign project." },
    ],
  },
  {
    slug: "market", index: "02", name: "Market", tagline: "Demand that compounds instead of resetting every month",
    intro: "Search, paid and social that turn spend into owned learnings, audience and content, demand that builds on itself instead of resetting when the campaign ends.",
    items: [
      { slug: "seo", name: "SEO", desc: "Visibility you own in the SERP, not rented for the length of a campaign." },
      { slug: "google-ads", name: "Google Ads", desc: "Spend that buys learnings and creative assets the account keeps using, not just clicks." },
      { slug: "meta-ads", name: "Meta Ads", desc: "Feed-native creative that feeds back into your owned content library." },
      { slug: "social-media-management", name: "Social Media Management", desc: "A presence asset that keeps compounding audience, not a content treadmill." },
      { slug: "content-copywriting", name: "Content & Copywriting", desc: "Words built once into a system, SEO and brand voice, reused across every channel." },
    ],
  },
  {
    slug: "develop", index: "03", name: "Develop", tagline: "The infrastructure your growth runs on",
    intro: "Fast, conversion-shaped sites, stores and landing pages, the asset every campaign points back to, engineered to get better with each cycle of data.",
    items: [
      { slug: "websites-landing-pages", name: "Websites & Landing Pages", desc: "The asset every campaign points back to and improves." },
      { slug: "ecommerce", name: "E-commerce", desc: "A storefront engineered to get better with every cycle of data, not rebuilt each time." },
    ],
  },
  {
    slug: "growth", index: "04", name: "Growth", tagline: "Where Make becomes Compound",
    intro: "Funnels, analytics and CRO wired into one feedback loop, the engine that makes every other asset compound month over month, run by one team with no hand-offs.",
    items: [
      { slug: "lead-generation-funnels", name: "Lead Generation & Funnels", desc: "A system tuned to your margins, not a rented list of leads." },
      { slug: "analytics-cro", name: "Analytics & CRO", desc: "The feedback loop that makes every other asset compound month over month." },
      { slug: "growth-system-360", name: "360 Growth System", desc: "The full Listen → Shape → Make → Compound engine, one team, no hand-offs." },
    ],
  },
  {
    slug: "ai",
    index: "05",
    name: "AI",
    tagline: "Intelligence, put to work",
    intro:
      "Automation and AI tooling baked into the Make/Compound loop, compounding efficiency and production capacity that scale your asset library without scaling headcount.",
    items: [
      { slug: "ai-marketing-automation", name: "AI-Powered Marketing & Automation", desc: "Compounding efficiency baked into the Make/Compound loop." },
      { slug: "ai-content-tools", name: "AI Content & Creative Tools", desc: "Production capacity that scales the asset library without scaling headcount." },
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
  { no: "12", title: "Analytics & CRO", desc: "Measure, learn, reinvest, month after month." },
];


const TEAM = [
  { name: "Aarav Khanna", role: "Founder & Creative Director" },
  { name: "Ishita Verma", role: "Head of Strategy" },
  { name: "Rohan Mehta", role: "Design Lead" },
  { name: "Priya Nair", role: "Head of Growth" },
  { name: "Dev Arora", role: "Lead Engineer" },
];

const jd = (intro: string, doList: string[], wantList: string[], niceList: string[], closing: string) =>
  [
    `<p>${intro}</p>`,
    `<h3>What you'll do</h3><ul>${doList.map((x) => `<li>${x}</li>`).join("")}</ul>`,
    `<h3>What we're looking for</h3><ul>${wantList.map((x) => `<li>${x}</li>`).join("")}</ul>`,
    niceList.length ? `<h3>Nice to have</h3><ul>${niceList.map((x) => `<li>${x}</li>`).join("")}</ul>` : "",
    `<p>${closing}</p>`,
  ].filter(Boolean).join("\n");

const ROLES = [
  {
    title: "AI Content Creator & Editor",
    slug: "ai-content-creator-editor",
    team: "AI",
    type: "Full-time",
    location: "Zirakpur / Mohali",
    experience: "1–2 years",
    salary: "Based on experience",
    summary: "Create and edit video & image content with AI tools, on-brand and platform-ready.",
    description: jd(
      "Produce visual assets using AI-powered tools alongside traditional editing software for client campaigns.",
      [
        "Use AI generation tools (Midjourney, Runway, DALL·E) for graphics, social visuals and short-form video",
        "Edit and enhance assets, upscaling, auto-captioning, background removal and colour grading",
        "Produce platform-ready assets for Reels, Shorts, carousels, static graphics and brand videos",
        "Collaborate with content and strategy teams on AI-assisted concepts aligned to brand identity",
        "QA AI output to remove artifacts and keep everything brand-compliant",
        "Evaluate emerging AI tools and fold the best into team workflows",
      ],
      [
        "1–2 years hands-on with AI image/video tools and traditional editing software",
        "Strong visual storytelling, composition and brand consistency",
        "Ability to prompt AI tools effectively for usable, on-brand output",
        "Comfort managing multiple projects in a fast-paced environment",
      ],
      ["A portfolio of AI-assisted or AI-generated work"],
      "If you're excited to push what AI creative can do for real brands, we want to see your work.",
    ),
  },
  {
    title: "Videographer / DOP",
    slug: "videographer-dop",
    team: "Design",
    type: "Full-time",
    location: "Zirakpur / Mohali",
    experience: "2–4 years",
    salary: "₹20,000–₹35,000/mo",
    summary: "Plan, shoot and edit brand films, events and real-estate content, end to end.",
    description: jd(
      "Own the camera from pre-production planning to a polished, platform-ready cut.",
      [
        "Plan shoots with the creative and account teams, shot lists, locations, equipment and shoot-day logistics",
        "Capture high-quality video for real-estate walkthroughs, events, brand films and social content",
        "Edit raw footage into polished videos, cuts, colour correction, sound design, graphics and captions",
        "Deliver multi-format content suited to each platform from a single shoot",
        "Keep pace with video trends and platform-specific best practices",
      ],
      [
        "2–4 years as a videographer/video editor, agency, event or real-estate content ideally",
        "Strong camera operation, lighting and audio capture",
        "Proficiency in Adobe Premiere Pro, DaVinci Resolve or Final Cut Pro",
        "A portfolio showing consistent quality across projects",
        "Able to take a brief to a finished product independently",
      ],
      [],
      "If you can carry a shoot from brief to final cut on your own, this is your seat.",
    ),
  },
  {
    title: "Media Buyer (Meta & Google Ads)",
    slug: "media-buyer",
    team: "Market",
    type: "Full-time",
    location: "Zirakpur / Mohali",
    experience: "2–4 years",
    salary: "₹30,000–₹40,000/mo",
    summary: "Plan and optimise Meta & Google Ads to CPL, CPA and ROAS across client accounts.",
    description: jd(
      "Own paid performance across Meta and Google for multiple client accounts.",
      [
        "Plan, launch and manage Meta Ads and Google Ads (Search & Performance Max) campaigns",
        "Own budget pacing and bid optimisation toward CPL, CPA or ROAS targets",
        "Set up and maintain tracking, Meta Pixel/CAPI, Google Tag Manager and GA4",
        "Run structured creative and audience testing and turn it into insight",
        "Build performance reports that explain results in plain language",
        "Brief creative teams with data-driven conversion insights",
      ],
      [
        "2–4 years managing Meta and Google Ads, ideally in an agency",
        "A track record optimising CPL, CPA or ROAS",
        "Proficiency with Meta Ads Manager, Google Ads, Pixel/CAPI, GTM and GA4",
        "Strong analytical skills, you read the data and act on it",
        "Able to manage multiple client accounts independently",
      ],
      ["Looker Studio reporting"],
      "If you think in incrementality and hate wasted spend, let's talk.",
    ),
  },
  {
    title: "Social Media Manager",
    slug: "social-media-manager",
    team: "Market",
    type: "Full-time",
    location: "Zirakpur / Chandigarh",
    experience: "",
    salary: "",
    summary: "Own social strategy, content and paid campaigns across client brands.",
    description: jd(
      "Develop strategy and run client accounts across every major platform, organic and paid.",
      [
        "Develop social strategies tailored to each client brand, including paid approaches",
        "Create and curate content for Facebook, Instagram, Twitter and LinkedIn, organic and ads",
        "Plan and manage ad campaigns: objectives, targeting, budgets and optimisation",
        "Manage accounts end to end, planning, scheduling, posting and monitoring",
        "Track organic and paid metrics and optimise strategy and spend",
        "Engage the community, respond to comments and messages and build the brand",
      ],
      [
        "A track record managing social with successful campaigns, including paid",
        "Deep understanding of platforms, algorithms and ad capabilities",
        "Exceptional written and verbal communication with a creative eye",
        "Strong analytical skills to interpret data and adjust strategy",
        "Comfort with scheduling and ad platforms (Meta, Twitter, LinkedIn Ads)",
      ],
      [],
      "If you can grow a brand's presence and its pipeline at the same time, apply.",
    ),
  },
  {
    title: "Content Writer",
    slug: "content-writer",
    team: "Market",
    type: "Full-time",
    location: "Zirakpur",
    experience: "",
    salary: "",
    summary: "Write SEO-savvy content across web, blog, social and email.",
    description: jd(
      "Produce engaging digital content across platforms and shape cohesive brand messaging.",
      [
        "Write high-quality content for websites, blogs, social, email and other channels",
        "Research client industries, audiences and content objectives",
        "Partner with creative teams on strategy aligned to each brand",
        "Work with design to weave in graphics, images and video",
        "Edit and proofread for accuracy, clarity and consistency",
        "Apply SEO best practices to improve discoverability",
      ],
      [
        "Proven experience as a content writer with a portfolio across formats",
        "Excellent writing, editing and proofreading with attention to detail",
        "Knowledge of SEO best practices",
        "Strong research and analytical ability",
        "Able to juggle multiple projects to tight deadlines",
      ],
      [],
      "Bring samples that show range, we hire for craft, not word count.",
    ),
  },
  {
    title: "Video Editor",
    slug: "video-editor",
    team: "Design",
    type: "Full-time",
    location: "Zirakpur / Mohali",
    experience: "",
    salary: "",
    summary: "Edit polished video and motion graphics for social, web and YouTube.",
    description: jd(
      "Produce high-quality video for digital platforms and shape concepts with the creative team.",
      [
        "Edit and produce video for social, websites and YouTube, aligned to client branding",
        "Develop video concepts with the creative team",
        "Work across promos, product demos, interviews and event coverage",
        "Manage and organise footage and assets for an efficient workflow",
        "Stay current with editing software and techniques",
      ],
      [
        "A video-editing portfolio across multiple formats",
        "Expertise in Premiere Pro, After Effects, Final Cut Pro or DaVinci Resolve",
        "Knowledge of codecs, formats and compression",
        "Strong communication and collaboration",
        "Efficient under tight deadlines across multiple projects",
      ],
      ["Motion graphics and AI video effects"],
      "If you can cut for the feed and the boardroom, we'd love your reel.",
    ),
  },
  {
    title: "Graphic Designer",
    slug: "graphic-designer",
    team: "Design",
    type: "Full-time",
    location: "Zirakpur / Chandigarh",
    experience: "",
    salary: "",
    summary: "Craft logos, layouts and on-brand visuals across every channel.",
    description: jd(
      "Create visually compelling design across digital platforms, web, social and marketing materials.",
      [
        "Create engaging designs for a variety of digital platforms",
        "Work with clients and the team to align to brand guidelines",
        "Produce logos, banners, infographics, illustrations and visual elements",
        "Keep a uniform visual style across channels and materials",
        "Stay current with trends and design software",
        "Manage multiple design projects to deadline",
      ],
      [
        "A portfolio showing diverse design work",
        "Proficiency in Photoshop, Illustrator, Sketch or CorelDraw",
        "A solid grasp of typography, colour theory and composition",
        "Knowledge of current digital design trends",
        "Strong communication and teamwork",
      ],
      ["Open to Zirakpur / Mohali or work-from-home"],
      "Send a portfolio that shows range and craft.",
    ),
  },
];

const REVIEWS = [
  { name: "Rhea Malhotra", role: "Founder, Aether Skincare", rating: 5, quote: "They didn't just make us look good, they made us make sense. Sharp strategy, relentless execution.", service: "Brand · Performance" },
  { name: "Arjun Sethi", role: "Director, Meridian Realty", rating: 5, quote: "The only team we've worked with that treats our P&L like their own. Calm people, loud results.", service: "Web · Lead Gen" },
  { name: "Karan Bedi", role: "CMO, Sunburst Foods", rating: 5, quote: "Our reels finally feel like us. Reach tripled and it still feels effortless on their side.", service: "Social · Motion" },
  { name: "Nadia Khan", role: "Founder, Kettle & Co.", rating: 5, quote: "From packaging to paid, everything matched. Organic reach is up triple digits and climbing.", service: "Brand · E-commerce" },
  { name: "Vikram Rao", role: "GM, Northwind Travel", rating: 4.9, quote: "A content engine that actually books trips. Cost per lead fell while volume went up.", service: "Content · PPC" },
  { name: "Simran Gill", role: "Owner, Pulse Fitness", rating: 5, quote: "Ranked #1 on the map across six cities. They make local feel national.", service: "Local SEO · Social" },
];

const FAQS = [
  { q: "How is Creative Monk different from a typical agency?", a: "Everything is in-house, brand, web, content and performance. Nothing gets lost between hand-offs, and your spend builds an asset instead of renting attention." },
  { q: "Do you work on retainer or per project?", a: "Both. Most clients start with a defined project, then move to a monthly retainer once the engine is running. Pick whatever fits your stage." },
  { q: "How soon will we see results?", a: "Paid channels can move in weeks; brand and SEO compound over months. We set honest milestones up front and report against them, not vanity metrics." },
  { q: "Which industries do you specialise in?", a: "FMCG, D2C & e-commerce, real estate, SaaS, hospitality and local services, but our system travels well across categories." },
  { q: "Do you only work with brands in India?", a: "No. We're based in Chandigarh but ship work for clients across 27+ countries, working in their time zone when it matters." },
  { q: "Who owns the work you produce?", a: "You do, outright. Brand files, code, content and ad accounts are yours. That's the whole point of building an asset." },
];

const INDUSTRIES = [
  { name: "D2C & E-commerce", blurb: "Launch-to-scale brands that live and die by ROAS." },
  { name: "Real Estate", blurb: "Premium projects sold before launch with funnels + film." },
  { name: "FMCG", blurb: "Heritage brands re-lit for the feed and the shelf." },
  { name: "SaaS", blurb: "Demand engines for product-led growth teams." },
  { name: "Hospitality", blurb: "Places people travel for, and post about." },
  { name: "Healthcare", blurb: "Trust-first marketing for clinics and wellness brands." },
];

const VALUES = [
  { no: "01", title: "Own the asset", body: "Every rupee of work should build something you keep, a brand, a system, a channel, not attention you rent and lose." },
  { no: "02", title: "Proof over promises", body: "We set honest milestones up front and report against outcomes, not vanity metrics. The numbers do the talking." },
  { no: "03", title: "One roof, one craft", body: "Brand, web, content and performance live in-house, so nothing gets lost between hand-offs and the quality never drops." },
  { no: "04", title: "Patience, then pace", body: "We move like a monk, listen first, then execute relentlessly. Compounding beats sprinting every single time." },
];

const PROCESS = [
  { step: "01", title: "Listen", body: "We start where a monk starts, with attention. Deep discovery into your market, margins and the job your customer is hiring you for." },
  { step: "02", title: "Shape", body: "Strategy becomes a system: positioning, identity, message and the channels that will carry them. Decisions, not decoration." },
  { step: "03", title: "Make", body: "Design, code, content and campaigns produced in-house, so the craft stays consistent from the first pixel to the last post." },
  { step: "04", title: "Compound", body: "We measure, learn and reinvest. Growth that builds on itself, month after month, instead of resetting every quarter." },
];

const STATS = [
  { group: "stat_bar", value: "480", suffix: "+", label: "Brands scaled" },
  { group: "stat_bar", value: "9", suffix: " yrs", label: "In the game" },
  { group: "stat_bar", value: "96", suffix: "%", label: "Client retention" },
  { group: "stat_bar", value: "4.9", suffix: "/5", label: "Average rating" },
  { group: "timeline", value: "2017", suffix: "", label: "Founded in Chandigarh" },
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
  { title: "Top Digital Marketing Agency, India", org: "Industry Recognition", year: "2025" },
  { title: "Excellence in Brand Design", org: "Creative Index", year: "2024" },
  { title: "Performance Marketing, Finalist", org: "Growth Summit", year: "2024" },
];

const TOOLS = ["Google Ads", "Meta", "Shopify", "GA4", "HubSpot", "Klaviyo", "Webflow", "Figma", "Next.js", "WordPress", "Semrush", "Mailchimp"];
const CERTS = ["Global 100, Firm of the Year '26", "Top Digital Marketing, India", "ISO 9001", "ISO 27001", "Google Partner", "Meta Business Partner"];
const MARQUEE = ["Brand Strategy", "Web Design", "SEO", "Performance Marketing", "Social", "Motion & Reels", "E-commerce", "Identity"];
const BENEFITS = ["Team first", "Remote-friendly", "Learning budget", "Pet friendly", "Food & snacks", "Flexible hours", "Health cover", "No-ego culture"];

const CAREERS = {
  heroKicker: "Careers",
  heroTitle1: "Build things",
  heroTitle2: "worth owning",
  heroLede: "We're a small, in-house team that values craft, ownership and the long game, people who'd rather build an asset than rent attention.",
  whyEyebrow: "Why Creative Monk",
  whyLead: "No hand-offs, no ego, no busywork, ",
  whyMuted: "just sharp people shipping work they're proud to sign.",
  perksEyebrow: "Perks",
  perksHeading: "The things that keep good people building.",
  rolesEyebrow: "Open roles",
  rolesIntro: "Don't fit one neatly? Apply to the closest, we hire for craft, not checklists.",
  ctaLead: "Don't see your role?",
  ctaMuted: "Pitch us.",
  ctaBody: "If you're great at something we'll need, tell us what you'd build here. The best hires rarely come from a job post.",
  ctaButtonLabel: "Get in touch",
  ctaButtonHref: "/contact",
};

/* ───────────── seed plan ───────────── */

const SINGLETONS: Record<string, Record<string, unknown>> = {
  site: SITE,
  home_hero: HOME_HERO,
  story: STORY,
  review_summary: REVIEW_SUMMARY,
  locations: LOCATIONS,
  careers: CAREERS,
};

const COLLECTIONS: Record<string, Record<string, unknown>[]> = {
  footer_groups: FOOTER_GROUPS,
  services: SERVICES,
  service_categories: SERVICE_CATEGORIES,
  services_grid: SERVICES_GRID,
  service_pages: SERVICE_PAGES as unknown as Record<string, unknown>[],
  cases: REAL_CASES as unknown as Record<string, unknown>[],
  case_sections: REAL_CASE_SECTIONS as unknown as Record<string, unknown>[],
  portfolio: PORTFOLIO as unknown as Record<string, unknown>[],
  reels: REAL_REELS as unknown as Record<string, unknown>[],
  video_projects: REAL_VIDEO_PROJECTS as unknown as Record<string, unknown>[],
  posts: BLOG_POSTS as unknown as Record<string, unknown>[],
  team: TEAM,
  roles: ROLES,
  clients: CLIENTS as unknown as Record<string, unknown>[],
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
    if (only && slug !== only) continue;
    const col = getCollection(slug);
    if (!col) { console.warn(`[seed] unknown collection ${slug}`); continue; }
    if (!force && !only && (await countEntries(slug)) > 0) { console.log(`[seed] skip ${slug} (exists)`); continue; }
    if (only) await db.execute({ sql: "DELETE FROM entries WHERE collection = ?", args: [slug] });
    await putSingleton(col, data);
    console.log(`[seed] singleton ${slug}`);
  }

  for (const [slug, rows] of Object.entries(COLLECTIONS)) {
    if (only && slug !== only) continue;
    const col = getCollection(slug);
    if (!col) { console.warn(`[seed] unknown collection ${slug}`); continue; }
    if (!force && !only && (await countEntries(slug)) > 0) { console.log(`[seed] skip ${slug} (exists)`); continue; }
    if (only) { await db.execute({ sql: "DELETE FROM entries WHERE collection = ?", args: [slug] }); console.log(`[seed] --only=${slug}: replacing`); }
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
