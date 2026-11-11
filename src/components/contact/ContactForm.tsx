"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { business, telHref } from "@/data/business";
import {
  contactLimits,
  emptyContact,
  validateContact,
  type ContactErrors,
  type ContactValues,
} from "@/lib/contact-validation";

type Status = "idle" | "sending" | "success" | "error";

interface ContactFormProps {
  initialTopic?: string;
  initialMessage?: string;
}

const LABEL_CLASS = "mb-2 block font-display text-[0.72rem] uppercase tracking-label text-muted";

function FieldError({ field, message }: { field: keyof ContactValues; message?: string }) {
  if (!message) return null;
  return (
    <p id={`err-${field}`} className="mt-2 text-sm text-[#ff9b9b]">
      {message}
    </p>
  );
}

/**
 * İletişim formu. Doğrulama istemcide anlık, sunucuda ise yeniden yapılır.
 * Spam koruması: gizli tuzak alanı (honeypot) + minimum doldurma süresi + sunucuda hız sınırı.
 * Başarı mesajı YALNIZCA sunucu gönderimi onayladığında gösterilir; gönderim simüle edilmez.
 */
export function ContactForm({ initialTopic = "", initialMessage = "" }: ContactFormProps) {
  const [values, setValues] = useState<ContactValues>({ ...emptyContact, topic: initialTopic, message: initialMessage });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const startedAt = useRef<number>(0);
  const honeypot = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const set =
    (key: keyof ContactValues) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target instanceof HTMLInputElement && e.target.type === "checkbox" ? e.target.checked : e.target.value;
      setValues((v) => ({ ...v, [key]: value }));
      if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  const focusFirstError = (errs: ContactErrors) => {
    const first = (Object.keys(errs) as Array<keyof ContactValues>)[0];
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const found = validateContact(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus("idle");
      focusFirstError(found);
      return;
    }

    setStatus("sending");
    setServerMessage("");
    try {
      const res = await fetch("/api/iletisim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          website: honeypot.current?.value ?? "",
          elapsedMs: Date.now() - startedAt.current,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string; errors?: ContactErrors };

      if (res.ok && data.ok) {
        setStatus("success");
        setValues(emptyContact);
        return;
      }
      if (data.errors) {
        setErrors(data.errors);
        focusFirstError(data.errors);
      }
      setServerMessage(data.message ?? "Mesajınız gönderilemedi. Lütfen daha sonra tekrar deneyin ya da bizi arayın.");
      setStatus("error");
    } catch {
      setServerMessage("Bağlantı kurulamadı. İnternet bağlantınızı kontrol edin ya da bizi arayın.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="border border-line bg-carbon p-8 sm:p-10">
        <p className="font-display text-2xl font-bold tracking-tight">Mesajınız bize ulaştı.</p>
        <p className="mt-4 text-muted">En kısa sürede verdiğiniz telefon numarasından size dönüş yapacağız. Acil durumlarda bizi arayabilirsiniz.</p>
        <a href={telHref} className="link-arrow mt-6">
          {business.phoneDisplay}
        </a>
      </div>
    );
  }

  const err = (key: keyof ContactValues) => (errors[key] ? `err-${key}` : undefined);

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby="form-status" className="grid gap-6 sm:grid-cols-2">
      <div>
        <label htmlFor="name" className={LABEL_CLASS}>
          Ad Soyad *
        </label>
        <input id="name" name="name" autoComplete="name" required maxLength={contactLimits.nameMax} value={values.name} onChange={set("name")} className="field" aria-invalid={Boolean(errors.name)} aria-describedby={err("name")} />
        <FieldError field="name" message={errors.name} />
      </div>

      <div>
        <label htmlFor="phone" className={LABEL_CLASS}>
          Telefon *
        </label>
        <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required placeholder="05XX XXX XX XX" value={values.phone} onChange={set("phone")} className="field" aria-invalid={Boolean(errors.phone)} aria-describedby={err("phone")} />
        <FieldError field="phone" message={errors.phone} />
      </div>

      <div>
        <label htmlFor="email" className={LABEL_CLASS}>
          E-posta (isteğe bağlı)
        </label>
        <input id="email" name="email" type="email" inputMode="email" autoComplete="email" value={values.email} onChange={set("email")} className="field" aria-invalid={Boolean(errors.email)} aria-describedby={err("email")} />
        <FieldError field="email" message={errors.email} />
      </div>

      <div>
        <label htmlFor="vehicle" className={LABEL_CLASS}>
          Araç (marka / model / yıl)
        </label>
        <input id="vehicle" name="vehicle" maxLength={contactLimits.vehicleMax} placeholder="Örn. marka, model, yıl" value={values.vehicle} onChange={set("vehicle")} className="field" aria-invalid={Boolean(errors.vehicle)} aria-describedby={err("vehicle")} />
        <FieldError field="vehicle" message={errors.vehicle} />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="topic" className={LABEL_CLASS}>
          Konu
        </label>
        <input id="topic" name="topic" maxLength={contactLimits.topicMax} placeholder="Örn. oto döşeme, aksesuar" value={values.topic} onChange={set("topic")} className="field" aria-invalid={Boolean(errors.topic)} aria-describedby={err("topic")} />
        <FieldError field="topic" message={errors.topic} />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="message" className={LABEL_CLASS}>
          Mesajınız *
        </label>
        <textarea id="message" name="message" required rows={6} maxLength={contactLimits.messageMax} value={values.message} onChange={set("message")} className="field resize-y" aria-invalid={Boolean(errors.message)} aria-describedby={err("message")} />
        <FieldError field="message" message={errors.message} />
      </div>

      {/* Spam tuzağı: gerçek kullanıcılar görmez ve doldurmaz */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Bu alanı boş bırakın</label>
        <input ref={honeypot} id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="sm:col-span-2">
        <label className="flex cursor-pointer items-start gap-3 text-sm text-muted">
          <input type="checkbox" name="consent" checked={values.consent} onChange={set("consent")} className="mt-1 h-5 w-5 shrink-0 accent-[#ff681e]" aria-invalid={Boolean(errors.consent)} aria-describedby={err("consent")} />
          <span>
            <Link href="/gizlilik" className="text-fg underline underline-offset-4 hover:text-accent">
              Aydınlatma metnini
            </Link>{" "}
            okudum; bilgilerimin talebime dönüş yapılması amacıyla işlenmesini kabul ediyorum.
          </span>
        </label>
        <FieldError field="consent" message={errors.consent} />
      </div>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Gönderiliyor…" : "Mesajı Gönder"}
        </Button>
        <p className="text-sm text-muted">
          Ya da doğrudan arayın:{" "}
          <a href={telHref} className="text-fg underline underline-offset-4 hover:text-accent">
            {business.phoneDisplay}
          </a>
        </p>
      </div>

      <div id="form-status" role="status" aria-live="polite" className="sm:col-span-2">
        {status === "error" ? <p className="border border-[#ff8a8a]/50 p-4 text-sm text-[#ffb3b3]">{serverMessage}</p> : null}
      </div>
    </form>
  );
}
