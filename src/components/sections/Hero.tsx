"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { PreTitle } from "@/components/ui/PreTitle";
import { Reveal } from "@/components/ui/Reveal";
import { ScriptText } from "@/components/ui/ScriptText";
import { toolIcons } from "@/data/content";
import { springAppear } from "@/lib/motion";

const clients = ["Nexter", "oslo.", "NOMME", "next"];

export function Hero() {
  return (
    <section className="relative isolate flex w-full items-center justify-center overflow-hidden px-5 pt-[140px] pb-24 sm:pt-[180px] lg:pt-[220px] lg:pb-40">
      <HeroRings />

      <div className="relative z-2 flex w-full max-w-[640px] flex-col items-center gap-14 lg:gap-24">
        <div className="flex w-full flex-col items-center gap-5 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springAppear, delay: 0.5 }}
          >
            <PreTitle boxed>Creative Design Agency</PreTitle>
          </motion.div>

          <Reveal as="h1" delay={0.55} onMount className="t-h1 text-balance-tight">
            We design brands that move{" "}
            <span className="text-brand-deep">people</span>
          </Reveal>

          <Reveal as="p" delay={0.6} onMount className="t-medium max-w-[52ch]">
            We combine strategy, design, and technology to help ambitious brands stand out &amp; create
            meaningful digital experiences.
          </Reveal>

          <div className="relative mt-2 flex flex-wrap items-center justify-center gap-4">
            <Reveal delay={0.65} onMount>
              <Button href="/contact-us" variant="brand" className="border border-graphite">
                Discuss your ideas
              </Button>
            </Reveal>
            <Reveal delay={0.7} onMount>
              <Button href="/#services" variant="dark">
                View services
              </Button>
            </Reveal>

            {/* 
            Handwritten accent, positioned like the source design
            <motion.div
              className="pointer-events-none absolute right-full top-1/2 hidden -translate-y-2 flex-col items-end gap-1 pr-4 lg:flex"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springAppear, delay: 0.9 }}
            >
              <Image
                src="/assets/arrow-curve.webp"
                alt=""
                width={41}
                height={35}
                className="h-8 w-auto -rotate-2 opacity-60"
              />
              <ScriptText text="Schedule a free call now" onMount delay={0.95} className="whitespace-nowrap" />
            </motion.div>
            */}
          </div>

          {/* 
          Mobile accent
          <ScriptText text="Schedule a free call now" onMount delay={0.9} className="lg:hidden" />
          */}
        </div>

        {/* Trust bar */}
        <div className="flex w-full flex-col items-center gap-7">
          <Reveal delay={0.75} onMount className="flex w-full max-w-[640px] items-center gap-3">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-midnight-18" />
            <p className="t-pretitle whitespace-nowrap">
              Trusted by <span className="text-midnight">20+</span> global leaders
            </p>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-midnight-18" />
          </Reveal>

          <Reveal delay={0.8} onMount className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
            {clients.map((name) => (
              <span
                key={name}
                className="text-[17px] font-semibold tracking-[-0.04em] text-midnight/55 transition-colors hover:text-midnight lg:text-[19px]"
              >
                {name}
              </span>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/**
 * Six concentric rings — three entering from each edge — reproducing the exact
 * offsets from the source design. The outermost pair carries a slowly
 * rotating track of glyphs.
 */
function HeroRings() {
  const rings = [
    { size: 1800, visible: "clamp(40px, 30vw, 400px)", ring: 10, delay: 0.25, spin: true },
    { size: 1400, visible: "clamp(0px, calc(24vw - 70px), 250px)", ring: 8, delay: 0.13, spin: false },
    { size: 1000, visible: "clamp(10px, 8vw, 100px)", ring: 6, delay: 0.05, spin: false, hideOnMobile: true },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 -z-1 overflow-hidden" aria-hidden>
      {(["left", "right"] as const).map((side) =>
        rings.map(({ size, visible, ring, delay, spin, hideOnMobile }) => (
          <motion.div
            key={`${side}-${size}`}
            className={`absolute top-1/2 rounded-full bg-pearl ${hideOnMobile ? "hidden sm:block" : ""}`}
            style={{
              width: size,
              height: size,
              marginTop: -size / 2,
              padding: ring,
              [side]: `calc(${visible} - ${size}px)`,
            }}
            initial={{ opacity: 0, x: side === "left" ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...springAppear, delay }}
          >
            <div className="size-full rounded-full border border-white bg-mist" />
            {spin && <RingTrack reverse={side === "right"} seed={side === "left" ? 0 : 3} ring={ring} />}
          </motion.div>
        )),
      )}
    </div>
  );
}

/** The 12 tool glyphs that orbit each outer ring over 150s. */
function RingTrack({ reverse, seed, ring }: { reverse: boolean; seed: number; ring: number }) {
  return (
    <div className={`absolute inset-0 ${reverse ? "animate-spin-slow-reverse" : "animate-spin-slow"}`}>
      {Array.from({ length: 6 }).map((_, k) => (
        <div
          key={k}
          className="absolute top-1/2 left-1/2 h-full w-[76px]"
          style={{ transform: `translate(-50%, -50%) rotate(${k * 30}deg)` }}
        >
          <div className="absolute left-0 w-full" style={{ top: ring / 2, transform: "translateY(-50%)" }}>
            <RingGlyph index={seed + k * 2} className="-rotate-90" />
          </div>
          <div className="absolute left-0 w-full" style={{ bottom: ring / 2, transform: "translateY(50%)" }}>
            <RingGlyph index={seed + k * 2 + 1} className="rotate-90" />
          </div>
        </div>
      ))}
    </div>
  );
}

function RingGlyph({ index, className = "" }: { index: number; className?: string }) {
  const icon = toolIcons[index % toolIcons.length];
  return (
    <div
      className={`grid size-[76px] place-items-center rounded-2xl border border-white bg-white/80 shadow-[0_8px_22px_-14px_rgb(6_6_18/0.3)] ${className}`}
    >
      <Image src={icon.src} alt="" width={40} height={40} className="size-10" />
    </div>
  );
}
