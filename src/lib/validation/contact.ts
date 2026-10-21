import { z } from "zod";

export const contactMessageMin = 20;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Indique su nombre (mínimo 2 caracteres).")
    .max(120, "El nombre no puede superar los 120 caracteres."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Indique un correo electrónico.")
    .max(254, "El correo no puede superar los 254 caracteres.")
    .email("Introduzca un correo electrónico válido."),
  phone: z
    .string()
    .trim()
    .max(40, "El teléfono no puede superar los 40 caracteres.")
    .regex(/^[0-9+().\s-]*$/, "El teléfono solo puede contener números y signos de marcación.")
    .optional()
    .or(z.literal("")),
  area: z.string().trim().min(1, "Seleccione un área de interés.").max(80),
  message: z
    .string()
    .trim()
    .min(contactMessageMin, `Describa brevemente su consulta (mínimo ${contactMessageMin} caracteres).`)
    .max(4000, "El mensaje no puede superar los 4.000 caracteres."),
  consent: z
    .boolean()
    .refine((value) => value === true, {
      message: "Debe aceptar la información sobre el tratamiento de datos.",
    }),
  website: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactField = "name" | "email" | "phone" | "area" | "message" | "consent";

export type ContactFieldErrors = Partial<Record<ContactField, string>>;

export function collectFieldErrors(error: z.ZodError): ContactFieldErrors {
  const errors: ContactFieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key !== "string") continue;
    if (!(key in errors)) {
      errors[key as ContactField] = issue.message;
    }
  }
  return errors;
}

export const contactAreaValues = [
  "derecho-corporativo",
  "litigios",
  "derecho-inmobiliario",
  "derecho-contractual",
  "proteccion-patrimonial",
  "consultoria-estrategica",
  "no-estoy-seguro",
] as const;

export type ContactArea = (typeof contactAreaValues)[number];

export function isContactArea(value: string): value is ContactArea {
  return (contactAreaValues as readonly string[]).includes(value);
}
