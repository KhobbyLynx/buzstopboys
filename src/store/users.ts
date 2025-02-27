import { PatronDatabaseType } from '@/types/patron'
import axiosRequest from '@/utils/axiosRequest'
import { Toast } from '@/utils/toast'
import { BProgress } from '@bprogress/core'
import { capitalize } from '@mui/material'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// Types
interface AddPatronType {
  email: string
  address?: string
  lastname?: string
  firstname?: string
  username?: string
  contact?: number | undefined
  role?: string
  avatar?: string
}

interface PatronsPayload {
  users: PatronDatabaseType[]
  totalUsers: number
  fetchCount: number // Number of users being fetch at request
}

// ** FETCH ALL USERS
export const getUsers = createAsyncThunk(
  'users/getUsers',
  async (query: string | undefined, { rejectWithValue }) => {
    try {
      let response
      if (query) {
        response = await axiosRequest.get(`/patrons?${query}`)
      } else {
        response = await axiosRequest.get('/patrons')
      }
      const responseData = response.data

      return responseData
    } catch (error) {
      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        console.log('Error Fetching Users', error)
      }
      return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred')
    }
  }
)

// ** FETCH WITH QUERY
export const queryFetch = createAsyncThunk(
  'users/queryFetch',
  async (queryParams: Record<string, string | number | boolean>, { rejectWithValue }) => {
    try {
      // Build query string from queryParams object
      const queryString = new URLSearchParams(queryParams as Record<string, string>).toString()

      // Send request with dynamic query
      const response = await axiosRequest.get(`/patrons?${queryString}`)
      const responseData = response.data
      const { users, fetchCount } = responseData

      return {
        users,
        fetchCount,
      }
    } catch (error) {
      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        console.error('Error fetching user with query:', error)
      }
      return rejectWithValue(
        error instanceof Error ? error.message : 'An error occurred while fetching users'
      )
    }
  }
)

// ** FETCH SINGLE USER
export const singleUser = createAsyncThunk(
  'users/singleUser',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axiosRequest.get(`/patrons/${userId}`)
      const userData = response.data

      return userData
    } catch (error) {
      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        console.log('Error fetching single user', error)
      }
      return rejectWithValue(
        error instanceof Error ? error.message : 'An error occurred fetching single user'
      )
    }
  }
)

// ** FETCH COUNTS
export const fetchUserCounts = createAsyncThunk(
  'users/fetchUserCounts',
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await axiosRequest.get(`/patrons/count?${query}`)
      const responseData = response.data

      return responseData
    } catch (error) {
      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        console.log('Error fetching users counts', error)
      }
      return rejectWithValue(
        error instanceof Error ? error.message : 'An error occurred fetching users counts'
      )
    }
  }
)

// ** DELETE USER
export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async ({ userId, role }: { userId: string; role: string }, { rejectWithValue }) => {
    try {
      // Start Progress bar
      BProgress.start()

      await axiosRequest.delete(`/patrons?id=${userId}`)

      // Success Toast
      Toast.fire({
        icon: 'success',
        title: 'USERS',
        text: `${capitalize(role)} is deleted!`,
      })

      return { id: userId, role }
    } catch (error) {
      // Error Toast
      Toast.fire({
        icon: 'error',
        title: 'USERS',
        text: 'User not deleted!',
      })

      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        console.log('Error Deleting User', error)
      }
      return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred')
    } finally {
      // End Progress bar
      BProgress.done()
    }
  }
)

// ** SUSPEND USER
export const suspendUser = createAsyncThunk(
  'users/suspendUser',
  async ({ username, userId }: { username: string; userId: string }, { rejectWithValue }) => {
    try {
      // Start Progress bar
      BProgress.start()

      const updatePatronInfo = await axiosRequest.patch(`/patrons?id=${userId}`, {
        suspended: true,
      })

      // Success Toast
      Toast.fire({
        icon: 'success',
        title: 'Patrons',
        text: `${capitalize(username)} suspended!`,
      })

      return updatePatronInfo
    } catch (error) {
      // Error Toast
      Toast.fire({
        icon: 'error',
        title: 'Patrons',
        text: `${capitalize(username)} not suspended!`,
      })

      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        console.log('Error Suspending User', error)
      }

      return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred')
    } finally {
      // End Progress bar
      BProgress.done()
    }
  }
)

// ** REINSTATE USER
export const reinstateUser = createAsyncThunk(
  'users/reinstate',
  async ({ username, userId }: { username: string; userId: string }, { rejectWithValue }) => {
    try {
      // Start Progress bar
      BProgress.start()

      const updatePatronInfo = await axiosRequest.patch(`/patrons?id=${userId}`, {
        suspended: false,
      })

      // Success Toast
      Toast.fire({
        icon: 'success',
        title: 'Patrons',
        text: `${capitalize(username)} reinstated!`,
      })

      return updatePatronInfo
    } catch (error) {
      // Error Toast
      Toast.fire({
        icon: 'error',
        title: 'Patrons',
        text: `${capitalize(username)} not reinstated!`,
      })

      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        console.log('Error Reinstating User', error)
      }
      return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred')
    } finally {
      // End Progress bar
      BProgress.done()
    }
  }
)

