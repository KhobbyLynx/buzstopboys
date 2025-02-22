import { NextResponse, NextRequest } from 'next/server'
import { parse } from 'cookie'

export async function middleware(request: NextRequest) {
  // Access cookies from headers
  const cookieHeader = request.headers.get('cookie') || ''
  const cookies = parse(cookieHeader)

  const userData = cookies.userData ? JSON.parse(cookies.userData) : null

  if (!userData) {
    if (process.env.NODE_ENV === 'development') {
      console.log('No user is logged in @ Middleware')
    }
    return NextResponse.redirect(new URL('/', request.url))
  }

  try {
    const isAdmin = userData.role === 'admin'
    if (!isAdmin) {
      if (process.env.NODE_ENV === 'development') {
        console.log('User is not an admin @ Middleware')
      }

      return NextResponse.redirect(new URL('/', request.url))
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Error fetching patron info:', error)
    }
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('User is logged in and is an admin @ Middleware')
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
