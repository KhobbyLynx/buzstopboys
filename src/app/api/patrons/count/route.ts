import connectMongoDB from '@/libs/mongodb'
import Patron from '@/models/patron.model'
import { NextRequest } from 'next/server'

// ** GET
export async function GET(request: NextRequest) {
  try {
    // Connect to MongoDB
    await connectMongoDB()

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

    // If there are filters, return the count for the filtered query
    if (Object.keys(query).length > 0) {
      const queryCount = await Patron.countDocuments(query)
      return new Response(JSON.stringify({ queryCount, query: true }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      })
    }

    // Fetch all counts when no specific query is provided
    const [
      totalUsers,
      totalAdmins,
      totalPatrons,
      totalVerifiedUsers,
      totalOnlineUsers,
      totalVerifiedOnlineUsers,
    ] = await Promise.all([
      Patron.countDocuments(),
      Patron.countDocuments({ role: 'admin' }),
      Patron.countDocuments({ role: 'patron' }),
      Patron.countDocuments({ verified: true }),
      Patron.countDocuments({ onlineStatus: true }),
      Patron.countDocuments({ verified: true, onlineStatus: true }),
    ])

    const count = {
      totalUsers,
      totalAdmins,
      totalPatrons,
      totalVerifiedUsers,
      totalOnlineUsers,
      totalVerifiedOnlineUsers,
    }

    return new Response(JSON.stringify({ count, query: false }), {
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
