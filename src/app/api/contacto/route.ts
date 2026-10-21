import { NextResponse } from "next/server";
import { getPractice } from "@/content/practices";
import { site } from "@/content/site";
import { rateLimit } from "@/lib/rate-limit";
import {
  collectFieldErrors,
  contactSchema,
  isContactArea,
} from "@/lib/validation/contact";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const maxBodyBytes = 20_000;
const noStore = { "Cache-Control": "no-store, max-age=0" };

function response(body: unknown, status = 200, extraHeaders: Record<string, string> = {}) {
  return NextResponse.json(body, {
    status,
    headers: { ...noStore, ...extraHeaders },
  });
}

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

function originAllowed(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  const allowed = new Set<string>();
  try {
    allowed.add(new URL(request.url).origin);
  } catch {
    // Sin origen de petición válido, solo se admite el sitio configurado.
  }
  try {
    allowed.add(new URL(site.url).origin);
  } catch {
    // site.url inválida: no añade un origen adicional.
  }
  return allowed.has(origin);
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return response({ ok: false, code: "BAD_CONTENT_TYPE" }, 415);
  }

  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(contentLength) && contentLength > maxBodyBytes) {
    return response({ ok: false, code: "PAYLOAD_TOO_LARGE" }, 413);
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return response({ ok: false, code: "INVALID_JSON" }, 400);
  }

  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
    return response({ ok: false, code: "INVALID_BODY" }, 400);
  }

  const payload = raw as Record<string, unknown>;

  // Campo trampa: un humano no lo ve ni lo completa.
  if (typeof payload.website === "string" && payload.website.trim().length > 0) {
    return response({ ok: true, delivered: false });
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    return response(
      {
        ok: false,
        code: "NOT_CONFIGURED",
        message:
          "El envío no está configurado en este entorno. No se ha transmitido ningún dato.",
      },
      503,
    );
  }

  if (!originAllowed(request)) {
    return response({ ok: false, code: "ORIGIN_NOT_ALLOWED" }, 403);
  }

  const limited = rateLimit(`contact:${clientKey(request)}`, { limit: 5 });
  if (!limited.allowed) {
    return response(
      { ok: false, code: "RATE_LIMITED", message: "Demasiados intentos. Inténtelo más tarde." },
      429,
      { "Retry-After": String(limited.retryAfterSeconds) },
    );
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return response(
      {
        ok: false,
        code: "VALIDATION_ERROR",
        errors: collectFieldErrors(parsed.error),
      },
      400,
    );
  }

  const data = parsed.data;
  if (!isContactArea(data.area)) {
    return response(
      {
        ok: false,
        code: "VALIDATION_ERROR",
        errors: { area: "Seleccione un área de interés válida." },
      },
      400,
    );
  }

  const areaLabel =
    data.area === "no-estoy-seguro"
      ? "Aún no lo tengo claro"
      : (getPractice(data.area)?.title ?? data.area);

  const outbound = {
    source: "vertice-contact-form",
    submittedAt: new Date().toISOString(),
    name: data.name,
    email: data.email,
    phone: data.phone || null,
    area: data.area,
    areaLabel,
    message: data.message,
    consent: true,
  };

  try {
    const upstream = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.CONTACT_WEBHOOK_TOKEN
          ? { Authorization: `Bearer ${process.env.CONTACT_WEBHOOK_TOKEN}` }
          : {}),
      },
      body: JSON.stringify(outbound),
      signal: AbortSignal.timeout(8_000),
      cache: "no-store",
    });

    if (!upstream.ok) {
      console.error("[contact] El webhook rechazó el envío", { status: upstream.status });
      return response(
        {
          ok: false,
          code: "UPSTREAM_ERROR",
          message: "El servicio de recepción no ha aceptado el mensaje. Inténtelo de nuevo.",
        },
        502,
      );
    }
  } catch {
    console.error("[contact] No se pudo contactar con el webhook");
    return response(
      {
        ok: false,
        code: "UPSTREAM_UNAVAILABLE",
        message: "El servicio de recepción no está disponible. Inténtelo de nuevo.",
      },
      502,
    );
  }

  return response({ ok: true, delivered: true });
}

export function GET() {
  return response({ ok: false, code: "METHOD_NOT_ALLOWED" }, 405, { Allow: "POST" });
}
