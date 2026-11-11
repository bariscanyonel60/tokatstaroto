"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Yazı tipleri ve görseller yüklendikten sonra ScrollTrigger ölçümlerini yeniler;
 * böylece sabitlenen bölümlerin başlangıç/bitiş noktaları doğru hesaplanır.
 */
export function ScrollRefresh() {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const refresh = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => ScrollTrigger.refresh(), 120);
    };

    window.addEventListener("load", refresh);
    window.addEventListener("orientationchange", refresh);
    if (document.fonts?.ready) {
      document.fonts.ready.then(refresh).catch(() => undefined);
    }
    if (document.readyState === "complete") refresh();

    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("load", refresh);
      window.removeEventListener("orientationchange", refresh);
    };
  }, []);

  return null;
}
