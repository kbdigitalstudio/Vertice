import Link from "next/link";
import { Monogram } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="not-found" aria-labelledby="not-found-title">
      <div className="container not-found__grid">
        <div className="not-found__code" aria-hidden="true">
          <span>4</span>
          <Monogram className="not-found__mark" />
          <span>4</span>
        </div>

        <div className="not-found__copy">
          <p className="not-found__label">Página no encontrada</p>
          <h1 className="not-found__title" id="not-found-title">
            Esta página no forma parte <em>del mapa.</em>
          </h1>
          <p className="not-found__text">
            El enlace puede haber cambiado o la dirección no existe. Ningún contenido se ha perdido:
            vuelva al inicio o elija una de las rutas principales.
          </p>
          <div className="not-found__actions">
            <Link href="/" className="button button--solid">
              <span className="button__label">Volver al inicio</span>
              <span className="button__arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
            <Link href="/contacto" className="text-link">
              Ir a contacto
            </Link>
          </div>

          <nav className="not-found__nav" aria-label="Rutas principales">
            <Link href="/la-firma">La firma</Link>
            <Link href="/areas-de-practica">Áreas de práctica</Link>
            <Link href="/perspectivas">Perspectivas</Link>
            <Link href="/consulta-guiada">Consulta guiada</Link>
          </nav>
        </div>
      </div>

      <div className="not-found__foot container" aria-hidden="true">
        <span>Error 404</span>
        <span className="not-found__line" />
        <span>V / Estrategia jurídica</span>
      </div>
    </section>
  );
}
