import connectMongoDB from "./src/libs/mongodb";
import DonationOptions from "./src/models/donationOptions.models";
import { generateRandomId } from "./src/utils/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        // Connnect to MongoDB
        await connectMongoDB()

        // Fetch donation options
        const donationOptions = await DonationOptions.find()
        
        return new Response(JSON.stringify(donationOptions), {
            headers: {
                'content-type': 'application/json'
            },
            status: 200
        })
    } catch (error) {
        return new Response(JSON.stringify({mssage: error instanceof Error ? error.message : 'Error fetching donation options'}),{
            headers: {
                'content-type': 'application/json'
            },
            status: 500
        })
    }
}

export async function POST(request: NextRequest){
    try {
        // Connect MongoDb
        await connectMongoDB()

        // Destructure Data from request body
        const {amount, name} = await request.json()

        // generate ID
        const id = generateRandomId()

        const newOption = await DonationOptions.create({
            id,
            amount,
            name,
            amountRaised: 0,
            numberOfDonors: 0
        })

        return NextResponse.json(newOption, {
            headers: {
                'content-type': 'application/json'
            },
            status: 201
        })
    } catch (error) {
        return NextResponse
        .json({message: error instanceof Error ? error.message : 'Error creating donation option'}
        ,{
            status: 500,
            headers: {
                'content-type': 'application/json'
            }
        })
    }
}

export async function PUT(request: NextRequest){
    try {
        // get data from request body
        const { id, amount, name, amountRaised, numberOfDonors } = await request.json()
        
        // Verify id
        if(!id){
            return NextResponse.json({message: 'Donation Option Id is required'},{
                status: 500
            })
        }

        // connect MongoDb
        await connectMongoDB()

        const updatedOption = await DonationOptions.findOneAndUpdate(
            {id},
            { $set : { amount, name, amountRaised, numberOfDonors }},
            { new : true }
        )

        return NextResponse.json(updatedOption, {
            headers: {
                'content-type': 'application/json'
            },
            status: 200
        })
    } catch (error) {
        return NextResponse
        .json({message : error instanceof Error ? error.message : 'Error updating donation option'}, {
            status: 500
        })
    }
}

export async function DELETE(request: NextRequest) {
    try {
        // connect MongoDB
        await connectMongoDB()

        // get id from url
        const id = request.nextUrl.searchParams.get('id')

        console.log('id @ Donation Options', id)
        // verify id
        if(!id){
            return NextResponse.json({message: 'Donation Option Id is required'},{
                status: 500
            })
        }

        // delete donation option
        const deleteOption = await DonationOptions.findOneAndDelete({ id })

        if(!deleteOption) {
            return NextResponse.json({message: 'Donation Option not found'},{
                status: 404
            })
        }

        return NextResponse.json({message: 'Donation Option deleted successfully'},{
            status: 200
        })
    } catch (error) {
        return NextResponse.json({message: error instanceof Error ? error.message : 'Error deleting donation option'},{
            status: 500
        })  
    }
}