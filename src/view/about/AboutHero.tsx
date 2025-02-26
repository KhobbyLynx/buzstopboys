'use client'

import Image from 'next/image'
import { Typography, Card } from '@material-tailwind/react'
import IconifyIcon from '@/components/icon'
import { Button } from '@mui/material'

function PageHero() {
  return (
    <div className="!flex h-[76vh] w-full items-center justify-between mb-20 mt-10">
      <Image
        priority
        width={1200}
        height={1200}
        src="/images/banner/cover5.jpg"
        alt="bg-img"
        className="absolute inset-0 ml-auto w-[920px] h-[780px] rounded-bl-[100px] object-cover object-center"
      />
      <div className="container mx-auto mt-10">
        <div className="grid grid-cols-12 text-center lg:text-left">
          <Card className="col-span-full rounded-xl border border-white bg-white/30 md:bg-white/90 py-10 p-8 shadow-lg shadow-black/10 backdrop-blur-sm backdrop-saturate-200 xl:col-span-7">
            <Typography
              variant="h1"
              color="blue-gray"
              className="lg:text-5xl !leading-snug text-3xl lg:max-w-3xl !text-black md:text-blue-gray-800 font-bold md:font-semibold"
            >
              Be Part of the Change
            </Typography>
            <Typography
              variant="lead"
              className="mb-10 mt-6 !text-gray-900 font-semibold md:font-normal"
            >
              Together, we can make a difference. Whether you volunteer your time, donate resources,
              or simply spread the word, your contribution matters. Let’s build a cleaner, healthier
              Ghana for generations to come.
            </Typography>
            <div className="mb-8 flex justify-center gap-4 lg:justify-start">
              <Button
                variant="outlined"
                sx={{
                  color: 'black',
                  borderColor: 'black', // Outline color
                  '&:hover': {
                    borderColor: '#151641',
                    backgroundColor: '#17112c1c',
                  },
                }}
              >
                Join Our Journey
              </Button>
              <Button
                variant="contained"
                color="success"
                startIcon={<IconifyIcon icon="streamline:give-gift-solid" className="w-3 h-3" />}
              >
                Donate
              </Button>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 items-center justify-between gap-4 lg:justify-start">
              <Image
                width={128}
                height={128}
                className="opacity-60"
                src="/images/partners/lynx.svg"
                alt="lynx"
              />
              <Image
                width={128}
                height={128}
                className="opacity-60"
                src="/images/partners/cirad.svg"
                alt="netflix"
              />
              <Image
                width={128}
                height={128}
                className="opacity-60"
                src="/images/partners/ecoplanet.svg"
                alt="coinbase"
              />
              <Image
                width={128}
                height={128}
                className="opacity-60"
                src="/images/partners/bioversity.svg"
                alt="google"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default PageHero
