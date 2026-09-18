import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/types";

const fmt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" });

export function formatDate(date: string) {
  return fmt.format(new Date(`${date}T00:00:00Z`));
}

interface BlogCardProps {
  post: BlogPost;
  layout?: "split" | "compact";
  priority?: boolean;
}

export function BlogCard({ post, layout = "compact", priority = false }: BlogCardProps) {
  if (layout === "split") {
    return (
      <article className="card group h-full overflow-hidden">
        <Link href={`/blog/${post.slug}`} className="grid h-full gap-5 p-5 sm:grid-cols-2">
          <div className="flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-3">
              <p className="t-pretitle">{post.category}</p>
              <h3 className="t-h5 text-balance-tight transition-colors group-hover:text-brand">{post.title}</h3>
              <time className="t-sm" dateTime={post.date}>
                {formatDate(post.date)}
              </time>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="relative size-8 overflow-hidden rounded-full bg-mist">
                <Image src={post.author.avatar} alt="" fill sizes="32px" className="object-cover" />
              </span>
              <span className="text-[14px] font-medium">{post.author.name}</span>
            </div>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-mist">
            <Image
              src={post.thumbnail}
              alt=""
              fill
              sizes="(max-width: 640px) 90vw, 300px"
              priority={priority}
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="card group h-full overflow-hidden">
      <Link href={`/blog/${post.slug}`} className="flex h-full flex-col justify-between gap-5 p-5">
        <div className="flex flex-col gap-3">
          <p className="t-pretitle">{post.category}</p>
          <h3 className="t-h6 text-balance-tight transition-colors group-hover:text-brand">{post.title}</h3>
        </div>

        <div className="flex items-end justify-between gap-4">
          <time className="t-sm" dateTime={post.date}>
            {formatDate(post.date)}
          </time>
          <div className="relative aspect-[4/3] w-[100px] shrink-0 overflow-hidden rounded-md bg-mist">
            <Image
              src={post.thumbnail}
              alt=""
              fill
              sizes="100px"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
            />
          </div>
        </div>
      </Link>
    </article>
  );
}
