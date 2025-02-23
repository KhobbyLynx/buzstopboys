"use client";

import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Autoplay, EffectCards } from 'swiper/modules';

import {
  Typography,
} from "@material-tailwind/react";

import CollageCard from "./src/components/cards/CollageCard";
import Image from "next/image";
import { ActivityProps } from "./src/types/activities";
import Link from 'next/link';


export function ActivitiesCollage({ data: ACTIVITIES } : { data: ActivityProps[]}) {
 console.log("@ACTIVITIES", ACTIVITIES)

  return (
    <section className="mx-auto py-10">
      <div className="mb-10 grid place-items-center text-center">
        <Typography variant="h2" color="blue-gray" className="my-3">
          Activities Studio
        </Typography>
        <Typography variant="lead" className="!text-gray-500 lg:w-6/12">
          Our activities are designed to make a difference in the community. We
          are committed to creating a positive impact in the world.
        </Typography>
        <Typography variant="h4" className="my-3 text-blue-400">
          Watch our activities in action <br /> You can also volunteer to any listed 
          <Link href={'/events'} className='text-blue-gray-600 ml-1'>Event</Link>
        </Typography>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded overflow-hidden my-auto">
        <Swiper 
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          effect={'cards'}
          grabCursor={true}
          modules={[EffectCards, Autoplay]}
          className="mySwiper"
        >
        <SwiperSlide>
          <Image src="https://res.cloudinary.com/khobbylynx/image/upload/v1739193350/buzstopboys/info_graphics/Ghkc7rFXcAA814D_mxxoxc.jpg" alt="event" layout="responsive" width={400} height={400}/>
        </SwiperSlide>
        <SwiperSlide><Image src="/images/campaigns/pokuase-porject.jpeg" alt="event" layout="responsive" width={400} height={400}/></SwiperSlide>
        <SwiperSlide><Image src="https://res.cloudinary.com/khobbylynx/image/upload/v1739193357/buzstopboys/info_graphics/GhuJUhvWgAAlCb0_jwu8qv.jpg" alt="event" layout="responsive" width={400} height={400}/></SwiperSlide>
        <SwiperSlide><Image src="https://res.cloudinary.com/khobbylynx/image/upload/v1739193289/buzstopboys/events/GhbgWQfXAAAkPXp_iwcs3b.jpg" alt="event" layout="responsive" width={400} height={400}/></SwiperSlide>
        </Swiper>
        </div>
        <div className="col-span-1 flex flex-col gap-6">
          {ACTIVITIES.slice(0, 2).map((props, key) => (
            <CollageCard key={key} {...props} />
          ))}
        </div>
        <div className="col-span-1 flex flex-col gap-6">
          {ACTIVITIES.slice(2, 4).map((props, key) => (
            <CollageCard key={key} {...props} />
          ))}
        </div>
      </div>
     
    </section>
  );
}

export default ActivitiesCollage;