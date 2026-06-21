/* ============================================================
   SCHEMA REGISTRY — single source of truth for every content
   collection. Drives: API validation, public data shapes, and the
   entire schema-driven admin UI (tables, forms, filters, sheets).
   Exposed to the admin at GET /api/schema.
   ============================================================ */

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "boolean"
  | "slug"
  | "url"
  | "date"
  | "select"
  | "tags"
  | "paragraphs"
  | "image"
  | "video"
  | "color"
  | "object"
  | "objectList";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  help?: string;
  placeholder?: string;
  options?: string[]; // for select
  fields?: Field[]; // for object / objectList
  listColumn?: boolean; // show as a column in the admin table
  filterable?: boolean; // expose as a filter control
  default?: unknown;
};

export type Collection = {
  slug: string; // collection id (URL segment + entries.collection)
  name: string; // singular label
  pluralName: string;
  kind: "collection" | "singleton";
  group: string; // sidebar group
  icon: string; // lucide-react icon name
  description?: string;
  titleField?: string; // field used as the display title
  subtitleField?: string;
  slugField?: string; // field whose value is stored as entries.slug
  fields: Field[];
  public?: boolean; // exposed on unauthenticated GET (default true)
  intakeOnly?: boolean; // rows created by public intake, not admin "New"
  defaultSort?: "position" | "created_desc" | "created_asc";
};

const cta = (name: string, label: string): Field => ({
  name,
  label,
  type: "object",
  fields: [
    { name: "label", label: "Label", type: "text" },
    { name: "href", label: "Link", type: "text" },
  ],
});

