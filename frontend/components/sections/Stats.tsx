"use client";

import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { STATS } from "@/lib/content";

/**
 * Stats — dark bold band. Numbers are the hero, but SIZED TO FIT their cells:
 * a contained clamp (not the full display scale) so four figures sit cleanly on
 * one row without colliding. Hairline-ruled like a data sheet; one figure orange.
 */
export function Stats() {
  return (
    <section className="section overflow-hidden bg-ink-block text-on-ink">
      <div className="shell">
        {/* Claim row */}
        <div className="grid12 items-end gap-y-8 border-b border-line-invert pb-10">
          <div className="col-span-6 md:col-span-7">
            <Reveal>
              <Eyebrow index="05" invert>
                In numbers
              </Eyebrow>
            </Reveal>
            <Reveal delay={0.08} className="mt-6">
              <h2 className="display text-[length:var(--text-h2)] leading-[0.95] text-on-ink">
                Proof, not <span className="text-orange">promises</span>
                <span
                  aria-hidden
                  className="ml-2 inline-block size-[0.4em] translate-y-[0.02em] bg-orange align-baseline"
                />
              </h2>
            </Reveal>
          </div>
          <Reveal
            delay={0.16}
            className="col-span-6 md:col-span-4 md:col-start-9 md:pb-2"
          >
            <p className="text-[length:var(--text-body)] text-on-ink-2 md:text-right">
              Nine years of compounding work, measured. The figures move when
              you do.
            </p>
          </Reveal>
        </div>

        {/* The figures — 4-up, each contained in its cell */}
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => {
            const orange = i === 1; // spend the orange once
            return (
              <Reveal
                key={stat.label}
                as="div"
                delay={i * 0.08}
                className="flex flex-col justify-between gap-12 border-line-invert py-10 pr-4
                           [&:nth-child(n+3)]:border-t lg:[&:nth-child(n+3)]:border-t-0
                           [&:not(:nth-child(2n+1))]:border-l [&:not(:nth-child(2n+1))]:pl-6
                           lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:pl-6"
              >
                <span className="mono text-on-ink-2" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div>
                  <AnimatedNumber
                    value={stat.value}
                    suffix={stat.suffix}
                    className={`display block text-[clamp(2.75rem,1.5rem+4vw,5.5rem)] leading-[0.85] tracking-[-0.04em] tabular-nums ${
                      orange ? "text-orange" : "text-on-ink"
                    }`}
                  />
                  <dt className="label mt-4 block text-on-ink-2">
                    {stat.label}
                  </dt>
                </div>
              </Reveal>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
