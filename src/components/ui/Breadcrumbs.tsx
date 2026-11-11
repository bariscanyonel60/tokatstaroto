import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Crumb } from "@/types";

/** Görünür breadcrumb. BreadcrumbList yapılandırılmış verisi sayfada ayrıca JsonLd ile eklenir. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Sayfa yolu" className="mb-8">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-display text-[0.72rem] uppercase tracking-label text-muted">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-2">
              {isLast ? (
                <span aria-current="page" className="text-fg">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link href={item.href} className="transition-colors hover:text-accent">
                    {item.name}
                  </Link>
                  <ChevronRight size={12} aria-hidden="true" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
