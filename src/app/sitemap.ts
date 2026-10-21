import type { MetadataRoute } from "next";
import { legalPages } from "@/content/legal";
import { perspectives, categories } from "@/content/perspectives";
import { practices } from "@/content/practices";
import { site } from "@/content/site";

const staticRoutes: Array<{ path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }> = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/la-firma", priority: 0.9, changeFrequency: "monthly" },
  { path: "/areas-de-practica", priority: 0.9, changeFrequency: "monthly" },
  { path: "/perspectivas", priority: 0.8, changeFrequency: "weekly" },
  { path: "/consulta-guiada", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contacto", priority: 0.8, changeFrequency: "yearly" },
  { path: "/creditos", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...practices.map((practice) => ({
      url: `${site.url}/areas-de-practica/${practice.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...perspectives.map((article) => ({
      url: `${site.url}/perspectivas/${article.slug}`,
      lastModified: new Date(`${article.date}T12:00:00Z`),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...categories.map((category) => ({
      url: `${site.url}/perspectivas/categoria/${category.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.4,
    })),
    ...legalPages.map((page) => ({
      url: `${site.url}/legal/${page.slug}`,
      lastModified: new Date(`${page.updated}T12:00:00Z`),
      changeFrequency: "yearly" as const,
      priority: 0.2,
    })),
  ];
}
