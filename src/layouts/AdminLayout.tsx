import React from 'react'

// Components
import AdminNavbar from '@/components/navbars/AdminNavbar'
import Sidebar from '@/components/sidebar/Sidebar'
import FooterAdmin from '@/components/footers/FooterAdmin'

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100 min-h-screen flex flex-col">
        {/* <AdminNavbar /> */}
        <div className="px-4 md:px-10 mx-auto w-full flex-grow">{children}</div>
        <div className="mt-auto">
          <FooterAdmin />
        </div>
      </div>
    </>
  )
}

export default AdminLayout
