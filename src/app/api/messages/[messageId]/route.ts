import Message from '@/models/messages.model'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest, context: { params: Promise<{ messageId: string }> }) {
  try {
    const { messageId } = await context.params // Await params

    // Fetch message and convert to a plain object
    const message = await Message.findOne({ id: messageId }).lean()

    if (!message) {
      return new Response(JSON.stringify({ message: 'Message not found' }), {
        status: 404,
        headers: { 'content-type': 'application/json' },
      })
    }

    return new Response(JSON.stringify(message), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    })
  } catch (error: any) {
    console.error('Error fetching single message:', error)
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    })
  }
}
