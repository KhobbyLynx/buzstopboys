"use client"
import ActivitiesCollage from "@/view/Activiteis/ActivitiesCollage"
import Highlight from "@/view/Activiteis/Highlight"
import { Box } from "@mui/material"
import VideoSwiper from "@/components/Carousel/VideoSwiper"

function page() {
  return (
    <>
    <Box className="px-8">
      <ActivitiesCollage />
    </Box>
        <VideoSwiper />
        <Highlight />
    </>
    
  )
}

export default page