"use client";

import { SITE } from "@/lib/content";
import { STAT_BAR } from "@/lib/agency";
import { IMG } from "@/lib/media";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

/**
 * Full-bleed dark CTA moment — the last big push before the contact form.
 * Giant invite + dual CTA, anchored by a mini proof-stat row.
 */
export function BigCTA({
  site = SITE,
  statBar = STAT_BAR,
}: {
  site?: typeof SITE;
  statBar?: readonly { value: string; suffix?: string; label: string }[];
}) {
  return (
    <section className="bg-dark text-on-ink section relative overflow-hidden">
      {/* atmosphere — dark office, dimmed under a scrim for legibility */}
      <img
        src={IMG.bigCta}
        alt=""
        className="pointer-events-none absolute inset-0 size-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-dark/60" />

      <div className="shell relative z-10">
        <Reveal>
          <Eyebrow invert>Let’s talk</Eyebrow>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="display-tight mt-6 text-[length:var(--text-display)] text-on-ink">
            Let’s build something you own
            <span
              className="ml-2 inline-block size-[0.5em] bg-orange align-baseline"
              aria-hidden
            />
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-8 max-w-2xl text-[length:var(--text-lead)] leading-snug text-on-ink-2">
            Tell us where you’re headed and we’ll map the first move — no decks
            to sit through, just a straight conversation about what we’d build
            together.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={`mailto:${site.email}`} variant="primary" size="lg">
              Book a strategy call
            </Button>
            <Button href={site.whatsapp} variant="invert" size="lg" arrow={false}>
              WhatsApp
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.32}>
          <dl className="mt-16 grid grid-cols-2 border-t border-line-invert pt-8 lg:grid-cols-4">
            {statBar.map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <dt className="display text-[length:var(--text-h2)] leading-none text-on-ink">
                  {s.value}
                  <span className="text-orange">{s.suffix}</span>
                </dt>
                <dd className="label text-on-ink-3">{s.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
