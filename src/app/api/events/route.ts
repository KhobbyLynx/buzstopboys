import connectMongoDB from "@/libs/mongodb"
import Event from "@/models/events.model"
import { generateRandomId } from "@/utils/utils"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
    try {
        // Connect to MongoDB
        await connectMongoDB()

        // Fetch all activities
        const activities = await Event.find()

        // Return the activities
        return new Response(JSON.stringify(activities), {
            headers: {
                "content-type": "application/json",
            },
            status: 200,
        })

    } catch (error: any) {
        console.error("Error fetching activities:", error)
        return new Response(JSON.stringify({ message: error.message }), {
            status: 500,
            headers: {
                "content-type": "application/json",
            },
        })
    }
}

export async function POST(request: NextRequest) {
    try {
        // Connect to MongoDB
        await connectMongoDB()

        // Get the event data from the request body
        const data = await request.json()
        const { title, desc, img, startTime, startDate, venue, hashTags } = data

        // Check if the required fields are provided
        if (!title || !desc || !venue || !startDate || !startTime || !img) {
            return new Response(JSON.stringify({ message: "Title, Description, Time & date, an Image and Venue are required" }), {
                status: 400,
                headers: {
                    "content-type": "application/json",
                },
            })
        }
  
        // Check if at least one hashTag is provided
        if (!hashTags || hashTags.length === 0) {
            return new Response(JSON.stringify({ message: "At least one Hash Tag is required" }), {
                status: 400,
                headers: {
                    "content-type": "application/json",
                },
            })
        }
      
        // Generate Random Id
        const id = generateRandomId()

        // Create a new event
        const newActivity = await Event.create({
            id,
            ...data
        })

        // Return the new event
        return new Response(JSON.stringify(newActivity), {
            headers: {
                "content-type": "application/json",
            },
            status: 201,
        })
    } catch (error: any) {
        console.error("Error creating event:", error)
        return new Response(JSON.stringify({ message: error.message }), {
            status: 500,
            headers: {
                "content-type": "application/json",
            },
        })
    }
}

export async function DELETE(request: NextRequest) {
    try {
        // Connect to MongoDB
        await connectMongoDB()

        // Get the event id from the query parameters
        const id = request.nextUrl.searchParams.get("id")

        // Check if the event id is provided
        if (!id) {
            return new Response(JSON.stringify({ message: "Event id is required" }), {
                status: 400,
                headers: {
                    "content-type": "application/json",
                },
            })
        }

        // Find the event by id and delete it
        await Event.findOneAndDelete({ id })

        // Return the deleted event
        return new Response(JSON.stringify({ message: "Event deleted" }), {
            headers: {
                "content-type": "application/json",
            },
            status: 200,
        })
    } catch (error: any) {
        console.error("Error deleting event:", error)
        return new Response(JSON.stringify({ message: error.message }), {
            status: 500,
            headers: {
                "content-type": "application/json",
            },
        })
    }
}

export async function PUT(request: NextRequest) {
    try {
        // Connect to MongoDB
        await connectMongoDB()

        // Get the event data from the request body
        const data = await request.json()
        const { id } = data

        // Check if the required fields are provided
        if (!id) {
            return new Response(JSON.stringify({ message: "ID is required" }), {
                status: 400,
                headers: {
                    "content-type": "application/json",
                },
            })
        }

        // Find the event by id and update it
        const updatedEvent = await Event.findOneAndUpdate(
            { id },
            { $set: { ...data } },
            { new: true }
        )

        // Return the updated event
        return new Response(JSON.stringify(updatedEvent), {
            headers: {
                "content-type": "application/json",
            },
            status: 200,
        })
    } catch (error: any) {
        console.error("Error updating event:", error)
        return new Response(JSON.stringify({ message: error.message }), {
            status: 500,
            headers: {
                "content-type": "application/json",
            },
        })
    }
}