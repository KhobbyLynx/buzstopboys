'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { adminNavigation } from '@/navigation/admin.navigation'
import IconifyIcon from '../icon'
import { Avatar, Box } from '@mui/material'
import { Icon } from '@iconify/react'

const Sidebar = () => {
  const [collapseShow, setCollapseShow] = useState('hidden')
  const pathname = usePathname()

  const handleShow = () => {
    if (collapseShow.includes('hidden')) {
      setCollapseShow('bg-white py-3')
    } else {
      setCollapseShow('hidden')
    }
  }

  return (
    <nav className="md:fixed md:top-0 md:bottom-0 md:w-64 shadow-xl bg-white flex flex-col py-2 px-2 z-10">
      {/* Brand */}
      <Box className="flex justify-between items-center">
        <Link href="/admin/dashboard" className="sm:pb-2 md:pb-4 cursor-pointer">
          <Avatar src="/images/logos/logo_black.png" alt="logo" sx={{ width: 82, height: 82 }} />
        </Link>

        {/* Sidebar Collapse Icon */}
        <Icon
          icon={collapseShow === 'hidden' ? 'la:circle' : 'la:dot-circle'}
          className="w-8 h-8 md:hidden"
          onClick={handleShow}
        />
      </Box>

      {/* Collapsible Menu */}
      <div className={`md:flex md:flex-col ${collapseShow}`}>
        {/* Webpage Link */}
        <h6 className="text-xs uppercase font-bold py-2">Webpage</h6>
        <ul>
          <li>
            <Link href="/">
              <div
                className={`group py-3 font-bold flex items-center transition duration-300 ${
                  pathname === '/'
                    ? 'text-white bg-blue-500'
                    : 'text-gray-700 hover:text-white hover:bg-gray-400'
                }`}
              >
                <IconifyIcon icon="iconoir:www" className="mr-2 ml-2" />
                Go to Webpage
              </div>
            </Link>
          </li>
        </ul>

        {/* Admin Pages */}
        <h6 className="text-xs uppercase font-bold py-2">Admin Pages</h6>
        <ul>
          {adminNavigation.map(({ name, href, icon }) => (
            <li key={href} className="mb-1">
              <Link href={href}>
                <div
                  className={`group py-3 font-bold flex items-center transition duration-300 ${
                    pathname.includes(href)
                      ? 'text-white bg-blue-500'
                      : 'text-gray-700 hover:text-white hover:bg-gray-400'
                  }`}
                >
                  <i className={`fa-solid ${icon} mr-2 ml-2`}></i>
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

export default Sidebar
