export type PAYMENTCHANNELSTYPE = 'mobile_money' | 'card' | 'bank_transfer'
export type ACCEPTEDCURRENCYTYPE = 'GHS' | 'NGN' | 'USD' | 'ZAR'
export type TRANSACTIONSTATUSTYPE = 'success' | 'pending' | 'error'
export type DONATIONTYPE = 'campaign' | 'option' | 'custom' | 'event'

export type TRANSACTIONSTYPE = {
  id: string
  amount: number
  currency: ACCEPTEDCURRENCYTYPE
  reference: string
  status: TRANSACTIONSTATUSTYPE
  channel: PAYMENTCHANNELSTYPE
  donationType: DONATIONTYPE
  metadata: {
    patronId: string
    note: string
    platform: string
  }
  paidAt: string
  createdAt: string
  updatedAt: string
}

export type PAYMENTDATATYPE = {
  userId?: string
  amount: number | null
  email?: string
  username?: string
  currency: string
  status: string
  transactionTypeId: string
  transactionType: DONATIONTYPE
  verificationInfo?: any // any because its a response from paystack api
}
