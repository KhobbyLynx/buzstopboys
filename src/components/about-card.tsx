import {
  Card,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

interface AboutCardProp {
  title: string;
  subTitle: string;
  description: string;
  coverImage: string;
}

export function AboutCard({ title, description, subTitle, coverImage }: AboutCardProp) {
  const backgroundImageStyle = {
    backgroundImage: coverImage ? `url('/image/banner/${coverImage}.svg')` : 'none',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <Card shadow={false}>
      <CardBody
        className="h-[453px] p-5 flex flex-col justify-center items-center rounded-2xl"
        style={backgroundImageStyle}
      >
        <Typography variant="h6" className="mb-4 text-center" color="white">
          {subTitle}
        </Typography>
        <Typography variant="h4" className="text-center" color="white">
          {title}
        </Typography>
        <Typography
          color="white"
          className="mt-2 mb-10 text-base w-full lg:w-8/12 text-center font-normal"
        >
          {description}
        </Typography>
        <Button color="white" size="sm">
          view details
        </Button>
      </CardBody>
    </Card>
  );
}

export default AboutCard;
