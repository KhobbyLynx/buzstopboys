import connectMongoDB from '@/libs/mongodb'
import Transaction from '@/models/transaction.model'
import { generateRandomId } from '@/utils/utils'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Get data from request body
    const data = await request.json()
    const {
      email,
      amount,
      reference,
      userId,
      username,
      currency,
      status: manualStatus,
      transactionTypeId,
      transactionType,
      verificationInfo,
    } = data

    if (!amount || !email || !reference) {
      return NextResponse.json(
        { message: 'Amount, reference and email are required to save a transaction' },
        { status: 400 }
      )
    }

    const { data: verificationData = {} } = verificationInfo || {}

    const {
      id: paystackId,
      status,
      amount: paystackAmount,
      gateway_response,
      paid_at,
      created_at,
      channel,
      currency: paystackCurrency,
      ip_address,
      log = { time_spent: undefined, attempts: undefined },
      fees = 0,
      authorization = {
        bank: undefined,
        brand: undefined,
        country_code: undefined,
        card_type: undefined,
        mobile_money_number: undefined,
      },
    } = verificationData

    const { time_spent, attempts, mobile } = log
    const { bank, brand, country_code, card_type, mobile_money_number } = authorization

    const transactionId = generateRandomId()

    const requiredTransactionData = {
      id: transactionId,
      email,
      reference,
      currency,
      amount,
      transactionType,
      status: status ?? manualStatus,
      metadata: {
        userDetails: {
          username,
          userId,
        },
        transactionDetails: {
          transactionTypeId,
          paystackCurrency,
          paystackId,
          paystackAmount,
          readableResponse: gateway_response,
          attempts,
          timeSpent: time_spent,
          fees,
          mobile,
        },
        paymentMethod: {
          momoNumber: mobile_money_number,
          bank,
          brand,
          cardType: card_type,
          channel,
          countryCode: country_code,
        },
        timestamps: {
          paidAt: paid_at,
          initializedAt: created_at ?? new Date().toISOString(),
        },
        otherInfo: {
          ipAddress: ip_address,
        },
      },
    }

    if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
      console.log('-----------REQUIRED TRANSACTION DATA------------')
      console.log('requiredTransactionData', requiredTransactionData)
      console.log('log', log)
      console.log('authorization', authorization)
      console.log('---------------------------------------------------')
    }

    // Connect to MongoDB
    await connectMongoDB()

    const newTransaction = await Transaction.create(requiredTransactionData)
    // Exclude metadata from the response
    const { metadata, ...transactionWithoutMetadata } = newTransaction.toObject()

    return NextResponse.json(transactionWithoutMetadata, { status: 201 })
  } catch (error: any) {
    console.log('error saving new transaction', error)
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}
