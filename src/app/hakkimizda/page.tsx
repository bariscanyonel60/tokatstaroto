import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { AboutSection } from "@/components/home/AboutSection";
import { WhyUs } from "@/components/home/WhyUs";
import { ContactSection } from "@/components/contact/ContactSection";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import type { Crumb } from "@/types";

export const metadata: Metadata = buildMetadata({
  title: "Hakkımızda | Tokat Oto Market ve Araç Dizayn",
  description:
    "Star Oto Market, Tokat'ta otomotiv aksesuarları ve araç dizaynına yönelik çözümleri bir araya getiriyor. Bizi tanıyın.",
  path: "/hakkimizda",
});

const crumbs: Crumb[] = [
  { name: "Ana Sayfa", href: "/" },
  { name: "Hakkımızda", href: "/hakkimizda" },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero
        eyebrow="Hakkımızda"
        title="STAR OTO MARKET."
        intro="Tokat'ta otomotiv aksesuarları ve araç dizaynına yönelik çözümleri bir araya getiriyoruz."
        crumbs={crumbs}
      />
      <AboutSection />
      <section className="border-t border-line bg-ink py-section">
        <div className="container-x max-w-3xl">
          <Reveal as="p" className="lead text-fg/80">
            Her araç farklıdır ve her sürücünün beklentisi de farklıdır. Bu yüzden önce sizi dinlemek, ardından aracınıza uygun
            seçenekleri birlikte değerlendirmek istiyoruz. Merak ettiğiniz ürün ya da hizmet için bizi arayabilir veya formu
            doldurabilirsiniz.
          </Reveal>
        </div>
      </section>
      <WhyUs />
      <ContactSection />
    </>
  );
}
