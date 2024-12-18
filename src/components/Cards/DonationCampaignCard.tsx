import { Typography, Card, CardBody, CardHeader, Button } from "@material-tailwind/react";
import Image from "next/image";


interface DonationCampaignCardProps {
  img: string;
  target: number;
  raised: number;
  title: string;
  desc: string;
}

export function DonationCampaignCard({ img, target, title, desc, raised }: DonationCampaignCardProps) {
  return (
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
            className="mb-2 font-normal text-gray-500"
          >
            Target: GHS{target}
          </Typography>
            </li>
            <li>
            <Typography
            variant="small"
            color="blue"
            className="mb-2 font-normal text-gray-500"
          >
           Raised: GHS{raised}
          </Typography>
            </li>
          </ul>
         
        </div>
        <a
          href="#"
          className="text-blue-gray-900 transition-colors hover:text-gray-900"
        >
          <Typography variant="h5" className="mb-2 normal-case">
            {title}
          </Typography>
        </a>
        <Typography className="mb-6 font-normal !text-gray-500">
          {desc}
        </Typography>
        <Button variant="outlined" className="justify-self-end self-end">Donate</Button>
      </CardBody>
    </Card>
  );
}

export default DonationCampaignCard;