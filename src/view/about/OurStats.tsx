"use client";

import React from "react";
import { Typography } from "@material-tailwind/react";
import {
  SparklesIcon,
  PuzzlePieceIcon,
  UserGroupIcon,
  GlobeEuropeAfricaIcon,
} from "@heroicons/react/24/solid";

import StatsCard from "./stats-card";

const STATS = [
  {
    icon: GlobeEuropeAfricaIcon,
    count: "750+",
    title: "Areas Transformed",
  },
  {
    icon: PuzzlePieceIcon,
    count: "10,000+",
    title: "Waste Removed(kg)",
  },
  {
    icon: SparklesIcon,
    count: "120+",
    title: "Volunteer",
  },
  {
    icon: UserGroupIcon,
    count: "10k",
    title: "Spreading Awareness: Followers",
  },
];

export function OurStats() {
  return (
    <section className="px-8 mb-36">
      <div className="container mx-auto text-center lg:text-left">
        <div className="grid place-items-center text-center">
          <Typography variant="h2" color="blue-gray" className="mb-2 text-4xl">
           Our Journey So Far
          </Typography>
          <Typography
            variant="lead"
            className="mx-auto mb-24 w-full !text-gray-500 lg:w-5/12"
          >
            These stats provide a clear picture of BuzStopBoys’ achievements and future goals, encouraging visitors to engage, volunteer, or donate.
          </Typography>
        </div>
        <div className="grid gap-y-16 gap-x-10 md:grid-cols-2 lg:grid-cols-4">
          {STATS.map((props, key) => (
            <StatsCard key={key} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
export default OurStats;