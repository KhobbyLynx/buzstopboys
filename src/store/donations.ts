// ** Redux
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// ** Types
import { DonationCampaignProps, DonationOptionsProps, DonationOptionType, EditDonationOptionType } from "@/types/donations";

// ** Axios
import axiosRequest from "@/utils/axiosRequest";


// ** FETCH DONATION CAMPAIGN
export const getDonationsCampaigns = createAsyncThunk('donations/getDonationsCampaigns',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosRequest.get('/donate')
            const donations = response.data

            return donations
        } catch (error) {
            if(process.env.NODE_ENV === 'development'){
                console.log('Error fetching donations campaigns', error)
            }
            return rejectWithValue(error instanceof Error ? error.message : 'An error occurred fetching donations Campaigns' )
        }
})

type CampaignStatus = 'active' | 'suspended' | 'completed'

interface CampaignType {
    title: string
    desc: string
    target: number
    raised?: number
    subText?: string
    status: CampaignStatus
}

interface CampaignEditType {
    title: string
    desc: string
    target: number
    raised: number
    subText: string
    status: CampaignStatus
    img: string
}

// ** ADD NEW DONATION CAMPAIGN
export const addDonationCampaign = createAsyncThunk('donations/addDonationCampaign',
    async (data : CampaignType, { rejectWithValue }) => {
        try {
            const response = await axiosRequest.post('/donate', data)
            const newCampaign = response.data

            return newCampaign
        } catch (error) {
            if(process.env.NODE_ENV === 'development') {
                console.log('Error creating new donation campaign', error)
            }
            return rejectWithValue(error instanceof Error? error.message : 'Error creating new Donation Campaign')
        }
    }
)

// ** DELETE DONATION CAMPAIGN
export const deleteDonationCampaign = createAsyncThunk('donations/deleteDonationCampaign',
    async (id : string, { rejectWithValue }) => {
        try {
            await axiosRequest.delete(`/donate?id=${id}`)

             return id
        } catch (error) {
            if(process.env.NODE_ENV === 'development') {
                console.log('Error deleting donation campaign', error)
            }
            
            return rejectWithValue(error instanceof Error? error.message : 'Error deleting donation campaign')
        }
    }
)

// ** UPDATE DONATION CAMPAIGN
export const updateDonationCampaign = createAsyncThunk('donations/updateDonationCampaign', 
    async (data : CampaignEditType, { rejectWithValue }) => {
        console.log("Data From Edit", data)
        try {
            const response = await axiosRequest.put('/donate', data)
            const updatedDonationCampaign = response.data

            return updatedDonationCampaign
        } catch (error) {
            if(process.env.NODE_ENV === 'development') {
                console.log('Error updating donation campaign', error)
            }

            rejectWithValue(error instanceof Error ? error.message : 'Error updating donation campaign')
        }
    }
) 

// ** FETCH DONATION OPTIONS
export const getDonationOptions = createAsyncThunk('donations/getDonationOptions', 
    async(_, { rejectWithValue }) => {
        try {
            const response = await axiosRequest.get('/donation-options')
            const donationOptions = response.data

            return donationOptions
        } catch (error) {
            if(process.env.NODE_ENV === 'development') {
                console.log('Error fetching donation options', error)
            }
            return rejectWithValue(error instanceof Error ? error.message : 'Error fetching donation options')
        }
    }
)

// ** ADD NEW DONATION OPTION
export const addDonationOption = createAsyncThunk('donations/addDonationOption', 
    async (data : DonationOptionType , { rejectWithValue }) => {
        try {
            const response = await axiosRequest.post('/donation-options', data)
            const successMsg = response.data

            return successMsg
        } catch (error) {
            if(process.env.NODE_ENV === 'development') {
                console.log('Error creating new donation option', error)
            }

            return rejectWithValue(error instanceof Error ? error.message : 'Error creating new donation option')
        }
    }
)

// ** UPDATE DONTION OPTIONS
export const updateDonationOption = createAsyncThunk('donations/updateDonationOption', 
    async (data: EditDonationOptionType, { rejectWithValue }) => {
        try {
            const response = await axiosRequest.put('/donation-options', data)
            const update = response.data

            return update
        } catch (error) {
            if(process.env.NODE_ENV === 'development'){
                console.log('Error updating donation option', error)
            }

            rejectWithValue(error instanceof Error ? error.message : 'Error updating donation option')
        }
    }
)

// ** DELETE DONATION OPTION 
export const deleteDonationOption = createAsyncThunk('donations/deleteDonationOption', 
    async (id : string, { rejectWithValue }) => {
        try {
            const response = await axiosRequest.delete(`/donation-options?id=${id}`)
            const successMsg = response.data

            return successMsg
        } catch (error) {
            if(process.env.NODE_ENV === 'development') {
                console.log('Error deleting donation option', error)
            }

            return rejectWithValue(error instanceof Error ? error.message : 'Error deleting donation option')
        }
    }
)

export const donationSlice = createSlice({
    name: 'donations',
    initialState: {
        donationCampaigns: [] as DonationCampaignProps[],
        donationOptions: [] as DonationOptionsProps[]
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        // DONATION CAMPAIGNS
        .addCase(getDonationsCampaigns.fulfilled, (state, action) => {
            return {
                ...state,
                donationCampaigns: action.payload
            }
        })
        .addCase(addDonationCampaign.fulfilled, (state, action) => {
            state.donationCampaigns.push(action.payload)
        })
        .addCase(updateDonationCampaign.fulfilled, (state, action) => {
            console.log('action.payload', action.payload)
            const { id } = action.payload
            let updatedDonationCampaign : DonationCampaignProps[] = [];
            
            state.donationCampaigns.map(d => {
                if( d.id === id ) {
                    updatedDonationCampaign.push({
                        ...d,
                        ...action.payload
                    })  
                } else {
                    updatedDonationCampaign.push(d)
                }
            })
            
            return {
                ...state,
                donationCampaigns: updatedDonationCampaign
            }
        })
        .addCase(deleteDonationCampaign.fulfilled, (state, action) => {
            return {
                ...state,
                donationCampaigns: state.donationCampaigns.filter(d => d.id !== action.payload)
            }
        })

        // DONATION OPTIONS
        .addCase(getDonationOptions.fulfilled, (state, action) => {
            return {
                ...state, 
                donationOptions: action.payload
            }
        })
        .addCase(addDonationOption.fulfilled, (state, action) => {
            state.donationOptions.push(action.payload)
        })
        .addCase(updateDonationOption.fulfilled, (state, action) => {
            const { id } = action.payload
            let updatedDonationOpptions : DonationOptionsProps[] = [];
            
            state.donationOptions.map(d => {
                if( d.id === id ) {
                    updatedDonationOpptions.push({
                        ...d,
                        ...action.payload
                    })  
                } else {
                    updatedDonationOpptions.push(d)
                }
            })
            
            return {
                ...state,
                donationOptions: updatedDonationOpptions
            }
        })
        .addCase(deleteDonationOption.fulfilled, (state, action) => {
            return {
                ...state,
                donationOptions: state.donationOptions.filter(d => d.id !== action.payload)
            }
        })
    }

})

export default donationSlice.reducer
