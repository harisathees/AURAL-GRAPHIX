"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { BlogCard } from "@/components/ui/BlogCard";
import { Reveal } from "@/components/ui/Reveal";
import type { BlogPost } from "@/lib/types";

const PAGE = 5;

export function BlogList({ posts }: { posts: readonly BlogPost[] }) {
  const [shown, setShown] = useState(PAGE);
  const visible = posts.slice(0, shown);
  const [feature, ...rest] = visible;
  const hasMore = shown < posts.length;

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="grid w-full gap-5 lg:grid-cols-3">
        <Reveal delay={0.15} className="lg:col-span-2">
          <BlogCard post={feature} layout="split" priority />
        </Reveal>

        {rest.map((post, i) => (
          <Reveal key={post.slug} delay={0.2 + i * 0.06}>
            <BlogCard post={post} />
          </Reveal>
        ))}
      </div>

      {hasMore && (
        <Button variant="dark" onClick={() => setShown((s) => s + PAGE)}>
          Load More
        </Button>
      )}
    </div>
  );
}
