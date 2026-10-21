import { expect, test } from "@playwright/test";

test.describe("secuencia de entrada", () => {
  test("se muestra una vez, se puede omitir con Escape y no se repite", async ({ page }) => {
    await page.addInitScript(() => {
      window.sessionStorage.removeItem("vertice:intro:v1");
    });

    await page.goto("/", { waitUntil: "domcontentloaded" });

    const intro = page.locator(".intro");
    await expect(intro).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("data-intro", "playing");
    await expect(page.getByRole("button", { name: /Omitir introducción/ })).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(intro).toBeHidden();
    await expect(page.locator("html")).toHaveAttribute("data-intro", "done");

    const stored = await page.evaluate(() => window.sessionStorage.getItem("vertice:intro:v1"));
    expect(stored).toBe("1");

    await page.reload({ waitUntil: "domcontentloaded" });
    await expect(page.locator(".intro")).toBeHidden();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("el botón de omisión cierra la secuencia", async ({ page }) => {
    await page.addInitScript(() => window.sessionStorage.removeItem("vertice:intro:v1"));
    await page.goto("/", { waitUntil: "domcontentloaded" });

    await page.locator(".intro__skip").click({ timeout: 3_000 });
    await expect(page.locator(".intro")).toBeHidden();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("se cierra sola al terminar", async ({ page }) => {
    await page.addInitScript(() => window.sessionStorage.removeItem("vertice:intro:v1"));
    await page.goto("/");

    await expect(page.locator(".intro")).toBeVisible();
    await expect(page.locator(".intro")).toBeHidden({ timeout: 8_000 });
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("después de la entrada, la portada queda operativa", async ({ page }) => {
    await page.addInitScript(() => window.sessionStorage.setItem("vertice:intro:v1", "1"));
    await page.goto("/", { waitUntil: "networkidle" });

    await expect(page.locator(".intro")).toBeHidden();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.mouse.wheel(0, 1200);
    await expect(page.locator("#practica")).toBeInViewport();
  });
});

test.describe("movimiento reducido", () => {
  test.use({ reducedMotion: "reduce" });

  test("la entrada no se muestra y el contenido está disponible", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator(".intro")).toBeHidden();
    await expect(page.locator("html")).toHaveAttribute("data-intro", "done");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});
