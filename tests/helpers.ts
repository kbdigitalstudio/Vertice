import { expect, type Page } from "@playwright/test";

export const routes = [
  "/",
  "/la-firma",
  "/areas-de-practica",
  "/areas-de-practica/derecho-corporativo",
  "/areas-de-practica/litigios",
  "/areas-de-practica/derecho-inmobiliario",
  "/areas-de-practica/derecho-contractual",
  "/areas-de-practica/proteccion-patrimonial",
  "/areas-de-practica/consultoria-estrategica",
  "/perspectivas",
  "/perspectivas/la-decision-antes-de-la-decision",
  "/perspectivas/el-contrato-como-arquitectura",
  "/perspectivas/litigar-no-es-una-estrategia",
  "/perspectivas/la-continuidad-no-se-hereda",
  "/perspectivas/la-claridad-tambien-es-un-documento",
  "/perspectivas/categoria/estrategia",
  "/perspectivas/categoria/contratos",
  "/perspectivas/categoria/litigios",
  "/perspectivas/categoria/patrimonio",
  "/perspectivas/categoria/gobierno",
  "/perspectivas/categoria/observatorio",
  "/consulta-guiada",
  "/contacto",
  "/creditos",
  "/legal/privacidad",
  "/legal/tratamiento-de-datos",
  "/legal/aviso-legal",
] as const;

export const viewportWidths = [360, 390, 430, 768, 1024, 1280, 1440, 1920] as const;

/** Evita la secuencia de entrada en pruebas que no la examinan. */
export async function skipIntro(page: Page) {
  await page.addInitScript(() => {
    try {
      window.sessionStorage.setItem("vertice:intro:v1", "1");
    } catch {
      // Sin sessionStorage la página sigue siendo utilizable.
    }
  });
}

export async function expectNoHorizontalOverflow(page: Page) {
  const metrics = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    bodyWidth: document.body.scrollWidth,
  }));

  expect(
    metrics.scrollWidth,
    `scrollWidth ${metrics.scrollWidth} > clientWidth ${metrics.clientWidth}`,
  ).toBeLessThanOrEqual(metrics.clientWidth + 1);
  expect(metrics.bodyWidth).toBeLessThanOrEqual(metrics.clientWidth + 1);
}
