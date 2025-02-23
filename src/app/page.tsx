// sections
import Hero from "./src/components/hero";
import SponsoredBy from "./src/components/sponsored-by";
import AboutSection from "./src/components/about-section";
import OurStats from "./src/components/our-stats";
import Faq from "./src/components/faq";
import Feedback from "./src/view/FeedBack";
import { Box } from "@mui/material";

export default function Portfolio() {
  return (
    <>
      <Hero />
      
      <Box className="px-6 md:px-16 mb-20 lg:mb-30">
        <SponsoredBy />
      </Box>

      <AboutSection />

      <Box className="px-6 md:px-16 mb-20 lg:mb-30">
        <Feedback />
      </Box>

      <OurStats />
      
      <Box className="px-8 md:px-16 mb-20 lg:mb-30">
        <Faq />
      </Box>
    </>
  );
}
