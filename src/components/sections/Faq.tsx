"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { PreTitle } from "@/components/ui/PreTitle";
import { Reveal } from "@/components/ui/Reveal";
import { ScriptText } from "@/components/ui/ScriptText";
import { faqs } from "@/data/content";

const avatars = [
  "/assets/team/praveen-gunal.webp",
  "/assets/team/bala-vasanth.webp",
  "/assets/team/hari.webp",
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faqs" className="section overflow-hidden pb-24 lg:pb-40">
      <div className="container-x mx-auto max-w-[700px]">
        <div className="flex flex-col items-center gap-8">
          <div className="relative flex flex-col items-center gap-4 text-center">
            <Reveal delay={0.1}>
              <PreTitle>Got questions</PreTitle>
            </Reveal>
            <Reveal as="h2" delay={0.2} className="t-h2 text-balance-tight">
              We&rsquo;ve got answers
            </Reveal>

            <div className="pointer-events-none absolute -top-2 -right-16 hidden flex-col items-start gap-1 xl:flex">
              <ScriptText text="Let's clear things up" className="whitespace-nowrap" />
              <Image
                src="/assets/arrow-curve.webp"
                alt=""
                width={30}
                height={26}
                className="h-6 w-auto rotate-[190deg] opacity-55"
              />
            </div>
          </div>

          <Reveal delay={0.3} className="shell flex w-full flex-col gap-3">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div key={faq.question} className="overflow-hidden rounded-lg bg-white">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      id={`faq-trigger-${i}`}
                      className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-mist/60"
                    >
                      <span className="text-[15px] font-medium tracking-[-0.02em] text-midnight lg:text-[17px]">
                        {i + 1}. {faq.question}
                      </span>
                      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-midnight text-white">
                        <motion.svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden
                          animate={{ rotate: isOpen ? 135 : 0 }}
                          transition={{ duration: 0.3, ease: [0.44, 0, 0.56, 1] }}
                        >
                          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                        </motion.svg>
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${i}`}
                        role="region"
                        aria-labelledby={`faq-trigger-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.44, 0, 0.56, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="t-body border-t border-dashed border-midnight-10 px-5 py-5">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </Reveal>

          <Reveal delay={0.4} className="flex flex-col items-center gap-4">
            <div className="flex items-center">
              {avatars.map((src, i) => (
                <span
                  key={src}
                  className="relative -ml-3 size-9 overflow-hidden rounded-full border-2 border-white first:ml-0"
                  style={{ zIndex: avatars.length - i }}
                >
                  <Image src={src} alt="" fill sizes="36px" className="object-cover" />
                </span>
              ))}
            </div>
            <p className="t-h5">Still have questions?</p>
            <Button href="/contact-us" variant="brand">
              Let&rsquo;s talk
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
