'use client'
import React, { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import MainLayout from './MainLayout'
import BlankLayout from './BlankLayout'
import AdminLayout from './AdminLayout'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './src/configs/firebase'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './src/store'
import { handleAutoLogin } from './src/store/auth'
import FallbackSpinner from './src/components/spinner'

interface DataType {
  id: string
  accessToken: string
  refreshToken: string
  lastSignInTime: string
  email: string
}

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.auth)
  const { pending } = store

  // ** useEfects
  useEffect(() => {
    // ** onAuthStateChange
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          if (process.env.NODE_ENV === 'development') {
            console.log('User is signed in:', user)
          }

          dispatch(handleAutoLogin())
        } catch (error) {
          if (process.env.NODE_ENV === 'development') {
            console.error('Error getting access token:', error)
          }
        }
      } else {
        if (process.env.NODE_ENV === 'development') {
          console.log('User is signed out')
        }
      }
    })

    // ** Cleaner Func.
    return () => {
      unsubscribe()
    }
  }, [dispatch])

  const pathname = usePathname()
  const isBlankLayout = ['/sign-up', '/log-in', '/forgot-password', '/not-found'].includes(pathname)
  const isAdminLayout = pathname.startsWith('/admin')
  const isMainLayout = [
    '/',
    '/our-merch',
    '/activities',
    '/donate',
    '/about-us',
    '/contact',
  ].includes(pathname)

  if (pending) {
    return <FallbackSpinner />
  }
  return (
    <>
      {isBlankLayout ? (
        <BlankLayout>{children}</BlankLayout>
      ) : isAdminLayout ? (
        <AdminLayout>{children}</AdminLayout>
      ) : (
        <MainLayout>{children}</MainLayout>
      )}
    </>
  )
}

export default Layout
