import connectMongoDB from '@/libs/mongodb'
import Patron from '@/models/patron.model'
import { NextRequest, NextResponse } from 'next/server'

// ** POST
export async function POST(request: NextRequest) {
  try {
    // Get the patron data from the request body
    const patronData = await request.json()

    const {
      id,
      email,
      username,
      password,
      avatar,
      lastSignInTime = new Date().toISOString(),
      firstname = '',
      lastname = '',
      fullname = '',
      address = '',
      contact = null,
    } = patronData

    // Check if the required fields are provided
    if (!email || !password || !username) {
      return NextResponse.json(
        { message: 'Email, Password and Username are required' },
        { status: 400 }
      )
    }

    // Connect to MongoDB
    await connectMongoDB()

    const role = 'patron'

    const newPatronDataObj = {
      id,
      email,
      firstname,
      lastname,
      username,
      fullname,
      address,
      contact,
      role,
      avatar,
      password,
      verified: false,
      suspended: false,
      lastSignInTime,
      onlineStatus: true,
    }

    await Patron.create(newPatronDataObj)

    // Return the new user
    return new Response(JSON.stringify({ message: 'User sign up successful!' }), {
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
