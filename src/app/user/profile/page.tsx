'use client'

// ** Imports
import { RootState } from '@/store'
import ProfileTab from '@/view/user/profile'
import { useEffect, useState, useMemo } from 'react'
import { useSelector } from 'react-redux'

// ** Types
export type ProfileTabCommonType = {
  icon: string
  value: string
  property: string
}

export type ProfileTabSoicalType = {
  icon: string
  link?: string
}

export type ProfileTabType = {
  about: ProfileTabCommonType[]
  contacts: ProfileTabCommonType[]
  socials: ProfileTabSoicalType[]
  overview: ProfileTabCommonType[]
}

export type Settings = {
  id: string
}

export type UserProfileActiveTab = ProfileTabType | Settings

// Page Component
export default function UserProfileTab() {
  const [data, setData] = useState<UserProfileActiveTab | null>(null)

  const profile = useSelector((state: RootState) => state.auth.data)
  const { id, fullname, username, email, contact, onlineStatus, verified, role, socials } =
    profile || {}

  // Memoized Profile Data to prevent redefinition on every render
  const profileCard = useMemo(
    () => ({
      about: [
        { property: 'Full Name', value: fullname || 'N/A', icon: 'tabler:user' },
        { property: 'Username', value: username || 'N/A', icon: 'tabler:user' },
        { property: 'Status', value: onlineStatus ? 'Online' : 'Offline', icon: 'tabler:check' },
        { property: 'Verified', value: verified ? 'Verified' : 'Unverified', icon: 'tabler:check' },
        { property: 'Role', value: role || 'User', icon: 'tabler:crown' },
      ],
      contacts: [
        { property: 'Contact', value: contact || 'N/A', icon: 'tabler:phone-call' },

        { property: 'Email', value: email || 'N/A', icon: 'tabler:mail' },
      ],
      socials: [
        { property: 'X', link: socials?.x ?? '', icon: 'tabler:brand-twitter' },
        {
          property: 'Facebook',
          link: socials?.facebook,
          icon: 'tabler:brand-facebook',
        },
        {
          property: 'Instagram',
          link: socials?.instagram,
          icon: 'tabler:brand-instagram',
        },
        {
          property: 'Tiktok',
          link: socials?.tiktok,
          icon: 'tabler:brand-tiktok',
        },
      ],
      overview: [
        { property: 'Donations Made', value: '13.5k', icon: 'la:donate' },
        { property: 'Volunteer Request', value: '897', icon: 'bxs:donate-heart' },
        { property: 'Message Sent', value: '146', icon: 'wpf:message-outline' },
      ],
    }),
    [fullname, username, onlineStatus, verified, role, contact, email, socials]
  )

  useEffect(() => {
    setData(profileCard)
  }, [id, profileCard])

  // Handle Data Not Found
  if (!data) return <div>loading... user profile</div>

  return <ProfileTab data={data as ProfileTabType} />
}
