import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { ProductExplorer } from "@/components/products/ProductExplorer";
import { ContactSection } from "@/components/contact/ContactSection";
import { productCategories, products } from "@/data/products";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import type { Crumb } from "@/types";

export const metadata: Metadata = buildMetadata({
  title: "Tokat Araç Aksesuarları ve Oto Market Ürünleri",
  description:
    "Tokat'ta araç aksesuarları, araç içi aksesuar ve dizayn ürünlerini Star Oto Market'te keşfedin. Ürün hakkında bilgi almak için bize ulaşın.",
  path: "/urunlerimiz",
});

const crumbs: Crumb[] = [
  { name: "Ana Sayfa", href: "/" },
  { name: "Ürünlerimiz", href: "/urunlerimiz" },
];

export default function ProductsPage() {
  const hasDemo = products.some((p) => p.isDemo);
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero
        eyebrow="Ürünlerimiz"
        title="AKSESUAR KOLEKSİYONU."
        intro="İç mekândan dış görünüme kadar ürün gruplarını inceleyin. Fiyat ve temin durumu için bizimle iletişime geçin."
        crumbs={crumbs}
      >
        {hasDemo ? (
          <p className="inline-block max-w-2xl border border-line p-4 text-xs leading-relaxed text-muted">
            <strong className="font-medium text-fg">Bilgilendirme:</strong> Bu sayfadaki kartlar örnek içeriktir; gerçek ürün, fiyat ya da stok bilgisi değildir. Güncel ürünler için lütfen bizimle iletişime geçin.
          </p>
        ) : null}
      </PageHero>

      <section aria-label="Ürün listesi" className="bg-ink py-section">
        <div className="container-x">
          <ProductExplorer products={products} categories={productCategories} />
        </div>
      </section>

      <ContactSection />
    </>
  );
}
