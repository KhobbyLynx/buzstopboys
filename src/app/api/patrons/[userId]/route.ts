import connectMongoDB from '@/libs/mongodb'
import Patron from '@/models/patron.model'
import { NextRequest } from 'next/server'

// ** GET
export async function GET(request: NextRequest, context: { params: Promise<{ userId: string }> }) {
  try {
    const { userId } = await context.params // Await params
    // Connect to MongoDB
    await connectMongoDB()

    // Fetch by ID (Single Patron)
    // With .lean(), results are simple JavaScript objects, making queries faster and consuming less memory.
    const patron = await Patron.findOne({ id: userId }, { _id: 0, __v: 0 }).lean()

    if (!patron) {
      return new Response(JSON.stringify({ message: 'Patron not found' }), {
        status: 404,
        headers: { 'content-type': 'application/json' },
      })
    }

    return new Response(JSON.stringify(patron), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    })
  } catch (error: any) {
    console.error('Error fetching patron by ID:', error)
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    })
  }
}
