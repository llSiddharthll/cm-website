"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

/**
 * Scroll-scrubbed vertical parallax (GSAP ScrollTrigger). Wrap an element that
 * lives inside an `overflow-hidden` container and is slightly oversized
 * (e.g. scale-110) so the drift never reveals an edge. Reduced-motion safe.
 */
export function Parallax({
  children,
  className,
  speed = 12,
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -speed },
        {
          yPercent: speed,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={ref} className={cn("h-full w-full", className)}>
      {children}
    </div>
  );
}
