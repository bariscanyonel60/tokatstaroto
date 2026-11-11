import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { MouseEventHandler, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "outline";
  className?: string;
  /** Sağdaki ok simgesi */
  arrow?: boolean;
  /** Yeni sekmede aç (harici bağlantılar) */
  external?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  ariaLabel?: string;
  /** Hero girişinde GSAP tarafından yönetilir */
  dataHero?: boolean;
}

export function Button({
  children,
  href,
  variant = "primary",
  className,
  arrow = true,
  external = false,
  type = "button",
  disabled,
  onClick,
  ariaLabel,
  dataHero,
}: ButtonProps) {
  const classes = cn("btn", variant === "primary" ? "btn-primary" : "btn-outline", className);
  const heroAttr = dataHero ? { "data-hero": "", "data-hero-cta": "" } : {};
  const content = (
    <>
      <span>{children}</span>
      {arrow ? <ArrowRight className="btn-arrow" size={17} aria-hidden="true" /> : null}
    </>
  );

  if (href) {
    const isInternal = href.startsWith("/") && !href.startsWith("//");
    if (isInternal) {
      return (
        <Link href={href} className={classes} aria-label={ariaLabel} {...heroAttr}>
          {content}
        </Link>
      );
    }
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...heroAttr}
      >
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick} aria-label={ariaLabel} {...heroAttr}>
      {content}
    </button>
  );
}
