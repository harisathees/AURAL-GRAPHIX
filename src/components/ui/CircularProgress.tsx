"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  fontSize?: number;
  delay?: number;
}

/** The 99% / 100% / 98% rings in the "Where ideas find their form" card. */
export function CircularProgress({
  percentage,
  size = 76,
  strokeWidth = 6,
  fontSize = 16,
  delay = 0.5,
}: CircularProgressProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [progress, setProgress] = useState(0);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, percentage, {
      duration: 1.4,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: setProgress,
    });
    return () => controls.stop();
  }, [inView, percentage, delay]);

  return (
    <div ref={ref} className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" role="img" aria-label={`${percentage} percent`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgb(237 237 237 / 0.9)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgb(47 20 109 / 0.9)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (progress / 100) * circumference}
        />
      </svg>
      <span
        className="absolute inset-0 grid place-items-center font-medium tabular-nums tracking-tight text-midnight"
        style={{ fontSize }}
      >
        {Math.round(progress)}%
      </span>
    </div>
  );
}
