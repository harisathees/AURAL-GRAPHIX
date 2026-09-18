import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { RichText, richTextToPlain } from "@/components/ui/RichText";
import { projects } from "@/data/projects";
import { JsonLd, absoluteUrl, breadcrumbSchema, pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  return pageMetadata({
    title: `${project.title} — ${project.scope}`,
    description: richTextToPlain([{ type: "paragraph", text: project.shortDescription }], 158),
    path: `/projects/${project.slug}`,
    image: project.thumbnail,
    type: "article",
    modifiedTime: project.updatedAt,
    keywords: [project.title, project.industry, project.scope, "brand identity", "case study"],
  });
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 2);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
            { name: project.title, path: `/projects/${project.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: project.title,
            headline: project.title,
            description: project.shortDescription,
            url: absoluteUrl(`/projects/${project.slug}`),
            image: absoluteUrl(project.thumbnail),
            dateModified: project.updatedAt,
            creator: { "@id": absoluteUrl("/#organization") },
            about: project.industry,
            review: {
              "@type": "Review",
              reviewBody: project.feedback.quote,
              author: { "@type": "Person", name: project.feedback.name },
              reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
            },
          },
        ]}
      />

      <article className="w-full px-5 pt-[140px] sm:pt-[170px] lg:pt-[190px]">
        {/* Header */}
        <header className="container-x mx-auto max-w-[700px] text-center">
          <Reveal as="h1" delay={0.1} className="t-h1 text-balance-tight">
            {project.title}
          </Reveal>
          <Reveal as="p" delay={0.2} className="t-body mx-auto mt-4 max-w-[62ch]">
            {project.shortDescription}
          </Reveal>
        </header>

        {/* Hero image */}
        <Reveal delay={0.3} className="container-x mx-auto mt-10 max-w-[1060px]">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-ivory sm:aspect-[16/10]">
            <Image
              src={project.thumbnail}
              alt={`${project.title} brand identity`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1060px"
              className="object-cover"
            />
          </div>
        </Reveal>

        {/* Meta bar */}
        <Reveal delay={0.35} className="container-x mx-auto mt-5 max-w-[1060px]">
          <dl className="grid gap-4 rounded-xl border border-white bg-white px-6 py-5 text-center sm:grid-cols-3">
            <MetaCell label="Services" value={project.scope} />
            <MetaCell label="Industry" value={project.industry} />
            <MetaCell label="Timeline" value={project.timeline} />
          </dl>
        </Reveal>

        {/* Body */}
        <div className="container-x mx-auto mt-14 max-w-[700px]">
          <Reveal delay={0.1}>
            <RichText blocks={project.overview} />
          </Reveal>

          {project.gallery.length > 0 && (
            <Reveal delay={0.15} className="my-10 flex flex-col gap-4">
              {project.gallery.map((src, i) => (
                <div key={src} className="relative overflow-hidden rounded-xl bg-ivory p-4">
                  <Image
                    src={src}
                    alt={`${project.title} — visual ${i + 1}`}
                    width={1400}
                    height={900}
                    sizes="(max-width: 768px) 92vw, 700px"
                    className="h-auto w-full rounded-lg object-cover"
                  />
                </div>
              ))}
            </Reveal>
          )}

          <Reveal delay={0.1}>
            <RichText blocks={project.result} />
          </Reveal>

          {project.liveSite && (
            <Reveal delay={0.15} className="mt-8">
              <Button href={project.liveSite} variant="brand" newTab>
                Visit live site
              </Button>
            </Reveal>
          )}

          {/* Client feedback */}
          <Reveal delay={0.2} className="mt-12">
            <figure className="rounded-2xl border border-white bg-white p-6 lg:p-8">
              <blockquote className="t-medium text-midnight">{project.feedback.quote}</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-dashed border-midnight-10 pt-5">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-mist text-[13px] font-semibold text-midnight">
                  {project.feedback.name.charAt(0)}
                </span>
                <span className="text-[15px] font-medium">{project.feedback.name}</span>
                <span className="t-sm">—</span>
                <span className="t-sm">{project.feedback.role}</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </article>

      {/* Other projects */}
      <section className="section">
        <div className="container-x mx-auto max-w-[1060px]">
          <Reveal as="h2" delay={0.1} className="t-h2 mb-8 text-center">
            Other Projects
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {others.map((p, i) => (
              <Reveal key={p.slug} delay={0.15 + i * 0.07}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Link href="/projects" className="t-sm underline underline-offset-4 transition-colors hover:text-brand">
              View all projects
            </Link>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}

function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <dt className="t-pretitle">{label}:</dt>
      <dd className="text-[15px] font-medium text-midnight">{value}</dd>
    </div>
  );
}
