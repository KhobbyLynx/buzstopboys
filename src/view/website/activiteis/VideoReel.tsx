"use client"
import React from "react";
import { Box, Grid, useMediaQuery, useTheme, Typography } from "@mui/material";

const videoData = [
  { id: 1, title: "BuzstopBoys Expands Solar Lighting Initiative on Achimota Hospital Road", date: '1 month ago', url: "https://www.youtube.com/embed/O6w5FzGVTO4" },
  { id: 2, title: "Kickstart 3-Day Clean-Up Carnival to Revive Ghana’s Biggest Interchange", date: '1 day ago',url: "https://www.youtube.com/embed/g2dKs9wRHjo" },
  { id: 3, title: "West Hills Mall-Street Revival: BuzstopBoys Clean Up for Road Safety!", date: 'September, 2024',url: "https://www.youtube.com/embed/8kWF_obv_5E" },
];

const VideoReel: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box className="py-16">
      <Grid container direction={isSmallScreen ? "column" : "row"} spacing={2}>
        {videoData.map((video) => (
          <Grid item key={video.id} xs={12} sm={6} md={4}>
            <Box>
            <iframe
                width="100%"
                height="315"
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
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default VideoReel;