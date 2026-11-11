"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { BeforeAfter } from "@/components/gallery/BeforeAfter";
import { SmartImage } from "@/components/ui/SmartImage";
import { Button } from "@/components/ui/Button";
import { DEMO_NOTE } from "@/data/projects";
import { contactHref } from "@/lib/inquiry";
import type { Project } from "@/types";

interface ProjectDialogProps {
  project: Project | null;
  onClose: () => void;
}

/**
 * Tam ekran proje detayı. Yerel <dialog> kullanır: odak hapsi, ESC ile kapanma ve
 * arka planı etkisizleştirme tarayıcı tarafından sağlanır.
 */
export function ProjectDialog({ project, onClose }: ProjectDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (project && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
    }
    if (!project && dialog.open) dialog.close();
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [project]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="project-dialog-title"
      onClose={onClose}
      onClick={(e) => {
        // Arka plana (dialog kutusunun kendisine) tıklanınca kapat
        if (e.target === e.currentTarget) onClose();
      }}
      className="project-dialog m-0 h-[100dvh] max-h-none w-screen max-w-none overflow-y-auto bg-ink p-0 text-fg backdrop:bg-black/80"
    >
      {project ? (
        <div className="min-h-full">
          <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-line bg-ink/95 px-5 py-3 backdrop-blur-sm sm:px-8">
            <p className="font-display text-[0.72rem] uppercase tracking-label text-muted">{project.category}</p>
            <button
              type="button"
              onClick={onClose}
              className="flex min-h-11 items-center gap-2 px-2 font-display text-[0.74rem] font-semibold uppercase tracking-[0.14em] transition-colors hover:text-accent"
              aria-label="Proje detayını kapat"
            >
              Kapat <X size={18} aria-hidden="true" />
            </button>
          </div>

          <div className="container-x py-10 md:py-16">
            <h2 id="project-dialog-title" className="display-lg max-w-4xl">
              {project.title.toLocaleUpperCase("tr-TR")}
            </h2>
            <p className="lead mt-6 max-w-2xl">{project.description}</p>

            {project.isDemo ? (
              <p className="mt-6 inline-block border border-line px-4 py-2 text-xs leading-relaxed text-muted">
                <strong className="font-medium text-fg">Demo içerik.</strong> {DEMO_NOTE}
              </p>
            ) : null}

            <div className="mt-10">
              {project.before ? (
                <BeforeAfter before={project.before} after={project.cover} sizes="(max-width: 1280px) 100vw, 1200px" />
              ) : (
                <div className="media-skeleton relative aspect-[4/3] w-full overflow-hidden">
                  <SmartImage
                    src={project.cover.src}
                    fallback={project.cover.fallback}
                    alt={project.cover.alt}
                    fill
                    sizes="(max-width: 1280px) 100vw, 1200px"
                    className="object-cover"
                  />
                </div>
              )}
              {project.before ? (
                <p className="mt-3 text-xs text-muted">Karşılaştırmak için tutamacı sürükleyin ya da ok tuşlarını kullanın.</p>
              ) : null}
            </div>

            {project.gallery.length > 0 ? (
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {project.gallery.map((image) => (
                  <div key={image.src} className="media-skeleton relative aspect-[4/3] overflow-hidden">
                    <SmartImage src={image.src} fallback={image.fallback} alt={image.alt} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" />
                  </div>
                ))}
              </div>
            ) : null}

            <div className="mt-14 flex flex-col items-start gap-6 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-display text-xl font-semibold tracking-tight sm:text-2xl">Aracınız için benzer bir fikir mi düşünüyorsunuz?</p>
              <div className="flex flex-wrap gap-3">
                <Button href={contactHref({ konu: `Proje: ${project.title}` })}>Bilgi Alın</Button>
                <Link href="/uygulamalarimiz" onClick={onClose} className="btn btn-outline">
                  <span>Tüm Uygulamalar</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
