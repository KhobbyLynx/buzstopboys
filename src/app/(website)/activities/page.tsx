import { Metadata } from 'next'
import ActivitiesCollage from '@/view/website/activiteis/ActivitiesCollage'
import EventHighlight from '@/view/website/events/EventHighlight'
import { Box } from '@mui/material'
import VideoSwiper from '@/components/carousel/VideoSwiper'

export const metadata: Metadata = {
  title: 'Activities',
  description:
    'BuzStopBoys activities are designed to make a difference in the community. We are committed to creating a positive impact in the world.',
  keywords: [
    'BuzStopBoys',
    'Buzstopboys Activiities',
    'volunteering',
    'non-governmental organization',
    'clean environment',
    'Ghana',
    'community service',
  ],
}

function Activities() {
  return (
    <>
      <Box className="px-8">
        <ActivitiesCollage />

        <VideoSwiper />
      </Box>
      <EventHighlight />
    </>
  )
}

export default Activities
