import Link from "next/link";
import { perspectives } from "@/content/perspectives";
import { Arrow, SectionLabel } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { ArticleMeta, perspectiveReadingMinutes } from "@/components/perspectives/article-meta";

export function PerspectivesPreview() {
  const featured = perspectives.filter((article) => article.featured).slice(0, 3);
  const [lead, ...rest] = featured;

  if (!lead) return null;

  return (
    <section className="perspectives-preview section" id="perspectivas" aria-labelledby="perspectives-title">
      <div className="container">
        <SectionLabel index="05">Perspectivas</SectionLabel>

        <div className="perspectives-preview__head">
          <h2 className="perspectives-preview__title" id="perspectives-title">
            Pensar antes <em>de actuar.</em>
          </h2>
          <div className="perspectives-preview__aside">
            <p>
              Notas editoriales sobre estrategia, contratos, conflictos y continuidad. Sin
              titulares de urgencia. Sin recetas.
            </p>
            <Link href="/perspectivas" className="text-link">
              Todas las publicaciones
            </Link>
          </div>
        </div>

        <Reveal>
          <article className="lead-article">
            <Link href={`/perspectivas/${lead.slug}`} className="lead-article__link">
              <div className="lead-article__meta">
                <ArticleMeta article={lead} />
                <span className="lead-article__author">
                  Por {lead.author} <span className="demo-inline">· perfil ficticio</span>
                </span>
              </div>
              <div className="lead-article__grid">
                <h3 className="lead-article__title">{lead.title}</h3>
                <div className="lead-article__copy">
                  <p>{lead.dek}</p>
                  <span className="lead-article__read">
                    Leer el artículo <span className="sr-only">({perspectiveReadingMinutes(lead)} minutos)</span>
                    <Arrow />
                  </span>
                </div>
              </div>
            </Link>
          </article>
        </Reveal>

        {rest.length > 0 ? (
          <div className="secondary-articles">
            {rest.map((article) => (
              <Reveal key={article.slug}>
                <article className="secondary-article">
                  <Link href={`/perspectivas/${article.slug}`} className="secondary-article__link">
                    <ArticleMeta article={article} />
                    <div className="secondary-article__body">
                      <h3>{article.title}</h3>
                      <p>{article.dek}</p>
                    </div>
                    <span className="secondary-article__arrow" aria-hidden="true">
                      <Arrow />
                    </span>
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        ) : null}

        <p className="editorial-note">
          Textos editoriales de demostración. No son noticias, no describen legislación vigente y
          no constituyen asesoramiento jurídico.
        </p>
      </div>
    </section>
  );
}
