'use client'
// ** Redux Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// ** Axios
import axiosRequest from './src/utils/axiosRequest'

// ** UseJWT import to get config
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../configs/firebase'

// ** Default Avatar
// import DefaultAvatar from '/images/avatars/avatar-blank.png'

// ** Utils
import { logoutFirebase, splitEmail } from './src/utils/utils'

// ** Toast
import { Toast } from './src/utils/toast'
import { PatronWebType } from './src/types/patron'
import { setCookie, deleteCookie } from './src/utils/setCookie'
import { BProgress } from '@bprogress/core'
import { capitalize } from '@mui/material'

interface PatronType {
  email: string
  password: string
  address?: string
  lastname?: string
  firstname?: string
  username?: string
  contact?: string
  role?: string
  avatar?: string
}

// ** HANDLE LOGIN
export const handleLoginPatron = createAsyncThunk(
  'auth/handleLoginPatron',
  async (patronData: PatronType, { rejectWithValue }) => {
    const { email, password } = patronData

    try {
      // Start Progess bar
      BProgress.start()

      const response = await signInWithEmailAndPassword(auth, email, password)

      const patronCredentials = response.user

      const { uid: patronId } = patronCredentials
      const accessToken = await patronCredentials.getIdToken()
      const refreshToken = patronCredentials.refreshToken
      const { lastSignInTime } = patronCredentials.metadata

      const updatePatronInfo = await axiosRequest.put(`/patrons?id=${patronId}`, {
        lastSignInTime,
        onlineStatus: true,
      })

      const patronInfo = updatePatronInfo.data

      const patronDataObj: PatronWebType = {
        id: patronInfo.id,
        fullname: patronInfo.fullname,
        firstname: patronInfo.firstname,
        lastname: patronInfo.lastname,
        username: patronInfo.username,
        email: patronInfo.email,
        role: patronInfo.role,
        address: patronInfo.address,
        contact: patronInfo.contact,
        avatar: patronInfo.avatar,
        onlineStatus: true,
        verified: patronInfo.verified,
        timestamps: {
          createdAt: patronInfo.createdAt,
          lastSignInTime,
        },
        tokens: {
          refreshToken,
          accessToken,
        },
      }

      // End Progress bar
      BProgress.done()

      // Success Toast
      Toast.fire({
        icon: 'success',
        title: 'Signed in successfully',
        text: `Welcome back, ${capitalize(patronInfo.username)}`,
      })

      // Set UserData as cookie
      setCookie('userData', patronDataObj)

      return patronDataObj
    } catch (error) {
      // End Progress bar
      BProgress.done()
      // Error Toast
      Toast.fire({
        icon: 'error',
        title: 'Sign In',
        text: `${error instanceof Error ? error.message : 'An unknown error occurred'}`,
      })

      if (process.env.NODE_ENV === 'development') {
        if (error instanceof Error) {
          console.log('Error Signing in account', error.message)
        } else {
          console.log('Error Signing in account', error)
        }
      }

      // Pass error message to rejectWithValue
      return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred')
    }
  }
)

// ** HANDLE LOGOUT
export const handleLogout = createAsyncThunk<
  void, // Return type of the thunk
  string, // Argument type (patronId is a string)
  { rejectValue: string } // Type for rejected value
>('auth/handleLogout', async (patronId, { rejectWithValue }) => {
  try {
    // Start Progrss bar
    BProgress.start()

    await axiosRequest.put(`/patrons?id=${patronId}`, {
      onlineStatus: false,
    })

    // Delete User Data Cookie
    deleteCookie('userData')

    // End Progress bar
    BProgress.done()
    // Success Toast
    Toast.fire({
      icon: 'success',
      title: 'Authentication',
      text: 'Logout successful!',
    })
  } catch (error) {
    // End Progress bar
    BProgress.done()
    // Success Toast
    Toast.fire({
      icon: 'error',
      title: 'Authentication',
      text: 'Logout unsuccessful!',
    })

    if (process.env.NODE_ENV === 'development') {
      console.error('Error logging out @ Handle Logout', error)
    }

    // Pass error message to rejectWithValue
    return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred')
  }
})

// ** HANDLE AUTO LOGIN
export const handleAutoLogin = createAsyncThunk(
  'auth/handleAutoLogin',
  async (_, { rejectWithValue }) => {
    try {
      // Start Progress bar
      BProgress.start()

      const response = await axiosRequest.get('/set-cookie')
      const userData = response.data

      if (!userData) {
        throw new Error('No userData found in cookies')
      }

      if (process.env.NODE_ENV === 'development') {
        console.log('User Data found in cookies:', userData)
      }

      // End Progress bar
      BProgress.done()

      // Return the patron data object to update the state
      return userData
    } catch (error) {
      // Logout user from firebase
      logoutFirebase()

      // End Progress bar
      BProgress.done()

      Toast.fire({
        icon: 'error',
        title: 'Auto Authentication',
        text: `${error instanceof Error ? error.message : 'An error occurred - Auto Auth'}`,
      })
      if (process.env.NODE_ENV === 'development') {
        console.log('Error fetching patron data - handleAutoLogin', error)
      }

      // Pass error message to rejectWithValue
      return rejectWithValue(
        error instanceof Error ? error.message : 'An unknown error occurred in auto login'
      )
    }
  }
)

