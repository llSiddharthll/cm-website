"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
} from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Subtle 3D tilt toward the cursor for cards. Pointer-only, reduced-motion safe.
 * Children can use `translateZ` via the `[transform-style:preserve-3d]` context.
 */
export function Tilt({
  children,
  className,
  max = 7,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const cfg = { stiffness: 200, damping: 18, mass: 0.5 };
  const srx = useSpring(rx, cfg);
  const sry = useSpring(ry, cfg);
  const transform = useMotionTemplate`perspective(1000px) rotateX(${srx}deg) rotateY(${sry}deg)`;

  function move(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * max * 2);
    rx.set(-py * max * 2);
  }
  function leave() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      style={reduce ? undefined : { transform, transformStyle: "preserve-3d" }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
