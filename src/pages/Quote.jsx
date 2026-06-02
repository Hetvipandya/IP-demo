import React from "react";
import { Phone, Shield, ChevronRight } from "lucide-react";
import Footer from "../components/Footer";

const Quote = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans">

      {/* MAIN CONTENT */}
      <div className="relative flex-1 py-16 px-4 sm:px-6 md:px-20 overflow-hidden">

        {/* BACKGROUND - Matching Homepage Theme */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-red-50 to-blue-50"></div>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 right-20 w-72 h-72 bg-red-200 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-200 rounded-full blur-3xl"></div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT SIDE */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600/10 to-blue-600/10 px-4 py-1.5 rounded-full">
              <Shield className="w-4 h-4 text-red-600" />
              <span className="text-xs font-semibold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent uppercase tracking-wide">Get Quote</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
              Our <span className="bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">Insurance</span> Services
            </h1>

            <p className="text-gray-600 text-lg leading-relaxed max-w-sm">
              Explore all types of general insurance under one roof. Secure your health,
              property, travel, and business with trusted protection plans.
            </p>

            <a
              href="tel:+918238311555"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              <Phone className="w-5 h-5" />
              Call Griva Insurance
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </a>
          </div>

          {/* RIGHT FORM */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600/10 to-blue-600/10 px-3 py-1 rounded-full mb-3">
                <span className="text-xs font-semibold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent uppercase tracking-wide">Free Consultation</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                Get a Free <span className="text-red-600">Insurance Quote</span>
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-red-600 to-blue-600 mx-auto mt-3 rounded-full"></div>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-3 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full p-3 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-3 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                />
                <select className="w-full p-3 border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition">
                  <option value="">Select Insurance Type</option>
                  <option>Health Insurance</option>
                  <option>Motor Insurance</option>
                  <option>Life Insurance</option>
                  <option>Travel Insurance</option>
                  <option>Property Insurance</option>
                </select>
              </div>

              <textarea
                placeholder="Your Message"
                rows="4"
                className="w-full p-3 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition resize-none"
              />

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-blue-600 text-white py-3 rounded-lg font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                Get Quote Now
              </button>
            </form>

            <p className="text-center text-xs text-gray-500 mt-4">
              No spam. We'll get back to you within 24 hours.
            </p>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <div className="w-full mt-auto">
        <Footer />
      </div>

    </div>
  );
};

export default Quote;