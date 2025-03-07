'use client'

import SectionTitle from '@/components/common/SectionTitle'
import Faq from '@/components/faq'
import Team from '@/components/team'
import ContactForm from '@/view/website/contact/ContactForm'
import { Box } from '@mui/material'

function Contact() {
  return (
    <>
      <Box className="px-4 md:px-16">
        <Box className="mt-10">
          <SectionTitle
            title="Get in Touch with Us"
            subtitle="Any Questions?"
            paragraph="Have questions, suggestions, or want to collaborate with us? Reach out! We value your feedback and are always excited to connect with like-minded individuals and organizations."
            center={true}
          />
        </Box>
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
