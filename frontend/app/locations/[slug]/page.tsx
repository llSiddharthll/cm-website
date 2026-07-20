import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, ArrowRight, MapPin } from "lucide-react";
import {
  getLocationPages,
  getLocationPage,
  getServicesGrid,
  getSite,
} from "@/lib/cms";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/agency/Footer";
import { ContactForm } from "@/components/agency/ContactForm";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Magnetic } from "@/components/fx/Magnetic";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getLocationPages()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getLocationPage(slug);
  if (!page) return { title: "Locations" };
  return {
    title: `Creative & Digital Marketing Agency in ${page.city}`,
    description: page.intro,
  };
}

export default async function LocationPageView({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [page, all, servicesGrid, site] = await Promise.all([
    getLocationPage(slug),
    getLocationPages(),
    getServicesGrid(),
    getSite(),
  ]);
  if (!page) notFound();

  const others = all.filter((p) => p.slug !== page.slug);

  return (
    <>
      <span id="top" className="absolute top-0" aria-hidden />
      <Header dark />
      <main className="bg-dark text-on-ink">
        {/* ── Hero ── */}
        <section className="bg-dark section pt-[clamp(7.5rem,16vh,11rem)]">
          <div className="shell">
            <nav
              aria-label="Breadcrumb"
              className="label flex flex-wrap items-center gap-x-2 gap-y-1 text-on-ink-3"
            >
              <Link href="/locations" className="transition-colors hover:text-on-ink">
                Locations
              </Link>
              <span aria-hidden className="text-on-ink-3/50">
                /
              </span>
              <span className="text-orange">{page.city}</span>
            </nav>

            <div className="mt-8 grid12 items-end gap-y-8">
              <div className="col-span-12 lg:col-span-9">
                <span className="mono flex items-center gap-2 text-on-ink-3">
                  <MapPin className="size-4 text-orange" />
                  {page.region}
                </span>
                <h1 className="display-tight mt-4 text-[length:var(--text-display)] text-on-ink">
                  <RevealLines lines={[page.city]} />
                  <span
                    aria-hidden
                    className="ml-[0.1em] inline-block aspect-square w-[0.5em] bg-orange align-baseline"
                  />
                </h1>
              </div>
            </div>

            <Reveal
              as="span"
              delay={0.18}
              className="mt-8 block max-w-2xl text-[length:var(--text-lead)] leading-snug text-on-ink-2"
            >
              {page.intro}
            </Reveal>

            <Reveal delay={0.24} className="mt-10 flex flex-wrap items-center gap-4">
              <Magnetic>
                <Link
                  href="/contact"
                  className="group label inline-flex h-12 items-center gap-2 bg-orange px-6 text-on-orange transition-colors hover:bg-orange-press"
                >
                  Book a strategy call
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link
                  href="/work"
                  className="group label inline-flex h-12 items-center gap-2 border border-line-invert px-6 text-on-ink transition-colors hover:border-orange/60"
                >
                  See the work
                  <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </Magnetic>
            </Reveal>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="bg-dark pb-[var(--section-pad)]">
          <div className="shell">
            <div className="grid12 gap-y-8 border-t border-line-invert pt-10">
              {page.stats.map((s, i) => (
                <Reveal key={i} delay={i * 0.08} className="col-span-12 md:col-span-4">
                  <span className="display block text-[length:var(--text-h1)] leading-none text-orange">
                    {s.value}
                  </span>
                  <span className="mt-3 block max-w-[24ch] text-on-ink-2">
                    {s.label}
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Overview + what we do ── */}
        <section className="bg-dark-2 section">
          <div className="shell grid12 gap-y-14">
            <div className="col-span-12 lg:col-span-7">
              <Reveal>
                <Eyebrow invert>Why work with a local studio</Eyebrow>
              </Reveal>
              <div className="mt-8 space-y-6">
                {page.overview.map((p, i) => (
                  <Reveal
                    as="span"
                    key={i}
                    delay={i * 0.06}
                    className="block text-[length:var(--text-lead)] leading-relaxed text-on-ink-2"
                  >
                    {p}
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="col-span-12 lg:col-span-4 lg:col-start-9">
              <Reveal>
                <Eyebrow index="—" invert>
                  What we do here
                </Eyebrow>
              </Reveal>
              <ul className="mt-8">
                {page.services.map((s, i) => (
                  <Reveal as="li" key={s.href + i} delay={i * 0.05}>
                    <Link
                      href={s.href}
                      className="group flex items-center justify-between gap-4 border-b border-line-invert py-4 text-on-ink transition-colors hover:text-orange"
                    >
                      <span>{s.label}</span>
                      <ArrowUpRight className="size-4 shrink-0 text-on-ink-3 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-orange" />
                    </Link>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Areas served ── */}
        <section className="bg-dark section">
          <div className="shell">
            <Reveal>
              <Eyebrow invert>Areas we serve around {page.city}</Eyebrow>
            </Reveal>
            <div className="mt-10 flex flex-wrap gap-3">
              {page.areas.map((a, i) => (
                <Reveal
                  as="span"
                  key={a}
                  delay={(i % 5) * 0.04}
                  className="mono inline-flex items-center gap-2 border border-line-invert-2 px-4 py-2.5 text-on-ink-2"
                >
                  <span aria-hidden className="size-1.5 shrink-0 bg-orange" />
                  {a}
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        {page.faqs?.length ? (
          <section className="bg-dark-2 section">
            <div className="shell grid12 gap-y-10">
              <div className="col-span-12 md:col-span-4">
                <Reveal>
                  <Eyebrow invert>FAQ</Eyebrow>
                  <h2 className="display mt-6 text-[length:var(--text-h2)] text-on-ink">
                    Good questions.
                  </h2>
                </Reveal>
              </div>
              <div className="col-span-12 md:col-span-7 md:col-start-6">
                <ul className="border-t border-line-invert">
                  {page.faqs.map((f, i) => (
                    <Reveal as="li" key={i} delay={i * 0.05}>
                      <details className="group border-b border-line-invert py-5">
                        <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                          <span className="display text-[length:var(--text-h3)] text-on-ink">
                            {f.q}
                          </span>
                          <span className="mono mt-1 shrink-0 text-orange transition-transform duration-300 group-open:rotate-45">
                            +
                          </span>
                        </summary>
                        <p className="mt-4 max-w-2xl text-on-ink-2">{f.a}</p>
                      </details>
                    </Reveal>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ) : null}

        {/* ── Other locations ── */}
        {others.length > 0 && (
          <section className="bg-dark section">
            <div className="shell">
              <Reveal>
                <Eyebrow invert>Other locations</Eyebrow>
              </Reveal>
              <div className="grid12 mt-10 gap-5">
                {others.map((o, i) => (
                  <Reveal key={o.slug} delay={i * 0.06} className="col-span-6 md:col-span-3">
                    <Link
                      href={`/locations/${o.slug}`}
                      className="group flex h-full flex-col justify-between gap-8 border border-line-invert-2 bg-dark-2 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-orange/50"
                    >
                      <div className="flex items-start justify-between">
                        <span className="mono text-on-ink-3 group-hover:text-orange">
                          {o.index}
                        </span>
                        <ArrowUpRight className="size-5 text-on-ink-3 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-orange" />
                      </div>
                      <h3 className="display text-[length:var(--text-h3)] text-on-ink">
                        {o.city}
                      </h3>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        <ContactForm site={site} services={servicesGrid} />
      </main>
      <Footer />
    </>
  );
}
