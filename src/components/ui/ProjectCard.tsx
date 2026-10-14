"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "./Button";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
  layout?: "split" | "stacked";
  priority?: boolean;
}

export function ProjectCard({ project, layout = "stacked", priority = false }: ProjectCardProps) {
  const images = Array.from(new Set([project.thumbnail, ...(project.gallery || [])]));
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((i) => (i - 1 + images.length) % images.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((i) => (i + 1) % images.length);
  };

  const currentImage = images[currentIndex] || project.thumbnail;
  const hasMultiple = images.length > 1;

  if (layout === "split") {
    return (
      <article className="card grid h-full gap-6 p-5 lg:grid-cols-2 lg:gap-8 lg:p-6">
        <div className="flex flex-col justify-between gap-6 lg:order-1">
          <div className="flex flex-col gap-4">
            <h3 className="t-h4">{project.title}</h3>
            <dl className="flex flex-col gap-1.5">
              <Meta label="Industry" value={project.industry} />
              <Meta label="Scope" value={project.scope} />
            </dl>
          </div>

          <div className="flex flex-col gap-4">
            <span className="h-px w-full border-t border-dashed border-midnight-18" aria-hidden />
            <p className="t-body">{project.shortDescription}</p>
            <Button href={`/projects/${project.slug}`} variant="brand" size="sm" className="w-fit">
              View project detail
            </Button>
          </div>
        </div>

        <div className="group/image relative aspect-[4/3] overflow-hidden rounded-lg bg-mist lg:order-2 lg:aspect-auto lg:min-h-[420px]">
          <Image
            key={currentImage}
            src={currentImage}
            alt={`${project.title} brand identity visual ${currentIndex + 1}`}
            fill
            sizes="(max-width: 1024px) 90vw, 420px"
            priority={priority && currentIndex === 0}
            className="object-cover transition-opacity duration-300"
          />

          {hasMultiple && (
            <>
              {/* Left navigation button */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label={`Previous image for ${project.title}`}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 grid size-9 place-items-center rounded-full bg-white/90 text-midnight shadow-md backdrop-blur-md opacity-0 group-hover/image:opacity-100 max-sm:opacity-90 hover:scale-110 hover:bg-white active:scale-95 transition-all duration-200 cursor-pointer focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-brand"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="stroke-current">
                  <path d="M15 18l-6-6 6-6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Right navigation button */}
              <button
                type="button"
                onClick={handleNext}
                aria-label={`Next image for ${project.title}`}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 grid size-9 place-items-center rounded-full bg-white/90 text-midnight shadow-md backdrop-blur-md opacity-0 group-hover/image:opacity-100 max-sm:opacity-90 hover:scale-110 hover:bg-white active:scale-95 transition-all duration-200 cursor-pointer focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-brand"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="stroke-current">
                  <path d="M9 18l6-6-6-6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Image dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 rounded-full bg-midnight/50 px-2.5 py-1 backdrop-blur-sm pointer-events-none">
                {images.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === currentIndex ? "w-4 bg-white" : "w-1.5 bg-white/50"
                    }`}
                  />
                ))}
              </div>

              {/* Counter badge */}
              <div className="absolute top-3 right-3 z-10 rounded-full bg-midnight/60 px-2.5 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm pointer-events-none">
                {currentIndex + 1} / {images.length}
              </div>
            </>
          )}
        </div>
      </article>
    );
  }

  return (
    <article className="card group flex h-full flex-col gap-4 p-4 transition-shadow duration-500 hover:shadow-[0_20px_44px_-30px_rgb(6_6_18/0.4)]">
      <div className="group/image relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-mist">
        <Image
          key={currentImage}
          src={currentImage}
          alt={`${project.title} brand identity visual ${currentIndex + 1}`}
          fill
          sizes="(max-width: 768px) 90vw, 480px"
          priority={priority && currentIndex === 0}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />

        {hasMultiple && (
          <>
            {/* Left navigation button */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label={`Previous image for ${project.title}`}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10 grid size-8 sm:size-9 place-items-center rounded-full bg-white/90 text-midnight shadow-md backdrop-blur-md opacity-0 group-hover:opacity-100 max-sm:opacity-90 hover:scale-110 hover:bg-white active:scale-95 transition-all duration-200 cursor-pointer focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-brand"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="stroke-current">
                <path d="M15 18l-6-6 6-6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Right navigation button */}
            <button
              type="button"
              onClick={handleNext}
              aria-label={`Next image for ${project.title}`}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 z-10 grid size-8 sm:size-9 place-items-center rounded-full bg-white/90 text-midnight shadow-md backdrop-blur-md opacity-0 group-hover:opacity-100 max-sm:opacity-90 hover:scale-110 hover:bg-white active:scale-95 transition-all duration-200 cursor-pointer focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-brand"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="stroke-current">
                <path d="M9 18l6-6-6-6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Image dots */}
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1 rounded-full bg-midnight/50 px-2 py-1 backdrop-blur-sm pointer-events-none">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentIndex ? "w-3.5 bg-white" : "w-1.5 bg-white/50"
                  }`}
                />
              ))}
            </div>

            {/* Counter badge */}
            <div className="absolute top-2.5 right-2.5 z-10 rounded-full bg-midnight/60 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm pointer-events-none">
              {currentIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3">
        <h3 className="t-h5">{project.title}</h3>
        <dl className="flex flex-col gap-1">
          <Meta label="Industry" value={project.industry} />
          <Meta label="Scope" value={project.scope} />
        </dl>
      </div>

      <Button href={`/projects/${project.slug}`} variant="brand" size="sm" className="w-fit">
        View project detail
      </Button>
    </article>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap items-baseline gap-2">
      <dt className="t-sm">{label}:</dt>
      <dd className="text-[14px] font-medium text-midnight">{value}</dd>
    </div>
  );
}
