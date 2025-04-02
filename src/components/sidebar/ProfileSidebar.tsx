'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import IconifyIcon from '../icon'
import { Avatar, Box } from '@mui/material'
import { Icon } from '@iconify/react'
import { userProfileNavigation } from '@/navigation/profile.navigation'

const ProfileSidebar = () => {
  const [collapseShow, setCollapseShow] = useState(
    'hidden transition-all transition-discrete delay-300 duration-300 ease-in-out '
  )

  // ** Ref
  const navRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (navRef.current && !navRef.current.contains(event.target as Node)) {
      setCollapseShow('hidden')
    }
  }, [])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [handleClickOutside])

  // ** Hooks
  const pathname = usePathname()

  const handleShow = () => {
    if (collapseShow.includes('hidden')) {
      setCollapseShow(
        'bg-white py-3 transition-all transition-discrete delay-300 duration-300 ease-in '
      )
    } else {
      setCollapseShow('hidden')
    }
  }

  return (
    <nav
      ref={navRef}
      className="md:fixed md:top-0 md:bottom-0 md:w-64 shadow-xl bg-white flex flex-col py-2 px-4 z-10"
    >
      {/* Brand */}
      <Box className="flex justify-between items-center">
        <Link href="/user/profile" className="sm:pb-2 md:pb-4 cursor-pointer" onClick={handleShow}>
          <Avatar src="/images/logos/logo_black.png" alt="logo" sx={{ width: 82, height: 82 }} />
        </Link>

        {/* Sidebar Collapse Icon */}
        <Icon
          icon={collapseShow === 'hidden' ? 'la:dot-circle' : 'la:circle'}
          className="w-8 h-8 md:hidden"
          onClick={handleShow}
        />
      </Box>

      {/* Collapsible Menu */}
      <div className={`md:flex md:flex-col ${collapseShow}`}>
        {/* Webpage Link */}
        <h6 className="text-xs uppercase font-bold py-2">Web Page</h6>
        <ul>
          <li>
            <Link href="/" onClick={handleShow}>
              <div
                className={`group py-3 font-bold flex items-center transition duration-300 ${
                  pathname === '/'
                    ? 'text-white bg-blue-500'
                    : 'text-gray-700 hover:text-white hover:bg-gray-400'
                }`}
              >
                <IconifyIcon icon="iconoir:www" className="mr-2 ml-2" />
                Go To HomePage
              </div>
            </Link>
          </li>
        </ul>

        {/* Admin Pages */}
        <h6 className="text-xs uppercase font-bold py-2">Admin Pages</h6>
        <ul>
          {userProfileNavigation.map(({ name, href, icon }) => (
            <li key={href} className="mb-1">
              <Link href={href} onClick={handleShow}>
                <div
                  className={`group py-3 font-bold flex items-center transition duration-300 ${
                    pathname.includes(href)
                      ? 'text-white bg-blue-500'
                      : 'text-gray-700 hover:text-white hover:bg-gray-400'
                  }`}
                >
                  <IconifyIcon icon={icon} className="mr-2 ml-2" />
                  {name}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default ProfileSidebar
