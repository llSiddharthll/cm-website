import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getRoles } from "@/lib/cms";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/agency/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { ApplicationForm } from "@/components/careers/ApplicationForm";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Apply",
  description:
    "Apply to join Creative Monk — a short form to tell us who you are and what you'd build here.",
};

export default async function ApplyPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const { role } = await searchParams;
  const ROLES = await getRoles();
  const titles = ROLES.map((r) => r.title);

  return (
    <>
      <span id="top" className="absolute top-0" aria-hidden />
      <Header dark />
      <main className="bg-dark text-on-ink">
        {/* ── Header ── */}
        <section className="bg-dark pb-12 pt-[clamp(8rem,18vh,12rem)]">
          <div className="shell">
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
              <p className="mono mt-8 text-on-ink-3">Careers · Application</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="display-tight mt-4 max-w-[16ch] text-[length:var(--text-h2)] text-on-ink">
                {role ? (
                  <>
                    Apply — <span className="text-orange">{role}</span>
                  </>
                ) : (
                  <>
                    Apply to Creative Monk<span className="text-orange">.</span>
                  </>
                )}
              </h1>
            </Reveal>
            <Reveal
              as="span"
              delay={0.12}
              className="mt-6 block max-w-xl text-on-ink-2"
            >
              One short form — no login, no portal. Tell us who you are and what
              you&rsquo;d build here. A resume link is enough.
            </Reveal>
          </div>
        </section>

        {/* ── Form ── */}
        <section className="bg-dark section pt-0">
          <div className="shell">
            <div className="mx-auto max-w-3xl border-t border-line-invert pt-12">
              <ApplicationForm roles={titles} initialRole={role} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
