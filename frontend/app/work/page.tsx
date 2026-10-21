import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/agency/Footer";
import { WorkHero } from "@/components/work/WorkHero";
import { WorkGrid } from "@/components/work/WorkGrid";
import { ContactForm } from "@/components/agency/ContactForm";
import { getCases, getSite, getServicesGrid } from "@/lib/cms";

export const metadata: Metadata = buildMetadata({
  title: "Digital Marketing Case Studies & Client Results",
  description:
    "Digital marketing case studies from Creative Monk: branding, websites, social media and ads for real estate, D2C, hospitality and more in Chandigarh.",
  path: "/work",
});

export default async function WorkPage() {
  const cases = await getCases();
  const site = await getSite();
  const servicesGrid = await getServicesGrid();

  return (
    <>
      <span id="top" className="absolute top-0" aria-hidden />
      <Header dark />
      <main className="bg-dark">
        <WorkHero cases={cases} />
        <WorkGrid cases={cases} />
        <ContactForm site={site} services={servicesGrid} />
      </main>
      <Footer />
    </>
  );
}
