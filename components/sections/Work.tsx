"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Plus } from "lucide-react";
import { CASES, type CaseStudy } from "@/lib/content";
import { EASE } from "@/lib/motion";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { SiteMockup } from "@/components/fx/SiteMockup";

const FEATURED = CASES.slice(0, 4);
// asymmetric 2-row layout on the 12-col grid
const SPAN = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7"];

export function Work() {
  const [openId, setOpenId] = useState<string | null>(null);
  const active = CASES.find((c) => c.id === openId) ?? null;

  return (
    <section id="work" className="section bg-paper-2">
      <div className="shell">
        {/* ── Header ── */}
        <div className="grid12 items-end gap-y-8 rule-strong pt-6">
          <div className="col-span-6 md:col-span-8">
            <Reveal>
              <Eyebrow index="03">Selected work</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="display mt-5 text-[length:var(--text-h2)] text-ink">
                Work that
                <br />
                travels<span className="text-orange">.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal
            delay={0.12}
            className="col-span-6 flex md:col-span-3 md:col-start-10 md:justify-end"
          >
            <Button href="/work" variant="outline" size="md">
              All work
            </Button>
          </Reveal>
        </div>

        {/* ── Featured tiles — click to open the sheet ── */}
        <div className="mt-14 grid12 gap-5 md:mt-20 md:gap-x-5 md:gap-y-5">
          {FEATURED.map((c, i) => (
            <Reveal
              key={c.id}
              delay={i * 0.08}
              className={`col-span-6 ${SPAN[i]}`}
            >
              <FeaturedTile c={c} index={i} onOpen={() => setOpenId(c.id)} />
            </Reveal>
          ))}
        </div>

        {/* ── Footnote ── */}
        <Reveal delay={0.1}>
          <div className="rule mt-14 flex items-baseline justify-between pt-4 md:mt-20">
            <span className="mono text-ink-3">
              <span className="text-orange">0{FEATURED.length}</span>
              <span className="px-2 text-ink-4">—</span>
              featured · tap to preview
            </span>
            <span className="mono hidden text-ink-4 sm:inline">2023 — 2026</span>
          </div>
        </Reveal>
      </div>

      {/* ── The sheet ── */}
      <BottomSheet
        open={!!active}
        onClose={() => setOpenId(null)}
        label={active ? `Featured · ${active.year}` : undefined}
        title={active?.client}
      >
        {active && <SheetBody c={active} />}
      </BottomSheet>
    </section>
  );
}

function FeaturedTile({
  c,
  index,
  onOpen,
}: {
  c: CaseStudy;
  index: number;
  onOpen: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: EASE.outQuart }}
      className="group/tile relative block h-[clamp(15rem,22vw,22rem)] w-full overflow-hidden border border-line bg-ink-block text-left"
      aria-label={`Preview ${c.client} — ${c.title}`}
    >
      {/* ghost index */}
      <span
        aria-hidden
        className="display pointer-events-none absolute -bottom-6 -right-2 select-none text-[9rem] font-black leading-none text-on-ink/[0.05]"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      {/* orange wipe */}
      <span
        aria-hidden
        className="absolute inset-0 origin-bottom scale-y-0 bg-orange transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/tile:scale-y-100"
      />

      <div className="relative flex h-full flex-col justify-between p-6">
        <div className="flex items-center justify-between">
          <span className="label text-on-ink/70 transition-colors group-hover/tile:text-on-orange">
            {c.category.join(" · ")}
          </span>
          <span className="flex size-9 items-center justify-center border border-on-ink/25 transition-colors group-hover/tile:border-on-orange/40">
            <Plus className="size-4 text-on-ink transition-transform duration-300 group-hover/tile:rotate-90 group-hover/tile:text-on-orange" strokeWidth={2} />
          </span>
        </div>

        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="label text-on-ink/60 transition-colors group-hover/tile:text-on-orange/80">
              {c.client}
            </span>
            <p className="display mt-2 max-w-[18ch] text-[length:var(--text-h3)] leading-[1.05] text-on-ink transition-colors group-hover/tile:text-on-orange">
              {c.title}
            </p>
          </div>
          <div className="shrink-0 text-right">
            <span className="display block text-3xl leading-none text-orange transition-colors group-hover/tile:text-on-orange">
              {c.metric.value}
            </span>
            <span className="label mt-1 block text-on-ink/50 transition-colors group-hover/tile:text-on-orange/70">
              {c.metric.label}
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

function SheetBody({ c }: { c: CaseStudy }) {
  return (
    <div className="grid12 gap-y-10 pb-4">
      {/* left meta — sticky while the long screenshot scrolls */}
      <div className="col-span-12 md:col-span-4 md:sticky md:top-2 md:self-start">
        <p className="display text-[length:var(--text-h3)] leading-[1.1] text-ink">
          {c.title}
        </p>
        <p className="mt-5 max-w-sm text-ink-2">{c.result}</p>

        <div className="mt-8 border-t border-ink pt-4">
          <span className="display block text-[clamp(2.5rem,5vw,3.5rem)] leading-none text-orange">
            {c.metric.value}
          </span>
          <span className="label mt-2 block text-ink-3">{c.metric.label}</span>
        </div>

        <ul className="mt-8 flex flex-wrap gap-2">
          {c.category.map((t) => (
            <li key={t} className="mono border border-line px-3 py-1.5 text-ink-2">
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <Button href={`/work/${c.id}`} variant="dark" size="md">
            View full case
          </Button>
        </div>
      </div>

      {/* right — the long website screenshot */}
      <div className="col-span-12 md:col-span-7 md:col-start-6">
        <div className="mb-3 flex items-center gap-2 text-ink-3">
          <ArrowUpRight className="size-4" />
          <span className="label">Site capture · {c.client}</span>
        </div>
        <SiteMockup c={c} />
      </div>
    </div>
  );
}
