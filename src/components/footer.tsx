import {
  Typography,
  IconButton,
  Input,
  Button,
} from "@material-tailwind/react";
import Link from "next/link";

const CURRENT_YEAR = new Date().getFullYear();
const LINKS = [
  {
    name: 'Our Merch',
    href: '/our-merch'
  },
  {
    name: 'About Us',
    href: '/about'
  },
  {
    name: 'Contact Us',
    href: '/contact'
  },
  {
    name: 'Donations',
    href: '/donate'
  }
]

export function Footer() {
  return (
    <footer className="pb-5 p-10 md:pt-10">
      <div className="container flex flex-col mx-auto">
        <div className="flex !w-full py-10 mb-5 md:mb-20 flex-col justify-center !items-center bg-gray-900 container max-w-6xl mx-auto rounded-2xl p-5 bg-[url('/image/banner/cover7.jpg')] bg-right-bottom bg-cover bg-no-repeat" >
          <Typography
            className="text-2xl md:text-3xl text-center font-bold "
            color="white"
          >
            Join our community!
          </Typography>
          <Typography
            color="white"
            className=" md:w-7/12 text-center my-3 !text-base"
          >
            Stay updated on our mission to create cleaner, healthier communities! Subscribe to our newsletter for the latest updates, upcoming events, transformation stories, and ways to get involved.
          </Typography>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 md:flex-row">
            <div className="w-80">
              <Input label="Email" color="white" crossOrigin={""} />
            </div>
            <Button size="md" className="lg:w-32" fullWidth color="white">
              subscribe
            </Button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center !justify-between">
          <Typography
            variant="h6"
            className="text-gray-900"
          >
            BuzStopBoys
          </Typography>
          <ul className="flex justify-center my-4 md:my-0 w-max mx-auto items-center gap-4">
            {LINKS.map((link) => (
              <Link  key={link.name} href={link.href} color="white" className="font-normal !text-gray-700 hover:!text-gray-900 transition-colors">
                {link.name}
              </Link>
            ))}
          </ul>
          <div className="flex w-fit justify-center gap-2">
            <IconButton size="sm" color="white" variant="text">
            <i className="fa-brands fa-twitter text-lg" />
            </IconButton>
            <IconButton size="sm" color="white" variant="text">
              <i className="fa-brands fa-youtube text-lg" />
            </IconButton>
            <IconButton size="sm" color="white" variant="text">
              <i className="fa-brands fa-instagram text-lg" />
            </IconButton>
            <IconButton size="sm" color="white" variant="text">
              <i className="fa-brands fa-tiktok text-lg" />
            </IconButton>
            <IconButton size="sm" color="white" variant="text">
              <i className="fa-brands fa-facebook text-lg" />
            </IconButton>
          </div>
        </div>
        <Typography
          color="blue-gray"
          className="text-center mt-12 font-normal !text-gray-900"
        >
          &copy; {CURRENT_YEAR} BuzStopBoys. {" "}
          All Rights Reservered.
        </Typography>
      </div>
    </footer>
  );
}

export default Footer;
