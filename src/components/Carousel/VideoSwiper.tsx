import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/effect-coverflow";
import {
  Navigation,
  Autoplay,
} from "swiper/modules";
import { Grid, Box, Typography } from "@mui/material";

export default function VideoSwiper() {
  const videoData = [
    { id: 1, title: "BuzstopBoys Expands Solar Lighting Initiative on Achimota Hospital Road", date: "1 month ago", url: "https://www.youtube.com/embed/O6w5FzGVTO4" },
    { id: 2, title: "Kickstart 3-Day Clean-Up Carnival to Revive Ghana’s Biggest Interchange", date: "1 day ago", url: "https://www.youtube.com/embed/g2dKs9wRHjo" },
    { id: 3, title: "West Hills Mall-Street Revival: BuzstopBoys Clean Up for Road Safety!", date: "September, 2024", url: "https://www.youtube.com/embed/8kWF_obv_5E" },
    { id: 4, title: "BuzstopBoys Expands Solar Lighting Initiative on Achimota Hospital Road", date: "1 month ago", url: "https://www.youtube.com/embed/O6w5FzGVTO4" },
  ];

  return (
    <div className="w-full m-0 relative">
      <Swiper
        autoplay={{ delay: 5000, disableOnInteraction: true }}
        className="w-full h-full"
        navigation
        slidesPerView={3}
        spaceBetween={30}
        modules={[ Navigation, Autoplay]}
      >
        {videoData.map((video) => (
          <SwiperSlide key={video.id}>
            <Box>
              <iframe
                width="100%"
                height="415"
                src={video.url}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <Box className="mt-1">
                <Typography className="text-gray-500">{video.date}</Typography>
                <Typography className="text-gray-900">{video.title}</Typography>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
