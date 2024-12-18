import React from "react";

import { Typography, Card, CardBody, Avatar, Rating } from "@material-tailwind/react";

interface FeedbackCardProps {
  name: string;
  job: string;
  feedback: string;
  star: number; 
  img: string
};

export function FeedbackCard({ img, feedback, job, name, star }: FeedbackCardProps) {
  return (
    <Card shadow={false} className="items-cemter text-center">
      <CardBody>
        <Avatar src={img} className="mb-2" alt={name} size="xl" />
        <Typography variant="h6" color="blue-gray">
          {name}
        </Typography>
        <Typography
          variant="small"
          color="blue-gray"
          className="mt-1 mb-5 block font-normal"
        >
          {job}
        </Typography>
        <Typography
          variant="paragraph"
          className="mb-6 font-normal text-gray-500"
        >
          &quot;{feedback}&quot;
        </Typography>
        <Rating value={star} readonly />
      </CardBody>
    </Card>
  );
}
export default FeedbackCard;