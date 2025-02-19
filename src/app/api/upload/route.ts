import { v2 as cloudinary } from 'cloudinary';
import { NextResponse, NextRequest } from 'next/server';

cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL
});

export async function POST(req: NextRequest) {
  try {
    const { img } = await req.json(); // Get Base64 image

    console.log('Base 64 img', img)
    if (!img) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    const uploadResponse = await cloudinary.uploader.upload(img, {
      upload_preset: 'buzstopboys', 
    });

    return NextResponse.json({ url: uploadResponse.secure_url }, {status: 200});
  } catch (error) {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
    try {
      // Get the url from the request query (if provided)
      const imageUrl = request.nextUrl.searchParams.get('id');

      if (!imageUrl) {
        return NextResponse.json({ error: 'Image ID is required' }, { status: 400 });
      }

        // Extract public ID from the URL
        const publicIdMatch = imageUrl.match(/\/([^/]+)\.\w+$/);
        if (!publicIdMatch) {
            return NextResponse.json({ error: 'Invalid Image URL' }, { status: 400 });
        }

        const publicId = `buzstopboys/uploads/${publicIdMatch[1]}`;

  
      const result = await cloudinary.uploader.destroy(publicId);
  
      console.log('Result Delete Image', result)
      return NextResponse.json({ success: true, result });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to delete image', details: error }, { status: 500 });
    }
}