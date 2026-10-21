import { expect, test } from "@playwright/test";
import { expectNoHorizontalOverflow, routes, skipIntro, viewportWidths } from "./helpers";

test.describe("rutas y estructura", () => {
  test.beforeEach(async ({ page }) => {
    await skipIntro(page);
  });

  for (const route of routes) {
    test(`responde y tiene estructura: ${route}`, async ({ page }) => {
      const response = await page.goto(route, { waitUntil: "domcontentloaded" });

      expect(response?.status(), `HTTP ${route}`).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", "es");
      await expect(page.locator("main#contenido")).toHaveCount(1);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("header.site-header")).toHaveCount(1);
      await expect(page.locator("footer.site-footer")).toHaveCount(1);

      const title = await page.title();
      expect(title.length, `título de ${route}`).toBeGreaterThan(8);
      const description = await page
        .locator('meta[name="description"]')
        .getAttribute("content");
      expect(description?.length ?? 0, `descripción de ${route}`).toBeGreaterThan(40);
    });
  }

  test("no hay enlaces internos rotos", async ({ page, request }, testInfo) => {
    const seeds = [
      "/",
      "/la-firma",
      "/areas-de-practica",
      "/perspectivas",
      "/perspectivas/la-decision-antes-de-la-decision",
      "/contacto",
      "/consulta-guiada",
      "/creditos",
      "/legal/privacidad",
    ];

    const hrefs = new Set<string>();

    for (const seed of seeds) {
      await page.goto(seed, { waitUntil: "domcontentloaded" });
      const found = await page.locator("a[href]").evaluateAll((anchors) =>
        anchors
          .map((anchor) => anchor.getAttribute("href") ?? "")
          .filter((href) => href.startsWith("/") && !href.startsWith("//")),
      );
      for (const href of found) {
        const url = new URL(href, "http://local.test");
        hrefs.add(`${url.pathname}${url.search}`);
      }
    }

    const broken: string[] = [];
    for (const href of [...hrefs].sort()) {
      const response = await request.get(href);
      if (response.status() !== 200) broken.push(`${href} → ${response.status()}`);
    }

    testInfo.annotations.push({
      type: "enlaces internos comprobados",
      description: String(hrefs.size),
    });
    expect(broken, `Enlaces internos rotos:\n${broken.join("\n")}`).toEqual([]);
  });

  test("contacto no expone correo ni teléfono clicables en modo demostración", async ({
    page,
  }) => {
    await page.goto("/contacto");
    await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
    await expect(page.locator('a[href^="tel:"]')).toHaveCount(0);
    await expect(page.getByText("Datos de demostración", { exact: false }).first()).toBeVisible();
  });
});

test.describe("sin desbordamiento horizontal", () => {
  test.beforeEach(async ({ page }) => {
    await skipIntro(page);
  });

  const representativeRoutes = [
    "/",
    "/la-firma",
    "/areas-de-practica",
    "/areas-de-practica/derecho-corporativo",
    "/perspectivas",
    "/perspectivas/la-decision-antes-de-la-decision",
    "/consulta-guiada",
    "/contacto",
    "/creditos",
    "/legal/privacidad",
  ];

  for (const width of viewportWidths) {
    test(`ancho ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });

      for (const route of representativeRoutes) {
        await page.goto(route, { waitUntil: "domcontentloaded" });
        await page.evaluate(() => document.fonts.ready);
        await expectNoHorizontalOverflow(page);
      }
    });
  }
});

test.describe("consola e hidratación", () => {
  test("la portada no genera errores de consola ni avisos de hidratación", async ({ page }) => {
    await skipIntro(page);
    const problems: string[] = [];

    page.on("console", (message) => {
      if (message.type() === "error") problems.push(`console: ${message.text()}`);
    });
    page.on("pageerror", (error) => problems.push(`pageerror: ${error.message}`));

    await page.goto("/", { waitUntil: "networkidle" });
    await page.mouse.wheel(0, 2400);
    await page.waitForTimeout(700);
    await page.mouse.wheel(0, 4000);
    await page.waitForTimeout(700);

    expect(problems, problems.join("\n")).toEqual([]);
  });

  test("las rutas principales no generan errores de página", async ({ page }) => {
    await skipIntro(page);
    const problems: string[] = [];
    page.on("pageerror", (error) => problems.push(error.message));

    for (const route of ["/la-firma", "/areas-de-practica", "/perspectivas", "/contacto"]) {
      await page.goto(route, { waitUntil: "networkidle" });
    }

    expect(problems, problems.join("\n")).toEqual([]);
  });
});
