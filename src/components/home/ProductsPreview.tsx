import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { ProductCard } from "@/components/products/ProductCard";
import { productCategories, products } from "@/data/products";

/** Ana sayfa ürün önizlemesi: solda yapışkan başlık, sağda kaydırılmış iki sütun. */
export function ProductsPreview() {
  const featured = products.filter((p) => p.featured).slice(0, 4);

  return (
    <section aria-labelledby="products-title" className="bg-ink py-section">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            <Eyebrow>Ürünlerimiz</Eyebrow>
            <Reveal as="h2" className="display-lg mt-6">
              <span id="products-title">AKSESUAR KOLEKSİYONU.</span>
            </Reveal>
            <Reveal as="p" delay={120} className="lead mt-6">
              Ürünleri inceleyin, aklınıza takılanları bize sorun. Fiyat ve temin bilgisi için bizimle iletişime geçin.
            </Reveal>
            <ul className="mt-8 space-y-2 text-sm text-muted">
              {productCategories.map((c) => (
                <li key={c.id} className="flex items-center gap-3">
                  <span aria-hidden="true" className="h-px w-5 bg-accent" />
                  {c.name}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Button href="/urunlerimiz">Tüm Ürünler</Button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2">
            {featured.map((product, index) => (
              <ProductCard key={product.id} product={product} offset={index % 2 === 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
