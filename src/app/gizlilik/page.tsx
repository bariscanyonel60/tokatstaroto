import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { business } from "@/data/business";
import { buildMetadata } from "@/lib/seo";
import type { Crumb } from "@/types";

export const metadata: Metadata = buildMetadata({
  title: "Gizlilik ve KVKK Aydınlatma Metni",
  description: "Star Oto Market iletişim formu aracılığıyla toplanan kişisel verilerin işlenmesine ilişkin bilgilendirme.",
  path: "/gizlilik",
});

const crumbs: Crumb[] = [
  { name: "Ana Sayfa", href: "/" },
  { name: "Gizlilik", href: "/gizlilik" },
];

/**
 * UYARI: Bu metin genel bir taslaktır. Yayına almadan önce işletmenin gerçek ticari unvanı,
 * adresi ve veri sorumlusu bilgileriyle bir hukuk danışmanı tarafından gözden geçirilmelidir.
 */
export default function PrivacyPage() {
  const h2 = "mt-12 font-display text-xl font-semibold tracking-tight";
  const p = "mt-4 text-fg/80 leading-relaxed";
  return (
    <>
      <PageHero eyebrow="Yasal" title="GİZLİLİK VE KVKK AYDINLATMA METNİ" crumbs={crumbs} />
      <section className="bg-ink pb-section pt-4">
        <div className="container-x max-w-3xl">
          <p className="border border-line p-4 text-xs leading-relaxed text-muted">
            <strong className="font-medium text-fg">Yayın öncesi not:</strong> Bu metin taslaktır. İşletmenin ticari unvanı, adresi ve veri sorumlusu
            bilgileri eklenmeli ve metin bir hukuk danışmanı tarafından incelenmelidir.
          </p>

          <h2 className={h2}>Veri sorumlusu</h2>
          <p className={p}>
            {business.name} ({business.descriptor}), {business.city} {business.district}. İletişim: {business.phoneDisplay}.
          </p>

          <h2 className={h2}>Hangi veriler işlenir?</h2>
          <p className={p}>
            İletişim formunda paylaştığınız ad soyad, telefon, (varsa) e-posta, araç bilgisi, konu ve mesaj içeriği işlenir.
          </p>

          <h2 className={h2}>Amaç ve hukuki sebep</h2>
          <p className={p}>
            Bu veriler yalnızca talebinize dönüş yapmak ve sorularınızı yanıtlamak amacıyla, talebinizin değerlendirilmesi için gerekli olduğu ölçüde
            işlenir. Verileriniz pazarlama amacıyla kullanılmaz ya da üçüncü kişilere satılmaz.
          </p>

          <h2 className={h2}>Aktarım</h2>
          <p className={p}>
            Form mesajınız, iletiminin sağlanması için e-posta hizmet sağlayıcısı üzerinden işletmeye iletilir.
          </p>

          <h2 className={h2}>Haklarınız</h2>
          <p className={p}>
            6698 sayılı KVKK&apos;nın 11. maddesi kapsamında verilerinizin işlenip işlenmediğini öğrenme, düzeltilmesini ya da silinmesini isteme gibi
            haklara sahipsiniz. Taleplerinizi {business.phoneDisplay} numaralı telefondan iletebilirsiniz.
          </p>

          <h2 className={h2}>Çerezler</h2>
          <p className={p}>Bu site, analitik ya da reklam amaçlı çerez kullanmaz. Üçüncü taraf bir analiz aracı eklenirse bu metin güncellenmelidir.</p>
        </div>
      </section>
    </>
  );
}
