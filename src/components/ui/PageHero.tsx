import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import type { Crumb } from "@/types";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  intro?: string;
  crumbs: Crumb[];
  children?: ReactNode;
}

/** Alt sayfaların ortak üst bölümü */
export function PageHero({ eyebrow, title, intro, crumbs, children }: PageHeroProps) {
  return (
    <section className="relative border-b border-line pb-14 pt-[calc(var(--header-h)+2.5rem)] md:pb-24">
      <div className="container-x">
        <Breadcrumbs items={crumbs} />
        <Eyebrow>{eyebrow}</Eyebrow>
        <Reveal as="h1" className="display-lg mt-6 max-w-5xl">
          {title}
        </Reveal>
        {intro ? (
          <Reveal as="p" delay={120} className="lead mt-6 max-w-2xl">
            {intro}
          </Reveal>
        ) : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}
