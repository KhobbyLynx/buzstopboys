"use client"
import React from "react";
import {
  Navbar as MTNavbar,
  Collapse,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import {
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { PatronWebType } from "@/types/patron";
import PatronDropdown from "@/components/dropdowns/patronDropdown";
import IconifyIcon from "@/components/icon";
import { clientNavigation } from "@/navigation/client.navigation";

export function PageNavbar() {
  // ** States
  const [open, setOpen] = React.useState(false);

  // ** Hooks
  const pathname = usePathname();
   const patronData = useSelector((state: { auth: { data: PatronWebType | null, isLoggedIn: boolean} }) => state.auth)
  
    const auth = patronData.data
    const isLoggedIn = patronData.isLoggedIn
    
  function handleOpen() {
    setOpen((cur) => !cur);
  }

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    );
  }, []);

  return (
    <div className="px-4 sticky top-4 z-50">
      <div className="mx-auto container">
        <MTNavbar
          blurred
          color="blue"
          className="z-50 mt-6 relative border-0 pr-3 py-3 pl-6"
        >
          <div className="flex items-center justify-between">
            <Image src="/images/logos/logo_black.png" alt="BuzStopBoys" width={80} height={80}/>
            <ul className="ml-10 hidden items-center gap-8 lg:flex text-gray-900">
            {clientNavigation.map(({ name, icon, href }) => (
            <Link key={name} href={href} className={`flex items-center gap-2 font-medium ${pathname === href ? 'underline underline-offset-6 text-gray-200' : ''}`}>
              <IconifyIcon className="h-5 w-5" icon={icon}/>
              <span>{name}</span>
            </Link>
          ))}
            </ul>
            {auth && isLoggedIn ? <PatronDropdown patronData={auth}/> :
            <div className="hidden items-center gap-4 lg:flex">
          <Link href='/log-in'>
          <Button color="gray" variant="text">
           Log in
          </Button>
          </Link>
        <Link href='/sign-up'>
            <Button color="gray">Sign Up</Button>
        </Link>
        </div>}
            <IconButton
              variant="text"
              color="gray"
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
            {clientNavigation.map(({ name, icon, href }) => (
              <Link key={name} href={href} className={`flex items-center gap-2 font-medium ${pathname === href ? 'underline underline-offset-6 text-blue-400' : ''}`}>
                <IconifyIcon className="h-5 w-5" icon={icon}/>
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
      </div>
    </div>
  );
}

export default PageNavbar;
