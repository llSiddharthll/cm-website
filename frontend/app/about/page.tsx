import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/agency/Footer";
import { PageHero } from "@/components/agency/PageHero";
import { ContactForm } from "@/components/agency/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { RATINGS } from "@/lib/agency";
import { IMG } from "@/lib/media";
import {
  getStory,
  getTimeline,
  getValues,
  getTeam,
  getCultureStats,
  getBenefits,
  getSite,
  getServicesGrid,
} from "@/lib/cms";

export const metadata: Metadata = {
  title: "About",
  description:
    "The in-house creative & growth studio from Chandigarh behind the work — our why, our team and how we think.",
};

export default async function AboutPage() {
  const [
    AGENCY_STORY,
    TIMELINE,
    VALUES,
    TEAM,
    CULTURE_STATS,
    BENEFITS,
    site,
    servicesGrid,
  ] = await Promise.all([
    getStory(),
    getTimeline(),
    getValues(),
    getTeam(),
    getCultureStats(),
    getBenefits(),
    getSite(),
    getServicesGrid(),
  ]);

  return (
    <>
      <span id="top" className="absolute top-0" aria-hidden />
      <Header dark />
      <main className="bg-dark text-on-ink">
        {/* ── 01 · Hero ── */}
        <PageHero
          index="/ 01"
          kicker="About the studio"
          titleLines={["The studio", "behind the work"]}
          lede="An in-house creative & growth studio from Chandigarh — brand, web, content and performance built under one roof and engineered to compound."
          meta="Est. 2017 · Chandigarh"
        />

        {/* ── 02 · Statement ── */}
        <section className="bg-dark section">
          <div className="shell">
            <div className="grid12 gap-y-10">
              <Reveal className="col-span-6 md:col-span-3">
                <Eyebrow index="02" invert>
                  Our why
                </Eyebrow>
              </Reveal>

              <div className="col-span-6 md:col-span-8 md:col-start-5">
                <Reveal y={24}>
                  <p className="display text-[length:var(--text-h2)] leading-[1.04] text-on-ink">
                    {AGENCY_STORY.q}
                  </p>
                </Reveal>
                <Reveal y={18} delay={0.1}>
                  <p className="mt-8 max-w-2xl text-[length:var(--text-lead)] leading-snug text-on-ink-2">
                    {AGENCY_STORY.a}
                  </p>
                </Reveal>
                <Reveal y={14} delay={0.18}>
                  <p className="mono mt-8 text-on-ink-3">
                    {AGENCY_STORY.signature}
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ── 03 · Timeline band ── */}
        <section className="bg-dark-2 section">
          <div className="shell">
            <dl className="grid grid-cols-2 border-t border-line-invert lg:grid-cols-4">
              {TIMELINE.map((t, i) => {
                // Count up only stat figures (those with a suffix); render the
                // founded year as plain text — no comma, no count-up.
                const counts = "suffix" in t && !!t.suffix;
                return (
                  <Reveal
                    key={t.label}
                    as="div"
                    delay={i * 0.08}
                    className={`flex flex-col gap-2 border-line-invert py-8 ${
                      i % 2 === 1 ? "border-l pl-5" : ""
                    } lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:pl-6`}
                  >
                    <dd className="display text-[clamp(1.75rem,1rem+2.5vw,3rem)] leading-none text-on-ink">
                      {counts ? (
                        <AnimatedNumber
                          value={Number(t.value)}
                          suffix={"suffix" in t && t.suffix ? t.suffix : ""}
                        />
                      ) : (
                        t.value
                      )}
                    </dd>
                    <dt className="label text-on-ink-3">{t.label}</dt>
                  </Reveal>
                );
              })}
            </dl>
          </div>
        </section>

        {/* ── 04 · Values ── */}
        <section className="bg-dark section">
          <div className="shell">
            <Reveal>
              <Eyebrow index="04" invert>
                How we think
              </Eyebrow>
              <h2 className="display mt-6 max-w-3xl text-[length:var(--text-h2)] leading-[0.98] text-on-ink">
                Four principles we don&rsquo;t bend.
              </h2>
            </Reveal>

            <div className="grid12 mt-14 gap-x-[var(--col-gap)] gap-y-12">
              {VALUES.map((v, i) => (
                <Reveal
                  key={v.no}
                  delay={(i % 2) * 0.1}
                  className="col-span-6 border-t border-line-invert pt-5"
                >
                  <span className="mono block text-orange">{v.no}</span>
                  <h3 className="display mt-5 text-[length:var(--text-h3)] leading-tight text-on-ink">
                    {v.title}
                  </h3>
                  <p className="mt-4 max-w-md leading-relaxed text-on-ink-2">
                    {v.body}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── 05 · Team ── */}
        <section className="bg-dark-2 section">
          <div className="shell">
            <Reveal>
              <Eyebrow index="05" invert>
                The team
              </Eyebrow>
              <h2 className="display mt-6 max-w-3xl text-[length:var(--text-h2)] leading-[0.98] text-on-ink">
                The people under the one roof.
              </h2>
            </Reveal>

            <div className="grid12 mt-14 gap-x-[var(--col-gap)] gap-y-10">
              {TEAM.map((m, i) => (
                <Reveal
                  key={m.name}
                  delay={(i % 3) * 0.08}
                  className="col-span-6 md:col-span-4"
                >
                  <article className="border border-line-invert-2 bg-dark">
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={m.photo || IMG.avatars[i % IMG.avatars.length]}
                        alt={m.name}
                        fill
                        sizes="(min-width: 768px) 33vw, 50vw"
                        className="object-cover grayscale"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="display text-[length:var(--text-h3)] leading-tight text-on-ink">
                        {m.name}
                      </h3>
                      <p className="mono mt-2 text-on-ink-3">{m.role}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── 06 · Perks strip ── */}
        <section className="bg-dark section">
          <div className="shell">
            <div className="grid12 gap-y-14">
              {/* Culture numbers */}
              <Reveal className="col-span-6 md:col-span-5">
                <Eyebrow index="06" invert>
                  Inside the studio
                </Eyebrow>
                <dl className="mt-8 flex flex-col gap-8">
                  {CULTURE_STATS.map((s) => (
                    <div key={s.label}>
                      <dd className="display text-[length:var(--text-h2)] leading-none text-on-ink">
                        <AnimatedNumber
                          value={Number(s.value)}
                          suffix={s.suffix}
                        />
                      </dd>
                      <dt className="label mt-3 text-on-ink-3">{s.label}</dt>
                    </div>
                  ))}
                </dl>
              </Reveal>

              {/* Benefits + ratings */}
              <div className="col-span-6 md:col-span-6 md:col-start-7">
                <Reveal>
                  <p className="label text-on-ink-3">What we offer</p>
                  <ul className="mt-5 flex flex-wrap gap-2.5">
                    {BENEFITS.map((b) => (
                      <li
                        key={b}
                        className="mono border border-line-invert px-3 py-1.5 text-on-ink-2"
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                </Reveal>

                <Reveal delay={0.12}>
                  <p className="label mt-12 text-on-ink-3">Rated by our people</p>
                  <dl className="mt-5 grid grid-cols-3 gap-x-[var(--col-gap)]">
                    {RATINGS.map((r) => (
                      <div
                        key={r.source}
                        className="border-t border-line-invert pt-4"
                      >
                        <dd className="display text-[length:var(--text-h3)] leading-none text-orange">
                          {r.value}
                        </dd>
                        <dt className="mono mt-2 text-on-ink-3">{r.source}</dt>
                      </div>
                    ))}
                  </dl>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ── 07 · Contact ── */}
        <ContactForm site={site} services={servicesGrid} />
      </main>
      <Footer />
    </>
  );
}
