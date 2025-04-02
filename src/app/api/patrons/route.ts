import connectMongoDB from '@/libs/mongodb'
import Patron from '@/models/patron.model'
import { emailRegex, generateRandomPassword } from '@/utils/utils'
import { NextRequest, NextResponse } from 'next/server'

import admin from 'firebase-admin'

// INITIALIZE ADMIN
const getAdminAuth = async () => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      }),
    })
  }

  // Get Firebase Auth instance
  const auth = admin.auth()

  return auth
}

// ** POST
export async function POST(request: NextRequest) {
  try {
    // Get the patron data from the request body
    const patronData = await request.json()

    const {
      email,
      username,
      firstname = '',
      address = '',
      lastname = '',
      contact = '',
      avatar = '',
      role: roleSelected,
      emailVerified = true, // no such data comes from the form - Update later to include
    } = patronData

    // Check if the required fields are provided
    if (!email || !username) {
      return NextResponse.json(
        { message: 'Email, Password and Username are required' },
        { status: 400 }
      )
    }

    // Connect to MongoDB
    await connectMongoDB()

    const password = generateRandomPassword()

    // Initialize firebase admin sdk
    const auth = await getAdminAuth()

    const patronCredentials = await auth.createUser({
      email,
      emailVerified,
      password,
    })

    const { uid, disabled } = patronCredentials

    const role = roleSelected ? roleSelected : 'patron'
    const combineName = `${firstname} ${lastname}`
    const fullname = combineName ? combineName : ''

    const newPatronDataObj = {
      id: uid,
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
      verified: emailVerified,
      suspended: disabled,
      onlineStatus: false,
      lastSignInTime: null,
    }

    const newPatron = await Patron.create(newPatronDataObj)

    // Return the new user
    return new Response(JSON.stringify(newPatron), {
      headers: {
        'content-type': 'application/json',
      },
      status: 201,
    })
  } catch (error: any) {
    if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
      console.log('Error creating user', error)
    }

    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    })
  }
}

// ** PATCH
export async function PATCH(request: NextRequest) {
  try {
    // Get the ID from the request query (if provided)
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    // Check if the patron ID is provided
    if (!id) {
      return NextResponse.json({ message: 'Patron ID is required' }, { status: 400 })
    }

    // Request Body
    const data = await request.json()
    const { suspended, onlineStatus, lastSignInTime } = data

    // Initialize firebase admin sdk
    const auth = await getAdminAuth()

    if (suspended) {
      // Suspend user
      await auth.updateUser(id, { disabled: true })

      // Log out user from firebase
      await auth.revokeRefreshTokens(id)
    } else {
      // Reinstate user
      await auth.updateUser(id, { disabled: false })
    }

    // if updating the online status onlineStataus will be defined
    // if the onlineStatus is not defined set to false
    const setOnlineStatus = onlineStatus ? onlineStatus : false

    // Connect to MongoDB
    await connectMongoDB()

    // Update the patron
    const patron = await Patron.findOneAndUpdate(
      { id },
      { $set: { suspended, onlineStatus: setOnlineStatus, lastSignInTime } },
      { new: true, projection: { _id: 0, __v: 0 } } // return the updated document
    )

    // Return a success response
    return NextResponse.json(patron, {
      headers: {
        'content-type': 'application/json',
      },
      status: 200,
    })
  } catch (error: any) {
    console.error('Error updating patron:', error)
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    })
  }
}

// ** DELETE
export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id')

    // Check if the patron ID is provided
    if (!id) {
      return NextResponse.json({ message: 'Patron ID is required' }, { status: 400 })
    }

    // Initialize firebase admin sdk
    const auth = await getAdminAuth()

    // Delete the patron from Firebase
    await auth.deleteUser(id)

    // Connect to MongoDB
    await connectMongoDB()

    // Delete the patron from MongoDB
    const deletedPatron = await Patron.findOneAndDelete({ id })

    if (!deletedPatron) {
      return NextResponse.json({ message: 'Patron not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Patron Deleted' }, { status: 200 })
  } catch (error: any) {
    console.error('Error deleting patron:', error)
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}

// ** PUT
export async function PUT(request: NextRequest) {
  try {
    // Get the ID from the request query (if provided)
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    // Check if the patron ID is provided
    if (!id) {
      return NextResponse.json({ message: 'User Id is required' }, { status: 400 })
    }

    // Request body
    const data = await request.json()
    console.log('------------------------INSIDE----------------------')
    console.log('--------', data)
    console.log('--------', id)
    console.log('----------------------------------------------')
    const {
      firstname,
      lastname,
      contact,
      role,
      lastSignInTime,
      onlineStatus,
      email,
      address,
      fullname,
      username,
      avatar,
    } = data

    if (email) {
      if (emailRegex.test(email)) {
        // Initialize firebase admin sdk
        const auth = await getAdminAuth()

        // update email in firebase
        await auth.updateUser(id, { email })
      } else {
        return NextResponse.json({ message: 'Invalid email format' }, { status: 400 })
      }
    }

    // Connect to MongoDB
    await connectMongoDB()

    // Update the patron
    const patron = await Patron.findOneAndUpdate(
      { id },
      {
        $set: {
          firstname,
          lastname,
          contact,
          role,
          lastSignInTime,
          onlineStatus,
          email,
          address,
          fullname,
          username,
          avatar,
        },
      },
      { new: true, projection: { _id: 0, __v: 0 } } // return the updated document
    )

    // Return a success response
    return NextResponse.json(patron, {
      headers: {
        'content-type': 'application/json',
      },
      status: 200,
    })
  } catch (error: any) {
    console.error('Error updating patron:', error)
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    })
  }
}

// ** GET
export async function GET(request: NextRequest) {
  try {
    // Extract query parameters
    const { searchParams } = new URL(request.url)

    // Prepare query object dynamically
    const query: Record<string, any> = {}

    // Helper: Build query with dynamic filters
    searchParams.forEach((value, key) => {
      if (['username', 'email', 'contact'].includes(key)) {
        query[key] = { $regex: value, $options: 'i' } // Case-insensitive search
      } else if (key === 'verified' || key === 'onlineStatus') {
        query[key] = value === 'true'
      } else {
        query[key] = value
      }
    })

    // Extract pagination parameters
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '20', 10)
    const skip = (page - 1) * limit

    // Projection for optimized data retrieval
    const patronProjection = {
      id: 1,
      username: 1,
      email: 1,
      contact: 1,
      role: 1,
      verified: 1,
      onlineStatus: 1,
      avatar: 1,
    }

    // Connect to MongoDB
    await connectMongoDB()

    // Fetch All Patrons with dynamic filters
    // With .lean(), results are simple JavaScript objects, making queries faster and consuming less memory.
    const patrons = await Patron.find(query, patronProjection).skip(skip).limit(limit).lean()

    // Get the count of matching patrons
    // Get the count of all users if query is an empty object
    const fetchCount = await Patron.countDocuments(query).lean()

    const returnedData = {
      users: patrons,
      fetchCount,
      currentPage: page,
      totalPages: Math.ceil(fetchCount / limit),
    }

    return new Response(JSON.stringify(returnedData), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    })
  } catch (error: any) {
    console.error('Error fetching patrons:', error)
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    })
  }
}
