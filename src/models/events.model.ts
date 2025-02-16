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
            required: true
        },
        startDate: {
            type: String,
            required: true
        },
        endDate: {
            type: String,
            required: true
        },
        startTime: {
            type: String,
            required: true
        },
        endTime: {
            type: String,
            required: true
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