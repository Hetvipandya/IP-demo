// import { useState } from "react";
// import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
// import { FileText, LayoutDashboard, LogOut, Menu, X } from "lucide-react";

// const ExecutiveDashboard = () => {
//   const navigate = useNavigate();

//   const location = useLocation();
//   const [openMenu, setOpenMenu] = useState(false);

//   const menu = [
//     { 
//       name: "Dashboard", 
//       path: "/executive",
//       icon: <LayoutDashboard size={18} />,
//     },
//     {
//       name: "Pending Applications",
//       path: "/executive/pending-applications",
//       icon: <FileText size={18} />,
//     },
//   ];

//  const handleLogout = () => {
//   localStorage.removeItem("adminToken");
//   localStorage.removeItem("executiveToken");
//   localStorage.removeItem("token");

//   navigate("/login", { replace: true });
// };

//   return (
//     <div className="flex min-h-screen flex-col bg-[#f5f7fb] text-slate-950 lg:flex-row">
//       <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(230,54,46,0.13),transparent_30%),radial-gradient(circle_at_top_right,rgba(40,69,167,0.16),transparent_32%)]" />

//       <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between border-b border-[#dfe5f3] bg-white/90 px-4 py-3 shadow-sm backdrop-blur">
//         <Link to="/" className="flex items-center gap-3">
//           <img src="/assets/logo.png" alt="Griva Insurance" className="h-11 w-auto object-contain" />
//           <div>
//             <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#e6362e]">Griva</p>
//             <h2 className="text-base font-black text-[#1f2f86]">Executive Panel</h2>
//           </div>
//         </Link>

//         <button
//           onClick={() => setOpenMenu(!openMenu)}
//           className="grid h-10 w-10 place-items-center rounded-full border border-[#dfe5f3] text-[#1f2f86]"
//           aria-label="Toggle executive menu"
//         >
//           {openMenu ? <X size={20} /> : <Menu size={20} />}
//         </button>
//       </div>

//       {openMenu && (
//         <div className="lg:hidden border-b border-[#dfe5f3] bg-white px-4 pb-4 text-[#1f2f86] shadow-sm">
//           <ul className="space-y-2">
//             {menu.map((item, i) => (
//               <li key={i}>
//                 <Link
//                   to={item.path}
//                   onClick={() => setOpenMenu(false)}
//                   className={`flex items-center gap-3 rounded-xl px-3 py-3 font-bold ${
//                     location.pathname === item.path
//                       ? "bg-[#1f2f86] text-white shadow-lg shadow-[#1f2f86]/20"
//                       : "hover:bg-[#f1f4fb]"
//                   }`}
//                 >
//                   {item.icon}
//                   {item.name}
//                 </Link>
//               </li>
//             ))}

//             <li>
//               <button
//                 type="button"
//                 onClick={() => {
//                   setOpenMenu(false);
//                   handleLogout();
//                 }}
//                 className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-[#ffd4d0] bg-[#fff5f4] px-4 py-3 text-sm font-black text-[#e6362e] transition hover:border-[#e6362e] hover:bg-white"
//               >
//                 <LogOut size={16} /> Logout
//               </button>
//             </li>
//           </ul>
//         </div>
//       )}

//       <aside className="hidden min-h-screen w-72 shrink-0 border-r border-[#cbd9ff] bg-gradient-to-b from-[#f8fbff] via-[#eaf1ff] to-[#dce8ff] p-5 text-[#1f2f86] shadow-2xl shadow-[#1f2f86]/10 lg:block">
//         <div className="mb-9 rounded-2xl border border-white bg-white/80 p-4 shadow-xl shadow-[#1f2f86]/10">
//           <Link to="/" className="flex items-center gap-3">
//             <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white shadow-lg shadow-[#1f2f86]/15">
//               <img src="/assets/logo.png" alt="Griva Insurance" className="h-10 w-auto object-contain" />
//             </span>
//             <div>
//               <p className="text-xs font-black uppercase tracking-[0.24em] text-[#e6362e]">Griva</p>
//               <h2 className="text-xl font-black leading-tight">Executive Panel</h2>
//             </div>
//           </Link>
//         </div>

