"use client"

import ActivitiesCollage from "@/view/Activiteis/ActivitiesCollage"
import Highlight from "@/view/Activiteis/Highlight"
import PageNavbar from "@/view/pages/PageNavbar"

function page() {
  return (
    <div>
        <PageNavbar />
        <ActivitiesCollage />
        <Highlight />
    </div>
  )
}

export default page