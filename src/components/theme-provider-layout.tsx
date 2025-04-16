'use client'

import type React from 'react'

import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { createContext, useContext, useEffect, useState } from 'react'

type ThemeMode = 'light' | 'dark'

interface ThemeContextType {
  mode: ThemeMode
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleTheme: () => {},
})

export const useTheme = () => useContext(ThemeContext)

export function ThemeProviderLayout({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Check for user preference in localStorage
    const savedMode = localStorage.getItem('theme') as ThemeMode | null
    if (savedMode) {
      setMode(savedMode)
      document.documentElement.classList.toggle('dark', savedMode === 'dark')
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setMode('dark')
      document.documentElement.classList.add('dark')
    }
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light'
    setMode(newMode)
    localStorage.setItem('theme', newMode)
    document.documentElement.classList.toggle('dark', newMode === 'dark')
  }

  // Create MUI theme
  const theme = createTheme({
    palette: {
      mode: mode,
      primary: {
        main: mode === 'light' ? '#2196F3' : '#42A5F5',
        light: '#42A5F5',
        dark: '#1565C0',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: mode === 'light' ? '#4CAF50' : '#81C784',
        light: '#81C784',
        dark: '#2E7D32',
        contrastText: '#FFFFFF',
      },
      background: {
        default: mode === 'light' ? '#FFFFFF' : '#121212',
        paper: mode === 'light' ? '#FFFFFF' : '#1E1E1E',
      },
      text: {
        primary: mode === 'light' ? '#292929' : '#F5F5F5',
        secondary: mode === 'light' ? '#5C5C5C' : '#A3A3A3',
      },
      error: {
        main: '#D32F2F',
      },
      warning: {
        main: '#FFA000',
      },
      info: {
        main: '#0288D1',
      },
      success: {
        main: '#388E3C',
      },
      divider: mode === 'light' ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)',
    },
    typography: {
      fontFamily: 'var(--font-poppins), sans-serif',
      h1: {
        fontFamily: 'var(--font-montserrat), sans-serif',
        fontWeight: 700,
      },
      h2: {
        fontFamily: 'var(--font-montserrat), sans-serif',
        fontWeight: 700,
      },
      h3: {
        fontFamily: 'var(--font-montserrat), sans-serif',
        fontWeight: 600,
      },
      h4: {
        fontFamily: 'var(--font-montserrat), sans-serif',
        fontWeight: 600,
      },
      h5: {
        fontFamily: 'var(--font-montserrat), sans-serif',
        fontWeight: 600,
      },
      h6: {
        fontFamily: 'var(--font-montserrat), sans-serif',
        fontWeight: 600,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 600,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '16px',
            boxShadow:
              mode === 'light'
                ? '0px 4px 20px rgba(0, 0, 0, 0.05)'
                : '0px 4px 20px rgba(0, 0, 0, 0.2)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar': {
              width: '8px',
              height: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: mode === 'light' ? '#f1f1f1' : '#2d2d2d',
            },
            '&::-webkit-scrollbar-thumb': {
              background: mode === 'light' ? '#c1c1c1' : '#5c5c5c',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: mode === 'light' ? '#a8a8a8' : '#6e6e6e',
            },
          },
        },
      },
    },
  })

  // Prevent hydration mismatch
  if (!mounted) {
    return null
  }

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

export default ThemeProviderLayout
