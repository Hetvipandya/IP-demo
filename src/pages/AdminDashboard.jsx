import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, ClipboardCheck, ShieldCheck } from "lucide-react";

const AdminDashboard = () => {
  const location = useLocation();

  const menu = [
    {
      name: "Dashboard",
      path: "/admin", // Base path for dashboard
      icon: <LayoutDashboard size={18} />,
    },
    // {
    //   name: "Application Approval",
    //   path: "/admin/application-approval",
    //   icon: <ClipboardCheck size={18} />,
    // },
    // {
    //   name: "Dealer Approval",
    //   path: "/admin/dealer-approval",
    //   icon: <ShieldCheck size={18} />,
    // },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <div className="w-64 bg-[#1f2937] text-white p-5">
        <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
          <LayoutDashboard /> Admin Panel
        </h2>

        <ul className="space-y-3">
          {menu.map((item, i) => (
            <li key={i}>
              <Link
                to={item.path}
                className={`flex items-center gap-2 p-2 rounded hover:bg-gray-700 transition-colors ${
                  location.pathname === item.path ? "text-blue-400 bg-gray-800" : ""
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* RIGHT CONTENT AREA */}
      <div className="flex-1 p-6">
        {/* Only show Outlet here. The Home content will come from the route config */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;