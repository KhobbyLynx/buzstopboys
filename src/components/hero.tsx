"use client";

import { Button, Typography } from "@material-tailwind/react";
import Link from "next/link";

function Hero() {
  return (
    <div className="relative min-h-screen w-full bg-[url('/image/banner/cover.jpeg')] bg-cover bg-no-repeat">
    <div className="absolute inset-0 h-full w-full bg-gray-900/60" />
    <div className="grid min-h-screen px-8">
      <div className="container relative z-10 my-auto mx-auto grid place-items-center text-center">
        <Typography variant="h3" color="white" className="mb-2">
          #BuzStopBoys
        </Typography>
        <Typography variant="h1" color="white" className="lg:max-w-3xl">
        Your support can make a significant impact: Make a
        Difference Today!
        </Typography>
        <Typography
          variant="lead"
          color="white"
          className="mt-1 mb-12 w-full md:max-w-full lg:max-w-2xl"
        >
         Join BuzStopBoys
Volunteering
        </Typography>
        <div className="flex items-center gap-4">
          <Link href='/about-us'>
          <Button variant="outlined" color="white">
            Learn More
          </Button>
          </Link>
          <Link href="/donate">
          <Button variant="gradient" color="green">
            <i className="fas fa-heart" /> Donate
          </Button>
          </Link>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Hero;
