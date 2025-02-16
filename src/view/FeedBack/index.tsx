"use client";
import React from "react";
import FeedbackCard from "./feedback-card";
import { Typography } from "@material-tailwind/react";

type Feedback = {
  name: string;
  job: string;
  feedback: string;
  star: number; 
  img: string
};

const FEEDBACKS: Feedback[] = [
  {
    name: "John Doe",
    job: "Software Engineer",
    feedback: "BuzStopBoys has done an incredible job transforming our neighborhood park. Their dedication is truly inspiring!",
    star: 5,
    img: "/images/avatars/avatar2.jpg",
  },
  {
    name: "Jane Smith",
    job: "Teacher",
    feedback: "The cleanliness of our community has significantly improved thanks to their efforts. Keep up the great work!",
    star: 3,
    img: "/images/avatars/avatar1.jpg",
  },
  {
    name: "Samuel Opoku",
    job: "Entrepreneur",
    feedback: "I appreciate their mission, but there’s still room for improvement in organizing volunteers.",
    star: 4,
    img: "/images/avatars/avatar3.jpg",
  },
  {
    name: "Ama Mensah",
    job: "Nurse",
    feedback: "Fantastic initiative! I’m happy to see such impactful work in our community.",
    star: 5,
    img: "/images/avatars/avatar2.jpg",
  },
];

export function Feedback() {
  return (
    <section className="py-24">
      <div className="container mx-auto">
        <div className="mb-16 flex flex-col items-center w-full text-center">
          <Typography variant="h2" color="blue-gray" className="mb-2">
          We Value Your Feedback
          </Typography>
          <Typography
            variant="lead"
            className="mb-10 max-w-3xl lg:text-center !text-gray-500"
          >
            Help Us Improve and Make a Greater Impact.
          </Typography>
        </div>
        <div className="grid grid-cols md:grid-cols-4 gap-x-6 mx-auto items-center">
          {FEEDBACKS.map((props, key) => (
            <FeedbackCard key={key} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}


export default Feedback;
