"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { StarIcon } from "@/components/ui/Icons";
import { comparison } from "@/data/content";
import { charReveal, inView, stagger } from "@/lib/motion";

const avatars = [
  "/assets/team/praveen-gunal.webp",
  "/assets/team/bala-vasanth.webp",
  "/assets/team/hari.webp",
];

export function Compare() {
  return (
    <section className="section">
      <div className="container-x mx-auto max-w-[700px]">
        <div className="flex flex-col gap-10 lg:gap-[60px]">
          <div className="flex flex-col gap-6">
            <Reveal as="h2" className="t-h4 text-balance-tight">
              The right <span className="text-brand">creative partner</span> changes more than the design.
            </Reveal>

            <WordReveal />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-0">
            <Reveal delay={0.1} className="overflow-hidden rounded-2xl bg-white sm:rounded-r-none">
              <ColumnHeader>{comparison.others.label}</ColumnHeader>
              <ul>
                {comparison.others.items.map((item) => (
                  <Row key={item} muted>
                    {item}
                  </Row>
                ))}
              </ul>
            </Reveal>

            <Reveal
              delay={0.2}
              className="overflow-hidden rounded-2xl bg-gradient-to-b from-[rgb(226_213_247)] to-[rgb(167_128_235)] shadow-[0_24px_50px_-28px_rgb(111_70_212/0.7)] sm:rounded-l-none"
            >
              <ColumnHeader>{comparison.aural.label}</ColumnHeader>
              <ul>
                {comparison.aural.items.map((item) => (
                  <Row key={item}>{item}</Row>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.25} className="flex flex-wrap items-center gap-5">
            <Button href="/about-us" variant="brand">
              Read our story
            </Button>

            <div className="flex items-center">
              {avatars.map((src, i) => (
                <span
                  key={src}
                  className="relative -ml-2.5 size-9 overflow-hidden rounded-full border-2 border-white first:ml-0"
                  style={{ zIndex: avatars.length - i }}
                >
                  <Image src={src} alt="" fill sizes="36px" className="object-cover" />
                </span>
              ))}
              <span className="-ml-2.5 grid size-9 place-items-center rounded-full border-2 border-white bg-mist text-[11px] font-semibold text-midnight">
                +51
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="flex gap-0.5 text-brand-deep" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} className="size-4" />
                  ))}
                </span>
                <span className="text-[15px] font-medium">4.9/5</span>
              </div>
              <p className="t-sm">
                Trusted by <span className="font-semibold text-brand">54+</span> visionary brands
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** "So we made it simple to compare how we work ⬤ versus what you usually get in the market." */
function WordReveal() {
  const parts: Array<{ text: string; accent?: boolean; toggle?: boolean }> = [
    { text: "So" }, { text: "we" }, { text: "made" }, { text: "it" },
    { text: "simple" }, { text: "to" }, { text: "compare", accent: true },
    { text: "how" }, { text: "we" }, { text: "work" }, { text: "", toggle: true },
    { text: "versus" }, { text: "what" }, { text: "you" }, { text: "usually" },
    { text: "get" }, { text: "in", accent: true }, { text: "the", accent: true },
    { text: "market.", accent: true },
  ];

  return (
    <motion.h3
      className="t-h4 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-balance-tight"
      variants={stagger(0.035, 0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
    >
      {parts.map((p, i) =>
        p.toggle ? (
          <motion.span
            key={`toggle-${i}`}
            variants={charReveal}
            className="inline-flex h-7 w-[52px] items-center rounded-full bg-brand-deep px-1"
            aria-hidden
          >
            <motion.span
              className="block size-5 rounded-full bg-white"
              initial={{ x: 0 }}
              whileInView={{ x: 24 }}
              viewport={inView}
              transition={{ type: "spring", stiffness: 260, damping: 26, delay: 0.9 }}
            />
          </motion.span>
        ) : (
          <motion.span key={`${p.text}-${i}`} variants={charReveal} className={p.accent ? "text-brand" : undefined}>
            {p.text}
          </motion.span>
        ),
      )}
    </motion.h3>
  );
}

function ColumnHeader({ children }: { children: string }) {
  return <h3 className="t-h4sm px-5 py-5 lg:px-6">{children}</h3>;
}

function Row({ children, muted = false }: { children: string; muted?: boolean }) {
  return (
    <li className="flex items-center gap-2.5 border-t border-dashed border-midnight-10 px-5 py-4 lg:px-6">
      <svg width="8" height="11" viewBox="0 0 7 10" fill="none" aria-hidden className="shrink-0 opacity-50">
        <path d="M1.5 1 5.5 5l-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className={`text-[14px] lg:text-[15px] ${muted ? "text-slate" : "text-midnight"}`}>{children}</span>
    </li>
  );
}
