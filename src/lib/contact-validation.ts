/**
 * İletişim formu doğrulaması. Aynı kurallar hem tarayıcıda (anında geri bildirim)
 * hem sunucuda (güvenlik) çalışır — bu yüzden saf TypeScript, bağımlılıksız.
 */
export interface ContactValues {
  name: string;
  phone: string;
  email: string;
  vehicle: string;
  topic: string;
  message: string;
  consent: boolean;
}

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

export const emptyContact: ContactValues = {
  name: "",
  phone: "",
  email: "",
  vehicle: "",
  topic: "",
  message: "",
  consent: false,
};

export const contactLimits = {
  nameMax: 80,
  vehicleMax: 80,
  topicMax: 60,
  messageMin: 10,
  messageMax: 1500,
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_CHARS_RE = /^[+\d\s()-]+$/;

export function validateContact(v: ContactValues): ContactErrors {
  const errors: ContactErrors = {};

  const name = v.name.trim();
  if (name.length < 2) errors.name = "Lütfen adınızı ve soyadınızı yazın.";
  else if (name.length > contactLimits.nameMax) errors.name = `Ad soyad en fazla ${contactLimits.nameMax} karakter olabilir.`;

  const phone = v.phone.trim();
  const digits = phone.replace(/\D/g, "");
  if (!PHONE_CHARS_RE.test(phone) || digits.length < 10 || digits.length > 13) {
    errors.phone = "Lütfen geçerli bir telefon numarası yazın (örn. 0532 000 00 00).";
  }

  const email = v.email.trim();
  if (email && !EMAIL_RE.test(email)) errors.email = "E-posta adresi geçerli görünmüyor.";

  if (v.vehicle.trim().length > contactLimits.vehicleMax) {
    errors.vehicle = `Araç bilgisi en fazla ${contactLimits.vehicleMax} karakter olabilir.`;
  }
  if (v.topic.trim().length > contactLimits.topicMax) errors.topic = "Konu çok uzun.";

  const message = v.message.trim();
  if (message.length < contactLimits.messageMin) {
    errors.message = `Mesajınız en az ${contactLimits.messageMin} karakter olmalı.`;
  } else if (message.length > contactLimits.messageMax) {
    errors.message = `Mesajınız en fazla ${contactLimits.messageMax} karakter olabilir.`;
  }

  if (!v.consent) errors.consent = "Devam etmek için aydınlatma metnini okuduğunuzu onaylayın.";

  return errors;
}
