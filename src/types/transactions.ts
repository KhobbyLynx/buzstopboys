export type PAYMENTCHANNELSTYPE = 'mobile_money' | 'card' | 'bank_transfer'
export type ACCEPTEDCURRENCYTYPE = 'GHS' | 'NGN' | 'USD' | 'ZAR'
export type TRANSACTIONSTATUSTYPE = 'success' | 'pending' | 'error'
export type DONATIONTYPE = 'campaign' | 'option' | 'custom'

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
  patron_name?: string
  donationType: DONATIONTYPE
  donationTypeId: string
}
