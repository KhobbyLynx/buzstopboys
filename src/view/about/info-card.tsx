import { Card, CardBody, Typography } from "@material-tailwind/react";

interface InfoCardProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}

export function InfoCard({ icon: Icon, title, children }: InfoCardProps) {
  return (
    <Card color="transparent" shadow={false}>
      <CardBody className="grid justify-center text-center p-0 md:p-6 md:mx-20">
        <div className="mx-auto mb-6 grid h-12 w-12 place-items-center rounded-full bg-gray-900 text-white shadow">
          <Icon className="h-6 w-6" strokeWidth={2} />
        </div>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {title}
        </Typography>
        {
          typeof(children) === 'string' ? 
        <Typography className="font-normal !text-gray-500">
          { children }
        </Typography> : 
        <ul>
         {Array.isArray(children) ? children.map((list, index) => (
  <li key={index} className="font-normal !text-gray-500 ">{list}</li>
)) : null}
        </ul>
        }
      </CardBody>
    </Card>
  );
}

export default InfoCard;