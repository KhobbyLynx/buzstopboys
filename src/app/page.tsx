'use client'

import Hero from '@/components/hero'
import SponsoredBy from '@/components/sponsored-by'
import AboutSection from '@/components/about-section'
import OurStats from '@/components/our-stats'
import Faq from '@/components/faq'
import Feedback from '@/view/pages/FeedBack'
import { Box } from '@mui/material'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'

// Component for handling search params
const ScrollToSection = () => {
  const searchParams = useSearchParams()

  useEffect(() => {
    const section = searchParams.get('section')
    if (section === 'faq') {
      document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [searchParams])

  return null
}

export default function Home() {
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

      <Box className="px-8 md:px-16 mb-20 lg:mb-30" id="faq">
        <Faq />
      </Box>

      {/* Wrap search param handling with Suspense */}
      <Suspense fallback={null}>
        <ScrollToSection />
      </Suspense>
    </>
  )
}
