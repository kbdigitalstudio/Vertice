import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VÉRTICE — Estrategia jurídica",
    short_name: "VÉRTICE",
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#111315",
    theme_color: "#111315",
    lang: "es",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
