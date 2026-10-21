import { expect, test } from "@playwright/test";
import { skipIntro } from "./helpers";

test.describe("navegación móvil con teclado", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test.beforeEach(async ({ page }) => {
    await skipIntro(page);
  });

  test("el enlace de salto aparece al recibir foco", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");

    const skipLink = page.getByRole("link", { name: "Saltar al contenido" });
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toBeVisible();
  });

  test("abre con el botón, enfoca el cierre, atrapa el foco y cierra con Escape", async ({
    page,
  }) => {
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "Abrir menú de navegación" });
    await trigger.click();

    const dialog = page.getByRole("dialog", { name: "Navegación principal" });
    await expect(dialog).toBeVisible();
    await expect(page.locator(".menu-trigger")).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator(".menu-close")).toBeFocused();

    for (let index = 0; index < 18; index += 1) {
      await page.keyboard.press("Tab");
      const inside = await page.evaluate(() =>
        Boolean(document.activeElement?.closest("#site-menu")),
      );
      expect(inside, `el foco escapó del menú en el tabulador ${index + 1}`).toBe(true);
    }

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
    await expect(page.locator(".menu-trigger")).toHaveAttribute("aria-expanded", "false");
  });

  test("navega desde el menú y lo cierra", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Abrir menú de navegación" }).click();
    const dialog = page.getByRole("dialog", { name: "Navegación principal" });
    await dialog.getByRole("link", { name: /La firma/ }).click();

    await expect(page).toHaveURL(/\/la-firma$/);
    await expect(page.getByRole("dialog", { name: "Navegación principal" })).toBeHidden();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});

test.describe("navegación móvil táctil", () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });

  test("abre y navega con toques", async ({ page }) => {
    await skipIntro(page);
    await page.goto("/");
    await page.getByRole("button", { name: "Abrir menú de navegación" }).tap();

    const dialog = page.getByRole("dialog", { name: "Navegación principal" });
    await expect(dialog).toBeVisible();
    await dialog.getByRole("link", { name: /Perspectivas/ }).tap();

    await expect(page).toHaveURL(/\/perspectivas$/);
    await expect(page.getByRole("dialog", { name: "Navegación principal" })).toBeHidden();
  });
});

test.describe("cabecera en rutas interiores", () => {
  test("mantiene la cabecera sólida y el estado activo", async ({ page }) => {
    await skipIntro(page);
    await page.goto("/la-firma");
    const header = page.locator("header.site-header");
    await expect(header).toHaveAttribute("data-solid", "true");

    const active = page.locator(".site-nav__link.is-active");
    await expect(active).toHaveCount(1);
    await expect(active).toHaveText("La firma");
    await expect(active).toHaveAttribute("aria-current", "page");
  });
});
