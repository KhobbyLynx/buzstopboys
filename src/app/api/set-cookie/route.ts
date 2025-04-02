import { NextResponse } from 'next/server'
import { serialize, parse } from 'cookie'

export async function POST(request: Request) {
  const body = await request.json()
  const { name, value } = body

  if (!name) {
    return NextResponse.json({ message: 'Name and value are required' }, { status: 400 })
  }

  const cookie = serialize(name, value || '', {
    httpOnly: true, // Secure the cookie
    secure: process.env.NEXT_PUBLIC_NODE_ENV === 'production', // Send only over HTTPS in production
    sameSite: 'strict', // Protect against CSRF
    path: '/', // Cookie accessible throughout the app
    maxAge: 60 * 60 * 24 * 7, // 7 days, duration
  })

  const response = NextResponse.json({ message: 'Cookie set!' })
  response.headers.set('Set-Cookie', cookie)

  return response
}

export async function GET(request: Request) {
  const cookieHeader = request.headers.get('cookie') || ''
  const cookies = parse(cookieHeader)

  const userData = cookies.userData ? JSON.parse(cookies.userData) : null

  if (!userData) {
    if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
      console.log('No user data found @ GET COOKIE')
    }
  }

  return NextResponse.json(userData)
}
