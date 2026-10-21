# VÉRTICE

Sitio conceptual de estrategia jurídica: una experiencia editorial, sobria y accesible construida con Next.js. La identidad, los perfiles, las áreas de práctica y los datos de contacto son **material de demostración** y deben sustituirse antes de cualquier uso comercial.

## Stack

- Next.js 16 (App Router, Turbopack) y React 19.
- TypeScript en modo estricto.
- CSS propio por capas, sin framework de UI ni librería de animación.
- Tipografías autoalojadas con `next/font/local`: Bodoni Moda e Instrument Sans.
- Zod para validación compartida entre cliente y servidor.
- Playwright y axe-core para pruebas end-to-end y de accesibilidad.
- Sharp para el tratamiento local de imágenes.

## Puesta en marcha

Requisitos: Node.js 20.9 o superior (el proyecto se ha validado con Node 24) y npm.

```bash
npm install
cp .env.example .env.local   # en PowerShell: Copy-Item .env.example .env.local
npm run dev
```

Abrir `http://localhost:3000`.

Para probar el build de producción:

```bash
npm run build
npm start -- -p 3100
```

El puerto 3100 es el que usa Playwright por defecto para no chocar con un servidor de desarrollo en el 3000.

## Scripts

| Script | Función |
| --- | --- |
| `npm run dev` | Servidor de desarrollo. |
| `npm run build` | Build de producción y generación estática. |
| `npm start` | Sirve el build. |
| `npm run lint` | ESLint sobre todo el repositorio. |
| `npm run typecheck` | Genera tipos de rutas y ejecuta `tsc --noEmit`. |
| `npm run test:e2e` | Suite completa de Playwright. |
| `npm run screenshots` | Genera las capturas de `screenshots/`. |
| `npm run og` | Regenera `public/og.png` con Chromium y las fuentes locales. |

Las pruebas y el generador de OG necesitan Chromium de Playwright:

```bash
npx playwright install chromium
```

## Variables de entorno

| Variable | Ámbito | Descripción |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Público | URL canónica sin barra final. Se usa en metadatos, sitemap y comprobación de origen. |
| `NEXT_PUBLIC_SITE_INDEXING` | Público | `true` habilita indexación. Cualquier otro valor mantiene `noindex, nofollow`. |
| `CONTACT_WEBHOOK_URL` | Servidor | Endpoint que recibe el POST JSON del formulario. Sin él, el formulario permanece en modo demostración. |
| `CONTACT_WEBHOOK_TOKEN` | Servidor | Opcional. Se envía como `Authorization: Bearer <token>`. No debe llevar prefijo `NEXT_PUBLIC_`. |

### Comportamiento sin webhook

Si `CONTACT_WEBHOOK_URL` no está definida:

1. La interfaz muestra un aviso de modo demostración y advierte de que no se enviará nada.
2. La API responde `503` con `{ ok: false, code: "NOT_CONFIGURED" }`.
3. El formulario muestra un estado de error honesto; **nunca simula un envío correcto**.
4. No se registran datos personales en logs.

### Contrato del webhook

El endpoint debe aceptar `POST` con `Content-Type: application/json` y responder un estado `2xx` para confirmar la recepción. Cuerpo enviado:

```json
{
  "source": "vertice-contact-form",
  "submittedAt": "2026-09-18T09:00:00.000Z",
  "name": "Nombre",
  "email": "nombre@dominio.com",
  "phone": null,
  "area": "derecho-corporativo",
  "areaLabel": "Derecho corporativo y comercial",
  "message": "Contexto de la consulta",
  "consent": true
}
```

Cualquier respuesta no `2xx`, un timeout de 8 segundos o un fallo de red se traduce en un error visible para la persona usuaria. El servidor aplica comprobación de origen, límite de cuerpo, campo trampa y un límite de 5 peticiones por IP en memoria. Ese límite es **best-effort y por instancia**; en producción conviene sustituirlo por un almacén compartido (Redis, Upstash, etc.).

