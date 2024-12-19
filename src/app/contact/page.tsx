'use client'

import Faq from "@/components/faq"
import Team from "@/components/Team"
import ContactForm from "@/view/Contact/ContactForm"
import PageNavbar from "@/view/pages/PageNavbar"

function page() {
  return (
    <>
        <PageNavbar />
        <ContactForm />
        <Team />
        <Faq />
    </>
  )
}

export default page