'use client'
import React from 'react'
import ActivitiesCollage from '@/view/website/activiteis/ActivitiesCollage'
import EventHighlight from '@/view/website/events/EventHighlight'
import { Box, CircularProgress, Typography } from '@mui/material'
import VideoSwiper from '@/components/carousel/VideoSwiper'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import { useEffect } from 'react'
import { getActivities } from '@/store/activities'

function Activities() {
  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.activities)

  const { fetchingActivities, activities } = store

  // ** useEffect
  useEffect(() => {
    if (activities.length === 0) dispatch(getActivities())
  }, [dispatch, activities.length])

  //   if (fetchingActivities) {
  //     return (
  //       <>
  //         <Box sx={{ mt: 6, mb: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
  //           <CircularProgress sx={{ mb: 4 }} />
  //           <Typography>Loading...</Typography>
  //         </Box>
  //         <VideoSwiper />
  //         <EventHighlight />
  //       </>
  //     )
  //   }

  return (
    <>
      <Box className="px-8">
        {!fetchingActivities ? (
          <ActivitiesCollage data={activities} />
        ) : (
          <Box
            sx={{ mt: 6, mb: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}
          >
            <CircularProgress sx={{ mb: 4 }} />
            <Typography>Loading...</Typography>
          </Box>
        )}
        <VideoSwiper />
      </Box>
      <EventHighlight />
    </>
  )
}

export default Activities
