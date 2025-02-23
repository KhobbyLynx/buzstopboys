'use client'
import React from 'react'
import ActivitiesCollage from './src/view/activiteis/ActivitiesCollage'
import EventHighlight from './src/view/events/EventHighlight'
import { Box, CircularProgress, Typography } from '@mui/material'
import VideoSwiper from './src/components/carousel/VideoSwiper'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './src/store'
import { useEffect } from 'react'
import { getActivities } from './src/store/activities'

function Activities() {
  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.activities)

  const { pending, activities } = store

  // ** useEffect
  useEffect(() => {
    if (activities.length === 0) dispatch(getActivities())
  }, [dispatch, activities.length])

  if (pending) {
    return (
      <>
        <Box sx={{ mt: 6, mb: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <CircularProgress sx={{ mb: 4 }} />
          <Typography>Loading...</Typography>
        </Box>
        <VideoSwiper />
        <EventHighlight />
      </>
    )
  }

  return (
    <>
      <Box className="px-8">
        <ActivitiesCollage data={activities} />
      </Box>
      <VideoSwiper />
      <EventHighlight />
    </>
  )
}

export default Activities
