/* ============================================================
   PROGRAMMATIC SEO — Service × Location and Service × Industry
   landing pages (e.g. /digital-marketing-in-chandigarh,
   /seo-for-real-estate). Content is composed from real service,
   city and vertical data so every page is specific, not thin.
   ============================================================ */

export type PseoService = {
  slug: string;
  name: string; // "Digital Marketing"
  short: string; // "digital marketing" (lowercase, mid-sentence)
  blurb: string; // one line
  deliverables: string[];
  outcomes: string[]; // what the client walks away with
};

export type PseoPlace = {
  slug: string;
  name: string; // "Chandigarh"
  region: string; // "the Tricity"
  angle: string; // local market flavour
};

export type PseoIndustry = {
  slug: string;
  name: string; // "Real Estate"
  noun: string; // "real estate businesses"
  angle: string; // what the vertical needs
  challenge: string; // the core problem
};

export const PSEO_SERVICES: PseoService[] = [
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    short: "digital marketing",
    blurb: "A full-funnel growth engine, run by one in-house team.",
    deliverables: [
      "Channel strategy mapped to your funnel and margins",
      "SEO, Google Ads and Meta Ads managed together",
      "Landing pages and creative built to convert",
      "Conversion tracking, dashboards and monthly reporting",
      "A single team, no hand-offs between agencies",
    ],
    outcomes: [
      "More qualified leads at a lower cost per acquisition",
      "Marketing that compounds into an asset you own",
      "Clear reporting you can actually act on",
    ],
  },
  {
    slug: "seo",
    name: "SEO",
    short: "SEO",
    blurb: "Compounding organic visibility, technical to content.",
    deliverables: [
      "Technical audit and Core Web Vitals fixes",
      "Keyword and intent map for your market",
      "On-page optimisation and content plan",
      "Local SEO and Google Business Profile",
      "Authority building and clean reporting",
    ],
    outcomes: [
      "Rankings you own, not rented for a campaign",
      "Organic traffic that keeps working after the invoice",
      "A pipeline of high-intent visitors",
    ],
  },
  {
    slug: "google-ads",
    name: "Google Ads",
    short: "Google Ads",
    blurb: "Search and shopping that buys profit, not clicks.",
    deliverables: [
      "Account structure built around your economics",
      "Search, Performance Max and shopping campaigns",
      "Conversion tracking with GA4 and Google Tag Manager",
      "Landing pages and ad copy tuned for intent",
      "Weekly optimisation toward CPA and ROAS targets",
    ],
    outcomes: [
      "Spend that pays back, tracked to the rupee",
      "Lower cost per lead as the account learns",
      "Reporting that ties ad spend to revenue",
    ],
  },
  {
    slug: "meta-ads",
    name: "Meta Ads",
    short: "Meta Ads",
    blurb: "Feed-native creative that fills the top of the funnel.",
    deliverables: [
      "Full-funnel Meta and Instagram ad strategy",
      "Scroll-stopping creative and reels, in-house",
      "Audience testing, retargeting and lookalikes",
      "Pixel and Conversions API setup",
      "Creative iteration on the numbers",
    ],
    outcomes: [
      "Demand you can turn on and scale",
      "Creative that feeds your owned content library",
      "A predictable cost per result",
    ],
  },
  {
    slug: "social-media-marketing",
    name: "Social Media Marketing",
    short: "social media marketing",
    blurb: "An always-on presence that compounds audience.",
    deliverables: [
      "Monthly content calendar and strategy",
      "Reels, carousels and creative production",
      "Community management and engagement",
      "Paid social to amplify what works",
      "Analytics and monthly growth reporting",
    ],
    outcomes: [
      "A presence that builds real audience, not a treadmill",
      "Content you own and reuse across channels",
      "Consistent, on-brand output every week",
    ],
  },
  {
    slug: "web-development",
    name: "Web Development",
    short: "web development",
    blurb: "Fast, accessible, conversion-shaped sites and stores.",
    deliverables: [
      "Design and build on a modern, fast stack",
      "Core Web Vitals and mobile-first performance",
      "SEO-ready structure and clean markup",
      "CMS so your team can edit with ease",
      "Analytics, tracking and launch support",
    ],
    outcomes: [
      "A site that every campaign points back to",
      "Faster load, better rankings, more conversions",
      "An asset that improves with every cycle",
    ],
  },
  {
    slug: "branding",
    name: "Branding",
    short: "branding",
    blurb: "Identity systems that turn trust into sales.",
    deliverables: [
      "Brand strategy and positioning",
      "Logo, identity system and guidelines",
      "Collateral, social and campaign templates",
      "Messaging and tone of voice",
      "A brand kit your whole team can run",
    ],
    outcomes: [
      "Recognition that compounds, not a one-off logo",
      "A look that makes you the obvious choice",
      "Consistency across every surface",
    ],
  },
  {
    slug: "content-marketing",
    name: "Content Marketing",
    short: "content marketing",
    blurb: "Words built once into a system, reused everywhere.",
    deliverables: [
      "Content strategy mapped to search and buyer intent",
      "SEO articles, landing copy and social content",
      "Editorial calendar and briefs",
      "On-brand tone of voice",
      "Performance tracking and iteration",
    ],
    outcomes: [
      "Content that ranks and reads like a human wrote it",
      "A library that keeps pulling traffic and leads",
      "One voice across every channel",
    ],
  },
];

