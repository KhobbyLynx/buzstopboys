import connectMongoDB from '@/libs/mongodb'
import Patron from '@/models/patron.model'
import { generateRandomPassword } from '@/utils/utils'
import { NextRequest, NextResponse } from 'next/server'

import admin from 'firebase-admin'

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

//** POST - Create Patron */
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

//** PATCH  */
export async function PATCH(request: NextRequest) {
  try {
    // Get the ID from the request query (if provided)
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    // Check if the patron ID is provided
    if (!id) {
      return NextResponse.json({ message: 'Patron ID is required' }, { status: 400 })
    }

    // Validate the request body
    const { suspended } = await request.json()

    // Initialize firebase admin sdk
    const auth = await getAdminAuth()

    if (suspended) {
      await auth.updateUser(id, { disabled: true })
    } else {
      await auth.updateUser(id, { disabled: false })
    }

    // Connect to MongoDB
    await connectMongoDB()

    // Update the patron
    const patron = await Patron.findOneAndUpdate(
      { id },
      { $set: { suspended } },
      { new: true } // return the updated document
    )
    console.log(patron)

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

//** DELETE  */
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

//** PUT  */
export async function PUT(request: NextRequest) {
  try {
    // Get the ID from the request query (if provided)
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    // Check if the patron ID is provided
    if (!id) {
      return NextResponse.json({ message: 'Patron ID is required' }, { status: 400 })
    }

    // Validate the request body
    const { firstname, lastname, contact, role, lastSignInTime, onlineStatus } =
      await request.json()

    // Connect to MongoDB
    await connectMongoDB()

    // Update the patron
    const patron = await Patron.findOneAndUpdate(
      { id },
      { $set: { firstname, lastname, contact, role, lastSignInTime, onlineStatus } },
      { new: true } // return the updated document
    )
    console.log(patron)

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

//** GET All or Single PATRON */
export async function GET(request: NextRequest) {
  try {
    // Connect to MongoDB
    await connectMongoDB()

    // Get the ID from the request query (if provided)
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (id) {
      // Fetch a single patron by ID
      const patron = await Patron.findOne({ id })

      if (!patron) {
        return new Response(JSON.stringify({ message: 'Patron not found' }), {
          status: 404,
          headers: {
            'content-type': 'application/json',
          },
        })
      }

      // Return the single patron
      return new Response(JSON.stringify(patron), {
        headers: {
          'content-type': 'application/json',
        },
        status: 200,
      })
    }

    // Fetch all patrons if no ID is provided
    const patrons = await Patron.find()

    // Return all patrons
    return new Response(JSON.stringify(patrons), {
      headers: {
        'content-type': 'application/json',
      },
      status: 200,
    })
  } catch (error: any) {
    console.error('Error fetching patrons:', error)
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: {
        'content-type': 'application/json',
      },
    })
  }
}
