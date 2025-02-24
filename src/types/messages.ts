export type MessageSource = 'contact' | 'inbox'
export type SenderStatusType = 'admin' | 'patron' | 'unregistered'
export type SenderInfoType = {
  firstname: string
  lastname?: string
  email: string
  contact?: string
}

export type MessageStatus = 'sent' | 'delivered' | 'read'

export type EditedType = {
  status: boolean
  editorId: string
}

export type MessagesProps = {
  _id: string // MongoDB ObjectId as a string
  id: string // Messages ID
  senderId: string
  senderInfo: SenderInfoType
  senderStatus: SenderStatusType
  receiverId?: string
  interest: string
  content: string
  source: MessageSource
  status: MessageStatus
  isEdited?: EditedType
  readBy?: string[]
  createdAt: string // ISO date string
  updatedAt: string // ISO date string
  __v: number // Version key
}

export type MessageDBType = {
  id: string
  receiverId?: string
  status: MessageStatus
  isEdited?: EditedType
  interest: string
  content: string
  source: MessageSource
  senderInfo: SenderInfoType
  senderStatus: SenderStatusType
  senderId: string
  readBy?: string[]
}

export type MessageStoreType = {
  receiverId?: string
  interest: string
  content: string
  source: MessageSource
  senderInfo: SenderInfoType
  senderStatus: SenderStatusType
  senderId: string | null
}

export type MessageSubmitType = {
  interest: string
  message: string
  firstname: string
  lastname?: string
  email: string
  contact?: number
}
