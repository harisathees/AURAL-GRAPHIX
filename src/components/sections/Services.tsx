"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { Button } from "@/components/ui/Button";
import { PreTitle } from "@/components/ui/PreTitle";
import { Reveal } from "@/components/ui/Reveal";
import { ScriptText } from "@/components/ui/ScriptText";
import { ServiceGlyph } from "@/components/ui/Icons";
import { services } from "@/data/content";

export function Services() {
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion() ?? false;

  const { scrollYProgress: mobileScrollYProgress } = useScroll({
    target: mobileContainerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="services" className="section scroll-mt-28">
      <div className="container-x mx-auto max-w-[1060px]">
        {/* =========================================================
            DESKTOP VIEW (hidden lg:flex)
            - Restored exactly as before:
            - Left sticky header & CTA with Reveal animations
            - Right shell with original card styling & hairline dividers
            ========================================================= */}
        <div className="hidden lg:flex lg:flex-row lg:gap-0">
          {/* Sticky left column */}
          <div className="flex flex-col items-start gap-4 pb-6 lg:sticky lg:top-28 lg:h-fit lg:w-1/2 lg:pr-10 lg:pb-10">
            <Reveal delay={0.1}>
              <PreTitle>What we do</PreTitle>
            </Reveal>
            <Reveal as="h2" delay={0.2} className="t-h2 text-balance-tight">
              Services built to drive impact
            </Reveal>

            <div className="relative mt-2 flex items-center gap-4">
              <Reveal delay={0.3}>
                <Button href="/contact-us" variant="brand">
                  Discuss your ideas
                </Button>
              </Reveal>
              <div className="flex flex-col items-center gap-1 pt-6">
                <Image
                  src="/assets/arrow-curve.webp"
                  alt=""
                  width={36}
                  height={31}
                  className="h-7 w-auto -scale-x-100 opacity-55"
                />
                <ScriptText text="Let's get started" className="whitespace-nowrap" />
              </div>
            </div>
          </div>

          {/* Cards column as originally styled */}
          <Reveal delay={0.4} className="shell flex flex-col gap-5 lg:w-1/2">
            {services.map((service, i) => (
              <Reveal
                key={service.title}
                delay={0.45 + i * 0.05}
                as="article"
                className="card flex flex-col gap-5 p-5 transition-shadow duration-500 hover:shadow-[0_18px_40px_-28px_rgb(6_6_18/0.35)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="t-h5">{service.title}</h3>
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-midnight-10 bg-mist text-brand">
                    <ServiceGlyph name={service.icon} className="size-5" />
                  </span>
                </div>

                <span className="h-px w-full bg-midnight-10" aria-hidden />

                <p className="t-body">{service.description}</p>

                <ul className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <li
                      key={tag}
                      className="t-pretitle rounded-full border border-midnight-10 bg-mist px-3 py-2 text-[10px] lg:text-[11px]"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </Reveal>
        </div>

        {/* =========================================================
            MOBILE / SMALL SCREENS VIEW (lg:hidden)
            - Sticky stacking cards animation
            - All 5 cards participate in stack animation
            - 100% solid, fully opaque cards (zero transparency)
            ========================================================= */}
        <div className="lg:hidden flex flex-col gap-10">
          {/* Header */}
          <div className="flex flex-col items-center text-center gap-4">
            <PreTitle>What we do</PreTitle>
            <h2 className="t-h2 text-balance-tight max-w-[20ch]">
              Services built to drive impact
            </h2>
            <p className="t-medium text-slate max-w-[48ch]">
              We combine strategy, design, and technology to help ambitious brands stand out
              and create memorable digital experiences.
            </p>

            <div className="relative mt-2 flex flex-wrap items-center justify-center gap-3">
              <Button href="/contact-us" variant="brand">
                Discuss your ideas
              </Button>
              <div className="flex flex-col items-center gap-1 pt-2">
                <Image
                  src="/assets/arrow-curve.webp"
                  alt=""
                  width={36}
                  height={31}
                  className="h-6 w-auto -scale-x-100 opacity-55"
                />
                <ScriptText text="Let's get started" className="whitespace-nowrap" />
              </div>
            </div>
          </div>

          {/* Sticky Stacking Cards Track for Small Screens */}
          <div
            ref={mobileContainerRef}
            className="relative w-full [--card-offset:10px] [--header-height:64px]"
          >
            {services.map((service, index) => (
              <MobileStackCard
                key={service.title}
                service={service}
                index={index}
                total={services.length}
                scrollYProgress={mobileScrollYProgress}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface MobileStackCardProps {
  service: (typeof services)[number];
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  shouldReduceMotion: boolean;
}

function MobileStackCard({
  service,
  index,
  total,
  scrollYProgress,
  shouldReduceMotion,
}: MobileStackCardProps) {
  const isLast = index === total - 1;

  // Stacking progress intervals for depth scale
  const start = index / total;
  const end = (index + 1) / total;

  // Depth scale effect: scale 1 -> 0.94 as next card stacks on top; last card settles gently
  const rawScale = useTransform(
    scrollYProgress,
    [start, end],
    isLast ? [1, 0.98] : [1, 0.94]
  );
  const scale = shouldReduceMotion ? 1 : rawScale;

  return (
    <div
      className="sticky w-full"
      style={{
        top: `calc(var(--header-height, 64px) + 16px + ${index} * var(--card-offset, 10px))`,
        zIndex: 10 + index,
        // Tighter scroll distance for responsive, compact stacking animation
        marginBottom: isLast ? "20vh" : "20vh",
      }}
    >
      <motion.div
        style={{
          scale,
          transformOrigin: "top center",
        }}
        className="will-change-transform origin-top w-full"
      >
        {/* Exact same card design as big screen: solid opaque white, no transparency */}
        <article
          className="card flex flex-col gap-5 p-5 rounded-2xl border border-midnight-10 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-shadow duration-500"
          style={{ backgroundColor: "#ffffff", opacity: 1 }}
        >
          <div className="flex items-start justify-between gap-4">
            <h3 className="t-h5">{service.title}</h3>
            <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-midnight-10 bg-mist text-brand">
              <ServiceGlyph name={service.icon} className="size-5" />
            </span>
          </div>

          <span className="h-px w-full bg-midnight-10" aria-hidden />

          <p className="t-body">{service.description}</p>

          <ul className="flex flex-wrap gap-2">
            {service.tags.map((tag) => (
              <li
                key={tag}
                className="t-pretitle rounded-full border border-midnight-10 bg-mist px-3 py-2 text-[10px]"
              >
                {tag}
              </li>
            ))}
          </ul>
        </article>
      </motion.div>
    </div>
  );
}
