import mongoose, { Schema } from 'mongoose'

const patronSchema = new Schema(
    {
        id: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        fullname: {
            type: String,
        },
        firstname: {
            type: String,
        },
        lastname: {
            type: String
        },
        email: {
            type: String
        },
        contact: {
            type: Number
        },
        address: {
            type: String
        },
        role: {
            type: String,
            required: true
        },
        verified: {
            type: Boolean,
            required: true
        },
        onlineStatus: {
            type: Boolean
        },
        suspended: {
            type: Boolean
        },
        avatar: {
            type: String
        },
        lastSignInTime: {
            type: String
        },
        password: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

const Patron = mongoose.models.Patron || mongoose.model('Patron', patronSchema)

export default Patron