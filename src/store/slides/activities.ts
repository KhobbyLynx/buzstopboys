import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// ** Types
import { ActivityProps, AddActivityType, EditActivityType } from '@/types/activities'
import axiosRequest from '@/utils/axiosRequest'
import { BProgress } from '@bprogress/core'
import { Toast } from '@/utils/toast'

// ** FETCH ACTIVITIES
export const getActivities = createAsyncThunk(
  'activities/getActivities',
  async (query: string | undefined, { rejectWithValue }) => {
    try {
      let response
      if (query) {
        response = await axiosRequest.get(`/activities?${query}`)
      } else {
        response = await axiosRequest.get('/activities')
      }

      const activities = response.data

      return activities
    } catch (error) {
      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
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

      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
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
      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
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

      // Encode image URLs as a comma-separated string
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
      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
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
      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
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
    // ACTIVITIES
    activities: [] as ActivityProps[],
    selectedActivity: {} as ActivityProps,

    // COUNTS
    totalActivities: 0 as number,
    queryCount: 0 as number, // Count a custom query
    currentPage: 0 as number,
    totalPages: 0 as number,

    // FETCH CHUNK SIZE
    fectCount: 0 as number, // Number of data being fetched by a request

    // LOADERS
    fetchingActivities: false as boolean,
    fetchingSingleActivity: false as boolean,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ** Get Activities
      .addCase(getActivities.fulfilled, (state, action) => {
        return {
          ...state,
          ...action.payload,
          fetchingActivities: false,
        }
      })
      .addCase(getActivities.pending, (state) => {
        state.fetchingActivities = true
      })
      .addCase(getActivities.rejected, (state) => {
        state.fetchingActivities = false
      })

      // ** Add Activity
      .addCase(addActivity.fulfilled, (state, action: { payload: ActivityProps }) => {
        state.activities.push(action.payload)
      })

      // ** Update Activity
      .addCase(updateActivity.fulfilled, (state, action) => {
        const { id } = action.payload
        state.activities = state.activities.map((d) =>
          d.id === id ? { ...d, ...action.payload } : d
        )
      })

      // ** Delete Activity
      .addCase(deleteActivity.fulfilled, (state, action) => {
        state.activities = state.activities.filter((d) => d.id !== action.payload)
      })

      // ** Fetch Single Activity
      .addCase(singleActivity.pending, (state) => {
        state.fetchingSingleActivity = true
      })
      .addCase(singleActivity.rejected, (state) => {
        state.fetchingSingleActivity = false
      })
      .addCase(singleActivity.fulfilled, (state, action) => {
        state.selectedActivity = action.payload
        state.fetchingSingleActivity = false
      })
  },
})

export default activitiesSlice.reducer
