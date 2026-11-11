"use client";

import { useCallback, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { SmartImage } from "@/components/ui/SmartImage";
import type { ImageAsset } from "@/types";

interface BeforeAfterProps {
  before: ImageAsset;
  after: ImageAsset;
  /** Başlangıç konumu (0-100) */
  initial?: number;
  sizes?: string;
  className?: string;
}

const STEP = 2;
const BIG_STEP = 10;

/**
 * Yeniden kullanılabilir önce/sonra karşılaştırması.
 *  - Fare ve dokunma: Pointer Events + pointer capture (sürüklerken sayfa kaymaz: touch-action pan-y)
 *  - Klavye: ← → (2), PageUp/PageDown (10), Home/End; role="slider" ile ekran okuyucu desteği
 *  - Görseller aynı kutuda üst üste durur; "önce" görseli clip-path ile kırpılır → yeniden boyutlama gerektirmez.
 */
export function BeforeAfter({ before, after, initial = 50, sizes = "(max-width: 1024px) 100vw, 60vw", className }: BeforeAfterProps) {
  const [pos, setPos] = useState(initial);
  const boxRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const clamp = (v: number) => Math.min(100, Math.max(0, v));

  const setFromClientX = useCallback((clientX: number) => {
    const box = boxRef.current;
    if (!box) return;
    const rect = box.getBoundingClientRect();
    if (rect.width === 0) return;
    setPos(clamp(((clientX - rect.left) / rect.width) * 100));
  }, []);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) setFromClientX(e.clientX);
  };
  const endDrag = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const map: Record<string, number | undefined> = {
      ArrowLeft: pos - STEP,
      ArrowDown: pos - STEP,
      ArrowRight: pos + STEP,
      ArrowUp: pos + STEP,
      PageDown: pos - BIG_STEP,
      PageUp: pos + BIG_STEP,
      Home: 0,
      End: 100,
    };
    const next = map[e.key];
    if (next === undefined) return;
    e.preventDefault();
    setPos(clamp(next));
  };

  return (
    <div
      ref={boxRef}
      className={`relative aspect-[4/3] w-full select-none overflow-hidden bg-surface [touch-action:pan-y] ${className ?? ""}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      {/* SONRA (alt katman) */}
      <SmartImage src={after.src} fallback={after.fallback} alt={after.alt} fill sizes={sizes} draggable={false} className="pointer-events-none object-cover" />

      {/* ÖNCE (üst katman, sağdan kırpılır) */}
      <div className="pointer-events-none absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <SmartImage src={before.src} fallback={before.fallback} alt={before.alt} fill sizes={sizes} draggable={false} className="object-cover" />
      </div>

      {/* Etiketler */}
      <span className="pointer-events-none absolute left-3 top-3 bg-ink/80 px-2.5 py-1 font-display text-[0.65rem] font-medium uppercase tracking-label text-fg">
        Önce
      </span>
      <span className="pointer-events-none absolute right-3 top-3 bg-accent px-2.5 py-1 font-display text-[0.65rem] font-semibold uppercase tracking-label text-ink">
        Sonra
      </span>

      {/* Tutamaç */}
      <div
        role="slider"
        tabIndex={0}
        aria-label="Önce ve sonra karşılaştırması"
        aria-orientation="horizontal"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        aria-valuetext={`Önce görseli yüzde ${Math.round(pos)} görünüyor`}
        onKeyDown={onKeyDown}
        className="group absolute inset-y-0 z-10 -ml-6 flex w-12 cursor-ew-resize items-center justify-center focus-visible:outline-none"
        style={{ left: `${pos}%` }}
      >
        <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-fg/80" />
        <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-fg/70 bg-ink/85 text-fg transition-[transform,border-color] duration-300 ease-premium group-hover:scale-110 group-focus-visible:border-accent group-focus-visible:ring-2 group-focus-visible:ring-accent">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </div>
  );
}