## Arquitectura

```text
src/
  app/                 Rutas, metadatos, sitemap, robots y API de contacto
  components/          Header, footer, home, experiencias, formularios y UI
  content/             Identidad, prácticas, perspectivas, firma, legal y créditos
  fonts/               WOFF2 autoalojados
  lib/                 Metadatos, validación, rate limit y utilidades
  styles/              base, chrome, home, pages-a, pages-b y responsive
tests/                 Rutas, enlaces, overflow, intro, navegación, formularios,
                       accesibilidad y capturas
scripts/               Generador reproducible de la imagen Open Graph
public/                Imágenes, OG e iconos
screenshots/           Evidencia visual generada por Playwright
```

### Contenido centralizado

- `src/content/site.ts`: nombre, descriptor, claim, email, teléfono, ubicación, horario, navegación y aviso de demostración.
- `src/content/practices.ts`: seis áreas, sus descripciones, servicios, metodología y metadatos.
- `src/content/perspectives.ts`: artículos, categorías, fechas y relaciones.
- `src/content/firm.ts`: principios, método y perfiles del equipo.
- `src/content/legal.ts`: textos legales provisionales.
- `src/content/credits.ts`: atribuciones de fotografía y tipografía.

Las rutas de prácticas, artículos, categorías y páginas legales se generan con `generateStaticParams`. Añadir una entrada en el contenido crea la página, la incluye en el sitemap y la enlaza desde los índices correspondientes.

### Estilos

`src/app/globals.css` importa seis capas:

1. `base.css`: tokens, reset, tipografía, header, intro, hero y utilidades.
2. `chrome.css`: footer, masthead interior y metadatos compartidos.
3. `home.css`: secciones de portada y experiencias.
4. `pages-a.css`: firma, prácticas y perspectivas.
5. `pages-b.css`: artículo, contacto, consulta guiada, legal, créditos y estados.
6. `responsive.css`: adaptaciones por ancho, movimiento reducido e impresión.

Paleta: obsidiana `#111315`, marfil `#E9E4DA`, acero `#777C78` y bronce apagado `#8E6E4A`. Los textos secundarios sobre fondos claros usan `--steel-text` para mantener contraste AA.

### Interacciones

- **Introducción “La geometría de la ley”**: SVG dibujado en 3–4 segundos, omisible con botón y `Escape`, una vez por sesión (`sessionStorage`), versión ligera en móvil y desactivada con `prefers-reduced-motion`. No usa vídeo. Si JavaScript falla, el `noscript` oculta la capa.
- **Mapa de estrategia**: cinco etapas navegables con teclado, sin promesas de resultado.
- **Explorador de prácticas**: seis áreas con panel visual y enlaces a cada página.
- **Consulta guiada**: tres pasos con volver, cambiar respuesta y salir; el resultado es orientativo y no constituye diagnóstico jurídico.
- **Formulario de contacto**: validación accesible, resumen de errores, foco en el primer campo inválido, contador de caracteres, consentimiento explícito y estados de error/servicio no configurado.

## Accesibilidad y movimiento

- Enlace “Saltar al contenido”, landmarks, un único `h1` por página y orden de encabezados coherente.
- Menú móvil con `dialog`, trampa de foco, `Escape`, cierre al navegar y `inert` sobre el resto del documento.
- Foco visible, estados `aria-invalid`/`aria-describedby` y regiones de estado con `role="status"`/`role="alert"`.
- Animaciones desactivadas o reducidas con `prefers-reduced-motion`.
- Sin overflow horizontal en 360, 390, 430, 768, 1024, 1280, 1440 y 1920 px (cubierto por pruebas).
- Auditoría axe WCAG 2.2 A/AA sobre las rutas principales y el menú móvil abierto.

## SEO y privacidad

