"use client";

import { Typography } from "@material-tailwind/react";
import StatsCard from "./src/components/stats-card";

const STATS = [
  {
    count: "750+",
    title: "Areas Transformed",
  },
  {
    count: "12k + ",
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

function OurStats() {
  return (
    <section className="mx-auto grid gap-6 lg:grid-cols-1 lg:gap-20 xl:grid-cols-2 xl:place-items-center bg-gray-100 dark:bg-gray-800 dark:text-white py-16 px-6 mb-10">
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
        <div className="grid grid-cols-2 gap-8 gap-x-10">
          {STATS.map((props, key) => (
            <StatsCard key={key} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default OurStats;
