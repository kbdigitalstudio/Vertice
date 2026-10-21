import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, MetaList, PageMasthead } from "@/components/page-masthead";
import { getLegalPage, legalPages } from "@/content/legal";
import { site } from "@/content/site";
import { formatDate } from "@/lib/utils";
import { pageMetadata } from "@/lib/metadata";

type LegalPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return legalPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: LegalPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getLegalPage(slug);

  if (!page) {
    return {
      title: "Documento no encontrado",
      description: "El documento legal solicitado no existe.",
    };
  }

  return pageMetadata({
    title: page.title,
    description: page.description,
    path: `/legal/${page.slug}`,
  });
}

export default async function LegalDocumentPage({ params }: LegalPageProps) {
  const { slug } = await params;
  const page = getLegalPage(slug);

  if (!page) notFound();

  return (
    <>
      <PageMasthead
        index="L"
        label="Información legal"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: page.eyebrow },
        ]}
        title={page.title}
        lead={page.intro}
        aside={
          <MetaList
            items={[
              { label: "Versión", value: "Demostración" },
              { label: "Actualizado", value: formatDate(page.updated) },
              { label: "Titular", value: `${site.legalName} (ficticio)` },
              { label: "Jurisdicción", value: "España / por validar" },
            ]}
          />
        }
      />

      <div className="legal-page section">
        <div className="container legal-layout">
          <aside className="legal-aside">
            <p className="legal-aside__label">Contenido</p>
            <nav className="legal-toc" aria-label="Secciones de este documento">
              <ol>
                {page.sections.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`}>{section.title}</a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="legal-aside__notice">
              <p>Documento provisional</p>
              <p>
                Este texto es una plantilla de demostración. Debe revisarse y adaptarse antes de
                cualquier publicación.
              </p>
            </div>

            <Link href="/contacto" className="text-link">
              Volver al contacto
            </Link>
          </aside>

          <article className="legal-content">
            <div className="legal-content__meta">
              <span>{page.eyebrow}</span>
              <span aria-hidden="true">/</span>
              <span>Actualizado el {formatDate(page.updated)}</span>
            </div>

            <div className="legal-content__intro">
              <p>{page.intro}</p>
            </div>

            {page.sections.map((section) => (
              <section className="legal-section" key={section.id} id={section.id}>
                <h2>{section.title}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
                {section.list ? (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
                {section.note ? <p className="legal-section__note">{section.note}</p> : null}
              </section>
            ))}

            <footer className="legal-content__footer">
              <p>
                Última actualización: <time dateTime={page.updated}>{formatDate(page.updated)}</time>
              </p>
              <Breadcrumbs
                items={[
                  { label: "Inicio", href: "/" },
                  { label: "Privacidad", href: "/legal/privacidad" },
                  { label: "Datos", href: "/legal/tratamiento-de-datos" },
                  { label: "Aviso legal", href: "/legal/aviso-legal" },
                ]}
              />
            </footer>
          </article>
        </div>
      </div>
    </>
  );
}
