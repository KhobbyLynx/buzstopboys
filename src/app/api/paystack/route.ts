import { PAYMENTCHANNELSTYPE } from '@/types/transactions'
import axiosRequest from '@/utils/axiosRequest'
import { detectCurrency } from '@/utils/getUserOrigin'
import { generatePaymentReference } from '@/utils/utils'
import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY

// VERIFY PAYMENT
export async function POST(req: NextRequest) {
  try {
    const { reference } = await req.json()

    if (!reference) {
      return NextResponse.json({ error: 'Transaction reference is required' }, { status: 400 })
    }

    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      },
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Error verifying payment:', data)
      return NextResponse.json({ error: 'Payment verification failed' }, { status: 500 })
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('Paystack Verification Response:', data)
    }

    // Process the verified payment data as needed
    // For example, update your database or trigger other business logic

    return NextResponse.json(data) // Return verification details
  } catch (error) {
    console.error('Error during payment verification:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