export const PSEO_PLACES: PseoPlace[] = [
  {
    slug: "chandigarh",
    name: "Chandigarh",
    region: "the Tricity",
    angle:
      "Chandigarh's market spans established retail, real estate and a fast-growing base of D2C and service brands, all competing for the same attention.",
  },
  {
    slug: "mohali",
    name: "Mohali",
    region: "the Tricity",
    angle:
      "Mohali blends a booming IT and startup scene with real estate and hospitality, so buyers here research online before they ever call.",
  },
  {
    slug: "panchkula",
    name: "Panchkula",
    region: "the Tricity",
    angle:
      "Panchkula's mix of local businesses, healthcare and premium retail rewards brands that show up first and look the part.",
  },
  {
    slug: "zirakpur",
    name: "Zirakpur",
    region: "the Tricity",
    angle:
      "Zirakpur is one of the fastest-growing belts in the region, with real estate, F&B and retail all fighting for local search visibility.",
  },
];

export const PSEO_INDUSTRIES: PseoIndustry[] = [
  {
    slug: "real-estate",
    name: "Real Estate",
    noun: "real estate businesses",
    angle: "high-intent local buyers, long decision cycles and trust that has to be earned before a site visit",
    challenge: "expensive leads and long sales cycles where trust decides the deal",
  },
  {
    slug: "d2c-ecommerce",
    name: "D2C & E-commerce",
    noun: "D2C and e-commerce brands",
    angle: "profitable acquisition, repeat purchase and creative that scales on paid",
    challenge: "rising ad costs and the need for creative that actually converts",
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    noun: "hospitality and F&B brands",
    angle: "footfall, bookings and a feed that makes people want to come in",
    challenge: "turning attention into reservations and repeat visits",
  },
  {
    slug: "fmcg",
    name: "FMCG",
    noun: "FMCG brands",
    angle: "reach, shelf-to-screen recall and demand that shows up at the point of sale",
    challenge: "building recall and demand across a crowded, price-led category",
  },
  {
    slug: "healthcare",
    name: "Healthcare & Wellness",
    noun: "healthcare and wellness brands",
    angle: "trust, credibility and compliant marketing that still converts",
    challenge: "earning trust and enquiries in a category where credibility is everything",
  },
  {
    slug: "saas",
    name: "SaaS & Tech",
    noun: "SaaS and tech companies",
    angle: "qualified demand, clear positioning and a funnel that turns trials into revenue",
    challenge: "explaining a complex product and generating demand that converts to pipeline",
  },
];

const bySlug = <T extends { slug: string }>(arr: T[], s: string) => arr.find((x) => x.slug === s);

export type PseoPage =
  | { kind: "location"; slug: string; service: PseoService; place: PseoPlace }
  | { kind: "industry"; slug: string; service: PseoService; industry: PseoIndustry };

/** Every generated slug, for generateStaticParams + sitemap. */
export function allPseoSlugs(): string[] {
  const out: string[] = [];
  for (const s of PSEO_SERVICES) {
    for (const p of PSEO_PLACES) out.push(`${s.slug}-in-${p.slug}`);
    for (const i of PSEO_INDUSTRIES) out.push(`${s.slug}-for-${i.slug}`);
  }
  return out;
}

