import { Eyebrow } from "@/components/ui/Eyebrow";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { SmartImage } from "@/components/ui/SmartImage";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { media } from "@/lib/media";
import { resolveMedia } from "@/lib/resolve-media";

/** Tek bir tam genişlik sinematik an: yakın çekim doku + hafif paralaks. */
export function FeatureBand() {
  return (
    <section aria-labelledby="feature-title" className="relative isolate flex min-h-[78svh] items-end overflow-hidden bg-carbon">
      <Parallax amount={10} className="absolute -inset-y-[15%] inset-x-0 -z-10">
        <SmartImage
          src={resolveMedia(media.featureBand)}
          fallback={media.featureBand.fallback}
          alt="Ön koruma demirli Ford Transit — Star Oto Market uygulaması"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </Parallax>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/55 to-ink/20" />
      <div className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-ink/80 via-transparent to-transparent md:block" />
      {resolveMedia(media.featureBand).endsWith(".svg") ? <DemoBadge /> : null}

      <div className="container-x pb-16 pt-40 md:pb-24">
        <Eyebrow>Detay</Eyebrow>
        <Reveal as="h2" className="display-xl mt-6 max-w-4xl">
          <span id="feature-title">FARKI DETAYLAR BELİRLER.</span>
        </Reveal>
        <Reveal as="p" delay={120} className="lead mt-6 max-w-lg text-fg/80">
          Dikiş, doku ve malzeme gibi küçük ayrıntılar aracın bütün karakterini değiştirir.
        </Reveal>
        <Reveal delay={200} className="mt-9">
          <Button href="/uygulamalarimiz" variant="outline">
            Uygulamaları Gör
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
