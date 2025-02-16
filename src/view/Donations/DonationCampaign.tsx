"use client";

import { Typography } from "@material-tailwind/react";

import DonationCampaignCard from "@/components/Cards/DonationCampaignCard";
import { DonationCampaignProps } from "@/types/donations";

const CAMPAIGN = [
  {
    target: 10000,
    raised: 6500,
    title: "Clean Up Korle Gonno Beach",
    desc: "Help us restore the beauty of Korle Gonno Beach by funding tools, waste bins, and community involvement programs.",
    img: "/images/campaigns/beach1.jpg",
  },
  {
    target: 15000,
    raised: 12000,
    title: "Sanitation Awareness in Schools",
    desc: "Support our initiative to educate students on hygiene and proper waste management in local schools.",
    img: "/images/campaigns/water.png",
  },
  {
    target: 8000,
    raised: 3000,
    title: "Market Clean-Up Drive",
    desc: "Contribute to cleaning up major market areas and installing waste disposal systems for sustainable waste management.",
    img: "/images/campaigns/waste.jpg",
  },
  {
    target: 12000,
    raised: 5000,
    title: "Community Waste Segregation Program",
    desc: "Sponsor waste segregation training and provide households with color-coded bins to promote recycling.",
    img: "/images/campaigns/beach3.png"
  },
  {
    target: 20000,
    raised: 14000,
    title: "Accra City Clean-Up Marathon",
    desc: "Join hands to clean up Accra’s streets during our biggest clean-up campaign yet. Your funds will cover logistics and cleaning supplies.",
    img: "/images/campaigns/beach2.jpg"
  },
  {
    target: 10000,
    raised: 7500,
    title: "Hospital Waste Management Initiative",
    desc: "Donate to improve waste management in local clinics and hospitals, ensuring a cleaner and safer environment for patients.",
    img: "/images/campaigns/beach1.jpg",
  },
];


export function DonationCampaign({ donationCampaign } : { donationCampaign: DonationCampaignProps[] }) {
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
          We’re working tirelessly to tackle key challenges in our community. Whether it&apos;s cleaning our environment, providing essentials to those in need, or empowering local youth, your support fuels our mission. Select a purpose below to make your donation impactful and purpose-driven.
        </Typography>
      </div>
  <div className="mx-auto grid grid-cols-1 gap-x-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-14">
    {donationCampaign.map((props, idx) => {
         if(props.status !== 'suspended') {
            return <DonationCampaignCard key={idx} {...props} />
         } else {
            return null
         }
    })}
  </div>
    </section>
  );
}

export default DonationCampaign;