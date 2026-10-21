import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactCta } from "@/components/contact-cta";
import { PageMasthead } from "@/components/page-masthead";
import { PerspectiveRow } from "@/components/perspectives/perspective-row";
import { SectionLabel } from "@/components/ui";
import {
  categories,
  getCategory,
  perspectivesByCategory,
} from "@/content/perspectives";
import { pageMetadata } from "@/lib/metadata";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);

  if (!category) {
    return {
      title: "Categoría no encontrada",
      description: "La categoría editorial solicitada no existe.",
    };
  }

  return pageMetadata({
    title: category.label,
    description: category.description,
    path: `/perspectivas/categoria/${category.slug}`,
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategory(slug);

  if (!category) notFound();

  const articles = perspectivesByCategory(category.slug);
  const count = String(articles.length).padStart(2, "0");

  return (
    <>
      <PageMasthead
        index="P"
        label="Perspectivas / Categoría"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Perspectivas", href: "/perspectivas" },
          { label: category.label },
        ]}
        title={category.label}
        lead={category.description}
        aside={
          <div className="masthead__stats masthead__stats--compact">
            <div>
              <span>{count}</span>
              <p>{articles.length === 1 ? "Publicación" : "Publicaciones"}</p>
            </div>
            <div>
              <span>{category.slug === "observatorio" ? "—" : "Activa"}</span>
              <p>Estado editorial</p>
            </div>
          </div>
        }
      />

      <section className="category-index section" aria-labelledby="category-index-title">
        <div className="container">
          <div className="category-index__head">
            <SectionLabel index="02">Archivo</SectionLabel>
            <Link href="/perspectivas" className="text-link">
              Volver a todas las perspectivas
            </Link>
          </div>

          {articles.length > 0 ? (
            <>
              <h2 className="sr-only" id="category-index-title">
                Publicaciones de {category.label}
              </h2>
              <div className="perspectives-list perspectives-list--category">
                {articles.map((article, index) => (
                  <PerspectiveRow key={article.slug} article={article} index={index} />
                ))}
              </div>
            </>
          ) : (
            <div className="empty-state" id="category-index-title">
              <div className="empty-state__geometry" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
                <span className="empty-state__vertex" />
              </div>
              <p className="empty-state__label">Categoría en preparación</p>
              <h2 className="empty-state__title">
                Todavía no hay publicaciones en <em>{category.label}.</em>
              </h2>
              <p className="empty-state__text">
                Esta línea editorial se ha dejado deliberadamente vacía para mostrar cómo se
                comporta el archivo cuando una categoría aún no tiene contenido. No se ha inventado
                una entrada para rellenar el espacio.
              </p>
              <div className="empty-state__actions">
                <Link href="/perspectivas" className="button button--outline">
                  <span className="button__label">Explorar todas las publicaciones</span>
                  <span className="button__arrow" aria-hidden="true">
                    ↗
                  </span>
                </Link>
                <Link href="/perspectivas/categoria/estrategia" className="text-link">
                  Ver la categoría Estrategia
                </Link>
              </div>
            </div>
          )}

          <p className="editorial-note">
            Textos de demostración. No son noticias ni describen legislación vigente. La categoría
            Observatorio no contiene publicaciones reales.
          </p>
        </div>
      </section>

      <ContactCta index="03" showGuided />
    </>
  );
}
