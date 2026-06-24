import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Aurora } from "@/components/fx/Aurora";
import { Spotlight } from "@/components/fx/Spotlight";

const glass =
  "rounded-2xl border border-on-ink/10 bg-on-ink/[0.04] backdrop-blur-xl transition-colors duration-300 hover:border-orange/40";

type Stat = { value: string; suffix?: string; label: string };
type Cat = { slug: string; index: string; name: string; tagline?: string };

export function Capabilities({
  stats,
  tools,
  categories,
  founded = 2016,
}: {
  stats: readonly Stat[];
  tools: string[];
  categories: Cat[];
  founded?: number;
}) {
  const s = (i: number) => stats[i] ?? { value: "", label: "" };

  return (
    <section className="relative isolate overflow-hidden bg-dark-2 section text-on-ink">
      <Aurora className="opacity-70" />
      <div className="shell relative z-10">
        <Reveal>
          <Eyebrow index="02" invert>
            One roof
          </Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="display-tight mt-6 max-w-3xl text-[length:var(--text-h2)] leading-[1.04] text-on-ink">
            Brand, web, content and performance — built together, in-house.
          </h2>
        </Reveal>

        <div className="mt-12 grid auto-rows-[minmax(9rem,auto)] grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {/* statement (large) */}
          <Reveal className="col-span-2 row-span-2 md:col-span-2">
            <Spotlight className={`${glass} flex h-full flex-col justify-between p-7`}>
              <Sparkles className="size-6 text-orange" />
              <div>
                <p className="display text-[length:var(--text-h3)] leading-tight text-on-ink">
                  Everything your brand needs to grow — under one roof.
                </p>
                <p className="mt-4 max-w-md text-on-ink-2">
                  No hand-offs between agencies. Strategy, design, code and
                  campaigns sit in one team, so your spend compounds into an asset
                  you own.
                </p>
                <Link
                  href="/services"
                  className="group label mt-6 inline-flex items-center gap-1.5 text-on-ink transition-colors hover:text-orange"
                >
                  Explore services
                  <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </Spotlight>
          </Reveal>

          {/* two stats */}
          <Reveal delay={0.06} className="col-span-1">
            <div className={`${glass} flex h-full flex-col justify-between p-6`}>
              <span className="display text-[clamp(2rem,1.2rem+2vw,3.25rem)] leading-none text-on-ink">
                {s(0).value}
                <span className="text-orange">{s(0).suffix}</span>
              </span>
              <span className="label text-on-ink-2">{s(0).label}</span>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="col-span-1">
            <div className={`${glass} flex h-full flex-col justify-between p-6`}>
              <span className="display text-[clamp(2rem,1.2rem+2vw,3.25rem)] leading-none text-on-ink">
                {s(2).value}
                <span className="text-orange">{s(2).suffix}</span>
              </span>
              <span className="label text-on-ink-2">{s(2).label}</span>
            </div>
          </Reveal>

          {/* since */}
          <Reveal delay={0.14} className="col-span-1">
            <div className={`${glass} flex h-full flex-col justify-between p-6`}>
              <span className="mono text-on-ink-3">Est.</span>
              <span className="display text-[clamp(2rem,1.2rem+2vw,3.25rem)] leading-none text-on-ink">
                {founded}
              </span>
            </div>
          </Reveal>
          {/* rating */}
          <Reveal delay={0.18} className="col-span-1">
            <div className={`${glass} flex h-full flex-col justify-between p-6`}>
              <span className="display text-[clamp(2rem,1.2rem+2vw,3.25rem)] leading-none text-on-ink">
                {s(3).value}
                <span className="text-orange">{s(3).suffix}</span>
              </span>
              <span className="label text-on-ink-2">{s(3).label}</span>
            </div>
          </Reveal>

          {/* disciplines (wide) */}
          <Reveal delay={0.1} className="col-span-2 md:col-span-2">
            <div className={`${glass} h-full p-7`}>
              <span className="label text-on-ink-3">Four disciplines</span>
              <ul className="mt-4 divide-y divide-on-ink/10">
                {categories.slice(0, 4).map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/services/${c.slug}`}
                      className="group flex items-center justify-between gap-3 py-2.5"
                    >
                      <span className="flex items-baseline gap-3">
                        <span className="mono text-orange">{c.index}</span>
                        <span className="display text-[length:var(--text-h3)] text-on-ink transition-colors group-hover:text-orange">
                          {c.name}
                        </span>
                      </span>
                      <ArrowUpRight className="size-4 shrink-0 text-on-ink-3 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-orange" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* stack (wide) */}
          <Reveal delay={0.14} className="col-span-2 md:col-span-2">
            <div className={`${glass} flex h-full flex-col justify-between p-7`}>
              <span className="label text-on-ink-3">The stack we wield</span>
              <div className="mt-4 flex flex-wrap gap-2">
                {tools.slice(0, 10).map((t) => (
                  <span
                    key={t}
                    className="mono rounded-full border border-on-ink/10 bg-on-ink/[0.03] px-3 py-1.5 text-[length:var(--text-mono)] text-on-ink-2"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
