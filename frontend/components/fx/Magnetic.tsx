"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Magnetic hover — the element drifts toward the cursor and springs back.
 * Pointer-only (inert on touch) and disabled under prefers-reduced-motion.
 */
export function Magnetic({
  children,
  className,
  strength = 0.4,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const cfg = { stiffness: 220, damping: 18, mass: 0.4 };
  const sx = useSpring(x, cfg);
  const sy = useSpring(y, cfg);

  function move(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }
  function leave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      style={reduce ? undefined : { x: sx, y: sy }}
      data-cursor="hover"
      className={cn("inline-flex", className)}
    >
      {children}
    </motion.div>
  );
}
