'use client'
import { DonationCampaignProps, DonationOptionsProps } from "@/types/donations"
import axiosRequest from "@/utils/axiosRequest"
import DonationCampaign from "@/view/Donations/DonationCampaign"
import DonationCards from "@/view/Donations/DonationCards"
import { Box } from "@mui/material"
import { useEffect, useState } from "react"

function Donations() {
  const [donationOptions, setDonationOptions] = useState<DonationOptionsProps[]>([])
  const [donationCampaign, setDonationCampaign] = useState<DonationCampaignProps[]>([])
  useEffect(()  => {
    fetchCampaignsAndDonationOptions()
  }, [])
 
  const fetchCampaignsAndDonationOptions = async () => {
    try {
      const response = await axiosRequest.get("/donate")
      const {donationOptions, campaigns} = response.data
      setDonationCampaign(campaigns)
      setDonationOptions(donationOptions)

      console.log("Donations fetched:", response.data)
    } catch (error: any) {
      console.error("Error fetching donations:", error)
    }
  }

  return (
    <Box className="px-8 md:px-16 mb-20 lg:mb-30">
        <DonationCards donationOptions={donationOptions} />
        <DonationCampaign donationCampaign={donationCampaign} />
    </Box>
  )
}

export default Donations