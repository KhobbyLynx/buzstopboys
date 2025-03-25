'use client'
import { AppDispatch, RootState } from '@/store'
import { getDonationOptions, getDonationsCampaigns } from '@/store/slides/donations'
import DonationCampaign from '@/view/website/donations/DonationCampaign'
import DonationCards from '@/view/website/donations/DonationCards'
import { Box, CircularProgress, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Donations() {
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.donations)
  const { fetchingOptions, donationOptions, donationCampaigns } = store

  useEffect(() => {
    // Fetch Donation Campaigns
    if (donationCampaigns.length === 0) dispatch(getDonationsCampaigns())

    // Fetch Donation Options
    if (donationOptions.length === 0) dispatch(getDonationOptions())
  }, [dispatch, donationCampaigns.length, donationOptions.length])

  if (fetchingOptions) {
    return (
      <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <CircularProgress sx={{ mb: 4 }} />
        <Typography>Loading...</Typography>
      </Box>
    )
  }

  // Check if all campaign are suspended if true dont display
  const allSuspended = donationCampaigns.every((campaign) => campaign.status === 'suspended')

  return (
    <Box className="px-8 md:px-16 mb-20 lg:mb-30">
      {donationOptions.length !== 0 ? <DonationCards donationOptions={donationOptions} /> : null}
      {donationCampaigns.length !== 0 && !allSuspended ? (
        <DonationCampaign donationCampaign={donationCampaigns} />
      ) : null}
    </Box>
  )
}

export default Donations
