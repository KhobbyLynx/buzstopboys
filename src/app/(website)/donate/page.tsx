'use client'
import { AppDispatch, RootState } from "@/store"
import { getDonationOptions, getDonationsCampaigns } from "@/store/donations"
import DonationCampaign from "@/view/Donations/DonationCampaign"
import DonationCards from "@/view/Donations/DonationCards"
import { Box } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

function Donations() {
  const dispatch = useDispatch<AppDispatch>()
  const donations = useSelector((state : RootState) => state.donations)
  
  useEffect(() => {
    // Fetch Donation Campaigns 
    dispatch(getDonationsCampaigns())

    // Fetch Donation Options
    dispatch(getDonationOptions())
  }, [ dispatch ])

  return (
    <Box className="px-8 md:px-16 mb-20 lg:mb-30">
        <DonationCards donationOptions={donations.donationOptions} />
        <DonationCampaign donationCampaign={donations.donationCampaigns} />
    </Box>
  )
}

export default Donations