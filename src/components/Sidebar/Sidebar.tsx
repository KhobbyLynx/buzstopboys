"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NotificationDropdown from "../Dropdowns/NotificationDropdown";
import UserDropdown from "../Dropdowns/UserDropdown";
import { adminNavigation } from "@/navigation/admin.navigation";
import IconifyIcon from "../icon";

const Sidebar = () => {
  const [collapseShow, setCollapseShow] = useState("hidden");
  const pathname = usePathname();

  return (
    <nav className="md:fixed md:top-0 md:bottom-0 md:w-64 shadow-xl bg-white flex flex-col py-4 px-6 z-10">
      {/* Brand */}
      <Link href="/admin/dashboard" className="text-sm uppercase font-bold p-4 cursor-pointer">
        BuzStopBoys
      </Link>

      {/* User Icons */}
      <ul className="md:hidden flex items-center gap-4">
        <NotificationDropdown />
        <UserDropdown />
      </ul>

      {/* Sidebar Collapse Button */}
      <button className="md:hidden px-3 py-1 text-xl border border-transparent" onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}>
        <i className="fas fa-bars"></i>
      </button>

      {/* Collapsible Menu */}
      <div className={`md:flex md:flex-col ${collapseShow}`}>
        {/* Webpage Link */}
        <h6 className="text-xs uppercase font-bold py-2">Webpage</h6>
        <ul>
          <li>
            <Link href="/">
              <div className={`py-3 font-bold flex items-center ${pathname === "/" ? "text-lightBlue-500" : "text-blueGray-700"}`}>
                <IconifyIcon icon='iconoir:www' className="mr-2"/> Go to Webpage
              </div>
            </Link>
          </li>
        </ul>

        {/* Admin Pages */}
        <h6 className="text-xs uppercase font-bold py-2">Admin Pages</h6>
        <ul>
          {adminNavigation.map(({ name, href, icon }) => (
            <li key={href}>
              <Link href={href}>
                <div className={`py-3 font-bold flex items-center ${pathname.includes(href) ? "text-lightBlue-500" : "text-blueGray-700"}`}>
                  <i className={`fa-solid ${icon} mr-2`}></i> {name}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
