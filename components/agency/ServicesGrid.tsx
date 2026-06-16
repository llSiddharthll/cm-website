import { ArrowUpRight } from "lucide-react";
import { SERVICES_12 } from "@/lib/agency";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function ServicesGrid() {
  return (
    <section id="services" className="bg-dark text-on-ink section">
      <div className="shell">
        <div className="grid12 gap-y-8">
          <div className="col-span-12 md:col-span-8">
            <Reveal>
              <Eyebrow index="02" invert>
                What we do
              </Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="display mt-6 text-[length:var(--text-h2)] text-on-ink">
                Twelve ways we move the <span className="text-orange">needle.</span>
              </h2>
            </Reveal>
          </div>
          <div className="col-span-12 flex items-end md:col-span-4">
            <Reveal delay={0.12}>
              <p className="text-on-ink-2">
                One roof, twelve disciplines. Brand, web, content and performance
                wired together so every move compounds into an asset you own.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid12 mt-12 gap-y-5">
          {SERVICES_12.map((s, i) => (
            <Reveal
              key={s.no}
              delay={i * 0.04}
              as="div"
              className="col-span-6 md:col-span-3"
            >
              <article className="group relative flex h-full flex-col justify-between gap-10 overflow-hidden border border-line-invert-2 bg-dark-2 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-orange/50 hover:bg-dark-3">
                {/* growing orange top accent */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-orange transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                />
                <div className="flex items-start justify-between">
                  <span className="mono text-on-ink-3 transition-colors group-hover:text-orange">
                    {s.no}
                  </span>
                  <ArrowUpRight
                    className="size-5 text-on-ink-3 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-orange"
                    aria-hidden
                  />
                </div>
                <div>
                  <h3 className="display text-[length:var(--text-h3)] text-on-ink">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-on-ink-2">
                    {s.desc}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
