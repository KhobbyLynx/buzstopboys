import React from 'react'

// Components
import Sidebar from '@/components/sidebar/AdminSidebar'
import AdminFooter from '@/components/footers/AdminFooter'

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100 min-h-screen flex flex-col">
        <div className="px-4 md:px-10 mx-auto w-full flex-grow">{children}</div>
        <div className="mt-auto">
          <AdminFooter />
        </div>
      </div>
    </>
  )
}

export default AdminLayout
