import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getCareers } from "@/lib/cms";
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

/** Env fallbacks, so an embed can be set without touching the CMS. */
const ENV_EMBED_URL = process.env.NEXT_PUBLIC_CAREERS_EMBED_URL || "";
const ENV_EMBED_CODE = process.env.NEXT_PUBLIC_CAREERS_EMBED_CODE || "";

export default async function ApplyPage() {
  const careers = await getCareers();

  // CMS wins; env is the fallback. Either replaces the built-in form.
  const embedUrl = careers.applyEmbedUrl || ENV_EMBED_URL;
  const embedCode = careers.applyEmbedCode || ENV_EMBED_CODE;
  const embedHeight = careers.applyEmbedHeight || 1100;

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
                Back to careers
              </Link>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mono mt-8 text-on-ink-3">Careers · Application</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="display-tight mt-4 max-w-[16ch] text-[length:var(--text-h2)] text-on-ink">
                Apply to Creative Monk<span className="text-orange">.</span>
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

        {/* ── Form — embedded (external ATS / Google Form) or built-in ── */}
        <section className="bg-dark section pt-0">
          <div className="shell">
            <div className="mx-auto max-w-3xl border-t border-line-invert pt-12">
              {embedCode ? (
                <div
                  className="cm-embed [&_iframe]:w-full [&_iframe]:rounded-lg [&_iframe]:border-0"
                  // Admin-authored embed snippet from the CMS — trusted content.
                  dangerouslySetInnerHTML={{ __html: embedCode }}
                />
              ) : embedUrl ? (
                <iframe
                  src={embedUrl}
                  title="Application form"
                  loading="lazy"
                  height={embedHeight}
                  className="w-full rounded-lg border-0 bg-dark-2"
                  sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              ) : (
                <ApplicationForm />
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
