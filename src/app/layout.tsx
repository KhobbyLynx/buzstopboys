import React from 'react'

import './globals.css'
import './src/styles/styles.scss'

// Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import 'swiper/css/effect-coverflow'

import type { Metadata } from 'next'

// ** COMPONENTS
import { ThemeProviderLayout } from './src/components'
import Layout from './src/layouts'

export const metadata: Metadata = {
  title: {
    default: 'BuzStopBoys',
    template: '%s | BuzStopBoys',
  },
  description: 'Buzstopboys, volunteering, healthy environments',
  icons: {
    icon: '/favicon.ico',
  },
}

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <script
          defer
          data-site="YOUR_DOMAIN_HERE"
          src="https://api.nepcha.com/js/nepcha-analytics.js"
        ></script>
        <link rel="shortcut icon" href="/favicon.ico" type="image/png" />
      </head>
      <body>
        <ThemeProviderLayout>
          <Layout>{children}</Layout>
        </ThemeProviderLayout>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
          integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </body>
    </html>
  )
}

export default RootLayout
