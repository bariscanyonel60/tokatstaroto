"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Hero giriş sekansı ve etkileşimleri (yalnızca animasyon katmanı; içerik sunucuda render edilir).
 *
 *  - prefers-reduced-motion: animasyon YOK, her şey anında görünür.
 *  - Masaüstü: maske/ışık açılışı, kademeli başlık, fare ile hafif görsel hareketi, kaydırmada hafif paralaks.
 *  - Mobil: daha kısa ve sade sekans; fare/paralaks yok.
 * Hazırlıksız (JS yok) durumda globals.css 4 sn sonra içeriği zaten görünür yapar.
 */
export function HeroMotion({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const q = (selector: string) => Array.from(root.querySelectorAll<HTMLElement>(selector));

    const mm = gsap.matchMedia(root);

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(q("[data-hero]"), { autoAlpha: 1, clearProps: "transform,clipPath" });
    });

    mm.add(
      {
        desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        mobile: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const isDesktop = Boolean(context.conditions?.desktop);
        const speed = isDesktop ? 1 : 0.7;

        const bg = q("[data-hero-bg]");
        const glow = q("[data-hero-glow]");
        const eyebrow = q("[data-hero-eyebrow]");
        const lines = q("[data-hero-line]");
        const copy = q("[data-hero-copy]");
        const ctas = q("[data-hero-cta]");
        const cue = q("[data-hero-cue]");

        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        // 1) Karanlık atmosfer -> araç görseli maske/ışık ile açılır
        tl.fromTo(
          bg,
          isDesktop
            ? { autoAlpha: 1, clipPath: "inset(0% 0% 0% 100%)", scale: 1.14 }
            : { autoAlpha: 0, scale: 1.08 },
          isDesktop
            ? { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1.7 * speed, ease: "power4.inOut" }
            : { autoAlpha: 1, scale: 1, duration: 1.1, ease: "power2.out" },
          0
        )
          .fromTo(glow, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.6 * speed, ease: "power2.out" }, 0.5 * speed)
          // 2) Başlık: satır satır, maske içinden yükselir
          .fromTo(
            lines,
            { autoAlpha: 0, yPercent: 115 },
            { autoAlpha: 1, yPercent: 0, duration: 1.1 * speed, stagger: 0.1 * speed },
            0.55 * speed
          )
          .fromTo(eyebrow, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.45 * speed)
          // 3) Destekleyici metin
          .fromTo(copy, { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.9 }, ">-0.45")
          // 4) CTA'lar
          .fromTo(ctas, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.09 }, ">-0.55")
          // 5) Kaydırma göstergesi
          .fromTo(cue, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8, ease: "power1.out" }, ">-0.3");

        if (!isDesktop) return () => tl.kill();

        // Masaüstü: fare ile hafif görsel hareketi
        const mouseLayer = q("[data-hero-mouse]")[0];
        let onMove: ((e: PointerEvent) => void) | undefined;
        if (mouseLayer && window.matchMedia("(pointer: fine)").matches) {
          const xTo = gsap.quickTo(mouseLayer, "x", { duration: 1.4, ease: "power3" });
          const yTo = gsap.quickTo(mouseLayer, "y", { duration: 1.4, ease: "power3" });
          onMove = (e: PointerEvent) => {
            xTo((e.clientX / window.innerWidth - 0.5) * -26);
            yTo((e.clientY / window.innerHeight - 0.5) * -16);
          };
          root.addEventListener("pointermove", onMove);
        }

        // Masaüstü: hero'dan çıkarken hafif paralaks
        const scrollLayer = q("[data-hero-scroll]")[0];
        if (scrollLayer) {
          gsap.to(scrollLayer, {
            yPercent: 8,
            ease: "none",
            scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
          });
        }

        return () => {
          if (onMove) root.removeEventListener("pointermove", onMove);
          tl.kill();
        };
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink"
    >
      {children}
    </section>
  );
}
