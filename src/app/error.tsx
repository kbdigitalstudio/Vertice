"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[vertice] Error de interfaz", { digest: error.digest });
  }, [error.digest]);

  return (
    <section className="error-page" aria-labelledby="error-title">
      <div className="container error-page__inner">
        <p className="error-page__label">Interrupción inesperada</p>
        <p className="error-page__code" aria-hidden="true">
          V / ERR
        </p>
        <h1 className="error-page__title" id="error-title">
          Algo no se ha podido <em>componer.</em>
        </h1>
        <p className="error-page__text">
          La página ha encontrado un error al renderizarse. Puede intentar reconstruirla o volver al
          inicio. No se ha enviado ningún dato desde esta pantalla.
        </p>
        <div className="error-page__actions">
          <button type="button" className="button button--solid" onClick={() => reset()}>
            <span className="button__label">Reintentar</span>
            <span className="button__arrow" aria-hidden="true">
              ↻
            </span>
          </button>
          <Link href="/" className="text-link">
            Volver al inicio
          </Link>
        </div>
        {error.digest ? <p className="error-page__digest">Referencia: {error.digest}</p> : null}
      </div>
    </section>
  );
}
