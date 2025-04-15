'use client'
import { Typography, Card, CardContent, Avatar, Box, Rating } from '@mui/material'
import { useTheme } from '../theme-provider-layout'

interface FeedbackCardProps {
  name: string
  job: string
  feedback: string
  star: number
  img: string
}

export function FeedbackCard({ img, feedback, job, name, star }: FeedbackCardProps) {
  const { mode } = useTheme()

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 4,
        boxShadow: mode === 'dark' ? '0 10px 30px rgba(0,0,0,0.2)' : '0 10px 30px rgba(0,0,0,0.05)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        backgroundColor: mode === 'dark' ? 'rgba(30, 30, 30, 0.6)' : 'white',
        backdropFilter: 'blur(10px)',
        border:
          mode === 'dark'
            ? '1px solid rgba(255, 255, 255, 0.1)'
            : '1px solid rgba(255, 255, 255, 0.2)',
        '&:hover': {
          transform: 'translateY(-10px)',
          boxShadow:
            mode === 'dark' ? '0 15px 35px rgba(0,0,0,0.3)' : '0 15px 35px rgba(0,0,0,0.1)',
        },
        overflow: 'visible',
      }}
    >
      <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ position: 'relative', mb: 4, alignSelf: 'center' }}>
          <Box
            sx={{
              position: 'absolute',
              top: -50,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 80,
              height: 80,
              borderRadius: '50%',
              background:
                mode === 'dark'
                  ? 'linear-gradient(45deg, #4CAF50, #81C784)'
                  : 'linear-gradient(45deg, #4CAF50, #2E7D32)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow:
                mode === 'dark'
                  ? '0 8px 20px rgba(76, 175, 80, 0.4)'
                  : '0 8px 20px rgba(46, 125, 50, 0.3)',
              p: 0.5,
            }}
          >
            <Avatar
              src={img}
              alt={name}
              sx={{
                width: 70,
                height: 70,
                border: '3px solid white',
              }}
            />
          </Box>
        </Box>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              mb: 0.5,
            }}
          >
            {name}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              mb: 2,
            }}
          >
            {job}
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Rating
              value={star}
              readOnly
              precision={0.5}
              sx={{
                '& .MuiRating-iconFilled': {
                  color: mode === 'dark' ? '#81C784' : '#2E7D32',
                },
              }}
            />
          </Box>

          <Typography
            variant="body2"
            sx={{
              fontStyle: 'italic',
              color: 'text.secondary',
              lineHeight: 1.6,
            }}
          >
            {feedback}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default FeedbackCard
