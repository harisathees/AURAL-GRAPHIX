"use client";

import Image from "next/image";
import { Carousel } from "@/components/ui/Carousel";
import { PreTitle } from "@/components/ui/PreTitle";
import { Reveal } from "@/components/ui/Reveal";
import { StarIcon } from "@/components/ui/Icons";
import { testimonials } from "@/data/content";

const avatarFor = (name: string) =>
  ({
    "Mithran": "/assets/avatar-default.webp",
    "Iniya": "/assets/avatar-default.webp",
  })[name] ?? "/assets/avatar-default.webp";

export function Testimonials() {
  return (
    <section id="testimonials" className="section relative">
      <div className="container-x mx-auto max-w-[700px]">
        <div className="flex flex-col items-center gap-4 text-center">
          <Reveal delay={0.1}>
            <PreTitle>Testimonials</PreTitle>
          </Reveal>
          <Reveal as="h2" delay={0.2} className="t-h2 text-balance-tight">
            What clients say
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.3} className="relative mt-8 w-full">
        <div className="container-x mx-auto max-w-[1340px]">
          <Carousel
            label="Client testimonials"
            interval={6}
            gap={24}
            itemsPerView={{ base: 1, lg: 2 }}
            showArrows
            slides={testimonials.map((t) => (
              <figure
                key={t.name}
                className="flex h-full min-h-[300px] flex-col justify-between gap-8 rounded-2xl border border-white bg-white p-6 shadow-[0_18px_44px_-34px_rgb(6_6_18/0.35)] lg:p-8"
              >
                <blockquote className="t-h5 leading-[1.45] text-midnight">{t.quote}</blockquote>

                <figcaption className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="relative size-10 overflow-hidden rounded-full bg-mist">
                      <Image src={avatarFor(t.name)} alt="" fill sizes="40px" className="object-cover" />
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="text-[15px] font-medium text-midnight">{t.name}</span>
                      <span className="t-sm">—</span>
                      <span className="t-sm">{t.role}</span>
                    </span>
                  </div>

                  <span className="flex gap-0.5 text-brand-deep" aria-label={`${t.rating} out of 5 stars`}>
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <StarIcon key={i} className="size-4" aria-hidden />
                    ))}
                  </span>
                </figcaption>
              </figure>
            ))}
          />
        </div>
      </Reveal>
    </section>
  );
}
