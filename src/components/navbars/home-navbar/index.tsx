'use client'
import React, { useRef } from 'react'
import { Navbar as MTNavbar, Collapse, IconButton } from '@material-tailwind/react'
import { Button } from '@mui/material'

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
import { handleLogout } from '@/store/slides/auth'
import { clearLoggedInUserTransactions } from '@/store/slides/transactions'
import ThemeToggle from '@/components/theme/theme-toggle'

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
        await dispatch(handleLogout(auth.id)).then(() => {
          dispatch(clearLoggedInUserTransactions())
          router.push('/')
        })
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
      className={`fixed top-0 z-50 border-0 transition-all duration-300 ${
        isScrolling ? 'bg-primary !important' : 'bg-transparent'
      }`}
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
            {/* <ThemeToggle /> */}
            <PatronDropdown patronData={auth} />
          </div>
        ) : (
          <div className="hidden items-center gap-4 lg:flex">
            {/* <ThemeToggle /> */}

            <Link href="/log-in">
              <Button
                sx={{
                  color: isScrolling ? '#1F2937' : '#ffffff',
                  '&:hover': {
                    color: isScrolling ? '#27364bcc' : '#f0f0f0e0',
                  },
                  textTransform: 'uppercase',
                }}
                variant="text"
              >
                Log in
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: isScrolling ? '#1F2937' : '#f3f8ff',
                  color: isScrolling ? '#D1D5DB' : '#1F2937',
                  '&:hover': {
                    backgroundColor: isScrolling ? '#27364bcc' : '#b4bbc8e2',
                  },
                  borderRadius: '4px',
                  padding: '5px 20px',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  transition: 'all 0.3s ease-in-out',
                }}
              >
                Sign Up
              </Button>
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

          <Box className="flex justify-end items-center align-middle">
            {/* <ThemeToggle /> */}
            <IconButton
              variant="text"
              color={isScrolling ? 'gray' : 'white'}
              className="flex justify-center align-middle items-center ms-1"
              onClick={handleOpen}
            >
              <IconifyIcon
                icon={open ? 'iconamoon:close-bold' : 'flowbite:bars-outline'}
                className="h-6 w-6"
              />
            </IconButton>
          </Box>
        </Box>
      </div>
      <Collapse open={open}>
        <div className="container mx-auto mt-4 mb-4 rounded-lg bg-white px-6 py-5">
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
              variant="contained"
              onClick={handleSignout}
              fullWidth
              sx={{
                backgroundColor: '#27364b',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#27364bbd',
                },
                borderRadius: '4px',
                padding: '5px 20px',
                mt: 2,
                textTransform: 'uppercase',
                fontWeight: 600,
                transition: 'all 0.3s ease-in-out',
              }}
            >
              Sign Out
            </Button>
          ) : (
            <div className="mt-6 flex items-center gap-4">
              <Link href="/log-in" onClick={() => setOpen(false)}>
                <Button
                  variant="outlined"
                  sx={{
                    color: '#27364b',
                    borderColor: '#27364b',
                    '&:hover': {
                      color: '#fff',
                      backgroundColor: '#27364b',
                      borderColor: '#27364b',
                    },
                    borderRadius: '4px',
                    padding: '5px 20px',
                    fontWeight: 600,
                    transition: 'all 0.3s ease-in-out',
                    textTransform: 'uppercase',
                  }}
                >
                  Log in
                </Button>
              </Link>
              <Link href="/sign-in" onClick={() => setOpen(false)}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: '#27364b',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#27364bbd',
                    },
                    borderRadius: '4px',
                    padding: '5px 20px',
                    fontWeight: 600,
                    transition: 'all 0.3s ease-in-out',
                    textTransform: 'uppercase',
                  }}
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </Collapse>
    </MTNavbar>
  )
}

export default Navbar
