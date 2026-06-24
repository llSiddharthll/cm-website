import { PROCESS } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Aurora } from "@/components/fx/Aurora";
import { Tilt } from "@/components/fx/Tilt";

export function Process({
  process = PROCESS,
}: {
  process?: readonly { step: string; title: string; body: string }[];
}) {
  return (
    <section id="process" className="relative isolate overflow-hidden bg-dark text-on-ink section">
      <Aurora className="opacity-40" />
      <div className="shell relative z-10">
        <Reveal>
          <Eyebrow index="05" invert>
            How we work
          </Eyebrow>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="display mt-6 max-w-[18ch] text-[length:var(--text-h2)] text-on-ink">
            From brief to <span className="text-orange">compounding.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-6 max-w-xl text-[length:var(--text-body)] leading-snug text-on-ink-2">
            Four deliberate moves — attention, strategy, craft and measurement —
            run in-house so the work keeps building on itself.
          </p>
        </Reveal>

        <div className="grid12 mt-14 gap-4 lg:mt-20">
          {process.map((p, i) => (
            <Reveal key={p.step} delay={i * 0.08} className="col-span-6 md:col-span-3">
              <Tilt className="h-full" max={5}>
                <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line-invert bg-on-ink/[0.03] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange/40">
                  {/* watermark step */}
                  <span
                    aria-hidden
                    className="display pointer-events-none absolute -right-3 -top-6 select-none text-[7rem] leading-none text-on-ink/[0.04]"
                  >
                    {p.step}
                  </span>
                  {/* top accent line */}
                  <span className="absolute left-0 top-0 h-0.5 w-10 bg-orange transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />

                  <span className="display text-[length:var(--text-h3)] leading-none text-orange">
                    {p.step}
                  </span>
                  <h3 className="display mt-5 text-[length:var(--text-h3)] text-on-ink">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-[length:var(--text-body)] leading-snug text-on-ink-2">
                    {p.body}
                  </p>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
