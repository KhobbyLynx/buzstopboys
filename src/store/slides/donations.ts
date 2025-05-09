// ** Redux
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// ** Types
import {
  DonationCampaignProps,
  DonationOptionsProps,
  DonationOptionType,
  EditDonationOptionType,
} from '@/types/donations'

// ** Axios
import axiosRequest from '@/utils/axiosRequest'
import { BProgress } from '@bprogress/core'
import { Toast } from '@/utils/toast'

// ** FETCH DONATION CAMPAIGN
export const getDonationsCampaigns = createAsyncThunk(
  'donations/getDonationsCampaigns',
  async (query: string | undefined, { rejectWithValue }) => {
    try {
      let response
      if (query) {
        response = await axiosRequest.get(`/donate?${query}`)
      } else {
        response = await axiosRequest.get('/donate')
      }

      const donations = response.data

      return donations
    } catch (error) {
      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        console.log('Error fetching donations campaigns', error)
      }
      return rejectWithValue(
        error instanceof Error ? error.message : 'An error occurred fetching donations Campaigns'
      )
    }
  }
)

type CampaignStatus = 'active' | 'suspended' | 'completed'

interface CampaignType {
  title: string
  desc: string
  target: number
  raised?: number
  subText?: string
  status: CampaignStatus
  imgs: string[]
  details: string[]
}

interface CampaignEditType {
  title: string
  desc: string
  target: number
  raised: number
  subText: string
  status: CampaignStatus
  imgs: string[]
  details: string[]
}

// ** ADD NEW DONATION CAMPAIGN
export const addDonationCampaign = createAsyncThunk(
  'donations/addDonationCampaign',
  async (data: CampaignType, { rejectWithValue }) => {
    try {
      // start Progress bar
      BProgress.start()

      const response = await axiosRequest.post('/donate', data)
      const newCampaign = response.data

      // End Progress bar
      BProgress.done()
      // Success Toast
      Toast.fire({
        icon: 'success',
        title: 'Donation Campaign',
        text: 'New Campaign created!',
      })

      return newCampaign
    } catch (error) {
      // End Progress bar
      BProgress.done()
      Toast.fire({
        icon: 'error',
        title: 'Donation Campaign',
        text: `${
          error instanceof Error ? error.message : 'An error occurred creating new campaign.'
        }`,
      })

      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        console.log('Error creating new donation campaign', error)
      }
      return rejectWithValue(
        error instanceof Error ? error.message : 'Error creating new Donation Campaign'
      )
    }
  }
)

// ** UPDATE DONATION CAMPAIGN
export const updateDonationCampaign = createAsyncThunk(
  'donations/updateDonationCampaign',
  async (
    { modifiedData, removedImages }: { modifiedData: CampaignEditType; removedImages: string[] },
    { rejectWithValue }
  ) => {
    try {
      // start Progress bar
      BProgress.start()

      const response = await axiosRequest.put('/donate', { modifiedData, removedImages })
      const updatedDonationCampaign = response.data

      // End Progress bar
      BProgress.done()
      // Success Toast
      Toast.fire({
        icon: 'success',
        title: 'Donation Campaign',
        text: 'Campaign updated!',
      })
      return updatedDonationCampaign
    } catch (error) {
      // End Progress bar
      BProgress.done()
      // Error Toast
      Toast.fire({
        icon: 'error',
        title: 'Donation Campaign',
        text: `${error instanceof Error ? error.message : 'An error occurred updating campaign'}`,
      })

      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        console.log('Error updating donation campaign', error)
      }

      rejectWithValue(error instanceof Error ? error.message : 'Error updating donation campaign')
    }
  }
)

// ** FETCH DONATION OPTIONS
export const getDonationOptions = createAsyncThunk(
  'donations/getDonationOptions',
  async (query: string | undefined, { rejectWithValue }) => {
    try {
      const response = await axiosRequest.get(`/donation-options?${query}`)
      const donationOptions = response.data

      return donationOptions
    } catch (error) {
      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        console.log('Error fetching donation options', error)
      }
      return rejectWithValue(
        error instanceof Error ? error.message : 'Error fetching donation options'
      )
    }
  }
)

