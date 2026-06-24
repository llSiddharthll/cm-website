"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE } from "@/lib/motion";

/**
 * Re-mounts per route → a page transition: content rises + fades while an
 * orange-edged dark panel wipes away upward. Reduced-motion → quiet fade only.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion() ?? false;

  if (reduce) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        {children}
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.6, ease: EASE.inOutQuart }}
        style={{ transformOrigin: "top" }}
        className="pointer-events-none fixed inset-0 z-[9998] bg-dark"
      >
        <span className="absolute bottom-0 left-0 h-1 w-full bg-orange" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE.outQuart, delay: 0.12 }}
      >
        {children}
      </motion.div>
    </>
  );
}
