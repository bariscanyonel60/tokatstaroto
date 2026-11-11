import { media } from "@/lib/media";
import type { Service } from "@/types";

/**
 * HİZMET KATEGORİLERİ
 *
 * Kategoriler Instagram @staroto60 bio / öne çıkanlar ile uyumludur
 * (Oto Aksesuar, Oto Döşeme, Oto Dizayn, Cam Filmi). Metinler "bilgi alabilirsiniz"
 * çerçevesindedir; teknik uygulama veya garanti iddiası yoktur.
 */
export const services: Service[] = [
  {
    slug: "oto-aksesuar",
    number: "01",
    title: "Oto Aksesuar",
    tagline: "Aracınıza uygun aksesuar seçenekleri.",
    summary:
      "Yan basamak, port bagaj ve dış görünüm aksesuarları hakkında bilgi alın.",
    description: [
      "Oto aksesuar, aracın günlük kullanımını kolaylaştıran ve görünümüne karakter katan küçük ama etkili bir alandır. Doğru seçimle hem konfor hem de tarz bir arada gelir.",
      "Star Oto Market'te Tokat'taki araç sahipleri; yan basamak, port bagaj ve diğer aksesuar seçenekleri hakkında bilgi alabilir, aracına uygun yönlendirme isteyebilir.",
    ],
    topics: [
      "Aracınızın marka, model ve yılına uygun aksesuar seçeneklerini sormak",
      "Yan basamak ve port bagaj seçeneklerini öğrenmek",
      "İç mekân ve dış görünüm aksesuarları hakkında bilgi almak",
      "Aradığınız ürünün temin durumunu telefonla sormak",
    ],
    image: {
      src: media.serviceOtoAksesuar.src,
      fallback: media.serviceOtoAksesuar.fallback,
      alt: "Star Oto Market önünde Peugeot Rifter",
    },
    isDemo: false,
    seoTitle: "Tokat Oto Aksesuar | Star Oto Market",
    seoDescription:
      "Tokat'ta oto aksesuar, yan basamak ve port bagaj seçenekleri için Star Oto Market'e ulaşın.",
  },
  {
    slug: "arac-ici-dizayn",
    number: "02",
    title: "Araç İçi Dizayn",
    tagline: "İç mekânı yeniden düşünün.",
    summary:
      "Kokpitten konsola, iç mekânın görünümünü şekillendiren dizayn fikirlerini konuşalım.",
    description: [
      "Bir aracın iç mekânı, sürücünün en çok vakit geçirdiği ve en çok hissettiği alandır. Renk, doku ve malzeme tercihleri bu alanın karakterini belirler.",
      "Araç içi dizayn seçenekleri hakkında Star Oto Market ile iletişime geçerek beklentinizi paylaşabilir, aracınıza uygun fikirleri birlikte değerlendirebilirsiniz.",
    ],
    topics: [
      "Gösterge paneli, konsol ve kapı panelleri için dizayn fikirlerini konuşmak",
      "Renk, doku ve malzeme seçeneklerini değerlendirmek",
      "Mevcut iç mekân görünümünüzle uyumlu çözümleri sormak",
      "Beğendiğiniz örnek fotoğrafları paylaşarak beklentinizi anlatmak",
    ],
    image: {
      src: media.serviceAracIci.src,
      fallback: media.serviceAracIci.fallback,
      alt: "Ön koruma demirli Ford Transit — Star Oto Market",
    },
    isDemo: false,
    seoTitle: "Tokat Oto Dizayn ve Araç İçi Dizayn | Star Oto Market",
    seoDescription:
      "Tokat'ta araç içi dizayn seçenekleri için Star Oto Market'e danışın. Renk, doku ve malzeme tercihleri hakkında bilgi alın.",
  },
  {
    slug: "oto-doseme",
    number: "03",
    title: "Oto Döşeme",
    tagline: "Konfor ve görünüm bir arada.",
    summary:
      "Koltuk ve iç kaplama için malzeme, renk ve dikiş tercihleri hakkında fikir alın.",
    description: [
      "Oto döşeme, aracın iç mekânında hem konforu hem de görünümü doğrudan etkiler. Malzeme, renk ve dikiş detayları tercihe göre farklı bir karakter ortaya çıkarır.",
      "Tokat'ta oto döşeme seçenekleri hakkında bilgi almak için aracınızın durumunu ve beklentinizi bize iletebilirsiniz.",
    ],
    topics: [
      "Koltuk ve iç kaplama için malzeme ve renk seçeneklerini sormak",
      "Dikiş ve desen tercihleri hakkında fikir almak",
      "Mevcut döşemenizin durumuna göre yönlendirme istemek",
      "Kapsam ve süreç hakkında bilgi almak",
    ],
    image: {
      src: media.serviceOtoDoseme.src,
      fallback: media.serviceOtoDoseme.fallback,
      alt: "Star Oto Market atölyesinde araç aksesuar uygulaması",
    },
    isDemo: false,
    seoTitle: "Tokat Oto Döşeme | Star Oto Market",
    seoDescription:
      "Tokat'ta oto döşeme için malzeme, renk ve dikiş seçenekleri hakkında Star Oto Market'ten bilgi alın.",
  },
  {
    slug: "arac-kisisellestirme",
    number: "04",
    title: "Araç Kişiselleştirme",
    tagline: "Aracınıza kendi karakterinizi katın.",
    summary:
      "İç ve dış görünümde size ait bir tarz oluşturmak için seçenekleri birlikte değerlendirelim.",
    description: [
      "Araç kişiselleştirme, aracın kullanıcısının tarzını yansıtmasıdır. Küçük bir detay da kapsamlı bir dönüşüm de aynı soruyla başlar: Aracım nasıl görünsün?",
      "Star Oto Market ile iletişime geçerek aklınızdaki fikri paylaşabilir, aksesuar ve dizayn seçeneklerini bir arada değerlendirebilirsiniz.",
    ],
    topics: [
      "Aracınızı daha kişisel kılacak aksesuar ve dizayn fikirlerini konuşmak",
      "İç ve dış görünümde uyumlu bir tarz belirlemek",
      "Beğendiğiniz örnekleri paylaşarak nelerin mümkün olduğunu sormak",
      "Farklı seçenekleri bir arada değerlendirmek",
    ],
    image: {
      src: media.serviceKisisellestirme.src,
      fallback: media.serviceKisisellestirme.fallback,
      alt: "Krom yan basamak detayı — Star Oto Market uygulaması",
    },
    isDemo: false,
    seoTitle: "Tokat Araç Aksesuarları ve Kişiselleştirme | Star Oto Market",
    seoDescription:
      "Tokat'ta araç kişiselleştirme, araç aksesuarları ve dizayn seçenekleri için Star Oto Market ile iletişime geçin.",
  },
  {
    slug: "cam-filmi",
    number: "05",
    title: "Cam Filmi",
    tagline: "Cam filmi seçeneklerini sorun.",
    summary:
      "Cam filmi seçenekleri ve aracınıza uygun alternatifler hakkında bilgi alın.",
    description: [
      "Cam filmi, araç görünümünü ve sürüş konforunu etkileyebilen bir tercihtir. Ton, kapsam ve uyumluluk araçtan araca değişir.",
      "Star Oto Market'te cam filmi seçenekleri hakkında bilgi almak için aracınızın modelini iletebilir, beklentinizi paylaşabilirsiniz.",
    ],
    topics: [
      "Aracınız için cam filmi seçeneklerini sormak",
      "Kapsam (yan cam, arka cam vb.) hakkında bilgi almak",
      "Beğendiğiniz örnekleri paylaşarak yönlendirme istemek",
      "Süreç ve randevu için iletişime geçmek",
    ],
    image: {
      src: media.serviceKisisellestirme.src,
      fallback: media.serviceKisisellestirme.fallback,
      alt: "Star Oto Market araç aksesuar uygulaması",
    },
    isDemo: false,
    seoTitle: "Tokat Cam Filmi | Star Oto Market",
    seoDescription:
      "Tokat'ta cam filmi seçenekleri hakkında Star Oto Market'ten bilgi alın.",
  },
];

/** Hizmet sayfalarında "bilgi almadan önce" listesi (genel, iddia içermez) */
export const beforeYouCall: string[] = [
  "Aracınızın marka, model ve model yılı",
  "Aklınızdaki görünüm ya da beğendiğiniz örnek fotoğraflar",
  "Varsa bütçe beklentiniz ve zamanlamanız",
  "Size ulaşabileceğimiz telefon numarası",
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
