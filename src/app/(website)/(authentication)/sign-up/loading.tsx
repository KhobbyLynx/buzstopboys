'use client'

import { Box, Card, CardContent, Skeleton } from '@mui/material'

const Loading = () => {
  return (
    <Box
      className="content-center"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#07305a',
      }}
    >
      <Card sx={{ width: '25rem', margin: '0 auto', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
        <CardContent sx={{ padding: '40px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Skeleton variant="circular" width={90} height={90} />
          </Box>

          <Box sx={{ mb: 2, textAlign: 'center' }}>
            <Skeleton variant="text" height={32} width="80%" sx={{ mx: 'auto', mb: 1 }} />
            <Skeleton variant="text" height={20} width="60%" sx={{ mx: 'auto' }} />
          </Box>

          <Skeleton variant="rectangular" height={56} sx={{ mb: 4, borderRadius: 1 }} />
          <Skeleton variant="rectangular" height={56} sx={{ mb: 4, borderRadius: 1 }} />
          <Skeleton variant="rectangular" height={56} sx={{ mb: 2, borderRadius: 1 }} />

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Skeleton variant="circular" width={24} height={24} sx={{ mr: 2 }} />
            <Skeleton variant="text" width={200} height={24} />
          </Box>

          <Skeleton variant="rectangular" height={48} sx={{ mb: 2, borderRadius: 1 }} />

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Skeleton variant="text" width={200} height={24} />
          </Box>

          <Skeleton variant="text" width="100%" height={20} sx={{ mb: 2 }} />

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Skeleton variant="circular" width={40} height={40} />
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Loading
