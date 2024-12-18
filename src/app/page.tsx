// components
import { Navbar } from "@/components";

// sections
import Hero from "@/components/hero";
import SponsoredBy from "@/components/sponsored-by";
import AboutSection from "@/components/about-section";
import OurStats from "@/components/our-stats";
import Faq from "@/components/faq";
import Feedback from "@/view/FeedBack";

export default function Portfolio() {
  return (
    <>
      <Navbar />
      <Hero />
      <SponsoredBy />
      <AboutSection />
      <Feedback />
      <OurStats />
      <Faq />
    </>
  );
}
