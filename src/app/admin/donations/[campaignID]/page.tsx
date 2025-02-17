'use client'
import { useParams } from 'next/navigation'
import React from 'react'

const DonationCampaignDetails: React.FC = () => {

  const { campaignId } = useParams() as { campaignId : string}
  return (
    <div>
        ID from Campaign {`${campaignId}`}
    </div>
  )
}

export default DonationCampaignDetails