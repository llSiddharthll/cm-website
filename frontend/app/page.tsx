import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/agency/Hero";
import { Tools } from "@/components/agency/Tools";
import { Story } from "@/components/agency/Story";
import { Capabilities } from "@/components/agency/Capabilities";
import { HorizontalShowcase } from "@/components/agency/HorizontalShowcase";
import { SkewMarquee } from "@/components/agency/SkewMarquee";
import { Certs } from "@/components/agency/Certs";
import { CaseStudies } from "@/components/agency/CaseStudies";
import { Process } from "@/components/agency/Process";
import { ReelShowcase } from "@/components/agency/ReelShowcase";
import { Clients } from "@/components/agency/Clients";
import { Reviews } from "@/components/agency/Reviews";
import { Culture } from "@/components/agency/Culture";
import { FAQ } from "@/components/agency/FAQ";
import { BigCTA } from "@/components/agency/BigCTA";
import { ContactForm } from "@/components/agency/ContactForm";
import { Footer } from "@/components/agency/Footer";
import { GROWTH_PILLARS } from "@/lib/agency";
import {
  getSite,
  getHomeHero,
  getStatBar,
  getTools,
  getStory,
  getTimeline,
  getServicesGrid,
  getCerts,
  getCases,
  getProcess,
  getClients,
  getReviews,
  getReviewSummary,
  getBenefits,
  getCultureStats,
  getFaqs,
} from "@/lib/cms";

export default async function HomePage() {
  const [
    site,
    hero,
    statBar,
    tools,
    story,
    timeline,
    servicesGrid,
    certs,
    cases,
    process,
    clients,
    reviews,
    reviewSummary,
    benefits,
    cultureStats,
    faqs,
  ] = await Promise.all([
    getSite(),
    getHomeHero(),
    getStatBar(),
    getTools(),
    getStory(),
    getTimeline(),
    getServicesGrid(),
    getCerts(),
    getCases(),
    getProcess(),
    getClients(),
    getReviews(),
    getReviewSummary(),
    getBenefits(),
    getCultureStats(),
    getFaqs(),
  ]);

  return (
    <>
      <span id="top" className="absolute top-0" aria-hidden />
      <Header dark />
      <main className="bg-dark">
        <Hero hero={hero} statBar={statBar} />
        <Tools tools={tools} />
        <Story story={story} timeline={timeline} />
        <Capabilities
          stats={statBar}
          tools={tools}
          categories={GROWTH_PILLARS}
          founded={site.founded}
        />
        <ReelShowcase />
        <HorizontalShowcase categories={GROWTH_PILLARS} />
        <Certs certs={certs} />
        <CaseStudies cases={cases} />
        <Clients clients={clients} />
        <SkewMarquee />
        <Process process={process} />
        <Reviews reviews={reviews} summary={reviewSummary} />
        <Culture benefits={benefits} cultureStats={cultureStats} />
        <FAQ faqs={faqs} />
        <BigCTA site={site} statBar={statBar} />
        <ContactForm site={site} services={servicesGrid} />
      </main>
      <Footer />
    </>
  );
}
