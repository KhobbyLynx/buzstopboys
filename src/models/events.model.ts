import mongoose, { Schema } from 'mongoose'

const eventSchema = new Schema(
    {
        id: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        desc: {
            type: String,
            required: true,
            trim: true
        },
        img: {
            type: String,
        },
        startDate: {
            type: String,
        },
        endDate: {
            type: String,
        },
        startTime: {
            type: String,
        },
        endTime: {
            type: String,
        },
        venue: {
            type: String,
            required: true,
            trim: true
        },
        caption: {
            type: String,
        },
        status: {
            type: String,
            required: true
        },
        hashTags: {
            type: [String],
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Event = mongoose.models.Event || mongoose.model('Event', eventSchema)

export default Event