/**
 * STAR OTO MARKET — Geçici (demo) görsel üretici
 *
 * Gerçek işletme fotoğrafları gelene kadar kullanılan, otomotiv temalı,
 * kod ile üretilmiş SVG yer tutucuları oluşturur: public/placeholders/*.svg
 *
 * Çalıştırmak için:  npm run placeholders
 *
 * Bu görseller gerçek bir işletme uygulamasını GÖSTERMEZ. Arayüzde her zaman
 * "Demo görsel" etiketiyle sunulur (bkz. components/ui/DemoBadge.tsx).
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "placeholders");
mkdirSync(outDir, { recursive: true });

const ORANGE = "#FF681E";
const n = (v) => Math.round(v * 100) / 100;

/** Ortak SVG iskeleti: hacimsel ışık, yansıma, film greni */
function wrap(w, h, body, { mood = "after", variant = 0 } = {}) {
  const before = mood === "before";
  const acc = before ? "#6f7177" : ORANGE;
  const lx = variant % 2 ? 28 : 72;
  const shaftX = variant % 2 ? w * 0.18 : w * 0.62;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice" role="img">
<defs>
<radialGradient id="bg" cx="${lx}%" cy="38%" r="88%"><stop offset="0" stop-color="${before ? "#2a2b2f" : "#3d2818"}"/><stop offset=".45" stop-color="#121317"/><stop offset="1" stop-color="#070708"/></radialGradient>
<linearGradient id="body" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a3c45"/><stop offset=".4" stop-color="#1c1d22"/><stop offset="1" stop-color="#0a0a0c"/></linearGradient>
<linearGradient id="sheen" x1="0" y1="0" x2="1" y2="0.35"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".45" stop-color="#fff" stop-opacity=".14"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
<linearGradient id="beam" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${acc}" stop-opacity=".55"/><stop offset="1" stop-color="${acc}" stop-opacity="0"/></linearGradient>
<linearGradient id="shaft" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${acc}" stop-opacity=".28"/><stop offset=".55" stop-color="${acc}" stop-opacity=".06"/><stop offset="1" stop-color="${acc}" stop-opacity="0"/></linearGradient>
<radialGradient id="floor" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="${acc}" stop-opacity="${before ? 0.12 : 0.4}"/><stop offset=".55" stop-color="${acc}" stop-opacity=".08"/><stop offset="1" stop-color="${acc}" stop-opacity="0"/></radialGradient>
<linearGradient id="fade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0a0a0c" stop-opacity="0"/><stop offset="1" stop-color="#0a0a0c" stop-opacity=".96"/></linearGradient>
<linearGradient id="sideshade" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".82"/><stop offset=".28" stop-color="#000" stop-opacity="0"/><stop offset=".72" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".82"/></linearGradient>
<filter id="grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".72" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .075 0"/></filter>
<filter id="soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="${Math.max(8, w * 0.012)}"/></filter>
</defs>
<rect width="${w}" height="${h}" fill="url(#bg)"/>
<ellipse cx="${n(shaftX)}" cy="${n(h * 0.08)}" rx="${n(w * 0.22)}" ry="${n(h * 0.06)}" fill="${acc}" opacity="${before ? 0.08 : 0.22}" filter="url(#soft)"/>
<polygon points="${n(shaftX - w * 0.08)},0 ${n(shaftX + w * 0.08)},0 ${n(shaftX + w * 0.22)},${h} ${n(shaftX - w * 0.22)},${h}" fill="url(#shaft)" opacity="${before ? 0.35 : 0.85}"/>
${body(acc)}
<rect width="${w}" height="${h}" fill="url(#sheen)" opacity=".55"/>
<rect width="${w}" height="${h}" fill="url(#sideshade)" opacity=".45"/>
<rect width="${w}" height="${h}" filter="url(#grain)" opacity=".85"/>
</svg>
`;
}

/* ---------- Yan görünüm coupe silueti ---------- */
function carShape(acc, lit) {
  const wheels = [250, 760]
    .map(
      (cx) =>
        `<circle cx="${cx}" cy="322" r="60" fill="#050506"/><circle cx="${cx}" cy="322" r="38" fill="#17181b" stroke="${acc}" stroke-opacity=".55" stroke-width="2"/><circle cx="${cx}" cy="322" r="18" fill="#0d0e10" stroke="rgba(255,255,255,.08)" stroke-width="1"/><circle cx="${cx}" cy="322" r="8" fill="#2b2d33"/>`
    )
    .join("");
  return `<g>
${lit ? `<polygon points="950,266 1680,120 1680,400" fill="url(#beam)" opacity=".9"/><polygon points="930,280 1400,220 1400,340" fill="${acc}" opacity=".08"/>` : ""}
<path d="M40 300 C40 272 72 262 122 255 L262 238 C322 182 402 142 502 140 C612 138 692 172 762 232 L884 250 C934 256 962 268 962 300 L962 322 L40 322 Z" fill="url(#body)" stroke="rgba(255,255,255,.1)" stroke-width="2"/>
<path d="M80 292 L900 292" stroke="url(#sheen)" stroke-width="10" opacity=".5"/>
<path d="M326 234 C378 192 440 170 512 168 C592 168 652 192 700 234 Z" fill="#08090b" stroke="${acc}" stroke-opacity=".6" stroke-width="2"/>
<path d="M262 238 C322 182 402 142 502 140 C612 138 692 172 762 232" fill="none" stroke="${acc}" stroke-width="3.5" stroke-opacity=".95" stroke-linecap="round"/>
<path d="M130 276 L880 276" stroke="rgba(255,255,255,.14)" stroke-width="2"/>
<path d="M884 262 L952 268" stroke="${acc}" stroke-width="7" stroke-linecap="round"/>
<rect x="48" y="268" width="30" height="7" rx="3.5" fill="${acc}" opacity=".9"/>
${wheels}
</g>`;
}

function carSide(w, h, { cx = 0.5, base = 0.74, wf = 0.56, mood = "after", variant = 0 } = {}) {
  return wrap(
    w,
    h,
    (acc) => {
      const s = (w * wf) / 920;
      const tx = w * cx - 500 * s;
      const ty = h * base - 382 * s;
      return `
<ellipse cx="${n(w * cx)}" cy="${n(h * base + 6 * s)}" rx="${n(w * wf * 0.62)}" ry="${n(h * 0.04)}" fill="url(#floor)"/>
<g transform="translate(${n(tx)} ${n(ty + 764 * s)}) scale(${n(s)} ${n(-s)})" opacity=".16">${carShape(acc, false)}</g>
<rect x="0" y="${n(h * base)}" width="${w}" height="${n(h * (1 - base))}" fill="url(#fade)"/>
<g transform="translate(${n(tx)} ${n(ty)}) scale(${n(s)})">${carShape(acc, mood !== "before")}</g>`;
    },
    { mood, variant }
  );
}

/* ---------- Ön görünüm ---------- */
function carFront(w, h, { mood = "after", variant = 0 } = {}) {
  return wrap(
    w,
    h,
    (acc) => {
      const s = Math.min((w * 0.74) / 760, (h * 0.5) / 300);
      const tx = w / 2 - 380 * s;
      const ty = h * 0.72 - 300 * s;
      return `
<ellipse cx="${n(w / 2)}" cy="${n(h * 0.73)}" rx="${n(w * 0.4)}" ry="${n(h * 0.04)}" fill="url(#floor)"/>
<g transform="translate(${n(tx)} ${n(ty)}) scale(${n(s)})">
<path d="M20 230 C20 170 60 140 130 124 L200 60 C250 34 510 34 560 60 L630 124 C700 140 740 170 740 230 L740 300 L20 300 Z" fill="url(#body)" stroke="rgba(255,255,255,.1)" stroke-width="2"/>
<path d="M226 74 C290 52 470 52 534 74 L586 124 L174 124 Z" fill="#08090b" stroke="${acc}" stroke-opacity=".55" stroke-width="2"/>
<path d="M86 190 L250 168 L242 192 L96 214 Z" fill="${acc}" opacity="${mood === "before" ? 0.35 : 0.95}"/>
<path d="M674 190 L510 168 L518 192 L664 214 Z" fill="${acc}" opacity="${mood === "before" ? 0.35 : 0.95}"/>
<rect x="290" y="206" width="180" height="62" rx="10" fill="#0a0a0c" stroke="rgba(255,255,255,.14)" stroke-width="2"/>
<path d="M300 226 H460 M300 246 H460" stroke="rgba(255,255,255,.12)" stroke-width="2"/>
<path d="M20 262 H740" stroke="${acc}" stroke-opacity=".5" stroke-width="2"/>
<path d="M130 124 L200 60 C250 34 510 34 560 60 L630 124" fill="none" stroke="${acc}" stroke-width="3" stroke-opacity=".85"/>
</g>`;
    },
    { mood, variant }
  );
}

/* ---------- Gösterge paneli / kokpit ---------- */
function dashboard(w, h, { mood = "after", variant = 0 } = {}) {
  return wrap(
    w,
    h,
    (acc) => {
      const r = Math.min(w, h) * 0.1;
      const dial = (cx, cy) =>
        `<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(r)}" fill="#08090b" stroke="rgba(255,255,255,.14)" stroke-width="2"/>
