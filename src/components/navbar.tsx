import React from "react";
import {
  Navbar as MTNavbar,
  Collapse,
  Button,
  IconButton,
} from "@material-tailwind/react";
import {
  XMarkIcon,
  Bars3Icon,
  HomeIcon,
  InformationCircleIcon,
  InboxArrowDownIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

interface NavItemProps {
  children: React.ReactNode;
  href?: string;
}

const NAV_MENU = [
  {
    name: "Home",
    icon: HomeIcon,
    href: "/"
  },
  {
    name: "Our Merch",
    icon: InboxArrowDownIcon,
    href: "/our-merch"
  },
  {
    name: "Activities",
    icon: InboxArrowDownIcon,
    href: "/activities"
  },
  {
    name: "Donations",
    icon: InboxArrowDownIcon,
    href: "/donate"
  },
  {
    name: "About Us",
    icon: InformationCircleIcon,
    href: "/about-us"
  },
  {
    name: "Contact",
    icon: PhoneIcon,
    href: "/contact",
  },
];

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [isScrolling, setIsScrolling] = React.useState(false);

  const handleOpen = () => setOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    );
  }, []);

  React.useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 0) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <MTNavbar
      shadow={false}
      fullWidth
      blurred={false}
      color={isScrolling ? "blue" : "transparent"}
      className="fixed top-0 z-50 border-0"
    >
      <div className="container mx-auto flex items-center justify-between">
        <Image src={isScrolling ? `/logos/logo_black.png` : '/logos/buzstopboys.png'} alt="BuzStopBoys" width={80} height={80}/>
        <ul
          className={`ml-10 hidden items-center gap-6 lg:flex ${
            isScrolling ? "text-gray-900" : "text-white"
          }`}
        >
          {NAV_MENU.map(({ name, icon: Icon, href }) => (
            <Link key={name} href={href} className="flex items-center gap-2 font-medium">
              <Icon className="h-5 w-5" />
              <span>{name}</span>
            </Link>
          ))}
        </ul>
        <div className="hidden items-center gap-4 lg:flex">
          <Link href='/log-in'>
          <Button color={isScrolling ? "gray" : "white"} variant="text">
           Log in
          </Button>
          </Link>
        <Link href='/sign-up'>
            <Button color={isScrolling ? "gray" : "white"}>Sign Up</Button>
        </Link>
        </div>
        <IconButton
          variant="text"
          color={isScrolling ? "gray" : "white"}
          onClick={handleOpen}
          className="ml-auto inline-block lg:hidden"
        >
          {open ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </IconButton>
      </div>
        <Collapse open={open}>
        <div className="container mx-auto mt-4 rounded-lg bg-white px-6 py-5">
          <ul className="flex flex-col gap-4 text-gray-900">
            {NAV_MENU.map(({ name, icon: Icon, href }) => (
              <Link key={name} href={href} className="flex items-center gap-2 font-medium">
                <Icon className="h-5 w-5" />
                {name}
              </Link>
            ))}
          </ul>
          <div className="mt-6 flex items-center gap-4">
            <Link href='/log-in'>
            <Button variant="text">Log in</Button>
          </Link>
        <Link href='/sign-up'>
        <Button color="gray">Sign Up</Button>
        </Link>
          </div>
        </div>
      </Collapse>
    </MTNavbar>
  );
}

export default Navbar;
