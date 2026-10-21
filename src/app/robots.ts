import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/**
 * El proyecto se mantiene fuera de los índices mientras use identidad y datos
 * de demostración. Para abrir la indexación, definir
 * NEXT_PUBLIC_SITE_INDEXING=true en el entorno de producción.
 */
export default function robots(): MetadataRoute.Robots {
  const indexingEnabled = process.env.NEXT_PUBLIC_SITE_INDEXING === "true";

  if (!indexingEnabled) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
      sitemap: `${site.url}/sitemap.xml`,
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
