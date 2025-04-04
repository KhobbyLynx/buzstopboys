import { AddEventType, EditEventType, EventProps } from '@/types/events'
import axiosRequest from '@/utils/axiosRequest'
import { Toast } from '@/utils/toast'
import { BProgress } from '@bprogress/core'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// ** FETCH EVENTS
export const getEvents = createAsyncThunk(
  'events/getEvents',
  async (query: string | undefined, { rejectWithValue }) => {
    try {
      let response
      if (query) {
        response = await axiosRequest.get(`/events?${query}`)
      } else {
        response = await axiosRequest.get('/events')
      }

      const events = response.data

      return events
    } catch (error) {
      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        console.log('Error fetching events', error)
      }
      return rejectWithValue(
        error instanceof Error ? error.message : 'An error occurred fetching events'
      )
    }
  }
)

// ** ADD NEW EVENT
export const addEvent = createAsyncThunk(
  'events/addEvent',
  async (data: AddEventType, { rejectWithValue }) => {
    try {
      // Start progress bar
      BProgress.start()

      console.log('Create Event data', data)

      // Create new event
      const response = await axiosRequest.post('/events', data)
      const newEvent = response.data

      // End progress bar
      BProgress.done()
      // Success Toast
      Toast.fire({
        icon: 'success',
        title: 'Event',
        text: 'New Event created!',
      })

      return newEvent
    } catch (error) {
      // End progress bar
      BProgress.done()
      // Error
      Toast.fire({
        icon: 'error',
        title: 'Event',
        text: `${error instanceof Error ? error.message : 'Error creating Event'}`,
      })

      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        console.log('Error creating new event', error)
      }
      return rejectWithValue(
        error instanceof Error ? error.message : 'An error occurred creating new event'
      )
    }
  }
)

// ** UPDATE EVENT
export const updateEvent = createAsyncThunk(
  'events/updateEvent',
  async (
    { modifiedData, removedImage }: { modifiedData: EditEventType; removedImage: string | '' },
    { rejectWithValue }
  ) => {
    try {
      // Start progress bar
      BProgress.start()

      // Endcode url
      const urlParam = encodeURIComponent(removedImage)

      const response = await axiosRequest.put(`/events`, { modifiedData, removedImage: urlParam })
      const updatedEvent = response.data

      // End progress bar
      BProgress.done()
      // Success Toast
      Toast.fire({
        icon: 'success',
        title: 'Event',
        text: 'Event updated!',
      })

      return updatedEvent
    } catch (error) {
      // End progress bar
      BProgress.done()
      // Error Toast
      Toast.fire({
        icon: 'error',
        title: 'Event',
        text: `${error instanceof Error ? error.message : 'Error updating Event'}`,
      })

      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        console.log('Error updating event', error)
      }
      return rejectWithValue(
        error instanceof Error ? error.message : 'An error occurred updating event'
      )
    }
  }
)

// ** DELETE EVENT
export const deleteEvent = createAsyncThunk(
  'events/deleteEvent',
  async ({ id, imgUrl }: { id: string; imgUrl: string }, { rejectWithValue }) => {
    try {
      // Start progress bar
      BProgress.start()

      // Endcode url
      const urlParam = encodeURIComponent(imgUrl)

      // Delete
      await axiosRequest.delete(`/events?id=${id}&imgUrl=${urlParam}`)

      // End progress bar
      BProgress.done()
      return id
    } catch (error) {
      // End progress bar
      BProgress.done()
      // Error Toast
      Toast.fire({
        icon: 'error',
        title: 'Event',
        text: 'Error Deleting Event!',
      })
      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        console.log('Error deleting event', error)
      }
      return rejectWithValue(
        error instanceof Error ? error.message : 'An error occurred deleting event'
      )
    }
  }
)

// ** FETCH SINGLE EVENT
export const singleEvent = createAsyncThunk(
  'events/singleEvent',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosRequest.get(`/events/${id}`)
      const eventData = response.data

      return eventData
    } catch (error) {
      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        console.log('Error fetching single event', error)
      }
      return rejectWithValue(
        error instanceof Error ? error.message : 'An error occurred fetching single event'
      )
    }
  }
)

export const eventSlice = createSlice({
  name: 'events',
  initialState: {
    //  EVENTS
    events: [] as EventProps[],
    selectedEvent: {} as EventProps,

    // COUNTS
    queryCount: 0 as number, // Count a custom query
    currentPage: 0 as number,
    totalPages: 0 as number,

    // FETCH CHUNK SIZE
    totalEvents: 0 as number,
    fectCount: 0 as number, // Number of data being fetched by a request

    // LOADERS
    fetchingEvents: false,
    fetchingSingleEvent: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // **FETCH EVENTS
      .addCase(getEvents.fulfilled, (state, action) => {
        return {
          ...state,
          ...action.payload,
          fetchingEvents: false,
        }
      })
      .addCase(getEvents.pending, (state) => {
        state.fetchingEvents = true
      })
      .addCase(getEvents.rejected, (state) => {
        state.fetchingEvents = false
      })

      // ** ADD EVENT
      .addCase(addEvent.fulfilled, (state, action: { payload: EventProps }) => {
        state.events.push(action.payload)
      })

      // ** UPDATE EVENT
      .addCase(updateEvent.fulfilled, (state, action) => {
        const { id } = action.payload
        state.events = state.events.map((event) =>
          event.id === id ? { ...event, ...action.payload } : event
        )
      })

      // ** DELETE EVENT
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.filter((event) => event.id !== action.payload)
      })

      // ** FETCH SINGLE EVENT
      .addCase(singleEvent.fulfilled, (state, action) => {
        state.selectedEvent = action.payload
        state.fetchingSingleEvent = false
      })
      .addCase(singleEvent.pending, (state) => {
        state.fetchingSingleEvent = true
      })
      .addCase(singleEvent.rejected, (state) => {
        state.fetchingSingleEvent = false
      })
  },
})

export default eventSlice.reducer
