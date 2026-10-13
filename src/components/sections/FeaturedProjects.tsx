"use client";

import Image from "next/image";
import { Carousel } from "@/components/ui/Carousel";
import { PreTitle } from "@/components/ui/PreTitle";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { ScriptText } from "@/components/ui/ScriptText";
import { projects } from "@/data/projects";

const featured = projects.filter((p) => p.featured);

export function FeaturedProjects() {
  return (
    <section id="projects" className="section overflow-hidden pb-16">
      <div className="container-x mx-auto max-w-[700px]">
        <div className="relative flex flex-col items-center gap-4 text-center">
          <Reveal delay={0.1}>
            <PreTitle>Featured Projects</PreTitle>
          </Reveal>
          <Reveal as="h2" delay={0.2} className="t-h2 text-balance-tight">
            Refined projects with purpose
          </Reveal>

          <div className="pointer-events-none absolute -right-40 bottom-0 hidden flex-col items-start gap-1 xl:flex 2xl:-right-52">
            <Image
              src="/assets/arrow-curve.webp"
              alt=""
              width={40}
              height={34}
              className="h-8 w-auto -scale-x-100 opacity-55"
            />
            <ScriptText text="Where ideas take shape" className="whitespace-nowrap" />
          </div>
        </div>
      </div>

      <Reveal delay={0.3} className="mt-8 w-full">
        {/* Desktop: slideshow inside a framed rail with side and bottom navigation buttons */}
        <div className="container-x mx-auto hidden max-w-[1060px] lg:block">
          <div className="relative rounded-2xl border border-white bg-ivory p-5 sm:p-6">
            <Carousel
              label="Featured projects"
              interval={0}
              gap={20}
              showSideArrows={true}
              slides={featured.map((p, i) => (
                <ProjectCard key={p.slug} project={p} layout="split" priority={i === 0} />
              ))}
            />
          </div>
        </div>

        {/* Mobile / tablet: touch-scrollable cards without arrows */}
        <div className="container-x mx-auto max-w-[700px] lg:hidden">
          <div className="relative rounded-2xl border border-white bg-ivory p-3.5 sm:p-5">
            <div className="flex w-full gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar touch-pan-x py-1">
              {featured.map((p, i) => (
                <div key={p.slug} className="w-[88%] sm:w-[92%] shrink-0 snap-center">
                  <ProjectCard key={p.slug} project={p} layout="stacked" priority={i === 0} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
