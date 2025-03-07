import connectMongoDB from '@/libs/mongodb'
import Patron from '@/models/patron.model'
import { verifyBeforeUpdateEmail } from 'firebase/auth'
import { NextRequest, NextResponse } from 'next/server'

// ** POST
export async function POST(request: NextRequest) {
  try {
    // Get the patron data from the request body
    const patronData = await request.json()

    const { id, email, username, avatar, lastSignInTime, role, googleAuth = false } = patronData

    // Check if the required fields are provided
    if (!id || !email || !username || !role) {
      return NextResponse.json(
        { message: 'User Id, email, username and role are required' },
        { status: 400 }
      )
    }

    let verified = false
    let type = 'patron'

    if (googleAuth) {
      verified = true
      type = 'google'
    }

    // Connect to MongoDB
    await connectMongoDB()

    const newPatron = {
      id,
      email,
      username,
      role,
      avatar,
      lastSignInTime,
      verified,
      onlineStatus: true,
      type,
    }

    await Patron.create(newPatron)

    // Return the new user
    return new Response(JSON.stringify({ message: 'User sign up successful!' }), {
      headers: {
        'content-type': 'application/json',
      },
      status: 201,
    })
  } catch (error: any) {
    if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
      console.log('sign up error:', error)
    }

    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    })
  }
}
