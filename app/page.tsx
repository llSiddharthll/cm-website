import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/agency/Hero";
import { Tools } from "@/components/agency/Tools";
import { Story } from "@/components/agency/Story";
import { ServicesGrid } from "@/components/agency/ServicesGrid";
import { VideoWork } from "@/components/agency/VideoWork";
import { Certs } from "@/components/agency/Certs";
import { CaseStudies } from "@/components/agency/CaseStudies";
import { Process } from "@/components/agency/Process";
import { Showreel } from "@/components/agency/Showreel";
import { Reviews } from "@/components/agency/Reviews";
import { Culture } from "@/components/agency/Culture";
import { FAQ } from "@/components/agency/FAQ";
import { BigCTA } from "@/components/agency/BigCTA";
import { ContactForm } from "@/components/agency/ContactForm";
import { Footer } from "@/components/agency/Footer";

export default function HomePage() {
  return (
    <>
      <span id="top" className="absolute top-0" aria-hidden />
      <Header dark />
      <main className="bg-dark">
        <Hero />
        <Tools />
        <Story />
        <ServicesGrid />
        <VideoWork />
        <Certs />
        <CaseStudies />
        <Process />
        <Showreel />
        <Reviews />
        <Culture />
        <FAQ />
        <BigCTA />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
