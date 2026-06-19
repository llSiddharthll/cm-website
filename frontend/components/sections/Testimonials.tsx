"use client";

import { TESTIMONIALS } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

const [featured, ...rest] = TESTIMONIALS;

const initial = (name: string) => name.trim().charAt(0).toUpperCase();

export function Testimonials() {
  return (
    <section id="clients" className="bg-paper section">
      <div className="shell">
        {/* ── Header row, pinned to the grid ── */}
        <Reveal>
          <div className="grid12 items-baseline gap-y-4 rule-strong pt-5">
            <Eyebrow index="06" className="col-span-6 md:col-span-4">
              Clients
            </Eyebrow>
            <h2 className="display col-span-6 text-[length:var(--text-h3)] text-ink md:col-span-8">
              Calm people, loud results.
            </h2>
          </div>
        </Reveal>

        {/* ── Featured pull-quote — the single bold voice ── */}
        <div className="grid12 mt-[clamp(3rem,6vw,6rem)] items-start gap-y-6">
          <Reveal className="col-span-6 md:col-span-1" delay={0.05}>
            {/* leading orange square — the surgical accent */}
            <span
              aria-hidden
              className="block aspect-square w-7 bg-orange md:w-9"
            />
          </Reveal>

          <Reveal className="col-span-6 md:col-span-10 md:col-start-2" delay={0.1}>
            <figure>
              <blockquote className="display text-[length:var(--text-h3)] leading-tight text-ink">
                {featured.quote}
              </blockquote>
              <figcaption className="mono mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-ink">{featured.name}</span>
                <span aria-hidden className="text-ink-4">
                  /
                </span>
                <span className="text-ink-3">{featured.role}</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        {/* ── Supporting quotes — sharp 2-col card grid ── */}
        <div className="grid12 mt-[clamp(3rem,6vw,5rem)] gap-y-6">
          {rest.map((t, i) => (
            <Reveal
              key={t.name}
              className="col-span-6 md:col-span-6"
              delay={0.1 + i * 0.08}
            >
              <figure className="flex h-full flex-col justify-between border border-line bg-paper p-8 transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-ink">
                <blockquote className="text-[length:var(--text-lead)] leading-snug text-ink-2">
                  {t.quote}
                </blockquote>

                <figcaption className="mono mt-8 flex items-center gap-3 rule pt-5">
                  {/* orange square avatar with initial */}
                  <span
                    aria-hidden
                    className="flex size-8 shrink-0 items-center justify-center bg-orange text-on-orange"
                  >
                    {initial(t.name)}
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="text-ink">{t.name}</span>
                    <span className="text-ink-3">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
