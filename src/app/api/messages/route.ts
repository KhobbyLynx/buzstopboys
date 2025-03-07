import connectMongoDB from '@/libs/mongodb'
import Message from '@/models/messages.model'
import { MessageDBType } from '@/types/messages'
import { generateRandomId } from '@/utils/utils'
import { NextRequest } from 'next/server'

// ** GET
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Dynamic query object
    const query: Record<string, any> = {}

    // Helper: Build query with dynamic filters
    searchParams.forEach((value, key) => {
      if (['senderId', 'receiverId', 'title', 'content'].includes(key)) {
        query[key] = { $regex: value, $options: 'i' } // Case-insensitive search
      } else if (key === 'status') {
        query[key] = value as MessageDBType['status']
      } else if (key === 'source') {
        query[key] = value as MessageDBType['source']
      } else if (key === 'isEdited') {
        query['isEdited.status'] = value === 'true'
      } else if (key === 'page' || key === 'limit') {
        return // Skip pagination keys
      } else {
        query[key] = value
      }
    })

    const pageParam = searchParams.get('page')
    const limitParam = searchParams.get('limit')

    // Set pagination or fetch all
    const page = pageParam ? Math.max(parseInt(pageParam, 10), 1) : null
    const limit = limitParam ? Math.max(parseInt(limitParam, 10), 1) : null
    const skip = page && limit ? (page - 1) * limit : 0

    const messageProjection = {
      id: 1,
      title: 1,
      senderStatus: 1,
      content: 1,
      source: 1,
      status: 1,
      createdAt: 1,
    }

    await connectMongoDB()

    // Fetch message count for pagination
    const fetchCount = await Message.countDocuments(query).lean()

    // Fetch messages in chunks using a cursor
    const messages: any[] = []
    const cursor = Message.find(query, messageProjection)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit ?? fetchCount) // All if limit is not provided
      .lean()
      .cursor()

    // Process in chunks of 100
    const chunkSize = 100
    let chunk: any[] = []
    for await (const doc of cursor) {
      chunk.push(doc)
      if (chunk.length === chunkSize) {
        messages.push(...chunk)
        chunk = [] // Reset chunk
      }
    }

    // Push any remaining chunk
    if (chunk.length) {
      messages.push(...chunk)
    }

    const returnedData = {
      messages,
      fetchCount,
      currentPage: page,
      totalPages: Math.ceil(fetchCount / (limit ?? fetchCount)),
    }

    return new Response(JSON.stringify(returnedData), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    })
  } catch (error: any) {
    console.error('Error fetching messages:', error)
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    })
  }
}

export async function POST(request: NextRequest) {
  //  DATA STRUCTURE IS ORGANISED IN THE FORM
  // DIFFERENT FORMS SUBMIT DATA WIHT DIFFIRENT DATA STRUCTURE

  // CONTACT FORM
  // senderId = isLoggedIn && data ? data.id : null
  // senderStatus: SenderStatusType = isLoggedIn && data ? 'patron' : 'unregistered'
  // senderInfo = {
  //   firstname,
  //   lastname,
  //   fullname, from volunteer form
  //   email,
  //   contact,
  // }
  // source: MessageSource = 'contact'

  //  dataStructure = {
  //   senderId,
  //   senderStatus,
  //   senderInfo,
  //   source,
  //   title: formData.title,
  //   content: formData.message,
  // }

  // ADMIN & PATRON SEND MESSAGE FORM - REGISTERED USER
  // senderId = data.id
  // senderStatus: SenderStatusType = 'admin' | 'patron'
  // source: MessageSource = 'inbox'

  //  dataStructure = {
  //   senderId,
  //   senderStatus,
  //   source,
  //   title: formData.title,
  //   content: formData.content,
  //   receiverId, -------- NO RECEIVER ID WHEN SENDER IS PATRON --------
  // }

  try {
    // Get the message data from the request body
    const data = await request.json()
    const { receiverId, content, title, senderStatus, senderInfo, senderId } = data

    if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
      console.log('Create Message data', data)
    }

    // ** VALIDATION
    // Check if the required fields are provided
    if (!content || !title) {
      return new Response(JSON.stringify({ message: 'Title/Interest and message are required' }), {
        status: 400,
        headers: {
          'content-type': 'application/json',
        },
      })
    }

    let email
    let firstname

    // Check if the other required fields are provided according to sender status
    if (senderStatus === 'admin') {
      // If sender is admin
      if (!receiverId || !senderId) {
        return new Response(JSON.stringify({ message: 'Sender and Receiver Ids are required' }), {
          status: 400,
          headers: {
            'content-type': 'application/json',
          },
        })
      }
    } else if (senderStatus === 'patron') {
      // if sender is patron
      if (!senderId) {
        return new Response(JSON.stringify({ message: 'Sender Id are required' }), {
          status: 400,
          headers: {
            'content-type': 'application/json',
          },
        })
      }
    } else if (senderStatus === 'unregistered') {
      email = senderInfo.email
      firstname = senderInfo.firstname

      // if sender is not a registered user
      if (!firstname || !email) {
        return new Response(JSON.stringify({ message: 'First name and email are required' }), {
          status: 400,
          headers: {
            'content-type': 'application/json',
          },
        })
      }
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
    const { id, editorId } = data

    if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
      console.log('Edit Message data', data)
    }
    // ** VALIDATION
    // Check if the required fields are provided
    if (!id) {
      return new Response(JSON.stringify({ message: 'Message Id is required' }), {
        status: 400,
        headers: {
          'content-type': 'application/json',
        },
      })
    }

    if (!editorId) {
      return new Response(JSON.stringify({ message: 'Editor Id is required' }), {
        status: 400,
        headers: {
          'content-type': 'application/json',
        },
      })
    }

    // Connect to MongoDB
    await connectMongoDB()

    const dbRequiredData: MessageDBType = {
      ...data,
      isEdited: {
        status: true,
        editorId,
      },
    }

    // Find the message by ID and update it
    const updatedMessage = await Message.findOneAndUpdate(
      { id },
      { $set: dbRequiredData },
      { new: true, upsert: true } // "upsert" ensures creation if not found
    ).lean()

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

export async function PATCH(request: NextRequest) {
  try {
    // Type: read | delivered
    // Update is done according to the type passed

    // Get the message data from the request body
    const data = await request.json()
    const { id, type, readerId } = data

    if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
      console.log('Patch Message data', data)
    }
    // ** VALIDATION
    // Check if the required fields are provided
    if (!id || !type) {
      return new Response(JSON.stringify({ message: 'Message Id and patch type are required' }), {
        status: 400,
        headers: {
          'content-type': 'application/json',
        },
      })
    }

    // Connect to MongoDB
    await connectMongoDB()
    let patchedData: MessageDBType = { ...data }

    // Check passed type and update accordingly
    if (type === 'read') {
      patchedData.status = 'read'

      // Ensure readBy exists as an array
      if (!patchedData.readBy) {
        patchedData.readBy = []
      }

      // If readerId is provided (admin reads a patron's message), add to readBy
      if (readerId) {
        patchedData.readBy.push(readerId)
      }
    } else if (type === 'delivered') {
      patchedData.status = 'delivered'
    }

    // Find the message by ID and update it
    const updatedMessage = await Message.findOneAndUpdate(
      { id },
      { $set: patchedData },
      { new: true }
    ).lean()

    if (!updatedMessage) {
      return new Response(JSON.stringify({ message: 'Message not found or already updated' }), {
        status: 404,
        headers: { 'content-type': 'application/json' },
      })
    }

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
