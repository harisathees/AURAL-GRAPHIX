"use client";

import { motion, type Variants } from "motion/react";
import type { ElementType, ReactNode } from "react";
import { appear, inView } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  /** Seconds — mirrors the source design's staggered appear delays. */
  delay?: number;
  y?: number;
  as?: ElementType;
  className?: string;
  variants?: Variants;
  /** Play immediately instead of waiting for the viewport (hero blocks). */
  onMount?: boolean;
  id?: string;
}

export function Reveal({
  children,
  delay = 0,
  y = 20,
  as = "div",
  className,
  variants,
  onMount = false,
  id,
}: RevealProps) {
  const MotionTag = motion.create(as as ElementType);
  const v = variants ?? appear(delay, y);

  return (
    <MotionTag
      id={id}
      className={className}
      variants={v}
      initial="hidden"
      {...(onMount ? { animate: "visible" } : { whileInView: "visible", viewport: inView })}
    >
      {children}
    </MotionTag>
  );
}
