import { Play } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { STAT_BAR } from "@/lib/agency";
import { IMG, VIDEO } from "@/lib/media";

export function Showreel({
  statBar = STAT_BAR,
}: {
  statBar?: readonly { value: string; suffix?: string; label: string }[];
}) {
  return (
    <section className="bg-dark text-on-ink section relative overflow-hidden">
      <div className="shell text-center">
        <Reveal>
          <Eyebrow invert>Showreel 2026</Eyebrow>
          <h2 className="display-tight mt-5 text-[length:var(--text-h2)] text-on-ink">
            See it in motion.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="group relative mx-auto mt-12 aspect-video max-w-5xl overflow-hidden rounded-[var(--radius-sm)] border border-line-invert">
            <video
              className="size-full object-cover"
              muted
              loop
              playsInline
              autoPlay
              poster={IMG.heroPoster}
            >
              <source src={VIDEO.samples[4]} type="video/mp4" />
            </video>
            {/* legibility scrim */}
            <div className="absolute inset-0 bg-dark/30" />
            {/* decorative play glyph */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex size-16 items-center justify-center rounded-full bg-on-ink/10 backdrop-blur">
                <Play className="size-6 fill-current text-on-ink" aria-hidden />
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <dl className="mx-auto mt-12 grid max-w-3xl grid-cols-3">
            {statBar.slice(0, 3).map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-col items-center gap-1.5 border-line-invert px-3 py-2 ${
                  i > 0 ? "border-l" : ""
                }`}
              >
                <dt className="sr-only">{s.label}</dt>
                <dd className="display text-[length:var(--text-h2)] leading-none text-on-ink">
                  {s.value}
                  <span className="text-orange">{s.suffix}</span>
                </dd>
                <span className="label text-on-ink-3">{s.label}</span>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
