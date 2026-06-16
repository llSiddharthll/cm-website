import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/agency/Footer";
import { WorkHero } from "@/components/work/WorkHero";
import { WorkGrid } from "@/components/work/WorkGrid";
import { ContactForm } from "@/components/agency/ContactForm";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work from Creative Monk — brand, web, performance marketing and motion built for compounding growth.",
};

export default function WorkPage() {
  return (
    <>
      <span id="top" className="absolute top-0" aria-hidden />
      <Header dark />
      <main className="bg-dark">
        <WorkHero />
        <WorkGrid />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
