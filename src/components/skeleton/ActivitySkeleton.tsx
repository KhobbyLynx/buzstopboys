'use client'

import { Box, Skeleton, Container, Grid } from '@mui/material'
import { useTheme } from '@/components/theme-provider-layout'

interface ActivitySkeletonProps {
  count?: number
}

const ActivitySkeleton = ({ count = 4 }: ActivitySkeletonProps) => {
  const { mode } = useTheme()

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Skeleton variant="text" width={300} height={60} sx={{ mx: 'auto', mb: 2 }} />
        <Skeleton variant="text" width={500} height={24} sx={{ mx: 'auto', mb: 1 }} />
        <Skeleton variant="text" width={400} height={24} sx={{ mx: 'auto' }} />
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Skeleton
            variant="rectangular"
            height={300}
            sx={{
              borderRadius: 2,
              bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
            }}
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            {Array(count)
              .fill(0)
              .map((_, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                      height: '100%',
                    }}
                  >
                    <Skeleton variant="rectangular" height={140} sx={{ borderRadius: 1, mb: 2 }} />
                    <Skeleton variant="text" height={28} width="80%" sx={{ mb: 1 }} />
                    <Skeleton variant="text" height={20} width="60%" sx={{ mb: 2 }} />
                    <Skeleton variant="text" height={16} />
                    <Skeleton variant="text" height={16} width="90%" />
                  </Box>
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ActivitySkeleton
