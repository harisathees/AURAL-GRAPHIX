"use client";

import Image from "next/image";
import { Button } from "./Button";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
  layout?: "split" | "stacked";
  priority?: boolean;
}

export function ProjectCard({ project, layout = "stacked", priority = false }: ProjectCardProps) {
  const currentImage = project.thumbnail;

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
            src={currentImage}
            alt={`${project.title} brand identity visual`}
            fill
            sizes="(max-width: 1024px) 90vw, 420px"
            priority={priority}
            className="object-cover transition-opacity duration-300"
          />
        </div>
      </article>
    );
  }

  return (
    <article className="card group flex h-full flex-col gap-4 p-4 transition-shadow duration-500 hover:shadow-[0_20px_44px_-30px_rgb(6_6_18/0.4)]">
      <div className="group/image relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-mist">
        <Image
          src={currentImage}
          alt={`${project.title} brand identity visual`}
          fill
          sizes="(max-width: 768px) 90vw, 480px"
          priority={priority}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
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
