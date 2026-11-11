import { projectSlot } from "@/lib/media";
import type { Project } from "@/types";

/**
 * UYGULAMA GALERİSİ
 *
 * Aşağıdaki kayıtlar Instagram @staroto60 hesabından alınan gerçek mağaza / araç fotoğraflarıdır
 * (isDemo: false). Ek gerçek fotoğraf için public/images/projects/ altına koyup bu listeyi güncelleyin.
 */
export const DEMO_NOTE =
  "Bu kart örnek içeriktir. Gerçek uygulama fotoğrafları eklendiğinde bu alan güncellenecektir.";

const img = (id: number, kind: "cover" | "before" | "detail-a" | "detail-b", alt: string, demo = false) => {
  const slot = projectSlot(id, kind);
  return {
    src: slot.src,
    fallback: slot.fallback,
    alt: demo ? `${alt} (demo görsel)` : alt,
  };
};

export const projects: Project[] = [
  {
    id: "ford-kuga-yan-basamak",
    title: "Ford Kuga Yan Basamak",
    category: "Dış Aksesuar",
    description:
      "Star Oto Market vitrininde yan basamaklı beyaz Ford Kuga. Mağaza tabelası ve Tokat plakası görünür.",
    cover: img(1, "cover", "Star Oto Market önünde yan basamaklı beyaz Ford Kuga"),
    gallery: [img(1, "detail-a", "Star Oto Market mağaza önü ve araç detayı")],
    isDemo: false,
  },
  {
    id: "peugeot-rifter-vitrin",
    title: "Peugeot Rifter Vitrin",
    category: "Dış Aksesuar",
    description: "Mağaza tabelası önünde beyaz Peugeot Rifter — Star Oto Market Tokat.",
    cover: img(2, "cover", "Star Oto Market tabelası önünde beyaz Peugeot Rifter"),
    gallery: [],
    isDemo: false,
  },
  {
    id: "mercedes-vito-yan-basamak",
    title: "Mercedes Vito Yan Basamak",
    category: "Dış Aksesuar",
    description: "Yan basamak ve krom ayna kapaklı beyaz Mercedes Vito, mağaza önünde.",
    cover: img(3, "cover", "Star Oto Market önünde yan basamaklı beyaz Mercedes Vito"),
    gallery: [],
    isDemo: false,
  },
  {
    id: "peugeot-2008-port-bagaj",
    title: "Peugeot 2008 Port Bagaj",
    category: "Aksesuar",
    description: "Atölye içinde port bagaj montajlı gri Peugeot 2008.",
    cover: img(4, "cover", "Star Oto Market atölyesinde port bagajlı Peugeot 2008"),
    gallery: [],
    isDemo: false,
  },
  {
    id: "ford-transit-on-koruma",
    title: "Ford Transit Ön Koruma",
    category: "Dış Aksesuar",
    description: "Ön koruma demiri ve yan basamaklı siyah Ford Transit.",
    cover: img(5, "cover", "Ön koruma demirli siyah Ford Transit"),
    gallery: [img(5, "detail-a", "Krom yan basamak yakın çekimi")],
    isDemo: false,
  },
  {
    id: "magaza-tabela",
    title: "Mağaza Tabelası",
    category: "Mağaza",
    description: "STAR OTO MARKET — Aksesuar Dizayn tabelası ve mağaza önü.",
    cover: img(6, "cover", "Star Oto Market Aksesuar Dizayn tabelası ve mağaza önü"),
    gallery: [],
    isDemo: false,
  },
];

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
