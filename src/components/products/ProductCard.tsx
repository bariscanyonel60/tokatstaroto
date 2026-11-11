import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { getCategoryName } from "@/data/products";
import { productInquiry } from "@/lib/inquiry";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
  /** Masaüstünde ikinci sütunu aşağı kaydırarak asimetrik ritim verir */
  offset?: boolean;
  priority?: boolean;
}

/** Ürün kartı: fiyat/stok yok; amaç bilgi talebini teşvik etmek. */
export function ProductCard({ product, offset, priority }: ProductCardProps) {
  const inquiry = productInquiry(product);
  const ctaClass = "link-arrow mt-5";
  const ctaContent = (
    <>
      Ürün Hakkında Bilgi Al <ArrowUpRight size={16} aria-hidden="true" />
    </>
  );

  return (
    <Reveal as="div" className={cn("group", offset && "lg:mt-24")}>
      <article>
        <div className="media-skeleton relative aspect-[4/5] overflow-hidden bg-surface">
          <SmartImage
            src={product.image.src}
            fallback={product.image.fallback}
            alt={product.image.alt}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
            className="object-cover transition-transform duration-[1400ms] ease-premium group-hover:scale-[1.05]"
          />
          {product.isDemo ? <span className="demo-badge">Örnek ürün</span> : null}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-40" />
        </div>
        <div className="border-b border-line pb-7 pt-5">
          <p className="font-display text-[0.7rem] uppercase tracking-label text-accent">
            {getCategoryName(product.categoryId)}
          </p>
          <h3 className="mt-2 font-display text-xl font-semibold leading-tight tracking-tight sm:text-2xl">
            {product.name}
          </h3>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">{product.description}</p>
          {inquiry.external ? (
            <a href={inquiry.href} target="_blank" rel="noopener noreferrer" className={ctaClass}>
              {ctaContent}
            </a>
          ) : (
            <Link href={inquiry.href} className={ctaClass}>
              {ctaContent}
            </Link>
          )}
        </div>
      </article>
    </Reveal>
  );
}
