import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/lib/agency";
import { PROCESS } from "@/lib/content";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/agency/Footer";
import { ContactForm } from "@/components/agency/ContactForm";
import { PageHero } from "@/components/agency/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function generateStaticParams() {
  return SERVICE_CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = SERVICE_CATEGORIES.find((c) => c.slug === slug);
  if (!cat) return { title: "Services" };
  return { title: `${cat.name} — Services`, description: cat.intro };
}

export default async function ServiceCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = SERVICE_CATEGORIES.find((c) => c.slug === slug);
  if (!cat) notFound();
  const others = SERVICE_CATEGORIES.filter((c) => c.slug !== cat.slug);

  return (
    <>
      <span id="top" className="absolute top-0" aria-hidden />
      <Header dark />
      <main className="bg-dark text-on-ink">
        <PageHero
          index={`/ ${cat.index}`}
          kicker="Services"
          titleLines={[cat.name]}
          lede={cat.intro}
          meta={cat.tagline}
        />

        {/* ── What's included — the sub-services ── */}
        <section className="bg-dark section">
          <div className="shell">
            <Reveal>
              <Eyebrow invert>What&rsquo;s included</Eyebrow>
            </Reveal>
            <ul className="mt-10 border-t border-line-invert">
              {cat.items.map((it, i) => (
                <Reveal as="li" key={it.slug} delay={i * 0.05}>
                  <div
                    id={it.slug}
                    className="grid12 scroll-mt-28 items-baseline gap-y-3 border-b border-line-invert py-[clamp(1.4rem,2.6vw,2.4rem)]"
                  >
                    <span className="mono col-span-1 text-on-ink-3">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="display col-span-5 col-start-2 text-[length:var(--text-h3)] text-on-ink md:col-span-5">
                      {it.name}
                    </h2>
                    <p className="col-span-6 col-start-1 text-on-ink-2 md:col-span-5 md:col-start-8">
                      {it.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* ── How we work (shared process) ── */}
        <section className="bg-dark-2 section">
          <div className="shell">
            <Reveal>
              <Eyebrow index="—" invert>
                How we work
              </Eyebrow>
            </Reveal>
            <ol className="grid12 mt-12 gap-y-12">
              {PROCESS.map((p, i) => (
                <Reveal as="li" key={p.step} delay={i * 0.08} className="col-span-6 md:col-span-3">
                  <div className="border-t border-line-invert pt-5">
                    <span className="display text-[length:var(--text-h3)] text-orange">
                      {p.step}
                    </span>
                    <h3 className="display mt-5 text-[length:var(--text-h3)] text-on-ink">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-on-ink-2">{p.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Other disciplines ── */}
        <section className="bg-dark section">
          <div className="shell">
            <Reveal>
              <Eyebrow invert>More disciplines</Eyebrow>
            </Reveal>
            <div className="grid12 mt-10 gap-5">
              {others.map((o, i) => (
                <Reveal key={o.slug} delay={i * 0.06} className="col-span-12 md:col-span-4">
                  <Link
                    href={`/services/${o.slug}`}
                    className="group flex h-full flex-col justify-between gap-10 border border-line-invert-2 bg-dark-2 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-orange/50"
                  >
                    <div className="flex items-start justify-between">
                      <span className="mono text-on-ink-3 group-hover:text-orange">
                        {o.index}
                      </span>
                      <ArrowUpRight className="size-5 text-on-ink-3 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-orange" />
                    </div>
                    <div>
                      <h3 className="display text-[length:var(--text-h3)] text-on-ink">
                        {o.name}
                      </h3>
                      <p className="mt-2 text-sm text-on-ink-2">{o.tagline}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
