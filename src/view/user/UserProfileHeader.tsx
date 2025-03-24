'use client'

import React, { useEffect, useState, memo } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { formatDate } from '@/utils/utils'

// MUI Components
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// Icon Imports
import { Icon } from '@iconify/react'

const ProfilePicture = styled('img')(({ theme }) => ({
  width: 108,
  height: 108,
  borderRadius: theme.shape.borderRadius,
  border: `4px solid ${theme.palette.common.white}`,
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4),
  },
}))

const UserProfileHeader = () => {
  // State to hold user data
  const [userData, setUserData] = useState<any>(null)

  // Get user data from Redux
  const data = useSelector((state: RootState) => state.auth.data)

  useEffect(() => {
    if (data) setUserData(data)
  }, [data])

  if (!userData) return null

  const roleIcon = userData.role === 'admin' ? 'ri:admin-line' : 'eos-icons:role-binding'
  const coverImg =
    'https://res.cloudinary.com/khobbylynx/image/upload/v1739192381/buzstopboys/cover/event_pw8chc.jpg'

  return (
    <Card>
      <CardMedia
        component="img"
        alt="profile-header"
        image={coverImg}
        sx={{ height: { xs: 150, md: 250 } }}
      />
      <CardContent
        sx={{
          pt: 0,
          mt: -8,
          display: 'flex',
          alignItems: 'flex-end',
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          justifyContent: { xs: 'center', md: 'flex-start' },
        }}
      >
        <ProfilePicture src={userData.avatar} alt="profile-picture" />
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            ml: { xs: 0, md: 6 },
            alignItems: 'flex-end',
            flexWrap: ['wrap', 'nowrap'],
            justifyContent: ['center', 'space-between'],
          }}
        >
          <Box
            sx={{
              mb: [6, 0],
              display: 'flex',
              flexDirection: 'column',
              alignItems: ['center', 'flex-start'],
            }}
          >
            <Typography variant="h5" className="text-gray-900 md:text-gray-300" sx={{ mb: 2.5 }}>
              {userData.fullname || userData.username}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: ['center', 'flex-start'],
              }}
            >
              <Box
                sx={{
                  mr: 4,
                  display: 'flex',
                  alignItems: 'center',
                  '& svg': { mr: 1.5, color: 'text.secondary' },
                }}
              >
                <Icon fontSize="1.25rem" icon={roleIcon} />
                <Typography sx={{ color: 'text.secondary' }}>{userData.role}</Typography>
              </Box>
              <Box
                sx={{
                  mr: 4,
                  display: 'flex',
                  alignItems: 'center',
                  '& svg': { mr: 1.5, color: 'text.secondary' },
                }}
              >
                <Icon fontSize="1.25rem" icon="tabler:map-pin" />
                <Typography sx={{ color: 'text.secondary' }}>
                  {userData.address || 'N/A'}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  '& svg': { mr: 1.5, color: 'text.secondary' },
                }}
              >
                <Icon fontSize="1.25rem" icon="tabler:calendar" />
                <Typography sx={{ color: 'text.secondary' }}>
                  Joined{' '}
                  {userData?.timestamps?.createdAt
                    ? formatDate(userData.timestamps.createdAt).dateString
                    : 'N/A'}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Button variant="contained" sx={{ '& svg': { mr: 2 } }}>
            <Icon icon="tabler:check" fontSize="1.125rem" />
            {userData.onlineStatus ? 'Online' : 'Offline'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default memo(UserProfileHeader)
