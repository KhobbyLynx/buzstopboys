"use client"

import ActivitiesCollage from "@/view/Activiteis/ActivitiesCollage"
import Highlight from "@/view/Activiteis/Highlight"
import { Box } from "@mui/material"

function page() {
  return (
    <>
    <Box className="px-8">
      <ActivitiesCollage />
    </Box>
        <Highlight />
    </>
  )
}

export default page