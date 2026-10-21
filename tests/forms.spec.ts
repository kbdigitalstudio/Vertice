import { expect, test, type Page } from "@playwright/test";
import { skipIntro } from "./helpers";

async function fillValidForm(page: Page) {
  await page.locator("#field-name").fill("Ana Martín");
  await page.locator("#field-email").fill("ana.martin@example.com");
  await page.locator("#field-area").selectOption("litigios");
  await page
    .locator("#field-message")
    .fill("Necesito ordenar el contexto de una reclamación contractual antes de decidir los siguientes pasos.");
  await page.locator("#field-consent").check();
}

test.describe("formulario de contacto", () => {
  test.beforeEach(async ({ page }) => {
    await skipIntro(page);
    await page.goto("/contacto");
  });

  test("muestra el modo demostración sin prometer un envío", async ({ page }) => {
    await expect(page.getByText("Modo demostración")).toBeVisible();
    await expect(page.getByText(/no enviará ningún mensaje/i)).toBeVisible();
    await expect(page.locator(".form-alert")).toHaveCount(0);
    await expect(page.locator(".form-success")).toHaveCount(0);
  });

  test("la validación vacía señala campos, enfoca el primero y no envía nada", async ({ page }) => {
    await page.getByRole("button", { name: "Enviar consulta" }).click();

    const alert = page.locator(".form-alert");
    await expect(alert).toBeVisible();
    await expect(alert).toContainText("No se ha enviado");
    await expect(alert).toContainText("Revise los campos señalados");
    await expect(page.locator("#error-name")).toBeVisible();
    await expect(page.locator("#error-email")).toBeVisible();
    await expect(page.locator("#error-area")).toBeVisible();
    await expect(page.locator("#error-message")).toBeVisible();
    await expect(page.locator("#error-consent")).toBeVisible();
    await expect(page.locator("#field-name")).toBeFocused();
    await expect(page.locator("#field-name")).toHaveAttribute("aria-invalid", "true");
    await expect(page.locator("#field-name")).toHaveAttribute("aria-describedby", "error-name");
    await expect(page.locator(".form-success")).toHaveCount(0);
  });

  test("rechaza un correo inválido y un mensaje demasiado corto", async ({ page }) => {
    await page.locator("#field-name").fill("Ana Martín");
    await page.locator("#field-email").fill("ana@");
    await page.locator("#field-area").selectOption("litigios");
    await page.locator("#field-message").fill("Corto");
    await page.locator("#field-consent").check();
    await page.getByRole("button", { name: "Enviar consulta" }).click();

    await expect(page.locator("#error-email")).toContainText("correo electrónico válido");
    await expect(page.locator("#error-message")).toContainText("mínimo 20 caracteres");
    await expect(page.locator(".form-alert")).toContainText("No se ha enviado");
    await expect(page.locator("#field-email")).toBeFocused();
  });

  test("un envío válido sin webhook informa de que no se ha transmitido", async ({ page }) => {
    await fillValidForm(page);

    const [response] = await Promise.all([
      page.waitForResponse(
        (candidate) =>
          candidate.url().includes("/api/contacto") && candidate.request().method() === "POST",
      ),
      page.getByRole("button", { name: "Enviar consulta" }).click(),
    ]);

    expect(response.status()).toBe(503);
    const body = (await response.json()) as { code?: string };
    expect(body.code).toBe("NOT_CONFIGURED");

    const alert = page.locator(".form-alert");
    await expect(alert).toBeVisible();
    await expect(alert).toContainText("Envío no disponible");
    await expect(alert).toContainText("no está conectado en este entorno");
    await expect(alert).toContainText("no se ha enviado ni almacenado");
    await expect(page.locator(".form-success")).toHaveCount(0);
  });

  test("un error del servicio no se presenta como éxito", async ({ page }) => {
    await page.route("**/api/contacto", (route) =>
      route.fulfill({
        status: 502,
        contentType: "application/json",
        body: JSON.stringify({ ok: false, code: "UPSTREAM_ERROR" }),
      }),
    );

    await fillValidForm(page);
    await page.getByRole("button", { name: "Enviar consulta" }).click();

    await expect(page.locator(".form-alert")).toContainText("No se ha enviado");
    await expect(page.locator(".form-success")).toHaveCount(0);
  });

  test("el éxito solo aparece con confirmación del servidor", async ({ page }) => {
    await page.route("**/api/contacto", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true, delivered: true }),
      }),
    );

    await fillValidForm(page);
    await page.getByRole("button", { name: "Enviar consulta" }).click();

    const success = page.locator(".form-success");
    await expect(success).toBeVisible();
    await expect(success).toContainText("Hemos recibido su mensaje");
    await expect(success).toBeFocused();

    await page.getByRole("button", { name: "Enviar otra consulta" }).click();
    await expect(page.locator("#field-name")).toHaveValue("");
    await expect(page.locator(".form-success")).toHaveCount(0);
  });

  test("preselecciona el área recibida por consulta", async ({ page }) => {
    await page.goto("/contacto?area=proteccion-patrimonial");
    await expect(page.locator("#field-area")).toHaveValue("proteccion-patrimonial");
  });

  test("descarta un área desconocida sin romper el formulario", async ({ page }) => {
    await page.goto("/contacto?area=inventada");
    await expect(page.locator("#field-area")).toHaveValue("");
  });
});

