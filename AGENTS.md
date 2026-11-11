# Star Oto Market — Agent Guide

Tokat merkezli **Star Oto Market — Aksesuar & Dizayn** için Next.js (App Router) + TypeScript + Tailwind CSS v3 + GSAP sitesi.

## Çalıştırma

```bash
npm install
npm run dev          # http://localhost:3000
npm run typecheck    # tsc --noEmit
npm run lint         # eslint .  (Next 16: next lint yok)
npm run build
npm run placeholders # demo SVG üretir
```

Node ≥ 20.9. Ortam: `.env.example` → `.env.local`.

## Dokunma kuralları

- İşletme bilgisi uydurma. Doğrulanmamış değerler `src/data/business.ts` içinde `null` kalır.
- `isDemo: true` görsellerde "Demo görsel" etiketi zorunlu.
- İçerik yalnızca `src/data/*` dosyalarından gelir; bileşene sabit içerik gömme.
- Framer Motion / Lenis / scroll hijacking yok. Mobilde pin ve yatay kaydırma yok.
- Yeni ağır MCP/plugin ekleme; Netlify/Vercel Skills, mevcut çekirdek yeterli.

## Mimari

```
src/app/          sayfalar, layout, sitemap, robots, OG, api/iletisim
src/components/   layout, home, services, products, gallery, contact, motion, ui
src/data/         business, services, products, projects, interior, navigation
src/lib/          seo, site, gsap, inquiry, contact-validation, utils
public/images/    gerçek fotoğraf slotları (README.md rehberi)
public/placeholders/  demo SVG’ler
```

## Test notları

Genişlikler: 320 / 375 / 390 / 430 / 768 / 1024 / 1440 / 1920 — yatay taşma olmamalı (`scrollWidth <= innerWidth`).
`/api/iletisim`: env yoksa 503; doğrulama hatası 422; honeypot + hız sınırı aktif; başarıyı taklit etme.
