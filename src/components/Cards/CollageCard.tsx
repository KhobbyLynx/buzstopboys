import React from "react";
import Image from "next/image";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import IconifyIcon from "../icon";
import { ActivityProps } from "@/types/activities";
import { Box } from "@mui/material";
import Link from "next/link";

function CollegeCard({ id, imgs, title, caption, icon } : ActivityProps) {
  return (
      <Box component={Link} href={`/activities/${id}`}>
    <Card className="relative grid min-h-[12rem] w-full overflow-hidden cursor-pointer">
      <Image
        width={768}
        height={768}
        src={imgs[0]}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover object-top"
      />
      <div className="absolute inset-0 h-full w-full bg-black/50" />
      <CardBody className="relative flex flex-col justify-between">
        <IconifyIcon icon={icon} fontSize={20} className="h-8 w-8 text-white"/>
        <div>
          <Typography variant="h5" className="mb-1" color="white">
            {title}
          </Typography>
          <Typography color="white" className="text-xs font-bold opacity-50">
            {caption}
          </Typography>
        </div>
      </CardBody>
    </Card>
      </Box>
  );
}
export default CollegeCard;