import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import {
  allPseoSlugs,
  getPseoPage,
  heroFor,
  pseoTitle,
  pseoMetaTitle,
  pseoLede,
  pseoOverview,
  pseoFaqs,
  PSEO_SERVICES,
  PSEO_PLACES,
  PSEO_INDUSTRIES,
  type PseoPage,
} from "@/lib/pseo";
import {
  buildMetadata,
  serviceSchema,
  faqSchema,
  breadcrumbSchema,
  localBusinessSchema,
} from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/agency/Footer";
import { ContactForm } from "@/components/agency/ContactForm";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { Aurora } from "@/components/fx/Aurora";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return allPseoSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getPseoPage(slug);
  if (!page) return {};
  return buildMetadata({
    title: pseoMetaTitle(page),
    description: pseoLede(page),
    path: `/${slug}`,
    image: heroFor(page.service),
  });
}

const PROCESS = [
  { step: "01", title: "Listen", body: "We dig into your market, margins and the goals that actually matter." },
  { step: "02", title: "Shape", body: "We build the strategy and the assets around your numbers, not vanity metrics." },
  { step: "03", title: "Make", body: "We ship, in-house and fast, with one team owning the whole thing." },
  { step: "04", title: "Compound", body: "We measure, learn and reinvest, so the work gets better month over month." },
];

function related(page: PseoPage) {
  const svc = page.service.slug;
  const links: { href: string; label: string }[] = [];
  if (page.kind === "location") {
    const { slug: p, name: pn } = page.place;
    for (const s of PSEO_SERVICES)
      if (s.slug !== svc) links.push({ href: `/${s.slug}-in-${p}`, label: `${s.name} in ${pn}` });
    for (const pl of PSEO_PLACES)
      if (pl.slug !== p) links.push({ href: `/${svc}-in-${pl.slug}`, label: `${page.service.name} in ${pl.name}` });
  } else {
    const { slug: i, name: inm } = page.industry;
    for (const s of PSEO_SERVICES)
      if (s.slug !== svc) links.push({ href: `/${s.slug}-for-${i}`, label: `${s.name} for ${inm}` });
    for (const ind of PSEO_INDUSTRIES)
      if (ind.slug !== i) links.push({ href: `/${svc}-for-${ind.slug}`, label: `${page.service.name} for ${ind.name}` });
  }
  return links;
}

