import type { Metadata } from "next";
import { AboutSection } from "@/components/home/AboutSection";
import { FeatureBand } from "@/components/home/FeatureBand";
import { GalleryHome } from "@/components/home/GalleryHome";
import { Hero } from "@/components/home/Hero";
import { InteriorShowcase } from "@/components/home/InteriorShowcase";
import { ProductsPreview } from "@/components/home/ProductsPreview";
import { WhyUs } from "@/components/home/WhyUs";
import { ContactSection } from "@/components/contact/ContactSection";
import { ServicesShowcase } from "@/components/services/ServicesShowcase";
import { interiorScenes } from "@/data/interior";
import { services } from "@/data/services";
import { buildMetadata, SITE_DESCRIPTION, SITE_TITLE } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ServicesShowcase services={services} />
      <InteriorShowcase scenes={interiorScenes} />
      <ProductsPreview />
      <FeatureBand />
      <GalleryHome />
      <WhyUs />
      <ContactSection />
    </>
  );
}
