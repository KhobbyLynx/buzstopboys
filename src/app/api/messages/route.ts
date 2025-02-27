import connectMongoDB from '@/libs/mongodb'
import Message from '@/models/messages.model'
import { MessageDBType } from '@/types/messages'
import { generateRandomId } from '@/utils/utils'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Connect to MongoDB
    await connectMongoDB()

    // Fetch all messages
    const messages = await Message.find()

    // Return the messages
    return new Response(JSON.stringify(messages), {
      headers: {
        'content-type': 'application/json',
      },
      status: 200,
    })
  } catch (error: any) {
    console.error('Error fetching messages:', error)
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: {
        'content-type': 'application/json',
      },
    })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get the message data from the request body
    const data = await request.json()
    const { senderInfo } = data
    const { email, firstname } = senderInfo

    if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
      console.log('Create Message data', data)
    }

    // Check if the required fields are provided
    if (!email || !firstname) {
      return new Response(JSON.stringify({ message: 'First Name and Email are required' }), {
        status: 400,
        headers: {
          'content-type': 'application/json',
        },
      })
    }

    // Generate Random Id
    const id = generateRandomId()

    // Connect to MongoDB
    await connectMongoDB()

    const dbRequiredData: MessageDBType = {
      id,
      ...data,
      status: 'sent',
    }

    // Create a new message
    const createdMessage = await Message.create(dbRequiredData)

    // Return the new message
    return new Response(JSON.stringify(createdMessage), {
      headers: {
        'content-type': 'application/json',
      },
      status: 201,
    })
  } catch (error: any) {
    console.error('Error creating new message:', error)
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: {
        'content-type': 'application/json',
      },
    })
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Get the message data from the request body
    const data = await request.json()
    const { id, email, firstname } = data

    // Check if the required fields are provided
    if (!id || !email || !firstname) {
      return new Response(
        JSON.stringify({ message: 'MessageId, First Name and Email are required' }),
        {
          status: 400,
          headers: {
            'content-type': 'application/json',
          },
        }
      )
    }

    // Connect to MongoDB
    await connectMongoDB()

    // Find the message by ID and update it
    const updatedMessage = await Message.findOneAndUpdate({ id }, { $set: data }, { new: true })

    // Return the updated message
    return new Response(JSON.stringify(updatedMessage), {
      headers: {
        'content-type': 'application/json',
      },
      status: 200,
    })
  } catch (error: any) {
    console.error('Error updating message:', error)
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: {
        'content-type': 'application/json',
      },
    })
  }
}

// DELETE
export async function DELETE(request: NextRequest) {
  try {
    // Get the message ID from the query parameters
    const id = request.nextUrl.searchParams.get('id')

    // Check if the message ID is provided
    if (!id) {
      return new Response(JSON.stringify({ message: 'Message ID is required' }), {
        status: 400,
        headers: {
          'content-type': 'application/json',
        },
      })
    }

    // Connect to MongoDB
    await connectMongoDB()

    // Delete the message
    await Message.findOneAndDelete({ id })

    // Return a success response
    return new Response(JSON.stringify({ message: 'Message deleted successfully!' }), {
      headers: {
        'content-type': 'application/json',
      },
      status: 200,
    })
  } catch (error: any) {
    console.error('Error deleting message:', error)
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: {
        'content-type': 'application/json',
      },
    })
  }
}
