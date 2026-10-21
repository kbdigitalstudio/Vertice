import type { Metadata } from "next";
import { GuidedConsultation } from "@/components/consultation/guided-consultation";
import { ContactCta } from "@/components/contact-cta";
import { FirmPreview } from "@/components/home/firm-preview";
import { HomeHero, ManifestoSection } from "@/components/home/hero";
import { PerspectivesPreview } from "@/components/home/perspectives-preview";
import { PracticeExperience } from "@/components/home/practice-experience";
import { StrategyMap } from "@/components/home/strategy-map";
import { SectionLabel } from "@/components/ui";
import { firm } from "@/content/firm";
import { practices } from "@/content/practices";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  description: site.description,
  path: "/",
});

const guidedAreas = practices.map((practice) => ({
  value: practice.slug,
  title: practice.shortTitle,
  summary: practice.summary,
}));

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ManifestoSection />
      <PracticeExperience practices={practices} variant="home" />

      <StrategyMap stages={firm.method} />

      <PerspectivesPreview />
      <FirmPreview />

      <section className="guided-home section" id="consulta-guiada" aria-labelledby="guided-home-title">
        <div className="container">
          <div className="guided-home__grid">
            <div className="guided-home__copy">
              <SectionLabel index="07">Consulta guiada</SectionLabel>
              <h2 className="guided-home__title" id="guided-home-title">
                No todas las consultas empiezan con una pregunta jurídica.
              </h2>
              <p className="guided-home__lead">
                A veces hay una decisión que todavía no tiene forma. Tres preguntas breves sirven
                para ordenar el punto de partida y llegar al formulario con el contexto mejor
                encuadrado.
              </p>

              <ol className="guided-home__steps">
                <li>
                  <span>01</span>
                  <span>Qué necesita ordenar</span>
                </li>
                <li>
                  <span>02</span>
                  <span>En qué momento se encuentra</span>
                </li>
                <li>
                  <span>03</span>
                  <span>Con quién vamos a conversar</span>
                </li>
              </ol>

              <p className="guided-home__note">
                Orientación informativa. No es un diagnóstico jurídico, no evalúa un caso concreto
                y no sustituye una consulta profesional. No se guarda ninguna respuesta.
              </p>
            </div>

            <div className="guided-home__panel">
              <GuidedConsultation areas={guidedAreas} />
            </div>
          </div>
        </div>
      </section>

      <ContactCta index="08" />
    </>
  );
}
