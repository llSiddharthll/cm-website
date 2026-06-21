import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, ArrowRight, Check } from "lucide-react";
import {
  getServicePages,
  getServicePage,
  getServicePagesByCategory,
  getServiceCategory,
  getServicesGrid,
  getSite,
} from "@/lib/cms";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/agency/Footer";
import { ContactForm } from "@/components/agency/ContactForm";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getServicePages()).map((p) => ({ slug: p.category, sub: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; sub: string }>;
}): Promise<Metadata> {
  const { slug, sub } = await params;
  const page = await getServicePage(slug, sub);
  if (!page) return { title: "Services" };
  return {
    title: `${page.name} — Services`,
    description: page.intro || page.tagline,
  };
}

export default async function ServicePageView({
  params,
}: {
  params: Promise<{ slug: string; sub: string }>;
}) {
  const { slug, sub } = await params;
  const [page, cat, siblings, servicesGrid, site] = await Promise.all([
    getServicePage(slug, sub),
    getServiceCategory(slug),
    getServicePagesByCategory(slug),
    getServicesGrid(),
    getSite(),
  ]);
  if (!page || !cat) notFound();

  const related = siblings.filter((p) => p.slug !== page.slug).slice(0, 3);
  const overview = page.overview?.length ? page.overview : page.intro ? [page.intro] : [];

  return (
    <>
      <span id="top" className="absolute top-0" aria-hidden />
      <Header dark />
      <main className="bg-dark text-on-ink">
        {/* ── Hero ── */}
        <section className="bg-dark section pt-[clamp(7.5rem,16vh,11rem)]">
          <div className="shell">
            {/* breadcrumb */}
            <nav aria-label="Breadcrumb" className="label flex flex-wrap items-center gap-x-2 gap-y-1 text-on-ink-3">
              <Link href="/services" className="transition-colors hover:text-on-ink">Services</Link>
              <span aria-hidden className="text-on-ink-3/50">/</span>
              <Link href={`/services/${cat.slug}`} className="transition-colors hover:text-on-ink">{cat.name}</Link>
              <span aria-hidden className="text-on-ink-3/50">/</span>
              <span className="text-orange">{page.name}</span>
            </nav>

            <div className="mt-8 grid12 items-end gap-y-8">
              <div className="col-span-12 lg:col-span-8">
                <h1 className="display-tight text-[length:var(--text-display)] text-on-ink">
                  <RevealLines lines={[page.name]} />
                  <span
                    aria-hidden
                    className="ml-[0.1em] inline-block aspect-square w-[0.5em] bg-orange align-baseline"
                  />
                </h1>
                {page.tagline && (
                  <Reveal as="span" delay={0.12} className="mono mt-6 block text-on-ink-3">
                    {page.tagline}
                  </Reveal>
                )}
              </div>

              {page.metric?.value && (
                <Reveal delay={0.2} className="col-span-12 lg:col-span-4 lg:text-right">
                  <span className="display block text-[length:var(--text-h1)] leading-none text-orange">
                    {page.metric.value}
                  </span>
                  <span className="label mt-2 block text-on-ink-3">{page.metric.label}</span>
                </Reveal>
              )}
            </div>

            {page.intro && (
              <Reveal as="span" delay={0.18} className="mt-10 block max-w-2xl text-[length:var(--text-lead)] leading-snug text-on-ink-2">
                {page.intro}
              </Reveal>
            )}

            <Reveal delay={0.24} className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="group label inline-flex h-12 items-center gap-2 bg-orange px-6 text-on-orange transition-colors hover:bg-orange-press"
              >
                Book a strategy call
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/work"
                className="group label inline-flex h-12 items-center gap-2 border border-line-invert px-6 text-on-ink transition-colors hover:border-orange/60"
              >
                See the work
                <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </Reveal>
          </div>
        </section>

        {/* ── Overview + deliverables ── */}
        {(overview.length > 0 || page.deliverables?.length) && (
          <section className="bg-dark-2 section">
            <div className="shell grid12 gap-y-14">
              {overview.length > 0 && (
                <div className="col-span-12 lg:col-span-7">
                  <Reveal>
                    <Eyebrow invert>Overview</Eyebrow>
                  </Reveal>
                  <div className="mt-8 space-y-6">
                    {overview.map((p, i) => (
                      <Reveal as="span" key={i} delay={i * 0.06} className="block text-[length:var(--text-lead)] leading-relaxed text-on-ink-2">
                        {p}
                      </Reveal>
                    ))}
                  </div>
                </div>
              )}

              {page.deliverables?.length ? (
                <div className="col-span-12 lg:col-span-4 lg:col-start-9">
                  <Reveal>
                    <Eyebrow index="—" invert>What you get</Eyebrow>
                  </Reveal>
                  <ul className="mt-8 space-y-4">
                    {page.deliverables.map((d, i) => (
                      <Reveal as="li" key={i} delay={i * 0.05} className="flex items-start gap-3 border-b border-line-invert pb-4">
                        <Check className="mt-1 size-4 shrink-0 text-orange" strokeWidth={2.5} />
                        <span className="text-on-ink">{d}</span>
                      </Reveal>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </section>
        )}

        {/* ── Highlights ── */}
        {page.highlights?.length ? (
          <section className="bg-dark section">
            <div className="shell">
              <Reveal>
                <Eyebrow invert>Why it works</Eyebrow>
              </Reveal>
              <div className="grid12 mt-10 gap-5">
                {page.highlights.map((h, i) => (
                  <Reveal key={i} delay={i * 0.07} className="col-span-12 md:col-span-4">
                    <div className="flex h-full flex-col gap-4 border border-line-invert-2 bg-dark-2 p-7 transition-colors duration-300 hover:border-orange/40">
                      <span className="mono text-orange">{String(i + 1).padStart(2, "0")}</span>
                      <h3 className="display text-[length:var(--text-h3)] text-on-ink">{h.title}</h3>
                      <p className="text-on-ink-2">{h.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* ── Process ── */}
        {page.process?.length ? (
          <section className="bg-dark-2 section">
            <div className="shell">
              <Reveal>
                <Eyebrow index="—" invert>How we work</Eyebrow>
              </Reveal>
              <ol className="grid12 mt-12 gap-y-12">
                {page.process.map((p, i) => (
                  <Reveal as="li" key={i} delay={i * 0.08} className="col-span-6 md:col-span-3">
                    <div className="border-t border-line-invert pt-5">
                      <span className="display text-[length:var(--text-h3)] text-orange">{p.step}</span>
                      <h3 className="display mt-5 text-[length:var(--text-h3)] text-on-ink">{p.title}</h3>
                      <p className="mt-3 text-on-ink-2">{p.body}</p>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>
          </section>
        ) : null}

        {/* ── FAQ ── */}
        {page.faqs?.length ? (
          <section className="bg-dark section">
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
                          <span className="display text-[length:var(--text-h3)] text-on-ink">{f.q}</span>
                          <span className="mono mt-1 shrink-0 text-orange transition-transform duration-300 group-open:rotate-45">+</span>
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

        {/* ── Related in this category ── */}
        {related.length > 0 && (
          <section className="bg-dark-2 section">
            <div className="shell">
              <div className="flex items-end justify-between gap-6">
                <Reveal>
                  <Eyebrow invert>More in {cat.name}</Eyebrow>
                </Reveal>
                <Link href={`/services/${cat.slug}`} className="group label hidden items-center gap-1.5 text-on-ink transition-colors hover:text-orange sm:inline-flex">
                  All {cat.name.toLowerCase()}
                  <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
              <div className="grid12 mt-10 gap-5">
                {related.map((o, i) => (
                  <Reveal key={o.slug} delay={i * 0.06} className="col-span-12 md:col-span-4">
                    <Link
                      href={`/services/${cat.slug}/${o.slug}`}
                      className="group flex h-full flex-col justify-between gap-10 border border-line-invert-2 bg-dark p-7 transition-all duration-300 hover:-translate-y-1 hover:border-orange/50"
                    >
                      <div className="flex items-start justify-between">
                        <span className="mono text-on-ink-3 group-hover:text-orange">{String(i + 1).padStart(2, "0")}</span>
                        <ArrowUpRight className="size-5 text-on-ink-3 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-orange" />
                      </div>
                      <div>
                        <h3 className="display text-[length:var(--text-h3)] text-on-ink">{o.name}</h3>
                        <p className="mt-2 text-sm text-on-ink-2">{o.tagline}</p>
                      </div>
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
