import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/agency/Footer";
import { LegalDoc } from "@/components/agency/LegalDoc";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Creative Monk collects, uses and protects your information.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header dark />
      <main className="bg-dark text-on-ink">
        <LegalDoc
          title="Privacy Policy"
          updated="June 2026"
          sections={[
            {
              h: "Overview",
              p: [
                "Creative Monk (“we”, “us”) respects your privacy. This page explains what information we collect through this website, why, and how we handle it.",
              ],
            },
            {
              h: "Information we collect",
              p: [
                "Enquiries: when you use the contact form we collect your name, email, and the details you share so we can respond.",
                "Newsletter: if you subscribe, we store your email address to send occasional updates. You can unsubscribe at any time.",
                "Usage data: like most sites, basic analytics (pages visited, device, approximate location) may be collected to understand and improve the experience.",
              ],
            },
            {
              h: "How we use it",
              p: [
                "To reply to your enquiry and provide the services you ask about; to send updates you've subscribed to; and to maintain, secure and improve the website. We do not sell your personal information.",
              ],
            },
            {
              h: "Sharing & processors",
              p: [
                "We use trusted third-party providers to run the site (for example hosting and media/CDN services). They process data only on our behalf and under their own security commitments.",
              ],
            },
            {
              h: "Your rights",
              p: [
                "You can request access to, correction of, or deletion of the information we hold about you. Email us and we'll act on reasonable requests promptly.",
              ],
            },
            {
              h: "Contact",
              p: [
                "Questions about this policy? Write to info@thecreativemonk.in.",
              ],
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
