import Image from "next/image";
import Link from "next/link";
import { SectionLabel } from "@/components/ui";

export function HomeHero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="header-sentinel" data-header-sentinel aria-hidden="true" />

      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="hero__eyebrow">
            <span className="hero__eyebrow-rule" aria-hidden="true" />
            Estrategia jurídica
            <span className="hero__eyebrow-sep" aria-hidden="true">
              /
            </span>
            <span className="hero__eyebrow-place">Madrid · España</span>
          </p>

          <h1 className="hero__title" id="hero-title">
            <span className="hero__line">
              <span>El derecho</span>
            </span>
            <span className="hero__line">
              <span>se interpreta.</span>
            </span>
            <span className="hero__line hero__line--shift">
              <span>La estrategia</span>
            </span>
            <span className="hero__line hero__line--shift">
              <span>
                <em>se construye.</em>
              </span>
            </span>
          </h1>

          <p className="hero__lede">
            Acompañamos a empresas y patrimonios en las decisiones jurídicas que definen lo que
            viene después. Análisis riguroso, criterio propio y una ejecución sin ruido.
          </p>

          <div className="hero__actions">
            <Link href="/contacto" className="button button--inverse hero__cta">
              <span className="button__label">Solicitar una consulta</span>
              <span className="button__arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
            <Link href="/areas-de-practica" className="text-link text-link--light hero__secondary">
              Explorar nuestra práctica
            </Link>
          </div>
        </div>

        <figure className="hero__visual">
          <div className="hero__frame">
            <Image
              src="/images/facade-pattern.jpg"
              alt="Detalle de la fachada de ladrillo perforado del Museo Kolumba, de Peter Zumthor, con luz rasante."
              fill
              priority
              sizes="(max-width: 900px) 92vw, (max-width: 1440px) 40vw, 560px"
              className="hero__image"
            />
            <div className="hero__veil" aria-hidden="true" />
            <div className="hero__light" aria-hidden="true" />
            <svg
              className="hero__diagram"
              viewBox="0 0 520 700"
              fill="none"
              aria-hidden="true"
              preserveAspectRatio="xMidYMid slice"
            >
              <path d="M44 0V700M0 490H520" stroke="currentColor" strokeWidth="0.7" opacity="0.34" />
              <path d="M44 490 210 342" stroke="currentColor" strokeWidth="0.7" opacity="0.6" />
              <circle cx="210" cy="342" r="3" fill="#B08A5F" />
              <circle cx="210" cy="342" r="10" stroke="#B08A5F" strokeWidth="0.7" opacity="0.6" />
              <path d="M474 0V700" stroke="currentColor" strokeWidth="0.7" opacity="0.22" />
              <path d="M492 24h14M499 17v14" stroke="currentColor" strokeWidth="0.7" opacity="0.6" />
            </svg>

            <div className="hero__frame-index" aria-hidden="true">
              <span>FIG. 01</span>
              <span>ESTRUCTURA / LUZ</span>
            </div>

            <div className="hero__frame-mark" aria-hidden="true">
              <span>V</span>
            </div>

            <span className="hero__vertical" aria-hidden="true">
              Estrategia · Precisión · Decisión
            </span>
          </div>

          <figcaption className="hero__caption">
            <span>Archivo visual — Kolumba, Colonia</span>
            <span>Fotografía de demostración</span>
          </figcaption>
        </figure>
      </div>

      <div className="container hero__rail">
        <div className="hero__rail-item">
          <span className="mono-label">01 / 08</span>
          <span>Firma de estrategia jurídica</span>
        </div>
        <div className="hero__rail-item hero__rail-item--center">
          <span className="mono-label">Lema conceptual</span>
          <span>La ley establece el marco. La estrategia define el resultado.</span>
        </div>
        <Link href="#filosofia" className="hero__scroll">
          <span>Descubrir</span>
          <span className="hero__scroll-line" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

export function ManifestoSection() {
  return (
    <section className="manifesto section" id="filosofia" aria-labelledby="manifesto-title">
      <div className="container">
        <SectionLabel index="02">Filosofía</SectionLabel>

        <div className="manifesto__grid">
          <div className="manifesto__heading">
            <span className="manifesto__coordinate" aria-hidden="true">
              Y 04 / X 11
            </span>
            <h2 className="manifesto__title" id="manifesto-title">
              <span>La ley establece</span>
              <span>el marco.</span>
              <span className="manifesto__accent">
                <em>La estrategia</em>
              </span>
              <span className="manifesto__accent">
                <em>define el resultado.</em>
              </span>
            </h2>
          </div>

          <div className="manifesto__body">
            <p className="manifesto__lead">
              No entendemos el asesoramiento como una respuesta rápida a una pregunta aislada.
              Entendemos cada asunto como una estructura que hay que leer, ordenar y sostener.
            </p>
            <p>
              Esa forma de trabajar exige tiempo para escuchar, rigor para delimitar y criterio
              para elegir. También exige decir lo que no conviene hacer. La claridad, en asuntos
              complejos, es una forma de respeto.
            </p>
            <Link href="/la-firma" className="text-link manifesto__link">
              Conocer la firma
            </Link>
          </div>
        </div>

        <div className="manifesto__axiom" aria-hidden="true">
          <span className="manifesto__axiom-label">Axioma</span>
          <span className="manifesto__axiom-line" />
          <span className="manifesto__axiom-text">El criterio precede a la solución.</span>
        </div>
      </div>
    </section>
  );
}

export function GuidedTeaser() {
  return (
    <section className="guided-teaser section section--dark" aria-labelledby="guided-title">
      <div className="container guided-teaser__grid">
        <div>
          <SectionLabel index="07" tone="light">
            Consulta guiada
          </SectionLabel>
          <h2 className="guided-teaser__title" id="guided-title">
            No todas las consultas empiezan con una pregunta jurídica.
          </h2>
        </div>
        <div className="guided-teaser__body">
          <p>
            A veces hay una decisión que todavía no tiene forma. Tres preguntas breves pueden
            ayudarle a identificar el punto de partida y a llegar al formulario con el contexto
            ordenado.
          </p>
          <p className="guided-teaser__note">
            Orientación informativa. No es un diagnóstico jurídico ni sustituye una consulta
            profesional.
          </p>
        </div>
      </div>
    </section>
  );
}
