import React from "react";
import { Phone } from "lucide-react";
import Footer from "../components/Footer";

const Quote = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F1F5E1] font-sans">

      {/* MAIN CONTENT */}
      <div className="flex-1 py-16 px-6 md:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

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
              Call Minaxi Navlakha
            </a>
          </div>

          {/* RIGHT FORM */}
          <div className="bg-[#F1F5E1] border-2 border-dashed border-[#E8021E]/40 p-8 md:p-12 rounded-none shadow-sm">

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