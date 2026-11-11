import type { Metadata } from "next";
import { business } from "@/data/business";
import { absoluteUrl, siteUrl } from "@/lib/site";
import type { Crumb, Service } from "@/types";

export const SITE_TITLE = "Star Oto Market | Tokat Oto Aksesuar ve Araç Dizayn";
export const SITE_DESCRIPTION =
  "Tokat'ta oto aksesuar, araç içi dizayn ve oto döşeme seçeneklerini Star Oto Market'te keşfedin. Ürün ve hizmetler hakkında bilgi alın.";

interface MetaInput {
  /** Başlık (şablon "%s | Star Oto Market" uygulanır; tam başlık için absoluteTitle kullanın) */
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
}

/** Sayfa bazlı metadata: başlık, açıklama, canonical, Open Graph ve Twitter kartı */
export function buildMetadata({ title, description, path, absoluteTitle }: MetaInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${business.name}`;
  const url = absoluteUrl(path);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: business.name,
      locale: "tr_TR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

/** Yapılandırılmış veri: yalnızca doğrulanmış bilgiler. Puan, yorum, çalışma saati, koordinat YOKTUR. */
export function localBusinessJsonLd() {
  const sameAs = [business.social.instagram, business.social.facebook].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#business`,
    name: business.name,
    alternateName: `${business.name} ${business.descriptor}`,
    description: business.shortDescription,
    url: siteUrl,
    image: absoluteUrl("/opengraph-image"),
    telephone: business.phoneTel,
    ...(business.email ? { email: business.email } : {}),
    address: {
      "@type": "PostalAddress",
      ...(business.streetAddress ? { streetAddress: business.streetAddress } : {}),
      addressLocality: business.city,
      addressRegion: business.city,
      addressCountry: business.country,
    },
    areaServed: { "@type": "City", name: business.city },
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function breadcrumbJsonLd(items: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export function serviceJsonLd(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    description: service.summary,
    url: absoluteUrl(`/hizmetlerimiz/${service.slug}`),
    provider: { "@id": `${siteUrl}/#business` },
    areaServed: { "@type": "City", name: business.city },
  };
}
