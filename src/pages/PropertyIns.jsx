import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import {
  FaFacebookF, FaTwitter, FaPinterestP, FaLinkedinIn,
  FaUser, FaCalendarAlt, FaSearch, FaArrowLeft
} from 'react-icons/fa';

const PropertyIns = () => {
  const navigate = useNavigate();

  // અહીં દરેક પોસ્ટ માટે 'path' ઉમેર્યો છે જેથી લિંક કામ કરે
  const recentPosts = [
    {
      title: "Health Insurance A Complete Guide",
      date: "12 November, 2021",
      img: "https://navlakhainsurance.in/wp-content/uploads/2021/11/132324-150x150.jpg",
      path: "/health-insurance"
    },
    {
      title: "Motor Insurance Ensuring Safety and",
      date: "02 November, 2022",
      img: "https://navlakhainsurance.in/wp-content/uploads/2022/11/167062-150x150.jpg",
      path: "/motor-insurance"
    },
    {
      title: "Liability Insurance Protecting You from",
      date: "26 July, 2025",
      img: "https://navlakhainsurance.in/wp-content/uploads/2025/07/134016-150x150.jpg",
      path: "/liability-insurance"
    },
  ];

  return (
    <>
        <div className="relative overflow-hidden bg-[#f9fbff]">
            <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 h-full w-1/3 bg-[#eef2ff] skew-x-[-12deg] border-l border-[#dbe4ff]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] h-72 w-72 rounded-full bg-[#213591]/10 blur-3xl"></div>
      </div>

       <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-10">

        {/* --- Back Button --- */} 
        <button
          onClick={() => navigate('/blog')}
          className="flex items-center gap-2 mb-6 text-[#213591] font-semibold hover:text-[#E8021E] transition-colors group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Blogs
        </button>

        <div className="flex flex-col lg:flex-row gap-10">

          {/* --- Main Content --- */}
          <main className="lg:w-2/3">
            {/* Hero Image */}
            <div className="rounded-lg overflow-hidden mb-6 shadow-sm">
              <img
                src="https://navlakhainsurance.in/wp-content/uploads/2025/07/127981.jpg"
                alt="Property Insurance"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Meta Info */}
            <div className="flex items-center text-sm text-gray-500 mb-6 space-x-6">
              <span className="flex items-center gap-2">
                <FaUser className="text-[#213591]" /> Navlakhainsurance
              </span>
              <span className="flex items-center gap-2">
                <FaCalendarAlt className="text-[#213591]" /> July 26, 2025
              </span>
            </div>

            {/* Full Article Content */}
            <article className="space-y-6">
              <h1 className="text-3xl font-bold text-[#222222] tracking-tight">What is Property Insurance?</h1>
              <p className="leading-relaxed">
                Property insurance is a financial protection plan that safeguards your home, office, or commercial building against unexpected damages. It covers losses due to fire, theft, natural disasters, and other unforeseen incidents.
              </p>

              <h2 className="text-2xl font-bold text-[#222222]">Why is Property Insurance Important?</h2>
              <p className="leading-relaxed">
                Your property is one of your most significant investments. Damage from fire, floods, or earthquakes can result in huge financial losses. It not only protects the physical structure but also covers contents like furniture and electronics.
              </p>

              <h2 className="text-2xl font-bold text-[#222222]">Types of Property Insurance</h2>
              <ul className="space-y-3 pl-2">
                <li className="flex items-start">
                  <span className="mr-2 text-lg leading-none">•</span>
                  <span><strong>Home Insurance</strong> – Covers houses and personal belongings against risks like fire and theft.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-lg leading-none">•</span>
                  <span><strong>Commercial Property Insurance</strong> – Designed for offices, warehouses, and shops, covering property damages and operational losses.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-lg leading-none">•</span>
                  <span><strong>Landlord Insurance</strong> – Protects property owners against tenant-related damages and loss of rental income.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-lg leading-none">•</span>
                  <span><strong>Package Policies</strong> – Comprehensive plans that include both structural and content coverage under one policy.</span>
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-[#222222]">Key Benefits of Property Insurance</h2>
              <ul className="space-y-3 pl-2">
                <li className="flex items-start"><span className="mr-2">•</span> Financial coverage for rebuilding or repairing damaged property</li>
                <li className="flex items-start"><span className="mr-2">•</span> Protection against theft, fire, and natural calamities</li>
                <li className="flex items-start"><span className="mr-2">•</span> Coverage for contents like furniture, appliances, and personal items</li>
                <li className="flex items-start"><span className="mr-2">•</span> Peace of mind knowing your assets are safeguarded</li>
                <li className="flex items-start"><span className="mr-2">•</span> Affordable premiums tailored to your property’s value and risks</li>
              </ul>

              <h2 className="text-2xl font-bold text-[#222222]">How to Choose the Right Property Insurance?</h2>
              <p className="leading-relaxed">
                Evaluate your property’s value, location, and specific risks. Check for coverage inclusions, exclusions, and claim settlement records of insurers. Choose a policy that provides adequate protection for both structure and contents.
              </p>

              <h2 className="text-2xl font-bold text-[#222222]">Conclusion</h2>
              <p className="leading-relaxed">
                Property insurance is a crucial investment for anyone who owns real estate. It shields you from heavy financial burdens caused by unforeseen events, ensuring your home or business stays protected. By choosing the right plan, you can secure your assets and enjoy complete peace of mind.
              </p>
            </article>

            {/* --- NEXT PAGE NAVIGATION --- */}
            <div
              className="mt-12 py-8 border-y border-gray-100 flex items-center justify-end gap-4 group cursor-pointer text-right"
              onClick={() => navigate('/travel-insurance')}
            >
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Next Post</p>
                <p className="font-bold text-[#333] group-hover:text-[#E8021E] transition-colors">Travel Insurance</p>
              </div>
              <div className="w-10 h-10 border border-gray-200 flex items-center justify-center rounded text-gray-400 group-hover:bg-[#E8021E] group-hover:text-white transition-all duration-300">
                »
              </div>
            </div>

            {/* Social Share Section */}
            <div className="mt-8 flex items-center gap-4">
              <span className="font-bold text-gray-800">Share:</span>
              <div className="flex gap-2">

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/share/1EDh2pvbff/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SocialIcon icon={<FaFacebookF size={14} />} color="bg-[#213591]" />
                </a>




                {/* Instagram */}
                <a
                  href="https://www.instagram.com/solutiongrivainsurance?utm_source=qr&igsh=MXN0N2dzMmtwYmRnaA=="
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SocialIcon icon={<FaLinkedinIn size={14} />} color="bg-[#213591]" />
                </a>

              </div>
            </div>
          </main>

          {/* --- Sidebar --- */}
          <aside className="lg:w-1/3 space-y-8">

            {/* Search Box */}
            <div className="bg-[#F8F9FA] p-8 rounded-md">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-[#222222] mb-1">Search</h3>
                <div className="w-12 h-1 bg-red-600"></div>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full p-4 border border-gray-200 rounded-md focus:outline-none text-gray-600"
                />
              </div>
            </div>

            {/* Recent Posts Box */}
            <div className="bg-[#F8F9FA] p-8 rounded-md">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#222222] mb-1">Recent Post</h3>
                <div className="w-12 h-1 bg-red-600"></div>
              </div>
              <div className="space-y-8">
                {recentPosts.map((post, index) => (
                  <div
                    key={index}
                    className="flex gap-4 items-center group cursor-pointer"
                    onClick={() => navigate(post.path)}
                  >
                    <img
                      src={post.img}
                      alt="post"
                      className="w-20 h-20 rounded-md object-cover flex-shrink-0 shadow-sm"
                    />
                    <div className="flex flex-col">
                      <p className="text-[14px] text-gray-500 mb-1">{post.date}</p>
                      <h4 className="text-[16px] font-bold text-[#222222] group-hover:text-[#E8021E] transition-colors leading-snug">
                        {post.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Comment Section */}
        <section className="mt-16 mb-10 max-w-2xl">
          <h3 className="text-xl font-bold mb-6 text-gray-900">Leave A Comment</h3>
          <textarea
            className="w-full h-44 p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#4CAF50] focus:border-[#4CAF50] outline-none transition-all"
            placeholder="Write your comment here..."
          ></textarea>
          <button className="mt-4 px-8 py-3 bg-[#213591] text-white font-bold rounded hover:bg-[#002848] transition-colors uppercase text-sm tracking-wider">
            Post Comment
          </button>
        </section>
      </div>
      </div>
      <Footer />
    </>
  );
};

// Social Icon Component
const SocialIcon = ({ icon, color }) => (
  <div className={`w-8 h-8 ${color} hover:opacity-90 rounded-full flex items-center justify-center text-white cursor-pointer transition-all`}>
    {icon}
  </div>
);

export default PropertyIns;