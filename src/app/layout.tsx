import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { IntroSequence } from "@/components/intro/intro-sequence";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/content/site";
import "./globals.css";

const display = localFont({
  src: [
    { path: "../fonts/bodoni-normal.woff2", weight: "400 900", style: "normal" },
    { path: "../fonts/bodoni-italic.woff2", weight: "400 900", style: "italic" },
  ],
  variable: "--font-display",
  display: "swap",
  preload: true,
  fallback: ["Georgia", "Times New Roman", "serif"],
});

const sans = localFont({
  src: [
    { path: "../fonts/instrument-normal.woff2", weight: "400 700", style: "normal" },
    { path: "../fonts/instrument-italic.woff2", weight: "400 700", style: "italic" },
  ],
  variable: "--font-sans",
  display: "swap",
  preload: true,
  fallback: ["ui-sans-serif", "system-ui", "Segoe UI", "Helvetica", "Arial", "sans-serif"],
});

const indexingEnabled = process.env.NEXT_PUBLIC_SITE_INDEXING === "true";

const introBootstrap = `
(function () {
  try {
    var seen = window.sessionStorage.getItem("vertice:intro:v1");
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.dataset.intro = (seen || reduced) ? "done" : "playing";
  } catch (error) {
    document.documentElement.dataset.intro = "playing";
  }
})();
`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "VÉRTICE — Estrategia jurídica",
    template: "%s — VÉRTICE",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  formatDetection: { telephone: false, address: false, email: false },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: site.name,
    title: "VÉRTICE — Estrategia jurídica",
    description: site.description,
    url: "/",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "VÉRTICE — Estrategia jurídica",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VÉRTICE — Estrategia jurídica",
    description: site.description,
    images: ["/og.png"],
  },
  robots: indexingEnabled
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      }
    : {
        index: false,
        follow: false,
        nocache: true,
        googleBot: { index: false, follow: false },
      },
  category: "legal",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#E9E4DA" },
    { media: "(prefers-color-scheme: dark)", color: "#111315" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${display.variable} ${sans.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introBootstrap }} />
        <noscript>
          <style>{`.intro{display:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <a href="#contenido" className="skip-link">
          Saltar al contenido
        </a>
        <IntroSequence />
        <SiteHeader />
        <main id="contenido" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
