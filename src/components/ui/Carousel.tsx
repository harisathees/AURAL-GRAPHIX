"use client";

import { AnimatePresence, motion, type PanInfo } from "motion/react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

interface CarouselProps {
  slides: ReactNode[];
  /** Autoplay interval in seconds. 0 disables autoplay. */
  interval?: number;
  itemsPerView?: { base: number; lg: number };
  gap?: number;
  showDots?: boolean;
  showArrows?: boolean;
  label: string;
  className?: string;
}

/**
 * Replaces the source Slideshow component: autoplay, drag, dots and arrow
 * controls with the same spring feel.
 */
export function Carousel({
  slides,
  interval = 0,
  itemsPerView = { base: 1, lg: 1 },
  gap = 20,
  showDots = true,
  showArrows = false,
  label,
  className = "",
}: CarouselProps) {
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(itemsPerView.base);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setPerView(mq.matches ? itemsPerView.lg : itemsPerView.base);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [itemsPerView.base, itemsPerView.lg]);

  const pages = Math.max(1, slides.length - perView + 1);

  const go = useCallback(
    (next: number) => setIndex(((next % pages) + pages) % pages),
    [pages],
  );

  useEffect(() => {
    if (!interval || paused || pages <= 1) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % pages), interval * 1000);
    return () => window.clearInterval(id);
  }, [interval, paused, pages]);

  useEffect(() => {
    if (index > pages - 1) setIndex(0);
  }, [index, pages]);

  function onDragEnd(_: unknown, info: PanInfo) {
    const threshold = 60;
    if (info.offset.x < -threshold) go(index + 1);
    else if (info.offset.x > threshold) go(index - 1);
  }

  const slideBasis = `calc((100% - ${(perView - 1) * gap}px) / ${perView})`;

  return (
    <div
      className={`relative w-full ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="overflow-hidden">
        <motion.div
          ref={trackRef}
          className="flex cursor-grab active:cursor-grabbing"
          style={{ gap }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDragEnd={onDragEnd}
          animate={{ x: `calc(-${index} * (${slideBasis} + ${gap}px))` }}
          transition={{ type: "spring", stiffness: 200, damping: 40, mass: 1 }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className="shrink-0"
              style={{ width: slideBasis }}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
              aria-hidden={i < index || i >= index + perView}
            >
              {slide}
            </div>
          ))}
        </motion.div>
      </div>

      {showArrows && pages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-3">
          <Arrow label="Previous slide" onClick={() => go(index - 1)} direction="left" />
          <Arrow label="Next slide" onClick={() => go(index + 1)} direction="right" />
        </div>
      )}

      {showDots && pages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2.5">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === index ? "w-2.5 bg-midnight" : "w-2.5 bg-midnight-18 hover:bg-midnight-30"
              }`}
            />
          ))}
        </div>
      )}

      <AnimatePresence>{null}</AnimatePresence>
    </div>
  );
}

function Arrow({
  label,
  onClick,
  direction,
}: {
  label: string;
  onClick: () => void;
  direction: "left" | "right";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid size-10 place-items-center rounded-lg border border-midnight-10 bg-white text-midnight shadow-[0_6px_16px_-12px_rgb(6_6_18/0.4)] transition-colors hover:bg-mist"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden className={direction === "left" ? "rotate-180" : ""}>
        <path d="m9 5 7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
