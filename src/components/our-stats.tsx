"use client";

import { Typography } from "@material-tailwind/react";
import StatsCard from "@/components/stats-card";

const STATS = [
  {
    count: "750+",
    title: "Areas Transformed",
  },
  {
    count: "10,000+ ",
    title: "Waste Removed(kg)",
  },
  {
    count: "120+",
    title: "Volunteer",
  },
  {
    count: "10k",
    title: "Spreading Awareness: Followers",
  },
];

export function OurStats() {
  return (
    <section className="container mx-auto grid gap-10 px-8 py-36 lg:grid-cols-1 lg:gap-20 xl:grid-cols-2 xl:place-items-center">
      <div>
        <Typography variant="h6" color="blue" className="mb-6 font-medium">
          Our Stats
        </Typography>
        <Typography
          className="text-5xl font-bold leading-tight lg:w-3/4"
          color="blue-gray"
        >
           Before-and-After Highlights
        </Typography>
        <Typography
          variant="lead"
          className="mt-3 w-full !text-gray-500 lg:w-9/12"
        >
          Showcasing the impact of our work through vivid images and stories of areas we’ve cleaned, proving the power of collective action.
        </Typography>
      </div>
      <div>
        <div className="grid grid-cols-2 gap-8 gap-x-28">
          {STATS.map((props, key) => (
            <StatsCard key={key} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default OurStats;