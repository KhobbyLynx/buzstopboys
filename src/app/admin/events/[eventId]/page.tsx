'use client'
import IconifyIcon from '@/components/icon'
import { AppDispatch, RootState } from '@/store'
import { singleEvent } from '@/store/slides/events'
import { formatDate } from '@/utils/utils'
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const EventDetails = () => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.events)

  const { selectedEvent, fetchingSingleEvent } = store

  const {
    startDate,
    startTime,
    endDate,
    endTime,
    desc,
    venue,
    hashTags,
    title,
    caption,
    status,
    img,
  } = selectedEvent

  const { eventId } = useParams() as { eventId: string }

  useEffect(() => {
    if (selectedEvent.id !== eventId || !selectedEvent.id) {
      dispatch(singleEvent(eventId))
    }
  }, [dispatch, eventId, selectedEvent.id])

  if (fetchingSingleEvent) {
    return (
      <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <CircularProgress sx={{ mb: 4 }} />
        <Typography>Loading...</Typography>
      </Box>
    )
  }

  if (!selectedEvent || Object.keys(selectedEvent).length === 0) {
    return <div className="text-center text-red-500">Event not found.</div>
  }

  const Time = () => {
    if (status === 'past') {
      return (
        <>
          <p>
            <strong>📅 Date:</strong> {formatDate(startDate).date}
            {endDate && ' - '}
            {endDate && formatDate(endDate).date}
          </p>
          <p>
            <strong>⏰ Time:</strong> {formatDate(startDate).time}
            {endTime && ' - '}
            {endTime && formatDate(endTime).time}
          </p>
          <p className="mt-2">
            <strong> ⌛Duration: </strong> Ended{' '}
            {endDate ? formatDate(endDate).periodFromNow : formatDate(startDate).periodFromNow}
          </p>
        </>
      )
    } else {
      return (
        <>
          <p>
            <strong>📅 Date:</strong> {formatDate(startDate).date}
            {endDate && ' - '}
            {endDate && formatDate(endDate).date}
          </p>
          <p>
            <strong>⏰ Time:</strong> {formatDate(startTime).time}
            {endTime && ' - '}
            {endTime && formatDate(endTime).time}
          </p>
        </>
      )
    }
  }

  return (
    <>
      <Head>
        <title>{title} | BuzStopBoys</title>
        <meta name="description" content={desc} />
        <meta property="og:image" content={img} />
      </Head>

      <div className="max-w-4xl mx-auto p-6">
        {/* Event Image */}
        <div className="relative w-full h-64 md:h-96">
          <Image src={img} alt={title || 'eventImage'} fill className="object-cover rounded-lg" />
        </div>

        {/* Event Title */}
        <h1 className="text-3xl font-bold mt-6">{title}</h1>

        {/* Event Caption */}
        <p className="text-lg italic text-gray-600 mt-2">{caption}</p>

        {/* Event Details */}
        <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-gray-700">{desc}</p>
          <p className="mt-2">
            <strong>📍 Venue:</strong> {venue}
          </p>

          {Time()}
          <p
            className={`mt-2 font-bold ${
              status === 'upcoming' ? 'text-green-600' : 'text-red-500'
            }`}
          >
            Status: {status?.toUpperCase()}
          </p>
        </div>

        {/* Hashtags */}
        <div className="mt-4 flex gap-2">
          {hashTags?.map((tag, index) => (
            <span key={index} className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full">
              {`#${tag}`}
            </span>
          ))}
        </div>

        {/* Back Button */}
        <Button
          startIcon={<IconifyIcon icon="mingcute:back-fill" />}
          onClick={() => router.push('/admin/events')}
          variant="outlined"
          className="!mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-100"
        >
          Back To Events
        </Button>
      </div>
    </>
  )
}

export default EventDetails
