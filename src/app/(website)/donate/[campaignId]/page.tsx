'use client'

import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { Avatar, Box, Button, Chip, CircularProgress, Typography } from '@mui/material'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import { singleCampaign } from '@/store/donations'
import { SwiperSlide, Swiper } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import Head from 'next/head'
import { calculatePercentage, formatAmount, formatDate } from '@/utils/utils'
import IconifyIcon from '@/components/icon'

const DonationCampaignDetails: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.donations)

  const { selectedCampaign, pending } = store
  const { raised, target, imgs, subText, title, desc, status, createdAt, details } =
    selectedCampaign

  const { campaignId } = useParams() as { campaignId: string }

  useEffect(() => {
    if (selectedCampaign.id !== campaignId || !selectedCampaign.id) {
      dispatch(singleCampaign(campaignId))
    }
  }, [dispatch, campaignId, selectedCampaign])

  if (pending) {
    return (
      <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <CircularProgress sx={{ mb: 4 }} />
        <Typography>Loading...</Typography>
      </Box>
    )
  }

  if (!selectedCampaign || Object.keys(selectedCampaign).length === 0 || status === 'suspended') {
    return <div className="text-center text-red-500 mt-10">Campaign not found. </div>
  }

  return (
    <>
      <Head>
        <title>{title} | BuzStopBoys</title>
        <meta name="description" content={desc} />
        <meta property="og:image" content={imgs?.[0] || ''} />
      </Head>

      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{title}</h1>
        {subText && <p className="text-lg text-gray-600 dark:text-gray-400">{subText}</p>}

        <div className="relative w-full h-96 overflow-hidden rounded-2xl">
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

        {/* Campaign Details */}
        <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-gray-700">{desc}</p>

          <div className="space-y-2 mt-8">
            <h2 className="text-lg font-semibold">Details</h2>
            <ul className="list-disc pl-6 space-y-1">
              {details.map((detail, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300">
                  {detail}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-sm text-green-800 mt-4 mb-1">Progress so far:</p>
          <div className="h-4 w-full bg-gray-200 rounded-full dark:bg-gray-700">
            <div
              className="h-4 bg-green-500 rounded-full"
              style={{ width: `${calculatePercentage(target, raised)}%` }}
            ></div>
          </div>

          <div className="space-y-4 mt-4">
            <p className="text-gray-600 dark:text-gray-400 uppercase">
              <strong>
                <em className="text-blue-600">Raised:</em>
              </strong>{' '}
              {formatAmount(raised)} / {formatAmount(target)}
            </p>
          </div>

          <p className="mt-10">
            <strong>🗓 Commenced At:</strong>{' '}
            {`${formatDate(createdAt).date} - ${formatDate(createdAt).time}`}
          </p>
          <div>
            <strong
              className={`mr-2 ${
                status === 'active'
                  ? 'text-blue-600'
                  : status === 'completed'
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              ⚜️ Status:
            </strong>{' '}
            <Chip label={status} avatar={<Avatar>🛜</Avatar>} />
          </div>
        </div>

        <Button
          startIcon={<IconifyIcon icon="mingcute:back-fill" />}
          onClick={() => window.history.back()}
          variant="outlined"
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-100"
        >
          Back
        </Button>
      </div>
    </>
  )
}

export default DonationCampaignDetails
