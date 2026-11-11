import { existsSync } from "node:fs";
import { join } from "node:path";
import type { MediaSlot } from "@/lib/media";

/**
 * Sunucu tarafında public/ altındaki dosyanın varlığını kontrol eder.
 * Client bileşenlerde kullanmayın — SmartImage `fallback` + onError kullanın.
 */
export function resolveMedia(slot: MediaSlot): string {
  const relative = slot.src.replace(/^\//, "");
  const absolute = join(process.cwd(), "public", relative);
  return existsSync(absolute) ? slot.src : slot.fallback;
}
