import connectMongoDB from '@/libs/mongodb'
import Campaign from '@/models/campaign.model'
import axiosRequest from '@/utils/axiosRequest'
import { generateRandomId } from '@/utils/utils'
import { NextRequest, NextResponse } from 'next/server'

//** GET  */
export async function GET(request: NextRequest) {
  try {
    // Connect to MongoDB
    await connectMongoDB()

    // Fetch all campaigns
    const campaigns = await Campaign.find()

    // Return the campaigns and donation options
    return new Response(JSON.stringify(campaigns), {
      headers: {
        'content-type': 'application/json',
      },
      status: 200,
    })
  } catch (error: any) {
    console.error('Error fetching campaigns:', error)
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: {
        'content-type': 'application/json',
      },
    })
  }
}

//** POST - DonationCampaigns */
export async function POST(request: NextRequest) {
  try {
    // Get the campaign data from the request body
    const data = await request.json()
    const { title, target, raised = 0, desc, imgs, status, details } = data

    console.log('CREATE NEW CAMPAIGN', data)

    // Check if the required fields are provided
    if (!status || !title || !desc || !target) {
      return NextResponse.json(
        { message: 'Title, Status, Target and Description are required' },
        { status: 400 }
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

    // Check for details
    if (!details || details.length === 0) {
      return new Response(JSON.stringify({ mesage: 'At least one detail is required' }), {
        status: 400,
      })
    }

    // Connect to MongoDB
    await connectMongoDB()

    // Upload images to Cloudinary
    const uploadResponse = await axiosRequest.post('/upload', { images: imgs })
    const imgUrls = uploadResponse.data.urls

    console.log('IMG RESPONSE', uploadResponse)

    // Generate Random Id
    const id = generateRandomId()

    console.log('FINAL DATA', {
      id,
      ...data,
      raised,
      imgs: imgUrls,
    })

    // Create a new campaign
    const newCampaign = await Campaign.create({
      id,
      ...data,
      raised,
      imgs: imgUrls,
    })

    // Return a success response
    return NextResponse.json(newCampaign, {
      headers: {
        'content-type': 'application/json',
      },
      status: 201,
    })
  } catch (error: any) {
    console.error('Error creating campaign:', error)
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    })
  }
}

//** PUT  */
export async function PUT(request: NextRequest) {
  try {
    // Validate the request body
    const data = await request.json()
    const { modifiedData, removedImages } = data
    const { id, title, desc, target, status, details, imgs } = modifiedData

    // Check if the required fields are provided
    if (!id) {
      return NextResponse.json({ message: 'ID are required' }, { status: 400 })
    }

    // Check if the required fields are provided
    if (!status || !title || !desc || !target) {
      return NextResponse.json(
        { message: 'Title, Status, Target and Description are required' },
        { status: 400 }
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

    // Check for details
    if (!details || details.length === 0) {
      return new Response(JSON.stringify({ mesage: 'At least one detail is required' }), {
        status: 400,
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

    const modifiedCampaign = {
      ...modifiedData,
      imgs: combinedImages,
    }

    // Update the campaign
    const updatedCampaign = await Campaign.findOneAndUpdate(
      { id },
      { $set: modifiedCampaign },
      { new: true } // return the updated document
    )

    // Return a success response
    return NextResponse.json(updatedCampaign, {
      headers: {
        'content-type': 'application/json',
      },
      status: 200,
    })
  } catch (error: any) {
    console.error('Error updating campaign:', error)
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    })
  }
}

//** DELETE  */
export async function DELETE(request: NextRequest) {
  try {
    // Get the campaign ID from the URL
    const id = request.nextUrl.searchParams.get('id')
    const imgUrls = request.nextUrl.searchParams.get('imgUrls')

    // Check if the campaign ID is provided
    if (!id) {
      return NextResponse.json({ message: 'Campaign ID is required' }, { status: 400 })
    }

    if (imgUrls) {
      // Delete removed images
      await axiosRequest.delete(`/upload?urls=${imgUrls}`)
    }

    // Connect to MongoDB
    await connectMongoDB()

    // Delete the campaign
    await Campaign.findOneAndDelete({ id })

    // Return a success response
    return NextResponse.json(
      { message: 'Campaign Deleted' },
      {
        headers: {
          'content-type': 'application/json',
        },
        status: 200,
      }
    )
  } catch (error: any) {
    console.error('Error deleting campaign:', error)
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    })
  }
}
