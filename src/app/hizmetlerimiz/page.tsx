import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { Reveal } from "@/components/motion/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { ContactSection } from "@/components/contact/ContactSection";
import { services } from "@/data/services";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import type { Crumb } from "@/types";

export const metadata: Metadata = buildMetadata({
  title: "Tokat Oto Aksesuar, Oto Döşeme ve Araç Dizayn Hizmetleri",
  description:
    "Tokat'ta oto aksesuar, araç içi dizayn, oto döşeme ve araç kişiselleştirme seçenekleri. Star Oto Market hizmetleri hakkında bilgi alın.",
  path: "/hizmetlerimiz",
});

const crumbs: Crumb[] = [
  { name: "Ana Sayfa", href: "/" },
  { name: "Hizmetlerimiz", href: "/hizmetlerimiz" },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero
        eyebrow="Hizmetlerimiz"
        title="ARACINIZA KARAKTER KATAN SEÇENEKLER."
        intro="Aksesuardan döşemeye, iç mekân dizaynından kişiselleştirmeye kadar sunduğumuz alanları inceleyin. Her biri için bizimle konuşup aracınıza uygun seçenekleri öğrenebilirsiniz."
        crumbs={crumbs}
      />

      <section aria-label="Hizmet listesi" className="bg-ink py-section">
        <div className="container-x space-y-24 md:space-y-32">
          {services.map((service, index) => (
            <article key={service.slug} className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-16">
              <Reveal variant="mask" className={`media-skeleton relative aspect-[4/3] overflow-hidden lg:col-span-7 ${index % 2 ? "lg:order-2" : ""}`}>
                <SmartImage src={service.image.src} fallback={service.image.fallback} alt={service.image.alt} fill sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover transition-transform duration-[1400ms] ease-premium group-hover:scale-[1.04]" />
                {service.isDemo !== false ? <DemoBadge /> : null}
              </Reveal>
              <div className="lg:col-span-5">
                <p className="font-display text-sm tracking-label text-accent">{service.number}</p>
                <h2 className="display-md mt-4">
                  <Link href={`/hizmetlerimiz/${service.slug}`} className="transition-colors hover:text-accent">
                    {service.title.toLocaleUpperCase("tr-TR")}
                  </Link>
                </h2>
                <p className="lead mt-5">{service.summary}</p>
                <Link href={`/hizmetlerimiz/${service.slug}`} className="link-arrow mt-8">
                  Detayları İncele <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <ContactSection />
    </>
  );
}
