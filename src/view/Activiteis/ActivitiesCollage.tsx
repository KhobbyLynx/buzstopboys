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


const ACTIVITIES = [
  {
    img: "/image/banner/cover2.svg",
    icon: GlobeEuropeAfricaIcon,
    title: "Cleaning & Sanitation",
    desc: "750+ spaces revitalized",
  },
  {
    img: "/image/banner/cover2.svg",
    icon: HeartIcon,
    title: "Sponsors & Partnerships",
    desc: "100+ partners",
  },
  {
    img: "/image/banner/cover2.svg",
    icon: LightBulbIcon,
    title: "Street Lighting",
    desc: "200+ lights installed",
  },
  {
    img: "/image/banner/cover2.svg",
    icon: AcademicCapIcon,
    title: "Education & Training",
    desc: "Spreading knowledge through commitment",
  },
];


export function ActivitiesCollage() {
  return (
    <section className="container mx-auto px-8 py-10">
      <div className="mb-20 grid place-items-center text-center">
        <Typography variant="h2" color="blue-gray" className="my-3">
          Activities Collage
        </Typography>
        <Typography variant="lead" className="!text-gray-500 lg:w-6/12">
          Our activities are designed to make a difference in the community. We
          are committed to creating a positive impact in the world.
        </Typography>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
     
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
      <Box display="flex" justifyContent="center" alignItems="center">
        <RotatingCard>

              <RotatingCardFront
                image="/image/banner/cover2.svg"
                // icon="touch_app"
                title={
                  <>
                    Feel the
                    <br />
                    Material Kit
                  </>
                }
                description="All the MUI components that you need in a development have been re-design with the new look."
              />
              <Card
            color="gray"
            className="relative grid h-full w-full place-items-center overflow-hidden text-center bg-[url('/image/campaigns/pokuase-porject.jpeg')] bg-cover bg-center"
          >helloooo</Card>
        </RotatingCard>
              {/* <RotatingCardBack
                image="/image/banner/cover2.svg"
                title="Discover More"
                description="You will save a lot of time going from prototyping to full-functional code because all elements are implemented."
                action={{
                  type: "internal",
                  route: "/sections/page-sections/page-headers",
                  label: "start with header",
                }}
              /> */}
              
          </Box>
    </section>
  );
}

export default ActivitiesCollage;
          {/* <Card
            color="gray"
            className="relative grid h-full w-full place-items-center overflow-hidden text-center bg-[url('/image/campaigns/pokuase-porject.jpeg')] bg-cover bg-center"
          >
            <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
            <CardBody className="relative w-full">
              <Typography color="white" className="text-xs font-bold opacity-50">
                HTML, CSS & Javascript
              </Typography>
              <Typography variant="h4" className="mt-9" color="white">
                Web Development Intro
              </Typography>
              <Typography
                color="white"
                className="mt-4 mb-14 font-normal opacity-50"
              >
                Ready to start your web development journey?
              </Typography>
              <Button size="sm" color="white">
                Enroll Now
              </Button>
            </CardBody>
          </Card> */}