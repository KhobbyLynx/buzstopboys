import mongoose, { Schema } from 'mongoose'

const activitySchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    desc: {
      type: String,
      required: true,
      trim: true,
    },
    imgs: {
      type: [String],
      required: true,
    },
    videoUrls: {
      type: [String],
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
    },
    details: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
)

const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema)

export default Activity
