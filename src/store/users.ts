import { auth } from './src/configs/firebase'
import { PatronMDBType } from './src/types/patron'
import axiosRequest from './src/utils/axiosRequest'
import { Toast } from './src/utils/toast'
import { splitEmail } from './src/utils/utils'
import { BProgress } from '@bprogress/core'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createUserWithEmailAndPassword } from 'firebase/auth'

// ** GET ALL USERS
interface PatronsPayload {
  users: PatronMDBType[]
  usersCount: number
  adminsCount: number
  patronsCount: number
}

export const getPatrons = createAsyncThunk<PatronsPayload, void, { rejectValue: string }>(
  'patrons/getPatrons',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosRequest.get('/patrons')
      const users = response.data

      const admins = users.filter((u: PatronMDBType) => u.role === 'admin')
      const patrons = users.filter((u: PatronMDBType) => u.role === 'patron')
      const usersCount = users.length

      console.log('Users @ getPatrons', users)
      return {
        users,
        admins,
        patrons,
        usersCount,
        adminsCount: admins.length,
        patronsCount: patrons.length,
      }
    } catch (error) {
      console.log('Error Fetching Users', error)
      return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred')
    }
  }
)

// ** DELETE USER
export const deleteUser = createAsyncThunk(
  'patrons/deleteUser',
  async (userId: string, { rejectWithValue }) => {
    try {
      // Start Progress bar
      BProgress.start()

      await axiosRequest.delete(`/patrons?id=${userId}`)

      // Success Toast
      Toast.fire({
        icon: 'success',
        title: 'Patrons',
        text: 'User deleted!',
      })

      return userId
    } catch (error) {
      // Error Toast
      Toast.fire({
        icon: 'error',
        title: 'Patrons',
        text: 'User not deleted!',
      })

      if (process.env.NODE_ENV === 'development') {
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
  'patrons/suspendUser',
  async (userId: string, { rejectWithValue }) => {
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
        text: 'User suspended!',
      })

      return updatePatronInfo
    } catch (error) {
      // Error Toast
      Toast.fire({
        icon: 'error',
        title: 'Patrons',
        text: 'User not suspended!',
      })

      if (process.env.NODE_ENV === 'development') {
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
  'patrons/reinstate',
  async (userId: string, { rejectWithValue }) => {
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
        text: 'User Reinstated!',
      })

      return updatePatronInfo
    } catch (error) {
      // Error Toast
      Toast.fire({
        icon: 'error',
        title: 'Patrons',
        text: 'User not reinstated!',
      })

      if (process.env.NODE_ENV === 'development') {
        console.log('Error Reinstating User', error)
      }
      return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred')
    } finally {
      // End Progress bar
      BProgress.done()
    }
  }
)

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

// ** ADMIN REGISTER NEW USER
export const handleAdminRegisterPatron = createAsyncThunk(
  'buzStopBoys/handleAdminRegisterPatron',
  async (userData: AddPatronType, { rejectWithValue }) => {
    try {
      // Start Progress bar
      BProgress.start()

      // ** Write Data to Mongo DB
      const newPatron = await axiosRequest.post('/patrons', userData)
      const { role } = newPatron.data

      // Success Toast
      Toast.fire({
        icon: 'success',
        title: 'Patron created successfully',
        text: `Role: ${role}`,
      })

      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        console.log('--------- new Patron Data ------------')
        console.log('--------- new Patron Data ------------', newPatron)
        console.log('--------- new Patron Data ------------', newPatron.data)
        console.log('--------- new Patron Data ------------')
      }

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
    users: [] as PatronMDBType[],
    numberOfPatrons: 0 as number,
    numberOfAdmins: 0 as number,
    numberOfUsers: 0 as number,
    pending: false as boolean,
  },
  name: 'patrons',
  reducers: {},
  extraReducers: (builder) => {
    builder

      // ** Get All Users
      .addCase(getPatrons.fulfilled, (state, action) => {
        state.users = action.payload.users
        state.numberOfPatrons = action.payload.patronsCount
        state.numberOfAdmins = action.payload.adminsCount
        state.numberOfUsers = action.payload.usersCount
        state.pending = false
      })
      .addCase(getPatrons.pending, (state) => {
        state.pending = true
      })

      // ** Delete User
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u.id !== action.payload)
        state.numberOfUsers - 1
        state.numberOfAdmins = state.users.filter((u) => u.role === 'admin').length
        state.numberOfPatrons = state.users.filter((u) => u.role === 'patron').length
        state.pending = false
      })

      // ** Suspend User
      .addCase(suspendUser.fulfilled, (state, action) => {
        state.users = state.users.map((u) =>
          u.id === action.payload.data.id ? action.payload.data : u
        )
        state.pending = false
      })

      // ** Reinstate User
      .addCase(reinstateUser.fulfilled, (state, action) => {
        state.users = state.users.map((u) =>
          u.id === action.payload.data.id ? action.payload.data : u
        )
        state.pending = false
      })

      // ** Admin Register Patron
      .addCase(handleAdminRegisterPatron.fulfilled, (state, action) => {
        state.users.push(action.payload)
        state.numberOfUsers + 1
        if (action.payload.role === 'admin') {
          state.numberOfAdmins + 1
        } else {
          state.numberOfPatrons + 1
        }
        state.pending = false
      })
  },
})

export default patronSlice.reducer
