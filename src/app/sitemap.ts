import type { MetadataRoute } from "next";
import { posts } from "@/data/blog";
import { legalPages } from "@/data/legal";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (path: string) => new URL(path, site.url).toString();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: url("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: url("/about-us"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: url("/projects"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: url("/blog"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: url("/contact-us"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  return [
    ...staticRoutes,
    ...projects.map((p) => ({
      url: url(`/projects/${p.slug}`),
      lastModified: new Date(p.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...posts.map((p) => ({
      url: url(`/blog/${p.slug}`),
      lastModified: new Date(p.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...legalPages.map((p) => ({
      url: url(`/legal-pages/${p.slug}`),
      lastModified: new Date(`${p.updated}T00:00:00Z`),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