export const SCHEMA: Collection[] = [
  /* ───────────────────────── SITE (singletons) ───────────────────────── */
  {
    slug: "site",
    name: "Site settings",
    pluralName: "Site settings",
    kind: "singleton",
    group: "Site",
    icon: "Settings",
    description: "Global brand details, contact info and social links.",
    titleField: "name",
    fields: [
      { name: "name", label: "Studio name", type: "text", required: true },
      { name: "tagline", label: "Tagline", type: "text" },
      { name: "promise", label: "Promise", type: "text" },
      { name: "email", label: "Email", type: "text" },
      { name: "phone", label: "Phone (display)", type: "text" },
      { name: "phoneHref", label: "Phone (tel:)", type: "text" },
      { name: "whatsapp", label: "WhatsApp link", type: "url" },
      { name: "address", label: "Address", type: "textarea" },
      { name: "city", label: "City line", type: "text" },
      { name: "founded", label: "Founded", type: "number" },
      {
        name: "socials",
        label: "Social links",
        type: "objectList",
        fields: [
          { name: "label", label: "Platform", type: "text" },
          { name: "handle", label: "Handle", type: "text" },
          { name: "href", label: "Link", type: "url" },
        ],
      },
    ],
  },
  {
    slug: "home_hero",
    name: "Home hero",
    pluralName: "Home hero",
    kind: "singleton",
    group: "Site",
    icon: "Sparkles",
    description: "The headline block at the top of the homepage.",
    titleField: "accentWord",
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text" },
      { name: "headline", label: "Headline lines", type: "tags", help: "Each entry is a line in the animated headline." },
      { name: "accentWord", label: "Accent word", type: "text" },
      { name: "sub", label: "Sub-headline", type: "textarea" },
      cta("ctaPrimary", "Primary CTA"),
      cta("ctaSecondary", "Secondary CTA"),
    ],
  },
  {
    slug: "story",
    name: "Studio story",
    pluralName: "Studio story",
    kind: "singleton",
    group: "Site",
    icon: "BookOpen",
    titleField: "kicker",
    fields: [
      { name: "index", label: "Index", type: "text" },
      { name: "kicker", label: "Kicker", type: "text" },
      { name: "q", label: "Question", type: "text" },
      { name: "a", label: "Answer", type: "textarea" },
      { name: "signature", label: "Signature", type: "text" },
    ],
  },
  {
    slug: "review_summary",
    name: "Review summary",
    pluralName: "Review summary",
    kind: "singleton",
    group: "Site",
    icon: "Star",
    titleField: "rating",
    fields: [
      { name: "rating", label: "Rating", type: "text" },
      { name: "count", label: "Count", type: "text" },
      { name: "platforms", label: "Platforms", type: "text" },
    ],
  },
  {
    slug: "locations",
    name: "Locations",
    pluralName: "Locations",
    kind: "singleton",
    group: "Site",
    icon: "MapPin",
    titleField: "india",
    fields: [
      { name: "india", label: "India", type: "tags" },
      { name: "global", label: "Global", type: "tags" },
    ],
  },
  {
    slug: "footer_groups",
    name: "Footer column",
    pluralName: "Footer columns",
    kind: "collection",
    group: "Site",
    icon: "PanelBottom",
    titleField: "title",
    fields: [
      { name: "title", label: "Column title", type: "text", required: true, listColumn: true },
      {
        name: "links",
        label: "Links",
        type: "objectList",
        fields: [
          { name: "label", label: "Label", type: "text" },
          { name: "href", label: "Link", type: "text" },
        ],
      },
    ],
  },

  /* ───────────────────────── SERVICES ───────────────────────── */
  {
    slug: "services",
    name: "Service",
    pluralName: "Services",
    kind: "collection",
    group: "Services",
    icon: "LayoutGrid",
    titleField: "title",
    slugField: "id",
    fields: [
      { name: "index", label: "Index", type: "text", listColumn: true },
      { name: "id", label: "Key", type: "slug", required: true },
      { name: "title", label: "Title", type: "text", required: true, listColumn: true },
      { name: "blurb", label: "Blurb", type: "textarea" },
      { name: "capabilities", label: "Capabilities", type: "tags" },
      { name: "deliverables", label: "Deliverables", type: "tags" },
      {
        name: "outcome",
        label: "Outcome",
        type: "object",
        fields: [
          { name: "value", label: "Value", type: "text" },
          { name: "label", label: "Label", type: "text" },
        ],
      },
    ],
  },
  {
    slug: "service_categories",
    name: "Service category",
    pluralName: "Service categories",
    kind: "collection",
    group: "Services",
    icon: "FolderTree",
    description: "Mega-menu categories and the /services/[slug] pages.",
    titleField: "name",
    slugField: "slug",
    fields: [
      { name: "index", label: "Index", type: "text", listColumn: true },
      { name: "slug", label: "Slug", type: "slug", required: true, listColumn: true },
      { name: "name", label: "Name", type: "text", required: true, listColumn: true },
      { name: "tagline", label: "Tagline", type: "text", listColumn: true },
      { name: "intro", label: "Intro", type: "textarea" },
      {
        name: "items",
        label: "Sub-services",
        type: "objectList",
        fields: [
          { name: "slug", label: "Slug", type: "slug" },
          { name: "name", label: "Name", type: "text" },
          { name: "desc", label: "Description", type: "text" },
        ],
      },
    ],
  },
  {
    slug: "services_grid",
    name: "Service (grid)",
    pluralName: "Services grid",
    kind: "collection",
    group: "Services",
    icon: "Grid3x3",
    description: "The 12-up capabilities grid.",
    titleField: "title",
    fields: [
      { name: "no", label: "No.", type: "text", listColumn: true },
      { name: "title", label: "Title", type: "text", required: true, listColumn: true },
      { name: "desc", label: "Description", type: "textarea" },
    ],
  },
  {
    slug: "service_pages",
    name: "Service page",
    pluralName: "Service pages",
    kind: "collection",
    group: "Services",
    icon: "FileText",
    description: "Dedicated internal page for each sub-service (e.g. /services/content/content-strategy).",
    titleField: "name",
    subtitleField: "category",
    slugField: "slug",
    defaultSort: "position",
    fields: [
      {
        name: "category",
        label: "Category",
        type: "select",
        options: ["content", "creatives", "marketing", "development"],
        required: true,
        listColumn: true,
        filterable: true,
      },
      { name: "slug", label: "Slug", type: "slug", required: true, listColumn: true },
      { name: "name", label: "Name", type: "text", required: true, listColumn: true },
      { name: "tagline", label: "Tagline", type: "text", listColumn: true },
      { name: "intro", label: "Intro", type: "textarea" },
      { name: "cover", label: "Cover image", type: "image" },
      { name: "overview", label: "Overview", type: "paragraphs", help: "Each entry is a paragraph." },
      { name: "deliverables", label: "What's included", type: "tags" },
      {
        name: "highlights",
        label: "Highlights",
        type: "objectList",
        fields: [
          { name: "title", label: "Title", type: "text" },
          { name: "desc", label: "Description", type: "textarea" },
        ],
      },
      {
        name: "process",
        label: "Process",
        type: "objectList",
        fields: [
          { name: "step", label: "Step", type: "text" },
          { name: "title", label: "Title", type: "text" },
          { name: "body", label: "Body", type: "textarea" },
        ],
      },
      {
        name: "metric",
        label: "Headline metric",
        type: "object",
        fields: [
          { name: "value", label: "Value", type: "text" },
          { name: "label", label: "Label", type: "text" },
        ],
      },
      {
        name: "faqs",
        label: "FAQs",
        type: "objectList",
        fields: [
          { name: "q", label: "Question", type: "text" },
          { name: "a", label: "Answer", type: "textarea" },
        ],
      },
    ],
  },

  /* ───────────────────────── WORK ───────────────────────── */
  {
    slug: "cases",
    name: "Case study",
    pluralName: "Case studies",
    kind: "collection",
    group: "Work",
    icon: "Briefcase",
    titleField: "title",
    subtitleField: "client",
    slugField: "id",
    fields: [
      { name: "id", label: "Slug", type: "slug", required: true },
      { name: "client", label: "Client", type: "text", required: true, listColumn: true },
      { name: "title", label: "Title", type: "text", required: true, listColumn: true },
      { name: "category", label: "Categories", type: "tags", listColumn: true, filterable: true },
      { name: "year", label: "Year", type: "text", listColumn: true, filterable: true },
      { name: "result", label: "Result", type: "textarea" },
      {
        name: "metric",
        label: "Headline metric",
        type: "object",
        fields: [
          { name: "value", label: "Value", type: "text" },
          { name: "label", label: "Label", type: "text" },
        ],
      },
      { name: "accent", label: "Accent (deg)", type: "text" },
      { name: "cover", label: "Cover image", type: "image" },
    ],
  },
  {
    slug: "reels",
    name: "Reel",
    pluralName: "Reels",
    kind: "collection",
    group: "Work",
    icon: "Film",
    titleField: "title",
    slugField: "id",
    fields: [
      { name: "id", label: "Key", type: "slug", required: true },
      { name: "title", label: "Title", type: "text", required: true, listColumn: true },
      { name: "category", label: "Category", type: "text", listColumn: true, filterable: true },
      { name: "ratio", label: "Ratio", type: "select", options: ["9/16", "1/1", "16/9"], listColumn: true },
      { name: "accent", label: "Accent (deg)", type: "text" },
      { name: "src", label: "Video", type: "video" },
      { name: "poster", label: "Poster", type: "image" },
    ],
  },
  {
    slug: "video_projects",
    name: "Video project",
    pluralName: "Video projects",
    kind: "collection",
    group: "Work",
    icon: "Clapperboard",
    titleField: "title",
    slugField: "id",
    fields: [
      { name: "id", label: "Key", type: "slug", required: true },
      { name: "title", label: "Title", type: "text", required: true, listColumn: true },
      { name: "category", label: "Category", type: "text", listColumn: true, filterable: true },
    ],
  },

  /* ───────────────────────── BLOG ───────────────────────── */
  {
    slug: "posts",
    name: "Post",
    pluralName: "Blog posts",
    kind: "collection",
    group: "Blog",
    icon: "Newspaper",
    titleField: "title",
    slugField: "slug",
    defaultSort: "created_desc",
    fields: [
      { name: "slug", label: "Slug", type: "slug", required: true },
      { name: "title", label: "Title", type: "text", required: true, listColumn: true },
      { name: "excerpt", label: "Excerpt", type: "textarea" },
      { name: "category", label: "Category", type: "text", listColumn: true, filterable: true },
      { name: "date", label: "Date", type: "date", listColumn: true },
      { name: "read", label: "Read time", type: "text" },
      { name: "cover", label: "Cover image", type: "image" },
      { name: "body", label: "Body", type: "paragraphs", help: "Each entry is a paragraph." },
    ],
  },

  /* ───────────────────────── PEOPLE ───────────────────────── */
  {
    slug: "team",
    name: "Team member",
    pluralName: "Team",
    kind: "collection",
    group: "People",
    icon: "Users",
    titleField: "name",
    subtitleField: "role",
    fields: [
      { name: "name", label: "Name", type: "text", required: true, listColumn: true },
      { name: "role", label: "Role", type: "text", listColumn: true },
      { name: "photo", label: "Photo", type: "image" },
    ],
  },
  {
    slug: "roles",
    name: "Open role",
    pluralName: "Careers",
    kind: "collection",
    group: "People",
    icon: "BriefcaseBusiness",
    titleField: "title",
    fields: [
      { name: "title", label: "Title", type: "text", required: true, listColumn: true },
      { name: "team", label: "Team", type: "text", listColumn: true, filterable: true },
      {
        name: "type",
        label: "Type",
        type: "select",
        options: ["Full-time", "Part-time", "Contract", "Internship"],
        listColumn: true,
        filterable: true,
      },
      { name: "location", label: "Location", type: "text", listColumn: true },
    ],
  },

  /* ───────────────────────── SOCIAL PROOF ───────────────────────── */
  {
    slug: "reviews",
    name: "Review",
    pluralName: "Reviews",
    kind: "collection",
    group: "Social proof",
    icon: "MessageSquareQuote",
    titleField: "name",
    subtitleField: "role",
    fields: [
      { name: "name", label: "Name", type: "text", required: true, listColumn: true },
      { name: "role", label: "Role", type: "text", listColumn: true },
      { name: "rating", label: "Rating", type: "number", listColumn: true },
      { name: "quote", label: "Quote", type: "textarea" },
      { name: "service", label: "Service", type: "text", listColumn: true, filterable: true },
    ],
  },
  {
    slug: "faqs",
    name: "FAQ",
    pluralName: "FAQs",
    kind: "collection",
    group: "Social proof",
    icon: "HelpCircle",
    titleField: "q",
    fields: [
      { name: "q", label: "Question", type: "text", required: true, listColumn: true },
      { name: "a", label: "Answer", type: "textarea" },
    ],
  },
  {
    slug: "industries",
    name: "Industry",
    pluralName: "Industries",
    kind: "collection",
    group: "Social proof",
    icon: "Building2",
    titleField: "name",
    fields: [
      { name: "name", label: "Name", type: "text", required: true, listColumn: true },
      { name: "blurb", label: "Blurb", type: "textarea" },
    ],
  },
  {
    slug: "values",
    name: "Value",
    pluralName: "Values",
    kind: "collection",
    group: "Social proof",
    icon: "Gem",
    titleField: "title",
    fields: [
      { name: "no", label: "No.", type: "text", listColumn: true },
      { name: "title", label: "Title", type: "text", required: true, listColumn: true },
      { name: "body", label: "Body", type: "textarea" },
    ],
  },
  {
    slug: "process",
    name: "Process step",
    pluralName: "Process",
    kind: "collection",
    group: "Social proof",
    icon: "ListOrdered",
    titleField: "title",
    fields: [
      { name: "step", label: "Step", type: "text", listColumn: true },
      { name: "title", label: "Title", type: "text", required: true, listColumn: true },
      { name: "body", label: "Body", type: "textarea" },
    ],
  },

  /* ───────────────────────── LISTS ───────────────────────── */
  {
    slug: "stats",
    name: "Stat",
    pluralName: "Stats",
    kind: "collection",
    group: "Lists",
    icon: "BarChart3",
    titleField: "label",
    fields: [
      {
        name: "group",
        label: "Group",
        type: "select",
        options: ["stat_bar", "timeline", "culture", "home"],
        listColumn: true,
        filterable: true,
      },
      { name: "value", label: "Value", type: "text", listColumn: true },
      { name: "suffix", label: "Suffix", type: "text" },
      { name: "label", label: "Label", type: "text", required: true, listColumn: true },
    ],
  },
  {
    slug: "pricing",
    name: "Pricing tier",
    pluralName: "Pricing",
    kind: "collection",
    group: "Lists",
    icon: "Wallet",
    titleField: "name",
    fields: [
      { name: "name", label: "Name", type: "text", required: true, listColumn: true },
      { name: "tag", label: "Tag", type: "text" },
      { name: "price", label: "Price", type: "text", listColumn: true },
      { name: "cadence", label: "Cadence", type: "text" },
      { name: "features", label: "Features", type: "tags" },
      { name: "featured", label: "Featured", type: "boolean", listColumn: true },
    ],
  },
  {
    slug: "awards",
    name: "Award",
    pluralName: "Awards",
    kind: "collection",
    group: "Lists",
    icon: "Trophy",
    titleField: "title",
    fields: [
      { name: "title", label: "Title", type: "text", required: true, listColumn: true },
      { name: "org", label: "Organisation", type: "text", listColumn: true },
      { name: "year", label: "Year", type: "text", listColumn: true },
    ],
  },
  {
    slug: "tools",
    name: "Tool",
    pluralName: "Tools",
    kind: "collection",
    group: "Lists",
    icon: "Wrench",
    titleField: "name",
    fields: [{ name: "name", label: "Name", type: "text", required: true, listColumn: true }],
  },
  {
    slug: "certs",
    name: "Certification",
    pluralName: "Certifications",
    kind: "collection",
    group: "Lists",
    icon: "BadgeCheck",
    titleField: "name",
    fields: [{ name: "name", label: "Name", type: "text", required: true, listColumn: true }],
  },
  {
    slug: "marquee",
    name: "Marquee item",
    pluralName: "Marquee",
    kind: "collection",
    group: "Lists",
    icon: "Megaphone",
    titleField: "name",
    fields: [{ name: "name", label: "Label", type: "text", required: true, listColumn: true }],
  },
  {
    slug: "benefits",
    name: "Benefit",
    pluralName: "Benefits",
    kind: "collection",
    group: "Lists",
    icon: "HeartHandshake",
    titleField: "name",
    fields: [{ name: "name", label: "Label", type: "text", required: true, listColumn: true }],
  },

  /* ───────────────────────── INBOX ───────────────────────── */
  {
    slug: "leads",
    name: "Lead",
    pluralName: "Leads",
    kind: "collection",
    group: "Inbox",
    icon: "Inbox",
    description: "Contact-form submissions from the website.",
    titleField: "name",
    subtitleField: "email",
    public: false,
    intakeOnly: true,
    defaultSort: "created_desc",
    fields: [
      { name: "name", label: "Name", type: "text", required: true, listColumn: true },
      { name: "email", label: "Email", type: "text", listColumn: true },
      { name: "phone", label: "Phone", type: "text" },
      { name: "company", label: "Company", type: "text", listColumn: true },
      { name: "budget", label: "Budget", type: "text", filterable: true },
      { name: "service", label: "Service", type: "text", filterable: true },
      { name: "message", label: "Message", type: "textarea" },
      { name: "source", label: "Source", type: "text" },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: ["new", "contacted", "qualified", "won", "lost"],
        listColumn: true,
        filterable: true,
        default: "new",
      },
    ],
  },
  {
    slug: "subscribers",
    name: "Subscriber",
    pluralName: "Subscribers",
    kind: "collection",
    group: "Inbox",
    icon: "Mail",
    description: "Newsletter sign-ups.",
    titleField: "email",
    public: false,
    intakeOnly: true,
    defaultSort: "created_desc",
    fields: [
      { name: "email", label: "Email", type: "text", required: true, listColumn: true },
      { name: "source", label: "Source", type: "text", listColumn: true },
    ],
  },
];

const BY_SLUG = new Map(SCHEMA.map((c) => [c.slug, c]));

export function getCollection(slug: string): Collection | undefined {
  return BY_SLUG.get(slug);
}

export function isPublic(slug: string): boolean {
  const c = BY_SLUG.get(slug);
  return Boolean(c && c.public !== false);
}
