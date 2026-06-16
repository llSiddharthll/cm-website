import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

/** Reusable dark page hero — top meta row, oversized title (+orange stop), lede. */
export function PageHero({
  index,
  kicker,
  titleLines,
  lede,
  meta,
}: {
  index?: string;
  kicker: string;
  titleLines: string[];
  lede?: string;
  meta?: string;
}) {
  return (
    <section className="bg-dark section pt-[clamp(8rem,18vh,12rem)] text-on-ink">
      <div className="shell">
        <div className="grid12 items-baseline gap-y-2 border-t border-on-ink/30 pt-4">
          <span className="label col-span-6 md:col-span-8">
            {index && <span className="text-orange">{index}</span>}
            {index && <>&nbsp;&nbsp;</>}
            {kicker}
          </span>
          {meta && (
            <span className="label col-span-6 md:col-span-4 md:text-right">
              {meta}
            </span>
          )}
        </div>

        <h1 className="display-tight mt-8 text-[length:var(--text-display)] text-on-ink">
          <RevealLines lines={titleLines} />
          <span
            aria-hidden
            className="ml-[0.1em] inline-block aspect-square w-[0.5em] bg-orange align-baseline"
          />
        </h1>

        {lede && (
          <Reveal
            as="span"
            delay={0.15}
            className="mt-9 block max-w-2xl text-[length:var(--text-lead)] leading-snug text-on-ink-2"
          >
            {lede}
          </Reveal>
        )}
      </div>
    </section>
  );
}
