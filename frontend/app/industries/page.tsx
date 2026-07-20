import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getIndustryPages, getServicesGrid, getSite } from "@/lib/cms";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/agency/Footer";
import { ContactForm } from "@/components/agency/ContactForm";
import { PageHero } from "@/components/agency/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Brand, web, content and performance, tuned to the way your industry actually buys — real estate, D2C, hospitality, FMCG, healthcare and SaaS.",
};

export default async function IndustriesPage() {
  const [industries, servicesGrid, site] = await Promise.all([
    getIndustryPages(),
    getServicesGrid(),
    getSite(),
  ]);

  return (
    <>
      <span id="top" className="absolute top-0" aria-hidden />
      <Header dark />
      <main className="bg-dark text-on-ink">
        <PageHero
          index="/ 07"
          kicker="Industries"
          titleLines={["Built for the", "work you do"]}
          lede="The same disciplines, tuned to the way your market actually buys. Pick the world you operate in."
          meta={`${industries.length} verticals`}
        />

        {/* ── Industry cards ── */}
        <section className="bg-dark section">
          <div className="shell">
            <ul className="border-t border-line-invert">
              {industries.map((ind, i) => (
                <Reveal as="li" key={ind.slug} delay={(i % 3) * 0.05} y={20}>
                  <Link
                    href={`/industries/${ind.slug}`}
                    className="group grid12 items-baseline gap-y-3 border-b border-line-invert py-[clamp(1.6rem,3vw,2.6rem)]"
                  >
                    <span className="mono col-span-1 text-on-ink-3 transition-colors group-hover:text-orange">
                      {ind.index}
                    </span>
                    <h2 className="display col-span-11 col-start-2 flex items-center gap-3 text-[length:var(--text-h2)] text-on-ink transition-colors group-hover:text-orange md:col-span-5">
                      {ind.name}
                      <ArrowUpRight className="size-6 shrink-0 text-orange opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </h2>
                    <p className="col-span-11 col-start-2 max-w-xl text-on-ink-2 md:col-span-5 md:col-start-8">
                      {ind.intro}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Locations cross-link ── */}
        <section className="bg-dark-2 section">
          <div className="shell">
            <div className="grid12 items-end gap-y-8">
              <div className="col-span-12 md:col-span-8">
                <Reveal>
                  <Eyebrow index="—" invert>
                    Where we work
                  </Eyebrow>
                </Reveal>
                <Reveal delay={0.06}>
                  <h2 className="display mt-6 max-w-[20ch] text-[length:var(--text-h2)] text-on-ink">
                    A Tricity studio, growing brands{" "}
                    <span className="text-orange">everywhere.</span>
                  </h2>
                </Reveal>
              </div>
              <div className="col-span-12 md:col-span-4 md:text-right">
                <Reveal delay={0.12}>
                  <Link
                    href="/locations"
                    className="group label inline-flex items-center gap-2 text-on-ink transition-colors hover:text-orange"
                  >
                    Explore locations
                    <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        <ContactForm site={site} services={servicesGrid} />
      </main>
      <Footer />
    </>
  );
}
