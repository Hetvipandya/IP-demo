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
        "A-604, 6th Floor, Block-A, Bijal Business Center, Aslali, Ahmedabad-382427",
      type: "text",
    },
    {
      icon: MailCheck,
      title: "Email Address",
      detail: "minaxi@navlakhainsurance.in, info@navlakhainsurance.in",
      type: "email",
    },
    {
      icon: Phone,
      title: "Contact Number",
      detail: "+91 8238311555",
      type: "tel",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8EF] text-[#2C3E50] flex flex-col">

      <div className="max-w-7xl mx-auto px-5 py-12 md:px-12 md:py-24 flex-1">

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
                className="group flex gap-5 p-6 bg-white border border-dashed border-gray-300 transition hover:border-[#8CC63F] hover:shadow-md"
              >

                {/* ICON BOX (GREEN ON HOVER) */}
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
                        className="block text-sm text-gray-700 hover:text-[#8CC63F]"
                      >
                        {val.trim()}
                      </a>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT FORM (SQUARE BORDER FIX) */}
          <div className="lg:col-span-3 bg-[#213591] p-10 border border-gray-700 rounded-none text-white">

            <h2 className="text-3xl font-bold mb-4">
              Send a Message
            </h2>

            <p className="text-gray-300 mb-8">
              We will respond quickly to your query.
            </p>

            <form className="space-y-4">

              <input
                placeholder="Name"
                className="w-full p-4 rounded-none text-black focus:outline-none"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  placeholder="Email"
                  className="w-full p-4 rounded-none text-black focus:outline-none"
                />
                <input
                  placeholder="Phone"
                  className="w-full p-4 rounded-none text-black focus:outline-none"
                />
              </div>

              <textarea
                placeholder="Message"
                rows="4"
                className="w-full p-4 rounded-none text-black focus:outline-none"
              />

              <button
                type="submit"
                className="bg-white text-black font-bold px-6 py-3 rounded-none hover:bg-gray-100"
              >
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
              title="navlakha location"
              src="https://www.google.com/maps?q=Aslali%20Circle%20Ring%20Road%20Ahmedabad&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
            ></iframe>
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