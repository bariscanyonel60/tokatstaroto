"use client";

import { Button } from "@/components/ui/Button";
import { business, telHref } from "@/data/business";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="container-x flex min-h-[80svh] flex-col justify-center pb-20 pt-[calc(var(--header-h)+2rem)]">
      <p className="eyebrow">Hata</p>
      <h1 className="display-lg mt-6">BİR ŞEYLER TERS GİTTİ.</h1>
      <p className="lead mt-6 max-w-lg">Sayfa yüklenirken bir sorun oluştu. Tekrar deneyebilir ya da bizi arayabilirsiniz.</p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Button onClick={reset}>Tekrar Dene</Button>
        <a href={telHref} className="btn btn-outline">
          <span>{business.phoneDisplay}</span>
        </a>
      </div>
    </section>
  );
}
