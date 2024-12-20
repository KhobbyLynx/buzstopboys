"use client"
import React from 'react';
import { Box } from '@mui/material';
import { usePathname } from 'next/navigation';
import { Footer, Navbar } from '@/components';
import PageNavbar from '@/view/pages/PageNavbar';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const pathname = usePathname();
  return (
    <Box>
        {/* Different Navbar for Homepage and the rest of the pages */}
      {pathname === '/'? <Navbar/> : <PageNavbar />}

        {/* Main Content */}
      <Box component="main">{children}</Box>

        {/* Footer */}
      <Footer />
    </Box>
  );
};

export default MainLayout;