'use client'
import { AppDispatch, RootState } from '@/store'
import { singleMessage } from '@/store/messages'
import { formatDate } from '@/utils/utils'
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconifyIcon from '@/components/icon'

const MessageDetails = () => {
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.messages)

  const { selectedMessage, pending } = store

  const { messageId } = useParams() as { messageId: string }

  useEffect(() => {
    if (selectedMessage.id !== messageId || !selectedMessage.id) {
      dispatch(singleMessage(messageId))
    }
  }, [dispatch, messageId, selectedMessage.id])

  if (pending) {
    return (
      <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <CircularProgress sx={{ mb: 4 }} />
        <Typography>Loading...</Typography>
      </Box>
    )
  }

  if (!selectedMessage || Object.keys(selectedMessage).length === 0) {
    return <div className="text-center text-red-500 mt-10">Message not found.</div>
  }

  return (
    <>
      <Head>
        <title>{selectedMessage.title} | BuzStopBoys</title>
        <meta name="description" content="volunteer donate sponsor" />
      </Head>

      <div className="max-w-4xl mx-auto p-6">
        {/* Message Interest */}
        <h1 className="text-3xl font-bold mt-6">{selectedMessage.title}</h1>

        {/* Caption */}
        <p className="text-lg italic text-gray-600 mt-2">{selectedMessage.content}</p>

        {/* Message Details */}
        <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-gray-700">{selectedMessage.content}</p>
          <p className="mt-2">
            <strong>🗓 Created At:</strong>{' '}
            {`${formatDate(selectedMessage.createdAt).date} - ${
              formatDate(selectedMessage.createdAt).time
            }`}
          </p>
          <p>
            <strong>🔄 Updated At:</strong>{' '}
            {`${formatDate(selectedMessage.updatedAt).date} - ${
              formatDate(selectedMessage.updatedAt).time
            }`}
          </p>
          <p className="mt-2">
            <strong>🚩 Source:</strong> {selectedMessage.source}
          </p>
          <p className="mt-2">
            <strong>⚜️ Status:</strong> {selectedMessage.status}
          </p>
          <p className="mt-2">
            <strong>👨🏽‍💼 Sender Status:</strong> {selectedMessage.senderStatus}
          </p>
          {selectedMessage.senderInfo && (
            <>
              <p>
                <strong>First name:</strong> {selectedMessage.senderInfo.firstname}
              </p>
              {selectedMessage.senderInfo.lastname && (
                <p>
                  <strong>Last name:</strong> {selectedMessage.senderInfo.lastname}
                </p>
              )}
              <p>
                <strong>Email:</strong> {selectedMessage.senderInfo.email}
              </p>
              <p>
                <strong>Contact:</strong> {selectedMessage.senderInfo.contact}
              </p>
            </>
          )}
        </div>

        {/* Back Button */}
        <Button
          startIcon={<IconifyIcon icon="mingcute:back-fill" />}
          onClick={() => window.history.back()}
          variant="outlined"
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-100"
        >
          Back
        </Button>
      </div>
    </>
  )
}

export default MessageDetails
