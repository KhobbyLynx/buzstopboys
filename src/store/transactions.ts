// ** Redux Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// ** Axios
import axiosRequest from '@/utils/axiosRequest'
import { PAYMENTDATATYPE, TRANSACTIONSTYPE } from '@/types/transactions'
import { BProgress } from '@bprogress/core'
import { Toast } from '@/utils/toast'

export const handleNewTransaction = createAsyncThunk(
  'transactions/handleNewTransaction',
  async (paymentData: PAYMENTDATATYPE, { rejectWithValue }) => {
    const status = paymentData.status
    try {
      // Start Progress bar
      BProgress.start()

      const response = await axiosRequest.post('/transactions', paymentData)
      const newTransactionData = response.data

      // End Progress bar
      BProgress.done()
      Toast.fire({
        icon:
          status === 'success'
            ? 'success'
            : status === 'cancelled' || 'falied'
            ? 'error'
            : 'warning',

        title: 'Donation',
        text: `Payment ${status}`,
      })

      return newTransactionData
    } catch (error) {
      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        console.log('payment error', error)
      }
      return rejectWithValue(error instanceof Error ? error.message : 'Payment error')
    } finally {
      // End Progress bar
      BProgress.done()
    }
  }
)

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    // TRANSACTIONS
    data: [] as TRANSACTIONSTYPE[],
    selectedTransaction: {} as TRANSACTIONSTYPE,

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
      // NEW TRANSACTION
      .addCase(handleNewTransaction.fulfilled, (state, action) => {
        state.data.push(action.payload)
      })
  },
})

export default transactionsSlice.reducer
