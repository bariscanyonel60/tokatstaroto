import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { ProjectGallery } from "@/components/gallery/ProjectGallery";
import { ContactSection } from "@/components/contact/ContactSection";
import { DEMO_NOTE, projects } from "@/data/projects";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import type { Crumb } from "@/types";

export const metadata: Metadata = buildMetadata({
  title: "Uygulamalarımız | Tokat Oto Dizayn ve Döşeme Örnekleri",
  description:
    "Araç içi dizayn, oto döşeme ve aksesuar uygulamalarını yakından inceleyin. Önce/sonra karşılaştırmalarıyla detayları keşfedin.",
  path: "/uygulamalarimiz",
});

const crumbs: Crumb[] = [
  { name: "Ana Sayfa", href: "/" },
  { name: "Uygulamalarımız", href: "/uygulamalarimiz" },
];

export default function ApplicationsPage() {
  const hasDemo = projects.some((p) => p.isDemo);
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero
        eyebrow="Uygulamalarımız"
        title="HER UYGULAMADA FARKLI BİR KARAKTER."
        intro="Aracınıza değer katan detayları ve uygulama seçeneklerini yakından keşfedin."
        crumbs={crumbs}
      >
        {hasDemo ? (
          <p className="inline-block max-w-2xl border border-line p-4 text-xs leading-relaxed text-muted">
            <strong className="font-medium text-fg">Demo içerik.</strong> {DEMO_NOTE}
          </p>
        ) : null}
      </PageHero>

      <section aria-label="Uygulama galerisi" className="bg-ink py-section">
        <div className="container-x">
          <ProjectGallery projects={projects} />
        </div>
      </section>

      <ContactSection />
    </>
  );
}
