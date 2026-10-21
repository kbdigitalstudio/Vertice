import Link from "next/link";
import { site } from "@/content/site";
import { ButtonLink, SectionLabel } from "@/components/ui";

type ContactCtaProps = {
  index: string;
  title?: string;
  text?: string;
  showGuided?: boolean;
};

export function ContactCta({
  index,
  title = "Hablemos de la decisión que tiene delante.",
  text = "Cuéntenos el contexto. Le diremos si podemos ayudarle, cómo lo abordaríamos y qué información necesitamos para empezar.",
  showGuided = true,
}: ContactCtaProps) {
  return (
    <section className="cta-band" aria-labelledby="cta-title">
      <div className="container cta-band__inner">
        <SectionLabel index={index} tone="light">
          Contacto
        </SectionLabel>
        <div className="cta-band__grid">
          <h2 className="cta-band__title" id="cta-title">
            {title}
          </h2>
          <div className="cta-band__aside">
            <p className="cta-band__text">{text}</p>
            <div className="cta-band__actions">
              <ButtonLink href="/contacto" variant="inverse">
                Solicitar una consulta
              </ButtonLink>
              {showGuided ? (
                <Link href="/consulta-guiada" className="text-link text-link--light">
                  ¿No sabe por dónde empezar? Consulta guiada
                </Link>
              ) : null}
            </div>
            <p className="cta-band__note">
              No incluya documentación confidencial en el primer mensaje.{" "}
              {site.demo ? "Los datos de contacto son ficticios." : "Le indicaremos un canal seguro."}
            </p>
          </div>
        </div>
      </div>
      <div className="cta-band__line" aria-hidden="true" />
    </section>
  );
}
