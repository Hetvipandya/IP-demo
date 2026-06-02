import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, ZoomIn, ChevronRight, Phone, Mail, MapPin } from 'lucide-react';
import Footer from "../components/Footer"

const Gallery = () => {
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [activeTab, setActiveTab] = React.useState('all');

  const images = [
    { id: 1, src: "https://content3.jdmagicbox.com/comp/ahmedabad/r5/079pxx79.xx79.200911224004.x6r5/catalogue/griva-insurance-solution-vishwas-city-1-ahmedabad-life-insurance-agents-lic-oh73w9cnq9.jpg", alt: "Office Work", category: "office" },
    { id: 2, src: "https://content3.jdmagicbox.com/comp/ahmedabad/r5/079pxx79.xx79.200911224004.x6r5/catalogue/griva-insurance-solution-ghatlodiya-ahmedabad-life-insurance-agents-lic-8a94bgz0my.jpg", alt: "Office Entrance", category: "office" },
    { id: 3, src: "https://media.licdn.com/dms/image/v2/D4D22AQEMyEAvt-vSuQ/feedshare-shrink_800/feedshare-shrink_800/0/1689514965135?e=2147483647&v=beta&t=9b9rSryE0zHjPctw_4CHJr-VHWu_OuRZEbGH1ROYN3I", alt: "Office Interior", category: "events" },
    { id: 4, src: "https://media.licdn.com/dms/image/v2/D4D22AQG2XL2MyiI-Fg/feedshare-shrink_800/feedshare-shrink_800/0/1679833100426?e=2147483647&v=beta&t=fTN5XOVP49-PYrKEw142DNAd22lvQmq1d9iQl2PeCXA", alt: "Insurance Services Board", category: "office" },
    { id: 5, src: "https://images.jdmagicbox.com/comp/ahmedabad/d5/079pxx79.xx79.170626130525.t5d5/catalogue/satish-m-pandey-chandlodiya-ahmedabad-life-insurance-agents-lic-4iyhq-250.jpg", alt: "Office Decor", category: "events" },
    { id: 6, src: "https://images.jdmagicbox.com/v2/comp/ahmedabad/m1/079pxx79.xx79.100422115830.w7m1/catalogue/vipul-patel-ghatlodiya-ghatlodia-life-insurance-agents-lic-hf3wk7lipq-250.jpg", alt: "Wall Frames", category: "office" },
    { id: 7, src: "https://images.jdmagicbox.com/comp/ahmedabad/p6/079pxx79.xx79.110413092902.a2p6/catalogue/satish-ghachelia-ghatlodiya-ahmedabad-life-insurance-agents-lic-e2n68e9es0-250.jpg", alt: "Reception Area", category: "office" },
    { id: 8, src: "https://content3.jdmagicbox.com/comp/ahmedabad/r5/079pxx79.xx79.200911224004.x6r5/catalogue/griva-insurance-solution-vishwas-city-1-ahmedabad-life-insurance-agents-lic-oh73w9cnq9.jpg", alt: "Team Meeting", category: "events" },
  ];

  const filteredImages = activeTab === 'all' ? images : images.filter(img => img.category === activeTab);

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">

      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-red-50 to-blue-50"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-20 w-72 h-72 bg-red-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-200 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        
        {/* Hero Section */}
        <section className="relative py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600/10 to-blue-600/10 px-3 py-1 rounded-full mb-3">
                <Camera className="w-4 h-4 text-red-600" />
                <span className="text-xs font-semibold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent uppercase tracking-wide">Our Gallery</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                Our Journey <span className="bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">in Motion</span>
              </h1>
              <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
                Explore our collection of engaging photos that showcase our services, team, and workplace.
              </p>
              <div className="w-16 h-1 bg-gradient-to-r from-red-600 to-blue-600 mx-auto mt-4 rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Filter Tabs */}
        <section className="pb-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center gap-2 flex-wrap">
              {[
                { id: 'all', label: 'All Photos' },
                { id: 'office', label: 'Office' },
                { id: 'events', label: 'Events' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-1.5 rounded-full font-semibold transition-all duration-300 text-xs ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-red-600 to-blue-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-8 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className="group relative aspect-square overflow-hidden rounded-xl shadow-md cursor-pointer bg-gray-100"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-white text-xs font-medium">{image.alt}</p>
                    </div>
                    <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full p-1.5">
                      <ZoomIn className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-red-600 to-blue-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {image.category === 'office' ? 'Office' : 'Event'}
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredImages.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-sm">No images found in this category.</p>
              </div>
            )}
          </div>
        </section>
          <Footer />
      </div>

    
    </div>
  );
};

export default Gallery;