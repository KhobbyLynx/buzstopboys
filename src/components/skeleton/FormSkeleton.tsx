'use client'

import { Box, Skeleton, Container } from '@mui/material'
import { useTheme } from '@/components/theme-provider-layout'

const FormSkeleton = () => {
  const { mode } = useTheme()

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Skeleton variant="text" height={40} width="60%" sx={{ mx: 'auto' }} />
        <Skeleton variant="text" height={24} width="80%" sx={{ mx: 'auto' }} />
      </Box>

      <Box
        sx={{
          p: 4,
          borderRadius: 2,
          bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
          mb: 4,
        }}
      >
        <Box
          sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 3 }}
        >
          <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1 }} />
          <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1 }} />
        </Box>

        <Box
          sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 3 }}
        >
          <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1 }} />
          <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1 }} />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Skeleton variant="text" height={24} width="40%" sx={{ mb: 1 }} />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Skeleton variant="circular" width={20} height={20} />
            <Skeleton variant="text" height={20} width={100} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Skeleton variant="circular" width={20} height={20} />
            <Skeleton variant="text" height={20} width={80} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Skeleton variant="circular" width={20} height={20} />
            <Skeleton variant="text" height={20} width={90} />
          </Box>
        </Box>

        <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 1, mb: 3 }} />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Skeleton variant="rounded" height={40} width={150} />
        </Box>
      </Box>
    </Container>
  )
}

export default FormSkeleton
