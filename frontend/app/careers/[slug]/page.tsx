import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  MapPin,
  Clock,
  Briefcase,
  Users,
  IndianRupee,
  type LucideIcon,
} from "lucide-react";
import { roleSlug, type Role } from "@/lib/agency";
import { getRoles } from "@/lib/cms";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/agency/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Prose } from "@/components/ui/Prose";
import { Aurora } from "@/components/fx/Aurora";
import { ApplicationForm } from "@/components/careers/ApplicationForm";

export const revalidate = 60;

export async function generateStaticParams() {
  const roles = await getRoles();
  return roles.map((r) => ({ slug: roleSlug(r) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const roles = await getRoles();
  const role = roles.find((r) => roleSlug(r) === slug);
  if (!role) return { title: "Careers" };
  return {
    title: `${role.title} — Careers`,
    description: role.summary || `Apply for ${role.title} at Creative Monk.`,
  };
}

function Fact({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 size-4 shrink-0 text-orange" strokeWidth={2} aria-hidden />
      <div>
        <dt className="mono text-on-ink-3">{label}</dt>
        <dd className="mt-0.5 text-on-ink">{value}</dd>
      </div>
    </div>
  );
}

export default async function RolePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const roles = await getRoles();
  const role = roles.find((r) => roleSlug(r) === slug);
  if (!role) notFound();

  const others = roles.filter((r) => roleSlug(r) !== slug).slice(0, 3);
  const external = /^https?:\/\//.test(role.applyUrl || "");
  const applyHref = external ? role.applyUrl! : "#apply";

  const chips: { icon: LucideIcon; value?: string }[] = [
    { icon: MapPin, value: role.location },
    { icon: Clock, value: role.experience },
    { icon: IndianRupee, value: role.salary },
  ];

  return (
    <>
      <span id="top" className="absolute top-0" aria-hidden />
      <Header dark />
      <main className="bg-dark text-on-ink">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-dark pb-12 pt-[clamp(8rem,18vh,12rem)]">
          <Aurora className="opacity-50" />
          <div className="shell relative">
            <Reveal>
              <Link
                href="/careers"
                className="label group/back inline-flex items-center gap-2 text-on-ink-2 transition-colors hover:text-orange"
              >
                <ArrowLeft className="size-4 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/back:-translate-x-1" />
                All roles
              </Link>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mono mt-8 text-on-ink-3">
                <span className="text-orange">{role.team}</span> · {role.type}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="display-tight mt-4 max-w-[18ch] text-[length:var(--text-h1)] leading-[0.92] text-on-ink">
                {role.title}
              </h1>
            </Reveal>
            {role.summary && (
              <Reveal
                as="span"
                delay={0.12}
                className="mt-6 block max-w-2xl text-[length:var(--text-lead)] leading-snug text-on-ink-2"
              >
                {role.summary}
              </Reveal>
            )}
            <Reveal delay={0.16} className="mt-8 flex flex-wrap gap-2.5">
              {chips
                .filter((c) => c.value)
                .map((c, i) => (
                  <span
                    key={i}
                    className="mono inline-flex items-center gap-1.5 rounded-full border border-line-invert px-3 py-1.5 text-on-ink-2"
                  >
                    <c.icon className="size-3.5" aria-hidden />
                    {c.value}
                  </span>
                ))}
            </Reveal>
            <Reveal delay={0.2} className="mt-10">
              <Button href={applyHref} variant="primary" size="lg">
                Apply for this role
              </Button>
            </Reveal>
          </div>
        </section>

        {/* ── Body: sticky facts + JD ── */}
        <section className="bg-dark section pt-4">
          <div className="shell grid12 gap-y-12">
            <aside className="col-span-12 md:col-span-4 lg:col-span-3">
              <div className="space-y-7 border-t border-line-invert pt-8 md:sticky md:top-28">
                <dl className="space-y-6">
                  <Fact icon={Users} label="Team" value={role.team} />
                  <Fact icon={Briefcase} label="Type" value={role.type} />
                  <Fact icon={MapPin} label="Location" value={role.location} />
                  <Fact icon={Clock} label="Experience" value={role.experience} />
                  <Fact icon={IndianRupee} label="Compensation" value={role.salary} />
                </dl>
                <Button href={applyHref} variant="primary" className="w-full justify-center">
                  Apply now
                </Button>
              </div>
            </aside>

            <div className="col-span-12 md:col-span-8 md:col-start-5">
              {role.description?.trim() ? (
                <Prose html={role.description} className="max-w-2xl text-on-ink-2" />
              ) : (
                <p className="max-w-2xl text-[length:var(--text-lead)] text-on-ink-2">
                  {role.summary ||
                    "We're hiring for this role. Tell us about yourself and what you'd build here."}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ── Inline application ── */}
        {!external && (
          <section id="apply" className="scroll-mt-24 bg-dark-2 section">
            <div className="shell">
              <div className="mx-auto max-w-3xl">
                <Reveal>
                  <Eyebrow index="→" invert>
                    Apply
                  </Eyebrow>
                  <h2 className="display mt-6 text-[length:var(--text-h2)] leading-[1.02] text-on-ink">
                    Apply for {role.title}
                    <span className="text-orange">.</span>
                  </h2>
                  <p className="mt-5 max-w-lg text-on-ink-2">
                    One short form — a resume link is enough. We read every application ourselves.
                  </p>
                </Reveal>
                <div className="mt-10 border-t border-line-invert pt-10">
                  <ApplicationForm roles={roles.map((r) => r.title)} initialRole={role.title} />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── Other roles ── */}
        {others.length > 0 && (
          <section className="bg-dark section">
            <div className="shell">
              <Reveal>
                <Eyebrow index="+" invert>
                  More open roles
                </Eyebrow>
              </Reveal>
              <div className="mt-10 grid gap-4 md:grid-cols-3">
                {others.map((r: Role, i) => (
                  <Reveal key={roleSlug(r)} delay={i * 0.06}>
                    <Link
                      href={`/careers/${roleSlug(r)}`}
                      className="group flex h-full flex-col rounded-2xl border border-line-invert-2 bg-dark-2 p-7 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-orange/50"
                    >
                      <span className="label text-orange">{r.team}</span>
                      <h3 className="display mt-4 flex-1 text-[length:var(--text-h3)] leading-[1.05] text-on-ink transition-colors duration-200 group-hover:text-orange">
                        {r.title}
                      </h3>
                      <span className="label mt-6 inline-flex items-center gap-1.5 text-on-ink">
                        View role
                        <ArrowUpRight className="size-4 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
