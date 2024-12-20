"use client";

import React from "react";
import {
  Button,
  Typography,
  Card,
  CardBody,
} from "@material-tailwind/react";

import {
  GlobeEuropeAfricaIcon,
  MicrophoneIcon,
  PuzzlePieceIcon,
  HeartIcon,
  AcademicCapIcon,
  LightBulbIcon,
} from "@heroicons/react/24/solid";

import { Box, Grid } from "@mui/material";

import CollageCard from "@/components/Cards/CollageCard";
import RotatingCard from "@/components/Cards/RotationCard";
import RotatingCardFront from "@/components/Cards/RotationCard/RotationCardFront";
import RotatingCardBack from "@/components/Cards/RotationCard/RotationCardBack";
import Image from "next/image";


const ACTIVITIES = [
  {
    img: "/image/campaigns/clean-sanitation.jpeg",
    icon: GlobeEuropeAfricaIcon,
    title: "Cleaning & Sanitation",
    desc: "750+ spaces revitalized",
  },
  {
    img: "/image/campaigns/with-JM.jpeg",
    icon: HeartIcon,
    title: "Sponsors & Partnerships",
    desc: "100+ partners",
  },
  {
    img: "/image/campaigns/team-photo.png",
    icon: LightBulbIcon,
    title: "Street Lighting",
    desc: "200+ lights installed",
  },
  {
    img: "/image/campaigns/civil-gh.png",
    icon: AcademicCapIcon,
    title: "Education & Training",
    desc: "Spreading knowledge through commitment",
  },
];


export function ActivitiesCollage() {
  return (
    <section className="container mx-auto px-8 py-10">
      <div className="mb-10 grid place-items-center text-center">
        <Typography variant="h2" color="blue-gray" className="my-3">
          Activities Studio
        </Typography>
        <Typography variant="lead" className="!text-gray-500 lg:w-6/12">
          Our activities are designed to make a difference in the community. We
          are committed to creating a positive impact in the world.
        </Typography>
        <Typography variant="h4" className="my-3 text-blue-400">
          Watch our activities in action
        </Typography>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded overflow-hidden my-auto cursor-pointer">
        <Image src="/image/campaigns/pokuase-porject.jpeg" alt="event" layout="responsive" width={400} height={400}/>
        </div>
        <div className="col-span-1 flex flex-col gap-6">
          {ACTIVITIES.slice(0, 2).map((props, key) => (
            <CollageCard key={key} {...props} />
          ))}
        </div>
        <div className="col-span-1 flex flex-col gap-6">
          {ACTIVITIES.slice(2, 4).map((props, key) => (
            <CollageCard key={key} {...props} />
          ))}
        </div>
      </div>
     
    </section>
  );
}

export default ActivitiesCollage;