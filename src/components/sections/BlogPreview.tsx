import { BlogCard } from "@/components/ui/BlogCard";
import { Reveal } from "@/components/ui/Reveal";
import { posts } from "@/data/blog";

export function BlogPreview() {
  const [feature, ...rest] = posts.slice(0, 3);

  return (
    <section id="blog" className="section">
      <div className="container-x mx-auto max-w-[1060px]">
        <div className="flex flex-col items-center gap-8">
          <Reveal as="h2" delay={0.1} className="t-h2 text-center text-balance-tight">
            Latest blog
          </Reveal>

          <Reveal delay={0.2} className="shell grid w-full gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
            <BlogCard post={feature} layout="split" />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              {rest.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
