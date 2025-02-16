import connectMongoDB from "@/libs/mongodb";
import Campaign from "@/models/campaign.model";
import { generateRandomId } from "@/utils/utils";
import { NextRequest, NextResponse } from "next/server";

//** GET  */
export async function GET(request: NextRequest) {
    try {
        // Connect to MongoDB
        await connectMongoDB();

        // Fetch all campaigns
        const campaigns = await Campaign.find();

        // Return the campaigns and donation options
        return new Response(JSON.stringify(campaigns), {
            headers: {
                "content-type": "application/json",
            },
            status: 200,
        });

    } catch (error: any) {
        console.error("Error fetching campaigns:", error);
        return new Response(JSON.stringify({ message: error.message }), {
            status: 500,
            headers: {
                "content-type": "application/json",
            },
        });
    }
}

//** POST - DonationCampaigns */
export async function POST(request: NextRequest) {
    try {
        // Connect to MongoDB
        await connectMongoDB();

        // Get the campaign data from the request body
        const {title, target, raised = 0, desc, img, status, text} = await request.json(); 
    
        console.log("CREATE NEW CAMPAIGN",{ title, target, desc, img, status});
        // Check if the required fields are provided
        if (!status || !title || !desc || !target ) {
            return NextResponse.json({ message: "Title, Status, Target and Description are required" }, { status: 400 });
        }

        // Generate Random Id
        const id = generateRandomId()

        // Create a new campaign
        const newCampaign = await Campaign.create({
            id,
            target,
            raised,
            title,
            desc,
            text,
            status,
            img,
        });

        // Return a success response
        return NextResponse.json(newCampaign, {
          headers: {
            "content-type": "application/json",
          },
          status: 201,
        });
    } catch (error: any) {
        console.error("Error creating campaign:", error);
        return new Response(JSON.stringify({ message: error.message }), {
            status: 500
        });
    }
}

//** DELETE  */
export async function DELETE(request: NextRequest) {
    try {
        // Get the campaign ID from the URL
        const id = request.nextUrl.searchParams.get('id');

        // Check if the campaign ID is provided
        if (!id) {
            return NextResponse.json({ message: "Campaign ID is required" }, { status: 400 });
        }

        // Connect to MongoDB
        await connectMongoDB();

        // Delete the campaign
        await Campaign.findOneAndDelete({ id });

        // Return a success response
        return NextResponse.json({message: "Campaign Deleted"}, {
          headers: {
            "content-type": "application/json",
          },
          status: 200,
        });
    } catch (error: any) {
        console.error("Error deleting campaign:", error);
        return new Response(JSON.stringify({ message: error.message }), {
            status: 500
        });
    }
}

//** PUT  */
export async function PUT(request: NextRequest) {
    try {
        // Validate the request body
        const data = await request.json();
        const { id } = data;
        // Check if the required fields are provided
        if (!id ) {
            return NextResponse.json({ message: "ID are required" }, { status: 400 });
        }

        // Connect to MongoDB
        await connectMongoDB();

        // Update the campaign
        const campaign = await Campaign.findOneAndUpdate(
            { id },
            { $set: { ...data } },
            { new: true } // return the updated document
        );
        console.log(campaign);

        // Return a success response
        return NextResponse.json(campaign, {
          headers: {
            "content-type": "application/json",
          },
          status: 200,
        });
    } catch (error: any) {
        console.error("Error updating campaign:", error);
        return new Response(JSON.stringify({ message: error.message }), {
            status: 500
        });
    }
}