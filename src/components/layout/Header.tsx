"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Phone } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { navItems } from "@/data/navigation";
import { business, locationLabel, telHref } from "@/data/business";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Rota değişince menüyü kapat (render sırasında, effect ile setState zinciri yok)
  const menuOpen = open && menuPath === pathname;
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    if (open) setOpen(false);
  }

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  // Kaydırmada şeffaftan koyu zemine geçiş
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    // İlk değeri effect dışında senkron okumamak için rAF ile abone sonrası ölç
    const frame = window.requestAnimationFrame(onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Menü açıkken: kaydırmayı kilitle, arka planı inert yap, odağı yönet, ESC ile kapat
  useEffect(() => {
    if (!menuOpen) return;
    const menu = menuRef.current;
    const toggle = toggleRef.current;
    const main = document.getElementById("icerik");
    const footer = document.querySelector("footer");
    const contactBar = document.querySelector("[data-mobile-contact-bar]");

    document.documentElement.style.overflow = "hidden";
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");
    contactBar?.setAttribute("inert", "");
    menu?.querySelector<HTMLElement>("a[href]")?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle?.focus();
        return;
      }
      if (event.key !== "Tab" || !menu || !toggle) return;
      const focusables = [toggle, ...Array.from(menu.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"))];
      const index = focusables.indexOf(document.activeElement as HTMLElement);
      if (event.shiftKey && (index <= 0 || index === -1)) {
        event.preventDefault();
        focusables[focusables.length - 1].focus();
      } else if (!event.shiftKey && (index === focusables.length - 1 || index === -1)) {
        event.preventDefault();
        focusables[0].focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      contactBar?.removeAttribute("inert");
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-500 ease-premium",
        scrolled || menuOpen ? "border-line bg-ink" : "border-transparent bg-transparent"
      )}
    >
      <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-6">
        <Logo />

        {/* Masaüstü gezinme */}
        <nav aria-label="Ana gezinme" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "nav-link font-display text-[0.78rem] font-medium uppercase tracking-[0.14em] transition-colors duration-300",
                    isActive(item.href) ? "text-fg" : "text-muted hover:text-fg"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={telHref}
            className="btn btn-primary hidden min-h-11 px-5 lg:inline-flex"
            aria-label={`${business.name} telefon: ${business.phoneDisplay}`}
          >
            <Phone size={15} aria-hidden="true" />
            <span>{business.phoneDisplay}</span>
          </a>

          {/* Mobil menü düğmesi: metin etiketli, iki çizgili özel işaret */}
          <button
            ref={toggleRef}
            type="button"
            className="relative flex min-h-11 items-center gap-3 px-1 font-display text-[0.78rem] font-semibold uppercase tracking-[0.18em] lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobil-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span>{menuOpen ? "Kapat" : "Menü"}</span>
            <span aria-hidden="true" className="relative block h-3 w-8">
              <span
                className={cn(
                  "absolute left-0 h-[2px] bg-fg transition-all duration-500 ease-premium",
                  menuOpen ? "top-[5px] w-8 rotate-45 bg-accent" : "top-0 w-8"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-[2px] bg-accent transition-all duration-500 ease-premium",
                  menuOpen ? "top-[5px] w-8 -rotate-45" : "top-[10px] w-5"
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobil tam ekran menü */}
      <div
        ref={menuRef}
        id="mobil-menu"
        data-open={menuOpen}
        inert={!menuOpen}
        className="menu-panel fixed inset-0 -z-10 overflow-y-auto bg-ink lg:hidden"
      >
        <div className="container-x flex min-h-full flex-col justify-between gap-10 pb-10 pt-[calc(var(--header-h)+1.5rem)]">
          <nav aria-label="Mobil gezinme">
            <ul className="divide-y divide-line border-y border-line">
              {navItems.map((item, index) => (
                <li key={item.href} className="menu-link" style={{ "--i": index } as CSSProperties}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="flex min-h-[3.75rem] items-center justify-between gap-4 py-3"
                  >
                    <span
                      className={cn(
                        "font-display text-[clamp(1.6rem,7.5vw,2.4rem)] font-bold leading-none tracking-tight",
                        isActive(item.href) ? "text-accent" : "text-fg"
                      )}
                    >
                      {item.label}
                    </span>
                    <span className="font-display text-xs tracking-label text-muted">0{index + 1}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="menu-link space-y-4" style={{ "--i": navItems.length } as CSSProperties}>
            <p className="text-sm text-muted">{locationLabel()}</p>
            <a href={telHref} className="btn btn-primary w-full">
              <Phone size={16} aria-hidden="true" />
              <span>{business.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
