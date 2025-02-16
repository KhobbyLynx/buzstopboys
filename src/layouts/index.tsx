'use client'
import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import MainLayout from './MainLayout';
import BlankLayout from './BlankLayout';
import AdminLayout from './AdminLayout';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/configs/firebase';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { handleAutoLogin } from '@/store/auth';

interface DataType {
  id: string
  accessToken: string
  refreshToken: string
  lastSignInTime: string
  email: string
}

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const dispatch = useDispatch<AppDispatch>()

    // ** useEfects
    useEffect(() => {
      // ** onAuthStateChange
      const unsubscribe = onAuthStateChanged(auth,async (user) => {
        if (user) {
          try {
            console.log('User is signed in:', user)
            
            dispatch(handleAutoLogin())
          } catch (error) {
            console.error("Error getting access token:", error);
          }
        } else {
          console.log('User is signed out')
        }
      })
 
      // ** Cleaner Func.
      return () => {
        unsubscribe()
      }
    }, [dispatch])
    

    const pathname = usePathname();
    const isBlankLayout = ['/sign-up', '/log-in','/forgot-password', '/not-found'].includes(pathname);
    const isAdminLayout = pathname.startsWith('/admin');
    const isMainLayout = ['/', '/our-merch', '/activities', '/donate', '/about-us', '/contact', ].includes(pathname);
    
  return (
    <>
        {isBlankLayout ? (
           <BlankLayout>{children}</BlankLayout>
         ) : isAdminLayout ?  (
           <AdminLayout>{children}</AdminLayout>
        ) : (
          <MainLayout>{children}</MainLayout>
        )
        }
    </>
  );
};

export default Layout;