import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/effect-coverflow";
import {
  Navigation,
  Pagination,
  Mousewheel,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import { Grid, Box, Typography } from "@mui/material";

export default function VideoSwiper() {
  const videoData = [
    { id: 1, title: "BuzstopBoys Expands Solar Lighting Initiative on Achimota Hospital Road", date: "1 month ago", url: "https://www.youtube.com/embed/O6w5FzGVTO4" },
    { id: 2, title: "Kickstart 3-Day Clean-Up Carnival to Revive Ghana’s Biggest Interchange", date: "1 day ago", url: "https://www.youtube.com/embed/g2dKs9wRHjo" },
    { id: 3, title: "West Hills Mall-Street Revival: BuzstopBoys Clean Up for Road Safety!", date: "September, 2024", url: "https://www.youtube.com/embed/8kWF_obv_5E" },
    { id: 4, title: "BuzstopBoys Expands Solar Lighting Initiative on Achimota Hospital Road", date: "1 month ago", url: "https://www.youtube.com/embed/O6w5FzGVTO4" },
    { id: 5, title: "Kickstart 3-Day Clean-Up Carnival to Revive Ghana’s Biggest Interchange", date: "1 day ago", url: "https://www.youtube.com/embed/g2dKs9wRHjo" },
    { id: 6, title: "West Hills Mall-Street Revival: BuzstopBoys Clean Up for Road Safety!", date: "September, 2024", url: "https://www.youtube.com/embed/8kWF_obv_5E" },
    { id: 7, title: "BuzstopBoys Expands Solar Lighting Initiative on Achimota Hospital Road", date: "1 month ago", url: "https://www.youtube.com/embed/O6w5FzGVTO4" },
    { id: 8, title: "Kickstart 3-Day Clean-Up Carnival to Revive Ghana’s Biggest Interchange", date: "1 day ago", url: "https://www.youtube.com/embed/g2dKs9wRHjo" },
    { id: 9, title: "West Hills Mall-Street Revival: BuzstopBoys Clean Up for Road Safety!", date: "September, 2024", url: "https://www.youtube.com/embed/8kWF_obv_5E" },
  ];

  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Mousewheel, EffectCoverflow]}
        navigation
        effect={"coverflow"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        spaceBetween={30}
        slidesPerView={2}
        centeredSlides={true}
        mousewheel
        // autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="w-full h-full"
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
