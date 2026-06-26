import Image from "next/image";
import { CASES, type CaseStudy } from "@/lib/content";
import { VIDEO } from "@/lib/media";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MoveRight } from "lucide-react";
import { Tilt } from "@/components/fx/Tilt";

/** Horizontal scroll-snap rail of proof. CSS-only — safe as a server component. */
export function CaseStudies({
  cases = CASES,
}: {
  cases?: readonly CaseStudy[];
}) {
  return (
    <section className="bg-dark-2 text-on-ink section">
      <div className="shell">
        <div className="grid12 items-end gap-y-8">
          <div className="col-span-12 lg:col-span-9">
            <Reveal>
              <Eyebrow index="04" invert>
                Case studies
              </Eyebrow>
            </Reveal>
            <Reveal delay={0.05} className="mt-6">
              <h2 className="display max-w-[14ch] text-[length:var(--text-h2)] text-on-ink">
                Proof in the work.
              </h2>
            </Reveal>
          </div>
          <Reveal
            delay={0.1}
            className="col-span-12 lg:col-span-3 lg:justify-self-end"
          >
            <span className="mono inline-flex items-center gap-2 text-on-ink-3">
              Drag to explore
              <MoveRight className="size-4" aria-hidden />
            </span>
          </Reveal>
        </div>

        <div className="mt-12 flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {cases.map((c, i) => (
            <Tilt key={c.id} className="group w-[82vw] shrink-0 snap-start sm:w-[46vw] lg:w-[31vw]">
              <article className="flex h-full flex-col border border-line-invert-2 bg-dark transition-colors duration-300 group-hover:border-orange/40">
                <div className="relative aspect-[4/3] overflow-hidden bg-dark-3">
                  <Image
                    src={c.cover ?? VIDEO.posters[i % VIDEO.posters.length]}
                    alt={c.cover ? `${c.client} — ${c.title}` : ""}
                    fill
                    sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 82vw"
                    className={`object-cover transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 ${
                      c.cover ? "opacity-95 group-hover:opacity-100" : "opacity-50 group-hover:opacity-70"
                    }`}
                  />
                  <div
                    className={`absolute inset-0 ${
                      c.cover
                        ? "bg-gradient-to-t from-dark/80 via-dark/10 to-transparent"
                        : "bg-gradient-to-t from-dark via-dark/30 to-transparent"
                    }`}
                  />
                  <span className="label absolute left-4 top-4 text-on-ink-2">
                    {c.category[0]}
                  </span>
                  <span
                    className="display absolute bottom-2 right-5 text-6xl leading-none text-on-ink/10 select-none"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <span className="label text-on-ink-3">{c.client}</span>
                  <h3 className="display mt-2 text-[length:var(--text-h3)] text-on-ink">
                    {c.title}
                  </h3>
                  <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="display text-2xl leading-none text-orange [overflow-wrap:anywhere]">
                      {c.metric.value}
                    </span>
                    <span className="label text-on-ink-3">{c.metric.label}</span>
                  </div>
                  <div className="mt-auto flex flex-wrap gap-2 pt-6">
                    {c.category.map((cat) => (
                      <span
                        key={cat}
                        className="mono border border-line-invert px-2.5 py-1 text-on-ink-2"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}
