import Link from "next/link";
import { ArrowRight, ArrowUp } from "lucide-react";
import { getSite, getFooterGroups } from "@/lib/cms";
import { PSEO_SERVICES, PSEO_PLACES, PSEO_INDUSTRIES } from "@/lib/pseo";
import { Logo } from "@/components/layout/Logo";
import { Magnetic } from "@/components/fx/Magnetic";
import { NewsletterForm } from "./NewsletterForm";

const YEAR = 2026;

/** Services surfaced in the footer directory (high local-intent first). */
const FOOTER_SVCS = ["digital-marketing", "seo", "google-ads", "social-media-marketing", "web-development", "branding"]
  .map((slug) => PSEO_SERVICES.find((s) => s.slug === slug)!)
  .filter(Boolean);

/**
 * Site footer.
 *
 * `hideCta` drops the "Let's build something you own" band, use it on pages
 * that already end with their own CTA, so the two don't stack (e.g. /careers).
 */
export async function Footer({ hideCta = false }: { hideCta?: boolean } = {}) {
  const [SITE, footerGroups] = await Promise.all([
    getSite(),
    getFooterGroups(),
  ]);
  return (
    <footer className="relative isolate overflow-hidden bg-dark text-on-ink">
      <div className="shell relative z-10">
        {/* ── CTA band ── */}
        {!hideCta && (
          <div className="grid12 items-center gap-y-10 border-b border-line-invert py-[clamp(3.5rem,7vw,6rem)]">
            <div className="col-span-12 md:col-span-7">
              <span className="label text-on-ink-3">Let’s talk</span>
              <h2 className="display-tight mt-4 text-[length:var(--text-h2)] text-on-ink">
                Let’s build something
                <br />
                you own
                <span className="ml-2 inline-block size-[0.4em] translate-y-[0.02em] bg-orange align-baseline" />
              </h2>
            </div>
            <div className="col-span-12 flex flex-col gap-4 md:col-span-4 md:col-start-9 md:items-end">
              <a
                href={`mailto:${SITE.email}`}
                className="display text-[length:var(--text-h3)] text-on-ink transition-colors hover:text-orange"
              >
                {SITE.email}
              </a>
              <Magnetic>
                <Link
                  href="/contact"
                  className="group label inline-flex h-12 items-center gap-2 bg-orange px-6 text-on-orange transition-colors hover:bg-orange-press"
                >
                  Book a strategy call
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </Magnetic>
            </div>
          </div>
        )}

        {/* ── Columns ── */}
        <div className="grid12 gap-x-8 gap-y-12 py-[clamp(3rem,5vw,4.5rem)]">
          {/* brand + newsletter + socials + contact */}
          <div className="col-span-12 md:col-span-4">
            <Logo invert />
            <p className="mt-5 max-w-xs text-on-ink-2">
              {SITE.tagline}, a full-service creative &amp; growth studio from{" "}
              {SITE.city.split(" · ")[0]}.
            </p>
            <NewsletterForm />

            {/* contact */}
            <ul className="mt-7 space-y-2 text-on-ink-2">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="transition-colors hover:text-orange"
                >
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phoneHref}`}
                  className="transition-colors hover:text-orange"
                >
                  {SITE.phone}
                </a>
              </li>
              <li className="max-w-[26ch] text-on-ink-3">{SITE.address}</li>
            </ul>

            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {SITE.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mono text-on-ink-2 transition-colors hover:text-orange"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* right: nav columns + services directory (keeps the footer full) */}
          <div className="col-span-12 md:col-span-8">
            <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
              {footerGroups.map((group) => (
                <div key={group.title}>
                  <span className="label mb-5 block text-on-ink-3">{group.title}</span>
                  <ul className="space-y-3">
                    {group.links.map((l) => (
                      <li key={l.label}>
                        <Link
                          href={l.href}
                          className="text-on-ink-2 transition-colors hover:text-on-ink"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Industries */}
              <div>
                <span className="label mb-5 block text-on-ink-3">Industries</span>
                <ul className="space-y-3">
                  {PSEO_INDUSTRIES.map((ind) => (
                    <li key={ind.slug}>
                      <Link
                        href={`/digital-marketing-for-${ind.slug}`}
                        className="text-on-ink-2 transition-colors hover:text-on-ink"
                      >
                        {ind.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Locations */}
              <div>
                <span className="label mb-5 block text-on-ink-3">Locations</span>
                <ul className="space-y-3">
                  {PSEO_PLACES.map((place) => (
                    <li key={place.slug}>
                      <Link
                        href={`/digital-marketing-in-${place.slug}`}
                        className="text-on-ink-2 transition-colors hover:text-on-ink"
                      >
                        {place.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* services by city */}
            <div className="mt-14 border-t border-line-invert pt-10">
              <span className="label block text-on-ink-3">
                Our services across the Tricity
              </span>
              <div className="mt-7 grid grid-cols-2 gap-x-8 gap-y-9 sm:grid-cols-4">
                {PSEO_PLACES.map((place) => (
                  <div key={place.slug}>
                    <span className="mono mb-4 block text-on-ink">{place.name}</span>
                    <ul className="space-y-2.5">
                      {FOOTER_SVCS.map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={`/${s.slug}-in-${place.slug}`}
                            className="text-sm text-on-ink-3 transition-colors hover:text-orange"
                          >
                            {s.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Fitted wordmark ── */}
      <div
        aria-hidden
        className="pointer-events-none relative flex w-full select-none justify-center overflow-hidden px-4"
      >
        <span className="display-tight whitespace-nowrap text-center text-[clamp(2.25rem,11.5vw,11rem)] leading-[0.85] tracking-[-0.04em] text-on-ink/[0.06]">
          CREATIVE&nbsp;MONK
        </span>
      </div>

      {/* ── Bottom bar ── */}
      <div className="shell relative z-10 border-t border-line-invert">
        <div className="mono flex flex-col gap-4 py-7 text-[length:var(--text-mono)] text-on-ink-3 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {YEAR} {SITE.name}. All rights reserved.
          </p>
          <p className="hidden sm:block">Crafted in Chandigarh, India</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/privacy" className="transition-colors hover:text-on-ink">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-on-ink">
              Terms
            </Link>
            <Link
              href="#top"
              className="group inline-flex items-center gap-1.5 transition-colors hover:text-orange"
            >
              Back to top
              <ArrowUp className="size-3.5 transition-transform duration-300 group-hover:-translate-y-1" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
