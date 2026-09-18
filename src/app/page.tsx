import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Gallery } from "@/components/sections/Gallery";
import { Compare } from "@/components/sections/Compare";
import { AboutBento } from "@/components/sections/AboutBento";
import { Services } from "@/components/sections/Services";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { Faq } from "@/components/sections/Faq";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { faqs } from "@/data/content";
import { site } from "@/data/site";
import { JsonLd, faqSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <Hero />
      <Gallery />
      <Compare />
      <AboutBento />
      <Services />
      <FeaturedProjects />
      <Process />
      <Testimonials />
      <BlogPreview />
      <Faq />
      <CtaBanner />
    </>
  );
}
