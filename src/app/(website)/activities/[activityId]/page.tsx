'use client'
import { AppDispatch, RootState } from './src/store'
import { singleActivity } from './src/store/activities'
import { formatDate } from './src/utils/utils'
import { Box, CircularProgress, Typography } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const ActivityDetails = () => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.activities)

  const { selectedActivity, pending } = store

  const { activityId } = useParams() as { activityId: string }

  useEffect(() => {
    if (selectedActivity.id !== activityId || !selectedActivity.id) {
      dispatch(singleActivity(activityId))
    }
  }, [dispatch, activityId, selectedActivity])

  if (pending) {
    return (
      <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <CircularProgress sx={{ mb: 4 }} />
        <Typography>Loading...</Typography>
      </Box>
    )
  }

  if (!selectedActivity || Object.keys(selectedActivity).length === 0) {
    return <div className="text-center text-red-500">Activity not found.</div>
  }

  return (
    <>
      <Head>
        <title>{selectedActivity.title} | BuzStopBoys</title>
        <meta name="description" content={selectedActivity.desc} />
        <meta property="og:image" content={selectedActivity.imgs?.[0] || ''} />
      </Head>

      <div className="max-w-4xl mx-auto p-6">
        {/* Activity Title */}
        <h1 className="text-3xl font-bold mt-6">{selectedActivity.title}</h1>

        {/* Caption */}
        <p className="text-lg italic text-gray-600 mt-2">{selectedActivity.caption}</p>

        {/* Activity Images */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {selectedActivity.imgs?.map((img: string, index: number) => (
            <div key={index} className="relative w-full h-64">
              <Image
                src={img}
                alt={`Activity Image ${index + 1}`}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          ))}
        </div>

        {/* Activity Details */}
        <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-gray-700">{selectedActivity.desc}</p>
        </div>

        {/* YouTube Videos */}
        <div className="mt-6">
          <h2 className="text-xl font-bold">Related Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            {selectedActivity.videoUrls?.map((video: string, index: number) => (
              <iframe key={index} src={video} className="w-full h-64 rounded-lg" allowFullScreen />
            ))}
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => router.push('/activities')}
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Back to Activities
        </button>
      </div>
    </>
  )
}

export default ActivityDetails
