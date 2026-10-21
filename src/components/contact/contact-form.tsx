"use client";

import Link from "next/link";
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { contactConfig, site } from "@/content/site";
import { cn } from "@/lib/utils";
import {
  collectFieldErrors,
  contactSchema,
  type ContactField,
  type ContactFieldErrors,
} from "@/lib/validation/contact";
import { Arrow } from "@/components/ui";

type AreaOption = {
  value: string;
  label: string;
};

type ContactFormProps = {
  areaOptions: AreaOption[];
  initialArea?: string;
  configured: boolean;
};

type FormState = {
  name: string;
  email: string;
  phone: string;
  area: string;
  message: string;
  consent: boolean;
  website: string;
};

type Status = "idle" | "submitting" | "error" | "unavailable" | "success";

type ApiResponse = {
  ok?: boolean;
  delivered?: boolean;
  code?: string;
  message?: string;
  errors?: ContactFieldErrors;
};

const emptyForm = (area = ""): FormState => ({
  name: "",
  email: "",
  phone: "",
  area,
  message: "",
  consent: false,
  website: "",
});

export function ContactForm({ areaOptions, initialArea, configured }: ContactFormProps) {
  const initial = areaOptions.some((option) => option.value === initialArea) ? initialArea ?? "" : "";
  const [form, setForm] = useState<FormState>(emptyForm(initial));
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const busy = status === "submitting";
  const errorList = Object.entries(errors).filter(([, message]) => Boolean(message)) as Array<
    [ContactField, string]
  >;

  const updateField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (field in errors) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  const handleChange =
    (field: Exclude<keyof FormState, "consent">) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      updateField(field, event.target.value);
    };

  const focusFirstError = (fieldErrors: ContactFieldErrors) => {
    window.setTimeout(() => {
      const first = (Object.keys(fieldErrors) as ContactField[])[0];
      if (!first) return;
      const element = formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"]`);
      element?.focus();
    }, 30);
  };

  const showStatus = (next: Exclude<Status, "idle" | "submitting">, message: string) => {
    setStatus(next);
    setStatusMessage(message);
    window.setTimeout(() => {
      if (next === "success") successRef.current?.focus();
      else alertRef.current?.focus();
    }, 30);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (busy) return;

    const candidate = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      area: form.area,
      message: form.message,
      consent: form.consent,
      website: form.website,
    };

    const parsed = contactSchema.safeParse(candidate);
    if (!parsed.success) {
      const fieldErrors = collectFieldErrors(parsed.error);
      setErrors(fieldErrors);
      setStatus("error");
      setStatusMessage("Revise los campos señalados. No se ha enviado nada.");
      focusFirstError(fieldErrors);
      return;
    }

    setErrors({});
    setStatus("submitting");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const result = (await response.json().catch(() => null)) as ApiResponse | null;

      if (response.status === 503 && result?.code === "NOT_CONFIGURED") {
        showStatus(
          "unavailable",
          "El canal de recepción no está conectado en este entorno. Su mensaje no se ha enviado ni almacenado.",
        );
        return;
      }

      if (response.status === 400 && result?.errors) {
        setErrors(result.errors);
        setStatus("error");
        setStatusMessage("Hay campos que necesitan revisión. No se ha enviado nada.");
        focusFirstError(result.errors);
        return;
      }

      if (response.status === 429) {
        showStatus(
          "unavailable",
          result?.message ?? "Demasiados intentos. Espere unos minutos antes de volver a probar.",
        );
        return;
      }

      if (!response.ok) {
        showStatus(
          "error",
          result?.message ??
            "El servicio de recepción no está disponible. No se ha enviado nada. Inténtelo de nuevo.",
        );
        return;
      }

      if (result?.ok && result.delivered) {
        setForm(emptyForm());
        setErrors({});
        showStatus("success", "Mensaje recibido. Gracias por escribirnos.");
        return;
      }

      showStatus(
        "unavailable",
        "No se ha podido confirmar la recepción del mensaje. No se ha enviado nada.",
      );
    } catch {
      showStatus(
        "error",
        "No se ha podido conectar con el servicio de recepción. No se ha enviado nada. Inténtelo de nuevo.",
      );
    }
  };

  if (status === "success") {
    return (
      <div
        className="form-success"
        ref={successRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
      >
        <span className="form-success__mark" aria-hidden="true">
          ✓
        </span>
        <p className="form-success__eyebrow">Recepción confirmada</p>
        <h3>Hemos recibido su mensaje.</h3>
        <p>{statusMessage}</p>
        <p className="form-success__note">
          No envíe documentación adicional por correo electrónico hasta que el equipo le indique
          un canal seguro.
        </p>
        <button
          type="button"
          className="button button--outline"
          onClick={() => {
            setStatus("idle");
            setStatusMessage("");
            setForm(emptyForm(initial));
          }}
        >
          <span className="button__label">Enviar otra consulta</span>
          <Arrow className="button__arrow" />
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      className="contact-form"
      noValidate
      onSubmit={handleSubmit}
      aria-busy={busy}
      aria-describedby="form-privacy-note"
    >
      {!configured ? (
        <div className="form-demo" role="note">
          <span className="status-dot" aria-hidden="true" />
          <div>
            <p className="form-demo__title">Modo demostración</p>
            <p>
              El canal de recepción no está conectado. El formulario permite comprobar la
              validación, pero <strong>no enviará ningún mensaje</strong>.
            </p>
          </div>
        </div>
      ) : null}

      {status === "error" || status === "unavailable" ? (
        <div
          className={cn("form-alert", status === "unavailable" ? "form-alert--notice" : "form-alert--error")}
          role="alert"
          tabIndex={-1}
          ref={alertRef}
        >
          <p className="form-alert__title">
            {status === "unavailable" ? "Envío no disponible" : "No se ha enviado"}
          </p>
          <p>{statusMessage}</p>
          {errorList.length > 0 ? (
            <ul>
              {errorList.map(([field, message]) => (
                <li key={field}>
                  <a href={`#field-${field}`}>{message}</a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}

      <div className="contact-form__row">
        <div className={cn("field", errors.name && "has-error")}>
          <label htmlFor="field-name">
            Nombre y apellidos <span aria-hidden="true">*</span>
          </label>
          <input
            id="field-name"
            name="name"
            data-field="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={handleChange("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "error-name" : undefined}
            required
          />
          {errors.name ? (
            <p className="field__error" id="error-name">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className={cn("field", errors.email && "has-error")}>
          <label htmlFor="field-email">
            Correo electrónico <span aria-hidden="true">*</span>
          </label>
          <input
            id="field-email"
            name="email"
            data-field="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "error-email" : undefined}
            required
          />
          {errors.email ? (
            <p className="field__error" id="error-email">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className="contact-form__row">
        <div className={cn("field", errors.phone && "has-error")}>
          <label htmlFor="field-phone">
            Teléfono <span className="field__optional">(opcional)</span>
          </label>
          <input
            id="field-phone"
            name="phone"
            data-field="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={handleChange("phone")}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "error-phone" : undefined}
          />
          {errors.phone ? (
            <p className="field__error" id="error-phone">
              {errors.phone}
            </p>
          ) : null}
        </div>

        <div className={cn("field field--select", errors.area && "has-error")}>
          <label htmlFor="field-area">
            Área de interés <span aria-hidden="true">*</span>
          </label>
          <select
            id="field-area"
            name="area"
            data-field="area"
            value={form.area}
            onChange={handleChange("area")}
            aria-invalid={Boolean(errors.area)}
            aria-describedby={errors.area ? "error-area" : undefined}
            required
          >
            <option value="">Seleccione un área</option>
            {areaOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
            <option value="no-estoy-seguro">Aún no lo sé</option>
          </select>
          {errors.area ? (
            <p className="field__error" id="error-area">
              {errors.area}
            </p>
          ) : null}
        </div>
      </div>

      <div className={cn("field field--message", errors.message && "has-error")}>
        <label htmlFor="field-message">
          ¿Qué necesita ordenar? <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="field-message"
          name="message"
          data-field="message"
          rows={5}
          value={form.message}
          onChange={handleChange("message")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "error-message message-hint" : "message-hint"}
          required
        />
        <div className="field__meta">
          <p id="message-hint">
            Describa el contexto sin incluir datos confidenciales, nombres de terceros ni
            documentación sensible.
          </p>
          <span aria-hidden="true">{form.message.length} / 4000</span>
        </div>
        {errors.message ? (
          <p className="field__error" id="error-message">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className={cn("consent", errors.consent && "has-error")}>
        <input
          id="field-consent"
          name="consent"
          data-field="consent"
          type="checkbox"
          checked={form.consent}
          onChange={(event) => updateField("consent", event.target.checked)}
          aria-invalid={Boolean(errors.consent)}
          aria-describedby={errors.consent ? "error-consent" : undefined}
          required
        />
        <label htmlFor="field-consent">
          He leído la{" "}
          <Link href={contactConfig.privacyPath} target="_blank" rel="noopener noreferrer">
            información sobre el tratamiento de datos
          </Link>{" "}
          y acepto que la firma me contacte en relación con esta consulta.
        </label>
        {errors.consent ? (
          <p className="field__error" id="error-consent">
            {errors.consent}
          </p>
        ) : null}
      </div>

      <input
        type="text"
        name="website"
        value={form.website}
        onChange={handleChange("website")}
        className="honeypot"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="contact-form__bottom">
        <p id="form-privacy-note" className="contact-form__privacy">
          Los campos marcados con * son obligatorios. No envíe documentación confidencial en este
          primer mensaje.
          {site.demo ? " Los datos de contacto de esta demostración son ficticios." : ""}
        </p>
        <button type="submit" className="button button--solid contact-form__submit" disabled={busy}>
          <span className="button__label">{busy ? "Enviando…" : "Enviar consulta"}</span>
          <Arrow className="button__arrow" />
        </button>
      </div>

      <noscript>
        <p className="form-noscript">
          El formulario interactivo necesita JavaScript. Puede consultar los datos de contacto que
          figuran en esta página.
        </p>
      </noscript>
    </form>
  );
}
