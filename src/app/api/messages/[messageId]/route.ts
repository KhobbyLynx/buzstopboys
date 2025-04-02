import Message from '@/models/messages.model'
import Patron from '@/models/patron.model'
import { MessagesProps } from '@/types/messages'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest, context: { params: Promise<{ messageId: string }> }) {
  try {
    const { messageId } = await context.params

    // Fetch message and receiver info in parallel
    const [message] = await Promise.all([
      Message.findOne({ id: messageId }).select('-_id -__v').lean<MessagesProps>().hint({ id: 1 }),
    ])

    if (!message) {
      return new Response(JSON.stringify({ message: 'Message not found' }), {
        status: 404,
        headers: { 'content-type': 'application/json' },
      })
    }

    const receiverProjection = 'id username email contact role verified onlineStatus avatar'
    const receiverInfoPromise = message.receiverId
      ? Patron.findOne({ id: message.receiverId }).select(receiverProjection).lean()
      : null

    const receiverInfo = await receiverInfoPromise

    return new Response(
      JSON.stringify({
        ...message,
        receiverInfo,
      }),
      {
        status: 200,
        headers: { 'content-type': 'application/json' },
      }
    )
  } catch (error: any) {
    console.error('Error fetching single message:', error)
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    })
  }
}
