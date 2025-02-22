import { auth } from "@/configs/firebase";
import { PatronMDBType } from "@/types/patron";
import axiosRequest from "@/utils/axiosRequest";
import { Toast } from "@/utils/toast";
import { splitEmail } from "@/utils/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "firebase/auth";

// ** GET ALL USERS
interface PatronsPayload {
    users: PatronMDBType[];
    usersCount: number;
    adminsCount: number;
    patronsCount: number;
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
                patronsCount: patrons.length
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
            await axiosRequest.delete(`/patrons?id=${userId}`)
            return userId
        } catch (error) {
            console.log('Error Deleting User', error)
            return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred')
        }
    }
)

// ** SUSPEND USER
export const suspendUser = createAsyncThunk(
    'patrons/suspendUser',
    async (userId: string, { rejectWithValue }) => {
        try {
            const updatePatronInfo = await axiosRequest.patch(`/patrons?id=${userId}`, {
              suspended: true,
            })
            
            return updatePatronInfo
        } catch (error) {
            console.log('Error Suspending User', error)
            return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred')
        }
    }
)

// ** REINSTATE USER
export const reinstateUser = createAsyncThunk(
    'patrons/reinstate',
    async (userId: string, { rejectWithValue }) => {
        try {
            const updatePatronInfo = await axiosRequest.patch(`/patrons?id=${userId}`, {
                suspended: false,
              })

            return updatePatronInfo
        } catch (error) {
            console.log('Error Reinstating User', error)
            return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred')
        }
    }
)


interface AddPatronType {
    email: string
    password: string
    address?: string, 
    lastname?: string, 
    firstname?: string,
    username?: string,
    contact?: number | undefined, 
    role?: string, 
    avatar?: string
}

// ** ADMIN REGISTER NEW USER
export const handleAdminRegisterPatron = createAsyncThunk(
    'buzStopBoys/handleAdminRegisterPatron',
    async (userData: AddPatronType, { rejectWithValue }) => {
      const { email, password, username: nameEntered, firstname='', address='', lastname='', contact='', role: roleSelected, avatar: profileImg } = userData
      try {
        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        )
        const patronCredentials = response.user
  
        const { email: authEmail, uid: patronId, photoURL, displayName } = patronCredentials
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
  
        console.log('ADMIN: New Patron Created', MDBCreatePatron)
  
        // Success Toast
        Toast.fire({
          icon: "success",
          title: "Patron created successfully",
          text: `Role: ${role}`
        });
  
        return MDBCreatePatron.data
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
        .addCase(deleteUser.pending, (state) => {
            state.pending = true
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
            state.users = state.users.filter((u) => u.id !== action.payload)
            state.numberOfUsers - 1
            state.numberOfAdmins = state.users.filter((u) => u.role === 'admin').length
            state.numberOfPatrons = state.users.filter((u) => u.role === 'patron').length  
            state.pending = false 
        })

        // ** Suspend User
        .addCase(suspendUser.pending, (state) => {
            state.pending = true
        })
        .addCase(suspendUser.fulfilled, (state, action) => {
            state.users = state.users.map((u) => u.id === action.payload.data.id ? action.payload.data : u)
            state.pending = false
        })

        // ** Reinstate User
        .addCase(reinstateUser.pending, (state) => {
            state.pending = true
        })
        .addCase(reinstateUser.fulfilled, (state, action) => {
            state.users = state.users.map((u) => u.id === action.payload.data.id ? action.payload.data : u)
            state.pending = false
        })

        // ** Admin Register Patron
        .addCase(handleAdminRegisterPatron.pending, (state) => {
            state.pending = true
        })
        .addCase(handleAdminRegisterPatron.fulfilled, (state, action) => {
            state.users.push(action.payload)
            state.numberOfUsers + 1 
            if(action.payload.role === 'admin') {
                state.numberOfAdmins + 1
            } else {
                state.numberOfPatrons + 1
            }
            state.pending = false
        })
    }
})

export default patronSlice.reducer