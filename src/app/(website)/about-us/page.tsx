"use client"

// ** COMPONENTS
import PageHero from './src/view/about/AboutHero'
import OurStats from './src/view/about/OurStats'
import MoreInfo from './src/view/about/More'
import Team from './src/components/team'
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