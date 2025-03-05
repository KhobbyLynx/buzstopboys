import { NavigationType } from './type'

export const userProfileNavigation: NavigationType[] = [
  {
    name: 'Profile',
    icon: 'ix:user-profile-filled',
    href: '/user/profile',
  },
  {
    name: 'Inbox',
    icon: 'wpf:message',
    href: '/user/inbox',
  },
  {
    name: 'Donations',
    icon: 'la:donate',
    href: '/user/donations',
  },
  {
    name: 'Settings',
    icon: 'material-symbols:settings',
    href: '/user/settings',
  },
]
