/* Seed content for modular case-study showcase blocks. Edit in the admin. */
const U = (id: string, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const G = (ids: string[], caps: string[]) =>
  ids.map((id, i) => ({ image: U(id), caption: caps[i] || "" }));

export const CASE_SECTIONS = [
  /* ─────────── Sunburst Foods (FMCG: brand · social · motion) ─────────── */
  {
    case: "sunburst",
    kind: "gallery",
    discipline: "Creatives",
    title: "A heritage brand, re-lit",
    intro: "Identity, packaging and a social creative system built in-house.",
    images: G(
      ["1606914501449-5a96b6ce24ca", "1556745757-8d76bdb6984b", "1605000797499-95a51c5269ae", "1600880292203-757bb62b4baf", "1604147706283-d7119b5b822c", "1626785774573-4b799315345d"],
      ["Logo & wordmark", "Packaging system", "Range refresh", "Brand guidelines", "Campaign key visual", "Social templates"],
    ),
  },
  {
    case: "sunburst",
    kind: "marketing",
    discipline: "Marketing",
    title: "Attention that turned into demand",
    intro: "An always-on social engine, measured against the P&L — not vanity metrics.",
    stats: [
      { label: "Engagement lift", value: "3.4", suffix: "×" },
      { label: "Organic reach", value: "+186", suffix: "%" },
      { label: "Content cost / asset", value: "-41", suffix: "%" },
    ],
  },
  {
    case: "sunburst",
    kind: "quote",
    quote: "Our reels finally feel like us. Reach tripled and it still feels effortless on their side.",
    author: "Karan Bedi, CMO — Sunburst Foods",
  },

  /* ─────────── Aether Skincare (D2C: web · performance · seo) ─────────── */
  {
    case: "aether",
    kind: "website",
    discipline: "Development",
    title: "A Shopify store that loads fast and sells harder",
    intro: "Headless front end, conversion-shaped PDPs, sub-second loads.",
    url: "aether.store",
  },
  {
    case: "aether",
    kind: "marketing",
    discipline: "Performance",
    title: "Profitable acquisition in 90 days",
    intro: "Paid social and search tuned to contribution margin, not last-click.",
    stats: [
      { label: "Blended ROAS", value: "4.1", suffix: "×" },
      { label: "Cost per acquisition", value: "-38", suffix: "%" },
      { label: "Repeat purchase rate", value: "27", suffix: "%" },
    ],
  },
  {
    case: "aether",
    kind: "seo",
    discipline: "SEO",
    title: "Organic that compounds",
    intro: "Technical fixes plus an ingredient-led content cluster.",
    keywords: ["vitamin c serum", "barrier repair cream", "fragrance-free moisturiser", "niacinamide serum india", "ceramide cleanser", "best d2c skincare"],
    stats: [
      { label: "Organic sessions", value: "+212", suffix: "%" },
      { label: "Page-1 keywords", value: "140", suffix: "+" },
      { label: "Avg. position", value: "4.2" },
    ],
  },

  /* ─────────── Meridian Realty (web · lead gen · seo) ─────────── */
  {
    case: "meridian",
    kind: "website",
    discipline: "Development",
    title: "A flagship microsite, sold before launch",
    intro: "Cinematic project microsite with an integrated lead funnel.",
    url: "meridian-skyline.in",
  },
  {
    case: "meridian",
    kind: "seo",
    discipline: "SEO & Lead Gen",
    title: "Found by buyers with intent",
    intro: "Local + intent SEO feeding a qualified-lead pipeline.",
    keywords: ["luxury apartments gurgaon", "3bhk sector 65", "premium flats near cyber hub", "ready to move luxury homes"],
    stats: [
      { label: "Qualified leads", value: "1,200", suffix: "+" },
      { label: "Cost per lead", value: "-47", suffix: "%" },
      { label: "Map-pack rank", value: "#1" },
    ],
  },
  {
    case: "meridian",
    kind: "content",
    discipline: "Content",
    title: "The story behind the skyline",
    body: [
      "Premium real estate sells on belief long before a site visit. We built the narrative spine for the launch — positioning, neighbourhood story and a buyer journey that answers the quiet objections most brochures ignore.",
      "Every page was written to do a job: the hero to stop the scroll, the floor-plan section to build confidence, the enquiry step to feel like a natural next move rather than a sales gate. The copy and the funnel were designed together, not bolted on.",
    ],
  },

  /* ─────────── Kettle & Co. (brand · e-commerce · reels) ─────────── */
  {
    case: "kettle",
    kind: "gallery",
    discipline: "Creatives",
    title: "Specialty coffee with a cult following",
    intro: "Identity, packaging and a reel series that travels.",
    images: G(
      ["1447933601403-0c6688de566e", "1559056199-641a0ac8b55e", "1442512595331-e89e73853f31", "1509042239860-f550ce710b93", "1461023058943-07fcbe16d735", "1495474472287-4d71bcdd2085"],
      ["Brand mark", "Bag system", "Roast labels", "Cafe collateral", "Merch", "Reel stills"],
    ),
  },
  {
    case: "kettle",
    kind: "marketing",
    discipline: "Social & Reels",
    title: "Reels that travel",
    intro: "Short-form built to be watched twice — and shared once.",
    stats: [
      { label: "Organic reach", value: "+212", suffix: "%" },
      { label: "Avg. watch-through", value: "68", suffix: "%" },
      { label: "Followers (6 mo)", value: "+34k" },
    ],
  },
  {
    case: "kettle",
    kind: "quote",
    quote: "From packaging to paid, everything matched. Organic reach is up triple digits and climbing.",
    author: "Nadia Khan, Founder — Kettle & Co.",
  },

  /* ─────────── Pulse Fitness (local seo · social · motion) ─────────── */
  {
    case: "pulse",
    kind: "seo",
    discipline: "Local SEO",
    title: "Local, made to feel national",
    intro: "A local marketing system across six locations.",
    keywords: ["gym near me", "crossfit chandigarh", "personal trainer mohali", "best fitness studio zirakpur", "24x7 gym panchkula"],
    stats: [
      { label: "Map rank", value: "#1", suffix: " · 6 cities" },
      { label: "Direction requests", value: "+240", suffix: "%" },
      { label: "Calls from search", value: "+3.1", suffix: "×" },
    ],
  },
  {
    case: "pulse",
    kind: "gallery",
    discipline: "Creatives",
    title: "Social that earns the sweat",
    intro: "A monthly motion + social creative package per location.",
    images: G(
      ["1534438327276-14e5300c3a48", "1571902943202-507ec2618e8f", "1517836357463-d25dfeac3438", "1605296867304-46d5465a13f1", "1518611012118-696072aa579a", "1583454110551-21f2fa2afe61"],
      ["Launch creative", "Class promos", "Trainer reels", "Offer campaign", "Member stories", "Motion templates"],
    ),
  },

  /* ─────────── Northwind Travel (web · content · ppc) ─────────── */
  {
    case: "northwind",
    kind: "website",
    discipline: "Development",
    title: "Wanderlust, engineered into bookings",
    intro: "A content-led site with itineraries that convert browsers into bookings.",
    url: "northwind.travel",
  },
  {
    case: "northwind",
    kind: "content",
    discipline: "Content",
    title: "A content engine that books trips",
    body: [
      "Travel is researched obsessively and booked emotionally. We built a content engine around the questions travellers actually ask — when to go, what it costs, what it feels like — and tied each guide to a bookable itinerary.",
      "The result was a library that does double duty: it ranks for high-intent searches and warms readers toward a booking, so the same article that earns the click also earns the enquiry.",
    ],
  },
  {
    case: "northwind",
    kind: "marketing",
    discipline: "Performance",
    title: "Lower cost, higher volume",
    intro: "Search and paid social working with the content, not against it.",
    stats: [
      { label: "Cost per lead", value: "-62", suffix: "%" },
      { label: "Booking volume", value: "+2.4", suffix: "×" },
      { label: "Organic share of leads", value: "55", suffix: "%" },
    ],
  },
] as const;
