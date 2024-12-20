'use client'
import DonationCampaign from "@/view/Donations/DonationCampaign"
import DonationCards from "@/view/Donations/DonationCards"
import { Box } from "@mui/material"

function pages() {
 

  return (
    <Box className="px-8 md:px-16 mb-20 lg:mb-30">
        <DonationCards />
        <DonationCampaign />
    </Box>
  )
}

export default pages