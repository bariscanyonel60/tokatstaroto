import { productSlot } from "@/lib/media";
import type { Product, ProductCategory } from "@/types";

/**
 * ÜRÜN KATALOĞU
 *
 * Kartlar Instagram @staroto60 görselleriyle örneklenmiştir; fiyat / stok / marka iddiası yoktur.
 * Gerçek stok bilgisi eklenene kadar yalnızca kategori ve görsel yönlendirmesi sunar.
 */
export const productCategories: ProductCategory[] = [
  {
    id: "ic-mekan",
    name: "İç Mekân Aksesuarları",
    description: "Araç içinde kullanım ve görünümü destekleyen aksesuarlar.",
  },
  {
    id: "dis-gorunum",
    name: "Dış Görünüm Aksesuarları",
    description: "Aracın dış hatlarına vurgu yapan detay ürünleri.",
  },
  {
    id: "konfor",
    name: "Konfor ve Kullanım Ürünleri",
    description: "Günlük kullanımı rahatlatan pratik ürünler.",
  },
  {
    id: "dizayn",
    name: "Araç Dizayn Ürünleri",
    description: "İç mekânın tarzını belirleyen dizayn ürünleri.",
  },
];

export const products: Product[] = [
  {
    id: "urun-1",
    name: "Port Bagaj Seçenekleri",
    categoryId: "dis-gorunum",
    description: "Çatı üstü taşıma ve port bagaj seçenekleri hakkında bilgi alın.",
    image: {
      src: productSlot(1).src,
      fallback: productSlot(1).fallback,
      alt: "Atölyede port bagajlı Peugeot 2008",
    },
    isDemo: false,
    featured: true,
  },
  {
    id: "urun-2",
    name: "Yan Basamak Seçenekleri",
    categoryId: "dis-gorunum",
    description: "SUV ve ticari araçlar için yan basamak seçeneklerini sorun.",
    image: {
      src: productSlot(2).src,
      fallback: productSlot(2).fallback,
      alt: "Yan basamaklı beyaz Mercedes Vito",
    },
    isDemo: false,
    featured: true,
  },
  {
    id: "urun-3",
    name: "Yan Basamak Detay",
    categoryId: "konfor",
    description: "Basamak yüzeyi ve montaj görünümü için örnek kare.",
    image: {
      src: productSlot(3).src,
      fallback: productSlot(3).fallback,
      alt: "Krom yan basamak yakın çekimi",
    },
    isDemo: false,
    featured: true,
  },
  {
    id: "urun-4",
    name: "Mağaza Önü Uygulamalar",
    categoryId: "dizayn",
    description: "Star Oto Market vitrininde araç aksesuar örnekleri.",
    image: {
      src: productSlot(4).src,
      fallback: productSlot(4).fallback,
      alt: "Star Oto Market tabelası ve mağaza önü",
    },
    isDemo: false,
    featured: true,
  },
  {
    id: "urun-5",
    name: "Yan Basamak ve Basamak Pedi",
    categoryId: "konfor",
    description: "Kaymaz yüzeyli basamak pedi detayı.",
    image: {
      src: productSlot(5).src,
      fallback: productSlot(5).fallback,
      alt: "Kaymaz pedli krom yan basamak",
    },
    isDemo: false,
  },
  {
    id: "urun-6",
    name: "SUV Aksesuar Görünümü",
    categoryId: "dis-gorunum",
    description: "SUV üzerinde yan basamak uygulaması örneği.",
    image: {
      src: productSlot(6).src,
      fallback: productSlot(6).fallback,
      alt: "Star Oto Market önünde yan basamaklı Ford Kuga",
    },
    isDemo: false,
  },
  {
    id: "urun-7",
    name: "Hafif Ticari Aksesuar",
    categoryId: "dis-gorunum",
    description: "Hafif ticari araçlar için dış aksesuar seçenekleri.",
    image: {
      src: productSlot(7).src,
      fallback: productSlot(7).fallback,
      alt: "Star Oto Market önünde Peugeot Rifter",
    },
    isDemo: false,
  },
  {
    id: "urun-8",
    name: "Vitrin ve Tabela",
    categoryId: "dizayn",
    description: "Mağaza görünümü ve marka tabelası.",
    image: {
      src: productSlot(8).src,
      fallback: productSlot(8).fallback,
      alt: "Star Oto Market Aksesuar Dizayn tabelası",
    },
    isDemo: false,
  },
];

export function getCategoryName(id: string): string {
  return productCategories.find((c) => c.id === id)?.name ?? "";
}
