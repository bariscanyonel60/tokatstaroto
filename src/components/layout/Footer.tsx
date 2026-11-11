import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { business, directionsHref, locationLabel, telHref } from "@/data/business";
import { navItems } from "@/data/navigation";
import { services } from "@/data/services";

export function Footer() {
  const social = [
    business.social.instagram ? { label: "Instagram", href: business.social.instagram } : null,
    business.social.facebook ? { label: "Facebook", href: business.social.facebook } : null,
  ].filter((s): s is { label: string; href: string } => Boolean(s));

  return (
    <footer className="relative overflow-hidden border-t border-line bg-carbon pb-24 md:pb-0">
      <div className="container-x relative z-10 grid gap-14 py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
            <span className="font-medium text-fg/90">{business.slogan}.</span> {business.shortDescription}
          </p>
        </div>

        <nav aria-label="Alt gezinme" className="md:col-span-2">
          <h2 className="font-display text-[0.72rem] uppercase tracking-label text-muted">Sayfalar</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Hizmet kategorileri" className="md:col-span-2">
          <h2 className="font-display text-[0.72rem] uppercase tracking-label text-muted">Hizmetler</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/hizmetlerimiz/${service.slug}`} className="transition-colors hover:text-accent">
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <h2 className="font-display text-[0.72rem] uppercase tracking-label text-muted">İletişim</h2>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a href={telHref} className="font-display text-lg font-semibold transition-colors hover:text-accent">
                {business.phoneDisplay}
              </a>
            </li>
            <li className="text-muted">{locationLabel()}</li>
            {business.email ? (
              <li>
                <a href={`mailto:${business.email}`} className="transition-colors hover:text-accent">
                  {business.email}
                </a>
              </li>
            ) : null}
            <li>
              <a href={directionsHref} target="_blank" rel="noopener noreferrer" className="link-arrow">
                Yol tarifi
              </a>
            </li>
            {social.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-x relative z-10 flex flex-col gap-3 border-t border-line py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {business.name} — {business.descriptor}. Tüm hakları saklıdır.
        </p>
        <Link href="/gizlilik" className="transition-colors hover:text-fg">
          Gizlilik ve KVKK Aydınlatma Metni
        </Link>
      </div>

      <div aria-hidden="true" className="pointer-events-none relative -mb-[2.2vw] overflow-hidden px-[2vw] pb-0 pt-4">
        <p className="footer-mark">STAR OTO</p>
      </div>
    </footer>
  );
}
