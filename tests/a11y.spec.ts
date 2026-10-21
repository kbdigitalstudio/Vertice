import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { skipIntro } from "./helpers";

const auditRoutes = [
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

for (const route of auditRoutes) {
  test(`accesibilidad WCAG A/AA: ${route}`, async ({ page }) => {
    await skipIntro(page);
    await page.goto(route, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(150);

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const summary = results.violations.map((violation) => {
      const targets = violation.nodes
        .slice(0, 4)
        .map((node) => node.target.join(" "))
        .join(" | ");
      return `${violation.id} (${violation.impact}): ${violation.help} → ${targets}`;
    });

    expect(summary, summary.join("\n")).toEqual([]);
  });
}

test("el menú móvil abierto también es accesible", async ({ page }) => {
  await skipIntro(page);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Abrir menú de navegación" }).click();
  await expect(page.getByRole("dialog", { name: "Navegación principal" })).toBeVisible();

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();

  const summary = results.violations.map(
    (violation) => `${violation.id}: ${violation.help}`,
  );
  expect(summary, summary.join("\n")).toEqual([]);
});
