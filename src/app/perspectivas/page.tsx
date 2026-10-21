import type { Metadata } from "next";
import Link from "next/link";
import { ContactCta } from "@/components/contact-cta";
import { PageMasthead } from "@/components/page-masthead";
import {
  ArticleMeta,
  perspectiveReadingMinutes,
} from "@/components/perspectives/article-meta";
import { PerspectiveRow } from "@/components/perspectives/perspective-row";
import { Arrow, SectionLabel } from "@/components/ui";
import { categories, perspectives, perspectivesByCategory } from "@/content/perspectives";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Perspectivas",
  description:
    "Ensayos editoriales de demostración sobre estrategia jurídica, contratos, litigios, patrimonio y gobierno corporativo.",
  path: "/perspectivas",
});

export default function PerspectivesPage() {
  const lead = perspectives.find((article) => article.featured) ?? perspectives[0];
  const rest = perspectives.filter((article) => article.slug !== lead?.slug);
  const totalMinutes = perspectives.reduce(
    (total, article) => total + perspectiveReadingMinutes(article),
    0,
  );

  return (
    <>
      <PageMasthead
        index="01"
        label="Perspectivas"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Perspectivas" },
        ]}
        title={
          <>
            Pensar antes <em>de actuar.</em>
          </>
        }
        lead="Notas editoriales sobre las decisiones que preceden a un contrato, una operación o un procedimiento. Sin titulares de urgencia y sin recetas."
        aside={
          <div className="masthead__stats">
            <div>
              <span>{String(perspectives.length).padStart(2, "0")}</span>
              <p>Ensayos publicados</p>
            </div>
            <div>
              <span>{String(categories.length).padStart(2, "0")}</span>
              <p>Líneas editoriales</p>
            </div>
            <div>
              <span>{totalMinutes}</span>
              <p>Minutos de lectura</p>
            </div>
          </div>
        }
      />

      <section className="perspectives-index section" aria-labelledby="perspectives-index-title">
        <div className="container">
          <div className="perspectives-index__toolbar">
            <SectionLabel index="02">Archivo editorial</SectionLabel>
            <nav className="category-nav" aria-label="Categorías de perspectivas">
              <Link href="/perspectivas" className="category-nav__link is-active" aria-current="page">
                <span>Todas</span>
                <span className="category-nav__count">{String(perspectives.length).padStart(2, "0")}</span>
              </Link>
              {categories.map((category) => {
                const count = perspectivesByCategory(category.slug).length;
                return (
                  <Link
                    key={category.slug}
                    href={`/perspectivas/categoria/${category.slug}`}
                    className="category-nav__link"
                  >
                    <span>{category.label}</span>
                    <span className="category-nav__count">{String(count).padStart(2, "0")}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {lead ? (
            <article className="editorial-lead">
              <Link href={`/perspectivas/${lead.slug}`} className="editorial-lead__link">
                <div className="editorial-lead__aside">
                  <span className="editorial-lead__label">Lectura destacada</span>
                  <ArticleMeta article={lead} />
                  <span className="editorial-lead__author">Por {lead.author}</span>
                </div>

                <div className="editorial-lead__main">
                  <h2 className="editorial-lead__title" id="perspectives-index-title">
                    {lead.title}
                  </h2>
                  <p className="editorial-lead__dek">{lead.dek}</p>
                  <span className="editorial-lead__read">
                    Leer el ensayo <Arrow />
                  </span>
                </div>

                <span className="editorial-lead__mark" aria-hidden="true">
                  “
                </span>
              </Link>
            </article>
          ) : null}

          <div className="perspectives-list">
            {rest.map((article, index) => (
              <PerspectiveRow key={article.slug} article={article} index={index} />
            ))}
          </div>

          <div className="perspectives-index__foot">
            <p className="editorial-note">
              Publicaciones editoriales de demostración. No son noticias, no describen legislación
              vigente y no constituyen asesoramiento jurídico. Los autores son ficticios.
            </p>
            <Link href="#contenido" className="text-link perspectives-index__top">
              Volver al inicio de la página
            </Link>
          </div>
        </div>
      </section>

      <ContactCta
        index="03"
        title="Una idea no sustituye una conversación."
        text="Si una de estas notas conecta con una decisión abierta, podemos ayudarle a llevarla al terreno concreto del caso."
        showGuided
      />
    </>
  );
}
