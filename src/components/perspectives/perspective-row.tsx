import Link from "next/link";
import type { Perspective } from "@/content/perspectives";
import { Arrow } from "@/components/ui";
import { ArticleMeta } from "@/components/perspectives/article-meta";

export function PerspectiveRow({
  article,
  index,
}: {
  article: Perspective;
  index: number;
}) {
  return (
    <article className="perspective-row">
      <Link className="perspective-row__link" href={`/perspectivas/${article.slug}`}>
        <span className="perspective-row__index" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="perspective-row__body">
          <ArticleMeta article={article} />
          <span className="perspective-row__title">{article.title}</span>
          <span className="perspective-row__dek">{article.dek}</span>
        </span>
        <span className="perspective-row__arrow" aria-hidden="true">
          <Arrow />
        </span>
      </Link>
    </article>
  );
}
