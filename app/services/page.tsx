import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SERVICES_12, INDUSTRIES, SERVICE_CATEGORIES } from "@/lib/agency";
import { PROCESS } from "@/lib/content";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/agency/Footer";
import { ContactForm } from "@/components/agency/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageHero } from "@/components/agency/PageHero";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Brand, web, content and performance — twelve disciplines, wired together to compound into an asset you own.",
};

export default function ServicesPage() {
  return (
    <>
      <span id="top" className="absolute top-0" aria-hidden />
      <Header dark />
      <main className="bg-dark text-on-ink">
        <PageHero
          index="/ 02"
          kicker="What we do"
          titleLines={["Everything", "under one roof"]}
          lede="Brand, web, content and performance, wired together to compound."
          meta="12 disciplines"
        />

        {/* ── Four disciplines → category pages ── */}
        <section className="bg-dark section">
          <div className="shell">
            <Reveal>
              <Eyebrow invert>Four disciplines</Eyebrow>
            </Reveal>
            <div className="grid12 mt-10 gap-5">
              {SERVICE_CATEGORIES.map((cat, i) => (
                <Reveal
                  key={cat.slug}
                  delay={i * 0.06}
                  className="col-span-6 md:col-span-3"
                >
                  <Link
                    href={`/services/${cat.slug}`}
                    className="group flex h-full flex-col justify-between gap-10 border border-line-invert-2 bg-dark-2 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-orange/50"
                  >
                    <div className="flex items-start justify-between">
                      <span className="mono text-on-ink-3 group-hover:text-orange">
                        {cat.index}
                      </span>
                      <ArrowUpRight className="size-5 text-on-ink-3 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-orange" />
                    </div>
                    <div>
                      <h2 className="display text-[length:var(--text-h3)] text-on-ink">
                        {cat.name}
                      </h2>
                      <p className="mt-2 text-sm text-on-ink-2">{cat.tagline}</p>
                      <p className="mono mt-4 text-on-ink-3">
                        {cat.items.length} services
                      </p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Services detail (editorial list) ── */}
        <section className="bg-dark section">
          <div className="shell">
            <ul>
              {SERVICES_12.map((s, i) => (
                <Reveal
                  key={s.no}
                  as="li"
                  delay={(i % 3) * 0.05}
                  y={20}
                  className={`group block border-t border-line-invert ${
                    i === SERVICES_12.length - 1 ? "border-b" : ""
                  }`}
                >
                  <div className="grid12 items-baseline gap-y-2 py-7 md:py-9">
                    <span className="mono col-span-1 text-on-ink-3 transition-colors duration-300 group-hover:text-orange">
                      {s.no}
                    </span>
                    <h3 className="display col-span-5 text-[length:var(--text-h3)] text-on-ink transition-[color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 group-hover:text-orange md:col-span-6">
                      {s.title}
                    </h3>
                    <p className="col-span-5 text-on-ink-2 md:col-span-4">
                      {s.desc}
                    </p>
                    <span className="col-span-1 flex justify-end self-center">
                      <ArrowUpRight
                        className="size-5 text-on-ink-3 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-orange"
                        aria-hidden
                      />
                    </span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Process ── */}
        <section className="bg-dark-2 section text-on-ink">
          <div className="shell">
            <Reveal>
              <Eyebrow index="05" invert>
                How we work
              </Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display mt-6 max-w-[18ch] text-[length:var(--text-h2)] text-on-ink">
                From brief to{" "}
                <span className="text-orange">compounding.</span>
              </h2>
            </Reveal>

            <div className="grid12 mt-14 lg:mt-20">
              {PROCESS.map((p, i) => (
                <Reveal
                  key={p.step}
                  delay={i * 0.08}
                  className="col-span-6 md:col-span-3"
                >
                  <div className="flex h-full flex-col border-t border-line-invert pt-5">
                    <span className="mono text-orange">{p.step}</span>
                    <h3 className="display mt-5 text-[length:var(--text-h3)] text-on-ink">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-[length:var(--text-body)] leading-snug text-on-ink-2">
                      {p.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Industries ── */}
        <section className="bg-dark section text-on-ink">
          <div className="shell">
            <div className="grid12 gap-y-8">
              <div className="col-span-12 md:col-span-8">
                <Reveal>
                  <Eyebrow index="06" invert>
                    Industries
                  </Eyebrow>
                </Reveal>
                <Reveal delay={0.06}>
                  <h2 className="display mt-6 text-[length:var(--text-h2)] text-on-ink">
                    Built for the work{" "}
                    <span className="text-orange">you do.</span>
                  </h2>
                </Reveal>
              </div>
            </div>

            <div className="grid12 mt-12 gap-y-5">
              {INDUSTRIES.map((ind, i) => (
                <Reveal
                  key={ind.name}
                  delay={(i % 3) * 0.06}
                  className="col-span-6 md:col-span-4"
                >
                  <article className="flex h-full flex-col border border-line-invert-2 bg-dark-2 p-6">
                    <h3 className="display text-[length:var(--text-h3)] text-on-ink">
                      {ind.name}
                    </h3>
                    <p className="mt-3 text-on-ink-2">{ind.blurb}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
