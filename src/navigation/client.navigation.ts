import { NavigationType } from './type'

export const clientNavigation: NavigationType[] = [
  {
    name: 'Home',
    icon: 'heroicons:home-solid',
    href: '/',
  },
  {
    name: 'Our Merch',
    icon: 'fa6-brands:shopify',
    href: '/our-merch',
  },
  {
    name: 'Activities',
    icon: 'healthicons:miner-worker-alt',
    href: '/activities',
  },
  {
    name: 'Events',
    icon: 'mdi:event-auto',
    href: '/events',
  },
  {
    name: 'Donations',
    icon: 'streamline:give-gift-solid',
    href: '/donate',
  },
  {
    name: 'About Us',
    icon: 'entypo:info-with-circle',
    href: '/about-us',
  },
  {
    name: 'Contact',
    icon: 'mdi:phone-log',
    href: '/contact',
  },
]
