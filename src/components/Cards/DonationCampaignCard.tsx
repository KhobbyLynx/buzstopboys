'use client'

import { Typography, Card, CardBody, CardHeader, Button } from "@material-tailwind/react";
import Image from "next/image";
import { formatAmount } from "@/lib/utils"
import AuthModal from "../Modals/AuthModal";
import { useState } from "react";
import DonationCampaignModal from "../Modals/DonationCampaign";

interface DonationCampaignCardProps {
  img: string;
  target: number;
  raised: number;
  title: string;
  desc: string;
}

export function DonationCampaignCard({ ...props }: DonationCampaignCardProps) {
  const {img, target, title, desc, raised} = props
  const [auth, setAuth] = useState<boolean>(false);
   const [show, setShow] = useState<boolean>(false);
   const [showDetails, setShowDetails] = useState<boolean>(false);
    const toggleModal = () => setShow(!show);
    const toggleDetailsModal = () => setShowDetails(!showDetails);

    const handeCampaignDonate = () => {}
  return (
    <div>
    <Card className="border">
      <CardHeader className="h-64 border-solid border-gray-700">
        <Image
          width={768}
          height={768}
          src={img}
          alt={title}
          className="h-full w-full object-cover scale-[1.1]"
        />
      </CardHeader>
      <CardBody className="">
        <div className="flex items-center gap-2">
          <ul>
            <li>
            <Typography
            variant="small"
            color="blue"
            className="mb-2 font-normal text-green-700"
          >
            <span className="font-bold uppercase">Target:</span> {formatAmount(target)}
          </Typography>
            </li>
            <li>
            <Typography
            variant="small"
            color="blue"
            className="mb-2 font-normal text-blue-500"
          >
           <span className="font-bold uppercase">Raised:</span> {formatAmount(raised)}
          </Typography>
            </li>
          </ul>
        </div>
        <Typography
         onClick={
          ()=> {
            toggleDetailsModal()
            console.log('Donate Now Details', showDetails)
           }
          } 
          variant="h5" className="mb-2 normal-case text-blue-900 transition-colors hover:text-blue-700 cursor-pointer"
        >
            {title}
          </Typography>
        <Typography className="mb-6 font-normal !text-gray-600">
          {desc}
        </Typography>
        <Button variant="outlined" className="justify-self-end self-end" onClick={
          ()=> {
            !auth ? toggleModal() : handeCampaignDonate()
            console.log('Donate Now', show)
          }}
        >
         Donate Toward a Purpose
        </Button>
      </CardBody>
    </Card>
    <AuthModal show={show} toggleModal={toggleModal} />
    <DonationCampaignModal 
        auth={auth}
        show={showDetails}
        toggleModal={toggleDetailsModal}
        handeCampaignDonate={handeCampaignDonate}
        img={img}
        target={target}
        title={title}
        desc={desc}
        raised={raised} 
      />
    </div>
  );
}

export default DonationCampaignCard;