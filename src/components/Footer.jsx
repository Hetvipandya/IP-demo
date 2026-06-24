import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiArrowRight,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#091124] text-slate-300 border-t border-slate-800/60 overflow-hidden font-sans">
      
      {/* 1. CTA BANNER SECTION */}
      <section className="relative border-b border-slate-800/50 bg-gradient-to-br from-[#0c152e] via-[#091124] to-[#0c152e] py-12 md:py-16">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-red-600/10 blur-[130px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-600/10 blur-[130px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="bg-gradient-to-r from-white/[0.02] to-white/[0.04] border border-white/[0.08] rounded-[24px] p-8 md:p-10 backdrop-blur-xl flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
            
            <div className="max-w-2xl text-center lg:text-left">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-semibold tracking-wider uppercase mb-4">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                Trusted Insurance Partner
              </span>

              <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Grow With India’s{" "}
                <span className="bg-gradient-to-r from-red-400 via-red-500 to-orange-500 bg-clip-text text-transparent">
                  Leading Insurance Network
                </span>
              </h2>

              <p className="mt-3 text-slate-400 text-sm md:text-base max-w-xl">
                Partner with GIVA Insurance Services and unlock smart insurance solutions, digital growth tools, and dedicated expert support.
              </p>
            </div>

            <div className="shrink-0">
              <Link to="/quote">
                <button className="group relative bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 px-7 py-3.5 rounded-xl text-white font-semibold flex items-center gap-2.5 shadow-lg shadow-red-950/40 transition-all duration-300 hover:shadow-red-500/20 hover:-translate-y-0.5">
                  Call Now
                  <FiArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN FOOTER CONTENT */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

          {/* Column 1: Brand Profile (4/12 width) */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-block">
              <img
                src="/assets/logo.png"
                alt="Giva Insurance"
                className="h-12 w-auto object-contain brightness-110"
              />
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              <span className="text-white font-medium">GIVA INSURANCE SERVICES</span> provides dependable protection for your health, life, motor, property, and business through customized planning.
            </p>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: <FaFacebookF />, link: "https://www.facebook.com/share/1EDh2pvbff/?mibextid=wwXIfr", label: "Facebook" },
                { icon: <FaInstagram />, link: "https://www.instagram.com/solutiongrivainsurance", label: "Instagram" },
                { icon: <FaTwitter />, link: "#", label: "Twitter" },
                { icon: <FaLinkedinIn />, link: "#", label: "LinkedIn" }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800/80 text-slate-400 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/5 flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links (2/12 width) */}
          <div className="lg:col-span-2 lg:pl-4">
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-5 relative after:content-[''] after:block after:w-8 after:h-0.5 after:bg-red-500 after:mt-2">
              Quick Links
            </h3>
            <ul className="space-y-3.5">
              {[
                { to: "/about", label: "About Us" },
                { to: "/gallery", label: "Gallery" },
                { to: "/blog", label: "Blog" },
                { to: "/contact", label: "Contact Us" },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-slate-400 hover:text-white transition-colors duration-200 text-sm flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-slate-700 group-hover:bg-red-500 rounded-full mr-2.5 transition-colors duration-200"></span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Products (3/12 width) */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-5 relative after:content-[''] after:block after:w-8 after:h-0.5 after:bg-red-500 after:mt-2">
              Insurance Products
            </h3>
            <ul className="space-y-3.5">
              {[
                { to: "/health-insurance", label: "Health Insurance" },
                { to: "/motor-insurance", label: "Motor Insurance" },
                { to: "/travel-insurance", label: "Travel Insurance" },
                { to: "/property-insurance", label: "Property Insurance" },
                { to: "/liability-insurance", label: "Liability Insurance" },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-slate-400 hover:text-white transition-colors duration-200 text-sm flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-slate-700 group-hover:bg-red-500 rounded-full mr-2.5 transition-colors duration-200"></span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info (3/12 width) */}
          <div className="lg:col-span-3 space-y-5">
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-5 relative after:content-[''] after:block after:w-8 after:h-0.5 after:bg-red-500 after:mt-2">
              Contact Info
            </h3>

            <div className="space-y-4 text-sm">
              {/* Address */}
              <div className="flex gap-3 items-start">
                <FiMapPin className="text-red-400 text-base shrink-0 mt-0.5" />
                <p className="text-slate-400 leading-relaxed">
                  Shop no 10, 1st floor Avadhpuri Shopping Center, nr. Vishwas City 1, Ghatlodiya, Ahmedabad, Gujarat 380061
                </p>
              </div>

              {/* Email */}
              <div className="flex gap-3 items-center border-t border-slate-800/40 pt-3">
                <FiMail className="text-red-400 text-base shrink-0" />
                <a href="mailto:grivafin@gmail.com" className="text-slate-400 hover:text-white transition-colors">
                  grivafin@gmail.com
                </a>
              </div>

              {/* Phone Numbers */}
              <div className="flex gap-3 items-start border-t border-slate-800/40 pt-3">
                <FiPhone className="text-red-400 text-base shrink-0 mt-1" />
                <div className="space-y-1.5">
                  {["+91 99044 01900"].map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s+/g, "")}`}
                      className="block text-slate-400 hover:text-white transition-colors"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 3. BOTTOM BAR (Copyright & Policies) */}
        <div className="border-t border-slate-800/60 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} GIVA Insurance Services. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
            <Link to="/terms" className="hover:text-slate-300 transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;