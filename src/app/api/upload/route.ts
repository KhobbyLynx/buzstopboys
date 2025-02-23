import { v2 as cloudinary } from 'cloudinary'
import { NextResponse, NextRequest } from 'next/server'

cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL,
})

export async function POST(req: NextRequest) {
  try {
    const { images } = await req.json() // Expecting 'images' to be an array of Base64 strings

    if (!images || !Array.isArray(images) || images.length === 0) {
      return NextResponse.json({ error: 'No images provided' }, { status: 400 })
    }

    const uploadPromises = images.map((img) =>
      cloudinary.uploader.upload(img, {
        upload_preset: 'buzstopboys',
      })
    )

    const uploadResponses = await Promise.all(uploadPromises)

    const imageUrls = uploadResponses.map((response) => response.secure_url)

    console.log('Image URLs:', imageUrls)

    return NextResponse.json({ urls: imageUrls }, { status: 200 })
  } catch (error) {
    console.error('Upload failed:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Extract 'urls' query parameter
    const urlsParam = request.nextUrl.searchParams.get('urls')

    if (!urlsParam) {
      return NextResponse.json({ error: 'Image URLs are required' }, { status: 400 })
    }

    // Split the 'urls' parameter into an array if concatinated with comma
    const imageUrls = urlsParam.includes(',') ? urlsParam.split(',') : [urlsParam]

    // Extract public IDs from the URLs
    const publicIds = imageUrls
      .map((url) => {
        const match = url.match(/\/([^/]+)\.\w+$/)
        return match ? `buzstopboys/uploads/${match[1]}` : null
      })
      .filter(Boolean)

    if (publicIds.length === 0) {
      return NextResponse.json({ error: 'No valid image URLs provided' }, { status: 400 })
    }

    // Delete multiple images
    const deletePromises = publicIds
      .filter((id) => id !== null)
      .map((id) => cloudinary.uploader.destroy(id as string))

    const result = await Promise.all(deletePromises)

    console.log('Result Delete Images', result)
    return NextResponse.json({ success: true, result })
  } catch (error: any) {
    console.error('Error deleting images:', error)
    return NextResponse.json(
      { error: 'Failed to delete images', details: error.message },
      { status: 500 }
    )
  }
}
