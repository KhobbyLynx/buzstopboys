"use client"

// ** COMPONENTS
import Navbar from '@/view/pages/PageNavbar'
import PageHero from '../PageHero'
import OurStats from '@/view/about/OurStats'
import MoreInfo from '@/view/about/More'
import Team from '@/components/Team'

function About() {
  return (
    <div>
        <Navbar />
        <PageHero />
        <MoreInfo />
        <OurStats />
        <Team />
    </div>
  )
}

export default About