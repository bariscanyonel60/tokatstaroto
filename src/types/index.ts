export interface ImageAsset {
  /** Tercih edilen görsel (genelde /images/... gerçek fotoğraf slotu) */
  src: string;
  alt: string;
  /** Dosya yoksa kullanılan demo SVG; SmartImage onError ile düşer */
  fallback?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Service {
  slug: string;
  number: string;
  title: string;
  tagline: string;
  /** Kartlarda görünen kısa açıklama */
  summary: string;
  /** Hizmet sayfasında görünen paragraflar */
  description: string[];
  /** "Neler sorabilirsiniz" listesi */
  topics: string[];
  image: ImageAsset;
  /** true ise kartta "Demo görsel" etiketi gösterilir. */
  isDemo?: boolean;
  seoTitle: string;
  seoDescription: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  description: string;
  image: ImageAsset;
  /** true ise kart "Örnek" olarak işaretlenir. Gerçek ürünler eklenince false yapın. */
  isDemo: boolean;
  featured?: boolean;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  cover: ImageAsset;
  /** Varsa önce/sonra karşılaştırması gösterilir (cover "sonra" görselidir). */
  before?: ImageAsset;
  gallery: ImageAsset[];
  /** true ise "Demo görsel" etiketi gösterilir. Gerçek fotoğraflarla false yapın. */
  isDemo: boolean;
}

export interface InteriorScene {
  id: string;
  index: string;
  label: string;
  title: string;
  text: string;
  image: ImageAsset;
}

export interface Crumb {
  name: string;
  href: string;
}
