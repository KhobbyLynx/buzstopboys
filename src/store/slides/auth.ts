// ** Redux Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// ** Axios
import axiosRequest from '@/utils/axiosRequest'

// ** UseJWT import to get config
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'
import { auth, googleProvider } from '../../configs/firebase'

// ** Utils
import { isWithinOneMinute, logoutFirebase, splitEmail } from '@/utils/utils'

// ** Toast
import { Toast } from '@/utils/toast'
import { PatronWebType } from '@/types/patron'
import { setCookie, deleteCookie } from '@/utils/setCookie'
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

// ** Default Avatar
const defaultAvatar =
  'https://res.cloudinary.com/khobbylynx/image/upload/v1740629504/buzstopboys/avatars/avatarDefault_cprnz9.jpg'

// ** HANDLE LOGIN
export const handleLoginPatron = createAsyncThunk(
  'auth/handleLoginPatron',
  async (userData: PatronType, { rejectWithValue }) => {
    const { email, password } = userData

    // VALIDATE
    if (!email || !password) {
      throw new Error('Email and password are required to Login')
    }

    try {
      // Start Progess bar
      BProgress.start()

      const response = await signInWithEmailAndPassword(auth, email, password)

      const responseData = response.user

      const { uid: patronId } = responseData
      const accessToken = await responseData.getIdToken()
      const refreshToken = responseData.refreshToken
      const { lastSignInTime } = responseData.metadata

      const updatePatronInfo = await axiosRequest.patch(`/patrons?id=${patronId}`, {
        lastSignInTime,
        onlineStatus: true,
      })

      const patronInfo = updatePatronInfo.data

      const patronCredentials: PatronWebType = {
        id: patronInfo.id,
        fullname: patronInfo.fullname,
        firstname: patronInfo.firstname,
        lastname: patronInfo.lastname,
        username: patronInfo.username,
        email: patronInfo.email,
        role: patronInfo.role,
        address: patronInfo.address,
        contact: patronInfo.contact,
        avatar: patronInfo.avatar ?? defaultAvatar,
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
      await setCookie('userData', patronCredentials)

      return patronCredentials
    } catch (error) {
      // End Progress bar
      BProgress.done()
      // Handle Firebase Authentication Errors
      let errorMessage = 'An unknown error occurred'

      if (error instanceof Error) {
        switch (error.message) {
          case 'auth/user-not-found':
            errorMessage = 'User not found'
            break
          case 'auth/wrong-password':
            errorMessage = 'Invalid Credentials'
            break
          case 'auth/user-disabled':
            errorMessage = 'Your account has been suspended. Please contact support.'
            break
          case 'auth/network-request-failed':
            errorMessage = 'Network Error'
            break
          default:
            errorMessage = error.message
        }
      }

      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        if (error instanceof Error) {
          console.log('Error Signing in account', error.message)
        } else {
          console.log('Error Signing in account', error)
        }
      }

      // Pass error message to rejectWithValue
      return rejectWithValue(errorMessage)
    }
  }
)

// ** HANDLE LOGOUT
export const handleLogout = createAsyncThunk<void, string, { rejectValue: string }>(
  'auth/handleLogout',
  async (patronId, { rejectWithValue }) => {
    try {
      // Start Progrss bar
      BProgress.start()

      await axiosRequest.put(`/patrons?id=${patronId}`, {
        onlineStatus: false,
      })

      await logoutFirebase()

      // Delete User Data Cookie
      await deleteCookie('userData')

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

      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        console.error('Error logging out @ Handle Logout', error)
      }

      // Pass error message to rejectWithValue
      return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred')
    }
  }
)

// ** HANDLE AUTO LOGIN
export const handleAutoLogin = createAsyncThunk(
  'auth/handleAutoLogin',
  async (_, { rejectWithValue }) => {
    try {
      // Start Progress bar
      BProgress.start()

      const response = await axiosRequest.get('/set-cookie')
      const userData = response.data

      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        if (!userData) console.log('No userData found in cookies')

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

      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        Toast.fire({
          icon: 'error',
          title: 'Auto Authentication',
          text: `${error instanceof Error ? error.message : 'An error occurred - Auto Auth'}`,
        })
        console.log('Error fetching patron data - handleAutoLogin', error)
      }

      // Pass error message to rejectWithValue
      return rejectWithValue(
        error instanceof Error ? error.message : 'An unknown error occurred in auto login'
      )
    }
  }
)

interface PatronFormInputType {
  email: string
  password: string
  username: string
}

