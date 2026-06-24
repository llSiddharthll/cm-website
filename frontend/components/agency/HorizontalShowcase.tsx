"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Eyebrow } from "@/components/ui/Eyebrow";

type Cat = {
  slug: string;
  index: string;
  name: string;
  tagline?: string;
  intro?: string;
  items?: { slug: string; name: string }[];
};

/**
 * Disciplines as a pinned horizontal-scroll deck on desktop (GSAP ScrollTrigger
 * pin + scrub). On mobile / reduced-motion it degrades to a normal vertical
 * stack — no pinning, no horizontal overflow.
 */
export function HorizontalShowcase({ categories }: { categories: Cat[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const amount = () => track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: () => -amount(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${amount()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (barRef.current) barRef.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-dark text-on-ink md:h-screen md:overflow-hidden">
      <div ref={trackRef} className="flex flex-col md:h-screen md:w-max md:flex-row md:items-stretch">
        {/* intro panel */}
        <div className="flex w-full shrink-0 flex-col justify-center px-6 py-16 sm:px-12 md:h-screen md:w-[42vw] md:py-0">
          <Eyebrow index="03" invert>
            Disciplines
          </Eyebrow>
          <h2 className="display-tight mt-6 text-[length:var(--text-h1)] leading-[1.02] text-on-ink">
            Four ways we
            <br />
            move the needle.
          </h2>
          <p className="mt-6 max-w-sm text-on-ink-2">
            Each one is a craft in its own right — and they compound when they run
            together.
          </p>
          <span className="mono mt-8 hidden items-center gap-2 text-on-ink-3 md:flex">
            Scroll to explore
            <ArrowRight className="size-4 text-orange" />
          </span>
        </div>

        {/* discipline panels */}
        {categories.slice(0, 4).map((c) => (
          <article
            key={c.slug}
            className="flex w-full shrink-0 flex-col justify-center border-t border-line-invert px-6 py-16 sm:px-12 md:h-screen md:w-[60vw] md:border-l md:border-t-0 md:py-0 md:pr-[6vw]"
          >
            <span className="display text-[clamp(4rem,10vw,9rem)] leading-none text-on-ink/10">
              {c.index}
            </span>
            <h3 className="display-tight -mt-4 break-words text-[clamp(2.5rem,5.5vw,6rem)] leading-[0.95] text-on-ink">
              {c.name}
            </h3>
            {c.tagline && <p className="label mt-4 text-orange">{c.tagline}</p>}
            {c.intro && <p className="mt-5 max-w-xl text-[length:var(--text-lead)] leading-snug text-on-ink-2">{c.intro}</p>}
            {c.items?.length ? (
              <ul className="mt-7 flex max-w-xl flex-wrap gap-2">
                {c.items.slice(0, 6).map((it) => (
                  <li
                    key={it.slug}
                    className="mono rounded-full border border-line-invert px-3 py-1.5 text-[length:var(--text-mono)] text-on-ink-2"
                  >
                    {it.name}
                  </li>
                ))}
              </ul>
            ) : null}
            <Link
              href={`/services/${c.slug}`}
              className="group label mt-8 inline-flex items-center gap-2 text-on-ink transition-colors hover:text-orange"
            >
              Explore {c.name.toLowerCase()}
              <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </article>
        ))}

        {/* trailing gutter so the last panel isn't flush to the viewport edge */}
        <div aria-hidden className="hidden shrink-0 md:block md:h-screen md:w-[12vw]" />
      </div>

      {/* horizontal progress (desktop) */}
      <div className="absolute inset-x-0 bottom-0 hidden h-0.5 bg-line-invert md:block">
        <span ref={barRef} className="block h-full origin-left scale-x-0 bg-orange" />
      </div>
    </section>
  );
}
