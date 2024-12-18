"use client";

import Image from "next/image";
import { Button, Card, CardContent, Typography, Box } from "@mui/material";
import Grid from '@mui/material/Grid2';

function PageHero() {
  return (
    <Box className="!flex h-[76vh] w-full items-center justify-between mb-20 mt-10">
      <Image
        width={1200}
        height={1200}
        src="/image/banner/cover5.jpg"
        alt="bg-img"
        className="absolute inset-0 ml-auto w-[920px] h-[780px] rounded-bl-[100px] object-cover object-center"
      />
      <Box className="container mx-auto mt-10">
        <Grid container spacing={2} className="text-center lg:text-left">
          <Grid size={{ xs: 12, xl: 7 }}>
            <Card className="rounded-xl border border-white bg-white/90 py-10 p-8 shadow-lg shadow-black/10 backdrop-blur-sm backdrop-saturate-200">
              <CardContent>
                <Typography variant="h1" color="text.primary" className="lg:text-5xl !leading-snug text-3xl lg:max-w-3xl">
                  Be Part of the Change
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" className="mb-10 mt-6">
                  Together, we can make a difference. Whether you volunteer your time, donate resources, or simply spread the word, your contribution matters. Let’s build a cleaner, healthier Ghana for generations to come.
                </Typography>
                <Box className="mb-8 flex justify-center gap-4 lg:justify-start">
                  <Button variant="outlined" color="primary">Join Our Journey</Button>
                  <Button variant="contained" color="secondary">
                    <i className="fas fa-heart" /> Donate
                  </Button>
                </Box>
                <Grid container spacing={2} justifyContent="center" className="lg:justify-start">
                  <Grid>
                    <Image
                      width={128}
                      height={128}
                      className="opacity-60"
                      src="/image/partners/lynx.svg"
                      alt="lynx"
                    />
                  </Grid>
                  <Grid>
                    <Image
                      width={128}
                      height={128}
                      className="opacity-60"
                      src="/image/partners/cirad.svg"
                      alt="cirad"
                    />
                  </Grid>
                  <Grid>
                    <Image
                      width={128}
                      height={128}
                      className="opacity-60"
                      src="/image/partners/ecoplanet.svg"
                      alt="ecoplanet"
                    />
                  </Grid>
                  <Grid>
                    <Image
                      width={128}
                      height={128}
                      className="opacity-60"
                      src="/image/partners/bioversity.svg"
                      alt="bioversity"
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default PageHero;
