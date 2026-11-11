import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { Reveal } from "@/components/motion/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { beforeYouCall, getService, services } from "@/data/services";
import { business, telHref } from "@/data/business";
import { serviceInquiry } from "@/lib/inquiry";
import { breadcrumbJsonLd, buildMetadata, serviceJsonLd } from "@/lib/seo";

interface Params {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.seoTitle.replace(/ \| Star Oto Market$/, ""),
    description: service.seoDescription,
    path: `/hizmetlerimiz/${service.slug}`,
  });
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const crumbs = [
    { name: "Ana Sayfa", href: "/" },
    { name: "Hizmetlerimiz", href: "/hizmetlerimiz" },
    { name: service.title, href: `/hizmetlerimiz/${service.slug}` },
  ];
  const inquiry = serviceInquiry(service);
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={serviceJsonLd(service)} />
      <PageHero eyebrow={`Hizmet ${service.number}`} title={service.title.toLocaleUpperCase("tr-TR")} intro={service.tagline} crumbs={crumbs} />

      <section className="bg-ink py-section">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <Reveal variant="mask" className="media-skeleton relative aspect-[4/3] overflow-hidden">
              <SmartImage src={service.image.src} fallback={service.image.fallback} alt={service.image.alt} fill priority sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover" />
              {service.isDemo !== false ? <DemoBadge /> : null}
            </Reveal>
            <div className="mt-12 space-y-6">
              {service.description.map((p) => (
                <p key={p} className="lead max-w-2xl text-fg/80">
                  {p}
                </p>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
              <h2 className="font-display text-xl font-semibold tracking-tight">Neler sorabilirsiniz?</h2>
              <ul className="mt-6 divide-y divide-line border-y border-line">
                {service.topics.map((topic) => (
                  <li key={topic} className="flex items-start gap-3 py-4 text-sm leading-relaxed text-fg/85">
                    <Check size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                    {topic}
                  </li>
                ))}
              </ul>

              <h2 className="mt-10 font-display text-xl font-semibold tracking-tight">Bilgi almadan önce</h2>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                {beforeYouCall.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2 h-px w-4 shrink-0 bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-col gap-3">
                <Button href={inquiry.href} external={inquiry.external}>
                  Bu Hizmet Hakkında Bilgi Al
                </Button>
                <a href={telHref} className="btn btn-outline">
                  <span>{business.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section aria-labelledby="other-services" className="border-t border-line bg-carbon py-section">
        <div className="container-x">
          <h2 id="other-services" className="display-md">
            DİĞER HİZMETLERİMİZ
          </h2>
          <ul className="mt-10 divide-y divide-line border-y border-line">
            {others.map((s) => (
              <li key={s.slug}>
                <Link href={`/hizmetlerimiz/${s.slug}`} className="group flex min-h-16 items-center justify-between gap-4 py-5 transition-colors hover:text-accent">
                  <span className="flex items-baseline gap-5">
                    <span className="font-display text-xs tracking-label text-muted">{s.number}</span>
                    <span className="font-display text-xl font-semibold sm:text-2xl">{s.title}</span>
                  </span>
                  <span aria-hidden="true" className="transition-transform duration-500 ease-premium group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
