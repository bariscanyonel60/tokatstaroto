import { getImageProps } from "next/image";
import { ArrowDown } from "lucide-react";
import { HeroMotion } from "@/components/home/HeroMotion";
import { Button } from "@/components/ui/Button";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { business } from "@/data/business";
import { isSvgSrc, media } from "@/lib/media";
import { resolveMedia } from "@/lib/resolve-media";

const ALT = "Star Oto Market Tokat mağaza önü — tabelası ve yan basamaklı Ford Kuga";
const HEADLINE = ["İMZAMIZ", "DEĞER", "KATAR."];

/**
 * Sinematik hero. Masaüstü ve mobil için AYRI görsel kompozisyonu (<picture>) kullanılır;
 * mobilde masaüstü görseli indirilmez. LCP görseli yüksek öncelikle yüklenir.
 */
export function Hero() {
  const desktopSrc = resolveMedia(media.heroDesktop);
  const mobileSrc = resolveMedia(media.heroMobile);
  const showDemo = isSvgSrc(desktopSrc);
  const DESKTOP = { src: desktopSrc, width: 1920, height: 1080 };
  const MOBILE = { src: mobileSrc, width: 780, height: 1560 };

  const base = { alt: ALT, priority: true, quality: 80, sizes: "100vw" };
  const { props: desktop } = getImageProps({ ...base, ...DESKTOP, unoptimized: isSvgSrc(DESKTOP.src) });
  const { props: mobile } = getImageProps({ ...base, ...MOBILE, unoptimized: isSvgSrc(MOBILE.src) });

  return (
    <HeroMotion>
      {/* Görsel katmanları: giriş (maske) > kaydırma paralaksı > fare hareketi */}
      <div data-hero data-hero-bg className="absolute inset-0 -z-10">
        <div data-hero-scroll className="absolute inset-0">
          <div data-hero-mouse className="absolute -inset-[3%]">
            <picture>
              <source media="(min-width: 768px)" srcSet={desktop.srcSet ?? desktop.src} />
              <img {...mobile} alt={ALT} className="h-full w-full object-cover" />
            </picture>
          </div>
        </div>
        {/* Okunabilirlik ve sonraki bölüme yumuşak geçiş */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/10 to-ink md:bg-gradient-to-r md:from-ink/90 md:via-ink/45 md:to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink to-transparent" />
      </div>

      {/* Kontrollü turuncu ışık vurgusu */}
      <div
        data-hero
        data-hero-glow
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_78%_72%,rgba(255,104,30,0.22),transparent_70%)]"
      />

      <div className="container-x relative z-10 flex flex-1 flex-col justify-start pb-28 pt-[calc(var(--header-h)+2.25rem)] md:justify-center md:pb-24 md:pt-[calc(var(--header-h)+2rem)]">
        <p data-hero data-hero-eyebrow className="eyebrow">
          Star Oto Market · Tokat
        </p>

        {/* Her satır kendi maskesi içinde yükselir; satırlar sabit blok olduğundan taşma/kırpılma olmaz */}
        <h1 id="hero-title" className="display-hero mt-6 md:mt-8">
          {HEADLINE.map((word) => (
            <span key={word} className="-my-[0.1em] block overflow-hidden py-[0.1em]">
              <span data-hero data-hero-line className="block">
                {word}
              </span>
            </span>
          ))}
        </h1>

        <p data-hero data-hero-copy className="mt-7 max-w-md text-base leading-relaxed text-fg/80 sm:text-lg md:mt-9">
          {business.descriptor}. Oto aksesuar, döşeme ve dizayn seçeneklerini Tokat&apos;ta keşfedin.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row md:mt-10">
          <Button href="/hizmetlerimiz" dataHero>
            Hizmetleri Keşfet
          </Button>
          <Button href="/iletisim" variant="outline" dataHero>
            İletişime Geç
          </Button>
        </div>
      </div>

      <div
        data-hero
        data-hero-cue
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 md:block"
      >
        <a
          href="#tarz"
          className="pointer-events-auto flex flex-col items-center gap-3 font-display text-[0.65rem] uppercase tracking-label text-muted transition-colors hover:text-fg"
          aria-label="Aşağı kaydır"
        >
          Kaydır
          <span className="relative block h-12 w-px overflow-hidden bg-line">
            <span className="scroll-cue-dot absolute inset-x-0 top-0 block h-1/2 bg-accent" />
          </span>
          <ArrowDown size={14} aria-hidden="true" />
        </a>
      </div>

      {showDemo ? (
        <div className="absolute bottom-4 right-4 z-10 md:bottom-6 md:right-8">
          <span className="relative block h-7 w-28">
            <DemoBadge />
          </span>
        </div>
      ) : null}
    </HeroMotion>
  );
}
