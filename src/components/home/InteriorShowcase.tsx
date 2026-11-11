"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { SmartImage } from "@/components/ui/SmartImage";
import type { InteriorScene } from "@/types";

/**
 * "DETAYLARDA FARK YARATIN." — araç içi deneyim sahneleri.
 *
 * Üç düzen, `data-mode` ile seçilir (CSS globals.css'te):
 *  - static : dikey, hareketsiz. Varsayılan, azaltılmış hareket ve JS yokken kullanılır.
 *  - stack  : mobil/tablet. Masaüstü sabitleme KOPYALANMAZ; sahneler dikey akar ve görünür olunca açılır.
 *             Kaydırma kilidi yok, hiçbir sahne atlanmaz.
 *  - pinned : masaüstü. GSAP bölümü sabitler; sahneler kaydırmayla çapraz geçer, son sahneden sonra serbest bırakır.
 */
export function InteriorShowcase({ scenes }: { scenes: InteriorScene[] }) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const mm = gsap.matchMedia();

    // ---- Masaüstü: sabitlenmiş sahne geçişleri ----
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      root.dataset.mode = "pinned";
      const items = gsap.utils.toArray<HTMLElement>(".is-scene", root);
      const dots = gsap.utils.toArray<HTMLElement>(".is-dot", root);
      const count = items.length;
      if (count === 0) return;

      root.dataset.active = "0";
      dots.forEach((d, i) => d.classList.toggle("is-active", i === 0));
      gsap.set(items.slice(1), { autoAlpha: 0 });

      let current = 0;
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => `+=${Math.round(window.innerHeight * count * 0.9)}`,
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const next = Math.min(count - 1, Math.floor(self.progress * count * 0.999));
            if (next !== current) {
              current = next;
              root.dataset.active = String(next);
              dots.forEach((d, i) => d.classList.toggle("is-active", i === next));
            }
          },
        },
      });

      items.forEach((scene, i) => {
        const img = scene.querySelector<HTMLElement>(".is-img");
        const copy = scene.querySelector<HTMLElement>(".is-copy");
        // Her sahne kendi [i, i+1] aralığında hafifçe yaklaşır (derinlik hissi)
        if (img) tl.fromTo(img, { scale: 1.16 }, { scale: 1, duration: 1 }, i);

        if (i > 0) {
          // Önceki sahnenin metni çekilir, yeni sahne üstüne gelir
          const prevCopy = items[i - 1].querySelector<HTMLElement>(".is-copy");
          if (prevCopy) tl.to(prevCopy, { autoAlpha: 0, yPercent: -8, duration: 0.25 }, i - 0.32);
          tl.fromTo(scene, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35, ease: "power1.out" }, i - 0.22);
          if (copy) tl.fromTo(copy, { autoAlpha: 0, yPercent: 10 }, { autoAlpha: 1, yPercent: 0, duration: 0.3 }, i - 0.02);
        }
      });
      // Zaman çizelgesi tam count süresine uzatılır: son sahne bekleme payı alır
      tl.set({}, {}, count);

      return () => {
        gsap.set(items, { clearProps: "opacity,visibility,transform" });
        root.dataset.mode = "static";
        delete root.dataset.active;
      };
    });

    // ---- Mobil/tablet: dikey sahneler, görünür olunca açılır ----
    mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
      root.dataset.mode = "stack";
      const items = Array.from(root.querySelectorAll<HTMLElement>(".is-scene"));
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              (entry.target as HTMLElement).dataset.revealed = "true";
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
      );
      items.forEach((el) => observer.observe(el));

      return () => {
        observer.disconnect();
        items.forEach((el) => delete el.dataset.revealed);
        root.dataset.mode = "static";
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={rootRef} id="arac-ici" data-mode="static" aria-labelledby="interior-title" className="is-root">
      <div className="is-stage">
        <div className="is-heading">
          <Eyebrow>Araç İçi Deneyim</Eyebrow>
          <h2 id="interior-title" className="display-lg mt-5">
            DETAYLARDA FARK YARATIN.
          </h2>
        </div>

        {scenes.map((scene) => (
          <article key={scene.id} className="is-scene" aria-label={`Sahne ${scene.index}: ${scene.label}`}>
            <div className="is-media">
              <div className="is-img">
                <SmartImage
                  src={scene.image.src}
                  fallback={scene.image.fallback}
                  alt={scene.image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 100vw"
                  className="object-cover"
                />
              </div>
              {scene.image.src.endsWith(".svg") ? <DemoBadge /> : null}
              <span aria-hidden="true" className="is-sceneno">
                {scene.index}
              </span>
            </div>
            <div className="is-copy">
              <p className="font-display text-[0.72rem] uppercase tracking-label text-accent">
                {scene.index} — {scene.label}
              </p>
              <h3 className="is-title mt-4">{scene.title}</h3>
              <p className="mt-5 max-w-md text-base leading-relaxed text-fg/75">{scene.text}</p>
              <Link href="/iletisim" className="link-arrow mt-6">
                Bilgi Alın
              </Link>
            </div>
          </article>
        ))}

        <div className="is-hud" aria-hidden="true">
          {scenes.map((scene) => (
            <span key={scene.id} className="is-dot">
              {scene.index}
              <i />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
