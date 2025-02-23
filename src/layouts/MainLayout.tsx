'use client'
import React from 'react'
import { Box } from '@mui/material'
import { usePathname } from 'next/navigation'
import PageNavbar from '@/components/navbars/PageNavbar'
import Navbar from '@/components/navbars/HomeNavbar'
import PatronFooter from '@/components/footers/PatronFooter'

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname()
  return (
    <Box>
      {/* Different Navbar for Homepage and the rest of the pages */}
      {pathname === '/' ? <Navbar /> : <PageNavbar />}

      {/* Main Content */}
      <Box component="main">{children}</Box>

      {/* Footer */}
      <PatronFooter />
    </Box>
  )
}

export default MainLayout
