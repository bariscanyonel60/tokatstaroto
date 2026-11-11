"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useState } from "react";
import { isSvgSrc } from "@/lib/media";

type SmartImageProps = Omit<ImageProps, "onError" | "src"> & {
  src: string;
  /** Dosya yoksa kullanılan yol (genelde demo SVG). Önce bu gösterilir; `src` yüklenirse yükseltilir. */
  fallback?: string;
};

/**
 * next/image sarmalayıcısı. SVG yer tutucuları optimize edilmez.
 * `fallback` varsa kırık görsel asla görünmez: önce yedek, sonra gerçek fotoğraf (varsa).
 */
export function SmartImage({ src, alt, fallback, unoptimized, ...rest }: SmartImageProps) {
  const safe = fallback ?? src;
  const [resolved, setResolved] = useState(safe);
  const [slot, setSlot] = useState({ src, fallback });

  // src/fallback değişince render sırasında sıfırla (effect içinde setState yok)
  if (slot.src !== src || slot.fallback !== fallback) {
    setSlot({ src, fallback });
    setResolved(safe);
  }

  useEffect(() => {
    if (!fallback || fallback === src) return;

    let cancelled = false;
    const probe = new window.Image();
    probe.onload = () => {
      if (!cancelled) setResolved(src);
    };
    probe.onerror = () => {
      if (!cancelled) setResolved(fallback);
    };
    probe.src = src;
    return () => {
      cancelled = true;
      probe.onload = null;
      probe.onerror = null;
    };
  }, [src, fallback]);

  return <Image src={resolved} alt={alt} unoptimized={unoptimized ?? isSvgSrc(resolved)} {...rest} />;
}

export { isSvgSrc };
