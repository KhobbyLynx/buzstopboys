'use client'

import { Typography } from '@material-tailwind/react'

import DonationCampaignCard from './src/components/cards/DonationCampaignCard'
import { DonationCampaignProps } from './src/types/donations'

export function DonationCampaign({
  donationCampaign,
}: {
  donationCampaign: DonationCampaignProps[]
}) {
  return (
    <section className="py-0">
      <div className="container mx-auto mb-24 text-center">
        <Typography variant="h2" color="blue-gray">
          Support a Cause Close to Your Heart
        </Typography>
        <Typography
          variant="lead"
          className="mt-2 mx-auto w-full px-4 !text-blue-500 lg:w-6/12 lg:px-8"
        >
          Focused Giving for Focused Change
        </Typography>
        <Typography
          variant="lead"
          className="mt-2 mx-auto w-full px-4 !text-gray-500 lg:w-6/12 lg:px-8"
        >
          We’re working tirelessly to tackle key challenges in our community. Whether it&apos;s
          cleaning our environment, providing essentials to those in need, or empowering local
          youth, your support fuels our mission. Select a purpose below to make your donation
          impactful and purpose-driven.
        </Typography>
      </div>
      <div className="mx-auto grid grid-cols-1 gap-x-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-14">
        {donationCampaign.map((props, idx) => {
          if (props.status !== 'suspended') {
            return <DonationCampaignCard key={idx} {...props} />
          } else {
            return null
          }
        })}
      </div>
    </section>
  )
}

export default DonationCampaign
