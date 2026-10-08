"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type TouchEvent } from "react";

interface ProjectImageSliderProps {
  images: readonly string[] | string[];
  title: string;
  priority?: boolean;
  aspectRatio?: string;
  className?: string;
  showThumbnails?: boolean;
}

export function ProjectImageSlider({
  images,
  title,
  priority = true,
  aspectRatio = "aspect-[4/3] sm:aspect-[16/10]",
  className = "",
  showThumbnails = true,
}: ProjectImageSliderProps) {
  // Deduplicate images while preserving order
  const uniqueImages = Array.from(new Set(images.filter(Boolean)));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const touchStartX = useRef<number | null>(null);

  // Safety check if index exceeds array bounds
  useEffect(() => {
    if (currentIndex >= uniqueImages.length) {
      setCurrentIndex(0);
    }
  }, [currentIndex, uniqueImages.length]);

  const goTo = useCallback(
    (index: number) => {
      if (index === currentIndex) return;
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex],
  );

  const handlePrev = useCallback(() => {
    if (uniqueImages.length <= 1) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + uniqueImages.length) % uniqueImages.length);
  }, [uniqueImages.length]);

  const handleNext = useCallback(() => {
    if (uniqueImages.length <= 1) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % uniqueImages.length);
  }, [uniqueImages.length]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    }
  };

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (diff > 40) {
      handlePrev();
    } else if (diff < -40) {
      handleNext();
    }
    touchStartX.current = null;
  };

  const currentImage = uniqueImages[currentIndex] || uniqueImages[0];
  const hasMultiple = uniqueImages.length > 1;

  return (
    <div className={`w-full ${className}`}>
      {/* Main slider frame */}
      <div
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        role="region"
        aria-roledescription="carousel"
        aria-label={`${title} image gallery`}
        className={`group relative w-full ${aspectRatio} overflow-hidden rounded-2xl bg-ivory border border-white shadow-[0_20px_40px_-25px_rgba(6,6,18,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand`}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentImage}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 size-full"
          >
            <Image
              src={currentImage}
              alt={`${title} — visual ${currentIndex + 1} of ${uniqueImages.length}`}
              fill
              priority={priority && currentIndex === 0}
              sizes="(max-width: 1024px) 100vw, 1060px"
              className="object-cover select-none"
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              aria-label="Previous project image"
              className="absolute left-3.5 sm:left-5 top-1/2 -translate-y-1/2 z-20 grid size-11 sm:size-12 place-items-center rounded-full bg-white/90 text-midnight backdrop-blur-md border border-white shadow-[0_8px_24px_rgba(6,6,18,0.22)] transition-all duration-200 hover:scale-110 hover:bg-white active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-brand"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="stroke-current"
              >
                <path d="M15 18l-6-6 6-6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              aria-label="Next project image"
              className="absolute right-3.5 sm:right-5 top-1/2 -translate-y-1/2 z-20 grid size-11 sm:size-12 place-items-center rounded-full bg-white/90 text-midnight backdrop-blur-md border border-white shadow-[0_8px_24px_rgba(6,6,18,0.22)] transition-all duration-200 hover:scale-110 hover:bg-white active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-brand"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="stroke-current"
              >
                <path d="M9 18l6-6-6-6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}

        {/* Counter Badge */}
        {hasMultiple && (
          <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 rounded-full bg-midnight/70 px-3 py-1 text-[13px] font-medium text-white backdrop-blur-md border border-white/10 shadow-sm pointer-events-none">
            <span className="tabular-nums font-semibold">{currentIndex + 1}</span>
            <span className="opacity-50">/</span>
            <span className="tabular-nums opacity-85">{uniqueImages.length}</span>
          </div>
        )}

        {/* Pagination Dots */}
        {hasMultiple && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 rounded-full bg-midnight/60 px-3 py-1.5 backdrop-blur-md border border-white/10 shadow-sm">
            {uniqueImages.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => goTo(idx)}
                aria-label={`Go to image ${idx + 1}`}
                aria-current={idx === currentIndex ? "true" : undefined}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIndex ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnail Bar */}
      {showThumbnails && hasMultiple && (
        <div
          className="mt-3.5 flex items-center gap-2 sm:gap-3 overflow-x-auto pb-1"
          role="tablist"
          aria-label="Image thumbnail navigation"
        >
          {uniqueImages.map((src, idx) => (
            <button
              key={src + idx}
              type="button"
              role="tab"
              aria-selected={idx === currentIndex}
              aria-label={`View image ${idx + 1}`}
              onClick={() => goTo(idx)}
              className={`relative aspect-[16/10] h-14 sm:h-18 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                idx === currentIndex
                  ? "border-brand ring-2 ring-brand/30 shadow-md scale-[1.02]"
                  : "border-transparent opacity-65 hover:opacity-100"
              }`}
            >
              <Image
                src={src}
                alt={`${title} preview ${idx + 1}`}
                fill
                sizes="140px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
