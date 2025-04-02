import IconifyIcon from '@/components/icon'
import { Typography, IconButton } from '@material-tailwind/react'
import Newsletter from '@/view/pages/Newsletter'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const CURRENT_YEAR = new Date().getFullYear()
const LINKS = [
  {
    name: 'Our Merch',
    href: '/our-merch',
  },
  {
    name: 'About Us',
    href: '/about',
  },
  {
    name: 'Contact Us',
    href: '/contact',
  },
  {
    name: 'Donations',
    href: '/donate',
  },
]

const NoNewsletter = ['user', 'contact', 'our-merch']

export function PatronFooter() {
  const pathname = usePathname()
  const currentPath = pathname.split('/')[1]

  return (
    <footer className="pb-5 p-10 md:pt-4">
      <div className="container flex flex-col mx-auto">
        {NoNewsletter.includes(currentPath) ? null : <Newsletter />}
        <div className="flex flex-col md:flex-row items-center !justify-between">
          <Typography variant="h6" className="text-gray-900">
            BuzStopBoys
          </Typography>
          <ul className="flex flex-col md:flex-row justify-center my-4 md:my-0 w-max mx-auto items-center gap-4">
            {LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                color="white"
                className="font-normal !text-gray-700 hover:!text-gray-900 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </ul>
          <div className="flex w-fit justify-center gap-2">
            <Link href="https://x.com/buzstopboys">
              <IconButton size="sm" color="gray" variant="text">
                <IconifyIcon icon="fa6-brands:square-x-twitter" className="w-6 h-6" />
              </IconButton>
            </Link>
            <Link href="https://web.facebook.com/Buzstopboys">
              <IconButton size="sm" color="gray" variant="text">
                <IconifyIcon icon="fa-brands:facebook" className="w-6 h-6" />
              </IconButton>
            </Link>
            <Link href="https://www.instagram.com/buzstopboys/">
              <IconButton size="sm" color="gray" variant="text">
                <IconifyIcon icon="ri:instagram-fill" className="w-6 h-6" />
              </IconButton>
            </Link>
            <Link href="https://www.youtube.com/@buzstopboys">
              <IconButton size="sm" color="gray" variant="text">
                <IconifyIcon icon="ix:youtube-filled" className="w-6 h-6" />
              </IconButton>
            </Link>
            <Link href="https://www.tiktok.com/@buzstopboys">
              <IconButton size="sm" color="gray" variant="text">
                <IconifyIcon icon="ic:round-tiktok" className="w-6 h-6" />
              </IconButton>
            </Link>
          </div>
        </div>
        <Typography color="blue-gray" className="text-center mt-12 font-normal !text-gray-900">
          &copy; {CURRENT_YEAR} BuzStopBoys. All Rights Reservered.
        </Typography>
      </div>
    </footer>
  )
}

export default PatronFooter
