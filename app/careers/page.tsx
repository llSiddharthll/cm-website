import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { ROLES, BENEFITS, CULTURE_STATS, RATINGS } from "@/lib/agency";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/agency/Footer";
import { PageHero } from "@/components/agency/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Creative Monk — a small, in-house studio that values craft and ownership. See our open roles.",
};

export default function CareersPage() {
  return (
    <>
      <span id="top" className="absolute top-0" aria-hidden />
      <Header dark />
      <main className="bg-dark text-on-ink">
        <PageHero
          index="/ 05"
          kicker="Careers"
          titleLines={["Build things", "worth owning"]}
          lede="We're a small, in-house team that values craft, ownership and the long game — people who'd rather build an asset than rent attention."
          meta={`${ROLES.length} open roles`}
        />

        {/* ── Why join ── */}
        <section className="bg-dark section">
          <div className="shell grid12 gap-y-12">
            <div className="col-span-12 md:col-span-4">
              <Reveal>
                <Eyebrow index="A" invert>
                  Why Creative Monk
                </Eyebrow>
              </Reveal>
              <Reveal y={20} delay={0.05}>
                <p className="display mt-7 text-[length:var(--text-h3)] leading-[1.1] text-on-ink">
                  No hand-offs, no ego, no busywork —{" "}
                  <span className="text-on-ink-3">
                    just sharp people shipping work they're proud to sign.
                  </span>
                </p>
              </Reveal>
            </div>

            <div className="col-span-12 md:col-span-7 md:col-start-6">
              {/* Big culture stats */}
              <div className="grid grid-cols-2 gap-x-[var(--col-gap)] gap-y-10 border-t border-line-invert pt-8">
                {CULTURE_STATS.map((stat, i) => (
                  <Reveal key={stat.label} delay={i * 0.08}>
                    <span className="display block text-[length:var(--text-h2)] leading-none text-on-ink">
                      <AnimatedNumber
                        value={parseFloat(stat.value)}
                        suffix={stat.suffix}
                      />
                    </span>
                    <span className="mono mt-3 block text-on-ink-3">
                      {stat.label}
                    </span>
                  </Reveal>
                ))}
              </div>

              {/* Small rating cards */}
              <div className="mt-12 grid grid-cols-1 gap-px border border-line-invert bg-line-invert sm:grid-cols-3">
                {RATINGS.map((r, i) => (
                  <Reveal
                    key={r.source}
                    delay={0.15 + i * 0.08}
                    className="bg-dark p-6"
                  >
                    <span className="mono block text-on-ink-3">{r.source}</span>
                    <span className="display mt-3 block text-[length:var(--text-h3)] leading-none text-orange">
                      {r.value}
                      <span className="text-on-ink-3">/5</span>
                    </span>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Perks ── */}
        <section className="bg-dark-2 section">
          <div className="shell grid12 gap-y-10">
            <Reveal className="col-span-12 md:col-span-4">
              <Eyebrow index="B" invert>
                Perks
              </Eyebrow>
              <h2 className="display mt-7 text-[length:var(--text-h3)] leading-[1.1] text-on-ink">
                The things that keep good people building.
              </h2>
            </Reveal>

            <div className="col-span-12 md:col-span-7 md:col-start-6">
              <Reveal y={20}>
                <ul className="flex flex-wrap gap-2.5">
                  {BENEFITS.map((perk) => (
                    <li
                      key={perk}
                      className="mono border border-line-invert px-3 py-1.5 text-on-ink-2"
                    >
                      {perk}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Open roles ── */}
        <section className="bg-dark section">
          <div className="shell">
            <div className="grid12 items-end gap-y-6">
              <Reveal className="col-span-12 md:col-span-6">
                <Eyebrow index="C" invert>
                  Open roles
                </Eyebrow>
                <h2 className="display mt-7 text-[length:var(--text-h2)] leading-none text-on-ink">
                  {ROLES.length} ways in
                </h2>
              </Reveal>
              <Reveal
                as="span"
                delay={0.1}
                className="col-span-12 block max-w-md text-on-ink-2 md:col-span-5 md:col-start-8 md:text-right"
              >
                Don't fit one neatly? Apply to the closest — we hire for craft,
                not checklists.
              </Reveal>
            </div>

            <ul className="mt-14">
              {ROLES.map((role, i) => (
                <Reveal as="li" key={role.title} delay={i * 0.05}>
                  <a
                    href="/contact"
                    className="group grid grid-cols-1 items-baseline gap-y-3 border-t border-line-invert py-7 last:border-b md:grid-cols-12 md:gap-x-[var(--col-gap)]"
                  >
                    <h3 className="display col-span-12 text-[length:var(--text-h3)] leading-none text-on-ink transition-colors duration-200 group-hover:text-orange md:col-span-6">
                      {role.title}
                    </h3>
                    <span className="mono col-span-12 self-center text-on-ink-3 md:col-span-4">
                      {role.team} · {role.type} · {role.location}
                    </span>
                    <span className="col-span-12 md:col-span-2 md:justify-self-end">
                      <span className="label inline-flex items-center gap-1.5 text-on-ink-2 transition-colors duration-200 group-hover:text-orange">
                        Apply
                        <ArrowUpRight className="size-4 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </span>
                  </a>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* ── CTA band ── */}
        <section className="bg-dark-2 section">
          <div className="shell grid12 items-end gap-y-10">
            <Reveal className="col-span-12 md:col-span-8">
              <h2 className="display-tight text-[length:var(--text-h2)] leading-[0.92] text-on-ink">
                Don't see your role?{" "}
                <span className="text-on-ink-3">Pitch us.</span>
              </h2>
              <p className="mt-7 max-w-lg text-on-ink-2">
                If you're great at something we'll need, tell us what you'd build
                here. The best hires rarely come from a job post.
              </p>
            </Reveal>
            <Reveal className="col-span-12 md:col-span-3 md:col-start-10 md:justify-self-end">
              <Button href="/contact" variant="primary" size="lg">
                Get in touch
              </Button>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
