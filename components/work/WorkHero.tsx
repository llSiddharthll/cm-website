"use client";

import { motion } from "motion/react";
import { CASES } from "@/lib/content";
import { EASE, DUR } from "@/lib/motion";
import { RevealLines } from "@/components/ui/Reveal";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";

/* Above-the-fold entrance — fires on mount, not on scroll. */
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: DUR.large, ease: EASE.outQuart, delay },
});

/* Stat strip — display figure over mono caption (Swiss "data" texture). */
const STAT_STRIP = [
  { value: 480, suffix: "+", label: "Projects" },
  { value: 27, suffix: "+", label: "Industries" },
  { value: 9, suffix: "yrs", label: "In craft" },
] as const;

export function WorkHero() {
  const count = CASES.length.toString().padStart(2, "0");

  return (
    <section className="bg-dark text-on-ink section overflow-hidden pt-[clamp(7rem,16vh,10rem)]">
      <div className="shell">
        {/* ── Meta row — strong rule + mono coordinates ── */}
        <motion.div
          {...fadeUp(0.05)}
          className="grid12 items-baseline gap-y-3 border-t border-on-ink/30 pt-4"
        >
          <span className="label col-span-6 text-on-ink md:col-span-5">
            <span className="text-orange">/</span>&nbsp;&nbsp;Selected Work
          </span>
          <span className="label col-span-3 hidden md:col-span-4 md:block">
            2023&ndash;2026
          </span>
          <span className="label col-span-6 md:col-span-3 md:text-right">
            {count} Case Studies
          </span>
        </motion.div>

        {/* ── The statement — an index thesis, not a showreel ── */}
        <h1 className="display-tight mt-[clamp(2.5rem,7vh,5rem)] text-[length:var(--text-display)] text-on-ink">
          <RevealLines
            lines={["PROOF OF", "THE CRAFT"]}
            className="inline"
            delay={0.2}
            stagger={0.1}
          />
          {/* orange square full-stop — the single bold accent (mirrors Hero) */}
          <motion.span
            aria-hidden
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: DUR.small, ease: EASE.outQuart, delay: 0.78 }}
            className="ml-[0.14em] inline-block aspect-square w-[0.62em] translate-y-[0.02em] bg-orange align-baseline"
          />
        </h1>

        {/* ── Lede + stat strip — asymmetric counterweight on the right cols ── */}
        <div className="grid12 mt-[clamp(2.5rem,6vh,4.5rem)] items-end gap-y-12 border-t border-line-invert pt-7">
          <motion.p
            {...fadeUp(0.55)}
            className="col-span-6 max-w-xl text-[length:var(--text-lead)] leading-snug text-on-ink-2"
          >
            Not a showreel &mdash; a ledger of outcomes. Brands rebuilt, funnels
            engineered and stories that travel,{" "}
            <span className="text-on-ink">measured, not decorated.</span>
          </motion.p>

          <motion.ul
            {...fadeUp(0.65)}
            className="col-span-6 grid grid-cols-3 md:col-span-5 md:col-start-8"
          >
            {STAT_STRIP.map((stat, i) => (
              <li
                key={stat.label}
                className={
                  i === 0
                    ? "flex flex-col gap-1.5"
                    : "flex flex-col gap-1.5 border-l border-line-invert pl-4"
                }
              >
                <span className="display text-[length:var(--text-h3)] text-on-ink">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </span>
                <span className="label text-on-ink-3">{stat.label}</span>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* ── Bottom hairline — the four disciplines, one orange marker each ── */}
        <motion.div
          {...fadeUp(0.8)}
          className="mt-[clamp(3rem,7vh,5rem)] border-t border-line-invert pt-4"
        >
          <span className="mono text-on-ink-3">
            Strategy <span className="text-orange">&middot;</span> Design{" "}
            <span className="text-orange">&middot;</span> Code{" "}
            <span className="text-orange">&middot;</span> Content
          </span>
        </motion.div>
      </div>
    </section>
  );
}
