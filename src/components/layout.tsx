'use client'

// ** React imports
import React, { useEffect, useState } from 'react'

// ** Store
import { Provider } from 'react-redux'
import { store } from '@/store'

// ** Loader Import
import { AppProgressProvider as ProgressProvider } from '@bprogress/next'

import ScrollToTop from './scrollToTop'
import ScrollToTopOnPageChange from '@/navigation/scrollToTopOnPageChange'

export function ThemeProviderLayout({ children }: { children: React.ReactNode }) {
  const [showSpinner, setShowSpinner] = useState(false)

  // Handle spinner visibility based on screen width
  useEffect(() => {
    const handleResize = () => {
      setShowSpinner(window.innerWidth <= 768) // Spinner for screens <= 768px
    }

    handleResize() // Check on mount
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Provider store={store}>
      <ScrollToTopOnPageChange />
      <ProgressProvider color="#ff0707" height="4px" options={{ showSpinner }} shallowRouting>
        {children}
      </ProgressProvider>

      <ScrollToTop />
    </Provider>
  )
}

export default ThemeProviderLayout
