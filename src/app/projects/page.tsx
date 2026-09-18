import type { Metadata } from "next";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { projects } from "@/data/projects";
import { JsonLd, absoluteUrl, breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Project showcase — branding & identity work",
  description:
    "Explore brand identity, packaging and digital work by Aural Graphix — Pawbiotics, Aqua Mak, Chill Cafe and Kabitas Kitchen.",
  path: "/projects",
  keywords: ["design portfolio", "branding case studies", "logo design projects", "packaging design India"],
});

export default function ProjectsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Project Showcase",
            url: absoluteUrl("/projects"),
            hasPart: projects.map((p) => ({
              "@type": "CreativeWork",
              name: p.title,
              url: absoluteUrl(`/projects/${p.slug}`),
              description: p.shortDescription,
              image: absoluteUrl(p.thumbnail),
            })),
          },
        ]}
      />

      <section className="w-full px-5 pt-[150px] pb-4 sm:pt-[180px] lg:pt-[200px]">
        <div className="container-x mx-auto max-w-[1060px]">
          <Reveal as="h1" delay={0.1} className="t-h1 mb-10 text-center text-balance-tight">
            Project Showcase
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {projects.map((project, i) => (
              <Reveal key={project.slug} delay={0.15 + i * 0.07}>
                <ProjectCard project={project} priority={i < 2} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
