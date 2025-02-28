// ** Redux Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// ** Axios
import axiosRequest from '@/utils/axiosRequest'
import { PAYMENTDATATYPE, TRANSACTIONSTYPE } from '@/types/transactions'

export const handlePayment = createAsyncThunk(
  'transactions/handlePayment',
  async (paymentData: PAYMENTDATATYPE, { rejectWithValue }) => {
    try {
      const response = await axiosRequest.post('/paystack', paymentData)
      const { paystack } = response.data

      // RESPONSE DATA STRUCTURE
      // {
      //   "status": true,
      //   "message": "Authorization URL created",
      //    "data": {
      //      "authorization_url": "https://checkout.paystack.com/abc123xyz",
      //      "access_code": "abc123xyz",
      //      "reference": "7PVGX8MEk85tgeEpVDtD"
      //     }
      //   }

      return paystack
    } catch (error) {
      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        console.log('payment error', error)
      }
      return rejectWithValue(error instanceof Error ? error.message : 'Payment error')
    }
  }
)

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    // TRANSACTIONS
    data: [] as TRANSACTIONSTYPE[],
    selectedTransaction: {} as TRANSACTIONSTYPE,
    initializePayment: {},

    // COUNT
    totalTransactions: 0 as number,

    // FETCH CHUNK SIZE
    fectCount: 0 as number, // Number of data being fetched by a request

    // LOADERS
    fetchingTransactions: false as boolean,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      // PAYMENT INITIALIZATION
      .addCase(handlePayment.fulfilled, (state, action) => {
        state.initializePayment = action.payload
      })
  },
})

export default transactionsSlice.reducer
