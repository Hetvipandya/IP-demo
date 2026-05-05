// import { Menu, X } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";

// const nav = [
//   { name: "Home", path: "/" },
//   { name: "About Us", path: "/about" },
//   { name: "Photo Gallery", path: "/gallery" },
//   { name: "Blog", path: "/blog" },
//   { name: "Contact", path: "/contact" },
//   { name: "Get A Free Insurance Quote", path: "/quote" },
// ];

// const Header = () => {
//   const [open, setOpen] = useState(false);
//   const navigate = useNavigate(); // 👈 add this

//   const userEmail = "admin@gmail.com";
//   const userInitial = userEmail.charAt(0).toUpperCase();

//   const handleProfileClick = () => {
//     navigate("/login"); // 👈 redirect to login page
//   };

//   return (
//     <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-[#e9effd] via-[#fdfaf2] to-[#fffcf5]">
//       <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-10">

//         {/* LOGO */}
//         <Link to="/" className="flex items-center">
//           <img
//             src="/assets/logo.png"
//             alt="Logo"
//             className="h-16 md:h-20 w-auto object-contain"
//           />
//         </Link>

//         {/* DESKTOP MENU */}
//         <nav className="hidden lg:flex items-center gap-7">
//           {nav.map((item) => (
//             <Link
//               key={item.name}
//               to={item.path}
//               className="text-[#213591] hover:text-[#E8021E] transition-colors text-[15px] font-bold"
//             >
//               {item.name}
//             </Link>
//           ))}

//           {/* PROFILE CIRCLE */}
//           <div
//             className="ml-4 relative group cursor-pointer"
//             onClick={handleProfileClick}   // 👈 CLICK EVENT
//           >
//             <div className="w-10 h-10 rounded-full bg-[#213591] text-white flex items-center justify-center font-bold">
//               {userInitial}
//             </div>

//             {/* Tooltip email */}
//             <div className="absolute right-0 mt-2 hidden group-hover:block bg-black text-white text-xs px-3 py-1 rounded shadow-lg whitespace-nowrap">
//               {userEmail}
//             </div>
//           </div>
//         </nav>

//         {/* MOBILE BUTTON */}
//         <button
//           className="lg:hidden text-[#004a7c]"
//           onClick={() => setOpen(!open)}
//         >
//           {open ? <X size={28} /> : <Menu size={28} />}
//         </button>
//       </div>

//       {/* MOBILE MENU */}
//       {open && (
//         <div className="lg:hidden bg-white shadow-md px-6 pb-4">
//           <div className="flex flex-col gap-4">
//             {nav.map((item) => (
//               <Link
//                 key={item.name}
//                 to={item.path}
//                 onClick={() => setOpen(false)}
//                 className="text-[#004a7c] font-semibold hover:text-[#72b056]"
//               >
//                 {item.name}
//               </Link>
//             ))}

//             {/* MOBILE PROFILE */}
//             <div
//               className="flex items-center gap-3 pt-3 border-t cursor-pointer"
//               onClick={handleProfileClick}
//             >
//               <div className="w-10 h-10 rounded-full bg-[#213591] text-white flex items-center justify-center font-bold">
//                 {userInitial}
//               </div>
//               <span className="text-sm text-gray-600">{userEmail}</span>
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;

import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const nav = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Photo Gallery", path: "/gallery" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const userEmail = "admin@gmail.com";
  const userInitial = userEmail.charAt(0).toUpperCase();

const handleProfileClick = () => {
  const adminToken = localStorage.getItem("adminToken");

  if (adminToken) {
    navigate("/admin");
  } else {
    navigate("/login");
  }
};

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 border-b border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.05)]">
      
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-10">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/assets/logo.png"
            alt="Logo"
            className="h-14 md:h-16 object-contain"
          />
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden lg:flex items-center gap-8">

          {nav.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="relative text-[#213591] font-semibold text-[15px] transition duration-300 group"
            >
              {item.name}

              {/* UNDERLINE ANIMATION */}
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#E8021E] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}

          {/* CTA BUTTON */}
          <Link to="/quote">
            <button className="ml-4 bg-[#213591] text-white px-6 py-2 rounded-xl font-bold shadow-lg hover:bg-[#1a2b75] hover:scale-105 transition-all duration-300">
              Get Quote
            </button>
          </Link>

          {/* PROFILE */}
          <div
            className="ml-3 relative group cursor-pointer"
            onClick={handleProfileClick}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#213591] to-[#E8021E] text-white flex items-center justify-center font-bold shadow-md">
              {userInitial}
            </div>

            {/* TOOLTIP */}
            <div className="absolute right-0 mt-2 hidden group-hover:block bg-black text-white text-xs px-3 py-1 rounded shadow-lg whitespace-nowrap">
              {userEmail}
            </div>
          </div>
        </nav>

        {/* MOBILE BUTTON */}
        <button
          className="lg:hidden text-[#213591]"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`lg:hidden transition-all duration-500 overflow-hidden ${
          open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white/90 backdrop-blur-md px-6 pb-6 shadow-lg">

          <div className="flex flex-col gap-5 pt-4">
            {nav.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setOpen(false)}
                className="text-[#213591] font-semibold text-lg hover:text-[#E8021E] transition"
              >
                {item.name}
              </Link>
            ))}

            {/* CTA */}
            <Link to="/quote" onClick={() => setOpen(false)}>
              <button className="w-full bg-[#213591] text-white py-3 rounded-lg font-bold mt-2">
                Get Free Quote
              </button>
            </Link>

            {/* PROFILE */}
            <div
              className="flex items-center gap-3 pt-4 border-t cursor-pointer"
              onClick={handleProfileClick} 
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#213591] to-[#E8021E] text-white flex items-center justify-center font-bold">
                {userInitial}
              </div>
              <span className="text-sm text-gray-700">{userEmail}</span>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;