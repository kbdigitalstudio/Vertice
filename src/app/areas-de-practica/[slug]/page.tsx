import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactCta } from "@/components/contact-cta";
import { MetaList, PageMasthead } from "@/components/page-masthead";
import { Arrow, SectionLabel } from "@/components/ui";
import { getComplementaryPractice, getPractice, practices, type Practice } from "@/content/practices";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

type PracticePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return practices.map((practice) => ({ slug: practice.slug }));
}

export async function generateMetadata({ params }: PracticePageProps): Promise<Metadata> {
  const { slug } = await params;
  const practice = getPractice(slug);

  if (!practice) {
    return {
      title: "Área no encontrada",
      description: "El área de práctica solicitada no existe.",
    };
  }

  return pageMetadata({
    title: practice.shortTitle,
    description: practice.seoDescription,
    path: `/areas-de-practica/${practice.slug}`,
  });
}

function ComplementaryCard({ practice }: { practice: Practice }) {
  return (
    <Link className="complementary-card" href={`/areas-de-practica/${practice.slug}`}>
      <span className="complementary-card__index" aria-hidden="true">
        {practice.index}
      </span>
      <span className="complementary-card__body">
        <span className="complementary-card__title">{practice.title}</span>
        <span className="complementary-card__summary">{practice.summary}</span>
      </span>
      <Arrow className="complementary-card__arrow" />
    </Link>
  );
}

export default async function PracticeDetailPage({ params }: PracticePageProps) {
  const { slug } = await params;
  const practice = getPractice(slug);

  if (!practice) notFound();

  const complementary = practice.complementary
    .map((item) => getComplementaryPractice(item))
    .filter((item): item is Practice => Boolean(item));

  return (
    <>
      <PageMasthead
        index={practice.index}
        label={practice.shortTitle}
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Áreas de práctica", href: "/areas-de-practica" },
          { label: practice.shortTitle },
        ]}
        title={practice.title}
        lead={practice.summary}
        aside={
          <MetaList
            items={[
              { label: "Enfoque", value: practice.eyebrow },
              { label: "Servicios", value: `${String(practice.services.length).padStart(2, "0")} líneas de trabajo` },
              { label: "Sede", value: site.location },
              { label: "Estado", value: "Contenido provisional" },
            ]}
          />
        }
      />

      <section className="practice-detail section" aria-labelledby="practice-detail-title">
        <div className="container">
          <div className="practice-detail__grid">
            <div className="practice-detail__copy">
              <SectionLabel index="02">Planteamiento</SectionLabel>
              <h2 className="sr-only" id="practice-detail-title">
                Planteamiento de {practice.title}
              </h2>
              {practice.intro.map((paragraph, index) => (
                <p className={index === 0 ? "practice-detail__lead" : undefined} key={paragraph.slice(0, 28)}>
                  {paragraph}
                </p>
              ))}

              <blockquote className="practice-detail__focus">
                <span aria-hidden="true">“</span>
                <p>{practice.focus}</p>
              </blockquote>

              <p className="practice-detail__demo">
                Texto de demostración. La descripción del área, sus servicios y su método no
                constituyen una oferta profesional ni acreditan experiencia.
              </p>
            </div>

            <figure className="practice-detail__media">
              <div className="practice-detail__frame">
                <Image
                  src={practice.visual.src}
                  alt={practice.visual.alt}
                  fill
                  sizes="(max-width: 900px) 92vw, 42vw"
                  className="practice-detail__image"
                  style={{ objectPosition: practice.visual.position }}
                />
                <div className="image-grade" aria-hidden="true" />
                <span className="practice-detail__figure-index" aria-hidden="true">
                  FIG. {practice.index}
                </span>
              </div>
              <figcaption className="practice-detail__caption">
                <span>{practice.visual.caption}</span>
                <span>Fotografía de demostración · Archivo visual</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="services section section--stone" aria-labelledby="services-title">
        <div className="container">
          <SectionLabel index="03">Líneas de trabajo</SectionLabel>
          <div className="services__head">
            <h2 className="services__title" id="services-title">
              Lo que se ordena <em>dentro del área.</em>
            </h2>
            <p>
              Cuatro frentes de trabajo que pueden activarse de forma aislada o combinada. La
              delimitación concreta se realiza después de conocer el contexto.
            </p>
          </div>

          <div className="service-list">
            {practice.services.map((service, index) => (
              <article className="service" key={service.title}>
                <span className="service__index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="service__body">
                  <h3 className="service__title">{service.title}</h3>
                  <p className="service__text">{service.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="practice-method section" aria-labelledby="practice-method-title">
        <div className="container">
          <SectionLabel index="04">Método aplicado</SectionLabel>
          <div className="practice-method__head">
            <h2 className="practice-method__title" id="practice-method-title">
              {practice.method.lead}
            </h2>
          </div>

          <ol className="practice-steps">
            {practice.method.steps.map((step, index) => (
              <li className="practice-step" key={step.title}>
                <span className="practice-step__number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="practice-step__title">{step.title}</h3>
                <p className="practice-step__text">{step.description}</p>
              </li>
            ))}
          </ol>

          <p className="disclaimer">
            El método describe un proceso de trabajo. No anticipa, promete ni garantiza resultados
            jurídicos, judiciales o económicos.
          </p>
        </div>
      </section>

      <section className="complementary section section--stone" aria-labelledby="complementary-title">
        <div className="container">
          <SectionLabel index="05">Áreas relacionadas</SectionLabel>
          <div className="complementary__head">
            <h2 className="complementary__title" id="complementary-title">
              Una decisión rara vez afecta <em>a una sola materia.</em>
            </h2>
            <Link href="/areas-de-practica" className="text-link">
              Ver todas las áreas
            </Link>
          </div>

          <div className="complementary__grid">
            {complementary.map((item) => (
              <ComplementaryCard key={item.slug} practice={item} />
            ))}
          </div>
        </div>
      </section>

      <ContactCta index="06" />
    </>
  );
}
