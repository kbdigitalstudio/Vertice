import type { Metadata } from "next";

const defaultTitle = "VÉRTICE — Estrategia jurídica";

export function pageMetadata({
  title,
  description,
  path,
  type = "website",
}: {
  title?: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): Metadata {
  const fullTitle = title ? `${title} — VÉRTICE` : defaultTitle;
  const metadata: Metadata = {
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: "es_ES",
      siteName: "VÉRTICE",
      title: fullTitle,
      description,
      url: path,
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
      title: fullTitle,
      description,
      images: ["/og.png"],
    },
  };

  if (title) metadata.title = title;

  return metadata;
}
