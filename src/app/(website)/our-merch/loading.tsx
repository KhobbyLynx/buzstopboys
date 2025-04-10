'use client'

import { Box, Skeleton, Typography } from '@mui/material'

const Loading = () => {
  return (
    <Box sx={{ p: 4, pt: 10 }}>
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          BuzStopBoys Product Shop -
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          ✨ <span className="text-red-600 font-bold italic">Coming Soon</span> – Support the Cause
          with Every Purchase!
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Loading products...
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
          gap: 3,
        }}
      >
        {Array(9)
          .fill(0)
          .map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              height={256}
              sx={{
                borderRadius:
                  index % 4 === 0 ? 2 : index % 4 === 1 ? '50%' : index % 4 === 2 ? 3 : 4,
              }}
              animation="wave"
            />
          ))}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 12 }}>
        <Skeleton variant="rounded" width={120} height={40} animation="wave" />
      </Box>
    </Box>
  )
}

export default Loading
