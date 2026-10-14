"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { PreTitle } from "@/components/ui/PreTitle";
import { Reveal } from "@/components/ui/Reveal";
import { processSteps } from "@/data/content";

/**
 * The source "Process" section is a sticky panel whose variant is driven by
 * scroll position across a 180vh track. This reproduces that behaviour with
 * a scroll-linked index and an arc that fills as you progress.
 */
export function Process() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const arc = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const next = Math.min(processSteps.length - 1, Math.floor(v * processSteps.length));
      setIndex(next);
    });
  }, [scrollYProgress]);

  const step = processSteps[index];

  return (
    <section id="process" className="section overflow-hidden">
      <div className="container-x mx-auto max-w-[1200px]">
        <div ref={trackRef} className="relative min-h-[170vh] sm:min-h-[180vh] lg:min-h-[200vh]">
          <div className="sticky top-16 sm:top-20 lg:top-28 flex flex-col items-center gap-5 sm:gap-7 lg:gap-[30px]">
            <div className="flex w-full max-w-[700px] flex-col items-center gap-3 sm:gap-4 text-center">
              <Reveal delay={0.1}>
                <PreTitle>Process</PreTitle>
              </Reveal>
              <Reveal as="h2" delay={0.2} className="t-h2 text-balance-tight">
                A collaborative approach
              </Reveal>
            </div>

            <Reveal delay={0.3} className="relative flex w-full flex-col items-center">
              {/* Step badge */}
              <div className="relative z-2 flex flex-col items-center gap-1.5 sm:gap-2">
                <p className="t-pretitle text-[11px] sm:text-[12px]">Step</p>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={step.number}
                    className="grid size-9 sm:size-11 place-items-center rounded-lg bg-brand text-[16px] sm:text-[18px] font-medium text-white shadow-[0_10px_24px_-14px_rgb(111_70_212/0.9)]"
                    initial={{ opacity: 0, y: -10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    transition={{ duration: 0.28, ease: [0.44, 0, 0.56, 1] }}
                  >
                    {step.number}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Arc */}
              <Arc progress={arc} />

              {/* Panel */}
              <div className="relative z-2 mt-8 sm:mt-12 lg:mt-24 flex w-full max-w-[560px] flex-col items-center gap-4 sm:gap-5 px-4 sm:px-5 text-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step.title}
                    className="flex w-full flex-col items-center gap-3 sm:gap-4"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: [0.44, 0, 0.56, 1] }}
                  >
                    <h3 className="t-h4">{step.title}</h3>
                    <p className="t-medium max-w-[46ch] text-[14px] sm:text-[16px]">{step.description}</p>

                    <div className="flex w-full flex-col gap-2.5 sm:gap-3">
                      <span className="h-px w-full border-t border-dashed border-midnight-18" aria-hidden />
                      <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 sm:gap-y-2">
                        {step.features.map((f, k) => (
                          <li key={f} className="t-pretitle text-[10px] sm:text-[12px] flex items-center gap-2 sm:gap-3">
                            {k > 0 && <span className="size-1 rounded-full bg-midnight-30" aria-hidden />}
                            {f}
                          </li>
                        ))}
                      </ul>
                      <span className="h-px w-full border-t border-dashed border-midnight-18" aria-hidden />
                    </div>
                  </motion.div>
                </AnimatePresence>

                <Button href="/contact-us" variant="brand" size="sm" className="sm:h-11 sm:px-5 sm:text-[15px]">
                  Start your project
                </Button>
              </div>

              {/* Progress readout */}
              <div className="relative z-2 mt-6 sm:mt-8 flex flex-col items-center gap-2 sm:gap-3">
                <p className="t-pretitle text-[11px] sm:text-[12px] tabular-nums">
                  {step.number}/{String(processSteps.length).padStart(2, "0")}
                </p>
                <div className="flex items-center gap-2 sm:gap-2.5">
                  {processSteps.map((s, i) => (
                    <span
                      key={s.number}
                      className={`size-1.5 sm:size-2 rounded-full transition-colors duration-300 ${
                        i === index ? "bg-midnight" : "bg-midnight-18"
                      }`}
                      aria-hidden
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

function Arc({ progress }: { progress: ReturnType<typeof useTransform<number, number>> }) {
  const pathLength = progress;

  return (
    <div className="pointer-events-none absolute top-4 sm:top-6 lg:top-8 left-1/2 z-0 w-[640px] sm:w-[980px] lg:w-[1400px] max-w-none -translate-x-1/2" aria-hidden>
      <svg viewBox="0 0 1400 420" fill="none" className="w-full">
        <path
          d="M20 420C20 200 330 30 700 30s680 170 680 390"
          stroke="rgb(238 236 234)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <motion.path
          d="M20 420C20 200 330 30 700 30s680 170 680 390"
          stroke="rgb(111 70 212 / 0.35)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ pathLength }}
        />
        <path
          d="M20 420C20 200 330 30 700 30s680 170 680 390"
          fill="url(#arcFill)"
          stroke="none"
          opacity="0.5"
        />
        <defs>
          <linearGradient id="arcFill" x1="700" y1="30" x2="700" y2="420" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" stopOpacity="0.85" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
