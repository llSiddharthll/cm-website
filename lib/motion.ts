import type { Variants, Transition } from "motion/react";

/** Shared easing curves (mirror the CSS custom props). */
export const EASE = {
  outQuart: [0.16, 1, 0.3, 1] as const,
  inOutQuart: [0.76, 0, 0.24, 1] as const,
  back: [0.34, 1.56, 0.64, 1] as const,
};

export const DUR = {
  micro: 0.15,
  small: 0.25,
  medium: 0.4,
  large: 0.65,
  xl: 0.9,
};

/** A standard "rise + fade" reveal. */
export const riseIn: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.large, ease: EASE.outQuart },
  },
};

/** Stagger container for grids / lists. */
export const stagger = (gap = 0.07, delay = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: gap, delayChildren: delay },
  },
});

/** A line/word that clips up from a mask. */
export const lineUp: Variants = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: { duration: DUR.xl, ease: EASE.outQuart },
  },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DUR.large, ease: EASE.outQuart } },
};

export const spring: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 28,
  mass: 0.9,
};

/** Default viewport config — trigger once, slightly early. */
export const VIEWPORT = { once: true, amount: 0.3, margin: "0px 0px -10% 0px" };