/** Parse a slug into a page model, or null if it isn't a valid combo. */
export function getPseoPage(slug: string): PseoPage | null {
  for (const p of PSEO_PLACES) {
    const suffix = `-in-${p.slug}`;
    if (slug.endsWith(suffix)) {
      const service = bySlug(PSEO_SERVICES, slug.slice(0, -suffix.length));
      if (service) return { kind: "location", slug, service, place: p };
    }
  }
  for (const i of PSEO_INDUSTRIES) {
    const suffix = `-for-${i.slug}`;
    if (slug.endsWith(suffix)) {
      const service = bySlug(PSEO_SERVICES, slug.slice(0, -suffix.length));
      if (service) return { kind: "industry", slug, service, industry: i };
    }
  }
  return null;
}

export const heroFor = (service: PseoService) => `/pseo/${service.slug}.webp`;

/* ── Composed, human copy (no em-dashes) ── */

export function pseoTitle(page: PseoPage): string {
  return page.kind === "location"
    ? `${page.service.name} in ${page.place.name}`
    : `${page.service.name} for ${page.industry.name}`;
}

export function pseoMetaTitle(page: PseoPage): string {
  return page.kind === "location"
    ? `${page.service.name} Company in ${page.place.name} | Creative Monk`
    : `${page.service.name} for ${page.industry.name} | Creative Monk`;
}

export function pseoLede(page: PseoPage): string {
  if (page.kind === "location") {
    return `Creative Monk is a ${page.service.short} team working with ambitious brands across ${page.place.name} and ${page.place.region}. ${page.service.blurb} Everything in-house, engineered to compound into growth you own.`;
  }
  return `We run ${page.service.short} for ${page.industry.noun} that want ${page.industry.angle}. ${page.service.blurb} Built by one in-house team, with no hand-offs.`;
}

export function pseoOverview(page: PseoPage): string[] {
  const s = page.service;
  if (page.kind === "location") {
    return [
      `${page.place.angle} Winning here is less about doing more and more about doing ${s.short} that is actually tied to your numbers. That is where a focused, in-house team beats a scattered set of freelancers or a big agency that treats you as an account number.`,
      `We handle ${s.short} end to end for ${page.place.name} businesses, from strategy to the last pixel. Brand, web, content and performance sit under one roof, so nothing gets lost between hand-offs and every rupee of spend builds an asset you keep.`,
    ];
  }
  return [
    `For ${page.industry.noun}, the hard part is ${page.industry.challenge}. Generic ${s.short} does not move the needle here. What works is ${s.short} shaped around how buyers in your category actually research, decide and buy.`,
    `We have run ${s.short} across verticals like yours and build every engagement around your unit economics, not vanity metrics. One in-house team owns strategy, creative and performance, so the work pulls in the same direction.`,
  ];
}

export function pseoFaqs(page: PseoPage): { q: string; a: string }[] {
  const s = page.service;
  const where = page.kind === "location" ? page.place.name : page.industry.name;
  const common: { q: string; a: string }[] = [
    {
      q:
        page.kind === "location"
          ? `How much does ${s.short} cost in ${where}?`
          : `How much does ${s.short} for ${where} cost?`,
      a: `It depends on scope and goals. Most engagements run on a monthly retainer sized to your stage, and we scope it transparently after a short strategy call, with no lock-in games.`,
    },
    {
      q: `How soon will we see results?`,
      a: `Paid channels can move in weeks; ${s.short} that compounds, like SEO and brand, builds over months. We set honest milestones up front and report against them, not vanity metrics.`,
    },
    {
      q:
        page.kind === "location"
          ? `Do you only work with brands in ${where}?`
          : `Do you only work with ${page.industry.noun}?`,
      a:
        page.kind === "location"
          ? `We are based in the Tricity and love working with ${where} brands, but our system travels. We ship work for clients across India and beyond.`
          : `No. We work across categories, and the fundamentals of ${s.short} for ${where} apply whether you are local or national.`,
    },
    {
      q: `What makes Creative Monk different?`,
      a: `Everything is in-house, brand, web, content and performance. Nothing gets lost between agencies, and your spend builds an asset instead of renting attention.`,
    },
  ];
  return common;
}
