import { PROCESS } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function Process() {
  return (
    <section id="process" className="bg-dark text-on-ink section">
      <div className="shell">
        <Reveal>
          <Eyebrow index="05" invert>
            How we work
          </Eyebrow>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="display mt-6 max-w-[18ch] text-[length:var(--text-h2)] text-on-ink">
            From brief to{" "}
            <span className="text-orange">compounding.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-6 max-w-xl text-[length:var(--text-body)] leading-snug text-on-ink-2">
            Four deliberate moves — attention, strategy, craft and measurement —
            run in-house so the work keeps building on itself.
          </p>
        </Reveal>

        <div className="grid12 mt-14 lg:mt-20">
          {PROCESS.map((p, i) => (
            <Reveal
              key={p.step}
              delay={i * 0.08}
              className="col-span-6 md:col-span-3"
            >
              <div className="flex h-full flex-col border-t border-line-invert pt-5">
                <span className="display text-orange text-[length:var(--text-h3)] leading-none">
                  {p.step}
                </span>
                <h3 className="display mt-5 text-[length:var(--text-h3)] text-on-ink">
                  {p.title}
                </h3>
                <p className="mt-3 text-[length:var(--text-body)] leading-snug text-on-ink-2">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
