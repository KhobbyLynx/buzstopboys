import React from 'react'

interface ParamsType {
    campaignID: String
}
const DonationCampaignDetails = ({params}: {params: ParamsType}) => {
  return (
    <div>
        ID from Campaign {`${params.campaignID}`}
    </div>
  )
}

export default DonationCampaignDetails