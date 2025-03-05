import mongoose, { Schema } from 'mongoose'

const patronSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    username: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    contact: {
      type: Number,
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      required: true,
    },
    onlineStatus: {
      type: Boolean,
      required: true,
    },
    suspended: {
      type: Boolean,
    },
    type: {
      type: String,
    },
    avatar: {
      type: String,
    },
    lastSignInTime: {
      type: String,
    },
    password: {
      type: String,
    },
    social: {
      x: { type: String },
      facebook: { type: String },
      instagram: { type: String },
      tiktok: { type: String },
    },
  },
  {
    timestamps: true,
  }
)

const Patron = mongoose.models.Patron || mongoose.model('Patron', patronSchema)

export default Patron
