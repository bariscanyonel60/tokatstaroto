import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: Array<{ path: string; priority: number }> = [
    { path: "/", priority: 1 },
    { path: "/hizmetlerimiz", priority: 0.9 },
    ...services.map((s) => ({ path: `/hizmetlerimiz/${s.slug}`, priority: 0.8 })),
    { path: "/urunlerimiz", priority: 0.8 },
    { path: "/uygulamalarimiz", priority: 0.8 },
    { path: "/hakkimizda", priority: 0.6 },
    { path: "/iletisim", priority: 0.9 },
    { path: "/gizlilik", priority: 0.2 },
  ];
  return pages.map(({ path, priority }) => ({ url: absoluteUrl(path), changeFrequency: "monthly" as const, priority }));
}
