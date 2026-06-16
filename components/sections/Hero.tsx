"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from "motion/react";
import { ArrowDown } from "lucide-react";
import { HERO, SITE, SERVICES } from "@/lib/content";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const ROTATING = ["COMPOUND", "CONVERT", "ENDURE", "GROW"];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: EASE.outQuart, delay },
});

/** Live "open for work" status + ticking Chandigarh (IST) clock. */
function StudioClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(new Date());
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="inline-flex items-center gap-2.5">
      <span className="relative flex size-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-60" />
        <span className="relative inline-flex size-2 rounded-full bg-orange" />
      </span>
      <span className="text-ink">Open for projects</span>
      <span className="text-ink-4">·</span>
      <span className="tabular-nums text-ink-3" suppressHydrationWarning>
        {SITE.city.split(" · ")[0]} {time || "--:--:--"} IST
      </span>
    </span>
  );
}

/** Headline's final word, swapping on a clipped vertical roll. */
function RotatingWord({ reduce }: { reduce: boolean }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((p) => (p + 1) % ROTATING.length), 2600);
    return () => clearInterval(id);
  }, [reduce]);

  if (reduce) return <>{ROTATING[0]}</>;

  return (
    <span className="relative inline-block overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-110%" }}
          transition={{ duration: 0.6, ease: EASE.outQuart }}
        >
          {ROTATING[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero() {
  const reduce = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);

  // Scroll handoff — content drifts up + fades as you scroll into the marquee.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Magnetic caret — pulls gently toward the cursor.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 150, damping: 14, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 150, damping: 14, mass: 0.4 });

  const onPointerMove = (e: React.PointerEvent) => {
    if (reduce || window.matchMedia("(pointer: coarse)").matches) return;
    const el = caretRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist < 360) {
      mx.set((dx / 360) * 14);
      my.set((dy / 360) * 14);
    } else {
      mx.set(0);
      my.set(0);
    }
  };

  const lines = HERO.headline.map((l) => l.replace(/\.$/, "").toUpperCase());

  return (
    <section
      ref={sectionRef}
      onPointerMove={onPointerMove}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="relative min-h-svh overflow-hidden"
    >
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="flex min-h-svh flex-col justify-between pt-[clamp(7rem,16vh,10rem)] pb-8"
      >
        {/* ── Top meta row ── */}
        <motion.div {...fadeUp(0.1)} className="shell">
          <div className="grid12 items-baseline gap-y-3 border-t border-ink pt-4">
            <span className="label col-span-6 md:col-span-3">
              <span className="text-orange">/01</span>&nbsp;&nbsp;The Studio
            </span>
            <span className="label col-span-6 text-ink md:col-span-4 md:col-start-4">
              {HERO.kicker.split("—")[0].trim()}
            </span>
            <span className="label col-span-12 md:col-span-5 md:col-start-8 md:justify-self-end">
              <StudioClock />
            </span>
          </div>
        </motion.div>

        {/* ── The statement ── */}
        <div className="shell">
          <h1 className="display-tight text-[length:var(--text-display)] text-ink">
            {lines.map((line, i) => {
              const last = i === lines.length - 1;
              return (
                <span key={i} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{
                      duration: 0.9,
                      ease: EASE.outQuart,
                      delay: 0.25 + i * 0.1,
                    }}
                  >
                    {last ? <RotatingWord reduce={reduce} /> : line}
                    {last && (
                      <motion.span
                        ref={caretRef}
                        aria-hidden
                        style={{ x: sx, y: sy }}
                        className={cn(
                          "ml-[0.12em] inline-block aspect-square w-[0.62em] translate-y-[0.02em] bg-orange align-baseline",
                          !reduce && "caret-blink",
                        )}
                      />
                    )}
                  </motion.span>
                </span>
              );
            })}
          </h1>
        </div>

        {/* ── Lede + actions + service index ── */}
        <div className="shell">
          <div className="grid12 items-end gap-y-10 border-t border-ink pt-6">
            <motion.p
              {...fadeUp(0.6)}
              className="col-span-6 max-w-md text-[length:var(--text-lead)] leading-snug text-ink-2 md:col-span-5"
            >
              {HERO.lede}
            </motion.p>

            <motion.ul
              {...fadeUp(0.7)}
              className="col-span-6 hidden gap-x-6 gap-y-1 md:col-span-4 md:grid md:grid-cols-2"
            >
              {SERVICES.map((s) => (
                <li
                  key={s.id}
                  className="mono flex items-baseline gap-2 border-t border-line py-2 text-ink-2"
                >
                  <span className="text-ink-4">{s.index}</span>
                  {s.title}
                </li>
              ))}
            </motion.ul>

            <motion.div
              {...fadeUp(0.8)}
              className="col-span-6 flex flex-col gap-3 sm:flex-row md:col-span-3 md:flex-col md:items-end"
            >
              <Button href={HERO.ctaPrimary.href} variant="primary" size="lg">
                {HERO.ctaPrimary.label}
              </Button>
              <Button href={HERO.ctaSecondary.href} variant="outline" size="lg">
                {HERO.ctaSecondary.label}
              </Button>
            </motion.div>
          </div>

          <motion.div
            {...fadeUp(1)}
            className="mt-10 flex items-center gap-2 text-ink-3"
          >
            <ArrowDown className="size-4 animate-bounce" />
            <span className="label">Scroll</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
