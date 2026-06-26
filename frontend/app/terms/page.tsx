import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/agency/Footer";
import { LegalDoc } from "@/components/agency/LegalDoc";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of the Creative Monk website.",
};

export default function TermsPage() {
  return (
    <>
      <Header dark />
      <main className="bg-dark text-on-ink">
        <LegalDoc
          title="Terms of Service"
          updated="June 2026"
          sections={[
            {
              h: "Acceptance",
              p: [
                "By using this website you agree to these terms. If you don't agree, please don't use the site.",
              ],
            },
            {
              h: "Use of the site",
              p: [
                "You may browse and share our content for personal, non-commercial reference. You agree not to misuse the site, attempt to disrupt it, or use it for anything unlawful.",
              ],
            },
            {
              h: "Engagements",
              p: [
                "This website is for information only and does not constitute an offer. Any project we take on is governed by a separate written agreement (proposal / statement of work) that sets out scope, fees, timelines and ownership.",
              ],
            },
            {
              h: "Intellectual property",
              p: [
                "The brand, copy, design and code of this site are owned by Creative Monk unless stated otherwise. Client work shown is displayed with the respective owners' brands and remains their property.",
              ],
            },
            {
              h: "Disclaimer",
              p: [
                "The site is provided “as is”. We work to keep information accurate and the site available, but make no warranties and aren't liable for losses arising from its use to the extent permitted by law.",
              ],
            },
            {
              h: "Governing law & contact",
              p: [
                "These terms are governed by the laws of India, with courts in Punjab having jurisdiction. Questions? Write to info@thecreativemonk.in.",
              ],
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
