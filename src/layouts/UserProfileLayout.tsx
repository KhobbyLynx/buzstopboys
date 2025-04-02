import React from 'react'

// Components
import ProfileSidebar from '@/components/sidebar/ProfileSidebar'

const UserProfileLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <ProfileSidebar />

      <div className="relative md:ml-64 bg-blueGray-100 min-h-screen flex flex-col">
        <div className="px-4 md:px-10 mx-auto w-full flex-grow"></div>
        <div className="mt-auto"></div>
      </div>
    </>
  )
}

export default UserProfileLayout
