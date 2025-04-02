import mongoose, { Schema, Document } from 'mongoose'

// TypeScript Interface
export interface ITransaction extends Document {
  id: string
  email: string
  reference: string
  currency: string
  amount: number
  transactionType: string
  status: 'success' | 'failed' | 'cancelled' | 'abandoned'
  metadata: {
    userDetails: {
      username: string
      userId: string
    }
    transactionDetails: {
      transactionTypeId: string
      parsedCurrency?: string
      paystackId?: string
      paystackAmount?: number
      readableResponse?: string
      attempts?: number
      timeSpent?: number
      status?: string
      fees?: number
      mobile: boolean
    }
    paymentMethod: {
      momoNumber?: string
      bank?: string
      brand?: string
      cardType?: string
      channel?: string
      countryCode?: string
    }
    timestamps: {
      paidAt?: Date
      initializedAt: Date
    }
    otherInfo: {
      ipAddress?: string
    }
  }
}

// Mongoose Schema
const transactionSchema = new Schema<ITransaction>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    reference: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    currency: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    transactionType: {
      type: String,
      required: true,
      index: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['success', 'failed', 'cancelled', 'abandoned'],
      index: true,
    },
    metadata: {
      userDetails: {
        username: { type: String },
        userId: { type: String, required: true, index: true },
      },
      transactionDetails: {
        transactionTypeId: { type: String, required: true, index: true },
        parsedCurrency: { type: String },
        paystackId: { type: String },
        paystackAmount: { type: Number },
        readableResponse: { type: String },
        attempts: { type: Number, default: 0 },
        timeSpent: { type: Number, default: 0 },
        status: { type: String },
        fees: { type: Number, default: 0 },
        mobile: { type: Boolean },
      },
      paymentMethod: {
        momoNumber: { type: String },
        bank: { type: String },
        brand: { type: String },
        cardType: { type: String },
        channel: { type: String },
        countryCode: { type: String },
      },
      timestamps: {
        paidAt: { type: Date },
        initializedAt: { type: Date, required: true },
      },
      otherInfo: {
        ipAddress: { type: String },
      },
    },
  },
  {
    timestamps: true,
  }
)

const Transaction =
  mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', transactionSchema)

export default Transaction
