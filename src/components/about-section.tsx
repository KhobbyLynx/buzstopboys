"use client";

import AboutCard from "@/components/about-card";
import { Typography } from "@material-tailwind/react";

const EVENT_INFO = [
  {
    title: "Our Transformation Process",
    description:
      "We identify unclean areas, deploy cleaning teams equipped with sustainable tools, and work closely with community members to restore spaces into clean, vibrant environments.",
    subTitle: "From Neglect to Renewal",
    coverImage: 'cover2'
  },
  {
    title: "Empowering Communities for Change",
    description:
    "Organizing hygiene education programs, engaging local volunteers, and creating partnerships to sustain cleanliness efforts long-term.",
    subTitle: "Community Outreach",
    coverImage: 'cover3'
  },
];

export function AboutSection() {
  return (
    <section className="mx-auto flex flex-col items-center py-10 md:py-20 px-8 lg:px-16 bg-gray-100 dark:bg-gray-800 dark:text-white">
      <Typography variant="h6" className="text-center mb-2" color="blue">
        About BuzStopBoys
      </Typography>
      <Typography variant="h3" className="text-center" color="blue-gray">
      Vision | Mission
      </Typography>
      <Typography
        variant="lead"
        className="mt-2 lg:max-w-4xl mb-8 w-full text-center font-normal !text-gray-500"
      >
        BuzStopBoys is a dedicated non-governmental organization committed to transforming unclean areas into clean, healthy environments. Our mission is to promote public hygiene and environmental sustainability by transforming neglected and unclean areas into healthy spaces.
      </Typography>
      <div className="mt-8 w-full grid grid-cols-1 md:grid-cols-2 gap-4 ">
        {EVENT_INFO.map((props, idx) => (
          <AboutCard key={idx} {...props} />
        ))}
        <div className="md:col-span-2">
          <AboutCard
            title="Our Next Stop!"
            subTitle="Join Us on Our Mission"
            description=" Sharing details about upcoming locations and encouraging volunteers, donations, and partnerships to support our initiatives."
            coverImage="cover4"
          />
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
