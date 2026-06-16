import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { AGENCY_STORY, TIMELINE } from "@/lib/agency";

export function Story() {
  return (
    <section id="studio" className="bg-dark text-on-ink section">
      <div className="shell">
        <div className="grid12">
          {/* LEFT — studio statement */}
          <div className="col-span-12 md:col-span-7">
            <Reveal>
              <Eyebrow index="01" invert>
                {AGENCY_STORY.kicker}
              </Eyebrow>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="display-tight mt-6 text-[length:var(--text-h2)] leading-[0.95] text-on-ink">
                {AGENCY_STORY.q}
              </h2>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-8 max-w-2xl text-[length:var(--text-lead)] leading-snug text-on-ink-2">
                {AGENCY_STORY.a}
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <p className="mono mt-8 text-on-ink-3">{AGENCY_STORY.signature}</p>
            </Reveal>
          </div>

          {/* RIGHT — timeline data list */}
          <div className="col-span-12 mt-12 md:col-span-4 md:col-start-9 md:mt-0">
            {TIMELINE.map((t, i) => (
              <Reveal
                key={t.label}
                delay={i * 0.08}
                className="flex flex-col border-t border-line-invert py-4"
              >
                <span className="display text-[length:var(--text-h3)] leading-none text-on-ink">
                  {t.value === "2016" ? (
                    "2016"
                  ) : (
                    <AnimatedNumber
                      value={Number(t.value)}
                      suffix={"suffix" in t ? t.suffix : ""}
                    />
                  )}
                </span>
                <span className="label mt-2 text-on-ink-3">{t.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
