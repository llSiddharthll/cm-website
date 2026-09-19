import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Briefcase, Clock, MapPin, Wallet } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { getRoles } from "@/lib/cms";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/agency/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Prose } from "@/components/ui/Prose";
import { Aurora } from "@/components/fx/Aurora";

export const revalidate = 60;

const stripHtml = (html = "") =>
  html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

async function findRole(slug: string) {
  const roles = await getRoles();
  return roles.find((r) => r.slug === slug) ?? null;
}

export async function generateStaticParams() {
  const roles = await getRoles();
  return roles.filter((r) => r.slug).map((r) => ({ slug: r.slug as string }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const role = await findRole(slug);
  if (!role) return buildMetadata({ title: "Role not found", path: `/careers/${slug}` });
  return buildMetadata({
    title: `${role.title}, Careers`,
    description: role.summary || stripHtml(role.description).slice(0, 160),
    path: `/careers/${slug}`,
  });
}

export default async function RolePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const role = await findRole(slug);
  if (!role) notFound();

  const roles = await getRoles();
  const others = roles.filter((r) => r.slug && r.slug !== slug).slice(0, 4);
  const applyHref = role.applyUrl || `/careers/apply?role=${encodeURIComponent(slug)}`;

  const meta = [
    role.type && { icon: Briefcase, value: role.type },
    role.location && { icon: MapPin, value: role.location },
    role.experience && { icon: Clock, value: role.experience },
    role.salary && { icon: Wallet, value: role.salary },
  ].filter(Boolean) as { icon: typeof Briefcase; value: string }[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: role.title,
    description: role.description || role.summary || "",
    employmentType: (role.type || "Full-time").toUpperCase().replace(/-/g, "_"),
    hiringOrganization: {
      "@type": "Organization",
      name: "Creative Monk",
      sameAs: "https://thecreativemonk.in",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: role.location || "Zirakpur",
        addressRegion: "Punjab",
        addressCountry: "IN",
      },
    },
    directApply: true,
  };

  return (
    <>
      <span id="top" className="absolute top-0" aria-hidden />
      <Header dark />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="bg-dark text-on-ink">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-dark pb-12 pt-[clamp(8rem,18vh,12rem)]">
          <Aurora className="opacity-60" />
          <div className="shell relative">
            <Reveal>
              <Link
                href="/careers"
                className="label group/back inline-flex items-center gap-2 text-on-ink-2 transition-colors hover:text-orange"
              >
                <ArrowLeft className="size-4 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/back:-translate-x-1" />
                All open roles
              </Link>
            </Reveal>
            {role.team && (
              <Reveal delay={0.05}>
                <span className="mono mt-8 block text-orange">{role.team}</span>
              </Reveal>
            )}
            <Reveal delay={0.08}>
              <h1 className="display-tight mt-3 max-w-[18ch] text-[length:var(--text-h1)] leading-[0.95] text-on-ink">
                {role.title}
                <span className="text-orange">.</span>
              </h1>
            </Reveal>
            {role.summary && (
              <Reveal as="span" delay={0.12} className="mt-6 block max-w-xl text-[length:var(--text-lead)] leading-snug text-on-ink-2">
                {role.summary}
              </Reveal>
            )}
            {meta.length > 0 && (
              <Reveal delay={0.16} className="mono mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-on-ink-3">
                {meta.map((m) => (
                  <span key={m.value} className="inline-flex items-center gap-2">
                    <m.icon className="size-4 text-orange" />
                    {m.value}
                  </span>
                ))}
              </Reveal>
            )}
            <Reveal delay={0.2} className="mt-10">
              <Button href={applyHref} variant="primary" size="lg">
                Apply for this role
              </Button>
            </Reveal>
          </div>
        </section>

        {/* ── Description ── */}
        <section className="bg-dark section pt-4">
          <div className="shell">
            <div className="grid12 gap-y-12">
              <div className="col-span-12 md:col-span-8">
                {role.description ? (
                  <Prose html={role.description} className="max-w-3xl" />
                ) : (
                  <p className="text-on-ink-2">{role.summary}</p>
                )}
                <div className="mt-10">
                  <Button href={applyHref} variant="primary" size="lg">
                    Apply for this role
                  </Button>
                </div>
              </div>

              {/* ── Snapshot / other roles ── */}
              <aside className="col-span-12 md:col-span-3 md:col-start-10">
                <div className="sticky top-28 border border-line-invert bg-dark-2 p-6">
                  <span className="label text-on-ink-3">At a glance</span>
                  <dl className="mt-4 space-y-3 text-sm">
                    {role.type && (
                      <div><dt className="mono text-on-ink-3">Type</dt><dd className="text-on-ink">{role.type}</dd></div>
                    )}
                    {role.location && (
                      <div><dt className="mono text-on-ink-3">Location</dt><dd className="text-on-ink">{role.location}</dd></div>
                    )}
                    {role.experience && (
                      <div><dt className="mono text-on-ink-3">Experience</dt><dd className="text-on-ink">{role.experience}</dd></div>
                    )}
                    {role.salary && (
                      <div><dt className="mono text-on-ink-3">Compensation</dt><dd className="text-on-ink">{role.salary}</dd></div>
                    )}
                  </dl>
                </div>
              </aside>
            </div>

            {others.length > 0 && (
              <div className="mt-20 border-t border-line-invert pt-10">
                <span className="label text-on-ink-3">Other open roles</span>
                <div className="mt-6 divide-y divide-line-invert border-y border-line-invert">
                  {others.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/careers/${r.slug}`}
                      className="group/o flex items-center justify-between gap-4 py-5"
                    >
                      <span className="flex items-baseline gap-3">
                        {r.team && <span className="mono text-orange">{r.team}</span>}
                        <span className="display text-[length:var(--text-h3)] text-on-ink transition-colors group-hover/o:text-orange">
                          {r.title}
                        </span>
                      </span>
                      <ArrowRight className="size-4 shrink-0 text-on-ink-3 transition-all duration-200 group-hover/o:translate-x-1 group-hover/o:text-orange" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
