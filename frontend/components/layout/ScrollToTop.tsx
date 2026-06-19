"use client";

import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { ArrowUp } from "lucide-react";
import { EASE } from "@/lib/motion";

/** Floating back-to-top button that appears after scrolling. */
export function ScrollToTop() {
  const [show, setShow] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 900));

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.8, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 8 }}
          transition={{ duration: 0.25, ease: EASE.outQuart }}
          className="group fixed bottom-6 right-6 z-40 flex size-12 items-center justify-center bg-orange text-on-orange shadow-[0_8px_30px_-8px_rgba(0,0,0,0.6)] transition-colors hover:bg-orange-press"
        >
          <ArrowUp className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
