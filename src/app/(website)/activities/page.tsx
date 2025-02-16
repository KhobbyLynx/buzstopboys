"use client"
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Autoplay, EffectCube, Pagination } from 'swiper/modules';

import ActivitiesCollage from "@/view/Activiteis/ActivitiesCollage"
import EventHighlight from "@/view/events/EventHighlight"
import { Box } from "@mui/material"
import VideoSwiper from "@/components/Carousel/VideoSwiper"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/store"
import { useEffect } from "react"
import { getActivities } from "@/store/activities"

function Activities() {
  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state : RootState) => state.activities)

  // ** useEffect
  useEffect(() => {
    dispatch(getActivities())
  }, [dispatch])

  return (
    <>
    <Box className="px-8">
      <ActivitiesCollage data={store.activities}/>
    </Box>
      <VideoSwiper />
      <EventHighlight />
    </>
    
  )
}

export default Activities