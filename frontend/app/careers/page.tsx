import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Users,
  Laptop,
  GraduationCap,
  PawPrint,
  Coffee,
  Clock,
  HeartPulse,
  Sparkles,
  Check,
  type LucideIcon,
} from "lucide-react";
import { RATINGS } from "@/lib/agency";
import {
  getRoles,
  getBenefits,
  getCultureStats,
  getCareers,
  getTeam,
  getCases,
} from "@/lib/cms";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/agency/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { Aurora } from "@/components/fx/Aurora";
import { CultureGallery } from "@/components/careers/CultureGallery";
import { RolesBoard } from "@/components/careers/RolesBoard";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Creative Monk — a small, in-house studio in Chandigarh that values craft, ownership and the long game. See our open roles and apply.",
};

const perkIcon = (label: string): LucideIcon => {
  const s = label.toLowerCase();
  if (s.includes("team")) return Users;
  if (s.includes("remote")) return Laptop;
  if (s.includes("learn")) return GraduationCap;
  if (s.includes("pet")) return PawPrint;
  if (s.includes("food") || s.includes("snack")) return Coffee;
  if (s.includes("flex") || s.includes("hour")) return Clock;
  if (s.includes("health") || s.includes("cover")) return HeartPulse;
  if (s.includes("ego") || s.includes("culture")) return Sparkles;
  return Check;
};

export default async function CareersPage() {
  const [ROLES, BENEFITS, CULTURE_STATS, careers, team, cases] = await Promise.all([
    getRoles(),
    getBenefits(),
    getCultureStats(),
    getCareers(),
    getTeam(),
    getCases(),
  ]);

  const gallery = [
    ...team.map((m) => m.photo).filter((x): x is string => Boolean(x)),
    ...cases.map((c) => c.cover).filter((x): x is string => Boolean(x)),
  ].slice(0, 14);

  return (
    <>
      <span id="top" className="absolute top-0" aria-hidden />
      <Header dark />
      <main className="bg-dark text-on-ink">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-dark pb-16 pt-[clamp(9rem,20vh,14rem)]">
          <Aurora className="opacity-70" />
          <div className="shell relative">
            <Reveal>
              <span className="mono inline-flex items-center gap-2 text-on-ink-3">
                <span className="size-1.5 animate-pulse rounded-full bg-orange" />
                {careers.heroKicker} · {ROLES.length} open roles
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="display-tight mt-7 max-w-[15ch] text-[length:var(--text-h1)] leading-[0.9] text-on-ink">
                {careers.heroTitle1}{" "}
                <span className="text-orange">{careers.heroTitle2}</span>
              </h1>
            </Reveal>
            <Reveal
              as="span"
              delay={0.1}
              className="mt-7 block max-w-xl text-[length:var(--text-lead)] leading-snug text-on-ink-2"
            >
              {careers.heroLede}
            </Reveal>
            <Reveal delay={0.15} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Button href="#roles" variant="primary" size="lg">
                See open roles
              </Button>
              <Link
                href="/careers/apply"
                className="label group inline-flex items-center gap-2 text-on-ink-2 transition-colors hover:text-orange"
              >
                Send an open application
                <ArrowRight className="size-4 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </section>

        {/* ── Culture gallery ── */}
        {gallery.length >= 4 && (
          <section className="bg-dark pb-6">
            <CultureGallery images={gallery} />
          </section>
        )}

        {/* ── Why join ── */}
        <section className="bg-dark section">
          <div className="shell grid12 gap-y-12">
            <div className="col-span-12 md:col-span-4">
              <Reveal>
                <Eyebrow index="A" invert>
                  {careers.whyEyebrow}
                </Eyebrow>
              </Reveal>
              <Reveal y={20} delay={0.05}>
                <p className="display mt-7 text-[length:var(--text-h3)] leading-[1.1] text-on-ink">
                  {careers.whyLead}{" "}
                  <span className="text-on-ink-3">{careers.whyMuted}</span>
                </p>
              </Reveal>
            </div>

            <div className="col-span-12 md:col-span-7 md:col-start-6">
              <div className="grid grid-cols-2 gap-x-[var(--col-gap)] gap-y-10 border-t border-line-invert pt-8">
                {CULTURE_STATS.map((stat, i) => (
                  <Reveal key={stat.label} delay={i * 0.08}>
                    <span className="display block text-[length:var(--text-h2)] leading-none text-on-ink">
                      <AnimatedNumber value={parseFloat(stat.value)} suffix={stat.suffix} />
                    </span>
                    <span className="mono mt-3 block text-on-ink-3">{stat.label}</span>
                  </Reveal>
                ))}
              </div>

              <Reveal
                delay={0.2}
                className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-line-invert pt-8"
              >
                {RATINGS.map((r) => (
                  <span key={r.source} className="flex items-baseline gap-2.5">
                    <span className="display text-[length:var(--text-h2)] leading-none text-orange">
                      {r.value}
                      <span className="text-on-ink-3">/5</span>
                    </span>
                    <span className="mono text-on-ink-3">on {r.source}</span>
                  </span>
                ))}
                <span className="mono text-on-ink-3">
                  — trusted by 100+ brands across the Tricity &amp; beyond
                </span>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Perks (bento) ── */}
        <section className="bg-dark-2 section">
          <div className="shell">
            <div className="grid12 items-end gap-y-6">
              <Reveal className="col-span-12 md:col-span-7">
                <Eyebrow index="B" invert>
                  {careers.perksEyebrow}
                </Eyebrow>
                <h2 className="display mt-7 text-[length:var(--text-h2)] leading-[1.05] text-on-ink">
                  {careers.perksHeading}
                </h2>
              </Reveal>
            </div>

            <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line-invert bg-line-invert sm:grid-cols-3 lg:grid-cols-4">
              {BENEFITS.map((perk, i) => {
                const Icon = perkIcon(perk);
                return (
                  <Reveal
                    key={perk}
                    delay={(i % 4) * 0.05}
                    className="group flex min-h-40 flex-col justify-between bg-dark-2 p-6 transition-colors duration-300 hover:bg-dark"
                  >
                    <Icon
                      className="size-6 text-orange transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5"
                      strokeWidth={1.6}
                    />
                    <span className="display mt-8 block text-[length:var(--text-h3)] leading-[1.05] text-on-ink">
                      {perk}
                    </span>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Open roles ── */}
        <section id="roles" className="bg-dark section scroll-mt-24">
          <div className="shell">
            <div className="grid12 items-end gap-y-6">
              <Reveal className="col-span-12 md:col-span-6">
                <Eyebrow index="C" invert>
                  {careers.rolesEyebrow}
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
                {careers.rolesIntro}
              </Reveal>
            </div>

            <div className="mt-14">
              <RolesBoard roles={ROLES} />
            </div>
          </div>
        </section>

        {/* ── CTA band ── */}
        <section className="relative overflow-hidden bg-dark-2 section">
          <Aurora className="opacity-40" />
          <div className="shell relative grid12 items-end gap-y-10">
            <Reveal className="col-span-12 md:col-span-8">
              <h2 className="display-tight text-[length:var(--text-h2)] leading-[0.92] text-on-ink">
                {careers.ctaLead} <span className="text-on-ink-3">{careers.ctaMuted}</span>
              </h2>
              <p className="mt-7 max-w-lg text-on-ink-2">{careers.ctaBody}</p>
            </Reveal>
            <Reveal className="col-span-12 md:col-span-3 md:col-start-10 md:justify-self-end">
              <Button href="/careers/apply" variant="primary" size="lg">
                {careers.ctaButtonLabel}
              </Button>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
