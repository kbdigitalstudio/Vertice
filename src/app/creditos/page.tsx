import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageMasthead } from "@/components/page-masthead";
import { SectionLabel } from "@/components/ui";
import { fontCredits, imageCredits } from "@/content/credits";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Créditos",
  description:
    "Créditos de fotografía, tipografía y tecnología del proyecto conceptual VÉRTICE. Material de demostración con atribuciones verificables.",
  path: "/creditos",
});

const technologies = [
  { name: "Next.js 16", detail: "App Router, renderizado estático y rutas dinámicas." },
  { name: "React 19", detail: "Componentes de servidor y experiencias interactivas acotadas." },
  { name: "TypeScript 5.9", detail: "Tipado estricto y contenido centralizado." },
  { name: "CSS nativo", detail: "Sistema editorial propio, sin framework visual." },
  { name: "Web Animations API", detail: "Revelados y transiciones sin librerías de animación." },
  { name: "Playwright", detail: "Verificación de rutas, formularios, accesibilidad y capturas." },
];

export default function CreditsPage() {
  return (
    <>
      <PageMasthead
        index="C"
        label="Créditos"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Créditos" },
        ]}
        title={
          <>
            Material de archivo, tipografía y <em>trabajo de composición.</em>
          </>
        }
        lead="Las imágenes sostienen la atmósfera editorial del proyecto, pero no representan al bufete ni sus instalaciones. Todas las atribuciones enlazan a la obra original."
        aside={
          <div className="masthead__stats masthead__stats--compact">
            <div>
              <span>04</span>
              <p>Fotografías</p>
            </div>
            <div>
              <span>02</span>
              <p>Familias tipográficas</p>
            </div>
          </div>
        }
      />

      <section className="credits section" aria-labelledby="credits-photo-title">
        <div className="container">
          <SectionLabel index="01">Fotografía</SectionLabel>
          <div className="credits__head">
            <h2 className="credits__title" id="credits-photo-title">
              Arquitectura como <em>material de demostración.</em>
            </h2>
            <p>
              Cuatro fotografías bajo licencia Creative Commons CC BY 2.0. Se han recortado y
              ajustado para la composición. Los autores conservan todos los derechos; las obras no
              se presentan como propiedad del proyecto.
            </p>
          </div>

          <div className="credit-grid">
            {imageCredits.map((credit) => (
              <article className="credit" key={credit.file}>
                <div className="credit__media">
                  <Image
                    src={`/images/${credit.file}`}
                    alt={credit.note}
                    fill
                    sizes="(max-width: 720px) 92vw, (max-width: 1120px) 45vw, 30vw"
                    className="credit__image"
                  />
                  <span className="credit__license">{credit.license}</span>
                </div>
                <div className="credit__body">
                  <p className="credit__author">{credit.author}</p>
                  <h3 className="credit__title">{credit.title}</h3>
                  <p className="credit__note">{credit.note}</p>
                  <div className="credit__links">
                    <a href={credit.source} target="_blank" rel="noopener noreferrer">
                      Obra original <span aria-hidden="true">↗</span>
                    </a>
                    <a href={credit.licenseUrl} target="_blank" rel="noopener noreferrer">
                      Licencia <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="disclaimer">
            Las fotografías se utilizan como atmósfera editorial. No documentan oficinas, clientes,
            asuntos ni actividad profesional de VÉRTICE.
          </p>
        </div>
      </section>

      <section className="type-credits section section--stone" aria-labelledby="type-credits-title">
        <div className="container">
          <SectionLabel index="02">Tipografía</SectionLabel>
          <div className="type-credits__grid">
            <div>
              <h2 className="type-credits__title" id="type-credits-title">
                Dos voces: <em>serif y sans.</em>
              </h2>
              <p>
                Bodoni Moda aporta la dimensión editorial y arquitectónica. Instrument Sans sostiene
                la interfaz, las etiquetas y los textos funcionales. Ambas se sirven localmente.
              </p>
            </div>

            <div className="type-credits__list">
              {fontCredits.map((font) => (
                <div className="type-credit" key={font.name}>
                  <p className="type-credit__name">{font.name}</p>
                  <p className="type-credit__author">{font.author}</p>
                  <div className="type-credit__meta">
                    <span>{font.license}</span>
                    <a href={font.source} target="_blank" rel="noopener noreferrer">
                      Fuente <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="tech-credits section" aria-labelledby="tech-credits-title">
        <div className="container">
          <SectionLabel index="03">Tecnología</SectionLabel>
          <div className="tech-credits__head">
            <h2 className="tech-credits__title" id="tech-credits-title">
              Una base deliberadamente <em>sobria.</em>
            </h2>
            <p>
              Sin plantilla, sin page builder y sin animaciones de vídeo. La experiencia se
              construye con HTML semántico, CSS propio y componentes de React.
            </p>
          </div>

          <dl className="tech-list">
            {technologies.map((technology) => (
              <div className="tech-list__item" key={technology.name}>
                <dt>{technology.name}</dt>
                <dd>{technology.detail}</dd>
              </div>
            ))}
          </dl>

          <div className="tech-credits__note">
            <p>
              Proyecto conceptual sin actividad profesional. La identidad, los perfiles, las áreas
              y los datos de contacto son ficticios.{" "}
              {site.demo ? site.demoNotice : null}
            </p>
            <Link href="/legal/aviso-legal" className="text-link">
              Leer el aviso legal
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
