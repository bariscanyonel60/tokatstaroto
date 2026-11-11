import { MapPin, MessageCircle, Phone, Mail } from "lucide-react";
import { business, directionsHref, locationLabel, mapEmbedSrc, telHref, whatsappHref } from "@/data/business";

/** İletişim bilgileri + Google Haritalar. Yalnızca doğrulanmış bilgiler gösterilir. */
export function ContactDetails() {
  const wa = whatsappHref(`Merhaba ${business.name}, bilgi almak istiyorum.`);
  const row = "flex items-start gap-4 py-5";
  const icon = "mt-1 shrink-0 text-accent";

  return (
    <div>
      <ul className="divide-y divide-line border-y border-line">
        <li className={row}>
          <Phone size={20} className={icon} aria-hidden="true" />
          <div>
            <p className="font-display text-[0.7rem] uppercase tracking-label text-muted">Telefon</p>
            <a href={telHref} className="mt-1 block font-display text-2xl font-semibold tracking-tight transition-colors hover:text-accent">
              {business.phoneDisplay}
            </a>
          </div>
        </li>
        <li className={row}>
          <MapPin size={20} className={icon} aria-hidden="true" />
          <div>
            <p className="font-display text-[0.7rem] uppercase tracking-label text-muted">Konum</p>
            <p className="mt-1">{locationLabel()}</p>
            {!business.streetAddress ? <p className="mt-1 text-sm text-muted">Açık adres için lütfen bizi arayın.</p> : null}
          </div>
        </li>
        {business.email ? (
          <li className={row}>
            <Mail size={20} className={icon} aria-hidden="true" />
            <div>
              <p className="font-display text-[0.7rem] uppercase tracking-label text-muted">E-posta</p>
              <a href={`mailto:${business.email}`} className="mt-1 block transition-colors hover:text-accent">
                {business.email}
              </a>
            </div>
          </li>
        ) : null}
        {wa ? (
          <li className={row}>
            <MessageCircle size={20} className={icon} aria-hidden="true" />
            <div>
              <p className="font-display text-[0.7rem] uppercase tracking-label text-muted">WhatsApp</p>
              <a href={wa} target="_blank" rel="noopener noreferrer" className="mt-1 block transition-colors hover:text-accent">
                Mesaj yazın
              </a>
            </div>
          </li>
        ) : null}
      </ul>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a href={telHref} className="btn btn-primary">
          <Phone size={16} aria-hidden="true" />
          <span>Hemen Ara</span>
        </a>
        <a href={directionsHref} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
          <MapPin size={16} aria-hidden="true" />
          <span>Yol Tarifi Al</span>
        </a>
      </div>

      <div className="mt-8 overflow-hidden border border-line">
        <iframe
          title={`${business.name} konumu — Google Haritalar`}
          src={mapEmbedSrc}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="map-frame block h-[320px] w-full border-0 sm:h-[380px]"
          allowFullScreen
        />
      </div>
      {!business.streetAddress ? (
        <p className="mt-3 text-xs text-muted">Harita, işletme adıyla arama yapar. Kesin konum için yol tarifi düğmesini kullanabilirsiniz.</p>
      ) : null}
    </div>
  );
}
