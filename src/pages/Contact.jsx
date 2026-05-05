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

  return (
    <div className="min-h-screen text-[#2C3E50] flex flex-col">

    <div className="relative max-w-7xl mx-auto px-5 py-12 md:px-12 md:py-24 flex-1 overflow-hidden">

  {/* 🔥 BACKGROUND (TOP LEVEL) */}
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
  <div className="relative z-10">

    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

      {/* LEFT SIDE */}
      <div className="lg:col-span-2 space-y-6">
        <h1 className="text-4xl font-black text-[#11243D]">
          Let's get in touch
        </h1>

        <p className="text-gray-600">
          Reach out for insurance guidance and support.
        </p>

        {contactDetails.map((item, i) => (
          <div
            key={i}
            className="group flex gap-5 p-6 bg-white/90 backdrop-blur-sm border border-dashed border-gray-300 hover:border-[#8CC63F] hover:shadow-md transition"
          >
            <div className="w-12 h-12 flex items-center justify-center border border-[#11243D] text-[#11243D] group-hover:bg-[#E8021E] group-hover:text-white group-hover:border-[#E8021E] transition">
              <item.icon size={20} />
            </div>

            <div>
              <h3 className="font-bold text-[#11243D] mb-1 group-hover:text-[#E8021E] transition">
                {item.title}
              </h3>

              {item.type === "text" ? (
                <p className="text-sm text-gray-700">{item.detail}</p>
              ) : (
                item.detail.split(",").map((val, idx) => (
                  <a
                    key={idx}
                    href={
                      item.type === "email"
                        ? `mailto:${val.trim()}`
                        : `tel:${val.trim()}`
                    }
                    className="block text-sm text-gray-700 hover:text-[#E8021E]"
                  >
                    {val.trim()}
                  </a>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT FORM */}
      <div className="lg:col-span-3 bg-[#213591] p-10 border border-gray-700 text-white">
        <h2 className="text-3xl font-bold mb-4">
          Send a Message
        </h2>

        <p className="text-gray-300 mb-8">
          We will respond quickly to your query.
        </p>

        <form className="space-y-4">
          <input placeholder="Name" className="w-full p-4 text-black outline-none" />

          <div className="grid grid-cols-2 gap-4">
            <input placeholder="Email" className="p-4 text-black outline-none" />
            <input placeholder="Phone" className="p-4 text-black outline-none" />
          </div>

          <textarea rows="4" placeholder="Message" className="w-full p-4 text-black outline-none" />

          <button className="bg-white text-black font-bold px-6 py-3 hover:bg-gray-100">
            Submit
          </button>
        </form>
      </div>

    </div>

    {/* MAP */}
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-5 text-[#11243D]">
        Find Us on Map
      </h2>

      <div className="w-full h-[400px] border overflow-hidden shadow-xl">
        <iframe
          title="griva location"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3670.440927625201!2d72.53538534!3d23.08094956!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e836511e1df43%3A0x73be035d795892b2!2sGriva%20Insurance%20Solution!5e0!3m2!1sen!2sin!4v1777627824019!5m2!1sen!2sin" width="600" height="450"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
        />
      </div>
    </div>

  </div>
</div>

      {/* FOOTER */}
      <div className="w-full mt-auto">
        <Footer />
      </div>

      {/* WHATSAPP */}
      <a
        href="https://wa.me/918238311555"
        className="fixed bottom-6 right-6 bg-green-500 p-4 rounded-full shadow-xl hover:scale-110 transition"
      >
        <PhoneCall className="text-white" />
      </a>

    </div>
  );
};

export default ContactPage;