'use client';

import React, { useEffect } from 'react';
import { Box, Typography, Container, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { ActivityProps } from '@/types/activities';
import IconifyIcon from '@/components/icon';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { singleActivity } from '@/store/activities';
import { useParams } from "next/navigation";

const ActivityDetailsPage: React.FC = () => {
  const { activityId } = useParams() as { activityId: string };

  const dispatch: AppDispatch = useDispatch();
  const store = useSelector((state: RootState) => state.activities);

  useEffect(() => {
    dispatch(singleActivity(activityId));
  }, [dispatch, activityId]);

  const activityData: ActivityProps | null = store.selectedActivity;

  if (!activityData || !activityData.details || !activityData.imgs || !activityData.videoUrls) {
    return <Typography variant="h6">Activity not found. {activityId}</Typography>;
  }
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Title and Caption */}
      <Box textAlign="center" mb={4}>
        <Typography variant="h2" className="my-3 text-blue-gray" gutterBottom>
          {activityData.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {activityData.caption}
        </Typography>
      </Box>

      {/* Icon and Description */}
      <Box display="flex" flexDirection='column' alignItems="center" mb={4}>
        <IconifyIcon fontSize='2rem' icon={activityData.icon} className='text-red-400' /> 
        <Typography variant="body1">{activityData.desc}</Typography>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Details (Bullet Points) */}
      <Box mb={4}>
        <Typography variant="h5">
          Key Details
        </Typography>
        <List>
          {activityData.details.map((detail: string, index: number) => (
            <ListItem key={index}>
              <ListItemIcon>•</ListItemIcon>
              <ListItemText primary={detail} />
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Image Carousel */}
      <Box mb={4}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
          Gallery
        </Typography>
        <Swiper
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          {activityData.imgs.map((img: string, index: number) => (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  position: 'relative',
                  paddingTop: '56.25%', // 16:9 aspect ratio
                  background: `url(${img}) center center no-repeat`,
                  backgroundSize: 'cover',
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Video Section */}
      <Box mb={4}>
        <Typography variant="h5" gutterBottom>
          Videos
        </Typography>
        {activityData.videoUrls.map((videoUrl: string, index: number) => (
          <Box key={index} mb={4}>
            <iframe
              width="100%"
              height="415"
              src={videoUrl}
              title={`Video ${index + 1}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default ActivityDetailsPage;