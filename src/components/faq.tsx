'use client'

import React from 'react'
import { Typography, Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react'

const FAQS = [
  {
    title: '1. What is BuzStopBoys?',
    desc: 'BuzStopBoys is a non-governmental organization focused on cleaning and transforming unclean areas into healthy and vibrant spaces, promoting public hygiene and community well-being.',
  },
  {
    title: '2. How can I support your work?',
    desc: 'You can support us by volunteering for our cleaning initiatives, making donations, or sharing our work on social media to raise awareness.',
  },
  {
    title: '3. How can I volunteer?',
    desc: 'Volunteering is easy! Simply fill out the form on our website or contact us via email or phone, and we’ll guide you on how to join our upcoming events.',
  },
  {
    title: '4. What do donations go toward?',
    desc: ' Donations are used to purchase cleaning equipment, provide transportation for our teams, and fund community hygiene education programs.',
  },
  {
    title: '5. Where do you operate?',
    desc: ' Currently, we focus on areas in Accra, Ghana, including markets, parks, and beaches. We aim to expand to other regions as we grow.',
  },
  {
    title: '6. Do you partner with other organizations?',
    desc: 'Yes, we collaborate with local governments, businesses, and other NGOs to maximize our impact and achieve our shared goals.',
  },
]

export function Faq() {
  const [open, setOpen] = React.useState(0)
  const handleOpen = (value: number) => setOpen(open === value ? 0 : value)

  return (
    <section className="py-8 lg:py-20">
      <div className="container mx-auto">
        <div className="text-center">
          <Typography variant="h1" color="blue-gray" className="mb-4">
            Frequently asked questions
          </Typography>
          <Typography variant="lead" className="mx-auto mb-10 lg:w-3/5 !text-gray-500">
            Have questions about who we are, what we do, or how you can contribute? We’ve compiled
            answers to some of the most common inquiries to help you better understand BuzStopBoys
            and our mission to create cleaner, healthier communities.
          </Typography>
        </div>

        <div className="mx-auto lg:max-w-screen-lg lg:px-20">
          {FAQS.map(({ title, desc }, key) => (
            <Accordion key={key} open={open === key + 1} onClick={() => handleOpen(key + 1)}>
              <AccordionHeader className="text-left text-gray-900">{title}</AccordionHeader>
              <AccordionBody>
                <Typography color="blue-gray" className="font-normal text-gray-500">
                  {desc}
                </Typography>
              </AccordionBody>
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Faq
