import Link from "next/link";
import { ArrowRight, ArrowUp } from "lucide-react";
import { getSite, getFooterGroups, getLocations } from "@/lib/cms";
import { Logo } from "@/components/layout/Logo";
import { Magnetic } from "@/components/fx/Magnetic";
import { NewsletterForm } from "./NewsletterForm";

const YEAR = 2026;

export async function Footer() {
  const [SITE, footerGroups, LOCATIONS] = await Promise.all([
    getSite(),
    getFooterGroups(),
    getLocations(),
  ]);
  return (
    <footer className="relative isolate overflow-hidden bg-dark text-on-ink">
      <div className="shell relative z-10">
        {/* ── CTA band ── */}
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

        {/* ── Columns ── */}
        <div className="grid12 gap-x-8 gap-y-12 py-[clamp(3rem,5vw,4.5rem)]">
          {/* brand + newsletter + socials */}
          <div className="col-span-12 md:col-span-4">
            <Logo invert />
            <p className="mt-5 max-w-xs text-on-ink-2">
              {SITE.tagline} — a full-service creative &amp; growth studio from{" "}
              {SITE.city.split(" · ")[0]}.
            </p>
            <NewsletterForm />
            <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2">
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

          {/* link groups */}
          {footerGroups.map((group) => (
            <div key={group.title} className="col-span-6 md:col-span-2">
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

          {/* contact */}
          <div className="col-span-6 md:col-span-2">
            <span className="label mb-5 block text-on-ink-3">Contact</span>
            <ul className="space-y-3 text-on-ink-2">
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
              <li className="max-w-[16ch] text-on-ink-3">{SITE.address}</li>
            </ul>
          </div>

          {/* locations */}
          <div className="col-span-6 md:col-span-2">
            <span className="label mb-5 block text-on-ink-3">Studios</span>
            <ul className="space-y-3">
              {[...LOCATIONS.india.slice(0, 3), ...LOCATIONS.global.slice(0, 3)].map(
                (c) => (
                  <li key={c} className="text-on-ink-2">
                    {c}
                  </li>
                ),
              )}
            </ul>
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