//         {/* Sidebar end logout */}
//         <div className="flex h-[calc(100vh-220px)] flex-col justify-between">
//           <ul className="space-y-3 rounded-[1.35rem] border border-white/80 bg-white/45 p-2 shadow-lg shadow-[#1f2f86]/5">
//             {menu.map((item, i) => (
//               <li key={i}>
//                 <Link
//                   to={item.path}
//                   className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition ${
//                     location.pathname === item.path
//                       ? "bg-[#1f2f86] text-white shadow-xl shadow-[#1f2f86]/20"
//                       : "text-[#435486] hover:bg-white hover:text-[#1f2f86] hover:shadow-md hover:shadow-[#1f2f86]/5"
//                   }`}
//                 >
//                   {item.icon}
//                   {item.name}
//                 </Link>
//               </li>
//             ))}
//           </ul>

//           <div className="pt-4">
//             <button
//               type="button"
//               onClick={handleLogout}
//               className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#ffd4d0] bg-[#fff5f4] px-4 text-sm font-black text-[#e6362e] transition hover:border-[#e6362e] hover:bg-white"
//             >
//               <LogOut size={16} /> Logout
//             </button>
//           </div>
//         </div>
//       </aside>

//       <main className="flex-1 p-3 md:p-6 lg:p-8">
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default ExecutiveDashboard;

import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const ExecutiveDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(false);

  const menu = [
    {
      name: "Dashboard",
      path: "/executive",
      icon: <LayoutDashboard size={18} />,
    },
    {
      name: "Pending Applications",
      path: "/executive/pending-applications",
      icon: <FileText size={18} />,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("executiveToken");
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen bg-[#f5f7fb] text-slate-950">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(230,54,46,0.13),transparent_30%),radial-gradient(circle_at_top_right,rgba(40,69,167,0.16),transparent_32%)]" />

      {/* MOBILE HEADER */}
      <div className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between border-b border-[#dfe5f3] bg-white/90 px-4 py-3 backdrop-blur lg:hidden">
        <Link to="/" className="flex items-center gap-3">
          <img src="/assets/logo.png" className="h-10" />
          <div>
            <p className="text-[10px] font-bold text-[#e6362e]">Griva</p>
            <h2 className="text-sm font-black text-[#1f2f86]">Executive</h2>
          </div>
        </Link>

        <button
          onClick={() => setOpenMenu(!openMenu)}
          className="grid h-10 w-10 place-items-center rounded-full border border-[#dfe5f3]"
        >
          {openMenu ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {openMenu && (
        <div className="fixed top-[64px] left-0 right-0 z-20 bg-white border-b border-[#dfe5f3] px-4 pb-4 lg:hidden">
          <ul className="space-y-2">
            {menu.map((item, i) => (
              <li key={i}>
                <Link
                  to={item.path}
                  onClick={() => setOpenMenu(false)}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 font-bold ${
                    isActive(item.path)
                      ? "bg-[#1f2f86] text-white"
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
                onClick={handleLogout}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-[#ffc7c2] bg-[#fff5f4] py-3 font-bold text-[#e6362e]"
              >
                <LogOut size={16} />
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* SIDEBAR */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-72 flex-col border-r border-[#cbd9ff] bg-gradient-to-b from-[#f8fbff] via-[#eaf1ff] to-[#dce8ff] p-5 shadow-xl">
        
        {/* Header */}
        <div className="mb-6 rounded-2xl bg-white p-4 shadow">
          <Link to="/" className="flex items-center gap-3">
            <img src="/assets/logo.png" className="h-10" />
            <div>
              <p className="text-xs font-bold text-[#e6362e]">Griva</p>
              <h2 className="text-lg font-black text-[#1f2f86]">
                Executive Panel
              </h2>
            </div>
          </Link>
        </div>

        {/* MENU */}
        <ul className="flex-1 space-y-3">
          {menu.map((item, i) => (
            <li key={i}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 font-semibold transition ${
                  isActive(item.path)
                    ? "bg-[#1f2f86] text-white shadow-lg"
                    : "text-[#435486] hover:bg-white"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="mt-6 flex items-center justify-center gap-2 rounded-2xl border border-[#ffc7c2] bg-white py-3 font-extrabold text-[#e6362e] shadow hover:bg-[#fff5f4]"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* MAIN */}
      <main className="flex-1 overflow-y-auto p-4 pt-20 lg:ml-72 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default ExecutiveDashboard;