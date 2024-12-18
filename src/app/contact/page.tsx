'use client'

import Faq from "@/components/faq"
import ContactForm from "@/view/Contact/ContactForm"
import PageNavbar from "@/view/pages/PageNavbar"

function page() {
  return (
    <>
        <PageNavbar />
        <ContactForm />
        <Faq />
    </>
  )
}

export default page