// ** DELETE DONATION CAMPAIGN
export const deleteDonationCampaign = createAsyncThunk(
  'donations/deleteDonationCampaign',
  async ({ id, imgUrls }: { id: string; imgUrls: string[] }, { rejectWithValue }) => {
    try {
      // start Progress bar
      BProgress.start()

      // Encode image URLs as a comma-separated string
      const urlsParam = encodeURIComponent(imgUrls.join(','))

      await axiosRequest.delete(`/donate?id=${id}&imgUrls=${urlsParam}`)

      // End Progress bar
      BProgress.done()
      // Success Toast
      Toast.fire({
        icon: 'success',
        title: 'Donation Campaign',
        text: 'Campaign deleted!',
      })
      return id
    } catch (error) {
      // End Progress bar
      BProgress.done()
      // Error Toast
      Toast.fire({
        icon: 'error',
        title: 'Donation Campaign',
        text: `${error instanceof Error ? error.message : 'An error occurred deleting campaign'}`,
      })
      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        console.log('Error deleting donation campaign', error)
      }

      return rejectWithValue(
        error instanceof Error ? error.message : 'Error deleting donation campaign'
      )
    }
  }
)

// ** FETCH SINGLE CAMPAIGN
export const singleCampaign = createAsyncThunk(
  'donations/singleCampaign',
  async (id: string, { rejectWithValue }) => {
    console.log('Campaign ID @ Donations Store', id)
    try {
      const response = await axiosRequest.get(`/donate/${id}`)
      const campaignData = response.data

      return campaignData
    } catch (error) {
      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        console.log('Error fetching single campaign', error)
      }
      return rejectWithValue(
        error instanceof Error ? error.message : 'An error occurred fetching single campaign'
      )
    }
  }
)

// ** ADD NEW DONATION OPTION
export const addDonationOption = createAsyncThunk(
  'donations/addDonationOption',
  async (data: DonationOptionType, { rejectWithValue }) => {
    try {
      // Start Progress bar
      BProgress.start()

      const response = await axiosRequest.post('/donation-options', data)
      const successMsg = response.data

      // End Progress bar
      BProgress.done()
      // Success Toast
      Toast.fire({
        icon: 'success',
        title: 'Donation Options',
        text: 'New Donation Option created!',
      })

      return successMsg
    } catch (error) {
      // End Progress bar
      BProgress.done()
      // Error Toast
      Toast.fire({
        icon: 'error',
        title: 'Donation Options',
        text: `${error instanceof Error ? error.message : 'An error occurred creating new option'}`,
      })
      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        console.log('Error creating new donation option', error)
      }

      return rejectWithValue(
        error instanceof Error ? error.message : 'Error creating new donation option'
      )
    }
  }
)

// ** UPDATE DONTION OPTIONS
export const updateDonationOption = createAsyncThunk(
  'donations/updateDonationOption',
  async (data: EditDonationOptionType, { rejectWithValue }) => {
    try {
      // Start Progress bar
      BProgress.start()

      const response = await axiosRequest.put('/donation-options', data)
      const update = response.data

      // End Progress bar
      BProgress.done()
      // Success Toast
      Toast.fire({
        icon: 'success',
        title: 'Donation Options',
        text: 'Donation Option updated!',
      })

      return update
    } catch (error) {
      // End Progress bar
      BProgress.done()
      // Error Toast
      Toast.fire({
        icon: 'error',
        title: 'Donation Options',
        text: `${
          error instanceof Error ? error.message : 'An error occurred updating donation option'
        }`,
      })
      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        console.log('Error updating donation option', error)
      }

      rejectWithValue(error instanceof Error ? error.message : 'Error updating donation option')
    }
  }
)

// ** DELETE DONATION OPTION
export const deleteDonationOption = createAsyncThunk(
  'donations/deleteDonationOption',
  async (id: string, { rejectWithValue }) => {
    try {
      // Start Progress
      BProgress.start()

      const response = await axiosRequest.delete(`/donation-options?id=${id}`)
      const successMsg = response.data

      // End Progress bar
      BProgress.done()
      // Success Toast
      Toast.fire({
        icon: 'success',
        title: 'Donation Options',
        text: 'Donation Option deleted!',
      })
      return successMsg
    } catch (error) {
      // End Progress bar
      BProgress.done()
      // Error Toast
      Toast.fire({
        icon: 'success',
        title: 'Donation Options',
        text: `${
          error instanceof Error ? error.message : 'An error occurred deleting donation option'
        }`,
      })

      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        console.log('Error deleting donation option', error)
      }

      return rejectWithValue(
        error instanceof Error ? error.message : 'Error deleting donation option'
      )
    }
  }
)

