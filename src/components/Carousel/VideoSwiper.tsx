import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import { Box, Card, CardContent, Typography } from '@mui/material'

export default function VideoSwiper() {
  const videoData = [
    {
      id: 2,
      title: 'Kickstart 3-Day Clean-Up Carnival to Revive Ghana’s Biggest Interchange',
      date: '1 day ago',
      url: 'https://www.youtube.com/embed/g2dKs9wRHjo',
    },
    {
      id: 3,
      title: 'West Hills Mall-Street Revival: BuzstopBoys Clean Up for Road Safety!',
      date: 'September, 2024',
      url: 'https://www.youtube.com/embed/8kWF_obv_5E',
    },
    {
      id: 5,
      title: 'BuzstopBoys Tackle Long-Standing Drain Issue with Unwavering Dedication',
      date: '3 weeeks ago',
      url: 'https://www.youtube.com/embed/9kXphRE7LN4',
    },
    {
      id: 6,
      title:
        'BuzstopBoys and Onua FM Join Forces for a Valentine’s Day Clean-Up at Madina Zongo Junction',
      date: '5 days ago',
      url: 'https://www.youtube.com/embed/3JsCunZVOoo',
    },
    {
      id: 7,
      title: 'BuzstopBoys Boost Volunteerism with New Mini Excavator',
      date: '2 hours ago',
      url: 'https://www.youtube.com/embed/VBb2pHok_ms',
    },
    {
      id: 1,
      title: 'BuzstopBoys Expands Solar Lighting Initiative on Achimota Hospital Road',
      date: '1 month ago',
      url: 'https://www.youtube.com/embed/O6w5FzGVTO4',
    },
    {
      id: 8,
      title: 'Volunteers Restore Dome Gym Drains to Prevent Future Flooding',
      date: '1 hour ago',
      url: 'https://www.youtube.com//embed/wp9TzYu0B44',
    },
  ]

  return (
    <div className="w-full my-10 relative">
      <div className="flex flex-col items-start gap-2 p-4 mb-6">
        <Typography variant="h4" className="font-bold text-black md:text-5xl">
          BuzStopBoys Clean-Up Missions
        </Typography>

        <Typography variant="subtitle1" className="text-gray-500 md:text-lg">
          Transforming Accra, One Spot at a Time
        </Typography>
      </div>
      <Swiper
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        spaceBetween={30}
        navigation={true}
        autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        modules={[Navigation, Autoplay]}
        className="w-full h-full relative"
      >
        {videoData.map((video) => (
          <SwiperSlide key={video.id}>
            <Card className="rounded-lg overflow-hidden drop-shadow-lg">
              <iframe
                width="100%"
                height="315"
                src={video.url}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-t-lg"
              ></iframe>
              <CardContent className="p-4 bg-white dark:bg-gray-800">
                <Typography className="text-sm text-gray-500 dark:text-gray-400">
                  {video.date}
                </Typography>
                <Typography className="text-lg font-bold text-gray-900 dark:text-white mt-2">
                  {video.title}
                </Typography>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
