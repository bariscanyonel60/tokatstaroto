import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileContactBar } from "@/components/layout/MobileContactBar";
import { ScrollRefresh } from "@/components/motion/ScrollRefresh";
import { JsonLd } from "@/components/ui/JsonLd";
import { business } from "@/data/business";
import { localBusinessJsonLd, SITE_DESCRIPTION, SITE_TITLE } from "@/lib/seo";
import { siteUrl } from "@/lib/site";
import "./globals.css";

// latin-ext: Türkçe karakterler (ç, ğ, ı, ö, ş, ü, İ) için gereklidir
const display = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});
const body = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: SITE_TITLE, template: `%s | ${business.name}` },
  description: SITE_DESCRIPTION,
  applicationName: business.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: business.name,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: SITE_TITLE, description: SITE_DESCRIPTION },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0C",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

/** JS varsa <html>'e "js" sınıfı eklenir; reveal animasyonlarının gizleme stilleri yalnızca o zaman geçerlidir. */
const jsFlag = `document.documentElement.classList.add('js')`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="tr" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
      <body>
        <a
          href="#icerik"
          className="sr-only-focusable fixed left-4 top-4 z-[100] bg-accent px-4 py-3 font-display text-sm font-semibold text-ink"
        >
          İçeriğe geç
        </a>
        <JsonLd data={localBusinessJsonLd()} />
        <Header />
        <main id="icerik">{children}</main>
        <Footer />
        <MobileContactBar />
        <ScrollRefresh />
      </body>
    </html>
  );
}
