// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import { Navigation, Pagination } from 'swiper/modules';
// import { Grid, Box, Typography } from '@mui/material'

// export default function VideoSwiper() {
//   const slides = [
//     { id: 1, image: '/images/banner/cover2.svg', title: 'Slide 1' },
//     { id: 2, image: '/images/banner/cover3.svg', title: 'Slide 2' },
//     { id: 3, image: '/images/banner/cover4.svg', title: 'Slide 3' },
//   ];

//   const videoData = [
//     { id: 1, title: "BuzstopBoys Expands Solar Lighting Initiative on Achimota Hospital Road", date: '1 month ago', url: "https://www.youtube.com/embed/O6w5FzGVTO4" },
//     { id: 2, title: "Kickstart 3-Day Clean-Up Carnival to Revive Ghana’s Biggest Interchange", date: '1 day ago',url: "https://www.youtube.com/embed/g2dKs9wRHjo" },
//     { id: 3, title: "West Hills Mall-Street Revival: BuzstopBoys Clean Up for Road Safety!", date: 'September, 2024',url: "https://www.youtube.com/embed/8kWF_obv_5E" },
//     { id: 4, title: "BuzstopBoys Expands Solar Lighting Initiative on Achimota Hospital Road", date: '1 month ago', url: "https://www.youtube.com/embed/O6w5FzGVTO4" },
//     { id: 5, title: "Kickstart 3-Day Clean-Up Carnival to Revive Ghana’s Biggest Interchange", date: '1 day ago',url: "https://www.youtube.com/embed/g2dKs9wRHjo" },
//     { id: 6, title: "West Hills Mall-Street Revival: BuzstopBoys Clean Up for Road Safety!", date: 'September, 2024',url: "https://www.youtube.com/embed/8kWF_obv_5E" },
//     { id: 7, title: "BuzstopBoys Expands Solar Lighting Initiative on Achimota Hospital Road", date: '1 month ago', url: "https://www.youtube.com/embed/O6w5FzGVTO4" },
//     { id: 8, title: "Kickstart 3-Day Clean-Up Carnival to Revive Ghana’s Biggest Interchange", date: '1 day ago',url: "https://www.youtube.com/embed/g2dKs9wRHjo" },
//     { id: 9, title: "West Hills Mall-Street Revival: BuzstopBoys Clean Up for Road Safety!", date: 'September, 2024',url: "https://www.youtube.com/embed/8kWF_obv_5E" },
//   ];

//   return (
//     <div className="w-full">
//       <Swiper
//         modules={[Navigation, Pagination]}
//         navigation
//         pagination={{ clickable: true }}
//         spaceBetween={30}
//         slidesPerView={1}
//         className="w-full h-full"
//       >
//         {/* {slides.map((slide) => (
//           <SwiperSlide key={slide.id}>
//             <div
//               className="w-full h-60 bg-cover bg-center"
//               style={{ backgroundImage: `url(${slide.image})` }}
//             >
//               <div className="w-full h-full flex items-center justify-center bg-black bg-opacity-40 text-white">
//                 <h2 className="text-2xl font-bold">{slide.title}</h2>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))} */}
//         {videoData.map((video) => (
//           <SwiperSlide tem key={video.id} xs={12} sm={6} md={4}>
//             <Box>
//             <iframe
//                 width="100%"
//                 height="315"
//                 src={video.url}
//                 title={video.title}
//                 frameBorder="0"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//               ></iframe>
//               <Box className="mt-1">
//                 <Typography className="text-gray-500">{video.date}</Typography>
//                 <Typography className="text-gray-900">{video.title}</Typography>
//               </Box>
//             </Box>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// }
