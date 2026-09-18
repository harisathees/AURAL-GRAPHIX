"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { galleryImages } from "@/data/content";
import { inView, springAppear } from "@/lib/motion";

const rowOne = galleryImages.slice(0, 7);
const rowTwo = galleryImages.slice(6, 13);

/**
 * The "blob" section: two counter-scrolling tickers of real branding work
 * behind a centred circular call-to-action.
 */
export function Gallery() {
  return (
    <section
      aria-label="Selected branding work"
      className="relative isolate z-1 w-full overflow-hidden bg-mist py-2.5"
    >
      <div className="flex flex-col gap-5 lg:gap-[30px]">
        <Marquee duration={70} gap={20} className="h-[180px] sm:h-[240px] lg:h-[300px]">
          {rowOne.map((src, i) => (
            <GalleryTile key={src} src={src} index={i} corner="bottom" />
          ))}
        </Marquee>

        <Marquee duration={70} gap={20} reverse className="h-[180px] sm:h-[240px] lg:h-[300px]">
          {rowTwo.map((src, i) => (
            <GalleryTile key={src} src={src} index={i} corner="top" />
          ))}
        </Marquee>
      </div>

      {/* Fades + tint, matching the layered overlays in the source */}
      <div className="pointer-events-none absolute inset-0 z-2 bg-midnight/[0.04]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 z-2 bg-[linear-gradient(90deg,white_0%,transparent_18%,transparent_82%,white_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-2 bg-gradient-to-b from-white/25 to-transparent"
        aria-hidden
      />

      {/* Top & bottom rails */}
      <div className="pointer-events-none absolute inset-x-[-1%] top-0 z-3 h-5 border-b border-white bg-pearl" aria-hidden />
      <div className="pointer-events-none absolute inset-x-[-1%] bottom-0 z-3 h-5 border-t border-white bg-pearl" aria-hidden />

      {/* Centre blob */}
      <motion.div
        className="absolute top-1/2 left-1/2 z-3 grid size-[260px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gradient-to-b from-white to-linen p-2.5 shadow-[0_30px_70px_-30px_rgb(6_6_18/0.4)] sm:size-[320px] lg:size-[380px]"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={inView}
        transition={{ ...springAppear, delay: 0.1 }}
      >
        <div className="grid size-full place-items-center rounded-full bg-gradient-to-b from-white to-linen p-0.5">
          <div className="flex size-full flex-col items-center justify-center gap-4 rounded-full bg-gradient-to-b from-mist to-white px-8 text-center lg:gap-[30px] lg:px-14">
            <div className="grid size-11 place-items-center rounded-lg border border-linen bg-mist lg:size-[58px]">
              <Image src="/assets/logo-mark.webp" alt="" width={44} height={44} className="h-6 w-auto lg:h-[31px]" />
            </div>
            <h2 className="t-h4 text-balance-tight">100+ Premium Designs</h2>
            <Button href="/projects" variant="brand" size="sm">
              Explore all Projects
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function GalleryTile({
  src,
  index,
  corner,
}: {
  src: string;
  index: number;
  corner: "top" | "bottom";
}) {
  return (
    <div
      className={`relative h-full w-[220px] shrink-0 overflow-hidden bg-white sm:w-[290px] lg:w-[390px] ${
        corner === "bottom" ? "rounded-b-2xl" : "rounded-t-2xl"
      }`}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="(max-width: 640px) 220px, (max-width: 1024px) 290px, 390px"
        className="object-cover"
        loading={index < 3 ? "eager" : "lazy"}
      />
    </div>
  );
}
