import { useState } from "react";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  LayoutDashboard,
  FileText,
  User,
  LogOut,
  Menu,
  X,
  ClipboardCheck,
} from "lucide-react";

const TLDashboard = () => {
  const navigate =
    useNavigate();

  const location =
    useLocation();

  const [openMenu, setOpenMenu] =
    useState(false);

  const menu = [
    {
      name: "Dashboard",
      path: "/tl",
      icon: (
        <LayoutDashboard size={20} />
      ),
    },
    {
      name: "My Policy",
      path:
        "/tl/my-policy",
      icon: (
        <FileText size={20} />
      ),
    },
    {
      name:
        "Approval Request",
      path:
        "/tl/approval-request",
      icon: (
        <ClipboardCheck size={20} />
      ),
    },
    {
      name: "My Profile",
      path:
        "/tl/profile",
      icon: (
        <User size={20} />
      ),
    },
  ];

  // ================= LOGOUT =================
  const handleLogout =
    () => {
      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "tlToken"
      );

      localStorage.removeItem(
        "role"
      );

      navigate(
        "/login"
      );
    };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* ================= MOBILE HEADER ================= */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm px-4 py-3 flex items-center justify-between md:hidden">
        <h2 className="font-bold text-lg text-[#2d52a2]">
          TL Panel
        </h2>

        <button
          onClick={() =>
            setOpenMenu(
              !openMenu
            )
          }
          className="p-1"
        >
          {openMenu ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>
      </header>

      {/* ================= OVERLAY ================= */}
      {openMenu && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() =>
            setOpenMenu(
              false
            )
          }
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed md:relative z-40
          w-[280px]
          h-screen
          bg-[#2d52a2]
          flex flex-col
          transition-transform duration-300 ease-in-out
          shadow-xl
          ${
            openMenu
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* Top */}
        <div>
          {/* Logo */}
          <div className="bg-[#efefef] h-[100px] flex justify-center items-center relative">
            <img
              src="/assets/logo.png"
              alt="logo"
              className="h-16 object-contain"
            />

            {/* Mobile close */}
            <button
              onClick={() =>
                setOpenMenu(
                  false
                )
              }
              className="absolute top-4 right-4 md:hidden"
            >
              <X
                size={22}
                className="text-black"
              />
            </button>
          </div>

          {/* Title */}
          <div className="px-7 pt-8 pb-4">
            <h3 className="text-[#a9b9e3] text-sm uppercase tracking-widest font-semibold">
              Menu
            </h3>
          </div>

          {/* Menu */}
          <div className="px-4 space-y-2">
            {menu.map(
              (
                item,
                index
              ) => {
                const isActive =
                  location.pathname ===
                  item.path;

                return (
                  <Link
                    key={
                      index
                    }
                    to={
                      item.path
                    }
                    onClick={() =>
                      setOpenMenu(
                        false
                      )
                    }
                    className={`
                      flex items-center gap-4
                      px-5 py-4
                      rounded-2xl
                      text-base font-medium
                      transition-all duration-200
                      ${
                        isActive
                          ? "bg-[#4468b6] text-white shadow-md"
                          : "text-white hover:bg-[#3d63b1]"
                      }
                    `}
                  >
                    {
                      item.icon
                    }

                    {
                      item.name
                    }
                  </Link>
                );
              }
            )}
          </div>
        </div>

        {/* Logout Bottom */}
        <div className="p-5 mt-auto border-t border-blue-700">
          <button
            onClick={
              handleLogout
            }
            className="w-full bg-white hover:bg-gray-100 text-[#2d52a2] rounded-2xl py-4 flex items-center justify-center gap-3 font-semibold transition"
          >
            <LogOut
              size={20}
            />
            Logout
          </button>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 overflow-y-auto pt-[70px] md:pt-0">
        <div className="p-4 md:p-6 min-h-screen">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default TLDashboard;