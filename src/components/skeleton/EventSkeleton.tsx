'use client'

import { Box, Skeleton, Container, Grid } from '@mui/material'
import { useTheme } from '@/components/theme-provider-layout'

interface EventSkeletonProps {
  count?: number
}

const EventSkeleton = ({ count = 3 }: EventSkeletonProps) => {
  const { mode } = useTheme()

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Skeleton variant="text" width={300} height={60} sx={{ mx: 'auto', mb: 2 }} />
        <Skeleton variant="text" width={500} height={24} sx={{ mx: 'auto', mb: 1 }} />
        <Skeleton variant="text" width={400} height={24} sx={{ mx: 'auto' }} />
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {Array(count)
          .fill(0)
          .map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 1, mb: 2 }} />
                <Skeleton variant="text" height={32} width="80%" sx={{ mb: 1 }} />
                <Skeleton variant="text" height={20} width="60%" sx={{ mb: 2 }} />

                <Box sx={{ mb: 2 }}>
                  <Skeleton variant="text" height={16} />
                  <Skeleton variant="text" height={16} />
                  <Skeleton variant="text" height={16} width="90%" />
                </Box>

                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                  <Skeleton variant="rounded" height={24} width={60} />
                  <Skeleton variant="rounded" height={24} width={80} />
                  <Skeleton variant="rounded" height={24} width={70} />
                </Box>

                <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between' }}>
                  <Skeleton variant="rounded" height={36} width="45%" />
                  <Skeleton variant="rounded" height={36} width="45%" />
                </Box>
              </Box>
            </Grid>
          ))}
      </Grid>
    </Container>
  )
}

export default EventSkeleton