- Metadatos, canonical, Open Graph y Twitter Card en todas las páginas.
- `sitemap.xml`, `robots.txt`, manifest e icono SVG.
- La indexación está **desactivada por defecto**. Solo se activa con `NEXT_PUBLIC_SITE_INDEXING=true`, y no debería hacerse hasta sustituir los datos ficticios y revisar los textos legales.
- No se incluye JSON-LD de tipo `LegalService` porque no existen datos verificados de una firma real.
- No hay analítica, cookies publicitarias ni píxeles de seguimiento.
- Cabeceras de seguridad en `next.config.ts`: `nosniff`, `SAMEORIGIN`, `strict-origin-when-cross-origin` y Permissions Policy restrictiva.

## Pruebas

Con el build hecho y el servidor en el puerto 3100 (o dejando que Playwright lo arranque):

```bash
npm run build
npm run test:e2e
```

Cobertura:

- Todas las rutas públicas, enlaces internos y ausencia de errores de consola/hidratación.
- Overflow horizontal en ocho anchos.
- Introducción: aparición, omisión, `Escape`, persistencia por sesión y movimiento reducido.
- Menú móvil: teclado, foco, `Escape`, cierre al navegar y touch.
- Formulario: campos obligatorios, email inválido, consentimiento, contador, modo demostración y respuesta `503`.
- Consulta guiada: tres pasos, volver, cambiar respuesta y salir.
- axe-core en rutas principales y menú abierto.

Las capturas se regeneran con:

```bash
npm run screenshots
```

## Capturas

| Archivo | Contenido |
| --- | --- |
| `screenshots/01-intro-desktop.png` | Introducción en curso. |
| `screenshots/02-home-desktop-hero.png` | Hero de escritorio. |
| `screenshots/03-home-desktop-full.png` | Portada completa. |
| `screenshots/04-practice-desktop-full.png` | Página de práctica. |
| `screenshots/05-contact-desktop-full.png` | Contacto. |
| `screenshots/06-article-desktop-full.png` | Artículo. |
| `screenshots/07-perspectives-desktop-full.png` | Índice de perspectivas. |
| `screenshots/08-home-mobile-hero.png` | Hero móvil. |
| `screenshots/09-mobile-menu.png` | Menú móvil abierto. |
| `screenshots/10-mobile-form.png` | Formulario móvil. |
| `screenshots/11-mobile-contact-full.png` | Contacto móvil completo. |

## Créditos y material de demostración

- Fotografías: `o palsson` y `seier+seier`, CC BY 2.0, vía Flickr. Son imágenes de arquitectura, no instalaciones ni oficinas de la firma. Atribuciones completas en `/creditos`.
- Tipografías: Bodoni Moda e Instrument Sans, SIL Open Font License 1.1.
- El nombre VÉRTICE, los perfiles del equipo, las direcciones, el teléfono y el correo son ficticios. No representan credenciales, colegiación, premios ni resultados profesionales.
- Los artículos son textos editoriales de demostración, no noticias ni asesoramiento jurídico.

## Pendientes antes de un uso real

1. Sustituir identidad, equipo, biografías, credenciales, dirección, teléfono y correo por datos verificados.
2. Revisar y validar los textos legales (privacidad, tratamiento de datos y aviso legal) con asesoramiento profesional.
3. Conectar `CONTACT_WEBHOOK_URL` a un CRM o proveedor de correo, definir retención y sustituir el rate limit en memoria.
4. Añadir protección antispam adicional si el volumen lo requiere.
5. Sustituir las fotografías de demostración por imágenes propias o licenciadas y actualizar créditos.
6. Definir la política de analítica (si la hubiera) y actualizar la información de privacidad.
7. Activar `NEXT_PUBLIC_SITE_INDEXING` solo después de los pasos anteriores.
8. Revisar fechas, categorías y enlaces editoriales.

## Estado

Repositorio: <https://github.com/kbdigitalstudio/Vertice>

Proyecto conceptual publicado como código fuente en GitHub. Sin despliegue, sin integración de datos reales y sin dominio publicado. La indexación permanece desactivada por defecto.
