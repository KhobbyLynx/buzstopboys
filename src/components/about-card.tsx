import { Card, CardBody, Typography, Button } from '@material-tailwind/react'
import Link from 'next/link'

interface AboutCardProp {
  id: string
  title: string
  caption: string
  desc: string
  imgs: string[]
}

export function AboutCard(props: AboutCardProp) {
  const { id, title, desc, caption, imgs } = props

  const backgroundImageStyle = {
    backgroundImage:
      imgs && imgs.length > 0 ? `url('${imgs[0]}')` : `url('/images/banner/cover4.svg')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  }

  return (
    <Card shadow={false}>
      <CardBody
        className="h-[353px] p-5 flex flex-col justify-center items-center rounded-2xl"
        style={backgroundImageStyle}
      >
        <Typography variant="h6" className="mb-4 text-center" color="white">
          {caption}
        </Typography>
        <Typography variant="h4" className="text-center" color="white">
          {title}
        </Typography>
        <Typography
          color="white"
          className="mt-2 mb-10 text-base w-full lg:w-8/12 text-center font-normal"
        >
          {desc}
        </Typography>
        {id && (
          <Link href={`/activities/${id}`}>
            <Button color="white" size="sm">
              view details
            </Button>
          </Link>
        )}
      </CardBody>
    </Card>
  )
}

export default AboutCard
