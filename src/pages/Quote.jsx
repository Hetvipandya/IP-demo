import React from "react";
import { Phone } from "lucide-react";
import Footer from "../components/Footer";

const Quote = () => {
  return (
    <div className="min-h-screen flex flex-col  font-sans">

      {/* MAIN CONTENT */}
      <div className="relative flex-1 py-16 px-6 md:px-20 overflow-hidden">

  {/* 🔥 BACKGROUND */}
<div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#ffffff]">
  
  {/* 1. Subtle Radial Gradient for Depth */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,_rgba(33,53,145,0.03)_0%,_transparent_50%)]"></div>

  {/* 2. Floating Glass Cards Decoration (Top Right) */}
  <div className="absolute top-[-5%] right-[5%] w-72 h-72 bg-[#213591]/[0.02] rounded-3xl rotate-12 border border-slate-100 shadow-sm transition-transform duration-1000 hover:rotate-6"></div>
  <div className="absolute top-[5%] right-[-2%] w-64 h-64 bg-[#E8021E]/[0.01] rounded-[3rem] -rotate-12 border border-red-50/50"></div>

  {/* 3. Precision Grid Accents (Bottom Left) */}
  <div className="absolute bottom-10 left-10 opacity-20">
    <div className="grid grid-cols-4 gap-4">
      {[...Array(16)].map((_, i) => (
        <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#213591]"></div>
      ))}
    </div>
  </div>

  {/* 4. The "Security Path" - Diagonal Sleek Lines */}
  <svg className="absolute right-0 top-0 h-full w-1/2 opacity-[0.15]" viewBox="0 0 400 800" fill="none">
    <path d="M400 0L150 800" stroke="#213591" strokeWidth="0.5" />
    <path d="M450 0L200 800" stroke="#213591" strokeWidth="0.5" />
    <path d="M350 0L100 800" stroke="#E8021E" strokeWidth="1" strokeDasharray="10 10" />
  </svg>

  {/* 5. Soft Glow behind Content */}
  <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#213591]/5 rounded-full blur-[120px]"></div>

  {/* 6. Subtle Noise Texture Overlay (Optional for Premium Feel) */}
  <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
</div>

  {/* CONTENT */}
  <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

    {/* LEFT SIDE */}
    <div className="space-y-6">
      <h1 className="text-3xl md:text-5xl font-bold text-[#213591]">
        Our <span className="text-[#E8021E]">Insurance</span> Services
      </h1>

      <p className="text-[#00335B] text-lg leading-relaxed max-w-sm">
        Explore all types of general insurance under one roof. Secure your health,
        property, travel, and business with trusted protection plans.
      </p>

      <a
        href="tel:+918238311555"
        className="inline-flex items-center gap-3 bg-[#213591] text-white px-8 py-3 font-bold hover:bg-[#002848] transition"
      >
        <Phone className="w-5 h-5" />
        Call Griva Insurance
      </a>
    </div>

    {/* RIGHT FORM */}
    <div className=" backdrop-blur-sm border-2 border-dashed border-[#E8021E]/40 p-8 md:p-12 shadow-sm">

      <h2 className="text-3xl md:text-4xl font-extrabold text-[#213591] text-center mb-10">
        Get a Free Insurance Quote
      </h2>

      <form className="space-y-4">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            placeholder="Name"
            className="w-full p-4 border bg-white focus:outline-none focus:ring-1 focus:ring-[#8CC63F]"
          />
          <input
            placeholder="Phone Number"
            className="w-full p-4 border bg-white focus:outline-none focus:ring-1 focus:ring-[#8CC63F]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            placeholder="Email Address"
            className="w-full p-4 border bg-white focus:outline-none focus:ring-1 focus:ring-[#8CC63F]"
          />

          <select className="w-full p-4 border bg-white text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#8CC63F]">
            <option>Select Insurance Type</option>
            <option>Health Insurance</option>
            <option>Vehicle Insurance</option>
            <option>Life Insurance</option>
          </select>
        </div>

        <textarea
          placeholder="Message"
          rows="4"
          className="w-full p-4 border bg-white focus:outline-none focus:ring-1 focus:ring-[#8CC63F]"
        />

        <button
          type="submit"
          className="bg-[#213591] text-white px-10 py-3 font-bold hover:bg-[#002848] transition"
        >
          Submit
        </button>

      </form>
    </div>

  </div>
</div>

      {/* ✅ FOOTER FIX (IMPORTANT PART) */}
      <div className="w-full mt-auto">
        <Footer />
      </div>

    </div>
  );
};

export default Quote;