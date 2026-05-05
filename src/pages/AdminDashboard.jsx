import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, MoreVertical } from "lucide-react";

const AdminDashboard = () => {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(false);

  const menu = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <LayoutDashboard size={18} />,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 flex-col lg:flex-row">

      {/* TOP BAR (Mobile Only) */}
      <div className="lg:hidden flex justify-between items-center bg-white p-4 shadow">
        <h2 className="font-bold text-gray-700">Admin Panel</h2>

        {/* 3 DOT BUTTON */}
        <button onClick={() => setOpenMenu(!openMenu)}>
          <MoreVertical size={22} />
        </button>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {openMenu && (
        <div className="lg:hidden bg-[#1f2937] text-white px-4 pb-4">
          <ul className="space-y-2">
            {menu.map((item, i) => (
              <li key={i}>
                <Link
                  to={item.path}
                  onClick={() => setOpenMenu(false)}
                  className={`flex items-center gap-2 p-2 rounded ${
                    location.pathname === item.path
                      ? "bg-gray-800 text-blue-400"
                      : "hover:bg-gray-700"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* SIDEBAR (Desktop Only) */}
      <div className="hidden lg:block w-64 bg-[#1f2937] text-white p-5">
        <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
          <LayoutDashboard /> Admin Panel
        </h2>

        <ul className="space-y-3">
          {menu.map((item, i) => (
            <li key={i}>
              <Link
                to={item.path}
                className={`flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${
                  location.pathname === item.path
                    ? "text-blue-400 bg-gray-800"
                    : ""
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* CONTENT */}
      <div className="flex-1 p-4 md:p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;