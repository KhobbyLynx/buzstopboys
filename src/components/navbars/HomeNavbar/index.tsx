'use client'
import React, { useRef } from 'react'
import { Navbar as MTNavbar, Collapse, Button, IconButton } from '@material-tailwind/react'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import PatronDropdown from '../../dropdowns/patronDropdown'
import { useDispatch, useSelector } from 'react-redux'
import { PatronWebType } from '@/types/patron'
import IconifyIcon from '../../icon'
import { clientNavigation } from '@/navigation/client.navigation'
import { Box } from '@mui/material'
import { useClickOutside } from '@/hooks/useOutsideClick'
import { AppDispatch } from '@/store'
import { handleLogout } from '@/store/auth'

export function Navbar() {
  const [open, setOpen] = React.useState(false)
  const [isScrolling, setIsScrolling] = React.useState(false)

  const navRef = useRef(null)

  useClickOutside(navRef, () => setOpen(false))

  const patronData = useSelector(
    (state: { auth: { data: PatronWebType | null; isLoggedIn: boolean } }) => state.auth
  )

  const auth = patronData.data
  const isLoggedIn = patronData.isLoggedIn

  const pathname = usePathname()
  const router = useRouter()

  const handleOpen = () => setOpen((cur) => !cur)

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setOpen(false)
      }
    }

    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolling(true)
      } else {
        setIsScrolling(false)
      }
    }

    // Add event listeners
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll)

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const dispatch = useDispatch<AppDispatch>()

  const handleSignout = async () => {
    setOpen(false)
    try {
      if (auth?.id) {
        await dispatch(handleLogout(auth.id))
        router.push('/')
      }
    } catch (error) {
      if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
        console.error('Error during signout:', error)
      }
    }
  }

  return (
    <MTNavbar
      ref={navRef}
      shadow={false}
      fullWidth
      blurred={false}
      color={isScrolling ? 'blue' : 'transparent'}
      className="fixed top-0 z-50 border-0"
    >
      <div className="container mx-auto flex items-center justify-between">
        <Image
          src={isScrolling ? `/images/logos/logo_black.png` : '/images/logos/buzstopboys.png'}
          alt="BuzStopBoys"
          width={80}
          height={80}
          className="hidden lg:block"
          priority
        />
        <ul
          className={`ml-10 hidden items-center gap-6 lg:flex ${
            isScrolling ? 'text-gray-900' : 'text-white'
          }`}
        >
          {clientNavigation.map(({ name, icon, href }) => (
            <Link
              key={name}
              href={href}
              className={`flex items-center gap-2 font-medium ${
                pathname === href ? 'underline underline-offset-6 text-gray-200' : ''
              }`}
            >
              <IconifyIcon icon={icon || ''} className="h-5 w-5" />
              <span>{name}</span>
            </Link>
          ))}
        </ul>

        {auth && isLoggedIn ? (
          <div className="hidden lg:inline-block">
            <PatronDropdown patronData={auth} />
          </div>
        ) : (
          <div className="hidden items-center gap-4 lg:flex">
            <Link href="/log-in">
              <Button color={isScrolling ? 'gray' : 'white'} variant="text">
                Log in
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button color={isScrolling ? 'gray' : 'white'}>Sign Up</Button>
            </Link>
          </div>
        )}

        {/* SHOW LOGO IN MIDDLE OF NAV ON SMALL SCREENS */}
        <Box className="flex  justify-between items-center w-full lg:hidden">
          {auth && isLoggedIn ? <PatronDropdown patronData={auth} /> : null}

          <Image
            src={isScrolling ? `/images/logos/logo_black.png` : '/images/logos/buzstopboys.png'}
            alt="BuzStopBoys"
            width={80}
            height={80}
          />

          <IconButton variant="text" color={isScrolling ? 'gray' : 'white'} onClick={handleOpen}>
            <IconifyIcon
              icon={open ? 'iconamoon:close-bold' : 'flowbite:bars-outline'}
              className="h-6 w-6"
            />
          </IconButton>
        </Box>
      </div>
      <Collapse open={open}>
        <div className="container mx-auto mt-4 rounded-lg bg-white px-6 py-5">
          <ul className="flex flex-col gap-4">
            {clientNavigation.map(({ name, icon, href }) => (
              <Link
                key={name}
                href={href}
                className={`flex items-center gap-2 font-medium ${
                  pathname === href ? 'underline underline-offset-6 text-blue-400' : 'text-gray-900'
                }`}
                onClick={handleOpen}
              >
                <IconifyIcon className="h-5 w-5" icon={icon || ''} />
                {name}
              </Link>
            ))}
          </ul>
          {auth && isLoggedIn ? (
            <Button
              variant="text"
              onClick={handleSignout}
              className="bg-gray-900 text-white mt-6 hover:bg-blue-gray-700"
              fullWidth
            >
              Sign Out
            </Button>
          ) : (
            <div className="mt-6 flex items-center gap-4">
              <Link href="/log-in" onClick={() => setOpen(false)}>
                <Button variant="text">Log in</Button>
              </Link>
              <Link href="/sign-up" onClick={() => setOpen(false)}>
                <Button color="gray">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </Collapse>
    </MTNavbar>
  )
}

export default Navbar
