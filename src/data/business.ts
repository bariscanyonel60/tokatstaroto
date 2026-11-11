/**
 * MERKEZİ İŞLETME BİLGİSİ
 *
 * Sitedeki tüm iletişim bilgileri buradan okunur. Doğrulanmamış bilgiler `null` bırakılmıştır
 * ve sitede GÖSTERİLMEZ / uydurulmaz. Doğrulayınca değeri doldurmanız yeterlidir:
 *
 *  - whatsapp       → Ülke kodlu, rakamlardan oluşan numara. Örn: "905XXXXXXXXX" (başında + olmadan)
 *  - email          → İşletmenin e-posta adresi
 *  - streetAddress  → Açık adres (mahalle, cadde, no). Yapılandırılmış veriye de otomatik eklenir
 *  - mapQuery       → Google Haritalar'ın işletmeyi bulacağı arama ifadesi (açık adres daha doğru sonuç verir)
 *  - social.*       → Doğrulanmış sosyal medya profil bağlantıları
 *
 * Kaynak (2026): Instagram @staroto60 bio + tabela görselleri.
 */
export interface Business {
  name: string;
  descriptor: string;
  /** Instagram bio sloganı (doğrulandı) */
  slogan: string;
  shortDescription: string;
  city: string;
  district: string;
  country: string;
  phoneDisplay: string;
  phoneTel: string;
  whatsapp: string | null;
  email: string | null;
  streetAddress: string | null;
  mapQuery: string;
  social: {
    instagram: string | null;
    facebook: string | null;
  };
}

export const business: Business = {
  name: "Star Oto Market",
  descriptor: "Aksesuar · Döşeme · Dizayn",
  slogan: "İmzamız Değer Katar",
  shortDescription:
    "Tokat'ta oto aksesuar, oto döşeme ve oto dizayn seçeneklerini bir araya getiren araç stil ve kişiselleştirme markası.",
  city: "Tokat",
  district: "Merkez",
  country: "TR",
  phoneDisplay: "0356 212 34 44",
  phoneTel: "+903562123444",

  // Instagram bio: 0543 551 2394
  whatsapp: "905435512394",
  email: null,
  streetAddress: null,
  // Açık adres netleşene kadar genel arama ifadesi kullanılır; yanlış konuma düşebilir.
  mapQuery: "Star Oto Market Tokat",
  social: {
    instagram: "https://www.instagram.com/staroto60/",
    facebook: null,
  },
};

export const telHref = `tel:${business.phoneTel}`;

export const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(business.mapQuery)}&output=embed&hl=tr`;

export const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(business.mapQuery)}`;

/** Doğrulanmış WhatsApp numarası yoksa null döner — çağıran taraf alternatif sunmalıdır. */
export function whatsappHref(message: string): string | null {
  if (!business.whatsapp) return null;
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Sitede gösterilecek konum metni (yalnızca doğrulanmış bilgi). */
export function locationLabel(): string {
  return business.streetAddress
    ? `${business.streetAddress}, ${business.district} / ${business.city}`
    : `${business.city} ${business.district}`;
}
