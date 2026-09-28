import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  getServicesGrid,
  getIndustries,
  getServiceCategories,
  getProcess,
  getSite,
} from "@/lib/cms";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/agency/Footer";
import { ContactForm } from "@/components/agency/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageHero } from "@/components/agency/PageHero";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "Six outcomes, from getting found to getting better every month, wired together to compound into an asset you own.",
  path: "/services",
});

export default async function ServicesPage() {
  const [servicesGrid, industries, serviceCategories, process, site] =
    await Promise.all([
      getServicesGrid(),
      getIndustries(),
      getServiceCategories(),
      getProcess(),
      getSite(),
    ]);

  return (
    <>
      <span id="top" className="absolute top-0" aria-hidden />
      <Header dark />
      <main className="bg-dark text-on-ink">
        <PageHero
          index="/ 02"
          kicker="What we do"
          titleLines={["Everything", "under one roof"]}
          lede="Brand, web, content and performance, wired together to compound."
          meta="6 outcomes"
        />

        {/* ── Four disciplines → category pages ── */}
        <section className="bg-dark section">
          <div className="shell">
            <Reveal>
              <Eyebrow invert>Six outcomes</Eyebrow>
            </Reveal>
            <div className="grid12 mt-10 gap-5">
              {serviceCategories.map((cat, i) => (
                <Reveal
                  key={cat.slug}
                  delay={i * 0.06}
                  className="col-span-12 sm:col-span-6 lg:col-span-4"
                >
                  <Link
                    href={`/services/${cat.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line-invert-2 bg-dark-2 transition-all duration-300 hover:-translate-y-1 hover:border-orange/50"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden bg-dark-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/services/${cat.slug}.webp`}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                      />
                      <span className="mono absolute left-4 top-4 rounded-full border border-on-ink/15 bg-dark/50 px-2.5 py-1 text-xs text-on-ink backdrop-blur-md">
                        {cat.index}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-start justify-between gap-3">
                        <h2 className="display text-[length:var(--text-h3)] leading-tight text-on-ink transition-colors group-hover:text-orange">
                          {cat.name}
                        </h2>
                        <ArrowUpRight className="mt-1 size-5 shrink-0 text-on-ink-3 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-orange" />
                      </div>
                      <p className="mt-2 text-sm text-on-ink-2">{cat.tagline}</p>
                      <p className="mono mt-auto pt-4 text-on-ink-3">
                        {cat.items.length} {cat.items.length === 1 ? "service" : "services"}
                      </p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Services detail (editorial list) ── */}
        <section className="bg-dark section">
          <div className="shell">
            <ul>
              {servicesGrid.map((s, i) => (
                <Reveal
                  key={s.no}
                  as="li"
                  delay={(i % 3) * 0.05}
                  y={20}
                  className={`group block border-t border-line-invert ${
                    i === servicesGrid.length - 1 ? "border-b" : ""
                  }`}
                >
                  <div className="grid12 items-baseline gap-y-2 py-7 md:py-9">
                    <span className="mono col-span-1 text-on-ink-3 transition-colors duration-300 group-hover:text-orange">
                      {s.no}
                    </span>
                    <h3 className="display col-span-5 text-[length:var(--text-h3)] text-on-ink transition-colors duration-300 group-hover:text-orange md:col-span-6">
                      {s.title}
                    </h3>
                    <p className="col-span-6 text-on-ink-2 md:col-span-5">
                      {s.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Process ── */}
        <section className="bg-dark-2 section text-on-ink">
          <div className="shell">
            <Reveal>
              <Eyebrow index="05" invert>
                How we work
              </Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display mt-6 max-w-[18ch] text-[length:var(--text-h2)] text-on-ink">
                From brief to{" "}
                <span className="text-orange">compounding.</span>
              </h2>
            </Reveal>

            <div className="grid12 mt-14 lg:mt-20">
              {process.map((p, i) => (
                <Reveal
                  key={p.step}
                  delay={i * 0.08}
                  className="col-span-6 md:col-span-3"
                >
                  <div className="flex h-full flex-col border-t border-line-invert pt-5">
                    <span className="mono text-orange">{p.step}</span>
                    <h3 className="display mt-5 text-[length:var(--text-h3)] text-on-ink">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-[length:var(--text-body)] leading-snug text-on-ink-2">
                      {p.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Industries ── */}
        <section className="bg-dark section text-on-ink">
          <div className="shell">
            <div className="grid12 gap-y-8">
              <div className="col-span-12 md:col-span-8">
                <Reveal>
                  <Eyebrow index="06" invert>
                    Industries
                  </Eyebrow>
                </Reveal>
                <Reveal delay={0.06}>
                  <h2 className="display mt-6 text-[length:var(--text-h2)] text-on-ink">
                    Built for the work{" "}
                    <span className="text-orange">you do.</span>
                  </h2>
                </Reveal>
              </div>
            </div>

            <div className="grid12 mt-12 gap-y-5">
              {industries.map((ind, i) => (
                <Reveal
                  key={ind.name}
                  delay={(i % 3) * 0.06}
                  className="col-span-6 md:col-span-4"
                >
                  <article className="flex h-full flex-col border border-line-invert-2 bg-dark-2 p-6">
                    <h3 className="display text-[length:var(--text-h3)] text-on-ink">
                      {ind.name}
                    </h3>
                    <p className="mt-3 text-on-ink-2">{ind.blurb}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <ContactForm site={site} services={servicesGrid} />
      </main>
      <Footer />
    </>
  );
}
