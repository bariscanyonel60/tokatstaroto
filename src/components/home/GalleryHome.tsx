import Link from "next/link";
import { BeforeAfter } from "@/components/gallery/BeforeAfter";
import { ProjectGallery } from "@/components/gallery/ProjectGallery";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { DEMO_NOTE, projects } from "@/data/projects";

/** Ana sayfa galerisi: önce/sonra vitrini + seçili projeler. */
export function GalleryHome() {
  const compare = projects.find((p) => p.before);
  const selection = projects.filter((p) => p.id !== compare?.id).slice(0, 4);

  return (
    <section aria-labelledby="gallery-title" className="bg-carbon py-section">
      <div className="container-x">
        <div className="mb-14 grid gap-8 md:mb-20 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Eyebrow>Uygulamalarımız</Eyebrow>
            <Reveal as="h2" className="display-xl mt-6">
              <span id="gallery-title">HER UYGULAMADA FARKLI BİR KARAKTER.</span>
            </Reveal>
          </div>
          <Reveal as="p" delay={120} className="lead lg:col-span-4">
            Aracınıza değer katan detayları ve uygulama seçeneklerini yakından keşfedin.
          </Reveal>
        </div>

        {compare?.before ? (
          <div className="mb-24 grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-8">
              <BeforeAfter before={compare.before} after={compare.cover} />
            </div>
            <div className="lg:col-span-4">
              <p className="font-display text-[0.7rem] uppercase tracking-label text-accent">Önce / Sonra</p>
              <h3 className="mt-3 font-display text-2xl font-bold tracking-tight">{compare.title}</h3>
              <p className="mt-4 text-muted">{compare.description}</p>
              <p className="mt-4 text-xs text-muted">Tutamacı sürükleyin ya da ok tuşlarını kullanın.</p>
              {compare.isDemo ? (
                <p className="mt-6 border border-line p-3 text-xs leading-relaxed text-muted">
                  <strong className="font-medium text-fg">Demo içerik.</strong> {DEMO_NOTE}
                </p>
              ) : null}
            </div>
          </div>
        ) : null}

        <ProjectGallery projects={selection} showFilters={false} />

        <div className="mt-16 flex justify-center">
          <Link href="/uygulamalarimiz" className="btn btn-outline">
            <span>Tüm Uygulamalar</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
