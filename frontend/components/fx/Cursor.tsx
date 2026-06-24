"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

const INTERACTIVE = 'a,button,input,textarea,select,label,summary,[role="button"],[data-cursor="hover"]';

/**
 * Additive custom cursor — a lagging ring + a crisp dot that grow/merge over
 * interactive elements. Desktop pointer only, off under reduced-motion and in
 * the admin. The native cursor stays for accessibility.
 */
export function Cursor() {
  const reduce = useReducedMotion() ?? false;
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 300, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 300, damping: 28, mass: 0.5 });
  const dotX = useSpring(x, { stiffness: 800, damping: 38 });
  const dotY = useSpring(y, { stiffness: 800, damping: 38 });

  useEffect(() => {
    if (reduce || isAdmin) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      setHover(Boolean(t?.closest?.(INTERACTIVE)));
    };
    const out = () => setVisible(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    document.documentElement.addEventListener("mouseleave", out);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", out);
    };
  }, [reduce, isAdmin, x, y]);

  if (!enabled || isAdmin) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999] hidden lg:block">
      <motion.div
        style={{ x: ringX, y: ringY, opacity: visible ? 1 : 0 }}
        className="absolute left-0 top-0"
      >
        <motion.span
          animate={{ scale: hover ? 2.3 : 1, opacity: hover ? 1 : 0.55 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="-ml-4 -mt-4 block size-8 rounded-full border border-orange bg-orange/10"
        />
      </motion.div>
      <motion.div
        style={{ x: dotX, y: dotY, opacity: visible && !hover ? 1 : 0 }}
        className="absolute left-0 top-0"
      >
        <span className="-ml-[3px] -mt-[3px] block size-1.5 rounded-full bg-orange" />
      </motion.div>
    </div>
  );
}
