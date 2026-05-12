import React from "react";
import { Phone, Mail, Share2 } from "lucide-react";
import TestimonialsSection from "./TestimonialsSection";
import Footer from "./Footer";

/* ✅ Testimonials (FIXED - missing issue solved) */
const testimonials = [
  {
    name: "Priya Nair",
    role: "Logistics Manager",
    image: "/assets/21.jpg",
    quote:
      "Warehouse insurance policy lene ka process simple aur transparent tha. Navlakha Insurance ne best plan recommend kiya.",
  },
  {
    name: "Arjun Verma",
    role: "Entrepreneur", 
    image: "/assets/24.jpg",
    quote:
      "Transit insurance ke liye quick aur hassle-free service mili. Truly reliable team!",
  },
  {
    name: "Shreya Mehta",
    role: "Teacher",
    image: "/assets/31.jpg",
    quote:
      "Health insurance select karva ma bahu saras guidance mali. Smooth experience.",
  },
];

const About = () => {
  return (
    <div className="flex flex-col w-full">
       

<section className="relative py-16 md:py-24 bg-white overflow-hidden">

 {/* UNIQUE MODERN ARCHITECTURAL BACKGROUND */}
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

  
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT SIDE: IMAGE WITH TECH VIBE */}
         <div className="relative group">
  <div className="overflow-hidden rounded-lg shadow-2xl border-4 border-white">
    <img
      src="https://media.licdn.com/dms/image/v2/D4D22AQEMyEAvt-vSuQ/feedshare-shrink_800/feedshare-shrink_800/0/1689514965135?e=2147483647&v=beta&t=9b9rSryE0zHjPctw_4CHJr-VHWu_OuRZEbGH1ROYN3I"
      alt="Griva Insurance Tech Presentation"
      /* Height h-[350px] rakhi chhe jene tame tamari rite adjust kari shako cho */
      className="w-full h-[350px] md:h-[400px] object-cover transition duration-500 group-hover:scale-105"
    />
  </div>
  {/* Decorative background element */}
  <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#213591]/10 rounded-full blur-3xl -z-10"></div>
</div>

          {/* RIGHT SIDE: CONTENT */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold text-[#213591] leading-tight">
              Griva <span className="text-[#E8021E]">Insurance Services</span>
            </h2>

            <div className="space-y-4 text-gray-700 text-[16px] md:text-[18px] leading-relaxed">
              <p className="font-medium text-lg text-[#003366]">
                Modern Problems Require Smart Insurance Solutions.
              </p>
              
              <p>
                At <b className="text-[#213591]">Griva Insurance Services</b>, we blend traditional trust with modern technology. Founded by <b>Miss Minaxi Navlakha</b>, we bring over a decade of expertise to help you navigate the complex world of risk management.
              </p>

              <p>
                As seen in our focus on <b>Generative AI and Innovation</b>, we stay ahead of the curve to provide the most efficient coverage for:
              </p>

              <ul className="grid grid-cols-2 gap-2 text-[#003366] font-semibold">
                <li>• Health & Motor</li>
                <li>• Liability & Travel</li>
                <li>• Property & Fire</li>
                <li>• Transit & Warehouse</li>
              </ul>

              <p>
                Our mission is to safeguard your digital and physical assets with <b>hassle-free claims</b> and <b>personalized guidance</b>. We don't just sell policies; we build lasting security for your future.
              </p>
            </div>

            <div className="pt-4">
              <a
                href="tel:+918320291588"
                className="inline-flex items-center gap-3 bg-[#213591] text-white px-10 py-4 rounded-lg font-bold hover:bg-[#1a2a75] transition-all duration-300 shadow-xl border-l-8 border-[#E8021E] active:scale-95"
              >
                <Phone size={22} className="animate-pulse" />
                Connect with Griva Insurance
              </a>
            </div>
          </div>

        </div>
      </div>
    </section> 

      {/* ===================== SECTION 2 ===================== */}
   <section className="relative py-16 md:py-24 bg-white overflow-hidden">

    
          {/* UNIQUE MODERN ARCHITECTURAL BACKGROUND */}
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

       <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#213591]">
            Our Valued Partners
          </h2>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* IMAGE */}
          <div className="flex justify-center">
              <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
              <div className="aspect-[4/5] overflow-hidden rounded-full shadow-xl border-4 border-gray-50">
                <img
                  src="https://navlakhainsurance.in/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-30-at-4.05.16-PM.jpeg"
                  alt="Paresh Navlakha"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="space-y-6">
            <div>
              <h3 className="text-4xl font-extrabold text-gray-900">Paresh Navlakha</h3>
              <p className="text-[#E8021E] font-bold uppercase tracking-wider text-sm mt-1">
                Director
              </p>
            </div>

            <div className="text-gray-600 leading-relaxed text-[15px] space-y-4">
              <p>
                Paresh Navlakha is a key figure at Navlakha Insurance Services. As a Director, he is a primary contact for the firm, which was founded by Miss Minaxi Navlakha.
              </p>
              
              <p>
                Through the agency, he oversees a broad range of general insurance products, including <span className="font-semibold">Health & Life Insurance, Motor Insurance (Car and Bike)</span>, and Commercial Coverage like Liability, Warehouse, Transit, and Property Insurance.
              </p>

              <p>
                The firm emphasizes a "trusted and transparent" approach, leveraging over 10 years of industry experience. Paresh manages strategic partnerships with major providers such as <span className="font-semibold text-gray-800">HDFC ERGO, ICICI Lombard, SBI General Insurance, and Bajaj Allianz</span> to offer competitive premiums and streamlined claim settlements.
              </p>
            </div>

            <div className="border-t pt-6 space-y-2 text-gray-700">
              <p className="flex gap-2">
                <span className="font-bold">Email:</span> 
                <a href="mailto:paresh@navlakhainsurance.in" className="hover:text-[#76b543]">paresh@navlakhainsurance.in</a>
              </p>
              <p className="flex gap-2">
                <span className="font-bold">Phone:</span> 
                <a href="tel:+919316309866" className="hover:text-[#76b543]">+91-9316309866</a>
              </p>
            </div>

            <button className="p-3 bg-gray-100 rounded-full text-[#E8021E] hover:bg-[#E8021E] hover:text-white transition-all shadow-sm">
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>

      <section className="py-16 bg-gray-50">
        <TestimonialsSection testimonials={testimonials} />
      </section>

<Footer/>
    </div>
  );
};

export default About;