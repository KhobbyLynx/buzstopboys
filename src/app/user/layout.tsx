'use client'

import UserProfileHeader from '@/view/user/UserProfileHeader'
import TabNavigation from '@/view/user/TabNavigation'

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-10 py-6">
      <UserProfileHeader />
      <div className="my-3">
        <TabNavigation />
      </div>
      {children}
    </div>
  )
}
