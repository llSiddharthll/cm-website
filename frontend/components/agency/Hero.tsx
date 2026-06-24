"use client";

import { motion, useReducedMotion } from "motion/react";
import { AGENCY_HERO, STAT_BAR } from "@/lib/agency";
import { SITE } from "@/lib/content";
import { VIDEO } from "@/lib/media";
import { EASE } from "@/lib/motion";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/fx/Magnetic";
import { AutoVideo } from "./AutoVideo";

export function Hero({
  hero = AGENCY_HERO,
  statBar = STAT_BAR,
}: {
  hero?: typeof AGENCY_HERO;
  statBar?: readonly { value: string; suffix?: string; label: string }[];
}) {
  const reduce = useReducedMotion() ?? false;

  return (
    <section className="relative flex min-h-svh flex-col justify-between overflow-hidden bg-dark pb-8 pt-[clamp(7rem,16vh,10rem)] text-on-ink">
      {/* Ambient background reel — autoplays in view, kept subtle. */}
      <div className="absolute inset-0">
        <AutoVideo
          src={VIDEO.hero}
          poster={VIDEO.heroPoster}
          className="opacity-70"
        />
      </div>
      {/* legibility scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/45 to-dark/20" />

      {/* Top meta row */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE.outQuart, delay: 0.1 }}
        className="shell relative z-10 flex items-center justify-between"
      >
        <span className="label flex items-center gap-2.5 text-on-ink-2">
          <span className="size-2 animate-pulse rounded-full bg-orange" />
          {hero.eyebrow}
        </span>
        <span className="label hidden text-on-ink-2 sm:block">
          {SITE.city}
        </span>
      </motion.div>

      {/* Statement + actions */}
      <div className="shell relative z-10">
        <h1 className="display-tight text-[length:var(--text-display)] leading-[0.94] text-on-ink">
          {hero.headline.map((line, i) => {
            const last = i === hero.headline.length - 1;
            return (
              // pb/-mb gives descenders (g, y) room so the clip mask can't hide them
              <span key={i} className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
                <motion.span
                  className="block"
                  initial={reduce ? false : { y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 0.9,
                    ease: EASE.outQuart,
                    delay: 0.2 + i * 0.1,
                  }}
                >
                  {line === hero.accentWord ? (
                    <span className="text-orange">{line}</span>
                  ) : (
                    line
                  )}
                  {last && (
                    <span
                      aria-hidden
                      className="ml-[0.1em] inline-block aspect-square w-[0.5em] translate-y-[0.02em] bg-orange align-baseline"
                    />
                  )}
                </motion.span>
              </span>
            );
          })}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE.outQuart, delay: 0.7 }}
          className="mt-9 max-w-2xl"
        >
          <p className="text-[length:var(--text-lead)] leading-snug text-on-ink-2">
            {hero.sub}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Magnetic>
              <Button href={hero.ctaPrimary.href} variant="primary" size="lg">
                {hero.ctaPrimary.label}
              </Button>
            </Magnetic>
            <Magnetic>
              <Button
                href={hero.ctaSecondary.href}
                variant="invert"
                size="lg"
                arrow={false}
              >
                {hero.ctaSecondary.label}
              </Button>
            </Magnetic>
          </div>
        </motion.div>
      </div>

      {/* Stats bar */}
      <motion.dl
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE.outQuart, delay: 0.95 }}
        className="shell relative z-10 mt-12 grid grid-cols-2 border-t border-line-invert lg:grid-cols-4"
      >
        {statBar.map((s, i) => (
          <div
            key={s.label}
            className={`flex flex-col gap-1 border-line-invert py-6 ${
              i % 2 === 1 ? "border-l pl-5" : ""
            } lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:pl-6`}
          >
            <span className="display text-[clamp(1.75rem,1rem+2.5vw,3rem)] leading-none text-on-ink">
              {s.value}
              <span className="text-orange">{s.suffix}</span>
            </span>
            <span className="label text-on-ink-2">{s.label}</span>
          </div>
        ))}
      </motion.dl>
    </section>
  );
}
