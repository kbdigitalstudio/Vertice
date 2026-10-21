import type { Metadata } from "next";
import Link from "next/link";
import { GuidedConsultation } from "@/components/consultation/guided-consultation";
import { MetaList, PageMasthead } from "@/components/page-masthead";
import { SectionLabel } from "@/components/ui";
import { practices } from "@/content/practices";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Consulta guiada",
  description:
    "Tres preguntas de demostración para ordenar el punto de partida de una consulta jurídica. Orientación informativa, sin diagnóstico ni almacenamiento de datos.",
  path: "/consulta-guiada",
});

const areas = practices.map((practice) => ({
  value: practice.slug,
  title: practice.title,
  summary: practice.summary,
}));

export default function GuidedPage() {
  return (
    <>
      <PageMasthead
        index="02"
        label="Consulta guiada"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Consulta guiada" },
        ]}
        title={
          <>
            Tres preguntas para ordenar <em>el punto de partida.</em>
          </>
        }
        lead="No es un test jurídico ni un formulario encubierto. Es una secuencia breve que ayuda a identificar el área de conversación y a llegar al contacto con el contexto más claro."
        aside={
          <MetaList
            items={[
              { label: "Duración", value: "Menos de un minuto" },
              { label: "Datos", value: "No se guarda ninguna respuesta" },
              { label: "Resultado", value: "Orientación informativa" },
              { label: "Límite", value: "No evalúa casos concretos" },
            ]}
          />
        }
      />

      <section className="guided-page section" aria-labelledby="guided-page-title">
        <div className="container guided-page__layout">
          <aside className="guided-page__aside">
            <SectionLabel index="03">Cómo funciona</SectionLabel>
            <h2 className="guided-page__title" id="guided-page-title">
              Delimitar antes <em>de decidir.</em>
            </h2>

            <div className="guided-page__copy">
              <p>
                La secuencia pregunta por el área, el momento del proceso y el tipo de parte
                interesada. Con esas tres coordenadas propone un punto de entrada, no una solución.
              </p>
              <p>
                Puede volver atrás, cambiar cualquier respuesta o salir en cualquier momento. La
                consulta no envía datos al servidor ni los conserva al recargar la página.
              </p>
            </div>

            <div className="guided-page__limits">
              <p className="guided-page__label">Qué no hace</p>
              <ul>
                <li>No emite un diagnóstico jurídico.</li>
                <li>No valora probabilidades de éxito.</li>
                <li>No sustituye la revisión de documentación.</li>
                <li>No crea una relación profesional.</li>
              </ul>
            </div>

            <div className="guided-page__privacy">
              <p className="guided-page__label">Privacidad</p>
              <p>
                Las respuestas permanecen en la memoria del navegador durante la sesión. No se
                registran en analítica ni se envían a ningún servicio.
              </p>
              <Link href="/legal/privacidad" className="text-link">
                Leer la política de demostración
              </Link>
            </div>

            <Link href="/contacto" className="text-link guided-page__direct">
              Prefiero escribir directamente
            </Link>
          </aside>

          <div className="guided-page__panel">
            <GuidedConsultation areas={areas} variant="page" title="Su punto de partida" />
          </div>
        </div>
      </section>

      <section className="guided-page__note-band">
        <div className="container guided-page__note-inner">
          <p className="guided-page__note-label">Límite de la herramienta</p>
          <p>
            Esta consulta es una ayuda de orientación editorial. No existe un resultado correcto ni
            una recomendación jurídica automatizada. Cualquier decisión requiere el análisis de un
            profesional con acceso al contexto completo y a la documentación.
          </p>
        </div>
      </section>
    </>
  );
}
