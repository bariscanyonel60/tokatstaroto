import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Tek noktadan GSAP + ScrollTrigger kaydı. Bileşenler her zaman bu dosyadan import eder,
 * böylece eklenti yalnızca tarayıcıda ve bir kez kaydedilir.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
