import type { Variants } from "framer-motion";

export const springTransition = {
  type: "spring",
  stiffness: 360,
  damping: 32,
  mass: 0.7,
} as const;

export const pageVariants: Variants = {
  initial: { opacity: 0, y: 16, filter: "blur(8px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: springTransition,
  },
  exit: { opacity: 0, y: -10, filter: "blur(8px)", transition: { duration: 0.16 } },
};

export const listVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.04,
    },
  },
};

export const itemVariants: Variants = {
  initial: { opacity: 0, y: 18, scale: 0.98 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springTransition,
  },
};
