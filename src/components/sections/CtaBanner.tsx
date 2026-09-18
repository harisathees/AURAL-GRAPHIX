"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";
import { inView } from "@/lib/motion";

/** The "Ready to start your next project?" banner shared across every page. */
export function CtaBanner() {
  return (
    <section className="section pt-16 lg:pt-24">
      <div className="container-x mx-auto max-w-[1060px]">
        <Reveal className="shell">
          <div className="relative isolate overflow-hidden rounded-xl bg-gradient-to-r from-[rgb(238_233_250)] via-[rgb(198_175_244)] to-[rgb(134_82_231)] px-6 py-10 lg:px-12 lg:py-14">
            <Rings />

            <div className="relative z-2 grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
              <div className="flex flex-col items-start gap-5">
                <p className="t-pretitle text-midnight/70">Let&rsquo;s build something great</p>
                <h2 className="t-h2 max-w-[16ch] text-balance-tight">Ready to start your next project?</h2>
                <Button href="/contact-us" variant="dark">
                  Get started
                </Button>
              </div>

              <div className="w-full rounded-xl border border-white/70 bg-white/95 p-5 shadow-[0_24px_60px_-30px_rgb(6_6_18/0.5)] backdrop-blur-sm lg:p-6">
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

function Rings() {
  return (
    <div className="pointer-events-none absolute inset-0 z-1 overflow-hidden" aria-hidden>
      {[
        { size: 420, top: "-55%", left: "34%" },
        { size: 560, top: "45%", left: "22%" },
      ].map(({ size, top, left }, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full border-2 border-brand-deep/45"
          style={{ width: size, height: size, top, left }}
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={inView}
          transition={{ duration: 0.8, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </div>
  );
}
