'use client'
import { AppDispatch, RootState } from '@/store'
import { getDonationOptions, getDonationsCampaigns } from '@/store/donations'
import DonationCampaign from '@/view/donations/DonationCampaign'
import DonationCards from '@/view/donations/DonationCards'
import { Box, CircularProgress, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Donations() {
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.donations)
  const { pending, donationOptions, donationCampaigns } = store

  useEffect(() => {
    // Fetch Donation Campaigns
    if (donationCampaigns.length === 0) dispatch(getDonationsCampaigns())

    // Fetch Donation Options
    if (donationOptions.length === 0) dispatch(getDonationOptions())
  }, [dispatch, donationCampaigns.length, donationOptions.length])

  if (pending) {
    return (
      <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <CircularProgress sx={{ mb: 4 }} />
        <Typography>Loading...</Typography>
      </Box>
    )
  }

  const allSuspended = donationCampaigns.every((campaign) => campaign.status === 'suspended')

  console.log('--------allSuspended----------')
  console.log('--------allSuspended----------', allSuspended)
  console.log('--------allSuspended----------')
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
