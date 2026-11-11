# Görsel slotları — Star Oto Market

Bu klasörler **gerçek işletme fotoğrafları** içindir. Dosya yokken site otomatik olarak `public/placeholders/` altındaki demo SVG’ye düşer; kırık görsel gösterilmez.

Demo SVG’ler gerçek uygulama gibi sunulmaz; arayüzde **“Demo görsel” / “Örnek ürün”** etiketi kalır. Gerçek fotoğraf ekledikten sonra ilgili `src/data/*.ts` kaydında `isDemo: false` yapın.

## Klasörler ve önerilen dosyalar

| Klasör | Dosya adları (öneri) | Oran | Max ağırlık | Not |
|--------|----------------------|------|-------------|-----|
| `hero/` | `desktop.jpg` (veya `.webp`/`.avif`), `mobile.jpg` | Masaüstü **16:9** (≥1920×1080); mobil **4:5** veya **9:16** (≥780×975) | ≤350 KB (WebP/AVIF) | LCP; koyu stüdyo, araç silüeti sağda/altta; metin için sol/üstte boş alan |
| `about/` | `interior.jpg` | **4:5** (≥1000×1250) | ≤280 KB | Araç içi / atölye atmosferi |
| `services/` | `oto-aksesuar.jpg`, `arac-ici-dizayn.jpg`, `oto-doseme.jpg`, `arac-kisisellestirme.jpg` | **4:5** (≥1200×1500) | ≤280 KB | Her hizmet için bir ana kare |
| `interior/` | `dashboard.jpg`, `seat.jpg`, `accessory.jpg` | **16:10** (≥1920×1200) | ≤320 KB | Araç içi sahne vitrini |
| `products/` | `product-1.jpg` … `product-8.jpg` | **4:5** (≥1000×1250) | ≤220 KB | Ürün kartları; nötr koyu zemin |
| `projects/` | `project-N.jpg`, isteğe `project-N-before.jpg`, `project-N-detail-a.jpg`, `project-N-detail-b.jpg` | Kapak **4:3** (≥1600×1200) | ≤300 KB | Galeri; önce/sonra aynı kadraj |

## Teknik

- Tercih: **AVIF** veya **WebP**; yoksa yüksek kaliteli JPEG.
- Renk: koyu, düşük doygunluk; turuncu marka vurgusu sahnede doğal olsun, yapay filtre yok.
- EXIF/GPS temizleyin; yüz/plaka varsa bulanıklaştırın.
- `src/data` içinde `src` yolunu bu slotlara bağlayın; `fallback` placeholder SVG kalsın.
