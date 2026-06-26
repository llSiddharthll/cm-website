/* ============================================================
   CMS DATA LAYER
   Server-side getters that fetch from the Creative Monk API and
   fall back to the bundled static content when the API is not
   configured or unreachable — so the site never breaks.

   Set NEXT_PUBLIC_API_URL (or API_URL) to the deployed backend to
   go fully dynamic. Each getter returns the SAME shape the static
   constants used, so components are drop-in.
   ============================================================ */
import {
  SITE,
  SERVICES,
  CASES,
  PROCESS,
  STATS,
  REELS,
  type Service,
  type CaseStudy,
  type Reel,
} from "./content";
import {
  AGENCY_HERO,
  AGENCY_STORY,
  STAT_BAR,
  TIMELINE,
  CULTURE_STATS,
  TOOLS,
  SERVICES_12,
  VIDEO_PROJECTS,
  CERTS,
  PRICING,
  REVIEWS,
  REVIEW_SUMMARY,
  FAQS,
  BENEFITS,
  LOCATIONS,
  FOOTER_LINKS,
  TEAM,
  VALUES,
  INDUSTRIES,
  ROLES,
  POSTS,
  SERVICE_CATEGORIES,
  type GridService,
  type VideoProject,
  type Review,
  type Member,
  type Role,
  type Post,
  type ServiceCategory,
} from "./agency";

