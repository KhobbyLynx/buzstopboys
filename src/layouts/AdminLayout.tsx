import React from "react";

// Components 
import AdminNavbar from "@/components/Navbars/AdminNavbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import HeaderStats from "@/components/Headers/HeaderStats";
import FooterAdmin from "@/components/Footers/FooterAdmin";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
          <Sidebar />
          <div className="relative md:ml-64 bg-blueGray-100 min-h-screen flex flex-col">
            {/* <AdminNavbar /> */}
            {/* Header */}
            {/* <HeaderStats /> */}
            <div className="px-4 md:px-10 mx-auto w-full flex-grow">
              {children}
            </div>
            <div className="mt-auto">
              <FooterAdmin />
            </div>
          </div>
        </>
      );
};

export default AdminLayout;