import Link from "next/link";
import type { Perspective } from "@/content/perspectives";
import { categoryLabel } from "@/content/perspectives";
import { formatShortDate, readingMinutes } from "@/lib/utils";
import { Arrow } from "@/components/ui";

export function perspectiveReadingMinutes(article: Perspective): number {
  const text = article.body
    .map((block) => {
      if (block.type === "list") return block.items.join(" ");
      if ("text" in block) return block.text;
      return "";
    })
    .join(" ");
  return readingMinutes(text);
}

export function ArticleMeta({ article }: { article: Perspective }) {
  return (
    <div className="article-meta">
      <span className="article-meta__category">{categoryLabel(article.category)}</span>
      <span aria-hidden="true">/</span>
      <time dateTime={article.date}>{formatShortDate(article.date)}</time>
      <span aria-hidden="true">/</span>
      <span>{perspectiveReadingMinutes(article)} min de lectura</span>
    </div>
  );
}

export function ArticleLink({ article, showArrow = true }: { article: Perspective; showArrow?: boolean }) {
  return (
    <Link href={`/perspectivas/${article.slug}`} className="article-link">
      <span>{article.title}</span>
      {showArrow ? <Arrow /> : null}
    </Link>
  );
}
