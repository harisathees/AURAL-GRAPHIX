"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { CircularProgress } from "@/components/ui/CircularProgress";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceGlyph } from "@/components/ui/Icons";
import { emojiScores, industries, whyChooseUs } from "@/data/content";
import { site } from "@/data/site";
import { inView } from "@/lib/motion";

export function AboutBento() {
  return (
    <section id="about" className="section">
      <div className="container-x mx-auto max-w-[1060px]">
        <Reveal className="shell flex flex-col gap-5">
          {/* Row 1 */}
          <div className="grid gap-5 lg:grid-cols-[minmax(0,0.45fr)_minmax(0,1fr)]">
            <CsatCard />
            <WhyChooseCard />
          </div>

          {/* Row 2 */}
          <div className="grid gap-5 lg:grid-cols-2">
            <DiscussCard />
            <MetricsCard />
          </div>

          {/* Row 3 */}
          <div className="grid gap-5 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)_minmax(0,0.75fr)]">
            <RebuildsCard />
            <IndustriesCard />
            <MascotCard />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function CsatCard() {
  const [active, setActive] = useState(4);

  return (
    <article className="card flex flex-col items-center justify-between gap-10 p-5 text-center">
      <div className="flex flex-col gap-1.5">
        <h2 className="t-h5">CSAT</h2>
        <p className="t-medium">Client feedback shapes better work</p>
      </div>

      <div className="flex flex-col items-center gap-3">
        <p className="t-pretitle">{emojiScores[active].label}</p>
        <div className="flex items-center gap-2.5">
          {emojiScores.map((score, i) => (
            <button
              key={score.label}
              type="button"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              aria-label={score.label}
              aria-pressed={i === active}
              className={`relative grid size-[26px] place-items-center rounded-full transition-transform duration-300 ${
                i === active ? "scale-125 ring-2 ring-brand ring-offset-2 ring-offset-white" : "opacity-60 hover:opacity-100"
              }`}
            >
              <Image src={score.icon} alt="" width={26} height={26} className="size-full rounded-full" />
            </button>
          ))}
        </div>
      </div>
    </article>
  );
}

function WhyChooseCard() {
  const [index, setIndex] = useState(0);
  const item = whyChooseUs[index];

  return (
    <article className="card flex flex-col gap-5 p-5">
      <div className="grid flex-1 gap-5 sm:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-mist sm:aspect-auto sm:min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={item.image}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.44, 0, 0.56, 1] }}
            >
              <Image src={item.image} alt={item.title} fill sizes="(max-width: 640px) 90vw, 320px" className="object-cover" />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-col justify-between gap-6">
          <div className="flex items-start justify-between gap-3">
            <span className="grid size-10 place-items-center rounded-lg border border-midnight-10 bg-white text-brand">
              <Image src="/assets/service-symbol.webp" alt="" width={24} height={8} className="h-2.5 w-auto" />
            </span>
            <div className="flex gap-1.5">
              <ArrowButton
                label="Previous"
                onClick={() => setIndex((i) => (i - 1 + whyChooseUs.length) % whyChooseUs.length)}
                direction="left"
              />
              <ArrowButton
                label="Next"
                onClick={() => setIndex((i) => (i + 1) % whyChooseUs.length)}
                direction="right"
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={item.title}
              className="flex flex-col gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: [0.44, 0, 0.56, 1] }}
            >
              <h3 className="t-h5">{item.title}</h3>
              <p className="t-body">{item.description}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </article>
  );
}

function DiscussCard() {
  return (
    <article className="card relative flex flex-col items-center justify-between gap-5 overflow-hidden p-5 pb-0 text-center">
      <Image
        src="/assets/bg-gradient.webp"
        alt=""
        fill
        sizes="(max-width: 1024px) 90vw, 500px"
        className="z-0 object-cover"
      />
      <div className="relative z-2 flex flex-col gap-1.5 pt-1">
        <h2 className="t-h5">Discuss your project</h2>
      </div>

      <div className="relative z-2 flex flex-col items-center gap-3 py-6">
        <Button href={site.bookingUrl} variant="brand" newTab>
          Schedule a call - 15 mins free
        </Button>
        <p className="t-body">No pressure, just a thoughtful chat.</p>
      </div>

      <div className="relative z-2 flex h-20 w-full items-start justify-center">
        <div className="flex items-end">
          {[
            { src: "/assets/team/praveen-gunal.webp", rot: -8 },
            { src: "/assets/team/bala-vasanth.webp", rot: 0 },
            { src: "/assets/team/hari.webp", rot: 8 },
          ].map(({ src, rot }, i) => (
            <motion.span
              key={src}
              className="relative -ml-5 block h-[86px] w-[74px] overflow-hidden rounded-md border-4 border-white bg-white shadow-[0_10px_24px_-14px_rgb(6_6_18/0.5)] first:ml-0"
              style={{ zIndex: i === 1 ? 3 : 1 }}
              initial={{ opacity: 0, y: 24, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: rot }}
              viewport={inView}
              transition={{ type: "spring", duration: 0.6, bounce: 0.2, delay: 0.2 + i * 0.07 }}
            >
              <Image src={src} alt="" fill sizes="74px" className="object-cover" />
            </motion.span>
          ))}
        </div>
      </div>
    </article>
  );
}

function MetricsCard() {
  const metrics = [
    { value: 99, label: "Performance", size: 76, font: 16 },
    { value: 100, label: "Branding", size: 106, font: 21 },
    { value: 98, label: "Accessibility", size: 76, font: 16 },
  ];

  return (
    <article className="card flex flex-col justify-between gap-12 p-5">
      <div className="flex flex-col items-center gap-1.5 text-center">
        <h2 className="t-h5">Where ideas find their form</h2>
        <p className="t-body">Turning brand stories into visuals people remember.</p>
      </div>

      <div className="flex items-end justify-center gap-7">
        {metrics.map((m, i) => (
          <div key={m.label} className="flex flex-col items-center gap-2.5">
            <CircularProgress percentage={m.value} size={m.size} fontSize={m.font} delay={0.4 + i * 0.1} />
            <p className="t-pretitle">{m.label}</p>
          </div>
        ))}
      </div>
    </article>
  );
}

function RebuildsCard() {
  return (
    <article className="card flex flex-col gap-5 p-5">
      <div className="flex flex-col gap-1.5">
        <h2 className="t-h5">Our Agency Rebuilds</h2>
        <p className="t-sm">120% more inquiries</p>
      </div>
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-midnight">
        <Image
          src="/assets/rebuilds.webp"
          alt="Agency website rebuild case study"
          fill
          sizes="(max-width: 1024px) 90vw, 280px"
          className="object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>
    </article>
  );
}

function IndustriesCard() {
  return (
    <article className="card flex flex-col gap-5 overflow-hidden p-5">
      <h2 className="t-h5 text-center">Industries we work with</h2>
      <div className="relative h-[180px] overflow-hidden">
        <Marquee direction="y" duration={22} gap={12} className="h-full" itemClassName="w-full">
          {industries.map((label) => (
            <div key={label} className="w-full">
              <p className="t-pretitle flex items-center justify-center gap-3 py-1.5">
                <Dot /> {label} <Dot />
              </p>
              <span className="block h-px w-full bg-midnight-10" />
            </div>
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white via-white/85 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white via-white/85 to-transparent" />
      </div>
    </article>
  );
}

function MascotCard() {
  return (
    <article className="card grid place-items-center p-5">
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative aspect-square w-full max-w-[220px]"
      >
        <Image
          src="/assets/logo-mark.webp"
          alt={`${site.name} mascot`}
          fill
          sizes="220px"
          className="object-contain"
        />
      </motion.div>
    </article>
  );
}

/* ------------------------------------------------------------------ */

function Dot() {
  return <span className="size-1 rounded-full bg-midnight-30" aria-hidden />;
}

function ArrowButton({
  label,
  onClick,
  direction,
}: {
  label: string;
  onClick: () => void;
  direction: "left" | "right";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid size-8 place-items-center rounded-md border border-midnight-10 bg-white text-midnight transition-colors hover:bg-mist"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden className={direction === "left" ? "rotate-180" : ""}>
        <path d="m9 5 7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

export { ServiceGlyph };