// ** REGISTER NEW USER
export const handleRegisterPatron = createAsyncThunk(
  'buzStopBoys/handleRegisterPatron',
  async (userData: PatronType, { rejectWithValue }) => {
    const {
      email,
      password,
      username: nameEntered,
      firstname = '',
      address = '',
      lastname = '',
      contact = '',
      role: roleSelected,
      avatar: profileImg,
    } = userData

    // Log out user from firebase
    logoutFirebase()
    try {
      // Start Progress bar
      BProgress.start()

      const response = await createUserWithEmailAndPassword(auth, email, password)
      const patronCredentials = response.user

      const { email: authEmail, uid: patronId, photoURL, displayName } = patronCredentials
      const accessToken = await patronCredentials.getIdToken()
      const refreshToken = patronCredentials.refreshToken
      const { lastSignInTime } = patronCredentials.metadata
      const name = splitEmail(authEmail)
      const username = nameEntered ? nameEntered : displayName ? displayName : name

      const avatar = profileImg ? profileImg : photoURL ? photoURL : ''
      const role = roleSelected ? roleSelected : 'patron'
      const combineName = `${firstname} ${lastname}`
      const fullname = combineName ? combineName : ''

      const newPatronDataObj = {
        id: patronId,
        firstname,
        lastname,
        username,
        fullname,
        email,
        address,
        contact,
        role,
        avatar,
        password,
      }

      // ** Write Data to Mongo DB
      await axiosRequest.post('/patrons', newPatronDataObj)

      const patronDataObj: PatronWebType = {
        id: patronId,
        fullname,
        firstname,
        lastname,
        username,
        email,
        role,
        address,
        contact,
        avatar,
        onlineStatus: true,
        verified: false,
        timestamps: {
          createdAt: new Date().toISOString(),
          lastSignInTime,
        },
        tokens: {
          refreshToken,
          accessToken,
        },
      }

      // End Progress bar
      BProgress.done()

      // Success Toast
      Toast.fire({
        icon: 'success',
        title: 'Signed up successfully',
        text: `Welcome ${capitalize(username ? username : '')}`,
      })

      // Set UserData as cookie
      setCookie('userData', patronDataObj)

      return patronDataObj
    } catch (error) {
      // End Progress bar
      BProgress.done()

      // Success Toast
      Toast.fire({
        icon: 'error',
        title: 'Signed up',
        text: `${error instanceof Error ? error.message : 'Sign up unsuccessful!'}`,
      })

      if (error instanceof Error) {
        console.log('Error creating new patron account', error.message)
      } else {
        console.log('Error creating new patron account', error)
      }
      // Pass error message to rejectWithValue
      return rejectWithValue(
        error instanceof Error ? error.message : 'An unknown error occurred signing up'
      )
    }
  }
)

const initialState: { data: PatronWebType | null; isLoggedIn: boolean; pending: boolean } = {
  data: null,
  isLoggedIn: false,
  pending: false,
}

export const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    handleLogoutReducer: (state) => {
      state.data = null
      state.isLoggedIn = false
      state.pending = false
    },
    setAuthPending: (state) => {
      state.pending = true
    },
    setAuthNotPending: (state) => {
      state.pending = false
    },
  },
  extraReducers: (builder) => {
    builder
      // ** Register Patron
      .addCase(handleRegisterPatron.rejected, (state) => {
        state.pending = false
      })
      .addCase(handleRegisterPatron.pending, (state) => {
        state.pending = true
      })
      .addCase(handleRegisterPatron.fulfilled, (state, action) => {
        // Update state immutably
        return {
          ...state,
          data: action.payload,
          isLoggedIn: true,
          pending: false,
        }
      })

      // ** Login Patron
      .addCase(handleLoginPatron.pending, (state) => {
        state.pending = true
      })
      .addCase(handleLoginPatron.rejected, (state) => {
        state.pending = false
      })
      .addCase(handleLoginPatron.fulfilled, (state, action) => {
        // Update state immutably
        return {
          ...state,
          data: action.payload,
          isLoggedIn: true,
          pending: false,
        }
      })

      // ** Auto Login
      .addCase(handleAutoLogin.fulfilled, (state, action) => {
        state.data = action.payload
        state.isLoggedIn = true
        state.pending = false
      })
      .addCase(handleAutoLogin.pending, (state) => {
        state.pending = true
      })
      .addCase(handleAutoLogin.rejected, (state) => {
        state.pending = false
      })

      // ** Logout Patron
      .addCase(handleLogout.fulfilled, (state) => {
        state.data = null
        state.isLoggedIn = false
        state.pending = false
      })
      .addCase(handleLogout.rejected, (state) => {
        state.pending = false
      })
  },
})

export const { handleLogoutReducer, setAuthNotPending, setAuthPending } = authSlice.actions

export default authSlice.reducer
