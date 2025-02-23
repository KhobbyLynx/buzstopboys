import IconifyIcon from '@/components/icon'
import { Typography, IconButton, Input, Button } from '@material-tailwind/react'
import Link from 'next/link'

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

export function PatronFooter() {
  return (
    <footer className="pb-5 p-10 md:pt-4">
      <div className="container flex flex-col mx-auto">
        <div className="flex !w-full py-10 mb-5 md:mb-20 flex-col justify-center !items-center bg-gray-900 container max-w-6xl mx-auto rounded-2xl p-5 bg-[url('/images/banner/cover7.jpg')] bg-right-bottom bg-cover bg-no-repeat">
          <Typography className="text-2xl md:text-3xl text-center font-bold " color="white">
            Join our community!
          </Typography>
          <Typography color="white" className=" md:w-7/12 text-center my-3 !text-base">
            Stay updated on our mission to create cleaner, healthier communities! Subscribe to our
            newsletter for the latest updates, upcoming events, transformation stories, and ways to
            get involved.
          </Typography>
          <div className="mt-8 w-full flex flex-col items-center justify-center gap-4 md:flex-row">
            <div className="w-full md:w-80">
              <Input label="Email" color="white" crossOrigin={''} />
            </div>
            <Button size="md" className="w-full md:w-60 lg:w-32" fullWidth color="white">
              subscribe
            </Button>
          </div>
        </div>
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
            <IconButton size="sm" color="gray" variant="text">
              <IconifyIcon icon="fa6-brands:square-x-twitter" className="w-6 h-6" />
            </IconButton>
            <IconButton size="sm" color="gray" variant="text">
              <IconifyIcon icon="fa-brands:facebook" className="w-6 h-6" />
            </IconButton>
            <IconButton size="sm" color="gray" variant="text">
              <IconifyIcon icon="ri:instagram-fill" className="w-6 h-6" />
            </IconButton>
            <IconButton size="sm" color="gray" variant="text">
              <IconifyIcon icon="ix:youtube-filled" className="w-6 h-6" />
            </IconButton>
            <IconButton size="sm" color="gray" variant="text">
              <IconifyIcon icon="ic:round-tiktok" className="w-6 h-6" />
            </IconButton>
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
