import { expect, test, type Page } from "@playwright/test";

const output = "screenshots";

async function settlePage(page: Page, route: string) {
  await page.addInitScript(() => {
    try {
      window.sessionStorage.setItem("vertice:intro:v1", "1");
    } catch {
      // La captura sigue siendo válida sin sessionStorage.
    }
  });

  await page.goto(route, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(async () => {
    const step = Math.max(500, Math.round(window.innerHeight * 0.8));
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => window.setTimeout(resolve, 90));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(500);
}

test.describe("introducción cinematográfica", () => {
  test("captura la secuencia de entrada", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.addInitScript(() => {
      try {
        window.sessionStorage.removeItem("vertice:intro:v1");
      } catch {
        // Sin almacenamiento la secuencia también se muestra.
      }
    });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.locator(".intro")).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(2_250);
    await page.screenshot({ path: `${output}/01-intro-desktop.png`, animations: "allow" });
  });
});

test.describe("capturas de escritorio", () => {
  test.use({ reducedMotion: "reduce", viewport: { width: 1440, height: 900 } });

  test("portada, área de práctica, contacto y artículo", async ({ page }) => {
    await settlePage(page, "/");
    await page.screenshot({ path: `${output}/02-home-desktop-hero.png` });
    await page.screenshot({ path: `${output}/03-home-desktop-full.png`, fullPage: true });

    await settlePage(page, "/areas-de-practica/derecho-corporativo");
    await page.screenshot({ path: `${output}/04-practice-desktop-full.png`, fullPage: true });

    await settlePage(page, "/contacto");
    await page.screenshot({ path: `${output}/05-contact-desktop-full.png`, fullPage: true });

    await settlePage(page, "/perspectivas/la-decision-antes-de-la-decision");
    await page.screenshot({ path: `${output}/06-article-desktop-full.png`, fullPage: true });

    await settlePage(page, "/perspectivas");
    await page.screenshot({ path: `${output}/07-perspectives-desktop-full.png`, fullPage: true });
  });
});

test.describe("capturas móviles", () => {
  test.use({ reducedMotion: "reduce", viewport: { width: 390, height: 844 } });

  test("menú móvil, formulario y portada", async ({ page }) => {
    await settlePage(page, "/");
    await page.screenshot({ path: `${output}/08-home-mobile-hero.png` });

    await page.getByRole("button", { name: "Abrir menú de navegación" }).click();
    await expect(page.getByRole("dialog", { name: "Navegación principal" })).toBeVisible();
    await page.waitForTimeout(120);
    await page.screenshot({ path: `${output}/09-mobile-menu.png` });

    await page.keyboard.press("Escape");
    await settlePage(page, "/contacto");
    await page.locator("#formulario").scrollIntoViewIfNeeded();
    await page.waitForTimeout(250);
    await page.screenshot({ path: `${output}/10-mobile-form.png` });
    await page.screenshot({ path: `${output}/11-mobile-contact-full.png`, fullPage: true });
  });
});
