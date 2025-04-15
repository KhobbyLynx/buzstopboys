'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { ThemeProvider as NextThemeProvider } from 'next-themes'
import MuiThemeProvider from '../theme/mui-theme-provider'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from '@/store'
import { AppProgressProvider as ProgressProvider } from '@bprogress/next'
import Layout from '@/layouts'
import ScrollToTopOnPageChange from '@/navigation/scrollToTopOnPageChange'
import { FixedPlugin } from '../fixed-plugin'
import ScrollToTop from '../common/scrollToTop'

interface ProvidersProps {
  children: ReactNode
}

export default function Providers({ children }: ProvidersProps) {
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
    <ReduxProvider store={store}>
      <ScrollToTopOnPageChange />
      <NextThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <ProgressProvider color="#231eb5" height="4px" options={{ showSpinner }} shallowRouting>
          <MuiThemeProvider>
            <Layout>{children}</Layout>
          </MuiThemeProvider>
        </ProgressProvider>

        <FixedPlugin />
        <ScrollToTop />
      </NextThemeProvider>
    </ReduxProvider>
  )
}
