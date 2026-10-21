export type NavItem = {
  label: string;
  href: string;
  shortLabel: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

/**
 * Configuración central de la firma.
 *
 * Todo lo que aparece aquí es sustituible. Mientras `demo` sea true, la
 * interfaz señala explícitamente que los datos son ficticios y no genera
 * enlaces mailto/tel que puedan llevar a terceros.
 */
export const site = {
  name: "VÉRTICE",
  legalName: "VÉRTICE Estrategia Jurídica",
  descriptor: "Estrategia jurídica",
  tagline: "La ley establece el marco. La estrategia define el resultado.",
  claim: "Derecho, criterio y decisión.",
  description:
    "Bufete conceptual de estrategia jurídica. Acompañamos decisiones empresariales y patrimoniales con análisis riguroso, criterio propio y una ejecución precisa.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  email: "consulta@vertice.example",
  phone: "+34 000 000 000",
  phoneHref: "+34000000000",
  location: "Madrid · España",
  address: null as string | null,
  hours: "Lunes a viernes · 09:00–19:00 CET",
  social: [] as SocialLink[],
  languages: [{ code: "es", label: "Español", current: true }],
  demo: true,
  demoLabel: "Proyecto conceptual",
  demoNotice:
    "VÉRTICE es una identidad provisional. Los perfiles, las áreas de práctica y los datos de contacto son ficticios y deben validarse antes de cualquier uso comercial.",
  nav: [
    { label: "Inicio", shortLabel: "Inicio", href: "/" },
    { label: "La firma", shortLabel: "Firma", href: "/la-firma" },
    { label: "Áreas de práctica", shortLabel: "Práctica", href: "/areas-de-practica" },
    { label: "Perspectivas", shortLabel: "Perspectivas", href: "/perspectivas" },
    { label: "Contacto", shortLabel: "Contacto", href: "/contacto" },
  ] satisfies NavItem[],
} as const;

export const contactConfig = {
  privacyPath: "/legal/privacidad",
  dataPath: "/legal/tratamiento-de-datos",
  legalPath: "/legal/aviso-legal",
} as const;
