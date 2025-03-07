'use client'

import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import { formatDate } from '@/utils/utils'
import { singleUser } from '@/store/users'
import IconifyIcon from '@/components/icon'

export default function UserPage() {
  const { patronId } = useParams() as { patronId: string }
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const store = useSelector((state: RootState) => state.users)
  const [refreshing, setRefreshing] = useState(false)

  const { selectedUser, fetchingSingleUser } = store

  useEffect(() => {
    if (selectedUser.id !== patronId || !selectedUser.id) {
      dispatch(singleUser(patronId))
    }
  }, [dispatch, patronId, selectedUser.id])

  const handleRefresh = async () => {
    setRefreshing(true)
    await dispatch(singleUser(patronId)).then(() => setRefreshing(false))
  }

  if (fetchingSingleUser && !refreshing) {
    return (
      <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <CircularProgress sx={{ mb: 4 }} />
        <Typography>Loading...</Typography>
      </Box>
    )
  }

  if (!selectedUser || Object.keys(selectedUser).length === 0) {
    return (
      <div className="text-center text-red-500 mt-10">
        User not found.{' '}
        <Button
          onClick={handleRefresh}
          color="primary"
          variant="outlined"
          startIcon={<IconifyIcon icon={refreshing ? 'tabler:loader' : 'tabler:refresh'} />}
        >
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="max-w-xl w-full shadow-xl rounded-2xl">
        <CardContent className="p-8">
          <div className="flex items-center gap-6 mb-6">
            <Avatar
              src={selectedUser.avatar || '/default-avatar.png'}
              alt={selectedUser.username}
              className="w-24 h-24"
            />
            <div>
              <Typography variant="h4" className="font-bold">
                {selectedUser.firstname || selectedUser.lastname
                  ? `${selectedUser.firstname} ${selectedUser.lastname}`
                  : selectedUser.username}
              </Typography>
              <Typography
                variant="body1"
                className={`${
                  selectedUser.onlineStatus ? 'text-green-500' : 'text-red-500'
                } font-semibold`}
              >
                {selectedUser.onlineStatus ? 'Online' : 'Offline'}
              </Typography>
            </div>
          </div>

          <Typography variant="body1" className="mb-2">
            <span className="font-semibold">Email:</span> {selectedUser.email}
          </Typography>

          {selectedUser.contact && (
            <Typography variant="body1" className="mb-2">
              <span className="font-semibold">Contact:</span> {selectedUser.contact}
            </Typography>
          )}

          {selectedUser.address && (
            <Typography variant="body1" className="mb-2">
              <span className="font-semibold">Address:</span> {selectedUser.address}
            </Typography>
          )}

          <Typography variant="body1" className="mb-2">
            <span className="font-semibold">Role:</span> {selectedUser.role}
          </Typography>

          <Typography variant="body1" className="mb-2">
            <span className="font-semibold">Verified:</span> {selectedUser.verified ? 'Yes' : 'No'}
          </Typography>
          {selectedUser.suspended !== undefined && (
            <Typography variant="body1" className="mb-2">
              <span className="font-semibold">Suspended:</span>{' '}
              {selectedUser.suspended ? 'Yes' : 'No'}
            </Typography>
          )}

          {selectedUser.lastSignInTime && (
            <Typography variant="body1" className="mb-2">
              <span className="font-semibold">Last Sign In:</span>{' '}
              {formatDate(selectedUser.lastSignInTime).date} {' - '}
              {formatDate(selectedUser.lastSignInTime).time}
            </Typography>
          )}

          {selectedUser.createdAt && (
            <Typography variant="body1" className="mb-2">
              <span className="font-semibold">Created At:</span>{' '}
              {formatDate(selectedUser.createdAt).date} {' - '}
              {formatDate(selectedUser.createdAt).time}
            </Typography>
          )}

          {selectedUser.updatedAt && (
            <Typography variant="body1">
              <span className="font-semibold">Updated At:</span>{' '}
              {formatDate(selectedUser.updatedAt).date}
              {' - '}
              {formatDate(selectedUser.updatedAt).time}
            </Typography>
          )}
        </CardContent>
        <CardActions className="w-full flex justify-center items-center">
          {/* Back Button */}
          <Button
            startIcon={<IconifyIcon icon="mingcute:back-fill" />}
            onClick={() => router.push('/admin/patrons')}
            variant="outlined"
            className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-100"
          >
            Back To Users
          </Button>
          {/* Refresh Button */}
          <Button
            onClick={handleRefresh}
            variant="outlined"
            disabled={refreshing}
            startIcon={<IconifyIcon icon={refreshing ? 'tabler:loader' : 'tabler:refresh'} />}
            className="px-2 py-1 rounded"
          >
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}
