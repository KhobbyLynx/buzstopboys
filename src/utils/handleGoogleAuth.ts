'use client'

import { Dispatch } from '@reduxjs/toolkit'
import { UseFormSetError } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { handleGoogleAuthentication } from '@/store/slides/auth'

interface GoogleAuthParams {
  dispatch: Dispatch
  router: ReturnType<typeof useRouter>
  setError: UseFormSetError<any>
  setLoading: (loading: boolean) => void
}

export async function handleGoogleAuth({
  dispatch,
  router,
  setError,
  setLoading,
}: GoogleAuthParams) {
  setLoading(true)

  try {
    const resultAction = await dispatch(handleGoogleAuthentication() as any)

    if (handleGoogleAuthentication.fulfilled.match(resultAction)) {
      // ✅ Redirect to home page on success
      router.push('/')
    } else {
      // ❌ Handle specific error messages
      const errorMessage =
        typeof resultAction.payload === 'string'
          ? resultAction.payload
          : 'Registration failed. Please try again.'

      if (errorMessage.includes('auth/email-already-in-use')) {
        setError('password', { type: 'manual', message: 'Email Already In Use' })
      } else if (errorMessage.includes('auth/network-request-failed')) {
        setError('password', { type: 'manual', message: 'Network Error. Please try again.' })
      } else if (errorMessage.includes('auth/user-disabled')) {
        setError('password', {
          type: 'manual',
          message: 'Your account has been suspended. Contact support.',
        })
      } else {
        setError('password', { type: 'manual', message: errorMessage })
      }
    }
  } catch (error) {
    if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
      console.log('Google Auth error', error)
    }
    // Handle unexpected errors
    setError('password', {
      type: 'manual',
      message: error instanceof Error ? error.message : 'An unknown error occurred.',
    })
  } finally {
    setLoading(false)
  }
}
