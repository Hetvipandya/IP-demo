import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  ShieldCheck,
  X,
} from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(false);

  const menu = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <LayoutDashboard size={18} />,
    },
    {
      name: "All Applications",
      path: "/admin/pending-applications",
      icon: <FileText size={18} />,
    },
    {
      name: "Dealer Management",
      path: "/admin/dealer-management",
      icon: <ShieldCheck size={18} />,
    },
    {
      name: "Executive Management",
      path: "/admin/executive-management",
      icon: <ShieldCheck size={18} />,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#f5f7fb] text-slate-950">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(230,54,46,0.13),transparent_30%),radial-gradient(circle_at_top_right,rgba(40,69,167,0.16),transparent_32%)]" />

      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between border-b border-[#dfe5f3] bg-white/90 px-4 py-3 shadow-sm backdrop-blur lg:hidden">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/assets/logo.png"
            alt="Griva Insurance"
            className="h-11 w-auto object-contain"
          />

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#e6362e]">
              Griva
            </p>

            <h2 className="text-base font-black text-[#1f2f86]">
              Admin Panel
            </h2>
          </div>
        </Link>

        <button
          onClick={() => setOpenMenu(!openMenu)}
          className="grid h-10 w-10 place-items-center rounded-full border border-[#dfe5f3] text-[#1f2f86]"
        >
          {openMenu ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {openMenu && (
        <div className="fixed top-[72px] left-0 right-0 z-20 border-b border-[#dfe5f3] bg-white px-4 pb-4 text-[#1f2f86] shadow-sm lg:hidden">
          <ul className="space-y-2">
            {menu.map((item, i) => (
              <li key={i}>
                <Link
                  to={item.path}
                  onClick={() => setOpenMenu(false)}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 font-bold ${
                    location.pathname === item.path
                      ? "bg-[#1f2f86] text-white shadow-lg shadow-[#1f2f86]/20"
                      : "hover:bg-[#f1f4fb]"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            ))}

            <li>
              <button
                type="button"
                onClick={() => {
                  setOpenMenu(false);
                  handleLogout();
                }}
                className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-[#ffd4d0] bg-[#fff5f4] text-sm font-black text-[#e6362e]"
              >
                <LogOut size={17} />
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* Fixed Sidebar */}
      <aside className="hidden fixed left-0 top-0 h-screen w-72 border-r border-[#cbd9ff] bg-gradient-to-b from-[#f8fbff] via-[#eaf1ff] to-[#dce8ff] p-5 text-[#1f2f86] shadow-2xl shadow-[#1f2f86]/10 lg:flex lg:flex-col">
        {/* Logo */}
        <div className="mb-8 rounded-2xl border border-white bg-white/80 p-4 shadow-xl shadow-[#1f2f86]/10">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white shadow-lg shadow-[#1f2f86]/15">
              <img
                src="/assets/logo.png"
                alt="Griva Insurance"
                className="h-10 w-auto object-contain"
              />
            </span>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#e6362e]">
                Griva
              </p>

              <h2 className="text-xl font-black leading-tight">
                Admin Panel
              </h2>
            </div>
          </Link>
        </div>

        {/* Menu */}
        <div className="flex flex-1 flex-col justify-between">
          <ul className="space-y-3 rounded-[1.35rem] border border-white/80 bg-white/45 p-2 shadow-lg shadow-[#1f2f86]/5">
            {menu.map((item, i) => (
              <li key={i}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition ${
                    location.pathname === item.path
                      ? "bg-[#1f2f86] text-white shadow-xl shadow-[#1f2f86]/20"
                      : "text-[#435486] hover:bg-white hover:text-[#1f2f86]"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Logout Fixed Bottom */}
          <div className="pt-5">
            <button
              type="button"
              onClick={handleLogout}
              className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl border border-[#ffc7c2] bg-white px-4 text-base font-extrabold text-[#e6362e] shadow-md transition-all duration-300 hover:border-[#e6362e] hover:bg-[#fff5f4] hover:shadow-lg"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-3 pt-24 md:p-6 lg:ml-72 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;