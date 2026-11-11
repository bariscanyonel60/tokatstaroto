import { MapPin, MessageCircle, Phone } from "lucide-react";
import { business, directionsHref, telHref, whatsappHref } from "@/data/business";

/**
 * Mobilde ekranın altında sabit iletişim çubuğu. Doğrulanmış WhatsApp numarası varsa
 * "WhatsApp" düğmesi de eklenir; yoksa gösterilmez.
 */
export function MobileContactBar() {
  const wa = whatsappHref(`Merhaba ${business.name}, bilgi almak istiyorum.`);
  const base =
    "flex min-h-12 flex-1 items-center justify-center gap-2 font-display text-[0.74rem] font-semibold uppercase tracking-[0.12em]";
  return (
    <div
      data-mobile-contact-bar
      className="fixed inset-x-0 bottom-0 z-40 flex border-t border-line bg-ink md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a href={telHref} className={`${base} bg-accent text-ink`} aria-label={`Ara: ${business.phoneDisplay}`}>
        <Phone size={16} aria-hidden="true" />
        Ara
      </a>
      {wa ? (
        <a href={wa} target="_blank" rel="noopener noreferrer" className={`${base} border-l border-line text-fg`}>
          <MessageCircle size={16} aria-hidden="true" />
          WhatsApp
        </a>
      ) : null}
      <a href={directionsHref} target="_blank" rel="noopener noreferrer" className={`${base} border-l border-line text-fg`}>
        <MapPin size={16} aria-hidden="true" />
        Yol Tarifi
      </a>
    </div>
  );
}
