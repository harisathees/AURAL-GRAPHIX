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
  showSideArrows?: boolean;
  label: string;
  className?: string;
}

/**
 * Replaces the source Slideshow component: autoplay, drag, dots and arrow
 * controls with the same spring feel. Supports both side and bottom navigation controls.
 */
export function Carousel({
  slides,
  interval = 0,
  itemsPerView = { base: 1, lg: 1 },
  gap = 20,
  showDots = true,
  showArrows = false,
  showSideArrows = false,
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
      {/* Side Navigation Buttons (Left & Right of Cards) */}
      {showSideArrows && pages > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              go(index - 1);
            }}
            aria-label="Previous project card"
            title="Previous project"
            className="hidden lg:grid absolute lg:-left-6 top-1/2 -translate-y-1/2 z-30 lg:size-13 place-items-center rounded-full bg-white text-midnight shadow-[0_10px_25px_-5px_rgba(6,6,18,0.22)] border border-midnight-10 hover:bg-mist hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-brand"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="stroke-current size-5"
            >
              <path d="M15 18l-6-6 6-6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              go(index + 1);
            }}
            aria-label="Next project card"
            title="Next project"
            className="hidden lg:grid absolute lg:-right-6 top-1/2 -translate-y-1/2 z-30 lg:size-13 place-items-center rounded-full bg-white text-midnight shadow-[0_10px_25px_-5px_rgba(6,6,18,0.22)] border border-midnight-10 hover:bg-mist hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-brand"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="stroke-current size-5"
            >
              <path d="M9 18l6-6-6-6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}

      {/* Slide track */}
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

      {/* Controls: Dots and navigation controls */}
      {(showDots || showArrows) && pages > 1 && (
        <div className="mt-5 sm:mt-6 flex items-center justify-center gap-3">
          {showArrows && (
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous slide"
              className="grid size-8 place-items-center rounded-full border border-midnight-10 bg-white text-midnight shadow-xs transition-colors hover:bg-mist active:scale-95 cursor-pointer"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="stroke-current">
                <path d="M15 18l-6-6 6-6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}

          {showDots && (
            <div className="flex items-center gap-2">
              {Array.from({ length: pages }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === index}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    i === index ? "w-6 bg-midnight" : "w-2.5 bg-midnight-18 hover:bg-midnight-30"
                  }`}
                />
              ))}
            </div>
          )}

          {showArrows && (
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next slide"
              className="grid size-8 place-items-center rounded-full border border-midnight-10 bg-white text-midnight shadow-xs transition-colors hover:bg-mist active:scale-95 cursor-pointer"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="stroke-current">
                <path d="M9 18l6-6-6-6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
        </div>
      )}

      <AnimatePresence>{null}</AnimatePresence>
    </div>
  );
}
