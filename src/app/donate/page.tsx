'use client'
import DonationCampaign from "@/view/Donations/DonationCampaign"
import DonationCards from "@/view/Donations/DonationCards"
import PageNavbar from "@/view/pages/PageNavbar"

function pages() {
 

  return (
    <div>
        <PageNavbar />
        <DonationCards />
        <DonationCampaign />
    </div>
  )
}

export default pages