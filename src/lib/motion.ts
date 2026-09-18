import type { Transition, Variants } from "motion/react";

/**
 * Mirrors the source project's motion language:
 *  - appear effects: opacity 0 → 1, y 20 → 0 on a 0.5s spring
 *  - text effects:   per-character reveal with blur, 0.4s spring
 *  - page effects:   0.27,0,0.51,1 tween wipe
 */

export const springAppear: Transition = {
  type: "spring",
  duration: 0.5,
  bounce: 0,
};

export const springText: Transition = {
  type: "spring",
  duration: 0.4,
  bounce: 0,
};

export const tweenBrand: Transition = {
  duration: 0.45,
  ease: [0.44, 0, 0.56, 1],
};

/** Standard "appear" — used by nearly every block in the source design. */
export const appear = (delay = 0, y = 20): Variants => ({
  hidden: { opacity: 0, y },
  visible: { opacity: 1, y: 0, transition: { ...springAppear, delay } },
});

export const appearX = (delay = 0, x = 50): Variants => ({
  hidden: { opacity: 0, x },
  visible: { opacity: 1, x: 0, transition: { ...springAppear, delay } },
});

export const appearScale = (delay = 0, scale = 0.94): Variants => ({
  hidden: { opacity: 0, scale },
  visible: { opacity: 1, scale: 1, transition: { ...springAppear, delay } },
});

/** Container that staggers its children the way the source sections do. */
export const stagger = (step = 0.08, delay = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: step, delayChildren: delay } },
});

/** Per-character text reveal: opacity 0, y 10px, blur 10px. */
export const charReveal: Variants = {
  hidden: { opacity: 0, y: 10, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: springText },
};

/** Viewport config matching the source `onInView` trigger (threshold 0, no replay). */
export const inView = { once: true, amount: 0 } as const;
export const inViewHalf = { once: true, amount: 0.4 } as const;
