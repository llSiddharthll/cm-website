"use client";

import { PROCESS, SITE } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

const STUDIO_FACTS: [string, string][] = [
  ["Founded", String(SITE.founded)],
  ["Based", "Chandigarh · IN"],
  ["Team", "In-house"],
  ["Engagement", "Retainer / Project"],
];

/**
 * STUDIO / ABOUT — Swiss bold-minimal.
 * (1) A statement on the 12-col grid: small eyebrow left, oversized
 *     low-contrast statement right with key monk-metaphor phrases lifted to
 *     full ink. One quiet supporting paragraph.
 * (2) PROCESS: four steps as a strict grid, hairline-ruled, mono index in the
 *     single orange, grotesk titles. Calm, gridded, spacious.
 */
export function About() {
  return (
    <section id="studio" className="bg-paper section">
      {/* ───────────────────── (1) STATEMENT ───────────────────── */}
      <div className="shell">
        <div className="grid12 gap-y-12">
          <div className="col-span-6 md:col-span-3">
            <Reveal>
              <Eyebrow index="04">The studio</Eyebrow>
            </Reveal>
            {/* studio facts — Swiss data list */}
            <Reveal delay={0.12}>
              <dl className="mt-10 hidden md:block">
                {STUDIO_FACTS.map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-baseline justify-between gap-4 border-t border-line py-3"
                  >
                    <dt className="label text-ink-3">{k}</dt>
                    <dd className="mono text-right text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <div className="col-span-6 md:col-span-8 md:col-start-5">
            <Reveal>
              <p className="display text-[length:var(--text-h3)] leading-[1.08] text-ink-3">
                We work the way a monk works — with{" "}
                <span className="text-ink">focus</span>,{" "}
                <span className="text-ink">patience</span>, and a quiet
                obsession with <span className="text-ink">mastery</span>.
                Strategy, design, code and content under one roof, so the craft
                stays consistent from first pixel to last post.{" "}
                <span className="text-ink">{SITE.promise}</span>
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-8 max-w-xl text-[length:var(--text-body)] leading-relaxed text-ink-2">
                Founded in {SITE.founded} in {SITE.city}, we are a small,
                deliberate team that treats every brand like a long game.
                Decisions, not decoration — built to compound.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ───────────────────── (2) PROCESS ───────────────────── */}
      <div className="shell mt-[clamp(5rem,8vw,9rem)]">
        <Reveal className="mb-12">
          <Eyebrow index="05">How we work</Eyebrow>
        </Reveal>

        <ol className="grid12 gap-y-12">
          {PROCESS.map((p, i) => (
            <Reveal
              as="li"
              key={p.step}
              delay={i * 0.08}
              className="col-span-6 md:col-span-3"
            >
              <div className="rule-strong flex h-full flex-col pt-5">
                <span className="mono text-orange" aria-hidden>
                  {p.step}
                </span>
                <h3 className="display mt-6 text-[length:var(--text-h3)] leading-none text-ink">
                  {p.title}
                </h3>
                <p className="mt-4 text-[length:var(--text-body)] leading-relaxed text-ink-2">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Compatibility alias — this section also serves as the Process block. */
export const Process = About;
