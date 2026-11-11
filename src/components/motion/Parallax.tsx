"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";

interface ParallaxProps {
  children: ReactNode;
  /** Üst kapsayıcıya göre yüzde cinsinden hareket miktarı (±). Varsayılan 10. */
  amount?: number;
  className?: string;
}

/**
 * Hafif görsel paralaksı. Yalnızca masaüstünde ve azaltılmış hareket TERCİH EDİLMEDİĞİNDE çalışır;
 * mobilde hiçbir ScrollTrigger oluşturulmaz. Kapsayıcının overflow-hidden olması ve bu bileşenin
 * `absolute -inset-y-[15%]` gibi taşan bir kutu olması beklenir.
 */
export function Parallax({ children, amount = 10, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        el,
        { yPercent: -amount },
        {
          yPercent: amount,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement ?? el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });
    return () => mm.revert();
  }, [amount]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
