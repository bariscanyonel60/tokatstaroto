"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { Reveal } from "@/components/motion/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import type { Service } from "@/types";

/**
 * Hizmet vitrini.
 *
 * Varsayılan düzen DİKEY akıştır (mobil, tablet, azaltılmış hareket, JS yok): hiçbir içerik gizlenmez.
 * Yalnızca masaüstünde (≥1024px) ve hareket azaltılmamışsa GSAP bölümü sabitler ve yatay kaydırır:
 *   - Kaydırma mesafesi ölçülür (scrollWidth - innerWidth), sabit piksel kullanılmaz; refresh'te yeniden hesaplanır.
 *   - Son panel tamamen göründükten sonra bölüm serbest kalır; kullanıcı hiçbir zaman kilitlenmez.
 *   - Klavye ile bir panele odaklanılırsa sayfa kaydırması o panele eşitlenir.
 */
export function ServicesShowcase({ services }: { services: Service[] }) {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    const bar = barRef.current;
    if (!root || !track || !bar) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      root.dataset.mode = "hscroll";
      const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      const tl = gsap.timeline({
        defaults: { ease: "none", duration: 1 },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      tl.to(track, { x: () => -getDistance() }, 0).to(bar, { scaleX: 1 }, 0);
      const st = tl.scrollTrigger;

      // Klavye odağı: odaklanılan paneli görünür alana getir
      const onFocusIn = (event: FocusEvent) => {
        const stage = root.querySelector<HTMLElement>(".hs-stage");
        if (stage) stage.scrollLeft = 0;
        const item = (event.target as HTMLElement | null)?.closest<HTMLElement>(".hs-item");
        const distance = getDistance();
        if (!st || !item || distance <= 0) return;
        const progress = gsap.utils.clamp(0, 1, (item.offsetLeft - 48) / distance);
        window.scrollTo({ top: st.start + progress * (st.end - st.start), behavior: "auto" });
      };
      root.addEventListener("focusin", onFocusIn);

      return () => {
        root.removeEventListener("focusin", onFocusIn);
        root.dataset.mode = "static";
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="hizmetler"
      data-mode="static"
      aria-labelledby="services-title"
      className="hs-root relative bg-carbon"
    >
      <div className="hs-stage">
        <div ref={trackRef} className="hs-track container-x">
          <div className="hs-intro">
            <Eyebrow>Hizmetlerimiz</Eyebrow>
            <Reveal as="h2" className="display-xl mt-6">
              <span id="services-title">ARACINIZA NELER KATABİLİRİZ?</span>
            </Reveal>
            <Reveal as="p" delay={120} className="lead mt-6 max-w-md">
              Aksesuardan döşemeye, iç mekân dizaynından kişiselleştirmeye kadar seçenekleri birlikte değerlendirelim.
            </Reveal>
          </div>

          {services.map((service, index) => (
            <Reveal key={service.slug} className="hs-item" delay={index * 60}>
              <article className="hs-panel group">
                <SmartImage
                  src={service.image.src}
                  fallback={service.image.fallback}
                  alt={service.image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="object-cover transition-transform duration-[1400ms] ease-premium group-hover:scale-[1.04]"
                />
                {service.isDemo !== false ? <DemoBadge /> : null}
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-transparent" />
                <span aria-hidden="true" className="hs-num absolute right-5 top-4 sm:right-8 sm:top-6">
                  {service.number}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
                  <h3 className="font-display text-[clamp(1.6rem,3.2vw,2.6rem)] font-bold leading-none tracking-tight">
                    <Link
                      href={`/hizmetlerimiz/${service.slug}`}
                      className="after:absolute after:inset-0 after:content-['']"
                    >
                      {service.title}
                    </Link>
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-fg/75 sm:text-base">{service.summary}</p>
                  <span className="link-arrow mt-5">
                    Detayları İncele <ArrowUpRight size={16} aria-hidden="true" />
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="hs-hud" aria-hidden="true">
          <span className="font-display text-[0.7rem] uppercase tracking-label text-muted">Kaydırın</span>
          <span className="hs-bar">
            <span ref={barRef} className="hs-bar-fill" />
          </span>
        </div>
      </div>
    </section>
  );
}
