"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { PreTitle } from "@/components/ui/PreTitle";
import { Reveal } from "@/components/ui/Reveal";
import { processSteps } from "@/data/content";

/** Angle (deg) between two neighbouring step badges on the dial. */
const GAP = 26;

export function Process() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const { scrollY } = useScroll();

  const scrollToStep = (targetIndex: number) => {
    if (!trackRef.current || !stickyRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const trackTop = window.scrollY + rect.top;
    const maxScroll = Math.max(1, trackRef.current.offsetHeight - stickyRef.current.offsetHeight);
    const targetProgress = (targetIndex + 0.5) / processSteps.length;
    window.scrollTo({
      top: trackTop + targetProgress * maxScroll,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const update = () => {
      if (!trackRef.current || !stickyRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const trackTop = window.scrollY + rect.top;
      const stickyH = stickyRef.current.offsetHeight;
      const maxScroll = Math.max(1, trackRef.current.offsetHeight - stickyH);
      const currentScroll = window.scrollY - trackTop;
      const progress = Math.min(1, Math.max(0, currentScroll / maxScroll));
      const next = Math.min(processSteps.length - 1, Math.floor(progress * processSteps.length));
      setIndex(next);
    };

    update();
    const unsub = scrollY.on("change", update);
    window.addEventListener("resize", update, { passive: true });
    return () => {
      unsub();
      window.removeEventListener("resize", update);
    };
  }, [scrollY]);

  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    touchStartX.current = null;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        scrollToStep(Math.min(processSteps.length - 1, index + 1));
      } else {
        scrollToStep(Math.max(0, index - 1));
      }
    }
  };

  const step = processSteps[index];

  return (
    <section id="process" className="section overflow-clip pb-0 pt-8 sm:pt-12 lg:pt-[110px]">
      <div className="container-x mx-auto max-w-[1200px]">
        {/* Pinned scroll track calibrated for small screen tight spacing without excessive gap between Process & Testimonials */}
        <div ref={trackRef} className="relative min-h-[500px] h-[66vh] sm:min-h-[640px] sm:h-[95vh] lg:min-h-[850px] lg:h-[150vh]">
          <div
            ref={stickyRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="sticky top-4 sm:top-10 lg:top-20 flex flex-col items-center gap-3 sm:gap-6 lg:gap-[30px]"
          >
            <div className="flex w-full max-w-[700px] flex-col items-center gap-2.5 sm:gap-4 text-center">
              <Reveal delay={0.1}>
                <PreTitle>Process</PreTitle>
              </Reveal>
              <Reveal as="h2" delay={0.2} className="t-h2 text-balance-tight">
                A collaborative approach
              </Reveal>
            </div>

            <Reveal delay={0.3} className="relative flex w-full flex-col items-center">
              {/* Step label + dial anchor */}
              <div className="relative z-2 flex flex-col items-center gap-1 sm:gap-2">
                <p className="t-pretitle text-[11px] sm:text-[12px]">Step</p>
                <div className="relative size-12 sm:size-14 lg:size-16">
                  <Arc index={index} onSelect={scrollToStep} />
                </div>
              </div>

              {/* Panel with fixed min-height to guarantee ZERO layout shift */}
              <div className="relative z-2 mt-4 sm:mt-8 lg:mt-20 flex w-full max-w-[560px] flex-col items-center gap-3 sm:gap-5 px-4 sm:px-5 text-center">
                <div className="min-h-[135px] sm:min-h-[160px] flex w-full flex-col items-center justify-start">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step.title}
                      className="flex w-full flex-col items-center gap-2.5 sm:gap-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25, ease: [0.44, 0, 0.56, 1] }}
                    >
                      <h3 className="t-h3">{step.title}</h3>
                      <p className="t-medium max-w-[46ch] text-[15px] sm:text-[18px]">{step.description}</p>

                      <div className="flex w-full flex-col gap-2 sm:gap-3">
                        <span className="h-px w-full border-t border-dashed border-midnight-18" aria-hidden />
                        <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 sm:gap-y-2">
                          {step.features.map((f, k) => (
                            <li key={f} className="t-pretitle text-[11px] sm:text-[13px] flex items-center gap-2 sm:gap-3">
                              {k > 0 && <span className="size-1 rounded-full bg-midnight-30" aria-hidden />}
                              {f}
                            </li>
                          ))}
                        </ul>
                        <span className="h-px w-full border-t border-dashed border-midnight-18" aria-hidden />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <Button href="/contact-us" variant="brand" size="sm" className="sm:h-11 sm:px-5 sm:text-[15px]">
                  Start your project
                </Button>
              </div>

              {/* Progress readout */}
              <div className="relative z-2 mt-3 sm:mt-6 flex flex-col items-center gap-1.5 sm:gap-3">
                <p className="t-pretitle text-[11px] sm:text-[12px] tabular-nums">
                  {step.number}/{String(processSteps.length).padStart(2, "0")}
                </p>
                <div className="flex items-center gap-2 sm:gap-2.5">
                  {processSteps.map((s, i) => (
                    <button
                      key={s.number}
                      type="button"
                      onClick={() => scrollToStep(i)}
                      aria-label={`Jump to step ${s.number}: ${s.title}`}
                      className={`size-2 sm:size-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                        i === index ? "bg-midnight scale-125" : "bg-midnight-18 hover:bg-midnight-50"
                      }`}
                    />
                  ))}
                </div>
                <p className="sr-only" aria-live="polite">
                  Step {step.number} of {processSteps.length}: {step.title}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Arc({ index, onSelect }: { index: number; onSelect?: (i: number) => void }) {
  const rot = useSpring(0, { stiffness: 110, damping: 20, mass: 0.8 });

  useEffect(() => {
    rot.set(-index * GAP);
  }, [index, rot]);

  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 -z-10 aspect-square w-[720px] sm:w-[1100px] lg:w-[1500px] max-w-none -translate-x-1/2"
      aria-hidden
    >
      {/* Filled half-disc */}
      <div
        className="absolute inset-x-0 top-0 h-1/2"
        style={{
          borderRadius: "9999px 9999px 0 0",
          background:
            "linear-gradient(to bottom, rgb(235 234 232) 0%, rgb(242 241 240) 55%, rgb(244 243 242 / 0) 100%)",
          border: "2px solid rgb(228 227 225)",
          borderBottom: "none",
          boxShadow: "inset 0 0px 28px -6px rgb(0 0 0 / 0.22)",
          maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <div
          className="absolute"
          style={{
            inset: "15px 15px 0",
            borderRadius: "9999px 9999px 0 0",
            border: "1px solid rgb(255 255 255 / 0.9)",
            borderBottom: "none",
          }}
        />
      </div>

      {/* Rotating rim */}
      <motion.div className="absolute inset-0" style={{ rotate: rot }}>
        {processSteps.map((s, i) => (
          <ArcBadge key={s.number} number={s.number} base={i * GAP} rot={rot} onClick={() => onSelect?.(i)} />
        ))}
      </motion.div>
    </div>
  );
}

function ArcBadge({
  number,
  base,
  rot,
  onClick,
}: {
  number: string;
  base: number;
  rot: MotionValue<number>;
  onClick?: () => void;
}) {
  const angle = useTransform(rot, (r) => r + base);
  const opacity = useTransform(angle, (a) => {
    const d = Math.abs(a);
    return d > 78 ? 0 : d > 58 ? (78 - d) / 20 : 1;
  });
  const active = useTransform(angle, (a) => Math.max(0, 1 - Math.abs(a) / GAP));

  return (
    <div className="absolute inset-0" style={{ transform: `rotate(${base}deg)` }}>
      <motion.button
        type="button"
        onClick={onClick}
        aria-label={`Jump to step ${number}`}
        style={{ opacity }}
        className="pointer-events-auto cursor-pointer absolute left-1/2 top-[5px] grid size-11 sm:size-13 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-lg bg-white text-[17px] sm:text-[19px] font-medium text-[rgb(90_90_96)] shadow-[0_6px_16px_-10px_rgb(0_0_0/0.35)] transition-transform active:scale-95"
      >
        {number}
        <motion.span
          style={{ opacity: active }}
          className="absolute inset-0 grid place-items-center rounded-lg bg-brand text-white shadow-[0_0_0_2px_rgb(0_0_0/0.55),0_10px_24px_-14px_rgb(111_70_212/0.9)]"
        >
          {number}
        </motion.span>
      </motion.button>
    </div>
  );
}