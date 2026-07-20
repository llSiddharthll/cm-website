import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getLocationPages, getServicesGrid, getSite } from "@/lib/cms";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/agency/Footer";
import { ContactForm } from "@/components/agency/ContactForm";
import { PageHero } from "@/components/agency/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "Locations",
  description:
    "A creative and digital growth studio serving Chandigarh, Mohali, Panchkula and Zirakpur — brand, web, content and performance across the Tricity.",
};

export default async function LocationsPage() {
  const [locations, servicesGrid, site] = await Promise.all([
    getLocationPages(),
    getServicesGrid(),
    getSite(),
  ]);

  return (
    <>
      <span id="top" className="absolute top-0" aria-hidden />
      <Header dark />
      <main className="bg-dark text-on-ink">
        <PageHero
          index="/ 08"
          kicker="Locations"
          titleLines={["A Tricity studio,", "close to you"]}
          lede="Based in Zirakpur, working hands-on across the Tricity — and with clients in seven countries. Find your city."
          meta={`${locations.length} cities`}
        />

        {/* ── Location cards ── */}
        <section className="bg-dark section">
          <div className="shell">
            <div className="grid12 gap-5">
              {locations.map((loc, i) => (
                <Reveal key={loc.slug} delay={(i % 2) * 0.06} className="col-span-12 md:col-span-6">
                  <Link
                    href={`/locations/${loc.slug}`}
                    className="group flex h-full flex-col justify-between gap-10 border border-line-invert-2 bg-dark-2 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-orange/50"
                  >
                    <div className="flex items-start justify-between">
                      <span className="mono text-on-ink-3 group-hover:text-orange">
                        {loc.index}
                      </span>
                      <ArrowUpRight className="size-5 text-on-ink-3 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-orange" />
                    </div>
                    <div>
                      <span className="label block text-on-ink-3">{loc.region}</span>
                      <h2 className="display mt-2 text-[length:var(--text-h2)] text-on-ink transition-colors group-hover:text-orange">
                        {loc.city}
                      </h2>
                      <p className="mt-3 max-w-md text-on-ink-2">{loc.tagline}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Industries cross-link ── */}
        <section className="bg-dark-2 section">
          <div className="shell">
            <div className="grid12 items-end gap-y-8">
              <div className="col-span-12 md:col-span-8">
                <Reveal>
                  <Eyebrow index="—" invert>
                    By industry
                  </Eyebrow>
                </Reveal>
                <Reveal delay={0.06}>
                  <h2 className="display mt-6 max-w-[20ch] text-[length:var(--text-h2)] text-on-ink">
                    Prefer to browse by{" "}
                    <span className="text-orange">what you do?</span>
                  </h2>
                </Reveal>
              </div>
              <div className="col-span-12 md:col-span-4 md:text-right">
                <Reveal delay={0.12}>
                  <Link
                    href="/industries"
                    className="group label inline-flex items-center gap-2 text-on-ink transition-colors hover:text-orange"
                  >
                    Explore industries
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
