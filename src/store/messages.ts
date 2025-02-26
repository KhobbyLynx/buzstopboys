import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// ** Types
import axiosRequest from '@/utils/axiosRequest'
import { BProgress } from '@bprogress/core'
import { Toast } from '@/utils/toast'
import {
  AdminSubmitMessageType,
  MessagesProps,
  MessageStoreType,
  PatchMessageType,
} from '@/types/messages'

// ** FETCH MESSAGES
export const getMessages = createAsyncThunk(
  'messages/getMessages',
  async (query: string | undefined, { rejectWithValue }) => {
    try {
      let response
      if (query) {
        response = await axiosRequest.get(`/messages?${query}`)
      } else {
        response = await axiosRequest.get('/messages')
      }

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

// ** SEND MESSAGE
export const sendMessage = createAsyncThunk(
  'messages/sendMessage',
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
  async (data: AdminSubmitMessageType, { rejectWithValue }) => {
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

// ** PATCH MESSAGE
export const patchMessage = createAsyncThunk(
  'messages/patchMessage',
  async (data: PatchMessageType, { rejectWithValue }) => {
    try {
      const response = await axiosRequest.patch(`/messages`, data)
      const patchedMessage = response.data

      return patchedMessage
    } catch (error) {
      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        console.log('Error patching message', error)
      }
      return rejectWithValue(
        error instanceof Error ? error.message : 'An error occurred patching message'
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

// ** FETCH COUNTS
export const fetchMessagesCounts = createAsyncThunk(
  'messages/fetchMessagesCounts',
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await axiosRequest.get(`/messages/count?${query}`)
      const responseData = response.data

      return responseData
    } catch (error) {
      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        console.log('Error fetching messages counts', error)
      }
      return rejectWithValue(
        error instanceof Error ? error.message : 'An error occurred fetching messages counts'
      )
    }
  }
)

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    // MESSAGES
    messages: [] as MessagesProps[],
    selectedMessage: {} as MessagesProps,

    // COUNT
    totalMessages: 0 as number,
    totalUnreadMessagesByAdmin: 0 as number,
    totalUnreadMessagesByPatron: 0 as number,
    totalAdminMessagesUndelivered: 0 as number,
    totalAdminMessagesUnread: 0 as number,
    totalMessagesFromUnregisteredUsers: 0 as number,
    totalMessagesFromContactForm: 0 as number,
    queryCount: 0 as number, // Count a custom query
    currentPage: 0 as number,
    totalPages: 0 as number,

    // FETCH CHUNK SIZE
    fectCount: 0 as number, // Number of data being fetched by a request

    // LOADERS
    pending: false as boolean,
    sending: false as boolean,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ** Get Messages
      .addCase(getMessages.fulfilled, (state, action) => {
        return {
          ...state,
          ...action.payload,
          pending: false,
        }
      })
      .addCase(getMessages.pending, (state) => {
        state.pending = true
      })
      .addCase(getMessages.rejected, (state) => {
        state.pending = false
      })

      // ** Send Message
      .addCase(sendMessage.fulfilled, (state, action: { payload: MessagesProps }) => {
        state.messages.push(action.payload)
        state.sending = false
      })
      .addCase(sendMessage.pending, (state) => {
        state.sending = true
      })
      .addCase(sendMessage.rejected, (state) => {
        state.sending = false
      })

      // ** Update Message
      .addCase(updateMessage.fulfilled, (state, action) => {
        const { id } = action.payload
        state.messages = state.messages.map((d) => (d.id === id ? { ...d, ...action.payload } : d))
      })

      // ** Patch Message
      .addCase(patchMessage.fulfilled, (state, action) => {
        const { id } = action.payload
        state.messages = state.messages.map((d) => (d.id === id ? { ...d, ...action.payload } : d))
        state.pending = false
      })

      // ** Delete Message
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.messages = state.messages.filter((d) => d.id !== action.payload)
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

      // ** FETCH COUNTS
      .addCase(fetchMessagesCounts.fulfilled, (state, action) => {
        const { query } = action.payload

        // If its a custom count
        if (query) {
          state.queryCount = action.payload.queryCount
        } else {
          return {
            ...state,
            ...action.payload.count, // spread all the count
          }
        }
      })
  },
})

export default messagesSlice.reducer
