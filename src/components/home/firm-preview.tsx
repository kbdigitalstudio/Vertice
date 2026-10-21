import Image from "next/image";
import Link from "next/link";
import { firm, team, teamDisclaimer } from "@/content/firm";
import { ButtonLink, SectionLabel } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";

export function FirmPreview() {
  return (
    <section className="firm-preview section" id="firma" aria-labelledby="firm-preview-title">
      <div className="container">
        <SectionLabel index="06">La firma</SectionLabel>

        <div className="firm-preview__grid">
          <Reveal className="firm-preview__visual-wrap">
            <figure className="firm-preview__visual">
              <Image
                src="/images/chamber-light.jpg"
                alt="Muro de piedra oscuro atravesado por un haz de luz en el Museo Kolumba, de Peter Zumthor."
                fill
                sizes="(max-width: 900px) 92vw, 44vw"
                className="firm-preview__image"
              />
              <div className="image-grade" aria-hidden="true" />
              <figcaption>
                <span>Estudio de luz</span>
                <span>Kolumba / Colonia</span>
              </figcaption>
              <span className="firm-preview__vertical" aria-hidden="true">
                Criterio · Discreción · Continuidad
              </span>
            </figure>
          </Reveal>

          <div className="firm-preview__copy">
            <h2 className="firm-preview__title" id="firm-preview-title">
              {firm.statement}
            </h2>
            <p className="firm-preview__lead">{firm.manifesto[0]}</p>
            <p>{firm.manifesto[1]}</p>
            <div className="firm-preview__principles">
              {firm.principles.slice(0, 3).map((principle) => (
                <div key={principle.index} className="firm-preview__principle">
                  <span className="firm-preview__principle-index">{principle.index}</span>
                  <span>{principle.title}</span>
                </div>
              ))}
            </div>
            <ButtonLink href="/la-firma" variant="outline">
              Conocer la firma
            </ButtonLink>
          </div>
        </div>

        <div className="team-preview" id="equipo">
          <div className="team-preview__head">
            <h3>Un equipo pequeño. Una conversación directa.</h3>
            <p>Perfiles de demostración</p>
          </div>
          <div className="team-preview__grid">
            {team.slice(0, 3).map((person) => (
              <article key={person.name} className="team-card team-card--preview">
                <div className="team-card__monogram" aria-hidden="true">
                  <span>{person.initials}</span>
                  <span className="team-card__line" />
                </div>
                <h4>{person.name}</h4>
                <p className="team-card__role">{person.role}</p>
                <p className="team-card__focus">{person.focus}</p>
              </article>
            ))}
          </div>
          <div className="team-preview__footer">
            <p>{teamDisclaimer}</p>
            <Link href="/la-firma#equipo" className="text-link">
              Ver todos los perfiles
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