<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(r * 0.82)}" fill="none" stroke="${acc}" stroke-opacity=".75" stroke-width="3" stroke-dasharray="2 9"/>
<path d="M${n(cx)} ${n(cy)} L${n(cx + r * 0.55)} ${n(cy - r * 0.35)}" stroke="${acc}" stroke-width="3" stroke-linecap="round"/>`;
      const sx = variant % 2 ? 0.16 : 0.2;
      return `
<path d="M0 ${n(h * 0.64)} C${n(w * 0.25)} ${n(h * 0.5)} ${n(w * 0.75)} ${n(h * 0.5)} ${w} ${n(h * 0.64)} L${w} ${h} L0 ${h} Z" fill="url(#body)"/>
<path d="M0 ${n(h * 0.64)} C${n(w * 0.25)} ${n(h * 0.5)} ${n(w * 0.75)} ${n(h * 0.5)} ${w} ${n(h * 0.64)}" fill="none" stroke="${acc}" stroke-width="3" stroke-opacity=".9"/>
<path d="M0 ${n(h * 0.7)} C${n(w * 0.25)} ${n(h * 0.56)} ${n(w * 0.75)} ${n(h * 0.56)} ${w} ${n(h * 0.7)}" fill="none" stroke="rgba(255,255,255,.08)" stroke-width="2"/>
${dial(w * (sx + 0.12), h * 0.67)}
${dial(w * (sx + 0.12) + r * 2.5, h * 0.67)}
<rect x="${n(w * 0.58)}" y="${n(h * 0.5)}" width="${n(w * 0.22)}" height="${n(h * 0.16)}" rx="8" fill="#08090b" stroke="${acc}" stroke-opacity=".6" stroke-width="2"/>
<path d="M${n(w * 0.6)} ${n(h * 0.6)} L${n(w * 0.65)} ${n(h * 0.55)} L${n(w * 0.7)} ${n(h * 0.58)} L${n(w * 0.77)} ${n(h * 0.52)}" fill="none" stroke="${acc}" stroke-width="3" stroke-linecap="round"/>
<circle cx="${n(w * 0.26)}" cy="${n(h * 1.02)}" r="${n(h * 0.5)}" fill="none" stroke="#1a1b1f" stroke-width="${n(h * 0.1)}"/>
<circle cx="${n(w * 0.26)}" cy="${n(h * 1.02)}" r="${n(h * 0.44)}" fill="none" stroke="${acc}" stroke-opacity=".75" stroke-width="3" stroke-dasharray="9 9"/>
<ellipse cx="${n(w * 0.5)}" cy="${n(h * 0.58)}" rx="${n(w * 0.45)}" ry="${n(h * 0.05)}" fill="url(#floor)"/>`;
    },
    { mood, variant }
  );
}

/* ---------- Kapitone koltuk ---------- */
function seat(w, h, { mood = "after", variant = 0 } = {}) {
  return wrap(
    w,
    h,
    (acc) => {
      const bw = w * 0.56;
      const bx = (w - bw) / 2 + (variant % 2 ? -w * 0.03 : w * 0.03);
      return `
