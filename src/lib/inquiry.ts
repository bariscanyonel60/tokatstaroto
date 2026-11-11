import { whatsappHref } from "@/data/business";
import type { Product, Service } from "@/types";

export interface InquiryLink {
  href: string;
  external: boolean;
}

/** İletişim sayfasına ön dolgulu bağlantı */
export function contactHref(params: { konu?: string; urun?: string } = {}): string {
  const search = new URLSearchParams();
  if (params.konu) search.set("konu", params.konu);
  if (params.urun) search.set("urun", params.urun);
  const qs = search.toString();
  return `/iletisim${qs ? `?${qs}` : ""}#form`;
}

/**
 * Ürün bilgi talebi: doğrulanmış WhatsApp numarası varsa ön dolgulu WhatsApp mesajı,
 * yoksa ön dolgulu iletişim formu (telefon numarası formun yanında sunulur).
 */
export function productInquiry(product: Product): InquiryLink {
  const wa = whatsappHref(`Merhaba, "${product.name}" hakkında bilgi almak istiyorum.`);
  if (wa) return { href: wa, external: true };
  return { href: contactHref({ urun: product.name }), external: false };
}

export function serviceInquiry(service: Service): InquiryLink {
  const wa = whatsappHref(`Merhaba, "${service.title}" hakkında bilgi almak istiyorum.`);
  if (wa) return { href: wa, external: true };
  return { href: contactHref({ konu: service.slug }), external: false };
}
