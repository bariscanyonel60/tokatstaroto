# Star Oto Market — Aksesuar & Dizayn

Tokat merkezli otomotiv aksesuar ve dizayn işletmesi için Next.js 15 (App Router), TypeScript, Tailwind CSS ve GSAP ile hazırlanmış premium web sitesi.

## Kurulum

```bash
npm install
npm run dev          # http://localhost:3000
npm run typecheck    # TypeScript kontrolü
npm run lint         # ESLint
npm run build        # production derlemesi
```

Node 20.9 veya üzeri gerekir. `.env.example` dosyasını `.env.local` olarak kopyalayıp doldurun.

> **Dürüst durum notu:** Bu proje paket kurulumu yapılamayan bir ortamda yazıldı. `npm install`, `next build`, `tsc` ve `eslint` **çalıştırılmadı**. Yapılan tek kontroller: tüm `.ts/.tsx` dosyalarının sözdizimi denetimi, form doğrulama mantığının birim testi ve yer tutucu görsellerin tarayıcıda çizilmesi. İlk iş olarak yukarıdaki komutları çalıştırıp çıkan hataları düzeltin.

## Yayından önce MUTLAKA yapılacaklar

1. **`src/data/business.ts`**: açık adres, WhatsApp numarası (ülke kodlu, `905XXXXXXXXX`), e-posta, sosyal medya bağlantılarını doğrulayıp doldurun. Boş bırakılanlar sitede gösterilmez. WhatsApp girilince ürün/hizmet CTA'ları, mobil çubuk ve iletişim bölümü otomatik WhatsApp'a geçer.
2. **Gerçek fotoğraflar**: `public/placeholders/` içindekiler kod ile üretilmiş **demo görsellerdir**. Gerçek fotoğrafları `src/data/projects.ts`, `products.ts`, `services.ts`, `interior.ts` içinde değiştirip `isDemo: false` yapın (galeri/ürün kartlarındaki "Demo" etiketleri kalkar). Hero görselleri `src/components/home/Hero.tsx` içindedir.
3. **İletişim formu**: `.env.local` içinde `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` tanımlayın. Tanımlı değilse form "etkin değil" der ve başarılı gönderimi **taklit etmez**.
4. **`NEXT_PUBLIC_SITE_URL`**: gerçek alan adı (canonical, sitemap, Open Graph, JSON-LD için).
5. **`/gizlilik`** metni taslaktır; ticari unvan ve adresle birlikte hukuk danışmanına gösterin.
6. Yerel çalışma saatleri, puan, yorum gibi doğrulanmamış veriler bilerek eklenmemiştir.

## İki promptun birleştirilmesi

- Birinci promptun "DETAYLARDA FARK YARATIN." başlığı ikinci promptta araç içi deneyim bölümüne taşınmıştı. Galeri ise "HER UYGULAMADA FARKLI BİR KARAKTER." oldu. Bu projede de öyle uygulandı.
- "Immersive feature" (FARKI DETAYLAR BELİRLER.) ayrı bir sinematik bant olarak tutuldu; araç içi sahne vitrininden farklı bir ritim verir.
- Hero, yatay hizmet vitrini, galeri ve before/after için tekrar eden maddeler tek bileşende toplandı.

## Mimari

```
src/
  app/            sayfalar, layout, sitemap, robots, OG görseli, /api/iletisim
  components/
    layout/       Header, Footer, Logo, MobileContactBar
    home/         Hero(+HeroMotion), AboutSection, InteriorShowcase, ProductsPreview, FeatureBand, GalleryHome, WhyUs
    services/     ServicesShowcase (yatay vitrin)
    products/     ProductCard, ProductExplorer
    gallery/      BeforeAfter, ProjectGallery, ProjectDialog
    contact/      ContactSection, ContactForm, ContactDetails
    motion/       Reveal, Parallax, ScrollRefresh
    ui/           Button, Eyebrow, DemoBadge, PageHero, Breadcrumbs, JsonLd, SmartImage
  data/           business, services, products, projects, interior, navigation  (tüm içerik burada)
  lib/            seo, site, gsap, inquiry, contact-validation, utils
scripts/          generate-placeholders.mjs  (npm run placeholders)
```

## Hareket ve mobil güvenliği

- Tüm GSAP kodu `gsap.matchMedia()` ile yönetilir; temizlik `mm.revert()` ile yapılır.
- **Masaüstü (≥1024px, hareket azaltılmamış):** hizmet vitrini yatay kaydırma ve araç içi sahneler sabitlenir. Kaydırma mesafesi ölçülür (sabit piksel yok), `invalidateOnRefresh` açıktır, son içerikten sonra bölüm serbest kalır.
- **Mobil/tablet:** sabitleme ve yatay kaydırma **yoktur**. Hizmetler ve sahneler dikey akar, görünür olunca açılır; kaydırma kilidi yok.
- `prefers-reduced-motion`: animasyonsuz, tüm içerik anında görünür. JS yoksa hero 4 sn sonra yine görünür.
- Pinned bölümlerde `transform` içeren üst öğe yoktur (sayfa geçişi yalnızca opaklık).

## SEO

Benzersiz title/description, canonical, Open Graph/Twitter, `sitemap.xml`, `robots.txt`, breadcrumb (görünür + `BreadcrumbList`), `LocalBusiness` ve `Service` JSON-LD, hizmet başına ayrı sayfa (`/hizmetlerimiz/[slug]`). Yapılandırılmış veride yalnızca doğrulanmış bilgi bulunur.

## Kontrol listesi (elle test edilmeli)

320 / 375 / 390 / 430 / 768 / 1024 / 1440 / 1920 px genişliklerde: hero başlık sarması, yatay taşma, menü, hizmet vitrini, araç içi sahneler, galeri penceresi, before/after (fare, dokunma, klavye), iletişim formu, iOS Safari ve Android Chrome'da kaydırma.
