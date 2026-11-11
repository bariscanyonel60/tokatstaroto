/**
 * Yayın adresi. Canlıya almadan önce NEXT_PUBLIC_SITE_URL ortam değişkenini
 * gerçek alan adıyla tanımlayın (.env.example).
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export function absoluteUrl(path = "/"): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
