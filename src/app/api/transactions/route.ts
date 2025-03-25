import connectMongoDB from '@/libs/mongodb'
import Transaction from '@/models/transaction.model'
import { TRANSACTIONSTATUSTYPE, TRANSACTIONSTYPE } from '@/types/transactions'
import { generateRandomId } from '@/utils/utils'
import { NextRequest, NextResponse } from 'next/server'

import mongoose from 'mongoose'

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
    const dataToReturn = {
      ...transactionWithoutMetadata,
      channel: metadata.paymentMethod.channel,
      paidAt: metadata.timestamps.paidAt,
    }

    return NextResponse.json(dataToReturn.toObject(), { status: 201 })
  } catch (error: any) {
    console.log('error saving new transaction', error)
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}

// ** GET
export async function GET(request: NextRequest) {
  try {
    // Extract query parameters
    const { searchParams } = new URL(request.url)
    const transactionId = searchParams.get('id')
    const userId = searchParams.get('userId')
    let query: Record<string, any> = {}

    // Helper: Build query with dynamic filters
    searchParams.forEach((value, key) => {
      if (['amount', 'email', 'reference'].includes(key)) {
        query[key] = { $regex: value, $options: 'i' } // Case-insensitive search
      } else if (key === 'status') {
        query[key] = value as TRANSACTIONSTYPE['status']
      } else if (key === 'channel') {
        query[key] = value as TRANSACTIONSTYPE['channel']
      } else if (key === 'transactionType') {
        query[key] = value as TRANSACTIONSTYPE['transactionType']
      } else if (key === 'page' || key === 'limit') {
        return // Skip pagination keys
      } else {
        query[key] = value
      }
    })

    console.log('USER ID-----------', userId)

    // Extract pagination parameters
    const pageParam = searchParams.get('page')
    const limitParam = searchParams.get('limit')

    // Set pagination or fetch all
    const page = pageParam ? Math.max(parseInt(pageParam, 10), 1) : null
    const limit = limitParam ? Math.max(parseInt(limitParam, 10), 1) : null
    const skip = page && limit ? (page - 1) * limit : 0

    // Connect to MongoDB
    await connectMongoDB()

    // Get the count of matching Transactions
    const fetchCount = await Transaction.countDocuments(query)

    // Check if fetching a single transaction by ID
    if (transactionId) {
      const transaction = await Transaction.findOne(query).select('-_id -__v').lean()
      if (!transaction) {
        return new Response(JSON.stringify({ message: 'Transaction not found' }), { status: 404 })
      }
      return new Response(JSON.stringify(transaction), { status: 200 })
    }

    // Fetch multiple transactions with dynamic filters
    const transactions = await Transaction.find(query)
      .select(
        '-_id -__v -updatedAt -metadata.userDetails -metadata.transactionDetails -metadata.otherInfo'
      )
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit ?? fetchCount)
      .lean()

    // Modify transactions to include selected metadata fields
    const transformedTransactions = transactions.map((tx) => ({
      ...tx,
      channel: tx.metadata?.paymentMethod?.channel,
    }))

    const returnedData = {
      data: transformedTransactions,
      fetchCount,
      currentPage: page,
      totalPages: Math.ceil(fetchCount / (limit ?? fetchCount)),
    }

    console.log('RETURNED DATA', returnedData)
    return new Response(JSON.stringify(returnedData), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    })
  } catch (error: any) {
    console.error('Error fetching transactions:', error)
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    })
  }
}

//** DELETE  */
export async function DELETE(request: NextRequest) {
  try {
    // Get the Transaction ID from the URL
    const id = request.nextUrl.searchParams.get('id')

    // Check if the Transaction ID is provided
    if (!id) {
      return NextResponse.json({ message: 'Transaction ID is required' }, { status: 400 })
    }

    // Connect to MongoDB
    await connectMongoDB()

    // Delete the Transaction
    await Transaction.findOneAndDelete({ id })

    // Return a success response
    return NextResponse.json(
      { message: 'Transaction Deleted' },
      {
        headers: {
          'content-type': 'application/json',
        },
        status: 200,
      }
    )
  } catch (error: any) {
    console.error('Error deleting Transaction:', error)
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    })
  }
}
