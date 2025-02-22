import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// ** Types
import { ActivityProps, AddActivityType, EditActivityType } from '@/types/activities'
import axiosRequest from '@/utils/axiosRequest'
import { BProgress } from '@bprogress/core'
import { Toast } from '@/utils/toast'

// ** FETCH ACTIVITIES
export const getActivities = createAsyncThunk(
  'activities/getActivities',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosRequest.get('/activities')
      const activities = response.data

      return activities
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.log('Error fetching activities', error)
      }
      return rejectWithValue(
        error instanceof Error ? error.message : 'An error occurred fetching activities'
      )
    }
  }
)

// ** ADD NEW ACTIVITY
export const addActivity = createAsyncThunk(
  'activities/addActivity',
  async (data: AddActivityType, { rejectWithValue }) => {
    try {
      // Start progress bar
      BProgress.start()

      // Create new activity
      const response = await axiosRequest.post('/activities', data)
      const newActivity = response.data

      // End progress bar
      BProgress.done()
      // Success Toast
      Toast.fire({
        icon: 'success',
        title: 'Activity',
        text: 'New Activity created!',
      })

      return newActivity
    } catch (error) {
      // End progress bar
      BProgress.done()
      // Success Toast
      Toast.fire({
        icon: 'error',
        title: 'Activity',
        text: `${error instanceof Error ? error.message : 'Error creating Activity'}`,
      })

      if (process.env.NODE_ENV === 'development') {
        console.log('Error creating new activity', error)
      }
      return rejectWithValue(
        error instanceof Error ? error.message : 'An error occurred creating new activity'
      )
    }
  }
)

// ** UPDATE ACTIVITY
export const updateActivity = createAsyncThunk(
  'activities/updateActivity',
  async (
    { modifiedData, removedImages }: { modifiedData: EditActivityType; removedImages: string[] },
    { rejectWithValue }
  ) => {
    try {
      // Start progress bar
      BProgress.start()

      const response = await axiosRequest.put(`/activities`, { modifiedData, removedImages })
      const updatedActivity = response.data

      // End progress bar
      BProgress.done()
      // Success Toast
      Toast.fire({
        icon: 'success',
        title: 'Activity',
        text: 'Activity updated!',
      })
      return updatedActivity
    } catch (error) {
      // End progress bar
      BProgress.done()
      // Success Toast
      Toast.fire({
        icon: 'error',
        title: 'Activity',
        text: `${error instanceof Error ? error.message : 'Error updating activity'}`,
      })
      if (process.env.NODE_ENV === 'development') {
        console.log('Error updating activity', error)
      }
      return rejectWithValue(
        error instanceof Error ? error.message : 'An error occurred updating activity'
      )
    }
  }
)

// ** DELETE ACTIVITY
export const deleteActivity = createAsyncThunk(
  'activities/deleteActivity',
  async ({ id, imgUrls }: { id: string; imgUrls: string[] }, { rejectWithValue }) => {
    try {
      // Start progress bar
      BProgress.start()

      // Encode the image URLs as a comma-separated string
      const urlsParam = encodeURIComponent(imgUrls.join(','))

      // Send Delete request
      await axiosRequest.delete(`/activities?id=${id}&imgUrls=${urlsParam}`)

      // End progress bar
      BProgress.done()
      // Success Toast
      Toast.fire({
        icon: 'success',
        title: 'Activity',
        text: 'Activity deleted!',
      })
      return id
    } catch (error) {
      // End progress bar
      BProgress.done()
      // Success Toast
      Toast.fire({
        icon: 'error',
        title: 'Activity',
        text: `${error instanceof Error ? error.message : 'An error occurred deleting activity'}`,
      })
      if (process.env.NODE_ENV === 'development') {
        console.log('Error deleting activity', error)
      }
      return rejectWithValue(
        error instanceof Error ? error.message : 'An error occurred deleting activity'
      )
    }
  }
)

// ** FETCH SINGLE ACTIVITY
export const singleActivity = createAsyncThunk(
  'activities/singleActivity',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosRequest.get(`/activities/${id}`)
      const activityData = response.data

      return activityData
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.log('Error fetching single activity', error)
      }
      return rejectWithValue(
        error instanceof Error ? error.message : 'An error occurred fetching single activity'
      )
    }
  }
)

export const activitiesSlice = createSlice({
  name: 'activities',
  initialState: {
    activities: [] as ActivityProps[],
    selectedActivity: {} as ActivityProps,
    pending: false as boolean,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ** Get Activities
      .addCase(getActivities.fulfilled, (state, action) => {
        state.activities = action.payload
        state.pending = false
      })
      .addCase(getActivities.pending, (state) => {
        state.pending = true
      })

      // ** Add Activity
      .addCase(addActivity.fulfilled, (state, action: { payload: ActivityProps }) => {
        state.activities.push(action.payload)
        state.pending = false
      })

      // ** Update Activity
      .addCase(updateActivity.fulfilled, (state, action) => {
        const { id } = action.payload
        state.activities = state.activities.map((d) =>
          d.id === id ? { ...d, ...action.payload } : d
        )
        state.pending = false
      })

      // ** Delete Activity
      .addCase(deleteActivity.fulfilled, (state, action) => {
        state.activities = state.activities.filter((d) => d.id !== action.payload)
        state.pending = false
      })

      // ** Fetch Single Activity
      .addCase(singleActivity.pending, (state) => {
        state.pending = true
      })
      .addCase(singleActivity.fulfilled, (state, action) => {
        state.selectedActivity = action.payload
        state.pending = false
      })
  },
})

export default activitiesSlice.reducer
