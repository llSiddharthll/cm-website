import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { Aurora } from "@/components/fx/Aurora";
import { AGENCY_STORY, TIMELINE } from "@/lib/agency";
import { cn } from "@/lib/utils";

export function Story({
  story = AGENCY_STORY,
  timeline = TIMELINE,
}: {
  story?: typeof AGENCY_STORY;
  timeline?: readonly { value: string; suffix?: string; label: string }[];
}) {
  return (
    <section id="studio" className="relative isolate overflow-hidden bg-dark text-on-ink section">
      <Aurora className="opacity-35" />
      <div className="shell relative z-10">
        <div className="grid12">
          {/* LEFT — studio statement */}
          <div className="col-span-12 md:col-span-7">
            <Reveal>
              <Eyebrow index="01" invert>
                {story.kicker}
              </Eyebrow>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="display-tight mt-6 text-[length:var(--text-h2)] leading-[0.95] text-on-ink">
                {story.q}
                <span className="ml-2 inline-block size-[0.32em] translate-y-[0.02em] bg-orange align-baseline" />
              </h2>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-8 max-w-2xl text-[length:var(--text-lead)] leading-snug text-on-ink-2">
                {story.a}
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <p className="mono mt-8 text-on-ink-3">{story.signature}</p>
            </Reveal>
          </div>

          {/* RIGHT — timeline as a glass panel */}
          <div className="col-span-12 mt-12 md:col-span-4 md:col-start-9 md:mt-0">
            <div className="rounded-2xl border border-on-ink/10 bg-on-ink/[0.04] p-6 backdrop-blur-xl sm:p-8">
              {timeline.map((t, i) => (
                <Reveal
                  key={t.label}
                  delay={i * 0.08}
                  className={cn(
                    "flex items-end justify-between gap-4 py-5",
                    i > 0 && "border-t border-on-ink/10",
                  )}
                >
                  <div>
                    <span className="display text-[length:var(--text-h2)] leading-none text-on-ink">
                      {t.value === "2017" ? (
                        "2017"
                      ) : (
                        <>
                          <AnimatedNumber value={Number(t.value)} />
                          <span className="text-orange">{"suffix" in t ? t.suffix : ""}</span>
                        </>
                      )}
                    </span>
                    <span className="label mt-2 block text-on-ink-3">{t.label}</span>
                  </div>
                  <span className="mono text-on-ink/25">0{i + 1}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
