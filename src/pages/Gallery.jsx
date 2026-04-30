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
 <div className="flex flex-col pt-0 min-h-screen bg-[#f4f7ff]">
      {/* Reduced padding to remove top gap */}
      <section className="py-10"> 
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
              <div key={image.id} className="relative aspect-square overflow-hidden rounded-md shadow-md group border-4 border-white">
                <img src={image.src} alt={image.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
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