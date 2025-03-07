'use client'

import { AppDispatch, RootState } from '@/store'
import { getEvents } from '@/store/events'
import EventCard from '@/view/website/events/EventsCard'
import EventsHeader from '@/view/website/events/EventsHeader'
import { Typography } from '@material-tailwind/react'
import { Box, CircularProgress } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Events = () => {
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.events)
  const { fetchingEvents, events } = store

  useEffect(() => {
    if (events.length === 0) dispatch(getEvents())
  }, [dispatch, events.length])

  if (fetchingEvents) {
    return (
      <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <CircularProgress sx={{ mb: 4 }} />
        <Typography>Loading...</Typography>
      </Box>
    )
  }

  return (
    <>
      <Box className="px-8">
        <EventsHeader />
      </Box>

      <Box className="bg-gray-100 p-10">
        <Typography variant="h4" className="my-3 text-gray-900 text-center uppercase">
          Upcoming Events
        </Typography>
        <Box className="flex items-start justify-center w-full flex-wrap">
          {events.map((event) => {
            return <EventCard key={event.title} {...event} />
          })}
        </Box>
      </Box>
    </>
  )
}

export default Events
