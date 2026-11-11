import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { services } from "@/data/services";
import { media } from "@/lib/media";
import { resolveMedia } from "@/lib/resolve-media";

/** Marka hikâyesi: bölünmüş ekran, editoryal tipografi. Şirket geçmişi ya da rakam uydurulmaz. */
export function AboutSection() {
  return (
    <section id="tarz" aria-labelledby="about-title" className="relative bg-ink py-section">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="relative lg:col-span-6 lg:pr-6">
          <Reveal variant="mask" className="media-skeleton relative aspect-[4/5] w-full overflow-hidden">
            <SmartImage
              src={resolveMedia(media.about)}
              fallback={media.about.fallback}
              alt="Star Oto Market Tokat mağaza önü ve tabelası"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            {resolveMedia(media.about).endsWith(".svg") ? <DemoBadge /> : null}
          </Reveal>
          <span
            aria-hidden="true"
            className="absolute -bottom-6 -right-2 hidden font-display text-[7rem] font-bold leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.14)] lg:block"
          >
            01
          </span>
        </div>

        <div className="lg:col-span-6">
          <Eyebrow>Hakkımızda</Eyebrow>
          <Reveal as="h2" className="display-xl mt-6" delay={60}>
            <span id="about-title">HER ARAÇ BİR TARZ YANSITIR.</span>
          </Reveal>
          <Reveal as="p" className="lead mt-8 max-w-xl" delay={140}>
            Star Oto Market, Tokat&apos;ta oto aksesuar, oto döşeme ve oto dizayn seçeneklerini bir araya getiriyor.
            İmzamız değer katar — aracınızın görünümünü ve kullanım deneyimini geliştirecek seçenekleri keşfedin.
          </Reveal>

          <Reveal variant="line" className="divider-line mt-10" />

          <ul className="mt-2 divide-y divide-line">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/hizmetlerimiz/${service.slug}`}
                  className="group flex min-h-14 items-center justify-between gap-4 py-4 transition-colors hover:text-accent"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="font-display text-xs tracking-label text-muted">{service.number}</span>
                    <span className="font-display text-lg font-semibold">{service.title}</span>
                  </span>
                  <span aria-hidden="true" className="transition-transform duration-500 ease-premium group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
