import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { RichText, richTextToPlain } from "@/components/ui/RichText";
import { legalPages } from "@/data/legal";
import { JsonLd, breadcrumbSchema, pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return legalPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const page = legalPages.find((p) => p.slug === slug);
  if (!page) return {};

  return {
    ...pageMetadata({
      title: page.title,
      description: richTextToPlain(page.content, 158) || `${page.title} for Aural Graphix.`,
      path: `/legal-pages/${page.slug}`,
    }),
    robots: { index: true, follow: true },
  };
}

export default async function LegalPage({ params }: Params) {
  const { slug } = await params;
  const page = legalPages.find((p) => p.slug === slug);
  if (!page) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: page.title, path: `/legal-pages/${page.slug}` },
        ])}
      />

      <article className="w-full px-5 pt-[140px] pb-8 sm:pt-[170px] lg:pt-[190px]">
        <div className="container-x mx-auto max-w-[700px]">
          <header className="flex flex-col gap-3">
            <Reveal as="h1" delay={0.1} className="t-h1 text-balance-tight">
              {page.title}
            </Reveal>
            <Reveal as="p" delay={0.2} className="t-sm">
              Last updated{" "}
              <time dateTime={page.updated}>
                {new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
                  new Date(`${page.updated}T00:00:00Z`),
                )}
              </time>
            </Reveal>
          </header>

          <Reveal delay={0.3} className="mt-10">
            <RichText blocks={page.content} />
          </Reveal>
        </div>
      </article>
    </>
  );
}