<pattern id="quilt" width="86" height="86" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="86" height="86" fill="#17181c"/><path d="M0 0H86M0 0V86" stroke="${acc}" stroke-opacity="${mood === "before" ? 0.35 : 0.7}" stroke-width="2.5"/><circle cx="0" cy="0" r="4" fill="${acc}" opacity=".9"/></pattern>
<ellipse cx="${n(bx + bw / 2)}" cy="${n(h * 0.92)}" rx="${n(bw * 0.7)}" ry="${n(h * 0.04)}" fill="url(#floor)"/>
<rect x="${n(bx)}" y="${n(h * 0.1)}" width="${n(bw)}" height="${n(h * 0.78)}" rx="${n(bw * 0.12)}" fill="url(#quilt)"/>
<rect x="${n(bx)}" y="${n(h * 0.1)}" width="${n(bw)}" height="${n(h * 0.78)}" rx="${n(bw * 0.12)}" fill="url(#sideshade)"/>
<rect x="${n(bx + bw * 0.04)}" y="${n(h * 0.13)}" width="${n(bw * 0.92)}" height="${n(h * 0.72)}" rx="${n(bw * 0.1)}" fill="none" stroke="${acc}" stroke-width="3" stroke-dasharray="10 9" stroke-opacity=".85"/>
<rect x="${n(bx + bw * 0.28)}" y="${n(h * 0.02)}" width="${n(bw * 0.44)}" height="${n(h * 0.14)}" rx="${n(bw * 0.06)}" fill="#111215" stroke="rgba(255,255,255,.1)" stroke-width="2"/>`;
    },
    { mood, variant }
  );
}

/* ---------- Direksiyon yakın çekim ---------- */
function wheel(w, h, { mood = "after", variant = 0 } = {}) {
  return wrap(
    w,
    h,
    (acc) => {
      const cx = w * (variant % 2 ? 0.46 : 0.54);
      const cy = h * 0.52;
      const R = Math.min(w, h) * 0.36;
      return `
