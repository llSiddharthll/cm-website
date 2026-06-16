"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { AWARDS } from "@/lib/content";
import { EASE, DUR, VIEWPORT } from "@/lib/motion";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function Awards() {
  // The Global 100 2026 win leads the list — feature it as a plinth.
  const [feature, ...rest] = AWARDS;

  return (
    <section id="awards" className="bg-paper section">
      <div className="shell">
        {/* ── Header ── */}
        <div className="grid12 items-end gap-y-8 rule-strong pt-6">
          <div className="col-span-6 md:col-span-7">
            <Eyebrow index="07">Recognition</Eyebrow>
            <h2 className="display mt-6 text-[length:var(--text-h2)] text-ink">
              Quietly decorated.
            </h2>
          </div>
          <p className="mono col-span-6 self-end text-ink-3 md:col-span-4 md:col-start-9 md:text-right">
            Honours &amp; nominations
            <br />
            {AWARDS.length} entries on the wall
          </p>
        </div>

        {/* ── Body: featured plinth beside the table ── */}
        <div className="grid12 mt-16 gap-y-12 md:mt-24">
          {/* Featured — AWARDS[0], museum plinth */}
          <Reveal className="col-span-6 md:col-span-4">
            <figure className="bg-paper-3 flex h-full flex-col justify-between gap-12 p-8 md:p-10">
              <div className="flex items-center justify-between">
                <span className="label text-ink">Award of the year</span>
                <span aria-hidden className="block size-3 bg-orange" />
              </div>
              <figcaption>
                <span className="display-tight block text-[length:var(--text-h2)] tabular-nums text-ink">
                  {feature.year}
                </span>
                <h3 className="display mt-5 text-[length:var(--text-h3)] text-ink">
                  {feature.title}
                </h3>
                <p className="mono mt-5 text-ink-3">{feature.org}</p>
              </figcaption>
            </figure>
          </Reveal>

          {/* Table — remaining awards as hairline rows */}
          <ol className="col-span-6 md:col-span-7 md:col-start-6">
            {rest.map((award, i) => (
              <AwardRow
                key={award.title}
                index={String(i + 2).padStart(2, "0")}
                title={award.title}
                org={award.org}
                year={award.year}
                delay={i * 0.06}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function AwardRow({
  index,
  title,
  org,
  year,
  delay,
}: {
  index: string;
  title: string;
  org: string;
  year: string;
  delay: number;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: DUR.large, ease: EASE.outQuart, delay }}
      className="group rule first:border-t-0"
    >
      <div className="grid12 items-baseline gap-y-2 py-7 md:py-8">
        {/* index + title */}
        <div className="col-span-6 flex items-baseline gap-4 md:col-span-7 md:gap-6">
          <span className="mono shrink-0 tabular-nums text-ink-4 transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-orange">
            {index}
          </span>
          <h3 className="display flex items-baseline gap-3 text-[length:var(--text-h3)] text-ink transition-[color,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 group-hover:text-orange">
            {title}
            <ArrowUpRight
              aria-hidden
              className="size-[0.7em] shrink-0 -translate-x-2 text-orange opacity-0 transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:opacity-100"
            />
          </h3>
        </div>

        {/* org · year */}
        <p className="mono col-span-6 tabular-nums text-ink-3 md:col-span-4 md:col-start-9 md:text-right">
          {org}
          <span className="text-ink-4"> · {year}</span>
        </p>
      </div>
    </motion.li>
  );
}
