import React from "react";
import {
  Phone,
  MailCheck,
  MapPin,
  PhoneCall,
} from "lucide-react";
import Footer from "../components/Footer";

const ContactPage = () => {
  const contactDetails = [
    {
      icon: MapPin,
      title: "Address",
      detail:
        "1st floor, Avadhpuri Shopping Center, nr. Vishwas City 1, Ghatlodiya, Ahmedabad, Gujarat 380061",
      type: "text",
    },
    {
      icon: MailCheck,
      title: "Email Address",
      detail: "grivafin@gmail.com",
      type: "email",
    },
    {
      icon: Phone,
      title: "Contact Number",
      detail: "+91 9904401900\n+91 9737067941\n+91 9099333601",
      type: "tel",
    }
  ];

  // Split phone numbers for display
  const phoneNumbers = contactDetails[2].detail.split("\n");

  return (
    <div className="min-h-screen text-[#2C3E50] flex flex-col">

      <div className="relative max-w-7xl mx-auto px-5 py-12 md:px-12 md:py-24 flex-1 overflow-hidden">

        {/* 🔥 BACKGROUND */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-red-50 to-blue-50"></div>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 right-20 w-72 h-72 bg-red-200 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-200 rounded-full blur-3xl"></div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="relative z-10">

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* LEFT SIDE - Contact Details */}
            <div className="lg:col-span-2 space-y-6">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600/10 to-blue-600/10 px-4 py-1.5 rounded-full">
                <Phone className="w-4 h-4 text-red-600" />
                <span className="text-xs font-semibold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent uppercase tracking-wide">Contact Us</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Let's Get in <span className="bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">Touch</span>
              </h1>

              <p className="text-gray-600">
                Reach out for insurance guidance and support. Our team is here to help you.
              </p>

              <div className="space-y-4">
                {/* Address Card */}
                <div className="group flex gap-4 p-5 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-l-red-600">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-red-50 to-blue-50 text-red-600 group-hover:bg-gradient-to-r group-hover:from-red-600 group-hover:to-blue-600 group-hover:text-white transition-all duration-300">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1 group-hover:text-red-600 transition">Address</h3>
                    <p className="text-sm text-gray-600">{contactDetails[0].detail}</p>
                  </div>
                </div>

                {/* Email Card */}
                <div className="group flex gap-4 p-5 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-l-red-600">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-red-50 to-blue-50 text-red-600 group-hover:bg-gradient-to-r group-hover:from-red-600 group-hover:to-blue-600 group-hover:text-white transition-all duration-300">
                    <MailCheck size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1 group-hover:text-red-600 transition">Email Address</h3>
                    <a href="mailto:grivafin@gmail.com" className="text-sm text-gray-600 hover:text-red-600 transition">
                      grivafin@gmail.com
                    </a>
                  </div>
                </div>

                {/* Phone Card */}
                <div className="group flex gap-4 p-5 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-l-red-600">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-red-50 to-blue-50 text-red-600 group-hover:bg-gradient-to-r group-hover:from-red-600 group-hover:to-blue-600 group-hover:text-white transition-all duration-300">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1 group-hover:text-red-600 transition">Contact Number</h3>
                    {phoneNumbers.map((num, idx) => (
                      <a key={idx} href={`tel:${num.trim()}`} className="block text-sm text-gray-600 hover:text-red-600 transition">
                        {num.trim()}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - Contact Form */}
            <div className="lg:col-span-3 bg-gradient-to-r from-blue-900 via-blue-800 to-red-800 rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Send a <span className="text-red-300">Message</span>
              </h2>

              <p className="text-blue-100 text-sm mb-6">
                We will respond quickly to your query.
              </p>

              <form className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full p-3 rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-red-500 transition"
                />

                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    className="p-3 rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-red-500 transition"
                  />
                  <input 
                    type="tel" 
                    placeholder="Phone Number" 
                    className="p-3 rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-red-500 transition"
                  />
                </div>

                <textarea 
                  rows="4" 
                  placeholder="Your Message" 
                  className="w-full p-3 rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-red-500 transition"
                />

                <button className="bg-white text-blue-900 font-bold px-6 py-3 rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                  Submit Message
                </button>
              </form>
            </div>

          </div>

          {/* MAP SECTION */}
          <div className="mt-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600/10 to-blue-600/10 px-4 py-1.5 rounded-full mb-4">
              <MapPin className="w-4 h-4 text-red-600" />
              <span className="text-xs font-semibold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent uppercase tracking-wide">Our Location</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5">
              Find Us on <span className="text-red-600">Map</span>
            </h2>

            <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-xl border-4 border-white">
              <iframe
                title="griva location"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3670.440927625201!2d72.53538534!3d23.08094956!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e836511e1df43%3A0x73be035d795892b2!2sGriva%20Insurance%20Solution!5e0!3m2!1sen!2sin!4v1777627824019!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
              />
            </div>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <div className="w-full mt-auto">
        <Footer />
      </div>

      {/* WHATSAPP FLOATING BUTTON */}
      <a
        href="https://wa.me/918238311555"
        className="fixed bottom-6 right-6 bg-green-500 p-4 rounded-full shadow-xl hover:scale-110 transition duration-300 z-50"
        target="_blank"
        rel="noopener noreferrer"
      >
        <PhoneCall className="text-white w-5 h-5" />
      </a>

    </div>
  );
};

export default ContactPage;