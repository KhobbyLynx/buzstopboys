import mongoose, { Schema } from 'mongoose'

const campaignSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    target: {
        type: Number,
        required: true
    },
    raised: {
        type: Number,
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
    subText: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        required: true
    },
    img: {
        type: String,
    }
}, {
    timestamps: true
})

const Campaign = mongoose.models.Campaign || mongoose.model('Campaign', campaignSchema)
export default Campaign