<ellipse cx="${n(cx)}" cy="${n(h * 0.9)}" rx="${n(R)}" ry="${n(h * 0.03)}" fill="url(#floor)"/>
<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(R)}" fill="none" stroke="#1a1b1f" stroke-width="${n(R * 0.3)}"/>
<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(R)}" fill="none" stroke="rgba(255,255,255,.07)" stroke-width="${n(R * 0.3 + 4)}" stroke-dasharray="1 0" opacity=".5"/>
<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(R * 0.9)}" fill="none" stroke="${acc}" stroke-width="3" stroke-dasharray="9 8" stroke-opacity=".9"/>
<rect x="${n(cx - 6)}" y="${n(cy - R - R * 0.14)}" width="12" height="${n(R * 0.28)}" fill="${acc}"/>
<path d="M${n(cx - R)} ${n(cy)} L${n(cx - R * 0.2)} ${n(cy + R * 0.12)} L${n(cx + R * 0.2)} ${n(cy + R * 0.12)} L${n(cx + R)} ${n(cy)} L${n(cx + R)} ${n(cy + R * 0.18)} L${n(cx + R * 0.2)} ${n(cy + R * 0.3)} L${n(cx - R * 0.2)} ${n(cy + R * 0.3)} L${n(cx - R)} ${n(cy + R * 0.18)} Z" fill="#141518" stroke="rgba(255,255,255,.08)" stroke-width="2"/>
<circle cx="${n(cx)}" cy="${n(cy + R * 0.1)}" r="${n(R * 0.2)}" fill="#0b0b0d" stroke="${acc}" stroke-opacity=".6" stroke-width="2"/>`;
    },
    { mood, variant }
  );
}

/* ---------- Deri doku / dikiş yakın çekim ---------- */
function leather(w, h, { mood = "after", variant = 0 } = {}) {
  return wrap(
    w,
    h,
    (acc) => {
      let panels = "";
      const rows = 5;
      for (let i = 0; i < rows; i++) {
        const y = (h / rows) * i + (variant % 2 ? h * 0.04 : 0);
        panels += `<path d="M0 ${n(y)} C${n(w * 0.3)} ${n(y - h * 0.06)} ${n(w * 0.7)} ${n(y + h * 0.06)} ${w} ${n(y)} L${w} ${n(y + h / rows - 14)} C${n(w * 0.7)} ${n(y + h / rows + h * 0.04)} ${n(w * 0.3)} ${n(y + h / rows - h * 0.08)} 0 ${n(y + h / rows - 14)} Z" fill="url(#body)" opacity="${n(0.55 + (i % 2) * 0.25)}"/>
