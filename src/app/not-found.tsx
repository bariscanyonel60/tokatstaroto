import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Sayfa bulunamadı", robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80svh] flex-col justify-center pb-20 pt-[calc(var(--header-h)+2rem)]">
      <p className="eyebrow">404</p>
      <h1 className="display-xl mt-6">BU SAYFAYI BULAMADIK.</h1>
      <p className="lead mt-6 max-w-lg">Aradığınız sayfa taşınmış ya da hiç var olmamış olabilir. Ana sayfaya dönebilir ya da bize ulaşabilirsiniz.</p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Button href="/">Ana Sayfa</Button>
        <Button href="/iletisim" variant="outline">
          İletişim
        </Button>
      </div>
    </section>
  );
}
