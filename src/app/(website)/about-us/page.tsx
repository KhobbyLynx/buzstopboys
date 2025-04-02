'use client'

// ** COMPONENTS
import PageHero from '@/view/website/about/AboutHero'
import OurStats from '@/view/website/about/OurStats'
import MoreInfo from '@/view/website/about/More'
import Team from '@/components/team'
import { Box } from '@mui/material'

function About() {
  return (
    <>
      <Box className="md:px-16">
        <PageHero />
      </Box>
      <Box className="px-8 md:px-16 mb-20 lg:mb-30">
        <MoreInfo />
        <OurStats />
      </Box>
      <Team />
    </>
  )
}

export default About
