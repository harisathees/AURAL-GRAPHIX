"use client";

import type { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  /** Seconds for one full loop. Lower = faster. */
  duration?: number;
  reverse?: boolean;
  direction?: "x" | "y";
  gap?: number;
  className?: string;
  itemClassName?: string;
}

/**
 * Reproduces the source ticker effect (velocity-driven, pauses on hover,
 * seamless because the track is duplicated and translated by exactly -50%).
 */
export function Marquee({
  children,
  duration = 40,
  reverse = false,
  direction = "x",
  gap = 30,
  className = "",
  itemClassName = "",
}: MarqueeProps) {
  const axis = direction === "x" ? "animate-marquee-x" : "animate-marquee-y";
  const flow = direction === "x" ? "flex-row" : "flex-col";
  const trackSize = direction === "x" ? "h-full w-max" : "w-full h-max";
  const childSize = direction === "x" ? "h-full" : "w-full";

  return (
    <div className={`marquee-host relative overflow-hidden ${className}`}>
      <div
        className={`flex ${trackSize} ${flow} ${axis} ${reverse ? "is-reverse" : ""}`}
        style={
          {
            gap: `${gap}px`,
            "--marquee-duration": `${duration}s`,
          } as React.CSSProperties
        }
        aria-hidden={false}
      >
        <div className={`flex shrink-0 ${childSize} ${flow} ${itemClassName}`} style={{ gap: `${gap}px` }}>
          {children}
        </div>
        <div className={`flex shrink-0 ${childSize} ${flow} ${itemClassName}`} style={{ gap: `${gap}px` }} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
