import type { ReactNode } from "react";

/** Sayfa geçişi: yalnızca opaklık (transform kullanılmaz; sabitlenen GSAP bölümlerini bozmaz). */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
