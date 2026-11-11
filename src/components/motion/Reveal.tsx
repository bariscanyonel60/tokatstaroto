"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode, type Ref } from "react";
import { cn } from "@/lib/utils";

type Tag = "div" | "p" | "h1" | "h2" | "h3" | "li" | "span" | "figure" | "section" | "ul";

interface RevealProps {
  as?: Tag;
  /** `variant="line"` dekoratif çizgiler için opsiyonel */
  children?: ReactNode;
  className?: string;
  /** ms cinsinden gecikme */
  delay?: number;
  /** fade: opaklık+kayma · mask: aşağıdan yukarı maske açılışı · line: soldan sağa çizgi */
  variant?: "fade" | "mask" | "line";
}

/**
 * Hafif, GSAP'siz görünür-olunca-aç bileşeni (IntersectionObserver + CSS geçişi).
 * Stiller globals.css içindedir; JS yoksa ya da azaltılmış hareket tercih edilmişse içerik her zaman görünür.
 */
export function Reveal({ as = "div", children, className, delay = 0, variant = "fade" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.dataset.revealed = "true";
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.dataset.revealed = "true";
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const variantClass = variant === "mask" ? "reveal-mask" : variant === "line" ? "reveal-line" : "reveal";
  const classNames = cn(variantClass, className);
  const style = { "--reveal-delay": `${delay}ms` } as CSSProperties;
  const elementRef = ref as Ref<HTMLElement>;

  switch (as) {
    case "p":
      return (
        <p ref={elementRef as Ref<HTMLParagraphElement>} className={classNames} style={style}>
          {children}
        </p>
      );
    case "h1":
      return (
        <h1 ref={elementRef as Ref<HTMLHeadingElement>} className={classNames} style={style}>
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2 ref={elementRef as Ref<HTMLHeadingElement>} className={classNames} style={style}>
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3 ref={elementRef as Ref<HTMLHeadingElement>} className={classNames} style={style}>
          {children}
        </h3>
      );
    case "li":
      return (
        <li ref={elementRef as Ref<HTMLLIElement>} className={classNames} style={style}>
          {children}
        </li>
      );
    case "span":
      return (
        <span ref={elementRef as Ref<HTMLSpanElement>} className={classNames} style={style}>
          {children}
        </span>
      );
    case "figure":
      return (
        <figure ref={elementRef as Ref<HTMLElement>} className={classNames} style={style}>
          {children}
        </figure>
      );
    case "section":
      return (
        <section ref={elementRef as Ref<HTMLElement>} className={classNames} style={style}>
          {children}
        </section>
      );
    case "ul":
      return (
        <ul ref={elementRef as Ref<HTMLUListElement>} className={classNames} style={style}>
          {children}
        </ul>
      );
    case "div":
      return (
        <div ref={elementRef as Ref<HTMLDivElement>} className={classNames} style={style}>
          {children}
        </div>
      );
    default: {
      const _exhaustive: never = as;
      return _exhaustive;
    }
  }
}
