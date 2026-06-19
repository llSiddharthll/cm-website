"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Background video that autoplays while in the viewport and pauses when out
 * (so a page full of reels never streams more than what's on screen). Muted,
 * looping, inline. Under prefers-reduced-motion it stays on the poster frame.
 */
export function AutoVideo({
  src,
  poster,
  className,
}: {
  src: string;
  poster?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={cn("size-full object-cover", className)}
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      aria-hidden
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
