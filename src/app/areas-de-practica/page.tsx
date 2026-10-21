import type { Metadata } from "next";
import Link from "next/link";
import { ContactCta } from "@/components/contact-cta";
import { PracticeExperience } from "@/components/home/practice-experience";
import { MetaList, PageMasthead } from "@/components/page-masthead";
import { SectionLabel } from "@/components/ui";
import { firm } from "@/content/firm";
import { practices } from "@/content/practices";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Áreas de práctica",
  description:
    "Seis áreas de práctica de demostración: corporativo, litigios, inmobiliario, contractual, patrimonio y consultoría estratégica.",
  path: "/areas-de-practica",
});

export default function PracticesPage() {
  return (
    <>
      <PageMasthead
        index="01"
        label="Áreas de práctica"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Áreas de práctica" },
        ]}
        title={
          <>
            Seis materias. <em>Una misma disciplina.</em>
          </>
        }
        lead="No organizamos el trabajo por etiquetas jurídicas, sino por el tipo de decisión que hay que sostener. Cada área tiene su lógica; todas comparten método y exigencia documental."
        aside={
          <MetaList
            items={[
              { label: "Áreas", value: "06 materias" },
              { label: "Metodología", value: `${firm.method.length} etapas` },
              { label: "Contenido", value: "Provisional / demostración" },
              { label: "Enfoque", value: "Estrategia antes de ejecución" },
            ]}
          />
        }
      />

      <PracticeExperience practices={practices} variant="index" index="02" />

      <section className="practice-index-note section" aria-labelledby="practice-note-title">
        <div className="container">
          <SectionLabel index="03">Cómo se elige el punto de entrada</SectionLabel>

          <div className="practice-index-note__grid">
            <h2 className="practice-index-note__title" id="practice-note-title">
              El área correcta suele aparecer <em>después de la primera conversación.</em>
            </h2>

            <div className="practice-index-note__body">
              <p className="practice-index-note__lead">
                La mayoría de los asuntos no llegan con una etiqueta clara. Un conflicto societario
                puede ser también un problema contractual; una operación inmobiliaria puede
                depender de una estructura patrimonial. Forzar la materia antes de entender el
                problema suele conducir a una solución incompleta.
              </p>

              <div className="practice-index-note__columns">
                <div>
                  <h3>Primero, contexto</h3>
                  <p>
                    Delimitamos hechos, objetivos, plazos y restricciones. Esa lectura inicial
                    permite identificar qué decisiones son jurídicas y cuáles pertenecen a otra
                    disciplina.
                  </p>
                </div>
                <div>
                  <h3>Después, encuadre</h3>
                  <p>
                    Elegimos la vía y el orden de actuación. Si intervienen varias áreas,
                    coordinamos el trabajo bajo una misma hipótesis y un único responsable de la
                    relación.
                  </p>
                </div>
                <div>
                  <h3>Sin promesas</h3>
                  <p>
                    No anticipamos resultados ni garantizamos una vía judicial. Explicamos
                    alternativas, riesgos y costes para que la decisión se tome con información.
                  </p>
                </div>
              </div>

              <div className="practice-index-note__actions">
                <Link href="/consulta-guiada" className="text-link">
                  Ordenar el punto de partida con la consulta guiada
                </Link>
                <Link href="/la-firma#metodologia" className="text-link">
                  Ver la metodología completa
                </Link>
              </div>
            </div>
          </div>

          <p className="disclaimer">
            Las áreas, servicios y descripciones son contenido provisional de demostración. No
            representan una cartera de servicios verificada ni una especialización acreditada.
          </p>
        </div>
      </section>

      <ContactCta index="04" />
    </>
  );
}
