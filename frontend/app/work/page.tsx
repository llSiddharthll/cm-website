import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/agency/Footer";
import { WorkHero } from "@/components/work/WorkHero";
import { WorkGrid } from "@/components/work/WorkGrid";
import { ContactForm } from "@/components/agency/ContactForm";
import { getCases, getSite, getServicesGrid } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work from Creative Monk — brand, web, performance marketing and motion built for compounding growth.",
};

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
