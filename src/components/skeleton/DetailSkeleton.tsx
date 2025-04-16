'use client'

import { Box, Skeleton, Container } from '@mui/material'
import { useTheme } from '@/components/theme-provider-layout'

const DetailSkeleton = () => {
  const { mode } = useTheme()

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Skeleton variant="text" height={48} width="80%" sx={{ mb: 1 }} />
      <Skeleton variant="text" height={24} width="60%" sx={{ mb: 3 }} />

      <Box
        sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 4 }}
      >
        <Skeleton
          variant="rectangular"
          height={250}
          sx={{
            borderRadius: 2,
            bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
          }}
        />
        <Skeleton
          variant="rectangular"
          height={250}
          sx={{
            borderRadius: 2,
            bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
          }}
        />
      </Box>

      <Box
        sx={{
          mb: 4,
          p: 3,
          borderRadius: 2,
          bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
        }}
      >
        <Skeleton variant="text" height={20} />
        <Skeleton variant="text" height={20} />
        <Skeleton variant="text" height={20} />
        <Skeleton variant="text" height={20} width="80%" />
      </Box>

      <Skeleton variant="text" height={32} width="40%" sx={{ mb: 2 }} />
      <Box
        sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 4 }}
      >
        <Skeleton
          variant="rectangular"
          height={200}
          sx={{
            borderRadius: 2,
            bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
          }}
        />
        <Skeleton
          variant="rectangular"
          height={200}
          sx={{
            borderRadius: 2,
            bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Skeleton variant="rounded" height={40} width={150} />
      </Box>
    </Container>
  )
}

export default DetailSkeleton
