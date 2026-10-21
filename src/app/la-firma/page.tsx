import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactCta } from "@/components/contact-cta";
import { MetaList, PageMasthead } from "@/components/page-masthead";
import { ButtonLink, SectionLabel } from "@/components/ui";
import { firm, team, teamDisclaimer } from "@/content/firm";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "La firma",
  description:
    "Método, principios y equipo de demostración de VÉRTICE: una propuesta de estrategia jurídica sobria, rigurosa y orientada a la decisión.",
  path: "/la-firma",
});

export default function FirmPage() {
  return (
    <>
      <PageMasthead
        index="01"
        label="La firma"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "La firma" },
        ]}
        title={
          <>
            Un bufete pequeño para decisiones que <em>no admiten improvisación.</em>
          </>
        }
        lead={firm.intro}
        aside={
          <MetaList
            items={[
              { label: "Sede", value: site.location },
              { label: "Naturaleza", value: "Proyecto conceptual" },
              { label: "Equipo", value: "04 perfiles de demostración" },
              { label: "Idiomas", value: "Español · Inglés" },
            ]}
          />
        }
      />

      <section className="firm-statement section" aria-labelledby="firm-statement-title">
        <div className="container">
          <p className="firm-statement__index" aria-hidden="true">
            I / Posición
          </p>
          <h2 className="firm-statement__statement" id="firm-statement-title">
            {firm.statement}
          </h2>

          <div className="firm-statement__grid">
            <p className="firm-statement__lead">{firm.manifesto[0]}</p>
            <div className="firm-statement__body">
              <p>{firm.manifesto[1]}</p>
              <p>
                La firma se presenta como una estructura deliberadamente contenida: pocas líneas de
                trabajo, interlocución directa y una atención sostenida a lo que la decisión exige.
                Los nombres, perfiles y credenciales de esta página son ficticios y deberán
                sustituirse por información verificada.
              </p>
              <Link href="/areas-de-practica" className="text-link">
                Ver las áreas de práctica
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="image-band" aria-labelledby="image-band-title">
        <div className="image-band__figure">
          <Image
            src="/images/chamber-light.jpg"
            alt="Muro de piedra oscuro atravesado por un haz de luz en el Museo Kolumba, de Peter Zumthor."
            fill
            sizes="100vw"
            className="image-band__image"
          />
          <div className="image-grade" aria-hidden="true" />
          <div className="container image-band__content">
            <SectionLabel index="02" tone="light">
              Estudio
            </SectionLabel>
            <p className="image-band__quote" id="image-band-title">
              La precisión no está reñida con la claridad.
              <br />
              <em>La hace posible.</em>
            </p>
            <p className="image-band__caption">
              <span>Archivo visual · Kolumba, Colonia</span>
              <span>Fotografía de demostración, no representa oficinas de la firma</span>
            </p>
          </div>
          <span className="image-band__vertical" aria-hidden="true">
            Luz / muro / medida
          </span>
        </div>
      </section>

      <section className="principles section" aria-labelledby="principles-title">
        <div className="container">
          <SectionLabel index="03">Principios</SectionLabel>
          <div className="principles__head">
            <h2 className="principles__title" id="principles-title">
              Cuatro criterios antes <em>de cualquier respuesta.</em>
            </h2>
            <p>
              No son valores decorativos. Son filtros de trabajo que determinan qué se acepta, cómo
              se documenta y cuándo conviene detenerse.
            </p>
          </div>

          <div className="principles__grid">
            {firm.principles.map((principle) => (
              <article className="principle" key={principle.index}>
                <span className="principle__index" aria-hidden="true">
                  {principle.index}
                </span>
                <h3 className="principle__title">{principle.title}</h3>
                <p className="principle__text">{principle.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="approach section section--stone" aria-labelledby="approach-title">
        <div className="container approach__grid">
          <div className="approach__aside">
            <SectionLabel index="04">Enfoque</SectionLabel>
            <p className="approach__coordinate" aria-hidden="true">
              Método / 05 etapas
            </p>
          </div>
          <div className="approach__body">
            <h2 className="approach__title" id="approach-title">
              {firm.approach.title}
            </h2>
            {firm.approach.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="methodology section" id="metodologia" aria-labelledby="methodology-title">
        <div className="container">
          <SectionLabel index="05">Metodología</SectionLabel>
          <div className="methodology__head">
            <h2 className="methodology__title" id="methodology-title">
              Un proceso para ordenar <em>la incertidumbre.</em>
            </h2>
            <p className="methodology__lead">
              Cinco etapas que ayudan a separar lo que se sabe de lo que se supone, elegir una
              posición y revisarla cuando cambia el escenario.
            </p>
          </div>

          <ol className="method">
            {firm.method.map((stage) => (
              <li className="method__item" key={stage.index}>
                <span className="method__number" aria-hidden="true">
                  {stage.index}
                </span>
                <div className="method__body">
                  <p className="method__short">{stage.short}</p>
                  <h3 className="method__title">{stage.title}</h3>
                  <p className="method__text">{stage.description}</p>
                </div>
                <div className="method__question">
                  <span className="mono-label">Pregunta de trabajo</span>
                  <p>{stage.question}</p>
                </div>
              </li>
            ))}
          </ol>

          <p className="disclaimer">{firm.disclaimer}</p>
        </div>
      </section>

      <section className="team-section section section--stone" id="equipo" aria-labelledby="team-title">
        <div className="container">
          <SectionLabel index="06">Equipo</SectionLabel>
          <div className="team-section__head">
            <h2 className="team-section__title" id="team-title">
              Un equipo pequeño. <em>Una conversación directa.</em>
            </h2>
            <p className="team-section__note">
              Cuatro perfiles de demostración para mostrar cómo se presentaría un equipo real. No
              representan credenciales, colegiación ni experiencia verificada.
            </p>
          </div>

          <div className="team-grid">
            {team.map((person, index) => (
              <article className="team-card team-card--full" key={person.name}>
                <div className="team-card__monogram" aria-hidden="true">
                  <span>{person.initials}</span>
                  <span className="team-card__line" />
                </div>
                <p className="team-card__index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3>{person.name}</h3>
                <p className="team-card__role">{person.role}</p>
                <p className="team-card__focus">{person.focus}</p>
                <p className="team-card__languages">
                  <span>Idiomas</span> {person.languages}
                </p>
                <p className="team-card__demo">Perfil ficticio</p>
              </article>
            ))}
          </div>

          <p className="team-section__disclaimer">{teamDisclaimer}</p>
        </div>
      </section>

      <section className="firm-next section" aria-labelledby="firm-next-title">
        <div className="container firm-next__grid">
          <div>
            <SectionLabel index="07">Siguiente paso</SectionLabel>
            <h2 className="firm-next__title" id="firm-next-title">
              La mejor forma de entender el método es <em>ponerlo a prueba.</em>
            </h2>
          </div>
          <div className="firm-next__actions">
            <ButtonLink href="/consulta-guiada" variant="solid">
              Ordenar mi consulta
            </ButtonLink>
            <ButtonLink href="/areas-de-practica" variant="outline">
              Explorar la práctica
            </ButtonLink>
          </div>
        </div>
      </section>

      <ContactCta index="08" title="Hablemos de la decisión que tiene delante." />
    </>
  );
}
