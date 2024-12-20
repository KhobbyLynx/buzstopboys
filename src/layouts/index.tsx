'use client'
import React from 'react';
import { usePathname } from 'next/navigation';
import MainLayout from './MainLayout';
import BlankLayout from './BlankLayout';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const pathname = usePathname();
    const isBlankLayout = ['/sign-up', '/log-in'].includes(pathname);
    
  return (
    <>
        {isBlankLayout ? (
           <BlankLayout>{children}</BlankLayout>
         ) : (
           <MainLayout>{children}</MainLayout>
        )}
    </>
  );
};

export default Layout;