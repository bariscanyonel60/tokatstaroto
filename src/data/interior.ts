import { media } from "@/lib/media";
import type { InteriorScene } from "@/types";

/** Araç içi / uygulama sahneleri — Instagram @staroto60 gerçek fotoğrafları */
export const interiorScenes: InteriorScene[] = [
  {
    id: "ic-tasarim",
    index: "01",
    label: "Atölye Uygulaması",
    title: "HER DETAYDA YENİ BİR DENEYİM.",
    text: "Atölyede port bagaj ve aksesuar montajı gibi uygulamaları yakından görün. Hangi seçeneklerin düşünülebileceğini bizimle konuşun.",
    image: {
      src: media.interiorDashboard.src,
      fallback: media.interiorDashboard.fallback,
      alt: "Star Oto Market atölyesinde port bagajlı Peugeot 2008",
    },
  },
  {
    id: "doseme-malzeme",
    index: "02",
    label: "Yan Basamak",
    title: "KONFOR VE TASARIM BİR ARADA.",
    text: "Yan basamak gibi pratik aksesuarlar hem iniş-binişi kolaylaştırır hem de görünüme karakter katar. Seçenekleri birlikte değerlendirelim.",
    image: {
      src: media.interiorSeat.src,
      fallback: media.interiorSeat.fallback,
      alt: "Krom yan basamak yakın çekimi",
    },
  },
  {
    id: "aksesuar",
    index: "03",
    label: "Aksesuar",
    title: "ARACINIZA ÖZEL DOKUNUŞLAR.",
    text: "Küçük bir aksesuar bile aracın karakterini değiştirebilir. Aracınıza uygun seçenekler hakkında bilgi alın.",
    image: {
      src: media.interiorAccessory.src,
      fallback: media.interiorAccessory.fallback,
      alt: "Yan basamaklı Mercedes Vito — Star Oto Market",
    },
  },
];
