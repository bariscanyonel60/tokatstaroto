import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { ContactSection } from "@/components/contact/ContactSection";
import { getService } from "@/data/services";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import type { Crumb } from "@/types";

export const metadata: Metadata = buildMetadata({
  title: "İletişim | Tokat Oto Aksesuar ve Dizayn",
  description:
    "Star Oto Market ile iletişime geçin: telefon, konum ve iletişim formu. Tokat'ta oto aksesuar ve araç dizayn seçenekleri hakkında bilgi alın.",
  path: "/iletisim",
});

const crumbs: Crumb[] = [
  { name: "Ana Sayfa", href: "/" },
  { name: "İletişim", href: "/iletisim" },
];

interface Props {
  searchParams: Promise<{ konu?: string | string[]; urun?: string | string[] }>;
}

const first = (v?: string | string[]) => (Array.isArray(v) ? v[0] : v);

export default async function ContactPage({ searchParams }: Props) {
  const { konu, urun } = await searchParams;
  const konuValue = first(konu)?.slice(0, 60);
  const urunValue = first(urun)?.slice(0, 80);

  // ?konu=<hizmet-slug> ise hizmet adı, ?urun=<ad> ise ürün adı ile ön dolgu yapılır
  const service = konuValue ? getService(konuValue) : undefined;
  const topic = urunValue ? "Ürün bilgisi" : (service?.title ?? konuValue ?? "");
  const message = urunValue ? `Merhaba, "${urunValue}" hakkında bilgi almak istiyorum.` : "";

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero
        eyebrow="İletişim"
        title="ARACINIZ İÇİN YENİ BİR ADIM ATIN."
        intro="Aracınız için aksesuar ve dizayn seçenekleri hakkında bilgi almak üzere bizimle iletişime geçin."
        crumbs={crumbs}
      />
      <ContactSection showHeading={false} initialTopic={topic} initialMessage={message} />
    </>
  );
}
