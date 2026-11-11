import Link from "next/link";
import { business } from "@/data/business";

/** Yazı tabanlı logo işareti + yıldız. Gerçek logo geldiğinde burada değiştirilir. */
export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label={`${business.name} — Ana Sayfa`} className={`group inline-flex items-center gap-3 ${className ?? ""}`}>
      <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true" className="flex-none text-accent transition-transform duration-700 ease-premium group-hover:rotate-[72deg]">
        <path fill="currentColor" d="M12 1.5l2.9 6.9 7.4.6-5.6 4.8 1.7 7.2L12 17.2l-6.4 3.8 1.7-7.2L1.7 9l7.4-.6L12 1.5z" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.05rem] font-bold tracking-[0.12em] text-fg">STAR OTO</span>
        <span className="mt-1 font-display text-[0.55rem] font-medium uppercase tracking-[0.28em] text-muted">
          MARKET · {business.descriptor}
        </span>
      </span>
    </Link>
  );
}
