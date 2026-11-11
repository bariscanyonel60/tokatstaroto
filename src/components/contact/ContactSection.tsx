import { ContactDetails } from "@/components/contact/ContactDetails";
import { ContactForm } from "@/components/contact/ContactForm";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";

interface ContactSectionProps {
  /** Ana sayfada h2, iletişim sayfasında (başlık PageHero'da) gizli h2 kullanılır */
  showHeading?: boolean;
  initialTopic?: string;
  initialMessage?: string;
}

export function ContactSection({ showHeading = true, initialTopic, initialMessage }: ContactSectionProps) {
  return (
    <section id="iletisim" aria-labelledby="contact-title" className="bg-ink py-section">
      <div className="container-x">
        {showHeading ? (
          <div className="mb-14 max-w-3xl md:mb-20">
            <Eyebrow>İletişim</Eyebrow>
            <Reveal as="h2" className="display-xl mt-6">
              <span id="contact-title">ARACINIZ İÇİN YENİ BİR ADIM ATIN.</span>
            </Reveal>
            <Reveal as="p" delay={120} className="lead mt-6 max-w-xl">
              Aracınız için aksesuar ve dizayn seçenekleri hakkında bilgi almak üzere bizimle iletişime geçin.
            </Reveal>
          </div>
        ) : (
          <h2 id="contact-title" className="sr-only">
            İletişim bilgileri ve form
          </h2>
        )}

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div id="form" className="lg:col-span-7">
            <h3 className="mb-8 font-display text-xl font-semibold tracking-tight">Bize yazın</h3>
            <ContactForm initialTopic={initialTopic} initialMessage={initialMessage} />
          </div>
          <div className="lg:col-span-5">
            <h3 className="mb-8 font-display text-xl font-semibold tracking-tight">Bize ulaşın</h3>
            <ContactDetails />
          </div>
        </div>
      </div>
    </section>
  );
}
