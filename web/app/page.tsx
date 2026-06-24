import { HeroVideo } from "@/components/home/HeroVideo";
import { FeaturedProperties } from "@/components/home/FeaturedProperties";
import { SellBlock } from "@/components/home/SellBlock";
import { Services } from "@/components/home/Services";
import { WhyUs } from "@/components/home/WhyUs";
import { About } from "@/components/home/About";
import { Stats } from "@/components/home/Stats";
import { Testimonials } from "@/components/home/Testimonials";
import { ContactSection } from "@/components/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroVideo />
      <FeaturedProperties />
      <SellBlock />
      <Services />
      <WhyUs />
      <About />
      <Stats />
      <Testimonials />
      <ContactSection />
    </>
  );
}
