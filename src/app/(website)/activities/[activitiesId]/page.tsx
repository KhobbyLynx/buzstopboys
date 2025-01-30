import { Box, Typography } from "@mui/material"
import Image from "next/image"

function ActiivityDetails() {
  const videoData = { 
    id: 1, 
    title: "BuzstopBoys Expands Solar Lighting Initiative on Achimota Hospital Road", 
    date: "1 month ago", url: "https://www.youtube.com/embed/O6w5FzGVTO4",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
  }

  return (
    <Box>
      <Box>
        <Typography variant="h2">Header of the Details Page</Typography>
        <Box>
          <Image src={"/images/avatars/avatar1.jpg"} alt="author" width={80} height={80}/>
          <Typography variant="body2">Samuel Tetteh</Typography>
          <Typography variant="body2">1 Dec, 2024</Typography>
        </Box>
        <Typography variant="h3">Sub Header</Typography>
      </Box>
      <Box>
        <Image src={"/images/banner/event.jpeg"} alt="eventImage" width={600} height={400}/>
        <Typography variant="body2">1 Dec, 2024</Typography>
      </Box>
      <Box>
        <Typography variant="h4">Sub Header</Typography>
        <Typography variant="body1">Lorem ipsum dolor sit amet, consectetur adipiscing elit</Typography>
      </Box>
      <Box>
        <iframe
          width="100%"
          height="415"
          src={videoData.url}
          title={videoData.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <Typography variant="body2">{videoData.date}</Typography>
        <Typography variant="h4">{videoData.title}</Typography>
        {videoData.desc ? <Typography variant="body1">{videoData.desc}</Typography> : ""}
      </Box>
    </Box>
  )
}

export default ActiivityDetails