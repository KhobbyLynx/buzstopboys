// @mui material components
import { Box, Button, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Image from "next/image";

function Highlight() {
  return (
    <Box  py={{ xs: 0, sm: 12 }} px={{ xs: 2, md: 4}}>
      <Box
        component="div"
        position="relative"
        sx={{
          opacity: 1,
          background: 'linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))',
          borderRadius: '0.75rem',
          boxShadow: 'none',
        }}
      >
        <Image 
        src="/image/banner/waves-white.svg" 
        alt="pattern" 
        layout="fill"
        objectFit="cover"
        style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 1,
            opacity: 0.2,
            background: 'transparent',
            color: 'rgb(9, 20, 39)',
            boxShadow: 'none'
          }}
        />
        <Container sx={{ position: "relative", zIndex: 2, py: 12 }} className="rounded-2xl">
          <Grid container item xs={12} md={7} justifyContent="center" mx="auto" textAlign="center">
            <Typography variant="h6" color="info" mb={1}>
            Accra Community Cleanup Drive
            </Typography>
            <Typography variant="h3" color="red" className="uppercase" mb={2}>
              Upcoming Event
            </Typography>
            <Typography variant="h4" color="white" mb={1}>
            Kwame Nkrumah Circle, Accra
            <Typography variant="h6" color="white" mb={2}>
                Saturday & Sunday, 25th & 26th January, 2025
            </Typography>
            </Typography>
            <Typography variant="body1" color="white" mb={6}>
            Let’s unite to make our community cleaner and healthier! Join the Basta Boys as we tackle litter, beautify our surroundings, and inspire positive change. Whether you bring a friend, your family, or just yourself, every little effort counts. Together, we can create a cleaner and greener Accra for everyone to enjoy.
            </Typography>
            <Button
              variant="contained"
              color="info"
              size="large"
              component="a"
              sx={{ mb: 2 }}
            >
              Volunteer Now
            </Button>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default Highlight;