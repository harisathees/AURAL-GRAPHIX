"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { PreTitle } from "@/components/ui/PreTitle";
import { Reveal } from "@/components/ui/Reveal";
import { ScriptText } from "@/components/ui/ScriptText";
import { ServiceGlyph } from "@/components/ui/Icons";
import { services } from "@/data/content";

export function Services() {
  const [activeCard, setActiveCard] = useState(0);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;
      let current = 0;
      cardRefs.current.forEach((ref, idx) => {
        if (ref) {
          const top = ref.offsetTop;
          if (scrollPos >= top) {
            current = idx;
          }
        }
      });
      setActiveCard(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="services" className="section scroll-mt-28">
      <div className="container-x mx-auto max-w-[1060px]">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-0">
          {/* Sticky left column */}
          <div className="flex flex-col items-start gap-4 pb-6 lg:sticky lg:top-28 lg:h-fit lg:w-1/2 lg:pr-10 lg:pb-10">
            <Reveal delay={0.1}>
              <PreTitle>What we do</PreTitle>
            </Reveal>
            <Reveal as="h2" delay={0.2} className="t-h2 text-balance-tight">
              Services built to drive impact
            </Reveal>

            <div className="relative mt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <Reveal delay={0.3}>
                <Button href="/contact-us" variant="brand">
                  Discuss your ideas
                </Button>
              </Reveal>
              <div className="flex flex-col items-center gap-1 pt-2 sm:pt-6">
                <Image
                  src="/assets/arrow-curve.webp"
                  alt=""
                  width={36}
                  height={31}
                  className="h-6 sm:h-7 w-auto -scale-x-100 opacity-55"
                />
                <ScriptText text="Let's get started" className="whitespace-nowrap" />
              </div>
            </div>
          </div>

          {/* Cards Stack */}
          <div className="shell flex flex-col gap-4 sm:gap-5 lg:w-1/2">
            {/* Mobile Stack Progress Bar & Counter */}
            <div className="flex items-center justify-between px-2 pt-1 pb-1 lg:hidden">
              <span className="t-pretitle text-[11px] text-brand font-semibold">
                Service 0{activeCard + 1} of 0{services.length}
              </span>
              <div className="flex items-center gap-1.5">
                {services.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      cardRefs.current[idx]?.scrollIntoView({ behavior: "smooth", block: "center" });
                    }}
                    aria-label={`Jump to service ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      activeCard === idx ? "w-5 bg-brand" : "w-1.5 bg-midnight-18"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col">
              {services.map((service, i) => (
                <article
                  key={service.title}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  style={{
                    top: `calc(72px + ${i * 26}px)`,
                    zIndex: i + 1,
                  }}
                  className="sticky card flex flex-col gap-5 p-5 transition-all duration-300 shadow-[0_-6px_22px_-6px_rgba(6,6,18,0.14),0_18px_40px_-24px_rgba(6,6,18,0.3)] mb-5 sm:mb-7 last:mb-0 lg:static lg:mb-5 lg:last:mb-0 lg:shadow-none hover:shadow-[0_18px_40px_-28px_rgb(6_6_18/0.35)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="grid size-7 place-items-center rounded-md bg-brand-tint text-brand text-[12px] font-semibold">
                        0{i + 1}
                      </span>
                      <h3 className="t-h5">{service.title}</h3>
                    </div>
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
                        className="t-pretitle rounded-full border border-midnight-10 bg-mist px-3 py-1.5 sm:py-2 text-[10px] lg:text-[11px]"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
