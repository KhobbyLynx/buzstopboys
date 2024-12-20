"use client"
import React from "react";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";

const videoData = [
  { id: 1, title: "Solar Lighting Initiative", url: "https://www.youtube.com/embed/O6w5FzGVTO4" },
  { id: 2, title: "Video 2", url: "https://www.youtube.com/embed/5Hf8OG150_A" },
  { id: 3, title: "Video 3", url: "https://www.youtube.com/embed/g2dKs9wRHjo" },
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
              <Box mt={1}>{video.title}</Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default VideoReel;