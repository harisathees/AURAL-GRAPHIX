import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { BlogCard, formatDate } from "@/components/ui/BlogCard";
import { Reveal } from "@/components/ui/Reveal";
import { RichText, richTextToPlain } from "@/components/ui/RichText";
import { posts } from "@/data/blog";
import { JsonLd, absoluteUrl, breadcrumbSchema, pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};

  return pageMetadata({
    title: post.title,
    description: richTextToPlain(post.content, 158),
    path: `/blog/${post.slug}`,
    image: post.thumbnail,
    type: "article",
    publishedTime: new Date(`${post.date}T00:00:00Z`).toISOString(),
    modifiedTime: post.updatedAt,
    authors: [post.author.name],
    keywords: [post.category, "design", "branding", post.title],
  });
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: richTextToPlain(post.content, 200),
            url: absoluteUrl(`/blog/${post.slug}`),
            image: absoluteUrl(post.thumbnail),
            datePublished: new Date(`${post.date}T00:00:00Z`).toISOString(),
            dateModified: post.updatedAt,
            articleSection: post.category,
            author: { "@type": "Person", name: post.author.name },
            publisher: { "@id": absoluteUrl("/#organization") },
            mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(`/blog/${post.slug}`) },
          },
        ]}
      />

      <article className="w-full px-5 pt-[140px] sm:pt-[170px] lg:pt-[190px]">
        <header className="container-x mx-auto max-w-[700px] text-center">
          <Reveal as="h1" delay={0.1} className="t-h1 text-balance-tight">
            {post.title}
          </Reveal>
          <Reveal delay={0.2} className="mt-4 flex items-center justify-center gap-3">
            <span className="t-pretitle rounded-md border border-midnight-10 bg-white px-3 py-1.5">
              {post.category}
            </span>
            <time className="t-sm" dateTime={post.date}>
              {formatDate(post.date)}
            </time>
          </Reveal>
        </header>

        <Reveal delay={0.3} className="container-x mx-auto mt-10 max-w-[1060px]">
          <div className="shell">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-ivory">
              <Image
                src={post.thumbnail}
                alt=""
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1020px"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>

        <div className="container-x mx-auto mt-14 max-w-[700px]">
          <Reveal delay={0.1}>
            <RichText blocks={post.content} />
          </Reveal>

          <Reveal delay={0.15} className="mt-12">
            <div className="flex items-center gap-3 rounded-xl border border-white bg-white p-4">
              <span className="relative size-10 overflow-hidden rounded-full bg-mist">
                <Image src={post.author.avatar} alt="" fill sizes="40px" className="object-cover" />
              </span>
              <div className="flex flex-col">
                <span className="text-[15px] font-medium">{post.author.name}</span>
                <span className="t-sm">Author</span>
              </div>
            </div>
          </Reveal>
        </div>
      </article>

      <section className="section">
        <div className="container-x mx-auto max-w-[1060px]">
          <Reveal as="h2" delay={0.1} className="t-h2 mb-8 text-center">
            Other Blogs
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {others.map((p, i) => (
              <Reveal key={p.slug} delay={0.15 + i * 0.07}>
                <BlogCard post={p} layout="split" />
              </Reveal>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Link href="/blog" className="t-sm underline underline-offset-4 transition-colors hover:text-brand">
              Read all articles
            </Link>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
