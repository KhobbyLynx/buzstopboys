'use client'

import { AppDispatch, RootState } from '@/store'
import { getEvents } from '@/store/events'
import EventCard from '@/view/events/EventsCard'
import EventsHeader from '@/view/events/EventsHeader'
import { Typography } from '@material-tailwind/react'
import { Box, CircularProgress } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// const eventData = [
//     {
//       title: 'Beach Cleanup Challenge',
//       caption: 'Let’s restore the beauty of our beaches!',
//       venue: 'Labadi Beach, Accra',
//       startDate: '2025-03-02',
//       endDate: '2025-03-05',
//       startTime: '07:00 AM',
//       endTime: '03:00 PM',
//       desc: 'Join us for a community-driven beach cleanup at Labadi Beach. Let’s remove plastic waste and restore the beauty of our shores. Refreshments and cleanup gear will be provided.',
//       hashtags: ['#CleanBeaches', '#SaveOurOcean', '#BuzStopBoys'],
//       img: 'https://res.cloudinary.com/khobbylynx/image/upload/v1739193352/buzstopboys/info_graphics/GiyuDpKXEAAL1lT_fc1ls4.jpg'
//     },
//     {
//       title: 'Market Sanitation Day',
//       caption: 'A cleaner market benefits us all!',
//       venue: 'Kaneshie Market, Accra',
//       startDate: '2025-03-16',
//       endDate: '2025-03-18',
//       startTime: '08:00 AM',
//       endTime: '12:00 PM',
//       desc: 'We are heading to Kaneshie Market to clear waste, sweep, and educate traders on proper waste disposal. Come lend a hand and make a difference!',
//       hashtags: ['#CleanAccra', '#HealthyMarkets', '#BuzStopBoys'],
//       img: 'https://res.cloudinary.com/khobbylynx/image/upload/v1739193348/buzstopboys/info_graphics/GhUipfwXEAAQ8kr_wxczp2.jpg'
//     },
//     {
//       title: 'Community Waste Awareness Walk',
//       caption: 'Educating for a cleaner future!',
//       venue: 'Osu, Accra',
//       startDate: '2025-04-06',
//       endDate: '2025-04-09',
//       startTime: '09:00 AM',
//       endTime: '01:00 PM',
//       desc: 'Join our awareness walk in Osu as we educate residents on waste management and distribute bins to promote a cleaner neighborhood.',
//       hashtags: ['#KeepOsuClean', '#BuzStopBoys', '#NoLittering'],
//       img: 'https://res.cloudinary.com/khobbylynx/image/upload/v1739193353/buzstopboys/info_graphics/GiX_eOkWYAA0iec_e8dkan.jpg'
//     }
//   ];

const Events = () => {
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.events)
  const { pending, events } = store

  useEffect(() => {
    if (events.length === 0) dispatch(getEvents())
  }, [dispatch])

  if (pending) {
    return (
      <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <CircularProgress sx={{ mb: 4 }} />
        <Typography>Loading...</Typography>
      </Box>
    )
  }

  return (
    <div>
      <EventsHeader />

      <div className="bg-gray-100 p-10">
        <Typography variant="h4" className="my-3 text-gray-900 text-center uppercase">
          Upcoming Events
        </Typography>
        <div className="flex items-start justify-between w-full flex-wrap">
          {events.map((event) => {
            return <EventCard key={event.title} {...event} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Events
