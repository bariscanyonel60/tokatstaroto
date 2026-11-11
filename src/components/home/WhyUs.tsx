import { Gauge, Layers, MessageSquareText, Ruler } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";

/** Sadece doğrulanabilir, iddia içermeyen değer önerileri. Referans, rakam, ödül, garanti YOKTUR. */
const reasons = [
  {
    icon: Ruler,
    title: "Araçlara özel çözümler",
    text: "Her aracın ölçüsü ve kullanım biçimi farklıdır. İhtiyacınızı ve aracınızı dinleyerek size uygun seçenekleri konuşuruz.",
  },
  {
    icon: Layers,
    title: "Ürün ve tasarım seçenekleri",
    text: "Aksesuar, iç mekân ve görünüm alanlarında farklı seçenekleri karşılaştırarak karar verebilirsiniz.",
  },
  {
    icon: Gauge,
    title: "Detay odaklı yaklaşım",
    text: "Dikiş, malzeme, uyum ve işçilik gibi küçük ayrıntılar bütün görünümü belirler. Bu yüzden detayları birlikte netleştiririz.",
  },
  {
    icon: MessageSquareText,
    title: "Kolay iletişim",
    text: "Telefonla arayabilir ya da formu doldurabilirsiniz. Sorularınızı doğrudan iletmeniz yeterli.",
  },
];

export function WhyUs() {
  return (
    <section aria-labelledby="why-title" className="border-t border-line bg-carbon py-section">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <Eyebrow>Neden Star Oto Market</Eyebrow>
          <Reveal as="h2" className="display-lg mt-6">
            <span id="why-title">DETAYA VERİLEN ÖNEM FARK EDİLİR.</span>
          </Reveal>
        </div>

        <ul className="divide-y divide-line border-y border-line lg:col-span-7">
          {reasons.map(({ icon: Icon, title, text }, index) => (
            <Reveal as="li" key={title} delay={index * 70} className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 py-8 sm:gap-x-10">
              <Icon size={26} strokeWidth={1.5} className="mt-1 text-accent" aria-hidden="true" />
              <div>
                <h3 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">{title}</h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">{text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
