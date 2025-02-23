import React from 'react'

import './globals.css'
import '@/styles/styles.scss'

// Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import 'swiper/css/effect-coverflow'

import type { Metadata } from 'next'
import { ThemeProviderLayout } from '@/components'
import Layout from '@/layouts'

export const metadata: Metadata = {
  title: {
    default: 'BuzStopBoys',
    template: '%s | BuzStopBoys',
  },
  description: 'Buzstopboys, volunteering, healthy environments',
  icons: {
    icon: '/favicon.ico',
  },
  other: {
    'font-awesome': 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css',
  },
}

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body>
        <ThemeProviderLayout>
          <Layout>{children}</Layout>
        </ThemeProviderLayout>
      </body>
    </html>
  )
}

export default RootLayout