const API_URL = (process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
const REVALIDATE = Number(process.env.CMS_REVALIDATE || 60);

export const cmsEnabled = Boolean(API_URL);

type Meta = { _id?: string; _slug?: string; _status?: string; _position?: number };

async function cmsFetch<T>(path: string): Promise<T | null> {
  if (!API_URL) return null;
  try {
    const res = await fetch(`${API_URL}/api${path}`, {
      next: { revalidate: REVALIDATE, tags: ["cms"] },
      // don't let a cold/hung backend stall SSR — fall back to static content
      signal: AbortSignal.timeout(Number(process.env.CMS_TIMEOUT_MS || 4000)),
    });
    if (!res.ok) {
      console.warn(`[cms] ${path} → ${res.status}; using static fallback`);
      return null;
    }
    return (await res.json()) as T;
  } catch (err) {
    console.warn(`[cms] ${path} failed (${(err as Error).name}); using static fallback`);
    return null;
  }
}

/** Fetch a collection; fall back to `fallback` on any failure/empty. */
async function collection<T>(slug: string, fallback: readonly T[]): Promise<(T & Meta)[]> {
  const data = await cmsFetch<(T & Meta)[]>(`/content/${slug}`);
  if (!data || !Array.isArray(data) || data.length === 0)
    return fallback as unknown as (T & Meta)[];
  return data;
}

/** Fetch a singleton; fall back on failure. */
async function singleton<T>(slug: string, fallback: T): Promise<T & Meta> {
  const data = await cmsFetch<T & Meta>(`/content/${slug}`);
  if (!data || typeof data !== "object") return fallback as T & Meta;
  return data;
}

/* ───────────── Site / singletons ───────────── */

export type SiteData = typeof SITE;
export const getSite = () => singleton<SiteData>("site", SITE);

export type HomeHero = typeof AGENCY_HERO;
export const getHomeHero = () => singleton<HomeHero>("home_hero", AGENCY_HERO);

export type Story = typeof AGENCY_STORY;
export const getStory = () => singleton<Story>("story", AGENCY_STORY);

export type ReviewSummary = typeof REVIEW_SUMMARY;
export const getReviewSummary = () => singleton<ReviewSummary>("review_summary", REVIEW_SUMMARY);

export type Locations = typeof LOCATIONS;
export const getLocations = () => singleton<Locations>("locations", LOCATIONS);

/* footer columns → array of { title, links } */
export type FooterGroup = { title: string; links: { label: string; href: string }[] };
const FOOTER_FALLBACK: FooterGroup[] = Object.entries(FOOTER_LINKS).map(([title, links]) => ({
  title,
  links: links as { label: string; href: string }[],
}));
export const getFooterGroups = () => collection<FooterGroup>("footer_groups", FOOTER_FALLBACK);

/* ───────────── Stats (grouped) ───────────── */

export type Stat = { group?: string; value: string; suffix?: string; label: string };
async function statsByGroup(group: string, fallback: readonly Stat[]): Promise<Stat[]> {
  const all = await cmsFetch<(Stat & Meta)[]>(`/content/stats`);
  if (!all || !Array.isArray(all) || all.length === 0) return fallback as Stat[];
  const filtered = all.filter((s) => s.group === group);
  return filtered.length ? filtered : (fallback as Stat[]);
}
export const getStatBar = () => statsByGroup("stat_bar", STAT_BAR);
export const getTimeline = () => statsByGroup("timeline", TIMELINE);
export const getCultureStats = () => statsByGroup("culture", CULTURE_STATS);
export const getHomeStats = () => statsByGroup("home", STATS as unknown as readonly Stat[]);

/* ───────────── Collections ───────────── */

export const getServices = () => collection<Service>("services", SERVICES);
export const getServiceCategories = () => collection<ServiceCategory>("service_categories", SERVICE_CATEGORIES);
export const getServicesGrid = () => collection<GridService>("services_grid", SERVICES_12);
export const getCases = () => collection<CaseStudy>("cases", CASES);
export const getReels = () => collection<Reel>("reels", REELS);

export type CaseSection = {
  case: string;
  kind: "gallery" | "website" | "marketing" | "seo" | "content" | "quote";
  discipline?: string;
  title?: string;
  intro?: string;
  body?: string[];
  images?: { image: string; caption?: string }[];
  screenshot?: string;
  url?: string;
  stats?: { label: string; value: string; suffix?: string }[];
  keywords?: string[];
  quote?: string;
  author?: string;
};
export const getCaseSections = () => collection<CaseSection>("case_sections", []);
export async function getCaseSectionsFor(caseId: string): Promise<(CaseSection & Meta)[]> {
  const all = await getCaseSections();
  return all.filter((s) => s.case === caseId);
}
export const getVideoProjects = () => collection<VideoProject>("video_projects", VIDEO_PROJECTS);
export const getPosts = () => collection<Post>("posts", POSTS);
export const getTeam = () => collection<Member>("team", TEAM);
export const getRoles = () => collection<Role>("roles", ROLES);
export const getReviews = () => collection<Review>("reviews", REVIEWS);

export type Client = { name: string; sector?: string; works?: string[]; url?: string; logo?: string; featured?: boolean };
const CLIENTS_FALLBACK: Client[] = [
  { name: "Tvisva", sector: "Jewellery", featured: true },
  { name: "White Wolf", sector: "Men's Grooming", featured: true, logo: "/work/logos/white-wolf.png" },
  { name: "Avenry", sector: "Restaurant & Café", featured: true, logo: "/work/logos/avenry.png" },
  { name: "Best Western Plus Mohali", sector: "Hospitality", featured: true },
  { name: "Chatha Foods", sector: "Processed & Frozen Food", featured: true },
  { name: "IBC — Indian Business Centre", sector: "Real Estate", featured: true },
  { name: "Veloire", sector: "Beauty & Fashion", logo: "/work/logos/veloire.png" },
  { name: "Inaysha", sector: "Beauty & Fashion" },
  { name: "Fabie", sector: "Beauty Salon" },
  { name: "Al Palm", sector: "Restaurant & Café" },
  { name: "Binny's Kitchen", sector: "Restaurant & Café" },
  { name: "Café Zoya", sector: "Café", logo: "/work/logos/cafe-zoya.png" },
  { name: "Zafraan", sector: "Restaurant" },
  { name: "Ascure", sector: "Real Estate" },
  { name: "CP.67 Offices", sector: "Real Estate" },
  { name: "Felicity Adobe", sector: "Real Estate" },
  { name: "Felix Plaza", sector: "Real Estate" },
  { name: "Trix", sector: "Lighting" },
  { name: "Export House", sector: "Handloom & Retail" },
  { name: "CII Coolex", sector: "Events & Exhibition" },
  { name: "Yukti Herbs", sector: "Ayurveda & Wellness", logo: "/work/logos/yukti-herbs.png" },
  { name: "Ayutrust Ayurveda", sector: "Ayurveda & Healthcare" },
  { name: "Skyeline", sector: "Food & Beverage" },
];
export const getClients = () => collection<Client>("clients", CLIENTS_FALLBACK);
export const getFaqs = () => collection<{ q: string; a: string }>("faqs", FAQS);
export const getIndustries = () => collection<{ name: string; blurb: string }>("industries", INDUSTRIES);
export const getValues = () => collection<{ no: string; title: string; body: string }>("values", VALUES);
export const getProcess = () => collection<{ step: string; title: string; body: string }>("process", PROCESS);
export const getPricing = () => collection("pricing", PRICING);

/* string lists */
async function nameList(slug: string, fallback: readonly string[]): Promise<string[]> {
  const data = await cmsFetch<({ name: string } & Meta)[]>(`/content/${slug}`);
  if (!data || !Array.isArray(data) || data.length === 0) return fallback as string[];
  return data.map((d) => d.name);
}
export const getTools = () => nameList("tools", TOOLS);
export const getCerts = () => nameList("certs", CERTS);
export const getBenefits = () => nameList("benefits", BENEFITS);

/* ───────────── Service pages (per sub-service internal pages) ───────────── */

export type ServicePage = {
  category: string;
  slug: string;
  name: string;
  tagline?: string;
  intro?: string;
  cover?: string;
  overview?: string[];
  deliverables?: string[];
  highlights?: { title: string; desc: string }[];
  process?: { step: string; title: string; body: string }[];
  metric?: { value: string; label: string };
  faqs?: { q: string; a: string }[];
};

// Minimal fallback derived from the bundled categories, so pages still render
// (intro only) if the backend isn't reachable.
const SERVICE_PAGES_FALLBACK: ServicePage[] = SERVICE_CATEGORIES.flatMap((c) =>
  c.items.map((it) => ({
    category: c.slug,
    slug: it.slug,
    name: it.name,
    tagline: it.desc,
    intro: it.desc,
  })),
);

export const getServicePages = () => collection<ServicePage>("service_pages", SERVICE_PAGES_FALLBACK);

export async function getServicePagesByCategory(category: string): Promise<(ServicePage & Meta)[]> {
  const all = await getServicePages();
  return all.filter((p) => p.category === category);
}

export async function getServicePage(
  category: string,
  slug: string,
): Promise<(ServicePage & Meta) | null> {
  const all = await getServicePages();
  return all.find((p) => p.category === category && p.slug === slug) ?? null;
}

/* single lookups */
export async function getServiceCategory(slug: string): Promise<(ServiceCategory & Meta) | null> {
  const all = await getServiceCategories();
  return all.find((c) => c.slug === slug) ?? null;
}
export async function getPost(slug: string): Promise<(Post & Meta) | null> {
  const all = await getPosts();
  return all.find((p) => p.slug === slug) ?? null;
}
export async function getCase(id: string): Promise<(CaseStudy & Meta) | null> {
  const all = await getCases();
  return all.find((c) => c.id === id) ?? null;
}

/* ───────────── Public intake (client-side POST) ───────────── */

export const PUBLIC_API_URL = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
