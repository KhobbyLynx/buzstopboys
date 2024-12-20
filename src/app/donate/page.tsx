'use client'
import DonationCampaign from "@/view/Donations/DonationCampaign"
import DonationCards from "@/view/Donations/DonationCards"
import PageNavbar from "@/view/pages/PageNavbar"

function pages() {
 

  return (
    <>
        <DonationCards />
        <DonationCampaign />
    </>
  )
}

export default pages