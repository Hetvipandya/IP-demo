import React from 'react';
import Footer from '../components/Footer';

const Gallery = () => {

  const images = [
    { id: 1, src: "https://content3.jdmagicbox.com/comp/ahmedabad/r5/079pxx79.xx79.200911224004.x6r5/catalogue/griva-insurance-solution-vishwas-city-1-ahmedabad-life-insurance-agents-lic-oh73w9cnq9.jpg", alt: "Office Work" },
    { id: 2, src: "https://content3.jdmagicbox.com/comp/ahmedabad/r5/079pxx79.xx79.200911224004.x6r5/catalogue/griva-insurance-solution-ghatlodiya-ahmedabad-life-insurance-agents-lic-8a94bgz0my.jpg", alt: "Navlakha Logo Entrance" },
    { id: 3, src: "https://media.licdn.com/dms/image/v2/D4D22AQEMyEAvt-vSuQ/feedshare-shrink_800/feedshare-shrink_800/0/1689514965135?e=2147483647&v=beta&t=9b9rSryE0zHjPctw_4CHJr-VHWu_OuRZEbGH1ROYN3I", alt: "Office Interior" },
    { id: 4, src: "https://media.licdn.com/dms/image/v2/D4D22AQG2XL2MyiI-Fg/feedshare-shrink_800/feedshare-shrink_800/0/1679833100426?e=2147483647&v=beta&t=fTN5XOVP49-PYrKEw142DNAd22lvQmq1d9iQl2PeCXA", alt: "Insurance Services Board" },
    { id: 5, src: "https://images.jdmagicbox.com/comp/ahmedabad/d5/079pxx79.xx79.170626130525.t5d5/catalogue/satish-m-pandey-chandlodiya-ahmedabad-life-insurance-agents-lic-4iyhq-250.jpg", alt: "Office Decor" },
    { id: 6, src: "https://images.jdmagicbox.com/v2/comp/ahmedabad/m1/079pxx79.xx79.100422115830.w7m1/catalogue/vipul-patel-ghatlodiya-ghatlodia-life-insurance-agents-lic-hf3wk7lipq-250.jpg", alt: "Wall Frames" },
    { id: 7, src: "https://images.jdmagicbox.com/comp/ahmedabad/p6/079pxx79.xx79.110413092902.a2p6/catalogue/satish-ghachelia-ghatlodiya-ahmedabad-life-insurance-agents-lic-e2n68e9es0-250.jpg", alt: "Reception Area" },
  ];

return (
  <div className="relative min-h-screen bg-white overflow-hidden">

    {/* 🔥 YOUR CUSTOM BACKGROUND */}
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none bg-[#ffffff]">
      
      {/* 1. Radial Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,_rgba(33,53,145,0.03)_0%,_transparent_50%)]"></div>

      {/* 2. Floating Glass Cards */}
      <div className="absolute top-[-5%] right-[5%] w-72 h-72 bg-[#213591]/[0.02] rounded-3xl rotate-12 border border-slate-100 shadow-sm"></div>
      <div className="absolute top-[5%] right-[-2%] w-64 h-64 bg-[#E8021E]/[0.01] rounded-[3rem] -rotate-12 border border-red-50/50"></div>

      {/* 3. Grid Dots */}
      <div className="absolute bottom-10 left-10 opacity-20">
        <div className="grid grid-cols-4 gap-4">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#213591]"></div>
          ))}
        </div>
      </div>

      {/* 4. Diagonal Lines */}
      <svg
        className="absolute right-0 top-0 h-full w-1/2 opacity-[0.15]"
        viewBox="0 0 400 800"
        fill="none"
      >
        <path d="M400 0L150 800" stroke="#213591" strokeWidth="0.5" />
        <path d="M450 0L200 800" stroke="#213591" strokeWidth="0.5" />
        <path d="M350 0L100 800" stroke="#E8021E" strokeWidth="1" strokeDasharray="10 10" />
      </svg>

      {/* 5. Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#213591]/5 rounded-full blur-[120px]"></div>

      {/* 6. Noise */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>

    {/* 🔥 CONTENT */}
    <section className="relative z-10 py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="text-center mb-8 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#213591] mb-2">
            Our Journey <span className="text-[#E8021E]">in Motion</span>
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Explore our collection of engaging videos and photos that showcase our services.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <div
              key={image.id}
              className="relative aspect-square overflow-hidden rounded-md shadow-md group border-4 border-white"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

      </div>
    </section>

    <Footer />
  </div>
);
};

export default Gallery;