import Campaign from '@/models/campaign.model'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest, context: { params: Promise<{ campaignId: string }> }) {
  try {
    const { campaignId } = await context.params // Await params

    console.log('========campaign ID============')
    console.log('Campaign Id', campaignId)
    console.log('========campaign ID============')

    if (!campaignId) {
      return new Response(JSON.stringify({ message: 'Campaign Id is required' }), {
        status: 400,
      })
    }

    // Fetch campaign and convert to a plain object
    const campaign = await Campaign.findOne({ id: campaignId }).lean()

    console.log('+++Campaign+++', campaign)

    if (!campaign) {
      return new Response(JSON.stringify({ message: 'Campaign not found' }), {
        status: 404,
        headers: { 'content-type': 'application/json' },
      })
    }

    return new Response(JSON.stringify(campaign), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    })
  } catch (error: any) {
    console.error('Error fetching single campaign:', error)
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    })
  }
}
