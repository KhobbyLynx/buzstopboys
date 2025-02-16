import connectMongoDB from "@/libs/mongodb"
import Activity from "@/models/activity.model"
import { generateRandomId } from "@/utils/utils"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
    try {
        // Connect to MongoDB
        await connectMongoDB()

        // Fetch all activities
        const activities = await Activity.find()

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

        // Get the activity data from the request body
        const data = await request.json()
        const { title, desc, videoUrls, icon, details, caption, imgs } = data

        if(process.env.NODE_ENV === 'development') {
            console.log('Create Activity data', data)
        }

        // Check if the required fields are provided
        if (!title || !desc || !icon) {
            return new Response(JSON.stringify({ message: "Title, Description and Icon are required" }), {
                status: 400,
                headers: {
                    "content-type": "application/json",
                },
            })
        }
  
        // // Check if at least one image is provided
        // if (!imgs || imgs.length === 0) {
        //     return new Response(JSON.stringify({ message: "At least one image is required" }), {
        //         status: 400,
        //         headers: {
        //             "content-type": "application/json",
        //         },
        //     })
        // }
      
        // Check if at least one video url is provided
        if (!videoUrls || videoUrls.length === 0) {
            return new Response(JSON.stringify({ message: "At least one video url is required" }), {
                status: 400,
                headers: {
                    "content-type": "application/json",
                },
            })
        }

        // Generate Random Id
        const id = generateRandomId()

        // Create a new activity
        const newActivity = await Activity.create({
            id,
            title,
            desc,
            videoUrls,
            icon,
            details,
            caption,
            imgs
        })

        // Return the new activity
        return new Response(JSON.stringify(newActivity), {
            headers: {
                "content-type": "application/json",
            },
            status: 201,
        })

    } catch (error: any) {
        console.error("Error creating new activity:", error)
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

        // Get the activity data from the request body
        const data = await request.json()
        const { id, title, desc, videoUrls, icon, imgs } = data

        // Check if the required fields are provided
        if (!id || !title || !desc || !icon) {
            return new Response(JSON.stringify({ message: "ID, Title, Description and Icon are required" }), {
                status: 400,
                headers: {
                    "content-type": "application/json",
                },
            })
        }

        // Check if at least one image is provided
        if (!imgs || imgs.length === 0) {
            return new Response(JSON.stringify({ message: "At least one image is required" }), {
                status: 400,
                headers: {
                    "content-type": "application/json",
                },
            })
        }
      
        // Check if at least one video url is provided
        if (!videoUrls || videoUrls.length === 0) {
            return new Response(JSON.stringify({ message: "At least one video url is required" }), {
                status: 400,
                headers: {
                    "content-type": "application/json",
                },
            })
        }

        // Find the activity by ID and update it
        const updatedActivity = await Activity.findOneAndUpdate(
            { id },
            { $set: { ...data } },
            { new: true })

        // Return the updated activity
        return new Response(JSON.stringify(updatedActivity), {
            headers: {
                "content-type": "application/json",
            },
            status: 200,
        })

    } catch (error: any) {
        console.error("Error updating activity:", error)
        return new Response(JSON.stringify({ message: error.message }), {
            status: 500,
            headers: {
                "content-type": "application/json",
            },
        })
    }
}

// DELETE
export async function DELETE(request: NextRequest) {
    try {
        // Connect to MongoDB
        await connectMongoDB()

        // Get the activity ID from the query parameters
        const id = request.nextUrl.searchParams.get("id")

        // Check if the activity ID is provided
        if (!id) {
            return new Response(JSON.stringify({ message: "Activity ID is required" }), {
                status: 400,
                headers: {
                    "content-type": "application/json",
                },
            })
        }

        // Delete the activity
        await Activity.findOneAndDelete({ id })

        // Return a success response
        return new Response(JSON.stringify({ message: "Activity Deleted" }), {
            headers: {
                "content-type": "application/json",
            },
            status: 200,
        })

    } catch (error: any) {
        console.error("Error deleting activity:", error)
        return new Response(JSON.stringify({ message: error.message }), {
            status: 500,
            headers: {
                "content-type": "application/json",
            },
        })
    }
}