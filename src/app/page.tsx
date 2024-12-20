// components
import { Navbar } from "@/components";

// sections
import Hero from "@/components/hero";
import SponsoredBy from "@/components/sponsored-by";
import AboutSection from "@/components/about-section";
import OurStats from "@/components/our-stats";
import Faq from "@/components/faq";
import Feedback from "@/view/FeedBack";
import { Box } from "@mui/material";

export default function Portfolio() {
  return (
    <>
      <Hero />
      <SponsoredBy />
      <AboutSection />
      <Feedback />
      <OurStats />
      <Box className="px-8 md:px-16 mb-20 lg:mb-30">
        <Faq />
      </Box>
    </>
  );
}
