import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getCases, getCase, getSite, getServicesGrid } from "@/lib/cms";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/agency/Footer";
import { ContactForm } from "@/components/agency/ContactForm";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ReelPlaceholder } from "@/components/fx/ReelPlaceholder";

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

            <div className="grid12 mt-10 items-end gap-y-8">
              <Reveal
                as="span"
                className="col-span-6 block text-[length:var(--text-lead)] leading-snug text-on-ink-2 md:col-span-6"
              >
                {c.result}
              </Reveal>
              <Reveal className="col-span-6 md:col-span-3 md:col-start-10 md:text-right">
                <span className="display block text-[length:var(--text-h2)] leading-none text-orange">
                  {c.metric.value}
                </span>
                <span className="mono mt-2 block text-on-ink-3">
                  {c.metric.label}
                </span>
              </Reveal>
            </div>

            <Reveal className="mt-8">
              <ul className="flex flex-wrap gap-2">
                {c.category.map((tag) => (
                  <li
                    key={tag}
                    className="mono border border-line-invert px-3 py-1.5 text-on-ink-2"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ── Hero visual ── */}
        <section className="bg-dark pb-[var(--section-pad)]">
          <div className="shell">
            <Reveal y={40}>
              <ReelPlaceholder
                title={c.client}
                category={c.category[0]}
                index={num}
                ratio="16/9"
              />
            </Reveal>
          </div>
        </section>

        {/* ── Narrative ── */}
        <section className="bg-dark-2 section">
          <div className="shell grid12 gap-y-10">
            <Reveal className="col-span-12 md:col-span-3">
              <Eyebrow index="A" invert>
                The brief
              </Eyebrow>
            </Reveal>
            <div className="col-span-12 md:col-span-8 md:col-start-5">
              <Reveal y={20}>
                <p className="display text-[length:var(--text-h3)] leading-[1.15] text-on-ink-3">
                  {c.client} needed more than a fresh coat of paint —{" "}
                  <span className="text-on-ink">
                    a system that carries the brand across every surface
                  </span>{" "}
                  and keeps compounding long after launch.
                </p>
              </Reveal>
              <Reveal y={16} delay={0.1}>
                <p className="mt-8 max-w-xl leading-relaxed text-on-ink-2">
                  We ran our four-step process — listen, shape, make, compound —
                  pairing strategy with in-house design, code and content. The
                  result: {c.result.toLowerCase()} And the numbers followed:{" "}
                  <span className="font-medium text-on-ink">
                    {c.metric.value} {c.metric.label}
                  </span>
                  .
                </p>
              </Reveal>
            </div>
          </div>
        </section>

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
