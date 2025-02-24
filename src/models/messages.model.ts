import mongoose, { Schema } from 'mongoose'

const messageSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    senderId: {
      type: String, // ID of the message sender (Admin/Patron/Unregistered)
    },
    senderStatus: {
      type: String, // "admin" | "patron" | "unregistered"
      required: true,
      enum: ['admin', 'patron', 'unregistered'],
    },
    receiverId: {
      type: String, // Only applicable if sent by an admin
    },
    status: {
      type: String, // "sent" | "delivered" | "read"
      required: true,
      enum: ['sent', 'delivered', 'read'],
      default: 'sent',
    },
    isEdited: {
      type: {
        status: Boolean, // true if edited
        editorId: String, // ID of the user who edited the message
      },
      default: { status: false, editorId: null },
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    senderInfo: {
      firstname: { type: String, trim: true },
      lastname: { type: String, trim: true },
      email: { type: String, trim: true }, // Optional if sender is admin
      contact: { type: String, trim: true },
    },
    source: {
      type: String, // "inbox" | "contact"
      required: true,
      enum: ['inbox', 'contact'],
    },
    interest: {
      type: String,
      required: true,
      enum: ['volunteer', 'donate', 'sponsor', 'other'],
    },
    readBy: {
      type: [String], // Array of admin IDs who read the message
      default: [],
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
)

const Message = mongoose.models.Message || mongoose.model('Message', messageSchema)

export default Message
