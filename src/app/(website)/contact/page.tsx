'use client'

import Faq from '@/components/faq'
import Team from '@/components/team'
import ContactForm from '@/view/contact/ContactForm'
import { Box } from '@mui/material'

function Contact() {
  return (
    <>
      <Box className="px-4 md:px-16">
        <ContactForm />
      </Box>
      <Team />
      <Box className="px-8 md:px-16 mb-20 lg:mb-30">
        <Faq />
      </Box>
    </>
  )
}

export default Contact
