import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// ** Types
import { ActivityProps, AddActivityType, EditActivityType } from "@/types/activities";
import axiosRequest from "@/utils/axiosRequest";

// ** FETCH ACTIVITIES
export const getActivities = createAsyncThunk('activities/getActivities', 
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosRequest.get('/activities')
            const activities = response.data

            return activities
        } catch (error) {
            if(process.env.NODE_ENV === 'development'){
                console.log('Error fetching activities', error)
            }
            return rejectWithValue(error instanceof Error ? error.message : 'An error occurred fetching activities')
        }
})

// ** ADD NEW ACTIVITY
export const addActivity = createAsyncThunk('activities/addActivity', 
    async (data: AddActivityType, { rejectWithValue }) => {
        try {
            const response = await axiosRequest.post('/activities', data)
            const newActivity = response.data

            return newActivity
        } catch (error) {
            if(process.env.NODE_ENV === 'development'){
                console.log('Error creating new activity', error)
            }
            return rejectWithValue(error instanceof Error ? error.message : 'An error occurred creating new activity')
        }
})  


// ** UPDATE ACTIVITY 
export const updateActivity = createAsyncThunk('activities/updateActivity',
    async (data: EditActivityType, { rejectWithValue }) => {
        try {
            const response = await axiosRequest.put(`/activities`, data)
            const updatedActivity = response.data

            return updatedActivity
        } catch (error) {
            if(process.env.NODE_ENV === 'development'){
                console.log('Error updating activity', error)
            }
            return rejectWithValue(error instanceof Error ? error.message : 'An error occurred updating activity')
        }
})

// ** DELETE ACTIVITY
export const deleteActivity = createAsyncThunk('activities/deleteActivity',
    async (id: string, { rejectWithValue }) => {
        try {
            await axiosRequest.delete(`/activities?id=${id}`)
            return id
        } catch (error) {
            if(process.env.NODE_ENV === 'development'){
                console.log('Error deleting activity', error)
            }
            return rejectWithValue(error instanceof Error ? error.message : 'An error occurred deleting activity')
        }
})

// ** FETCH SINGLE ACTIVITY 
export const selectedActivity = createAsyncThunk('activities/selectedActivity', 
    async (id: string, {rejectWithValue}) => {
        try {
            const response = await axiosRequest.get(`/activities/${id}`)
            const activityData = response.data

            return activityData
        } catch (error) {
            if(process.env.NODE_ENV === 'development'){
                console.log('Error fetching single activity', error)
            }
            return rejectWithValue(error instanceof Error ? error.message : 'An error occurred fetching single activity')
        }
    }
)


export const activitiesSlice = createSlice({
    name: "activities",
    initialState: {
        activities: [] as ActivityProps[],
        selectedActivity: {} as ActivityProps
    },
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
        .addCase(getActivities.fulfilled, (state, action) => {
            state.activities = action.payload
        })
        .addCase(addActivity.fulfilled, (state, action: { payload: ActivityProps }) => {
            state.activities.push(action.payload)
        })
        .addCase(updateActivity.fulfilled, (state, action) => {
            const { id } = action.payload
            state.activities = state.activities.map(d => 
                d.id === id ? { ...d, ...action.payload } : d
            )
        })
        .addCase(deleteActivity.fulfilled, (state, action) => {
            state.activities = state.activities.filter(d => d.id !== action.payload)
        })
        .addCase(selectedActivity.fulfilled, (state, action) => {
            state.selectedActivity = action.payload
        })
    }
})

export default activitiesSlice.reducer