// ** REGISTER NEW USER WITH EMAIL AND PASSWORD
export const handleRegisterPatron = createAsyncThunk(
  'auth/handleRegisterPatron',
  async (userData: PatronFormInputType, { rejectWithValue }) => {
    const { email, password, username } = userData

    // VALIDATION
    if (!username) {
      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        console.log('Username is required to sign up')
      }
      throw new Error('Username is required to sign up user')
    }

    // Log out user from firebase if logged in
    logoutFirebase()
    try {
      // Start Progress bar
      BProgress.start()

      const response = await createUserWithEmailAndPassword(auth, email, password)
      const responseData = response.user

      const { uid: patronId, photoURL } = responseData
      const accessToken = await responseData.getIdToken()
      const refreshToken = responseData.refreshToken
      const { lastSignInTime } = responseData.metadata

      const role = 'patron'
      const firstname = ''
      const lastname = ''
      const fullname = ''
      const address = ''
      const contact = ''

      const avatar = photoURL ? photoURL : ''

      const patronCredentialsForDB = {
        id: patronId,
        username,
        email,
        avatar,
        lastSignInTime,
        role,
      }

      // ** Write Data to Mongo DB
      await axiosRequest.post('/patrons/signup', patronCredentialsForDB)

      const patronCredentials: PatronWebType = {
        id: patronId,
        firstname,
        fullname,
        lastname,
        address,
        contact,
        username,
        email,
        role,
        avatar: avatar ?? defaultAvatar,
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
        text: `Welcome ${capitalize(username)}`,
      })

      // Set UserData as cookie
      await setCookie('userData', patronCredentials)

      return patronCredentials
    } catch (error) {
      // End Progress bar
      BProgress.done()

      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        // Error Toast
        Toast.fire({
          icon: 'error',
          title: 'Signed up',
          text: `${error instanceof Error ? error.message : 'Sign up unsuccessful!'}`,
        })
      }

      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        if (error instanceof Error) {
          console.log('patron sign up error message:', error.message)
        } else {
          console.log('Error creating new patron account', error)
        }
      }
      // Pass error message to rejectWithValue
      return rejectWithValue(
        error instanceof Error ? error.message : 'An unknown error occurred signing up'
      )
    }
  }
)

// ** GOOGLE AUTH SIGN UP
export const handleGoogleAuthentication = createAsyncThunk(
  'auth/handleGoogleAuthentication',
  async (_, { rejectWithValue }) => {
    // Log out user from firebase if logged in
    logoutFirebase()
    try {
      // Start Progress bar
      BProgress.start()

      // SignIn with google
      const response = await signInWithPopup(auth, googleProvider)
      const responseData = response.user

      const { uid: patronId, email, photoURL, displayName, metadata } = responseData

      // CreatedAt and lastLoginAt is available in metadata as timestamps
      // If the createdAt timestamp has a diference of 1min with the lastLoginAt
      // User is now be registering
      const creationTime = metadata.creationTime
      const lastSignInTime = metadata.lastSignInTime
      const isNewUser: boolean = isWithinOneMinute(creationTime, lastSignInTime)
      const accessToken = await responseData.getIdToken()
      const refreshToken = responseData.refreshToken

      if (!email) throw new Error('Email not found in google auth')

      const role = 'patron'
      const firstname = ''
      const lastname = ''
      const fullname = ''
      const address = ''
      const contact = ''

      const avatar = photoURL ? photoURL : ''

      // Additional data for Google Auth
      const username = displayName ?? splitEmail(email)

      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        console.log('--------------EMAIL IN USE ----------')
        console.log('isNewUser', isNewUser)
        console.log('--------------EMAIL IN USE ----------')
      }

      if (isNewUser) {
        const patronCredentialsForDB = {
          id: patronId,
          username,
          email,
          avatar,
          lastSignInTime,
          role,
          googleAuth: true,
        }

        // ✅ Email is NOT in use — Proceed to save user data to MongoDB
        await axiosRequest.post('/patrons/signup', patronCredentialsForDB)
      }

      const patronCredentials: PatronWebType = {
        id: patronId,
        firstname,
        fullname,
        lastname,
        address,
        contact,
        username,
        email,
        role,
        avatar: avatar ?? defaultAvatar,
        onlineStatus: true,
        verified: true,
        type: 'google',
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
      const title = isNewUser ? 'Google Sign Up Successful!' : 'Google Log In Successful!'
      const text = `Welcome ${
        isNewUser ? capitalize(username ?? 'patron') : `back ${capitalize(username ?? 'patron')}`
      }`

      // Success Toast
      Toast.fire({
        icon: 'success',
        title,
        text,
      })

      // Set UserData as cookie
      await setCookie('userData', patronCredentials)

      return patronCredentials
    } catch (error) {
      // End Progress bar
      BProgress.done()

      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        // Error Toast
        Toast.fire({
          icon: 'error',
          title: 'Signed up',
          text: `${error instanceof Error ? error.message : 'Sign up unsuccessful!'}`,
        })
      }

      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        if (error instanceof Error) {
          console.log('patron sign up error message:', error.message)
        } else {
          console.log('Error creating new patron account', error)
        }
      }
      // Pass error message to rejectWithValue
      return rejectWithValue(
        error instanceof Error ? error.message : 'An unknown error occurred signing up'
      )
    }
  }
)

export const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    data: {} as PatronWebType | null,
    isLoggedIn: false,
    pending: false,
  },
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
    updateUser: (state, action) => {
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
      }
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

      // ** Google Auth
      .addCase(handleGoogleAuthentication.rejected, (state) => {
        state.pending = false
      })
      .addCase(handleGoogleAuthentication.pending, (state) => {
        state.pending = true
      })
      .addCase(handleGoogleAuthentication.fulfilled, (state, action) => {
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

export const { handleLogoutReducer, setAuthNotPending, setAuthPending, updateUser } =
  authSlice.actions

export default authSlice.reducer
