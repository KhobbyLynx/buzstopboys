'use client'

import { Box, Skeleton } from '@mui/material'
import { useTheme } from '@/components/theme-provider-layout'

interface ContentSkeletonProps {
  type?: 'activity' | 'event' | 'donation' | 'detail' | 'form'
  count?: number
}

const ContentSkeleton = ({ type = 'activity', count = 3 }: ContentSkeletonProps) => {
  const { mode } = useTheme()
  const bgColor = mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'

  const renderActivitySkeleton = () => (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <Box
            key={index}
            sx={{
              width: { xs: '100%', sm: '45%', md: '30%' },
              borderRadius: 2,
              overflow: 'hidden',
              bgcolor: bgColor,
              mb: 3,
            }}
          >
            <Skeleton variant="rectangular" height={200} animation="wave" />
            <Box sx={{ p: 2 }}>
              <Skeleton variant="text" height={32} width="80%" animation="wave" />
              <Skeleton variant="text" height={20} width="60%" animation="wave" />
              <Box sx={{ mt: 2 }}>
                <Skeleton variant="text" height={16} animation="wave" />
                <Skeleton variant="text" height={16} animation="wave" />
                <Skeleton variant="text" height={16} width="80%" animation="wave" />
              </Box>
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Skeleton variant="rounded" height={36} width="45%" animation="wave" />
                <Skeleton variant="rounded" height={36} width="45%" animation="wave" />
              </Box>
            </Box>
          </Box>
        ))}
    </Box>
  )

  const renderEventSkeleton = () => (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <Box
            key={index}
            sx={{
              width: { xs: '100%', sm: '45%', md: '30%' },
              borderRadius: 2,
              overflow: 'hidden',
              bgcolor: bgColor,
              mb: 3,
            }}
          >
            <Skeleton variant="rectangular" height={200} animation="wave" />
            <Box sx={{ p: 2 }}>
              <Skeleton variant="text" height={32} width="80%" animation="wave" />
              <Skeleton variant="text" height={20} width="60%" animation="wave" />
              <Box sx={{ mt: 2 }}>
                <Skeleton variant="text" height={16} animation="wave" />
                <Skeleton variant="text" height={16} animation="wave" />
                <Skeleton variant="text" height={16} width="80%" animation="wave" />
              </Box>
              <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Skeleton variant="rounded" height={24} width={60} animation="wave" />
                <Skeleton variant="rounded" height={24} width={80} animation="wave" />
                <Skeleton variant="rounded" height={24} width={70} animation="wave" />
              </Box>
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Skeleton variant="rounded" height={36} width="45%" animation="wave" />
                <Skeleton variant="rounded" height={36} width="45%" animation="wave" />
              </Box>
            </Box>
          </Box>
        ))}
    </Box>
  )

  const renderDonationSkeleton = () => (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <Box
            key={index}
            sx={{
              width: { xs: '100%', sm: '45%', md: '30%' },
              borderRadius: 2,
              overflow: 'hidden',
              bgcolor: bgColor,
              mb: 3,
            }}
          >
            <Skeleton variant="rectangular" height={180} animation="wave" />
            <Box sx={{ p: 2 }}>
              <Skeleton variant="text" height={32} width="80%" animation="wave" />
              <Skeleton variant="text" height={20} width="60%" animation="wave" />
              <Box sx={{ mt: 2 }}>
                <Skeleton variant="text" height={16} animation="wave" />
                <Skeleton variant="text" height={16} animation="wave" />
              </Box>
              <Box sx={{ mt: 2 }}>
                <Skeleton variant="rectangular" height={10} width="100%" animation="wave" />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Skeleton variant="text" height={16} width="30%" animation="wave" />
                  <Skeleton variant="text" height={16} width="30%" animation="wave" />
                </Box>
              </Box>
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                <Skeleton variant="rounded" height={36} width="80%" animation="wave" />
              </Box>
            </Box>
          </Box>
        ))}
    </Box>
  )

  const renderDetailSkeleton = () => (
    <Box sx={{ maxWidth: '800px', mx: 'auto', p: 3 }}>
      <Skeleton variant="text" height={48} width="80%" animation="wave" sx={{ mb: 1 }} />
      <Skeleton variant="text" height={24} width="60%" animation="wave" sx={{ mb: 3 }} />

      <Box
        sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 4 }}
      >
        <Skeleton variant="rectangular" height={250} animation="wave" />
        <Skeleton variant="rectangular" height={250} animation="wave" />
      </Box>

      <Box sx={{ mb: 4, p: 2, bgcolor: bgColor, borderRadius: 2 }}>
        <Skeleton variant="text" height={20} animation="wave" />
        <Skeleton variant="text" height={20} animation="wave" />
        <Skeleton variant="text" height={20} animation="wave" />
        <Skeleton variant="text" height={20} width="80%" animation="wave" />
      </Box>

      <Skeleton variant="text" height={32} width="40%" animation="wave" sx={{ mb: 2 }} />
      <Box
        sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 4 }}
      >
        <Skeleton variant="rectangular" height={200} animation="wave" />
        <Skeleton variant="rectangular" height={200} animation="wave" />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Skeleton variant="rounded" height={40} width={150} animation="wave" />
      </Box>
    </Box>
  )

  const renderFormSkeleton = () => (
    <Box sx={{ maxWidth: '800px', mx: 'auto', p: 3 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Skeleton variant="text" height={40} width="60%" sx={{ mx: 'auto' }} animation="wave" />
        <Skeleton variant="text" height={24} width="80%" sx={{ mx: 'auto' }} animation="wave" />
      </Box>

      <Box
        sx={{
          p: 3,
          borderRadius: 2,
          bgcolor: bgColor,
          mb: 4,
        }}
      >
        <Box
          sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 3 }}
        >
          <Skeleton variant="rectangular" height={56} animation="wave" />
          <Skeleton variant="rectangular" height={56} animation="wave" />
        </Box>

        <Box
          sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 3 }}
        >
          <Skeleton variant="rectangular" height={56} animation="wave" />
          <Skeleton variant="rectangular" height={56} animation="wave" />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Skeleton variant="text" height={24} width="40%" animation="wave" sx={{ mb: 1 }} />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Skeleton variant="circular" width={20} height={20} animation="wave" />
            <Skeleton variant="text" height={20} width={100} animation="wave" />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Skeleton variant="circular" width={20} height={20} animation="wave" />
            <Skeleton variant="text" height={20} width={80} animation="wave" />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Skeleton variant="circular" width={20} height={20} animation="wave" />
            <Skeleton variant="text" height={20} width={90} animation="wave" />
          </Box>
        </Box>

        <Skeleton variant="rectangular" height={120} animation="wave" sx={{ mb: 3 }} />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Skeleton variant="rounded" height={40} width={150} animation="wave" />
        </Box>
      </Box>
    </Box>
  )

  switch (type) {
    case 'activity':
      return renderActivitySkeleton()
    case 'event':
      return renderEventSkeleton()
    case 'donation':
      return renderDonationSkeleton()
    case 'detail':
      return renderDetailSkeleton()
    case 'form':
      return renderFormSkeleton()
    default:
      return renderActivitySkeleton()
  }
}

export default ContentSkeleton
