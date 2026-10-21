import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactCta } from "@/components/contact-cta";
import { PageMasthead } from "@/components/page-masthead";
import {
  ArticleMeta,
  perspectiveReadingMinutes,
} from "@/components/perspectives/article-meta";
import { Arrow, SectionLabel } from "@/components/ui";
import {
  categoryLabel,
  getPerspective,
  perspectives,
  perspectivesByCategory,
  type Perspective,
  type PerspectiveBlock,
} from "@/content/perspectives";
import { formatDate } from "@/lib/utils";
import { pageMetadata } from "@/lib/metadata";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return perspectives.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getPerspective(slug);

  if (!article) {
    return {
      title: "Publicación no encontrada",
      description: "La publicación solicitada no existe.",
    };
  }

  return pageMetadata({
    title: article.title,
    description: article.seoDescription,
    path: `/perspectivas/${article.slug}`,
    type: "article",
  });
}

function headingId(index: number): string {
  return `seccion-${index}`;
}

function ArticleBlock({ block, index }: { block: PerspectiveBlock; index: number }) {
  switch (block.type) {
    case "paragraph":
      return <p>{block.text}</p>;
    case "heading":
      return <h2 id={headingId(index)}>{block.text}</h2>;
    case "quote":
      return (
        <blockquote className="prose__quote">
          <p>{block.text}</p>
          {block.attribution ? <cite>{block.attribution}</cite> : null}
        </blockquote>
      );
    case "list":
      return (
        <ul className="prose__list">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "note":
      return (
        <aside className="prose__note">
          <span className="prose__note-label">Nota editorial</span>
          <p>{block.text}</p>
        </aside>
      );
    default:
      return null;
  }
}

function RelatedArticle({ article }: { article: Perspective }) {
  return (
    <Link className="related-article" href={`/perspectivas/${article.slug}`}>
      <ArticleMeta article={article} />
      <span className="related-article__title">{article.title}</span>
      <span className="related-article__dek">{article.dek}</span>
      <span className="related-article__read">
        Leer <Arrow />
      </span>
    </Link>
  );
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getPerspective(slug);

  if (!article) notFound();

  const headings = article.body.flatMap((block, index) =>
    block.type === "heading" ? [{ id: headingId(index), text: block.text }] : [],
  );

  const sameCategory = perspectivesByCategory(article.category).filter(
    (item) => item.slug !== article.slug,
  );
  const related = [
    ...sameCategory,
    ...perspectives.filter(
      (item) => item.slug !== article.slug && item.category !== article.category,
    ),
  ].slice(0, 2);

  return (
    <>
      <PageMasthead
        className="masthead--article"
        index="P"
        label={categoryLabel(article.category)}
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Perspectivas", href: "/perspectivas" },
          { label: categoryLabel(article.category), href: `/perspectivas/categoria/${article.category}` },
          { label: "Ensayo" },
        ]}
        title={article.title}
        lead={article.dek}
        aside={
          <div className="article-header-meta">
            <ArticleMeta article={article} />
            <p className="article-header-meta__author">
              Por {article.author}
              <span>{article.authorRole}</span>
            </p>
            <p className="article-header-meta__date">Publicado el {formatDate(article.date)}</p>
          </div>
        }
      />

      <div className="article-page section">
        <div className="container article-layout">
          <aside className="article-aside">
            <div className="article-aside__block">
              <p className="article-aside__label">En este ensayo</p>
              <nav className="article-toc" aria-label="Contenido del artículo">
                <ol>
                  {headings.map((heading, index) => (
                    <li key={heading.id}>
                      <a href={`#${heading.id}`}>
                        <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                        {heading.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>

            <div className="article-aside__block">
              <p className="article-aside__label">Ficha</p>
              <dl className="article-aside__meta">
                <div>
                  <dt>Categoría</dt>
                  <dd>
                    <Link href={`/perspectivas/categoria/${article.category}`}>
                      {categoryLabel(article.category)}
                    </Link>
                  </dd>
                </div>
                <div>
                  <dt>Lectura</dt>
                  <dd>{perspectiveReadingMinutes(article)} minutos</dd>
                </div>
                <div>
                  <dt>Autoría</dt>
                  <dd>Consejo editorial ficticio</dd>
                </div>
              </dl>
            </div>

            <p className="article-aside__demo">
              Texto editorial de demostración. No constituye asesoramiento jurídico.
            </p>
          </aside>

          <article className="article" aria-labelledby="page-title">
            <div className="article__rule" aria-hidden="true">
              <span />
              <span>Ensayo / {categoryLabel(article.category)}</span>
            </div>

            <div className="prose">
              {article.body.map((block, index) => (
                <ArticleBlock block={block} index={index} key={`${block.type}-${index}`} />
              ))}
            </div>

            <footer className="article__footer">
              <div className="article__author">
                <span className="article__author-mark" aria-hidden="true">
                  V
                </span>
                <div>
                  <p className="article__author-name">{article.author}</p>
                  <p>{article.authorRole}. Perfil ficticio creado para esta demostración.</p>
                </div>
              </div>

              <div className="article__actions">
                <Link href={`/perspectivas/categoria/${article.category}`} className="text-link">
                  Más en {categoryLabel(article.category)}
                </Link>
                <Link href="/perspectivas" className="text-link">
                  Volver al archivo
                </Link>
              </div>
            </footer>
          </article>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="related section section--stone" aria-labelledby="related-title">
          <div className="container">
            <SectionLabel index="02">Seguir leyendo</SectionLabel>
            <h2 className="related__title" id="related-title">
              Otras formas de mirar <em>la misma decisión.</em>
            </h2>
            <div className="related__grid">
              {related.map((item) => (
                <RelatedArticle key={item.slug} article={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <ContactCta index="03" />
    </>
  );
}
