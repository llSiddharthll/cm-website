"use client";

import { motion } from "motion/react";
import { EASE } from "@/lib/motion";

/** Re-mounts per route → a quiet cross-page fade. */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: EASE.outQuart }}
    >
      {children}
    </motion.div>
  );
}
