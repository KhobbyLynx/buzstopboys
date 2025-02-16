'use client'
// ** Redux Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// ** Axios
import axiosRequest from '@/utils/axiosRequest'

// ** UseJWT import to get config
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, db, googleProvider } from '../configs/firebase'

// ** Default Avatar
// import DefaultAvatar from '/images/avatars/avatar-blank.png'

// ** Utils
import {  logoutFirebase, splitEmail } from '@/utils/utils'

// ** Toast
import { Toast } from '@/utils/toast'
import { PatronWebType } from '@/types/patron'
import { setCookie, deleteCookie } from '@/utils/setCookie'

interface PatronType {
    email: string
    password: string
    address?: string, 
    lastname?: string, 
    firstname?: string,
    username?: string ,
    contact?: number, 
    role?: string, 
    avatar?: string
}

interface AutoLoginDataType {
  id: string
  accessToken: string
  refreshToken: string
  lastSignInTime: string
}

// ** HANDLE LOGIN
export const handleLoginPatron = createAsyncThunk('auth/handleLoginPatron',
  async (patronData: PatronType, { rejectWithValue }) => {
    const { email, password } = patronData

    try {
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

      console.log('patronInfo', patronInfo)

      const patronDataObj: PatronWebType = {
        id: patronInfo.id, 
        fullname: patronInfo.fullname,
    firstname: patronInfo.firstname,
    lastname: patronInfo.lastname ,
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
        accessToken
    }    
      }

      // Success Toast
      Toast.fire({
        icon: "success",
        title: "Signed in successfully",
        text: `Welcome back, ${patronInfo.username}`
      });

      // Set UserData as cookie
    setCookie('userData', patronDataObj)
      
      return patronDataObj
      
    } catch (error) {
      // Error Toast
      Toast.fire({
        icon: "error",
        title: `${error instanceof Error ? error.message : 'An unknown error occurred'}`
      });

      if (error instanceof Error) {
        console.log('Error Signing in account', error.message)
      } else {
        console.log('Error Signing in account', error)
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
>(
  'auth/handleLogout',
  async (patronId, { rejectWithValue }) => {
    try {
      await axiosRequest.put(`/patrons?id=${patronId}`, {
        onlineStatus: false,
      });

      // Delete User Data Cookie 
      deleteCookie('userData')
    } catch (error) {
      console.error('Error Logging Out - HANDLE LOGOUT', error);
      // Pass error message to rejectWithValue
      return rejectWithValue(
        error instanceof Error ? error.message : 'An unknown error occurred'
      );
    }
  }
);

// ** HANDLE AUTO LOGIN
export const handleAutoLogin = createAsyncThunk(
  'auth/handleAutoLogin',
  async (_, { rejectWithValue }) => {
    try {

    const response = await axiosRequest.get('/set-cookie')
    const userData = response.data

      if (!userData) {
        throw new Error("No userData found in cookies");
      }

      console.log('userData @ auto handle log', userData)
      // Return the patron data object to update the state
      return userData;
    } catch (error) {
      console.error('Error fetching patron data - HANDLELOGIN', error);
       // Pass error message to rejectWithValue
       return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred')
    }
  }
);

// ** REGISTER NEW USER
export const handleRegisterPatron = createAsyncThunk(
  'buzStopBoys/handleRegisterPatron',
  async (userData: PatronType, { rejectWithValue }) => {
    const { email, password, username: nameEntered, firstname='', address='', lastname='', contact='', role: roleSelected, avatar: profileImg } = userData
    logoutFirebase()
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const patronCredentials = response.user

      const { email: authEmail, uid: patronId, photoURL, displayName } = patronCredentials
      const accessToken = await patronCredentials.getIdToken()
      const refreshToken = patronCredentials.refreshToken
      const { lastSignInTime } = patronCredentials.metadata
      const name = splitEmail(authEmail)
      const username = nameEntered? nameEntered : displayName ? displayName : name

      const avatar = profileImg ? profileImg : photoURL ? photoURL : ''
      const role = roleSelected ? roleSelected : 'patron'
      const combineName = `${firstname} ${lastname}`
      const fullname = combineName? combineName : ""

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
      const MDBCreatePatron = await axiosRequest.post('/patrons', newPatronDataObj)

      console.log('New Patron Created', MDBCreatePatron)

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
        accessToken
    }    
      }

      // Success Toast
      Toast.fire({
        icon: "success",
        title: "Signed up successfully",
        text: `Welcome ${username}`
      });

      // Set UserData as cookie
      setCookie('userData', patronDataObj)

      return patronDataObj
    } catch (error) {

      if (error instanceof Error) {
        console.log('Error creating new patron account', error.message)
      } else {
        console.log('Error creating new patron account', error)
      }
      // Pass error message to rejectWithValue
      return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred')
    }
  }
)

const initialState: { data: PatronWebType | null, isLoggedIn: boolean } = {
  data: null,
  isLoggedIn: false
};

export const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    handleLogoutReducer: (state) => {
      state.data = null
        state.isLoggedIn = false
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(handleRegisterPatron.fulfilled, (state, action) => {
      console.log('PAYLOAD handleRegisterPatron', action.payload)

      // Update state immutably
      return {
        ...state,
        data: action.payload,
        isLoggedIn: true
      };
      })
      .addCase(handleLoginPatron.fulfilled, (state, action) => {

        // Update state immutably
        return {
          ...state,
          data: action.payload,
          isLoggedIn: true
        };
      })
      .addCase(handleAutoLogin.fulfilled, (state, action) => {
        state.data = action.payload
        state.isLoggedIn = true
      })
      .addCase(handleLogout.fulfilled, (state) => {
        state.data = null
        state.isLoggedIn = false
      })
  },
})

export const { handleLogoutReducer } = authSlice.actions

export default authSlice.reducer