test.describe("consulta guiada", () => {
  test.beforeEach(async ({ page }) => {
    await skipIntro(page);
    await page.goto("/consulta-guiada");
  });

  test("recorre los tres pasos, permite volver y cambia respuestas", async ({ page }) => {
    const widget = page.getByTestId("guided-consultation");
    const next = widget.getByRole("button", { name: "Continuar" });
    await expect(widget).toBeVisible();
    await expect(next).toBeDisabled();
    await expect(widget).toContainText("Paso 01 / 03");

    await widget.locator("label.choice").filter({ hasText: "Derecho corporativo" }).click();
    await next.click();
    await expect(widget).toContainText("Paso 02 / 03");

    await widget.getByRole("button", { name: "Volver" }).click();
    await expect(widget).toContainText("Paso 01 / 03");
    await expect(widget.getByRole("radio", { name: /Derecho corporativo/ })).toBeChecked();

    await next.click();
    await widget.locator("label.choice").filter({ hasText: "Todavía estoy decidiendo" }).click();
    await next.click();
    await expect(widget).toContainText("Paso 03 / 03");

    await widget.locator("label.choice").filter({ hasText: "Empresa o grupo" }).click();
    await widget.getByRole("button", { name: "Ver orientación" }).click();

    const result = page.getByTestId("guided-result");
    await expect(result).toBeVisible();
    await expect(result).toContainText("Orientación");
    await expect(result).toContainText("no constituye un diagnóstico jurídico");
    await expect(result.locator('a[href^="/contacto?area="]')).toBeVisible();

    await result.getByRole("button", { name: "Cambiar respuestas" }).click();
    await expect(widget).toContainText("Paso 01 / 03");
    await expect(widget.getByRole("radio", { name: /Derecho corporativo/ })).not.toBeChecked();
  });

  test("la opción sin área concreta conduce a consultoría estratégica", async ({ page }) => {
    const widget = page.getByTestId("guided-consultation");
    await widget.locator("label.choice").filter({ hasText: "Todavía no lo tengo claro" }).click();
    await widget.getByRole("button", { name: "Continuar" }).click();
    await widget.locator("label.choice").filter({ hasText: "La decisión está tomada" }).click();
    await widget.getByRole("button", { name: "Continuar" }).click();
    await widget.locator("label.choice").filter({ hasText: "Institución o fondo" }).click();
    await widget.getByRole("button", { name: "Ver orientación" }).click();

    const result = page.getByTestId("guided-result");
    await expect(result).toContainText("Consultoría jurídica estratégica");
    await expect(result.locator('a[href="/contacto?area=consultoria-estrategica#formulario"]')).toBeVisible();
  });

  test("se puede salir sin completar la secuencia", async ({ page }) => {
    const widget = page.getByTestId("guided-consultation");
    await expect(widget.getByRole("link", { name: "Salir" })).toHaveAttribute("href", "/contacto");
    await widget.getByRole("link", { name: "Salir" }).click();
    await expect(page).toHaveURL(/\/contacto$/);
  });
});
