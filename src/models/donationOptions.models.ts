import mongoose, {Schema } from 'mongoose'

const donationOptionsSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    amountRaised: {
        type: Number,
        default: 0
    },
    numberOfDonors: {
        type: Number,
        default: 0
    }
},
{
    timestamps: true
})

const DonationOptions = mongoose.models.DonationOptions || mongoose.model("DonationOptions", donationOptionsSchema)
export default DonationOptions