// ** CREATE USER - ADMIN
export const handleAdminRegisterPatron = createAsyncThunk(
  'users/handleAdminRegisterPatron',
  async (userData: AddPatronType, { rejectWithValue }) => {
    try {
      // Start Progress bar
      BProgress.start()

      // ** Write Data to Mongo DB
      const newPatron = await axiosRequest.post('/patrons', userData)
      const { username } = newPatron.data

      // Success Toast
      Toast.fire({
        icon: 'success',
        title: 'Patron',
        text: `${capitalize(username)} created successfully!`,
      })

      return newPatron.data
    } catch (error) {
      // Error Toast
      Toast.fire({
        icon: 'error',
        title: 'Patron',
        text: 'User not created!',
      })

      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        if (error instanceof Error) {
          console.log('Error creating new patron account', error.message)
        } else {
          console.log('Error creating new patron account', error)
        }
      }

      // Pass error message to rejectWithValue
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : 'An unknown error occurred creating new user - Admin'
      )
    } finally {
      // End Progress bar
      BProgress.done()
    }
  }
)

export const patronSlice = createSlice({
  initialState: {
    // USERS
    users: [] as PatronDatabaseType[], // All Users
    selectedUser: {} as PatronDatabaseType, // Single User

    // COUNTS
    totalPatrons: 0 as number, // Total Patrons
    totalAdmins: 0 as number, // Total Admins
    totalUsers: 0 as number, // Total Users
    totalVerifiedUsers: 0 as number, // Total Verified Users
    totalOnlineUsers: 0 as number, // Total online users
    totalVerifiedOnlineUsers: 0 as number, // Verified and online
    queryCount: 0 as number, // Count a custom query
    currentPage: 0 as number,
    totalPages: 0 as number,

    // FETCH CHUNK SIZE
    fectCount: 0 as number, // Number of data being fetched by a request

    // LOADING STATES
    fetchingUsers: false as boolean,
    fetchingUsersWithQuery: false as boolean,
    fetchingSingleUser: false as boolean,
  },
  name: 'users',
  reducers: {},
  extraReducers: (builder) => {
    builder

      // ** FETCH ALL USERS
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload.users
        state.fectCount = action.payload.fetchCount
        state.fetchingUsers = false
      })
      .addCase(getUsers.pending, (state) => {
        state.fetchingUsers = true
      })
      .addCase(getUsers.rejected, (state) => {
        state.fetchingUsers = false
      })

      // ** FETCH USERS WITH QUERY
      .addCase(queryFetch.fulfilled, (state, action) => {
        state.users = action.payload.users
        state.fectCount = action.payload.fetchCount
        state.fetchingUsersWithQuery = false
      })
      .addCase(queryFetch.pending, (state) => {
        state.fetchingUsersWithQuery = true
      })
      .addCase(queryFetch.rejected, (state) => {
        state.fetchingUsersWithQuery = false
      })

      // ** FETCH COUNTS
      .addCase(fetchUserCounts.fulfilled, (state, action) => {
        const { query } = action.payload

        // If its a custom count
        if (query) {
          state.queryCount = action.payload.queryCount
        } else {
          return {
            ...state,
            ...action.payload.count, // spread all the count
          }
        }
      })

      // ** FETCH SINGLE USER
      .addCase(singleUser.rejected, (state) => {
        state.fetchingSingleUser = false
      })
      .addCase(singleUser.pending, (state) => {
        state.fetchingSingleUser = true
      })
      .addCase(singleUser.fulfilled, (state, action) => {
        state.selectedUser = action.payload
        state.fetchingSingleUser = false
      })

      // ** DELETE USER
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u.id !== action.payload.id)
        state.totalUsers - 1
        action.payload.role === 'admin' && state.totalAdmins - 1
        action.payload.role === 'patron' && state.totalPatrons - 1
      })

      // ** SUSPEND USER
      .addCase(suspendUser.fulfilled, (state, action) => {
        state.users = state.users.map((u) =>
          u.id === action.payload.data.id ? action.payload.data : u
        )
      })

      // ** REINSTATE USER
      .addCase(reinstateUser.fulfilled, (state, action) => {
        state.users = state.users.map((u) =>
          u.id === action.payload.data.id ? action.payload.data : u
        )
      })

      // ** ADMIN REGISTER USER
      .addCase(handleAdminRegisterPatron.fulfilled, (state, action) => {
        state.users.push(action.payload)
        state.totalPatrons + 1
        if (action.payload.role === 'admin') {
          state.totalAdmins + 1
        } else {
          state.totalPatrons + 1
        }
      })
  },
})

export default patronSlice.reducer
