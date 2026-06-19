import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SITE, NAV } from "@/lib/content";

/**
 * Footer — the dark finale. Swiss bold-minimal: 12-col grid, hairline rules,
 * mono metadata, one surgical orange accent on hover. A massive clipped
 * "CREATIVE MONK" wordmark sits as a faint structural backdrop. Server component.
 */
export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink-block text-on-ink">
      {/* Massive clipped wordmark backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 flex select-none items-end overflow-hidden"
      >
        <span className="display-tight block w-full whitespace-nowrap text-center text-[length:var(--text-mega)] leading-[0.7] text-on-ink/[0.06]">
          CREATIVE&nbsp;MONK
        </span>
      </div>

      <div className="relative shell section">
        {/* Top: logo + promise */}
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <Logo invert />
          <p className="display text-[length:var(--text-h3)] text-on-ink sm:max-w-[18ch] sm:text-right">
            {SITE.promise}
          </p>
        </div>

        {/* Big rule between top and columns */}
        <div className="rule-strong mt-10 border-on-ink/80" />

        {/* Columns */}
        <div className="grid12 mt-12 gap-y-12">
          {/* (a) Brand */}
          <div className="col-span-6 md:col-span-5">
            <Eyebrow index="00" invert>
              Studio
            </Eyebrow>
            <p className="mt-6 text-[length:var(--text-lead)] leading-snug text-on-ink-2">
              {SITE.tagline}.
            </p>

            <ul className="mt-8 flex flex-col gap-3">
              {SITE.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group mono inline-flex items-center gap-3 text-on-ink-2 transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-orange"
                  >
                    <span
                      aria-hidden
                      className="size-2 shrink-0 bg-on-ink-2 transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-orange"
                    />
                    <span className="min-w-[5.5rem] uppercase tracking-[0.12em] text-on-ink/90 transition-colors duration-200 group-hover:text-orange">
                      {social.label}
                    </span>
                    <span>{social.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* (b) Navigate */}
          <nav className="col-span-3 md:col-span-3" aria-label="Footer">
            <Eyebrow invert>Navigate</Eyebrow>
            <ul className="mt-6 flex flex-col gap-3">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group mono relative inline-block w-fit text-on-ink-2 transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-on-ink"
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-orange transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* (c) Contact */}
          <div className="col-span-3 md:col-span-4">
            <Eyebrow invert>Contact</Eyebrow>
            <ul className="mt-6 flex flex-col gap-5">
              <li>
                <span className="label block text-on-ink-2/70">Email</span>
                <a
                  href={`mailto:${SITE.email}`}
                  className="mono mt-1 inline-block text-on-ink transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-orange"
                >
                  {SITE.email}
                </a>
              </li>
              <li>
                <span className="label block text-on-ink-2/70">Phone</span>
                <a
                  href={`tel:${SITE.phoneHref}`}
                  className="mono mt-1 inline-block text-on-ink transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-orange"
                >
                  {SITE.phone}
                </a>
              </li>
              <li>
                <span className="label block text-on-ink-2/70">Studio</span>
                <p className="mono mt-1 max-w-[28ch] leading-relaxed text-on-ink-2">
                  {SITE.address}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative shell">
        <div className="rule flex flex-col gap-3 border-on-ink/15 py-7 sm:flex-row sm:items-center sm:justify-between">
          <span className="mono text-on-ink-2">© 2026 Creative Monk</span>
          <span className="mono hidden text-on-ink-2 sm:inline-flex sm:items-center sm:gap-2.5">
            <span aria-hidden className="size-1.5 bg-orange" />
            Crafted in Chandigarh
          </span>
          <a
            href="#top"
            className="group mono inline-flex items-center gap-2 text-on-ink-2 transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-orange"
          >
            Back to top
            <span
              aria-hidden
              className="inline-block transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5"
            >
              ↑
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
