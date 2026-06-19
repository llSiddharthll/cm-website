"use client";

import { useEffect, useRef } from "react";
import {
  useAnimate,
  useReducedMotion,
  type AnimationPlaybackControls,
} from "motion/react";
import { MARQUEE } from "@/lib/content";

/**
 * Marquee — a thin DARK rhythm band between sections.
 * One seamless infinite track of the capability words, separated by a
 * single solid orange square (the one accent, repeated). The word set is
 * rendered twice so the translateX 0 → -50% loop reads as one continuous
 * river. Pauses on hover; reduced-motion renders a static, clipped row.
 * Swiss restraint: heavy grotesk, near-black ground, surgical orange.
 */
export function Marquee() {
  const reduce = useReducedMotion();
  const [scope, animate] = useAnimate();
  const controls = useRef<AnimationPlaybackControls | null>(null);

  const words = MARQUEE.map((w) => w.toUpperCase());

  // Drive the seamless 0 → -50% loop imperatively so hover can pause/resume it.
  useEffect(() => {
    if (reduce || !scope.current) return;
    controls.current = animate(
      scope.current,
      { x: ["0%", "-50%"] },
      { duration: 30, ease: "linear", repeat: Infinity }
    );
    return () => controls.current?.stop();
  }, [reduce, animate, scope]);

  const WordSet = ({ ariaHidden = false }: { ariaHidden?: boolean }) => (
    <ul
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center"
    >
      {words.map((word, i) => (
        <li key={`${word}-${i}`} className="flex shrink-0 items-center">
          <span className="display whitespace-nowrap text-2xl text-on-ink sm:text-3xl">
            {word}
          </span>
          {/* separator — a single solid orange square, not rotated */}
          <span
            aria-hidden
            className="mx-[clamp(1.5rem,3vw,3.5rem)] block size-2 shrink-0 bg-orange"
          />
        </li>
      ))}
    </ul>
  );

  return (
    <section
      aria-label="What we do"
      className="overflow-hidden bg-ink-block py-6 text-on-ink md:py-8"
    >
      {/* Edge-fade: the track runs wider than the viewport; the mask dissolves
          the leading + trailing edges so words emerge and vanish cleanly. */}
      <div
        className="relative flex"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
        }}
        onPointerEnter={() => controls.current?.pause()}
        onPointerLeave={() => controls.current?.play()}
      >
        {reduce ? (
          <div className="flex">
            <WordSet />
          </div>
        ) : (
          <div ref={scope} className="flex w-max will-change-transform">
            <WordSet />
            <WordSet ariaHidden />
          </div>
        )}
      </div>
    </section>
  );
}
