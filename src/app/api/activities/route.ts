import connectMongoDB from '@/libs/mongodb'
import Activity from '@/models/activity.model'
import axiosRequest from '@/utils/axiosRequest'
import { generateRandomId } from '@/utils/utils'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Connect to MongoDB
    await connectMongoDB()

    // Fetch all activities
    const activities = await Activity.find()

    // Return the activities
    return new Response(JSON.stringify(activities), {
      headers: {
        'content-type': 'application/json',
      },
      status: 200,
    })
  } catch (error: any) {
    console.error('Error fetching activities:', error)
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: {
        'content-type': 'application/json',
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
    const { title, desc, videoUrls, icon, imgs, details } = data

    if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
      console.log('Create Activity data', data)
    }
    // Check if the required fields are provided
    if (!title || !desc || !icon) {
      return new Response(JSON.stringify({ message: 'Title, Description and Icon are required' }), {
        status: 400,
        headers: {
          'content-type': 'application/json',
        },
      })
    }

    // Check if at least one image is provided
    if (!imgs || imgs.length === 0) {
      return new Response(JSON.stringify({ message: 'At least one image is required' }), {
        status: 400,
        headers: {
          'content-type': 'application/json',
        },
      })
    }

    // Check if at least one video url is provided
    if (!videoUrls || videoUrls.length === 0) {
      return new Response(JSON.stringify({ message: 'At least one video url is required' }), {
        status: 400,
        headers: {
          'content-type': 'application/json',
        },
      })
    }

    // Check for details
    if (!details || details.length === 0) {
      return new Response(JSON.stringify({ mesage: 'At least one detail is required' }), {
        status: 400,
      })
    }

    // Upload images to Cloudinary
    const uploadResponse = await axiosRequest.post('/upload', { images: imgs })
    const imgUrls = uploadResponse.data.urls

    // Generate Random Id
    const id = generateRandomId()

    // Create a new activity
    const newActivity = await Activity.create({
      id,
      ...data,
      imgs: imgUrls,
    })

    // Return the new activity
    return new Response(JSON.stringify(newActivity), {
      headers: {
        'content-type': 'application/json',
      },
      status: 201,
    })
  } catch (error: any) {
    console.error('Error creating new activity:', error)
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: {
        'content-type': 'application/json',
      },
    })
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Get the activity data from the request body
    const data = await request.json()
    const { modifiedData, removedImages } = data
    const { id, title, desc, videoUrls, icon, imgs } = modifiedData

    // Check if the required fields are provided
    if (!id || !title || !desc || !icon) {
      return new Response(
        JSON.stringify({ message: 'ID, Title, Description and Icon are required' }),
        {
          status: 400,
          headers: {
            'content-type': 'application/json',
          },
        }
      )
    }

    // Check if at least one image is provided
    if (!imgs || imgs.length === 0) {
      return new Response(JSON.stringify({ message: 'At least one image is required' }), {
        status: 400,
        headers: {
          'content-type': 'application/json',
        },
      })
    }

    // Check if at least one video url is provided
    if (!videoUrls || videoUrls.length === 0) {
      return new Response(JSON.stringify({ message: 'At least one video url is required' }), {
        status: 400,
        headers: {
          'content-type': 'application/json',
        },
      })
    }

    // Connect to MongoDB
    await connectMongoDB()

    // Check if some images were removed
    if (removedImages.length !== 0) {
      // Encode the image URLs as a comma-separated string
      const urlsParam = encodeURIComponent(removedImages.join(','))
      // Delete removed images
      await axiosRequest.delete(`/upload?urls=${urlsParam}`)
    }

    // Old images that was not changed
    // NB: old images have https://res.cloudinary.com in their url
    const unchangedImages = modifiedData.imgs.filter((img: string) =>
      img.includes('https://res.cloudinary.com')
    )

    // Set newly upload images variable
    let newlyUploadedImages: string[] = []

    // Check if there were new images uploaded
    // NB: New images are base64 string and dont have https://res.cloudinary.com in them
    const newImages = modifiedData.imgs.filter(
      (img: string) => !img.includes('https://res.cloudinary.com')
    )

    // Upload new images
    if (newImages.length !== 0) {
      // Upload image
      const uploadResponse = await axiosRequest.post('/upload', { images: newImages })
      newlyUploadedImages = uploadResponse.data.urls
    }

    const combinedImages = [...unchangedImages, ...newlyUploadedImages]

    const modifiedActivity = {
      ...modifiedData,
      imgs: combinedImages,
    }

    // Find the activity by ID and update it
    const updatedActivity = await Activity.findOneAndUpdate(
      { id },
      { $set: modifiedActivity },
      { new: true }
    )

    // Return the updated activity
    return new Response(JSON.stringify(updatedActivity), {
      headers: {
        'content-type': 'application/json',
      },
      status: 200,
    })
  } catch (error: any) {
    console.error('Error updating activity:', error)
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: {
        'content-type': 'application/json',
      },
    })
  }
}

// DELETE
export async function DELETE(request: NextRequest) {
  try {
    // Get the activity ID from the query parameters
    const id = request.nextUrl.searchParams.get('id')
    const imgUrls = request.nextUrl.searchParams.get('imgUrls')

    // Check if the activity ID is provided
    if (!id) {
      return new Response(JSON.stringify({ message: 'Activity ID is required' }), {
        status: 400,
        headers: {
          'content-type': 'application/json',
        },
      })
    }

    if (imgUrls) {
      // Delete removed images
      await axiosRequest.delete(`/upload?urls=${imgUrls}`)
    }

    // Connect to MongoDB
    await connectMongoDB()

    // Delete the activity
    await Activity.findOneAndDelete({ id })

    // Return a success response
    return new Response(JSON.stringify({ message: 'Activity Deleted' }), {
      headers: {
        'content-type': 'application/json',
      },
      status: 200,
    })
  } catch (error: any) {
    console.error('Error deleting activity:', error)
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: {
        'content-type': 'application/json',
      },
    })
  }
}
