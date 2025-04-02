'use client'
import React, { useRef } from 'react'
import { Navbar as MTNavbar, Collapse, Button, IconButton } from '@material-tailwind/react'
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { PatronWebType } from '@/types/patron'
import PatronDropdown from '@/components/dropdowns/patronDropdown'
import IconifyIcon from '@/components/icon'
import { clientNavigation } from '@/navigation/client.navigation'
import { Box } from '@mui/material'
import { useClickOutside } from '@/hooks/useOutsideClick'
import { handleLogout } from '@/store/slides/auth'
import { AppDispatch } from '@/store'
import { clearLoggedInUserTransactions } from '@/store/slides/transactions'

export function PageNavbar() {
  // ** States
  const [open, setOpen] = React.useState(false)

  // ** Ref
  const navRef = useRef(null)

  // ** Custom Hooks
  useClickOutside(navRef, () => setOpen(false))

  // ** Hooks
  const pathname = usePathname()
  const router = useRouter()
  const patronData = useSelector(
    (state: { auth: { data: PatronWebType | null; isLoggedIn: boolean } }) => state.auth
  )

  const auth = patronData.data
  const isLoggedIn = patronData.isLoggedIn

  function handleOpen() {
    setOpen((cur) => !cur)
  }

  React.useEffect(() => {
    window.addEventListener('resize', () => window.innerWidth >= 960 && setOpen(false))
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
    <div ref={navRef} className="px-4 sticky top-4 z-50">
      <div className="mx-auto container">
        <MTNavbar blurred color="blue" className="z-50 mt-6 relative border-0 pr-3 py-3 pl-6">
          <div className="flex items-center justify-between">
            <Image
              src="/images/logos/logo_black.png"
              alt="BuzStopBoys"
              className="hidden lg:block"
              width={80}
              height={80}
              priority
            />
            <ul className="ml-10 hidden items-center gap-8 lg:flex text-gray-900">
              {clientNavigation.map(({ name, icon, href }) => (
                <Link
                  key={name}
                  href={href}
                  className={`flex items-center gap-2 font-medium ${
                    pathname === href ? 'underline underline-offset-6 text-gray-200' : ''
                  }`}
                >
                  <IconifyIcon className="h-5 w-5" icon={icon} />
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
                  <Button color="gray" variant="text">
                    Log in
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button color="gray">Sign Up</Button>
                </Link>
              </div>
            )}

            {/* SHOW LOGO IN MIDDLE OF NAV ON SMALL SCREENS */}
            <Box className="flex  justify-between items-center w-full lg:hidden">
              {auth && isLoggedIn ? <PatronDropdown patronData={auth} /> : null}
              <Image src="/images/logos/logo_black.png" alt="BuzStopBoys" width={80} height={80} />

              <IconButton variant="text" color={'gray'} onClick={handleOpen}>
                <IconifyIcon
                  icon={open ? 'iconamoon:close-bold' : 'flowbite:bars-outline'}
                  className="h-6 w-6"
                />
              </IconButton>
            </Box>
          </div>
          <Collapse open={open}>
            <div className="container mx-auto mt-4 rounded-lg bg-white px-6 py-5">
              <ul className="flex flex-col gap-4 text-gray-900">
                {clientNavigation.map(({ name, icon, href }) => (
                  <Link
                    key={name}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-2 font-medium ${
                      pathname === href ? 'underline underline-offset-6 text-blue-400' : ''
                    }`}
                  >
                    <IconifyIcon className="h-5 w-5" icon={icon} />
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
      </div>
    </div>
  )
}

export default PageNavbar
