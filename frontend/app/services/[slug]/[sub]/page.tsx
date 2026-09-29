import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowUpRight, ArrowRight, Check } from "lucide-react";
import {
  getServicePages,
  getServicePage,
  getServicePagesByCategory,
  getServiceCategory,
  getServicesGrid,
  getCases,
  getSite,
} from "@/lib/cms";
import { buildMetadata, breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/agency/Footer";
import { ContactForm } from "@/components/agency/ContactForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ReelPlaceholder } from "@/components/fx/ReelPlaceholder";
import { Magnetic } from "@/components/fx/Magnetic";
import { Tilt } from "@/components/fx/Tilt";
import { Parallax } from "@/components/fx/Parallax";
import { BookingButton } from "@/components/booking/BookingButton";
import { SectionNav } from "@/components/services/SectionNav";
import { cn } from "@/lib/utils";

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
  return buildMetadata({
    title: `${page.name}, Services`,
    description: page.intro || page.tagline,
    path: `/services/${slug}/${sub}`,
    image: page.cover,
  });
}

const pad = (n: number) => String(n).padStart(2, "0");

export default async function ServicePageView({
  params,
}: {
  params: Promise<{ slug: string; sub: string }>;
}) {
  const { slug, sub } = await params;
  const [page, cat, siblings, cases, servicesGrid, site] = await Promise.all([
    getServicePage(slug, sub),
    getServiceCategory(slug),
    getServicePagesByCategory(slug),
    getCases(),
    getServicesGrid(),
    getSite(),
  ]);
  if (!page || !cat) notFound();

  const related = siblings.filter((p) => p.slug !== page.slug).slice(0, 3);
  const work = cases.slice(0, 3);
  const overview = page.overview?.length ? page.overview : page.intro ? [page.intro] : [];
  const heroImage = page.heroImage || page.cover;
  const chapters = page.chapters ?? [];

  // Only list sections that actually render.
  const nav = [
    overview.length && { id: "overview", label: "Overview" },
    page.signals?.length && { id: "signs", label: "Is it for you" },
    chapters.length && { id: "approach", label: "Our approach" },
    page.deliverables?.length && { id: "included", label: "What's included" },
    page.process?.length && { id: "process", label: "Process" },
    page.faqs?.length && { id: "faq", label: "FAQ" },
  ].filter(Boolean) as { id: string; label: string }[];

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: page.name,
            description: page.intro || page.tagline,
            path: `/services/${slug}/${sub}`,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: cat.name, path: `/services/${cat.slug}` },
            { name: page.name, path: `/services/${slug}/${sub}` },
          ]),
          ...(page.faqs?.length ? [faqSchema(page.faqs)] : []),
        ]}
      />
      <span id="top" className="absolute top-0" aria-hidden />
      <Header dark />
      <main className="bg-dark text-on-ink">
        {/* ── Hero: copy beside a portrait image, so the fold carries the argument ── */}
        <section className="bg-dark pb-[clamp(3rem,7vw,6rem)] pt-[clamp(7rem,14vh,9.5rem)]">
          <div className="shell grid12 items-center gap-y-12">
            <div className="col-span-12 lg:col-span-7">
              <nav aria-label="Breadcrumb" className="label flex flex-wrap items-center gap-x-2 gap-y-1 text-on-ink-3">
                <Link href="/services" className="transition-colors hover:text-on-ink">Services</Link>
                <span aria-hidden className="text-on-ink-3/50">/</span>
                <Link href={`/services/${cat.slug}`} className="transition-colors hover:text-on-ink">{cat.name}</Link>
                <span aria-hidden className="text-on-ink-3/50">/</span>
                <span className="text-orange">{page.name}</span>
              </nav>

              <h1 className="display-tight mt-7 text-[clamp(2.75rem,1rem+5.2vw,6rem)] leading-[0.95] text-on-ink">
                <RevealLines
                  lines={[page.name]}
                  trailing={<span aria-hidden className="ml-[0.1em] inline-block aspect-square w-[0.45em] bg-orange align-baseline" />}
                />
              </h1>

              {page.intro && (
                <Reveal as="span" delay={0.14} className="mt-7 block max-w-xl text-[length:var(--text-lead)] leading-snug text-on-ink-2">
                  {page.intro}
                </Reveal>
              )}

              <Reveal delay={0.22} className="mt-9 flex flex-wrap items-center gap-4">
                <Magnetic>
                  <BookingButton className="group label inline-flex h-12 cursor-pointer items-center gap-2 bg-orange px-6 text-on-orange transition-colors hover:bg-orange-press">
                    Book a strategy call
                    <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </BookingButton>
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

              {page.metric?.value && (
                <Reveal delay={0.28} className="mt-10 flex max-w-md items-baseline gap-4 border-t border-line-invert pt-5">
                  <span className="display shrink-0 text-[length:var(--text-h3)] leading-none text-orange">
                    {page.metric.value}
                  </span>
                  <span className="text-sm text-on-ink-3">{page.metric.label}</span>
                </Reveal>
              )}
            </div>

            {heroImage && (
              <Reveal y={40} delay={0.1} className="col-span-12 lg:col-span-5">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line-invert-2 bg-dark-2 sm:aspect-[16/10] lg:aspect-[4/5]">
                  <Parallax className="absolute inset-x-0 -top-[8%] h-[116%]" speed={6}>
                    <Image
                      src={heroImage}
                      alt={page.name}
                      fill
                      priority
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="object-cover"
                    />
                  </Parallax>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent" />
                  <span className="mono absolute bottom-4 left-5 z-10 text-on-ink-2">
                    {cat.index} · {cat.name}
                  </span>
                </div>
              </Reveal>
            )}
          </div>
        </section>

        {nav.length > 2 && <SectionNav title={page.name} items={nav} />}

        {/* ── Stat band ── */}
        {page.stats?.length ? (
          <section className="border-b border-line-invert bg-dark">
            <div className="shell grid12">
              {page.stats.map((s, i) => (
                <Reveal
                  key={i}
                  delay={i * 0.06}
                  className={cn(
                    "col-span-12 py-8 sm:col-span-4 sm:py-10",
                    i > 0 && "border-t border-line-invert sm:border-l sm:border-t-0 sm:pl-8",
                  )}
                >
                  <span className="display block text-[length:var(--text-h3)] leading-none text-on-ink">{s.value}</span>
                  <span className="mt-3 block max-w-[28ch] text-sm leading-snug text-on-ink-3">{s.label}</span>
                </Reveal>
              ))}
            </div>
          </section>
        ) : null}

        {/* ── Overview ── */}
        {overview.length > 0 && (
          <section id="overview" className="scroll-mt-32 bg-dark section">
            <div className="shell grid12 gap-y-10">
              <div className="col-span-12 lg:col-span-4">
                <div className="lg:sticky lg:top-40">
                  <Reveal>
                    <Eyebrow invert>Overview</Eyebrow>
                  </Reveal>
                  {page.tagline && (
                    <Reveal delay={0.06}>
                      <h2 className="display mt-6 text-[length:var(--text-h3)] leading-[1.1] text-on-ink">
                        {page.tagline}
                      </h2>
                    </Reveal>
                  )}
                </div>
              </div>
              <div className="col-span-12 space-y-6 lg:col-span-7 lg:col-start-6">
                {overview.map((p, i) => (
                  <Reveal
                    as="span"
                    key={i}
                    delay={i * 0.06}
                    className={cn(
                      "block leading-relaxed",
                      i === 0
                        ? "text-[length:var(--text-lead)] text-on-ink"
                        : "text-[length:var(--text-body)] text-on-ink-2",
                    )}
                  >
                    {p}
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Signs you need this ── */}
        {page.signals?.length ? (
          <section id="signs" className="scroll-mt-32 bg-dark-2 section">
            <div className="shell">
              <div className="grid12 items-end gap-y-6">
                <div className="col-span-12 md:col-span-7">
                  <Reveal>
                    <Eyebrow invert>Is it for you</Eyebrow>
                  </Reveal>
                  <Reveal delay={0.06}>
                    <h2 className="display mt-6 text-[length:var(--text-h2)] leading-[1.02] text-on-ink">
                      Signs it&rsquo;s <span className="text-orange">time.</span>
                    </h2>
                  </Reveal>
                </div>
                <Reveal delay={0.1} className="col-span-12 md:col-span-4 md:col-start-9">
                  <p className="text-on-ink-2">
                    If two or more of these sound familiar, this is likely where growth is leaking.
                  </p>
                </Reveal>
              </div>

              <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line-invert-2 bg-line-invert-2 sm:grid-cols-2 lg:grid-cols-4">
                {page.signals.map((s, i) => (
                  <Reveal key={i} delay={i * 0.06} className="flex flex-col bg-dark-2 p-7">
                    <span className="mono text-orange">{pad(i + 1)}</span>
                    <h3 className="display mt-8 text-xl leading-snug text-on-ink">{s.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-on-ink-2">{s.desc}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* ── Chapters: long-form argument, image alternating sides ── */}
        {chapters.length > 0 && (
          <section id="approach" className="scroll-mt-32 bg-dark section">
            <div className="shell">
              <div className="grid12">
                <div className="col-span-12 md:col-span-8">
                  <Reveal>
                    <Eyebrow invert>Our approach</Eyebrow>
                  </Reveal>
                  <Reveal delay={0.06}>
                    <h2 className="display mt-6 text-[length:var(--text-h2)] leading-[1.02] text-on-ink">
                      How we do it, <span className="text-orange">in detail.</span>
                    </h2>
                  </Reveal>
                </div>
              </div>

              <div className="mt-[clamp(3rem,7vw,6rem)] space-y-[clamp(4.5rem,10vw,9rem)]">
                {chapters.map((c, i) => {
                  const flip = i % 2 === 1;
                  return (
                    <article key={i} className="grid12 items-center gap-y-10">
                      {c.image && (
                        <Reveal
                          y={40}
                          className={cn("col-span-12 lg:col-span-6", flip && "lg:order-2 lg:col-start-7")}
                        >
                          <figure className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-line-invert-2 bg-dark-2">
                            <Image
                              src={c.image}
                              alt={c.alt || c.title}
                              fill
                              sizes="(min-width: 1024px) 50vw, 100vw"
                              className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                            />
                            <figcaption className="mono absolute left-4 top-4 rounded-full border border-on-ink/15 bg-dark/55 px-2.5 py-1 text-xs text-on-ink backdrop-blur-md">
                              {pad(i + 1)} / {pad(chapters.length)}
                            </figcaption>
                          </figure>
                        </Reveal>
                      )}

                      <div
                        className={cn(
                          "col-span-12",
                          c.image
                            ? flip
                              ? "lg:order-1 lg:col-span-5 lg:col-start-1"
                              : "lg:col-span-5 lg:col-start-8"
                            : "lg:col-span-8",
                        )}
                      >
                        <Reveal>
                          <span className="mono text-orange">
                            {pad(i + 1)}
                            {c.kicker ? ` · ${c.kicker}` : ""}
                          </span>
                          <h3 className="display mt-5 text-[clamp(1.75rem,1.1rem+2vw,2.75rem)] leading-[1.08] text-on-ink">
                            {c.title}
                          </h3>
                        </Reveal>
                        <div className="mt-6 space-y-5">
                          {c.body?.map((p, j) => (
                            <Reveal as="span" key={j} delay={0.05 + j * 0.05} className="block leading-relaxed text-on-ink-2">
                              {p}
                            </Reveal>
                          ))}
                        </div>
                        {c.points?.length ? (
                          <ul className="mt-8 border-t border-line-invert">
                            {c.points.map((pt, j) => (
                              <Reveal
                                as="li"
                                key={j}
                                delay={0.08 + j * 0.04}
                                className="flex items-start gap-3 border-b border-line-invert py-3.5 text-sm text-on-ink"
                              >
                                <Check className="mt-0.5 size-4 shrink-0 text-orange" strokeWidth={2.5} />
                                {pt}
                              </Reveal>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ── Pull quote + mid-page CTA ── */}
        {page.quote && (
          <section className="relative overflow-hidden border-y border-line-invert bg-dark-2 section">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 top-1/2 size-[36rem] -translate-y-1/2 rounded-full bg-orange/10 blur-3xl"
            />
            <div className="shell relative grid12 items-end gap-y-10">
              <Reveal className="col-span-12 lg:col-span-9">
                <span aria-hidden className="display block text-[5rem] leading-[0.6] text-orange">&ldquo;</span>
                <blockquote className="display mt-4 text-[clamp(1.75rem,1rem+2.6vw,3.25rem)] leading-[1.12] text-on-ink">
                  {page.quote}
                </blockquote>
                <p className="mono mt-6 text-on-ink-3">How we think about {page.name}</p>
              </Reveal>
              <Reveal delay={0.1} className="col-span-12 lg:col-span-3 lg:text-right">
                <Magnetic>
                  <BookingButton className="group label inline-flex h-12 cursor-pointer items-center gap-2 bg-orange px-6 text-on-orange transition-colors hover:bg-orange-press">
                    Talk to us
                    <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </BookingButton>
                </Magnetic>
              </Reveal>
            </div>
          </section>
        )}

        {/* ── What's included + why it works ── */}
        {page.deliverables?.length || page.highlights?.length ? (
          <section id="included" className="scroll-mt-32 bg-dark section">
            <div className="shell">
              {page.deliverables?.length ? (
                <div className="grid12 gap-y-10">
                  <div className="col-span-12 lg:col-span-4">
                    <Reveal>
                      <Eyebrow invert>What&rsquo;s included</Eyebrow>
                    </Reveal>
                    <Reveal delay={0.06}>
                      <h2 className="display mt-6 text-[length:var(--text-h2)] leading-[1.02] text-on-ink">
                        In the <span className="text-orange">engagement.</span>
                      </h2>
                    </Reveal>
                  </div>
                  <ul className="col-span-12 border-t border-line-invert lg:col-span-7 lg:col-start-6">
                    {page.deliverables.map((d, i) => (
                      <Reveal
                        as="li"
                        key={i}
                        delay={i * 0.05}
                        className="grid grid-cols-[2.5rem_1fr] items-baseline border-b border-line-invert py-5"
                      >
                        <span className="mono text-on-ink-3">{pad(i + 1)}</span>
                        <span className="text-[length:var(--text-body)] text-on-ink">{d}</span>
                      </Reveal>
                    ))}
                  </ul>
                </div>
              ) : null}

              {page.highlights?.length ? (
                <div className={page.deliverables?.length ? "mt-[clamp(4rem,8vw,7rem)]" : ""}>
                  <Reveal>
                    <Eyebrow invert>Why it works</Eyebrow>
                  </Reveal>
                  <div className="grid12 mt-10 gap-5">
                    {page.highlights.map((h, i) => (
                      <Reveal key={i} delay={i * 0.07} className="col-span-12 md:col-span-4">
                        <div className="flex h-full flex-col gap-4 rounded-2xl border border-line-invert-2 bg-dark-2 p-7 transition-colors duration-300 hover:border-orange/40">
                          <span className="mono text-orange">{pad(i + 1)}</span>
                          <h3 className="display text-[length:var(--text-h3)] leading-tight text-on-ink">{h.title}</h3>
                          <p className="text-on-ink-2">{h.desc}</p>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </section>
        ) : null}

        {/* ── Process, as a connected timeline ── */}
        {page.process?.length ? (
          <section id="process" className="scroll-mt-32 bg-dark-2 section">
            <div className="shell">
              <Reveal>
                <Eyebrow index="" invert>How we work</Eyebrow>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="display mt-6 max-w-[16ch] text-[length:var(--text-h2)] leading-[1.02] text-on-ink">
                  From first call to <span className="text-orange">compounding.</span>
                </h2>
              </Reveal>
              <ol className="relative mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                <span aria-hidden className="absolute left-0 right-0 top-[5px] hidden h-px bg-on-ink/15 lg:block" />
                {page.process.map((p, i) => (
                  <Reveal as="li" key={i} delay={i * 0.08} className="relative">
                    <span aria-hidden className="relative z-10 block size-[11px] rounded-full bg-orange ring-[6px] ring-dark-2" />
                    <span className="mono mt-6 block text-orange">{p.step}</span>
                    <h3 className="display mt-3 text-[length:var(--text-h3)] text-on-ink">{p.title}</h3>
                    <p className="mt-3 text-on-ink-2">{p.body}</p>
                  </Reveal>
                ))}
              </ol>
            </div>
          </section>
        ) : null}

        {/* ── FAQ ── */}
        {page.faqs?.length ? (
          <section id="faq" className="scroll-mt-32 bg-dark section">
            <div className="shell grid12 gap-y-10">
              <div className="col-span-12 md:col-span-4">
                <div className="md:sticky md:top-40">
                  <Reveal>
                    <Eyebrow invert>FAQ</Eyebrow>
                    <h2 className="display mt-6 text-[length:var(--text-h2)] leading-[1.02] text-on-ink">
                      Good questions.
                    </h2>
                    <p className="mt-5 max-w-xs text-on-ink-2">
                      Something we haven&rsquo;t covered? Ask us directly, a real person replies.
                    </p>
                  </Reveal>
                </div>
              </div>
              <div className="col-span-12 md:col-span-7 md:col-start-6">
                <ul className="border-t border-line-invert">
                  {page.faqs.map((f, i) => (
                    <Reveal as="li" key={i} delay={i * 0.04}>
                      <details className="group border-b border-line-invert py-5" open={i === 0}>
                        <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                          <span className="display text-xl leading-snug text-on-ink transition-colors group-hover:text-orange">
                            {f.q}
                          </span>
                          <span className="mono mt-1 shrink-0 text-orange transition-transform duration-300 group-open:rotate-45">+</span>
                        </summary>
                        <p className="mt-4 max-w-2xl leading-relaxed text-on-ink-2">{f.a}</p>
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
                {related.map((o, i) => {
                  const thumb = o.heroImage || o.cover;
                  return (
                    <Reveal key={o.slug} delay={i * 0.06} className="col-span-12 md:col-span-4">
                      <Tilt className="h-full">
                        <Link
                          href={`/services/${cat.slug}/${o.slug}`}
                          className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line-invert-2 bg-dark transition-all duration-300 hover:-translate-y-1 hover:border-orange/50"
                        >
                          {thumb && (
                            <div className="relative aspect-[16/10] overflow-hidden">
                              <Image
                                src={thumb}
                                alt=""
                                fill
                                sizes="(min-width: 768px) 33vw, 100vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                            </div>
                          )}
                          <div className="flex flex-1 flex-col justify-between gap-6 p-7">
                            <div className="flex items-start justify-between gap-3">
                              <h3 className="display text-[length:var(--text-h3)] leading-tight text-on-ink">{o.name}</h3>
                              <ArrowUpRight className="mt-1 size-5 shrink-0 text-on-ink-3 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-orange" />
                            </div>
                            <p className="text-sm text-on-ink-2">{o.tagline}</p>
                          </div>
                        </Link>
                      </Tilt>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ── Selected work ── */}
        {work.length > 0 && (
          <section className="bg-dark section">
            <div className="shell">
              <div className="flex items-end justify-between gap-6">
                <Reveal>
                  <Eyebrow invert>Selected work</Eyebrow>
                </Reveal>
                <Link href="/work" className="group label hidden items-center gap-1.5 text-on-ink transition-colors hover:text-orange sm:inline-flex">
                  All work
                  <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
              <div className="grid12 mt-10 gap-x-6 gap-y-10">
                {work.map((w, i) => (
                  <Reveal key={w.id} delay={i * 0.06} className="col-span-12 md:col-span-4">
                    <Tilt>
                      <Link href={`/work/${w.id}`} className="group block">
                        <ReelPlaceholder title={w.client} category={w.category[0]} index={pad(i + 1)} ratio="16/9" />
                        <div className="mt-4 flex items-baseline justify-between gap-4">
                          <h3 className="display text-[length:var(--text-h3)] text-on-ink transition-colors group-hover:text-orange">
                            {w.client}
                          </h3>
                          <span className="mono shrink-0 text-orange">{w.metric.value}</span>
                        </div>
                        <p className="mt-1 text-sm text-on-ink-2">{w.title}</p>
                      </Link>
                    </Tilt>
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
