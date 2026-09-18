"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { PreTitle } from "@/components/ui/PreTitle";
import { Reveal } from "@/components/ui/Reveal";
import { ScriptText } from "@/components/ui/ScriptText";
import { ServiceGlyph } from "@/components/ui/Icons";
import { services } from "@/data/content";

export function Services() {
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

          {/* Cards */}
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
      </div>
    </section>
  );
}
