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

        title: 'Transaction',
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

// ** FETCH Transaction
export const getTransactions = createAsyncThunk(
  'transactions/getTransactions',
  async (
    query: { page?: number; limit?: number; [key: string]: string | number | undefined },
    { rejectWithValue }
  ) => {
    try {
      const queryString = new URLSearchParams(query as Record<string, string>).toString()
      const response = await axiosRequest.get(`/transactions?${queryString}`)

      const transactions = response.data

      return transactions
    } catch (error) {
      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        console.log('Error fetching transactions', error)
      }
      return rejectWithValue(
        error instanceof Error ? error.message : 'An error occurred fetching transactions'
      )
    }
  }
)
// ** FETCH User Transactions
export const getUserTransactions = createAsyncThunk(
  'transactions/getUserTransactions',
  async (
    {
      id,
      query,
    }: {
      id: string
      query?: { page?: number; limit?: number }
    },
    { rejectWithValue }
  ) => {
    try {
      const queryString = query
        ? new URLSearchParams(query as Record<string, string>).toString()
        : ''
      const response = await axiosRequest.get(`/transactions?metadata.userDetails.userId=${id}`)

      return response.data
    } catch (error) {
      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        console.error('Error fetching transactions:', error)
      }
      return rejectWithValue(
        error instanceof Error ? error.message : 'An error occurred fetching transactions'
      )
    }
  }
)

// ** DELETE TRANSACTION
export const deleteTransaction = createAsyncThunk(
  'transactions/deleteTransaction',
  async (id: string, { rejectWithValue }) => {
    try {
      // start Progress bar
      BProgress.start()

      await axiosRequest.delete(`/donate?id=${id}`)

      // End Progress bar
      BProgress.done()
      // Success Toast
      Toast.fire({
        icon: 'success',
        title: 'Transaction',
        text: 'Transaction deleted!',
      })
      return id
    } catch (error) {
      // End Progress bar
      BProgress.done()
      // Error Toast
      Toast.fire({
        icon: 'error',
        title: 'Transaction ',
        text: `${
          error instanceof Error ? error.message : 'An error occurred deleting transaction'
        }`,
      })
      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        console.log('Error deleting Transaction ', error)
      }

      return rejectWithValue(error instanceof Error ? error.message : 'Error deleting Transaction')
    }
  }
)

// ** FETCH SINGLE Transaction
export const singleTransaction = createAsyncThunk(
  'transactions/singleTransaction',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosRequest.get(`/transactions/${id}`)
      const TransactionData = response.data

      return TransactionData
    } catch (error) {
      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        console.log('Error fetching single transaction', error)
      }
      return rejectWithValue(
        error instanceof Error ? error.message : 'An error occurred fetching single transaction'
      )
    }
  }
)

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    // TRANSACTIONS
    data: [] as TRANSACTIONSTYPE[],
    userTransactionsData: [] as TRANSACTIONSTYPE[],
    selectedTransaction: {} as TRANSACTIONSTYPE,

    // COUNT
    totalTransactions: 0 as number,

    // FETCH CHUNK SIZE
    fectCount: 0 as number, // Number of data being fetched by a request

    // LOADERS
    fetchingTransactions: false as boolean,
    fetchingUserTransactions: false as boolean,
    fetchingSingleTransactions: false as boolean,
  },
  reducers: {
    clearLoggedInUserTransactions: (state) => {
      state.userTransactionsData = []
    },
  },
  extraReducers(builder) {
    builder
      // NEW TRANSACTION
      .addCase(handleNewTransaction.fulfilled, (state, action) => {
        state.data.push(action.payload)
      })
      // FETCH TRANSACTIONS
      .addCase(getTransactions.fulfilled, (state, action) => {
        return {
          ...state,
          ...action.payload,
          fetchingTransactions: false,
        }
      })
      .addCase(getTransactions.pending, (state) => {
        state.fetchingTransactions = true
      })
      .addCase(getTransactions.rejected, (state) => {
        state.fetchingTransactions = false
      })
      // FETCH USER TRANSACTIONS
      .addCase(getUserTransactions.fulfilled, (state, action) => {
        return {
          ...state,
          fetchCount: action.payload.fetchCount,
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          userTransactionsData: action.payload.data,
          fetchingUserTransactions: false,
        }
      })
      .addCase(getUserTransactions.pending, (state) => {
        state.fetchingUserTransactions = true
      })
      .addCase(getUserTransactions.rejected, (state) => {
        state.fetchingUserTransactions = false
      })
      // DELETE TRANSACTION
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        return {
          ...state,
          data: state.data.filter((d) => d.id !== action.payload),
        }
      })
      // FETCH SINGLE TRANSACTION
      .addCase(singleTransaction.pending, (state) => {
        state.fetchingSingleTransactions = true
      })
      .addCase(singleTransaction.fulfilled, (state, action) => {
        state.selectedTransaction = action.payload
        state.fetchingSingleTransactions = false
      })
      .addCase(singleTransaction.rejected, (state) => {
        state.fetchingSingleTransactions = false
      })
  },
})

export const { clearLoggedInUserTransactions } = transactionsSlice.actions
export default transactionsSlice.reducer
