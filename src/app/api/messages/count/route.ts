import connectMongoDB from '@/libs/mongodb'
import Message from '@/models/messages.model'
import { NextRequest } from 'next/server'

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

    // Connect to MongoDB
    await connectMongoDB()

    // If there are filters, return the count for the filtered query
    if (Object.keys(query).length > 0) {
      const queryCount = await Message.countDocuments(query)
      return new Response(JSON.stringify({ queryCount, query: true }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      })
    }

    // Fetch all counts when no specific query is provided
    const [
      totalMessages,
      totalUnreadMessagesByAdmin,
      totalUnreadMessagesByPatron,
      totalAdminMessagesUndelivered,
      totalAdminMessagesUnread,
      totalMessagesFromUnregisteredUsers,
      totalMessagesFromContactForm,
    ] = await Promise.all([
      Message.countDocuments(),
      Message.countDocuments({
        senderStatus: { $in: ['patron', 'unregistered'] },
        status: { $in: ['sent', 'delivered'] },
      }),
      Message.countDocuments({
        senderStatus: 'admin',
        status: { $in: ['sent', 'delivered'] },
      }),
      Message.countDocuments({
        senderStatus: 'admin',
        status: 'sent',
      }),
      Message.countDocuments({
        senderStatus: 'admin',
        status: { $in: ['sent', 'delivered'] },
      }),
      Message.countDocuments({ senderStatus: 'unregistered' }),
      Message.countDocuments({ source: 'contact' }),
    ])

    const count = {
      totalMessages,
      totalUnreadMessagesByAdmin,
      totalUnreadMessagesByPatron,
      totalAdminMessagesUndelivered,
      totalAdminMessagesUnread,
      totalMessagesFromUnregisteredUsers,
      totalMessagesFromContactForm,
    }

    return new Response(JSON.stringify({ count, query: false }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    })
  } catch (error: any) {
    console.error('Error fetching messages count:', error)
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    })
  }
}