export default async function PseoPageRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getPseoPage(slug);
  if (!page) notFound();

  const title = pseoTitle(page);
  const lede = pseoLede(page);
  const overview = pseoOverview(page);
  const faqs = pseoFaqs(page);
  const rel = related(page);
  const areaServed = page.kind === "location" ? page.place.name : "IN";

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({ name: title, description: lede, path: `/${slug}`, areaServed }),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: title, path: `/${slug}` },
          ]),
          ...(page.kind === "location"
            ? [localBusinessSchema({ city: page.place.name, region: page.place.region, path: `/${slug}` })]
            : []),
        ]}
      />
      <span id="top" className="absolute top-0" aria-hidden />
      <Header dark />
      <main className="bg-dark text-on-ink">
        {/* ── Hero ── */}
        <section className="relative isolate overflow-hidden bg-dark section pt-[clamp(8rem,18vh,12rem)]">
          <Aurora className="opacity-70" />
          <div className="shell relative">
            <div className="grid12 items-center gap-y-12">
              <div className="col-span-12 lg:col-span-7">
                <Reveal>
                  <Eyebrow index={page.service.name}>
                    {page.kind === "location" ? page.place.name : page.industry.name}
                  </Eyebrow>
                </Reveal>
                <h1 className="display-tight mt-7 max-w-[16ch] text-[length:var(--text-h1)] leading-[0.98] text-on-ink">
                  <RevealLines lines={[title]} />
                  <span
                    aria-hidden
                    className="ml-[0.1em] inline-block aspect-square w-[0.4em] bg-orange align-baseline"
                  />
                </h1>
                <Reveal
                  as="span"
                  delay={0.12}
                  className="mt-8 block max-w-xl text-[length:var(--text-lead)] leading-snug text-on-ink-2"
                >
                  {lede}
                </Reveal>
                <Reveal delay={0.18} className="mt-10 flex flex-wrap items-center gap-4">
                  <Button href="/contact" variant="primary" size="lg">
                    Book a free strategy call
                  </Button>
                  <Link
                    href="/work"
                    className="label group inline-flex items-center gap-2 text-on-ink-2 transition-colors hover:text-orange"
                  >
                    See our work
                    <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </Reveal>
              </div>
              <Reveal delay={0.1} className="col-span-12 lg:col-span-5">
                <div className="overflow-hidden rounded-2xl border border-line-invert-2 bg-dark-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={heroFor(page.service)}
                    alt={title}
                    className="aspect-[16/11] w-full object-cover"
                    loading="eager"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Overview ── */}
        <section className="bg-dark section">
          <div className="shell grid12 gap-y-8">
            <Reveal className="col-span-12 md:col-span-4">
              <Eyebrow index="01" invert>
                Overview
              </Eyebrow>
            </Reveal>
            <div className="col-span-12 space-y-6 md:col-span-7 md:col-start-6">
              {overview.map((p, i) => (
                <Reveal key={i} delay={i * 0.06} as="span" className="block text-[length:var(--text-lead)] leading-relaxed text-on-ink-2">
                  {p}
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── What's included ── */}
        <section className="bg-dark-2 section">
          <div className="shell">
            <Reveal>
              <Eyebrow index="02" invert>
                What&rsquo;s included
              </Eyebrow>
              <h2 className="display mt-7 max-w-2xl text-[length:var(--text-h2)] leading-[1.05] text-on-ink">
                Everything you need for {page.service.short}, under one roof.
              </h2>
            </Reveal>
            <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line-invert bg-line-invert sm:grid-cols-2">
              {page.service.deliverables.map((d, i) => (
                <Reveal
                  key={d}
                  delay={(i % 2) * 0.05}
                  className="flex items-start gap-4 bg-dark-2 p-7 transition-colors duration-300 hover:bg-dark"
                >
                  <span className="mono mt-1 shrink-0 text-orange">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-on-ink">{d}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Outcomes ── */}
        <section className="bg-dark section">
          <div className="shell grid12 gap-y-10">
            <Reveal className="col-span-12 md:col-span-4">
              <Eyebrow index="03" invert>
                What you get
              </Eyebrow>
              <p className="display mt-7 text-[length:var(--text-h3)] leading-[1.1] text-on-ink">
                Outcomes, not activity.
              </p>
            </Reveal>
            <div className="col-span-12 md:col-span-7 md:col-start-6">
              <ul className="divide-y divide-line-invert border-y border-line-invert">
                {page.service.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-4 py-5">
                    <Check className="mt-0.5 size-5 shrink-0 text-orange" />
                    <span className="text-[length:var(--text-lead)] leading-snug text-on-ink">{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Process ── */}
        <section className="bg-dark-2 section">
          <div className="shell">
            <Reveal>
              <Eyebrow index="04" invert>
                How we work
              </Eyebrow>
            </Reveal>
            <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {PROCESS.map((s, i) => (
                <Reveal key={s.step} delay={i * 0.06} className="border-t border-line-invert pt-5">
                  <span className="mono text-orange">{s.step}</span>
                  <h3 className="display mt-3 text-[length:var(--text-h3)] leading-tight text-on-ink">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-on-ink-2">{s.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="bg-dark section">
          <div className="shell grid12 gap-y-8">
            <Reveal className="col-span-12 md:col-span-4">
              <Eyebrow index="05" invert>
                FAQs
              </Eyebrow>
            </Reveal>
            <div className="col-span-12 md:col-span-8 md:col-start-5">
              <div className="divide-y divide-line-invert border-y border-line-invert">
                {faqs.map((f) => (
                  <details key={f.q} className="group/faq py-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                      <span className="display text-[length:var(--text-h3)] leading-snug text-on-ink transition-colors group-open/faq:text-orange">
                        {f.q}
                      </span>
                      <span className="mono shrink-0 text-on-ink-3 transition-transform duration-200 group-open/faq:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-3 max-w-2xl text-on-ink-2">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Related ── */}
        {rel.length > 0 && (
          <section className="bg-dark-2 section">
            <div className="shell">
              <Reveal>
                <Eyebrow index="06" invert>
                  Keep exploring
                </Eyebrow>
              </Reveal>
              <div className="mt-8 flex flex-wrap gap-2.5">
                {rel.map((r) => (
                  <Link
                    key={r.href}
                    href={r.href}
                    className="mono rounded-full border border-line-invert px-4 py-2 text-sm text-on-ink-2 transition-colors hover:border-orange hover:text-on-ink"
                  >
                    {r.label}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
