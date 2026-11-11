"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/products/ProductCard";
import { cn } from "@/lib/utils";
import type { Product, ProductCategory } from "@/types";

/** Kategori filtreli ürün listesi. İki sütunlu, ikinci sütun aşağı kaydırılmış (asimetrik) düzen. */
export function ProductExplorer({ products, categories }: { products: Product[]; categories: ProductCategory[] }) {
  const [active, setActive] = useState<string>("all");

  const visible = useMemo(
    () => (active === "all" ? products : products.filter((p) => p.categoryId === active)),
    [active, products]
  );

  const tabs = [{ id: "all", name: "Tümü" }, ...categories.map((c) => ({ id: c.id, name: c.name }))];

  return (
    <div>
      <div role="group" aria-label="Ürün kategorileri" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            aria-pressed={active === tab.id}
            onClick={() => setActive(tab.id)}
            className={cn(
              "min-h-11 shrink-0 border px-5 font-display text-[0.74rem] font-medium uppercase tracking-[0.14em] transition-colors duration-300",
              active === tab.id
                ? "border-accent bg-accent text-ink"
                : "border-line text-muted hover:border-fg/40 hover:text-fg"
            )}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {visible.length} ürün gösteriliyor
      </p>

      <div key={active} className="page-enter mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:gap-x-16">
        {visible.map((product, index) => (
          <ProductCard key={product.id} product={product} offset={index % 2 === 1} />
        ))}
      </div>
    </div>
  );
}
