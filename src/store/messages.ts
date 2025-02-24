import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// ** Types
import axiosRequest from '@/utils/axiosRequest'
import { BProgress } from '@bprogress/core'
import { Toast } from '@/utils/toast'
import { MessagesProps, MessageStoreType } from '@/types/messages'

// ** FETCH MESSAGES
export const getMessages = createAsyncThunk(
  'messages/getMessages',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosRequest.get('/messages')
      const messages = response.data

      return messages
    } catch (error) {
      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        console.log('Error fetching messages', error)
      }
      return rejectWithValue(
        error instanceof Error ? error.message : 'An error occurred fetching messages'
      )
    }
  }
)

// ** ADD NEW MESSAGE
export const createMessage = createAsyncThunk(
  'messages/createMessage',
  async (data: MessageStoreType, { rejectWithValue }) => {
    try {
      // Start progress bar
      BProgress.start()

      // Create new message
      const response = await axiosRequest.post('/messages', data)
      const newMessage = response.data

      // End progress bar
      BProgress.done()
      // Success Toast
      Toast.fire({
        icon: 'success',
        title: 'Message',
        text: 'Message sent!',
      })

      return newMessage
    } catch (error) {
      // End progress bar
      BProgress.done()
      // Success Toast
      Toast.fire({
        icon: 'error',
        title: 'Message',
        text: `${error instanceof Error ? error.message : 'Error sending Message'}`,
      })

      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        console.log('Error creating new message', error)
      }
      return rejectWithValue(
        error instanceof Error ? error.message : 'An error occurred creating new message'
      )
    }
  }
)

// ** UPDATE MESSAGE
export const updateMessage = createAsyncThunk(
  'messages/updateMessage',
  async (data: MessageStoreType, { rejectWithValue }) => {
    try {
      // Start progress bar
      BProgress.start()

      const response = await axiosRequest.put(`/messages`, data)
      const updatedMessage = response.data

      // End progress bar
      BProgress.done()
      // Success Toast
      Toast.fire({
        icon: 'success',
        title: 'Message',
        text: 'Message edited!',
      })
      return updatedMessage
    } catch (error) {
      // End progress bar
      BProgress.done()
      // Success Toast
      Toast.fire({
        icon: 'error',
        title: 'Message',
        text: `${error instanceof Error ? error.message : 'Error editing message'}`,
      })
      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        console.log('Error updating message', error)
      }
      return rejectWithValue(
        error instanceof Error ? error.message : 'An error occurred updating message'
      )
    }
  }
)

// ** DELETE MESSAGE
export const deleteMessage = createAsyncThunk(
  'messages/deleteMessage',
  async (id: string, { rejectWithValue }) => {
    try {
      // Start progress bar
      BProgress.start()

      // Send Delete request
      await axiosRequest.delete(`/messages?id=${id}`)

      // End progress bar
      BProgress.done()
      // Success Toast
      Toast.fire({
        icon: 'success',
        title: 'Message',
        text: 'Message deleted!',
      })
      return id
    } catch (error) {
      // End progress bar
      BProgress.done()
      // Success Toast
      Toast.fire({
        icon: 'error',
        title: 'Message',
        text: `${error instanceof Error ? error.message : 'An error occurred deleting message'}`,
      })
      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        console.log('Error deleting message', error)
      }
      return rejectWithValue(
        error instanceof Error ? error.message : 'An error occurred deleting message'
      )
    }
  }
)

// ** FETCH SINGLE MESSAGE
export const singleMessage = createAsyncThunk(
  'messages/singleMessage',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosRequest.get(`/messages/${id}`)
      const messageData = response.data

      return messageData
    } catch (error) {
      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        console.log('Error fetching single message', error)
      }
      return rejectWithValue(
        error instanceof Error ? error.message : 'An error occurred fetching single message'
      )
    }
  }
)

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [] as MessagesProps[],
    selectedMessage: {} as MessagesProps,
    pending: false as boolean,
    sending: false as boolean,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ** Get Messages
      .addCase(getMessages.fulfilled, (state, action) => {
        state.messages = action.payload
        state.pending = false
      })
      .addCase(getMessages.pending, (state) => {
        state.pending = true
      })
      .addCase(getMessages.rejected, (state) => {
        state.pending = false
      })

      // ** Add Message
      .addCase(createMessage.fulfilled, (state, action: { payload: MessagesProps }) => {
        state.messages.push(action.payload)
        state.sending = false
      })
      .addCase(createMessage.pending, (state) => {
        state.sending = true
      })
      .addCase(createMessage.rejected, (state) => {
        state.sending = false
      })

      // ** Update Message
      .addCase(updateMessage.fulfilled, (state, action) => {
        const { id } = action.payload
        state.messages = state.messages.map((d) => (d.id === id ? { ...d, ...action.payload } : d))
        state.pending = false
      })

      // ** Delete Message
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.messages = state.messages.filter((d) => d.id !== action.payload)
        state.pending = false
      })

      // ** Fetch Single Message
      .addCase(singleMessage.rejected, (state) => {
        state.pending = false
      })
      .addCase(singleMessage.pending, (state) => {
        state.pending = true
      })
      .addCase(singleMessage.fulfilled, (state, action) => {
        state.selectedMessage = action.payload
        state.pending = false
      })
  },
})

export default messagesSlice.reducer
