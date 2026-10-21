import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact/contact-form";
import { MetaList, PageMasthead } from "@/components/page-masthead";
import { ButtonLink, SectionLabel } from "@/components/ui";
import { practices } from "@/content/practices";
import { contactConfig, site } from "@/content/site";
import { isContactArea } from "@/lib/validation/contact";
import { pageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "Contacto",
  description:
    "Formulario de contacto de demostración de VÉRTICE: validación accesible, aviso de canal no configurado y datos ficticios.",
  path: "/contacto",
});

const areaOptions = practices.map((practice) => ({
  value: practice.slug,
  label: practice.title,
}));

type ContactPageProps = {
  searchParams: Promise<{ area?: string | string[] }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const query = await searchParams;
  const rawArea = Array.isArray(query.area) ? query.area[0] : query.area;
  const initialArea = rawArea && isContactArea(rawArea) ? rawArea : undefined;
  const configured = Boolean(process.env.CONTACT_WEBHOOK_URL);

  return (
    <>
      <PageMasthead
        index="01"
        label="Contacto"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Contacto" },
        ]}
        title={
          <>
            Escriba con contexto. <em>Le responderemos con criterio.</em>
          </>
        }
        lead="Cuéntenos qué decisión tiene delante, qué ha ocurrido y qué necesita ordenar. No hace falta que conozca la denominación jurídica del problema."
        aside={
          <MetaList
            items={[
              { label: "Canal", value: configured ? "Formulario conectado" : "Demostración / sin envío" },
              { label: "Respuesta", value: "Dos días laborables (orientativo)" },
              { label: "Sede", value: site.location },
              { label: "Horario", value: site.hours },
            ]}
          />
        }
      />

      <section className="contact-page section" aria-labelledby="contact-form-title">
        <div className="container contact-layout">
          <aside className="contact-info">
            <div className="contact-info__block">
              <SectionLabel index="02">Antes de escribir</SectionLabel>
              <h2 className="contact-info__title">Un primer mensaje útil no necesita ser extenso.</h2>
              <ol className="contact-info__steps">
                <li>
                  <span aria-hidden="true">01</span>
                  <div>
                    <h3>El contexto</h3>
                    <p>Qué ha ocurrido y qué decisión está pendiente. Sin documentación sensible.</p>
                  </div>
                </li>
                <li>
                  <span aria-hidden="true">02</span>
                  <div>
                    <h3>El objetivo</h3>
                    <p>Qué quiere conseguir o evitar, y en qué horizonte temporal.</p>
                  </div>
                </li>
                <li>
                  <span aria-hidden="true">03</span>
                  <div>
                    <h3>Las restricciones</h3>
                    <p>Plazos, relaciones en juego o decisiones ya adoptadas que condicionan el margen.</p>
                  </div>
                </li>
              </ol>
            </div>

            <div className="contact-info__block contact-info__block--data">
              <p className="contact-info__label">Datos de contacto</p>
              <dl className="contact-data">
                <div>
                  <dt>Correo</dt>
                  <dd>{site.email}</dd>
                </div>
                <div>
                  <dt>Teléfono</dt>
                  <dd>{site.phone}</dd>
                </div>
                <div>
                  <dt>Dirección</dt>
                  <dd>{site.address ?? "No publicada en esta demostración"}</dd>
                </div>
                <div>
                  <dt>Horario</dt>
                  <dd>{site.hours}</dd>
                </div>
              </dl>
              <p className="contact-info__demo">
                <span className="status-dot" aria-hidden="true" />
                Datos de demostración. No pertenecen a ninguna firma ni persona real.
              </p>
            </div>

            <div className="contact-info__block contact-info__block--guided">
              <p className="contact-info__label">¿No sabe por dónde empezar?</p>
              <p>
                La consulta guiada formula tres preguntas breves para ordenar el punto de partida.
                No evalúa el caso ni emite un diagnóstico.
              </p>
              <ButtonLink href="/consulta-guiada" variant="outline">
                Abrir la consulta guiada
              </ButtonLink>
            </div>

            <p className="contact-info__confidential">
              No incluya documentación confidencial, nombres de terceros ni datos especialmente
              protegidos en el primer mensaje. Si la conversación avanza, se indicará un canal
              adecuado para el intercambio.
            </p>
          </aside>

          <div className="contact-panel" id="formulario">
            <div className="contact-panel__head">
              <p className="contact-panel__label">Formulario de consulta</p>
              <h2 className="contact-panel__title" id="contact-form-title">
                Cuéntenos qué necesita ordenar.
              </h2>
              <p>
                Los campos marcados con asterisco son obligatorios. La información se utiliza
                únicamente para valorar y responder a su mensaje.
              </p>
            </div>

            <ContactForm
              areaOptions={areaOptions}
              initialArea={initialArea}
              configured={configured}
            />

            <div className="contact-panel__legal">
              <Link href={contactConfig.privacyPath}>Política de privacidad</Link>
              <Link href={contactConfig.dataPath}>Tratamiento de datos</Link>
              <Link href={contactConfig.legalPath}>Aviso legal</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-close" aria-labelledby="contact-close-title">
        <div className="container contact-close__inner">
          <p className="contact-close__label">Sin prisa, sin ruido</p>
          <h2 className="contact-close__title" id="contact-close-title">
            Si todavía no sabe cómo formular la consulta, <em>empiece por el contexto.</em>
          </h2>
          <Link href="/consulta-guiada" className="text-link text-link--light">
            Ordenar el punto de partida
          </Link>
        </div>
      </section>
    </>
  );
}
