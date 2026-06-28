import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getCases, getCase, getCaseSectionsFor, getSite, getServicesGrid } from "@/lib/cms";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/agency/Footer";
import { ContactForm } from "@/components/agency/ContactForm";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ReelPlaceholder } from "@/components/fx/ReelPlaceholder";
import { CaseSections } from "@/components/work/CaseSections";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getCases()).map((c) => ({ slug: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = await getCase(slug);
  if (!c) return { title: "Work" };
  return { title: `${c.client} — ${c.title}`, description: c.result };
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cases = await getCases();
  const index = cases.findIndex((c) => c.id === slug);
  if (index === -1) notFound();
  const c = cases[index];
  const next = cases[(index + 1) % cases.length];
  const num = String(index + 1).padStart(2, "0");
  const site = await getSite();
  const servicesGrid = await getServicesGrid();
  const sections = await getCaseSectionsFor(c.id);

  // Use the real brief/approach/results when present; else graceful fallbacks.
  const brief = c.brief?.length
    ? c.brief
    : [
        `${c.client} came to us for ${c.category.join(", ").toLowerCase() || "a brand that works"} — a system that carries the brand across every surface and keeps compounding long after launch.`,
      ];
  const approach = c.approach?.length
    ? c.approach
    : [
        `We ran our four-step process — listen, shape, make, compound — pairing strategy with in-house design, content and code. ${c.result}`,
      ];
  const results = c.results?.length
    ? c.results
    : c.metric?.value
      ? [{ value: c.metric.value, label: c.metric.label }]
      : [];

  return (
    <>
      <span id="top" className="absolute top-0" aria-hidden />
      <Header dark />
      <main className="bg-dark text-on-ink">
        {/* ── Case hero ── */}
        <section className="bg-dark section pt-[clamp(7rem,16vh,10rem)]">
          <div className="shell">
            <Reveal>
              <Link
                href="/work"
                className="label group/back inline-flex items-center gap-2 text-on-ink-2 transition-colors hover:text-orange"
              >
                <ArrowLeft className="size-4 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/back:-translate-x-1" />
                All work
              </Link>
            </Reveal>

            <div className="grid12 mt-6 items-baseline gap-y-2 border-t border-on-ink/30 pt-4">
              <span className="label col-span-6 md:col-span-8">
                <span className="text-orange">{num}</span>&nbsp;&nbsp;{c.client}
              </span>
              <span className="label col-span-6 md:col-span-4 md:text-right">
                {c.year}
              </span>
            </div>

            <h1 className="display-tight mt-8 text-[length:var(--text-display)] text-on-ink">
              <RevealLines lines={[c.title]} />
              <span
                aria-hidden
                className="ml-[0.1em] inline-block aspect-square w-[0.5em] bg-orange align-baseline"
              />
            </h1>

            <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <Reveal
                as="span"
                className="block max-w-xl text-[length:var(--text-lead)] leading-snug text-on-ink-2"
              >
                {c.result}
              </Reveal>
              <Reveal>
                <ul className="flex flex-wrap gap-2">
                  {c.category.map((tag) => (
                    <li
                      key={tag}
                      className="mono rounded-full border border-line-invert px-3.5 py-1.5 text-on-ink-2"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            {/* hero visual — integrated, framed, deck watermark muted by the scrim */}
            <Reveal y={40} className="mt-12 block">
              {c.cover ? (
                <div className="group relative aspect-[16/9] overflow-hidden rounded-2xl border border-line-invert-2 bg-dark-3">
                  <Image
                    src={c.cover}
                    alt={`${c.client} — ${c.title}`}
                    fill
                    priority
                    sizes="(min-width: 1280px) 1200px, 100vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-dark/10" />
                  <div className="absolute bottom-5 left-5 flex items-baseline gap-2.5 rounded-full bg-dark/70 px-4 py-2 backdrop-blur">
                    <span className="display text-[length:var(--text-h3)] leading-none text-orange">
                      {c.metric.value}
                    </span>
                    <span className="mono text-on-ink-2">{c.metric.label}</span>
                  </div>
                </div>
              ) : (
                <ReelPlaceholder
                  title={c.client}
                  category={c.category[0]}
                  index={num}
                  ratio="16/9"
                />
              )}
            </Reveal>
          </div>
        </section>

        {/* ── Overview: brief · approach · results ── */}
        <section className="bg-dark-2 section">
          <div className="shell">
            {/* The brief — a single big statement */}
            <div className="grid12 gap-y-4">
              <Reveal className="col-span-12 md:col-span-3">
                <Eyebrow index="01" invert>
                  The brief
                </Eyebrow>
              </Reveal>
              <div className="col-span-12 md:col-span-9">
                {brief.map((p, i) =>
                  i === 0 ? (
                    <Reveal key={i} y={20}>
                      <p className="display text-[length:var(--text-h3)] leading-[1.2] text-on-ink">
                        {p}
                      </p>
                    </Reveal>
                  ) : (
                    <Reveal key={i} y={16} delay={0.06 * i}>
                      <p className="mt-6 max-w-3xl leading-relaxed text-on-ink-2">{p}</p>
                    </Reveal>
                  ),
                )}
              </div>
            </div>

            {/* Our approach + Results — balanced two-up */}
            <div className="grid12 mt-16 gap-y-12 border-t border-line-invert pt-14">
              <div className="col-span-12 md:col-span-7">
                <Reveal>
                  <Eyebrow index="02" invert>
                    Our approach
                  </Eyebrow>
                </Reveal>
                <div className="mt-7 space-y-5">
                  {approach.map((p, i) => (
                    <Reveal
                      key={i}
                      as="span"
                      y={16}
                      delay={0.06 * i}
                      className={
                        i === 0
                          ? "block max-w-xl text-[length:var(--text-lead)] leading-snug text-on-ink-2"
                          : "block max-w-xl leading-relaxed text-on-ink-2"
                      }
                    >
                      {p}
                    </Reveal>
                  ))}
                </div>
              </div>

              {results.length > 0 && (
                <div className="col-span-12 md:col-span-4 md:col-start-9">
                  <Reveal>
                    <Eyebrow index="03" invert>
                      Results
                    </Eyebrow>
                  </Reveal>
                  <dl className="mt-7 border-t border-line-invert">
                    {results.map((r, i) => (
                      <Reveal
                        as="div"
                        key={i}
                        delay={0.06 * i}
                        className="flex items-baseline justify-between gap-4 border-b border-line-invert py-5"
                      >
                        <dt className="display text-[length:var(--text-h2)] leading-none text-orange [overflow-wrap:anywhere]">
                          {r.value}
                          <span className="text-orange/70">{r.suffix}</span>
                        </dt>
                        <dd className="label max-w-[9rem] text-right text-on-ink-3">
                          {r.label}
                        </dd>
                      </Reveal>
                    ))}
                  </dl>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── Discipline showcase (modular, admin-managed) ── */}
        <CaseSections sections={sections} client={c.client} />

        {/* ── Next case ── */}
        <section className="bg-dark-2 pb-[var(--section-pad)]">
          <div className="shell">
            <Link
              href={`/work/${next.id}`}
              className="group/next grid12 items-end gap-y-4 border-t border-on-ink/30 pt-8"
            >
              <div className="col-span-9">
                <span className="label text-on-ink-3">Next case</span>
                <p className="display mt-3 text-[length:var(--text-h2)] text-on-ink transition-colors duration-200 group-hover/next:text-orange">
                  {next.client}
                </p>
              </div>
              <ArrowRight className="col-span-3 size-10 justify-self-end text-on-ink-3 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/next:translate-x-2 group-hover/next:text-orange" />
            </Link>
          </div>
        </section>

        <ContactForm site={site} services={servicesGrid} />
      </main>
      <Footer />
    </>
  );
}
