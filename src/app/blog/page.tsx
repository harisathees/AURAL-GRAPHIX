import type { Metadata } from "next";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { BlogList } from "@/components/sections/BlogList";
import { Reveal } from "@/components/ui/Reveal";
import { posts } from "@/data/blog";
import { JsonLd, absoluteUrl, breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Our blogs — design, branding & development",
  description:
    "Ideas on brand storytelling, scalable design systems, adaptive UI and high-performance web builds from the Aural Graphix studio.",
  path: "/blog",
  keywords: ["design blog", "branding articles", "design systems", "web performance", "UI systems"],
});

export default function BlogIndexPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Aural Graphix Blog",
            url: absoluteUrl("/blog"),
            blogPost: posts.map((p) => ({
              "@type": "BlogPosting",
              headline: p.title,
              url: absoluteUrl(`/blog/${p.slug}`),
              datePublished: p.date,
              dateModified: p.updatedAt,
              image: absoluteUrl(p.thumbnail),
              author: { "@type": "Person", name: p.author.name },
            })),
          },
        ]}
      />

      <section className="w-full px-5 pt-[150px] pb-4 sm:pt-[180px] lg:pt-[200px]">
        <div className="container-x mx-auto max-w-[1060px]">
          <Reveal as="h1" delay={0.1} className="t-h1 mb-10 text-center text-balance-tight">
            Our Blogs
          </Reveal>
          <BlogList posts={posts} />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