<path d="M0 ${n(y + 7)} C${n(w * 0.3)} ${n(y - h * 0.05)} ${n(w * 0.7)} ${n(y + h * 0.07)} ${w} ${n(y + 7)}" fill="none" stroke="${acc}" stroke-width="3" stroke-dasharray="14 10" stroke-opacity="${mood === "before" ? 0.4 : 0.9}"/>`;
      }
      return `${panels}
<rect x="0" y="0" width="${w}" height="${n(h * 0.08)}" fill="${acc}" opacity="${mood === "before" ? 0.05 : 0.14}"/>
<ellipse cx="${n(w * 0.5)}" cy="${n(h * 0.5)}" rx="${n(w * 0.45)}" ry="${n(h * 0.3)}" fill="url(#floor)"/>
<rect width="${w}" height="${h}" fill="url(#sideshade)" opacity=".6"/>`;
    },
    { mood, variant }
  );
}

const out = (name, svg) => writeFileSync(join(outDir, `${name}.svg`), svg);

/* ---------- Üretim listesi ---------- */
// Hero
out("hero-desktop", carSide(1920, 1080, { cx: 0.74, base: 0.76, wf: 0.52 }));
out("hero-mobile", carSide(780, 1560, { cx: 0.5, base: 0.8, wf: 0.86 }));

// Hakkımızda
out("about-interior", dashboard(1000, 1250, { variant: 1 }));

// Hizmetler
out("service-oto-aksesuar", wheel(1200, 1500));
out("service-arac-ici-dizayn", dashboard(1200, 1500));
out("service-oto-doseme", seat(1200, 1500));
out("service-arac-kisisellestirme", carFront(1200, 1500));

// Araç içi deneyim sahneleri
out("interior-dashboard", dashboard(1920, 1200));
out("interior-seat", seat(1920, 1200, { variant: 1 }));
out("interior-accessory", wheel(1920, 1200, { variant: 1 }));

// Sinematik bant
out("feature-band", leather(2400, 1300));

// Ürünler
const productScenes = [leather, wheel, carFront, seat, leather, wheel, seat, dashboard];
productScenes.forEach((scene, i) => out(`product-${i + 1}`, scene(1000, 1250, { variant: i })));

// Projeler (önce / sonra çiftleri 1 ve 2)
const projects = [
  { scene: dashboard, before: true },
  { scene: seat, before: true },
  { scene: wheel },
  { scene: carFront },
  { scene: leather },
  { scene: (w, h, o) => carSide(w, h, { ...o, cx: 0.5, base: 0.72, wf: 0.7 }) },
];
projects.forEach(({ scene, before }, i) => {
  const id = i + 1;
  out(`project-${id}`, scene(1600, 1200, { variant: i }));
  if (before) out(`project-${id}-before`, scene(1600, 1200, { variant: i, mood: "before" }));
  out(`project-${id}-detail-a`, scene(1600, 1200, { variant: i + 1 }));
  out(`project-${id}-detail-b`, scene(1600, 1200, { variant: i + 2 }));
});

console.log(`Yer tutucu görseller üretildi: ${outDir}`);