export const donationSlice = createSlice({
  name: 'donations',
  initialState: {
    // DONATIONS
    donationCampaigns: [] as DonationCampaignProps[],
    selectedCampaign: {} as DonationCampaignProps,

    // OPTIONS
    donationOptions: [] as DonationOptionsProps[],

    // DONATIONS COUNTS
    totalCampaigns: 0 as number,
    queryCount: 0 as number, // Count a custom query
    currentPage: 0 as number,
    totalPages: 0 as number,

    // FETCH CHUNK SIZE
    fectCount: 0 as number, // Number of data being fetched by a request

    // OPTIONS COUNTS

    // LOADERS
    fetchingCampaigns: false as boolean,
    fetchingSingleCampaign: false as boolean,

    fetchingOptions: false as boolean,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // DONATION CAMPAIGNS
      // ** FETCH DONATION CAMPAIGNS
      .addCase(getDonationsCampaigns.fulfilled, (state, action) => {
        return {
          ...state,
          ...action.payload,
          fetchingCampaigns: false,
        }
      })
      .addCase(getDonationsCampaigns.pending, (state) => {
        state.fetchingCampaigns = false
      })
      .addCase(getDonationsCampaigns.rejected, (state) => {
        state.fetchingCampaigns = false
      })

      // ** ADD NEW DONATION CAMPAIGN
      .addCase(addDonationCampaign.fulfilled, (state, action) => {
        state.donationCampaigns.push(action.payload)
      })

      // ** UPDATE DONATION CAMPAIGN
      .addCase(updateDonationCampaign.fulfilled, (state, action) => {
        const { id } = action.payload
        let updatedDonationCampaign: DonationCampaignProps[] = []

        state.donationCampaigns.map((d) => {
          if (d.id === id) {
            updatedDonationCampaign.push({
              ...d,
              ...action.payload,
            })
          } else {
            updatedDonationCampaign.push(d)
          }
        })

        return {
          ...state,
          donationCampaigns: updatedDonationCampaign,
          pending: false,
        }
      })

      // ** DELETE DONATION CAMPAIGN
      .addCase(deleteDonationCampaign.fulfilled, (state, action) => {
        return {
          ...state,
          donationCampaigns: state.donationCampaigns.filter((d) => d.id !== action.payload),
        }
      })

      // ** FETCH SINGLE CAMPAIGN
      .addCase(singleCampaign.pending, (state) => {
        state.fetchingSingleCampaign = true
      })
      .addCase(singleCampaign.fulfilled, (state, action) => {
        state.selectedCampaign = action.payload
        state.fetchingSingleCampaign = false
      })
      .addCase(singleCampaign.rejected, (state) => {
        state.fetchingSingleCampaign = false
      })

      // DONATION OPTIONS
      // ** FETCH DONATION OPTIONS
      .addCase(getDonationOptions.pending, (state) => {
        state.fetchingOptions = true
      })
      .addCase(getDonationOptions.fulfilled, (state, action) => {
        return {
          ...state,
          donationOptions: action.payload,
          fetchingOptions: false,
        }
      })
      .addCase(getDonationOptions.rejected, (state) => {
        state.fetchingOptions = false
      })

      // ** ADD NEW DONATION OPTION
      .addCase(addDonationOption.fulfilled, (state, action) => {
        state.donationOptions.push(action.payload)
      })

      // ** UPDATE DONATION OPTION
      .addCase(updateDonationOption.fulfilled, (state, action) => {
        const { id } = action.payload
        let updatedDonationOpptions: DonationOptionsProps[] = []

        state.donationOptions.map((d) => {
          if (d.id === id) {
            updatedDonationOpptions.push({
              ...d,
              ...action.payload,
            })
          } else {
            updatedDonationOpptions.push(d)
          }
        })

        return {
          ...state,
          donationOptions: updatedDonationOpptions,
        }
      })

      // ** DELETE DONATION OPTION
      .addCase(deleteDonationOption.fulfilled, (state, action) => {
        return {
          ...state,
          donationOptions: state.donationOptions.filter((d) => d.id !== action.payload),
        }
      })
  },
})

export default donationSlice.reducer
