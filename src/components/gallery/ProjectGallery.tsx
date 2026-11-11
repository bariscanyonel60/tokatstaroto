"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { Maximize2, SplitSquareHorizontal } from "lucide-react";
import { ProjectDialog } from "@/components/gallery/ProjectDialog";
import { Reveal } from "@/components/motion/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

/**
 * Editoryal, asimetrik galeri. Kart ızgarası yerine masaüstünde 12 sütunlu karışık ölçekli yerleşim:
 * her kare farklı genişlik/oran ve dikey kaydırmaya sahiptir. Mobilde tek sütun, doğal oranlar.
 */
const LAYOUT = [
  "lg:col-span-7 aspect-[4/3]",
  "lg:col-span-5 lg:mt-24 aspect-[4/5]",
  "lg:col-span-4 aspect-[4/5]",
  "lg:col-span-8 lg:mt-16 aspect-[16/10]",
  "lg:col-span-6 aspect-[4/3]",
  "lg:col-span-6 lg:mt-20 aspect-[4/3]",
];

export function ProjectGallery({ projects, showFilters = true }: { projects: Project[]; showFilters?: boolean }) {
  const [active, setActive] = useState("all");
  const [selected, setSelected] = useState<Project | null>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  const categories = useMemo(() => Array.from(new Set(projects.map((p) => p.category))), [projects]);
  const visible = active === "all" ? projects : projects.filter((p) => p.category === active);

  const open = (project: Project, el: HTMLElement) => {
    lastTrigger.current = el;
    setSelected(project);
  };
  const close = useCallback(() => {
    setSelected(null);
    // Odağı kapatılan kareye geri ver
    requestAnimationFrame(() => lastTrigger.current?.focus());
  }, []);

  return (
    <div>
      {showFilters && categories.length > 1 ? (
        <div role="group" aria-label="Uygulama kategorileri" className="-mx-5 mb-12 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
          {["all", ...categories].map((cat) => (
            <button
              key={cat}
              type="button"
              aria-pressed={active === cat}
              onClick={() => setActive(cat)}
              className={cn(
                "min-h-11 shrink-0 border px-5 font-display text-[0.74rem] font-medium uppercase tracking-[0.14em] transition-colors duration-300",
                active === cat ? "border-accent bg-accent text-ink" : "border-line text-muted hover:border-fg/40 hover:text-fg"
              )}
            >
              {cat === "all" ? "Tümü" : cat}
            </button>
          ))}
        </div>
      ) : null}

      <ul key={active} className="page-enter grid gap-x-8 gap-y-14 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-8">
        {visible.map((project, index) => (
          <Reveal as="li" key={project.id} delay={(index % 2) * 90} className={cn("min-w-0", LAYOUT[index % LAYOUT.length].split(" ").filter((c) => c.startsWith("lg:")).join(" "))}>
            <button
              type="button"
              onClick={(e) => open(project, e.currentTarget)}
              aria-haspopup="dialog"
              className="group block w-full text-left"
            >
              <span className={cn("media-skeleton relative block w-full overflow-hidden", LAYOUT[index % LAYOUT.length].split(" ").filter((c) => c.startsWith("aspect")).join(" "))}>
                <SmartImage
                  src={project.cover.src}
                  fallback={project.cover.fallback}
                  alt={project.cover.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-transform duration-[1400ms] ease-premium group-hover:scale-[1.05]"
                />
                {project.isDemo ? <DemoBadge /> : null}
                <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-50" />
                <span className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center bg-ink/80 text-fg transition-colors duration-300 group-hover:bg-accent group-hover:text-ink">
                  <Maximize2 size={16} aria-hidden="true" />
                </span>
                {project.before ? (
                  <span className="absolute bottom-4 left-4 flex items-center gap-2 bg-ink/80 px-3 py-2 font-display text-[0.65rem] uppercase tracking-label text-fg">
                    <SplitSquareHorizontal size={14} className="text-accent" aria-hidden="true" />
                    Önce / Sonra
                  </span>
                ) : null}
              </span>
              <span className="mt-4 flex items-baseline justify-between gap-4">
                <span className="font-display text-lg font-semibold tracking-tight sm:text-xl">{project.title}</span>
                <span className="shrink-0 font-display text-[0.68rem] uppercase tracking-label text-accent">{project.category}</span>
              </span>
            </button>
          </Reveal>
        ))}
      </ul>

      <ProjectDialog project={selected} onClose={close} />
    </div>
  );
}
