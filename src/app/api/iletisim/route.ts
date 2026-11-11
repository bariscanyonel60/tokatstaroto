import { NextResponse } from "next/server";
import { business } from "@/data/business";
import { validateContact, type ContactValues } from "@/lib/contact-validation";

export const runtime = "nodejs";

/**
 * İletişim formu uç noktası.
 *
 * Gerçek gönderim: Resend API ile e-posta (RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL).
 * Bu değişkenler tanımlı değilse 503 döner — başarılı gönderim ASLA simüle edilmez.
 *
 * Spam koruması: honeypot alanı, minimum doldurma süresi, IP başına hız sınırı (bellek içi; tek örnek için yeterli.
 * Çok örnekli/serverless dağıtımda Redis/Upstash gibi paylaşımlı bir depo kullanın).
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const MIN_FILL_MS = 2500;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  // Harita sınırsız büyümesin
  if (hits.size > 5000) {
    for (const [key, times] of hits) if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
  }
  return false;
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Başlık enjeksiyonunu önlemek için satır sonlarını temizler */
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "bilinmiyor";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, message: "Çok fazla deneme yaptınız. Lütfen biraz bekleyip tekrar deneyin ya da bizi arayın." }, { status: 429 });
  }

  let body: Partial<ContactValues> & { website?: unknown; elapsedMs?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Geçersiz istek." }, { status: 400 });
  }

  // Bot tuzakları: bot olduğunu belli etmemek için sessizce "başarılı" gibi yanıtlanır, ancak hiçbir şey gönderilmez.
  const tooFast = typeof body.elapsedMs === "number" && body.elapsedMs < MIN_FILL_MS;
  if ((typeof body.website === "string" && body.website.length > 0) || tooFast) {
    return NextResponse.json({ ok: true });
  }

  const values: ContactValues = {
    name: String(body.name ?? ""),
    phone: String(body.phone ?? ""),
    email: String(body.email ?? ""),
    vehicle: String(body.vehicle ?? ""),
    topic: String(body.topic ?? ""),
    message: String(body.message ?? ""),
    consent: body.consent === true,
  };

  const errors = validateContact(values);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors, message: "Lütfen işaretli alanları kontrol edin." }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    return NextResponse.json(
      {
        ok: false,
        message: `Çevrimiçi form şu anda etkin değil. Lütfen bizi arayın: ${business.phoneDisplay}`,
      },
      { status: 503 }
    );
  }

  const rows: Array<[string, string]> = [
    ["Ad Soyad", values.name],
    ["Telefon", values.phone],
    ["E-posta", values.email || "—"],
    ["Araç", values.vehicle || "—"],
    ["Konu", values.topic || "—"],
  ];
  const html = `<h2>Yeni web sitesi talebi</h2>
<table cellpadding="6">${rows.map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${escapeHtml(oneLine(v))}</td></tr>`).join("")}</table>
<p><strong>Mesaj</strong></p><p style="white-space:pre-wrap">${escapeHtml(values.message.trim())}</p>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        ...(values.email ? { reply_to: values.email.trim() } : {}),
        subject: `Web talebi: ${oneLine(values.topic) || "Genel"} — ${oneLine(values.name)}`,
        html,
      }),
    });
    if (!res.ok) {
      console.error("[iletisim] E-posta servisi hata döndürdü:", res.status);
      return NextResponse.json({ ok: false, message: `Mesajınız gönderilemedi. Lütfen bizi arayın: ${business.phoneDisplay}` }, { status: 502 });
    }
  } catch (error) {
    console.error("[iletisim] E-posta gönderilemedi:", error);
    return NextResponse.json({ ok: false, message: `Mesajınız gönderilemedi. Lütfen bizi arayın: ${business.phoneDisplay}` }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
