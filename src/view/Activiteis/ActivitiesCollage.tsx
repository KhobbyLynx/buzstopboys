'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay, EffectCards } from 'swiper/modules'
import { Typography } from '@material-tailwind/react'
import CollageCard from '@/components/cards/CollageCard'
import Image from 'next/image'
import Link from 'next/link'
import { ActivityProps } from '@/types/activities'

const images = [
  'https://res.cloudinary.com/khobbylynx/image/upload/v1739193350/buzstopboys/info_graphics/Ghkc7rFXcAA814D_mxxoxc.jpg',
  '/images/campaigns/pokuase-porject.jpeg',
  'https://res.cloudinary.com/khobbylynx/image/upload/v1739193357/buzstopboys/info_graphics/GhuJUhvWgAAlCb0_jwu8qv.jpg',
  'https://res.cloudinary.com/khobbylynx/image/upload/v1739193289/buzstopboys/events/GhbgWQfXAAAkPXp_iwcs3b.jpg',
]

const ActivitiesCollage = ({ data: ACTIVITIES }: { data: ActivityProps[] }) => (
  <section className="mx-auto py-10">
    <div className="mb-10 text-center">
      <Typography variant="h2" color="blue-gray" className="my-3">
        Activities Studio
      </Typography>
      <Typography variant="lead" className="!text-gray-500 lg:w-6/12 mx-auto">
        Our activities are designed to make a difference in the community. We are committed to
        creating a positive impact in the world.
      </Typography>
      <Typography variant="h4" className="my-3 text-blue-400">
        Watch our activities in action. Volunteer for any listed
        <Link href="/events" className="text-blue-gray-600 ml-1">
          Event
        </Link>
      </Typography>
    </div>

    <div className="grid gap-6 lg:grid-cols-3">
      <div className="rounded overflow-hidden">
        <Swiper
          autoplay={{ delay: 3000, disableOnInteraction: true }}
          effect="cards"
          grabCursor
          modules={[EffectCards, Autoplay]}
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <Image src={src} alt="event" layout="responsive" width={400} height={400} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {[0, 2].map((start) => (
        <div key={start} className="flex flex-col gap-6">
          {ACTIVITIES.slice(start, start + 2).map((props, key) => (
            <CollageCard key={key} {...props} />
          ))}
        </div>
      ))}
    </div>
  </section>
)

export default ActivitiesCollage
