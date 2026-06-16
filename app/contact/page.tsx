import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/agency/Footer";
import { PageHero } from "@/components/agency/PageHero";
import { ContactForm } from "@/components/agency/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SITE } from "@/lib/content";
import { LOCATIONS } from "@/lib/agency";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us where you want to grow. We come back with a clear, honest next step — not a hard sell. Replies within one business day.",
};

const NEXT_STEPS = [
  {
    no: "01",
    title: "We reply within a day",
    body: "A real person reads what you sent and writes back within one business day — no auto-responder, no queue.",
  },
  {
    no: "02",
    title: "A short discovery call",
    body: "Thirty focused minutes on your goals, market and margins. We listen first; you leave with clarity either way.",
  },
  {
    no: "03",
    title: "A tailored proposal",
    body: "A scoped plan with honest timelines, ownership and price — built for your stage, not a template tier.",
  },
];

export default function ContactPage() {
  return (
    <>
      <span id="top" className="absolute top-0" aria-hidden />
      <Header dark />
      <main className="bg-dark text-on-ink">
        <PageHero
          index="/ 03"
          kicker="Contact"
          titleLines={["Let’s talk"]}
          lede="Tell us where you want to grow — we’ll come back with a clear, honest next step, not a hard sell."
          meta="Replies within 1 business day"
        />

        <ContactForm />

        {/* ── What happens next ── */}
        <section className="bg-dark-2 section text-on-ink">
          <div className="shell">
            <Reveal>
              <Eyebrow index="A" invert>
                The process
              </Eyebrow>
            </Reveal>
            <h2 className="display mt-6 max-w-2xl text-[length:var(--text-h2)] text-on-ink">
              What happens next
            </h2>

            <ol className="grid12 mt-14 gap-y-12">
              {NEXT_STEPS.map((step, i) => (
                <Reveal
                  as="li"
                  key={step.no}
                  delay={i * 0.08}
                  className="col-span-12 border-t border-line-invert pt-6 md:col-span-4"
                >
                  <span className="mono block text-orange">{step.no}</span>
                  <h3 className="display mt-5 text-[length:var(--text-h3)] leading-[1.05] text-on-ink">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-on-ink-2">{step.body}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Studios ── */}
        <section className="bg-dark section text-on-ink">
          <div className="shell">
            <div className="grid12 items-baseline gap-y-6">
              <Reveal className="col-span-12 md:col-span-4">
                <Eyebrow index="B" invert>
                  Studios
                </Eyebrow>
                <h2 className="display mt-6 text-[length:var(--text-h2)] text-on-ink">
                  Near you, almost everywhere.
                </h2>
              </Reveal>
              <Reveal
                as="span"
                delay={0.1}
                className="col-span-12 block max-w-md text-on-ink-2 md:col-span-5 md:col-start-8 md:justify-self-end"
              >
                Built in Chandigarh, shipping for clients across India and the
                wider world — in their time zone when it matters.
              </Reveal>
            </div>

            {/* HQ highlight */}
            <Reveal className="mt-16">
              <div className="grid12 items-end gap-y-6 border-t border-line-invert pt-8">
                <div className="col-span-12 md:col-span-7">
                  <span className="label text-on-ink-3">Headquarters</span>
                  <p className="display mt-4 text-[length:var(--text-h2)] leading-none text-orange">
                    Chandigarh
                  </p>
                </div>
                <p className="col-span-12 max-w-sm text-on-ink-2 md:col-span-4 md:col-start-9 md:text-right">
                  {SITE.address}
                </p>
              </div>
            </Reveal>

            {/* City groups */}
            <div className="grid12 mt-16 gap-y-12">
              <Reveal className="col-span-12 md:col-span-6">
                <span className="label text-on-ink-3">India</span>
                <ul className="mt-6 flex flex-col gap-3 border-t border-line-invert pt-6">
                  {LOCATIONS.india.map((city) => (
                    <li
                      key={city}
                      className="display text-[length:var(--text-h3)] leading-tight text-on-ink"
                    >
                      {city}
                      {city === "Chandigarh" && (
                        <span className="mono ml-3 align-middle text-orange">
                          HQ
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.1} className="col-span-12 md:col-span-6">
                <span className="label text-on-ink-3">Global</span>
                <ul className="mt-6 flex flex-col gap-3 border-t border-line-invert pt-6">
                  {LOCATIONS.global.map((city) => (
                    <li
                      key={city}
                      className="display text-[length:var(--text-h3)] leading-tight text-on-ink-2"
                    >
                      {city}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
