'use client'

import { Typography, Card, CardBody, CardHeader, Button } from '@material-tailwind/react'
import Image from 'next/image'
import { formatAmount } from '@/utils/utils'
import AuthModal from '../modals/AuthModal'
import { useState } from 'react'
import DonationCampaignModal from '../modals/DonationCampaign'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import Link from 'next/link'

interface DonationCampaignCardProps {
  id: string
  imgs: string[]
  target: number
  raised: number
  title: string
  desc: string
  status: string
}

export function DonationCampaignCard({ ...props }: DonationCampaignCardProps) {
  const { id, imgs, target, title, desc, raised, status } = props
  const [show, setShow] = useState<boolean>(false)
  const [showDetails, setShowDetails] = useState<boolean>(false)
  const toggleAuthModal = () => setShow(!show)

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)

  const handeCampaignDonate = () => {}

  return (
    <div>
      <Card className="border">
        <CardHeader className="h-64 border-solid border-gray-700">
          <div className="relative w-full h-64 overflow-hidden rounded-2xl">
            <Swiper
              spaceBetween={10}
              slidesPerView={1}
              pagination={true}
              className="w-full h-full"
              autoplay={{ delay: 5000, disableOnInteraction: true }}
              modules={[Pagination, Autoplay]}
            >
              {imgs.map((img, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={img}
                    alt={`Campaign Image ${index + 1}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
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
                <Typography variant="small" color="blue" className="mb-2 font-normal text-blue-500">
                  <span className="font-bold uppercase">Raised:</span> {formatAmount(raised)}
                </Typography>
              </li>
            </ul>
          </div>
          <Link href={`/donate/${id}`}>
            <Typography
              variant="h5"
              className="mb-2 normal-case text-blue-900 transition-colors hover:text-blue-700 cursor-pointer"
            >
              {title}
            </Typography>
          </Link>
          <Typography className="mb-6 font-normal !text-gray-600">{desc}</Typography>
          <Button
            variant="outlined"
            className="justify-self-end self-end"
            disabled={status !== 'active'}
            color={status === 'completed' ? 'green' : 'red'}
            onClick={() => {
              !isLoggedIn ? toggleAuthModal() : handeCampaignDonate()
              console.log('Donated!', show)
            }}
          >
            {status === 'completed' ? 'Target Reached' : 'Donate Toward a Purpose'}
          </Button>
        </CardBody>
      </Card>
      <AuthModal show={show} toggleModal={toggleAuthModal} />
      {/* <DonationCampaignModal
        isLoggedIn={isLoggedIn}
        show={showDetails}
        toggleModal={toggleDetailsModal}
        handeCampaignDonate={handeCampaignDonate}
        img={img}
        target={target}
        title={title}
        desc={desc}
        raised={raised}
        status={status}
      /> */}
    </div>
  )
}

export default DonationCampaignCard
