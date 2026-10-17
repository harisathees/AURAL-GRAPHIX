"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";

/** The "Ready to start your next project?" banner shared across every page. */
export function CtaBanner() {
  return (
    <section className="section pt-16 lg:pt-24">
      <div className="container-x mx-auto max-w-[1060px]">
        <Reveal className="shell">
          <div className="relative isolate overflow-hidden rounded-xl bg-gradient-to-r from-[rgb(238_233_250)] via-[rgb(198_175_244)] to-[rgb(134_82_231)] px-4 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14">


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
