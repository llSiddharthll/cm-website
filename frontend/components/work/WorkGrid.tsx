"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { CASES } from "@/lib/content";
import { EASE, DUR } from "@/lib/motion";
import { useInfiniteList } from "@/lib/useInfiniteList";
import { Reveal } from "@/components/ui/Reveal";
import { LoadMore } from "@/components/ui/LoadMore";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ReelPlaceholder } from "@/components/fx/ReelPlaceholder";
import { Tilt } from "@/components/fx/Tilt";

const ALL = "All";

export function WorkGrid({ cases = CASES }: { cases?: typeof CASES }) {
  const [filter, setFilter] = useState<string>(ALL);

  // Unique categories across every case, in first-seen order, prefixed with "All".
  const categories = useMemo(() => {
    const seen = new Set<string>();
    for (const c of cases) for (const cat of c.category) seen.add(cat);
    return [ALL, ...seen];
  }, [cases]);

  const filtered = useMemo(
    () =>
      filter === ALL
        ? cases
        : cases.filter((c) => c.category.includes(filter)),
    [filter, cases],
  );

  const { visible, hasMore, shown, total, sentinelRef } = useInfiniteList(filtered, {
    step: 8,
    resetKey: filter,
  });

  return (
    <section className="bg-dark text-on-ink section">
      <div className="shell">
        {/* ---- Header ---------------------------------------------------- */}
        <div className="grid12 items-end gap-y-8">
          <div className="col-span-6 md:col-span-8">
            <Reveal>
              <Eyebrow index="02" invert>
                Selected Work
              </Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="display-tight mt-5 text-[length:var(--text-h2)] text-on-ink">
                Selected projects<span className="text-orange">.</span>
              </h2>
            </Reveal>
          </div>

          {/* Live count — mono data texture */}
          <Reveal delay={0.1} className="col-span-6 md:col-span-4 md:text-right">
            <span className="mono text-on-ink-3">
              [ {String(total).padStart(2, "0")} ] case
              {total === 1 ? "" : "s"}
            </span>
          </Reveal>
        </div>

        {/* ---- Filter bar — sharp pills, active bg slides via layoutId --- */}
        <Reveal delay={0.12}>
          <div
            role="tablist"
            aria-label="Filter work by discipline"
            className="mt-10 flex flex-wrap gap-2 border-t border-on-ink/40 pt-6"
          >
            {categories.map((cat) => {
              const active = filter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(cat)}
                  className={[
                    "relative isolate rounded-none border px-4 py-2",
                    "mono transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    active
                      ? "border-orange text-on-orange"
                      : "border-line-invert text-on-ink-2 hover:border-on-ink/40 hover:text-on-ink",
                  ].join(" ")}
                >
                  {active && (
                    <motion.span
                      layoutId="work-filter-active"
                      aria-hidden
                      className="absolute inset-0 -z-10 bg-orange"
                      transition={{ duration: DUR.medium, ease: EASE.outQuart }}
                    />
                  )}
                  {cat}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* ---- Case grid: 2-up desktop, offset rhythm -------------------- */}
        <motion.div
          layout
          className="grid12 mt-16 gap-y-20 md:gap-y-28"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((c, i) => (
              <motion.article
                layout
                key={c.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ duration: DUR.medium, ease: EASE.outQuart }}
                className={[
                  "group col-span-6",
                  // offset every other card down on desktop for asymmetric balance
                  i % 2 === 1 ? "md:mt-24" : "",
                ].join(" ")}
              >
                <Tilt>
                <Link
                  href={`/work/${c.id}`}
                  className="block focus:outline-none"
                  aria-label={`${c.client} — ${c.title}`}
                >
                  {/* Visual + caption share one elevated dark card, crisp lift on hover */}
                  <div className="border border-line-invert-2 bg-dark-2 p-3 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5 group-hover:border-orange/50">
                    {c.cover ? (
                      <div className="relative aspect-[3/2] overflow-hidden bg-dark-3">
                        <Image
                          src={c.cover}
                          alt={`${c.client} — ${c.title}`}
                          fill
                          sizes="(min-width: 768px) 46vw, 92vw"
                          className="object-cover transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                        />
                      </div>
                    ) : (
                      <ReelPlaceholder
                        title={c.client}
                        category={c.category[0]}
                        index={String(i + 1).padStart(2, "0")}
                        ratio="16/9"
                      />
                    )}

                    {/* Caption — hairline rule, internal grid */}
                    <div className="mt-6 grid12 gap-y-6 border-t border-line-invert-2 px-1 pb-1 pt-6">
                      <div className="col-span-6 md:col-span-8">
                        <div className="flex items-baseline justify-between gap-4">
                          <span className="label">{c.client}</span>
                          <span className="mono text-on-ink-3">{c.year}</span>
                        </div>

                        <h3 className="display mt-3 text-[length:var(--text-h3)] text-on-ink">
                          {c.title}
                        </h3>

                        <p className="mt-3 max-w-prose text-on-ink-2">{c.result}</p>

                        {/* Category chips — sharp hairline */}
                        <div className="mt-5 flex flex-wrap gap-2">
                          {c.category.map((cat) => (
                            <span
                              key={cat}
                              className="mono rounded-none border border-line-invert px-3 py-1 text-on-ink-2"
                            >
                              {cat}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Metric callout — the single bold orange moment */}
                      <div className="col-span-6 min-w-0 md:col-span-4 md:text-right">
                        <span className="display block text-[clamp(1.6rem,2.6vw,2.4rem)] leading-[0.95] text-orange [overflow-wrap:anywhere] [hyphens:none]">
                          {c.metric.value}
                        </span>
                        <span className="label mt-3 block">{c.metric.label}</span>
                      </div>
                    </div>
                  </div>

                  {/* View-case affordance */}
                  <span className="mono mt-6 inline-flex items-center gap-1.5 text-on-ink transition-colors duration-200 group-hover:text-orange">
                    View case
                    <ArrowUpRight
                      className="size-4 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={2}
                      aria-hidden
                    />
                  </span>
                </Link>
                </Tilt>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        <LoadMore
          sentinelRef={sentinelRef}
          hasMore={hasMore}
          shown={shown}
          total={total}
          noun="cases"
        />
      </div>
    </section>
  );
}
