"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WORDS = ["Brand", "Web", "Content", "Performance", "Motion", "SEO", "E-commerce", "Identity"];

/**
 * Kinetic marquee that continuously scrolls, then speeds up and skews based on
 * scroll velocity (GSAP). Reduced-motion → a static, centered word band.
 */
export function SkewMarquee({ words = WORDS }: { words?: string[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const loop = gsap.to(track, { xPercent: -50, repeat: -1, duration: 26, ease: "none" });
      const skewTo = gsap.quickTo(track, "skewX", { duration: 0.4, ease: "power3" });
      let reset: ReturnType<typeof setTimeout>;

      const st = ScrollTrigger.create({
        onUpdate: (self) => {
          const v = self.getVelocity();
          skewTo(gsap.utils.clamp(-14, 14, v / -120));
          loop.timeScale(gsap.utils.clamp(1, 6, 1 + Math.abs(v) / 400));
          clearTimeout(reset);
          reset = setTimeout(() => {
            skewTo(0);
            loop.timeScale(1);
          }, 120);
        },
      });
      return () => {
        clearTimeout(reset);
        st.kill();
        loop.kill();
      };
    });
    return () => ctx.revert();
  }, []);

  const Row = ({ hidden }: { hidden?: boolean }) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="flex items-center">
          <span className="display-tight px-[clamp(1rem,2.5vw,2.5rem)] text-[clamp(2.5rem,7vw,7rem)] leading-none text-on-ink">
            {w}
          </span>
          <span aria-hidden className="size-2.5 shrink-0 rounded-full bg-orange md:size-3" />
        </span>
      ))}
    </div>
  );

  return (
    <section className="overflow-hidden border-y border-line-invert bg-dark py-[clamp(2rem,5vw,4rem)] text-on-ink">
      <div ref={trackRef} className="flex w-max items-center will-change-transform">
        <Row />
        <Row hidden />
      </div>
    </section>
  );
}
