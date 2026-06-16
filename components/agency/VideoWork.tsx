"use client";

import { ArrowUpRight } from "lucide-react";
import { VIDEO_PROJECTS } from "@/lib/agency";
import { VIDEO } from "@/lib/media";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { AutoVideo } from "./AutoVideo";

const films = VIDEO_PROJECTS.slice(0, 2);
const reels = VIDEO_PROJECTS.slice(2);

export function VideoWork() {
  return (
    <section id="work" className="section bg-dark text-on-ink">
      <div className="shell">
        {/* Header */}
        <div className="grid12 items-end gap-y-8 border-t border-line-invert pt-6">
          <div className="col-span-12 md:col-span-8">
            <Reveal>
              <Eyebrow index="03" invert>
                Selected work
              </Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="display mt-5 text-[length:var(--text-h2)] text-on-ink">
                Work in <span className="text-orange">motion.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal
            delay={0.12}
            className="col-span-12 flex md:col-span-3 md:col-start-10 md:justify-end"
          >
            <Button href="/work" variant="invert" size="md">
              All work
            </Button>
          </Reveal>
        </div>

        {/* Featured films — 16:9, autoplaying in view */}
        <div className="grid12 mt-12 gap-5 md:mt-16">
          {films.map((p, i) => (
            <Reveal
              key={p.id}
              delay={i * 0.08}
              className="col-span-12 md:col-span-6"
            >
              <figure className="group relative aspect-video overflow-hidden border border-line-invert-2 bg-dark-2">
                <AutoVideo
                  src={VIDEO.samples[i % VIDEO.samples.length]}
                  poster={VIDEO.posters[i % VIDEO.posters.length]}
                  className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-dark/10" />
                <figcaption className="absolute inset-0 flex flex-col justify-between p-5">
                  <span className="label flex items-center gap-2 text-on-ink/80">
                    <span className="size-1.5 rounded-full bg-orange" />
                    {p.category}
                  </span>
                  <span className="flex items-end justify-between gap-3">
                    <span className="display text-[length:var(--text-h3)] text-on-ink">
                      {p.title}
                    </span>
                    <ArrowUpRight className="size-6 shrink-0 text-on-ink/70 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-orange" />
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* Reels rail — 9:16, autoplaying, drag/scroll */}
        <Reveal delay={0.1}>
          <div className="mt-12 flex items-center justify-between">
            <span className="label text-on-ink-3">Reels &amp; shorts</span>
            <span className="mono hidden text-on-ink-3 sm:inline">
              drag to explore →
            </span>
          </div>
        </Reveal>

        <div className="mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {reels.map((p, i) => (
            <Reveal
              key={p.id}
              delay={0.08 + i * 0.06}
              className="w-[64vw] shrink-0 snap-start sm:w-[38vw] md:w-[clamp(14rem,20vw,18rem)]"
            >
              <figure className="group relative aspect-[9/16] overflow-hidden border border-line-invert-2 bg-dark-2">
                <AutoVideo
                  src={VIDEO.samples[(i + 2) % VIDEO.samples.length]}
                  poster={VIDEO.posters[(i + 2) % VIDEO.posters.length]}
                  className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/85 via-transparent to-dark/20" />
                <figcaption className="absolute inset-0 flex flex-col justify-between p-4">
                  <span className="label text-on-ink/80">{p.category}</span>
                  <span className="display text-lg leading-tight text-on-ink">
                    {p.title}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
