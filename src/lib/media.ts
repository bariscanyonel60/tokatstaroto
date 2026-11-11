/**
 * Gerçek fotoğraf slotları → demo SVG yedekleri.
 * Dosya henüz yüklenmemişse SmartImage `fallback` ile kırık görsel göstermez.
 */

export type MediaSlot = {
  /** Tercih edilen gerçek fotoğraf yolu (public/images/...) */
  src: string;
  /** Dosya yoksa veya yüklenemezse kullanılan demo SVG */
  fallback: string;
};

export const media = {
  heroDesktop: {
    src: "/images/hero/desktop.jpg",
    fallback: "/placeholders/hero-desktop.svg",
  },
  heroMobile: {
    src: "/images/hero/mobile.jpg",
    fallback: "/placeholders/hero-mobile.svg",
  },
  about: {
    src: "/images/about/interior.jpg",
    fallback: "/placeholders/about-interior.svg",
  },
  featureBand: {
    src: "/images/about/feature-band.jpg",
    fallback: "/placeholders/feature-band.svg",
  },
  serviceOtoAksesuar: {
    src: "/images/services/oto-aksesuar.jpg",
    fallback: "/placeholders/service-oto-aksesuar.svg",
  },
  serviceAracIci: {
    src: "/images/services/arac-ici-dizayn.jpg",
    fallback: "/placeholders/service-arac-ici-dizayn.svg",
  },
  serviceOtoDoseme: {
    src: "/images/services/oto-doseme.jpg",
    fallback: "/placeholders/service-oto-doseme.svg",
  },
  serviceKisisellestirme: {
    src: "/images/services/arac-kisisellestirme.jpg",
    fallback: "/placeholders/service-arac-kisisellestirme.svg",
  },
  interiorDashboard: {
    src: "/images/interior/dashboard.jpg",
    fallback: "/placeholders/interior-dashboard.svg",
  },
  interiorSeat: {
    src: "/images/interior/seat.jpg",
    fallback: "/placeholders/interior-seat.svg",
  },
  interiorAccessory: {
    src: "/images/interior/accessory.jpg",
    fallback: "/placeholders/interior-accessory.svg",
  },
} as const satisfies Record<string, MediaSlot>;

export function productSlot(index: number): MediaSlot {
  const n = Math.max(1, Math.min(8, index));
  return {
    src: `/images/products/product-${n}.jpg`,
    fallback: `/placeholders/product-${n}.svg`,
  };
}

export function projectSlot(id: number, kind: "cover" | "before" | "detail-a" | "detail-b" = "cover"): MediaSlot {
  const suffix = kind === "cover" ? "" : `-${kind}`;
  const file = `project-${id}${suffix}`;
  return {
    src: `/images/projects/${file}.jpg`,
    fallback: `/placeholders/${file}.svg`,
  };
}

export function isSvgSrc(src: string): boolean {
  return src.toLowerCase().endsWith(".svg");
}
