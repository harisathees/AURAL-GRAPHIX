import type { RichBlock } from "@/lib/types";

/** Renders the structured rich-text blocks with semantic markup. */
export function RichText({ blocks, className = "" }: { blocks: readonly RichBlock[]; className?: string }) {
  return (
    <div className={`prose-aural ${className}`}>
      {blocks.map((block, i) => {
        if (block.type === "heading") {
          // Content authored in the CMS; only <strong>/<em> survive sanitising.
          return <h2 key={i} dangerouslySetInnerHTML={{ __html: block.text }} />;
        }
        if (block.type === "paragraph") {
          return <p key={i} dangerouslySetInnerHTML={{ __html: block.text }} />;
        }
        return (
          <ul key={i}>
            {block.items.map((item, k) => (
              <li key={k} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>
        );
      })}
    </div>
  );
}

/** Plain-text projection of rich blocks — used for meta descriptions. */
export function richTextToPlain(blocks: readonly RichBlock[], limit = 160) {
  const text = blocks
    .flatMap((b) => (b.type === "list" ? b.items : [b.text]))
    .join(" ")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > limit ? `${text.slice(0, limit - 1).trimEnd()}…` : text;
}
