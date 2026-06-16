"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { EASE, DUR, VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Rise-and-fade reveal, triggered once when scrolled into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 30,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "span" | "section";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: DUR.large, ease: EASE.outQuart, delay }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Line-mask reveal: clips each line up from behind a mask. Pass an array of
 * strings for multiple staggered lines.
 */
export function RevealLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
}) {
  // Observe the untransformed container — the child spans start translated
  // out of their clip box, so observing them directly is unreliable.
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: VIEWPORT.once, amount: VIEWPORT.amount });

  return (
    <span ref={ref} className={cn("block", className)}>
      {lines.map((line, i) => (
        // pb/-mb leaves room for descenders so the clip mask can't crop them
        <span key={i} className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
          <motion.span
            className={cn("block", lineClassName)}
            initial={{ y: "115%" }}
            animate={inView ? { y: "0%" } : { y: "115%" }}
            transition={{
              duration: DUR.xl,
              ease: EASE.outQuart,
              delay: delay + i * stagger,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
