import { storage } from "@/configs/firebase";
import { AddEventType, EditEventType, EventProps } from "@/types/events";
import axiosRequest from "@/utils/axiosRequest";
import { generateRandomId } from "@/utils/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// ** FETCH EVENTS
export const getEvents = createAsyncThunk('events/getEvents', 
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosRequest.get('/events')
            const events = response.data

            return events
        } catch (error) {
            if(process.env.NODE_ENV === 'development'){
                console.log('Error fetching events', error)
            }
            return rejectWithValue(error instanceof Error ? error.message : 'An error occurred fetching events')
        }
})

// ** ADD NEW EVENT
export const addEvent = createAsyncThunk('events/addEvent', 
    async (data: AddEventType, { rejectWithValue }) => {
        const { img } = data
        try {
            const uploadResponse = await axiosRequest.post('/upload', { img })
            const imgUrl = uploadResponse.data.url

            const eventData = {
                ...data,
                img: imgUrl
            }

            const response = await axiosRequest.post('/events', eventData)
            const newEvent = response.data

            return newEvent
        } catch (error) {
            if(process.env.NODE_ENV === 'development'){
                console.log('Error creating new event', error)
            }
            return rejectWithValue(error instanceof Error ? error.message : 'An error occurred creating new event')
        }
})

// ** UPDATE EVENT
export const updateEvent = createAsyncThunk('events/updateEvent',
    async (data: EditEventType, { rejectWithValue }) => {
        try {
            const response = await axiosRequest.put(`/events`, data)
            const updatedEvent = response.data

            return updatedEvent
        } catch (error) {
            if(process.env.NODE_ENV === 'development'){
                console.log('Error updating event', error)
            }
            return rejectWithValue(error instanceof Error ? error.message : 'An error occurred updating event')
        }
})

// ** DELETE EVENT
export const deleteEvent = createAsyncThunk('events/deleteEvent',
    async ({id, imgUrl} : {id: string, imgUrl: string}, { rejectWithValue }) => {
        try {
            await axiosRequest.delete(`/upload?id=${imgUrl}`)
            await axiosRequest.delete(`/events?id=${id}`)
            return id
        } catch (error) {
            if(process.env.NODE_ENV === 'development'){
                console.log('Error deleting event', error)
            }
            return rejectWithValue(error instanceof Error ? error.message : 'An error occurred deleting event')
        }
})

// ** FETCH SINGLE EVENT 
export const singleEvent = createAsyncThunk('events/singleEvent', 
    async (id: string, {rejectWithValue}) => {
        try {
            const response = await axiosRequest.get(`/events/${id}`)
            const eventData = response.data

            return eventData
        } catch (error) {
            if(process.env.NODE_ENV === 'development'){
                console.log('Error fetching single event', error)
            }
            return rejectWithValue(error instanceof Error ? error.message : 'An error occurred fetching single event')
        }
    }
)



export const eventSlice = createSlice({
    name: 'events',
    initialState: {
        events: [] as EventProps[],
        selectedEvent: {} as EventProps
    },
    reducers: {
       
    },
    extraReducers: (builder) => {
        builder
        .addCase(getEvents.fulfilled, (state, action) => {
            state.events = action.payload
        })
        .addCase(addEvent.fulfilled, (state, action: { payload: EventProps}) => {
            state.events.push(action.payload)
        })
        .addCase(updateEvent.fulfilled, (state, action) => {
            const { id } = action.payload;
            state.events = state.events.map(event => 
                event.id === id ? { ...event, ...action.payload } : event
            );
        })
        .addCase(deleteEvent.fulfilled, (state, action) => {
            state.events = state.events.filter(event => event.id !== action.payload)
        })
        .addCase(singleEvent.fulfilled, (state, action) => {
            state.selectedEvent = action.payload
        })
    }
})

export default eventSlice.reducer
