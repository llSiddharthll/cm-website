"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { EASE, VIEWPORT } from "@/lib/motion";

type Stat = { label: string; value: string; suffix?: string };

function numeric(v: string): number {
  const m = String(v).replace(/,/g, "").match(/[\d.]+/);
  return m ? parseFloat(m[0]) : 0;
}

export function StatsGraph({ stats }: { stats: Stat[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: VIEWPORT.once, amount: 0.3 });
  const valid = stats.filter((s) => s.value);
  if (!valid.length) return null;
  const max = Math.max(...valid.map((s) => numeric(s.value)), 1);

  return (
    <div ref={ref} className="space-y-8">
      {valid.map((s, i) => {
        const pct = Math.max(8, Math.round((numeric(s.value) / max) * 100));
        return (
          <div key={i} className="border-t border-line-invert pt-5">
            <div className="flex items-end justify-between gap-4">
              <span className="label text-on-ink-2">{s.label}</span>
              <span className="display text-[length:var(--text-h2)] leading-none text-on-ink">
                {s.value}
                {s.suffix && <span className="text-on-ink-3">{s.suffix}</span>}
              </span>
            </div>
            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-line-invert">
              <motion.div
                className="h-full origin-left rounded-full bg-orange"
                style={{ width: `${pct}%` }}
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1.1, ease: EASE.outQuart, delay: i * 0.12 }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
