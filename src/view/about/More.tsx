"use client";

import { Typography } from "@material-tailwind/react";
import {
  RectangleGroupIcon,
  FingerPrintIcon,
  SwatchIcon,
  HashtagIcon,
  EyeIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  Square3Stack3DIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/solid";
import InfoCard from "./info-card";

const INFO = [
  {
    icon: RocketLaunchIcon,
    title: "Our Mission",
    children:
      "We aim to inspire positive change by tackling the growing issues of public hygiene and waste management. Through community-driven initiatives, we clean, educate, and empower people to maintain a cleaner environment while addressing the root causes of unsanitary conditions.",
  },
  {
    icon: EyeIcon,
    title: "Our Vision",
    children:
      "We envision a future where every community in Ghana thrives in cleanliness, health, and unity. By setting a standard for public hygiene, we aspire to make sustainable living practices a norm and inspire similar movements across Africa and beyond.",
  },
  {
    icon: Square3Stack3DIcon,
    title: "Our Values",
    children:[
        "Integrity: We act with transparency, honesty, and accountability in everything we do.",
        "Collaboration: We believe that working together with communities and partners creates the greatest impact.",
        "Sustainability: Our cleaning initiatives are designed to be long-lasting and environmentally friendly.",
        "Innovation: We continuously look for new and efficient ways to tackle waste management and public hygiene issues."
    ]
  },
  {
    icon: AcademicCapIcon,
    title: "Our Achievements",
    children:[
        "Over 750+ Areas Transformed: From markets to parks, we’ve helped revitalize over 750+ locations.",
        "500+ Volunteers Mobilized: Engaging passionate individuals who dedicate their time to cleaning drives and awareness campaigns.",
        "10,000+ Kilograms of Waste Collected: Clearing vast amounts of waste from public spaces and helping reduce environmental pollution.",
        "New Locations in the Pipeline: We’re expanding to more communities and planning large-scale cleaning initiatives in the coming months."
    ]
  },
];

export function MoreInfo() {
  return (
    <section className="mt-36 mb-20 lg:mb-40">
      <div className="container mx-auto text-center">
        <Typography color="blue-gray" className="mb-2 font-bold uppercase">
          #BUZSTOPBOYS
        </Typography>
        <Typography variant="h1" color="blue-gray" className="mb-4">
        Who We Are
        </Typography>
        <Typography
          variant="lead"
          className="mx-auto w-full !text-gray-500 lg:w-10/12"
        >
         BuzStopBoys is a dedicated non-governmental organization based in Accra, Ghana, committed to creating cleaner and healthier environments for all. Our mission is simple yet impactful: to transform neglected and unclean areas into vibrant, sustainable spaces that foster community well-being and environmental health.
        </Typography>
      </div>
      <div className="mx-auto grid grid-cols-1 gap-y-5 md:grid-cols-2 mt-10">
        {INFO.map((props, idx) => (
          <InfoCard key={idx} {...props} />
        ))}
      </div>
    </section>
  );
}

export default MoreInfo;