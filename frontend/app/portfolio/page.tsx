import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/agency/Footer";
import { PageHero } from "@/components/agency/PageHero";
import { ContactForm } from "@/components/agency/ContactForm";
import { PortfolioGallery } from "@/components/work/PortfolioGallery";
import { getPortfolio, getSite, getServicesGrid } from "@/lib/cms";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Selected creative work by Creative Monk — branding, social, packaging, print, UI and full websites across industries.",
};

export default async function PortfolioPage() {
  const [items, site, servicesGrid] = await Promise.all([
    getPortfolio(),
    getSite(),
    getServicesGrid(),
  ]);

  return (
    <>
      <span id="top" className="absolute top-0" aria-hidden />
      <Header dark />
      <main className="bg-dark text-on-ink">
        <PageHero
          index="/ 02"
          kicker="Portfolio"
          titleLines={["The work,", "up close"]}
          lede="Branding, social, packaging, print, UI and full websites — a closer look at what we make, across disciplines and industries. Filter by craft, tap to expand."
          meta={`${items.length} pieces`}
        />

        <section className="bg-dark section pt-0">
          <div className="shell">
            <PortfolioGallery items={items} />
          </div>
        </section>

        <ContactForm site={site} services={servicesGrid} />
      </main>
      <Footer />
    </>
  );
}
