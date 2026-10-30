"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";
import { toolIcons } from "@/data/content";
import { inView } from "@/lib/motion";

/** The "Ready to start your next project?" banner shared across every page. */
export function CtaBanner() {
  return (
    <section className="section relative pt-16 lg:pt-24">
      {/* Background animated concentric arc with orbiting tool glyphs */}
      <CtaArc />

      <div className="container-x relative z-2 mx-auto max-w-[1060px]">
        <Reveal className="shell">
          <div className="relative isolate overflow-hidden rounded-xl bg-gradient-to-r from-[rgb(238_233_250)] via-[rgb(198_175_244)] to-[rgb(134_82_231)] px-4 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
            <Rings />

            <div className="relative z-2 grid items-center gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
              <div className="flex flex-col items-start gap-4 sm:gap-5">
                <p className="t-pretitle text-midnight/70">Let&rsquo;s build something great</p>
                <h2 className="t-h2 max-w-[16ch] text-balance-tight">Ready to start your next project?</h2>
                <Button href="/contact-us" variant="dark">
                  Get started
                </Button>
              </div>

              <div className="relative w-full rounded-xl border border-white/70 bg-white p-4 sm:p-5 shadow-[0_24px_60px_-30px_rgb(6_6_18/0.5)] backdrop-blur-sm lg:p-6">
                {/* Always-visible Floating AURIX Cursor Badge in the middle of the card's white space */}
                <motion.div
                  className="pointer-events-none absolute top-[38%] right-6 sm:right-10 z-20 flex flex-col items-start"
                  animate={{
                    y: [0, -6, 0],
                    x: [0, 3, 0],
                    rotate: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {/* Cursor Arrow Pointer */}
                  <svg
                    width="22"
                    height="24"
                    viewBox="0 0 18 20"
                    fill="none"
                    aria-hidden="true"
                    className="text-midnight drop-shadow-sm"
                  >
                    <path
                      d="M1.5 1.5L16 9.5L8.5 11.5L5.5 18.5L1.5 1.5Z"
                      fill="currentColor"
                    />
                  </svg>
                  {/* AURIX Pill Badge */}
                  <div className="ml-3.5 -mt-1 rounded-full bg-midnight px-3.5 py-1 text-[13px] sm:text-[14px] font-bold tracking-wider text-white shadow-md border border-white/20 uppercase">
                    AURIX
                  </div>
                </motion.div>

                <p className="t-pretitle flex items-center gap-2.5">
                  <span className="relative grid size-2 place-items-center">
                    <span className="absolute size-2 rounded-full bg-midnight animate-pulse-ring" aria-hidden />
                    <span className="size-2 rounded-full bg-midnight" />
                  </span>
                  Available for project
                </p>

                <div className="mt-5 flex items-center gap-3">
                  <span className="relative size-11 overflow-hidden rounded-full bg-mist">
                    <Image src="/assets/logo-mark.webp" alt="" fill sizes="44px" className="object-contain p-1.5" />
                  </span>
                  <span className="text-[18px] text-midnight-30">+</span>
                  <span className="grid size-11 place-items-center rounded-full bg-midnight text-[13px] font-medium text-white">
                    You
                  </span>
                </div>

                <div className="mt-5 flex flex-col gap-1">
                  <p className="t-h5">Quick 15-minute call</p>
                  <p className="t-sm">Pick a time that works for you.</p>
                </div>

                <Button href={site.bookingUrl} variant="brand" newTab className="mt-5 w-full">
                  Book a free call
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Inner card decorative rings dipping into the CTA banner */
function Rings() {
  return (
    <div className="hidden sm:block pointer-events-none absolute inset-0 z-1 overflow-hidden" aria-hidden>
      <svg
        className="size-full"
        viewBox="0 0 1000 385"
        preserveAspectRatio="none"
        fill="none"
      >
        {/* Upper arc: dipping into upper-center of the banner */}
        <motion.circle
          cx="490"
          cy="-110"
          r="188"
          stroke="#2e146d"
          strokeWidth="6.5"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={inView}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Lower arc: starting from bottom edge, passing behind the card to the bottom right */}
        <motion.path
          d="M 505 385 A 270 240 0 0 1 995 385"
          stroke="#2e146d"
          strokeWidth="7.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={inView}
          transition={{ duration: 0.95, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
    </div>
  );
}

/** Concentric half-ring arch with orbiting tool glyph badges positioned behind the CTA banner section */
function CtaArc() {
  return (
    <div
      className="hidden sm:block pointer-events-none absolute left-1/2 -translate-x-1/2 -z-10 w-[160vw] max-w-none overflow-hidden top-[160px] sm:top-[175px] lg:top-[190px] h-[420px] sm:h-[490px] lg:h-[570px]"
      style={{
        maskImage: "linear-gradient(to bottom, black 0%, black 88%, rgba(0, 0, 0, 0.4) 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 88%, rgba(0, 0, 0, 0.4) 100%)",
      }}
      aria-hidden
    >
      <div className="relative aspect-square w-full">
        {/* Outer concentric ring track or first arc*/}
        <div className="absolute inset-0 rounded-full border border-midnight-18/60 bg-[#e9e8e5] p-2 sm:p-2.5 shadow-[0_0_50px_rgba(0,0,0,0.03)]">
          <div className="size-full rounded-full border border-white/90 bg-[#f4f3f0]" />
        </div>

        {/* Orbiting ring track of 16 tool glyphs */}
        <div
          className="absolute inset-0"
          style={{ animation: "spin-slow 120s linear infinite" }}
        >
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = i * 22.5;
            return (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 h-full w-[46px] sm:w-[56px] lg:w-[68px] pointer-events-none"
                style={{ transform: `translate(-50%, -50%) rotate(${angle}deg)` }}
              >
                <div className="absolute left-0 top-0 w-full -translate-y-1/2">
                  <CtaGlyph index={i} />
                </div>
              </div>
            );
          })}
        </div>

        {/* 3rd arc */}
       <div className="absolute inset-[3.5%] rounded-full border border-midnight-18/60 bg-[#e9e8e5] p-2 sm:p-2.5">
        {/* 4th arc */}
       <div className="size-full rounded-full border border-white/90 bg-[#f4f3f0]" />
       </div>


        
      </div>
    </div>
  );
}

function CtaGlyph({ index }: { index: number }) {
  const icon = toolIcons[index % toolIcons.length];
  return (
    <div className="grid size-[46px] sm:size-[56px] lg:size-[68px] place-items-center rounded-xl sm:rounded-2xl border border-white bg-white/95 shadow-[0_8px_22px_-14px_rgb(6_6_18/0.3)]">
      <Image
        src={icon.src}
        alt={icon.label}
        width={36}
        height={36}
        className="size-6 sm:size-7 lg:size-9 object-contain"
      />
    </div>
  );
}
