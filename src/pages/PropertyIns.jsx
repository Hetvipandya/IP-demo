import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import {
  FaFacebookF, FaTwitter, FaPinterestP, FaLinkedinIn,
  FaUser, FaCalendarAlt, FaSearch, FaArrowLeft
} from 'react-icons/fa';

const PropertyIns = () => {
  const navigate = useNavigate();

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

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <>
      <div className="relative overflow-hidden bg-white">
        
        {/* Background Pattern - Updated to match homepage */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-red-50 to-blue-50"></div>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 right-20 w-72 h-72 bg-red-200 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-200 rounded-full blur-3xl"></div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-10">

          {/* Back Button */}
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center gap-2 mb-6 text-red-600 font-semibold hover:text-blue-700 transition-colors group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Back to Blogs
          </button>

          <div className="flex flex-col lg:flex-row gap-10">

            {/* Main Content */}
            <main className="lg:w-2/3">
              {/* Hero Image */}
              <div className="rounded-xl overflow-hidden mb-6 shadow-lg border border-gray-100">
                <img
                  src="https://navlakhainsurance.in/wp-content/uploads/2025/07/127981.jpg"
                  alt="Property Insurance"
                  className="w-full h-auto object-cover transition duration-500 hover:scale-105"
                />
              </div>

              {/* Meta Info */}
              <div className="flex items-center text-sm text-gray-500 mb-6 space-x-6">
                <span className="flex items-center gap-2">
                  <FaUser className="text-red-600" /> Navlakhainsurance
                </span>
                <span className="flex items-center gap-2">
                  <FaCalendarAlt className="text-red-600" /> July 26, 2025
                </span>
              </div>

              {/* Full Article Content */}
              <article className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">What is Property Insurance?</h1>
                <p className="leading-relaxed text-gray-700">
                  Property insurance is a financial protection plan that safeguards your home, office, or commercial building against unexpected damages. It covers losses due to fire, theft, natural disasters, and other unforeseen incidents.
                </p>

                <h2 className="text-2xl font-bold text-gray-900">Why is Property Insurance Important?</h2>
                <p className="leading-relaxed text-gray-700">
                  Your property is one of your most significant investments. Damage from fire, floods, or earthquakes can result in huge financial losses. It not only protects the physical structure but also covers contents like furniture and electronics.
                </p>

                <h2 className="text-2xl font-bold text-gray-900">Types of Property Insurance</h2>
                <ul className="space-y-3 pl-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2 text-lg leading-none text-red-600">•</span>
                    <span><strong>Home Insurance</strong> – Covers houses and personal belongings against risks like fire and theft.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-lg leading-none text-red-600">•</span>
                    <span><strong>Commercial Property Insurance</strong> – Designed for offices, warehouses, and shops, covering property damages and operational losses.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-lg leading-none text-red-600">•</span>
                    <span><strong>Landlord Insurance</strong> – Protects property owners against tenant-related damages and loss of rental income.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-lg leading-none text-red-600">•</span>
                    <span><strong>Package Policies</strong> – Comprehensive plans that include both structural and content coverage under one policy.</span>
                  </li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900">Key Benefits of Property Insurance</h2>
                <ul className="space-y-3 pl-2 text-gray-700">
                  <li className="flex items-start"><span className="mr-2 text-red-600">•</span> Financial coverage for rebuilding or repairing damaged property</li>
                  <li className="flex items-start"><span className="mr-2 text-red-600">•</span> Protection against theft, fire, and natural calamities</li>
                  <li className="flex items-start"><span className="mr-2 text-red-600">•</span> Coverage for contents like furniture, appliances, and personal items</li>
                  <li className="flex items-start"><span className="mr-2 text-red-600">•</span> Peace of mind knowing your assets are safeguarded</li>
                  <li className="flex items-start"><span className="mr-2 text-red-600">•</span> Affordable premiums tailored to your property’s value and risks</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900">How to Choose the Right Property Insurance?</h2>
                <p className="leading-relaxed text-gray-700">
                  Evaluate your property’s value, location, and specific risks. Check for coverage inclusions, exclusions, and claim settlement records of insurers. Choose a policy that provides adequate protection for both structure and contents.
                </p>

                <h2 className="text-2xl font-bold text-gray-900">Conclusion</h2>
                <p className="leading-relaxed text-gray-700">
                  Property insurance is a crucial investment for anyone who owns real estate. It shields you from heavy financial burdens caused by unforeseen events, ensuring your home or business stays protected. By choosing the right plan, you can secure your assets and enjoy complete peace of mind.
                </p>
              </article>

              {/* Next Page Navigation */}
              <div
                className="mt-12 py-8 border-t border-b border-gray-100 flex items-center justify-end gap-4 group cursor-pointer text-right"
                onClick={() => navigate('/travel-insurance')}
              >
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Next Post</p>
                  <p className="font-bold text-gray-700 group-hover:text-red-600 transition-colors">Travel Insurance</p>
                </div>
                <div className="w-10 h-10 border border-gray-200 flex items-center justify-center rounded-lg text-gray-400 group-hover:bg-gradient-to-r group-hover:from-red-600 group-hover:to-blue-600 group-hover:text-white transition-all duration-300">
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
      className="w-8 h-8 bg-[#1877F2] hover:bg-[#0d6ad2] rounded-full flex items-center justify-center text-white transition-all duration-300"
    >
      <FaFacebookF size={14} />
    </a>

    {/* Instagram */}
    <a
      href="https://www.instagram.com/solutiongrivainsurance?utm_source=qr&igsh=MXN0N2dzMmtwYmRnaA=="
      target="_blank"
      rel="noopener noreferrer"
      className="w-8 h-8 bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] hover:opacity-90 rounded-full flex items-center justify-center text-white transition-all duration-300"
    >
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    </a>
  </div>
</div>
            </main>

            {/* Sidebar */}
            <aside className="lg:w-1/3 space-y-8">

              {/* Search Box */}
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <div className="mb-5">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Search</h3>
                  <div className="w-12 h-1 bg-gradient-to-r from-red-600 to-blue-600 rounded-full"></div>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => {
                      const v = e.target.value;
                      setQuery(v);
                      if (v.trim() === '') {
                        setResults([]);
                        setShowDropdown(false);
                        return;
                      }
                      const filtered = recentPosts.filter(p =>
                        p.title.toLowerCase().includes(v.toLowerCase())
                      );
                      setResults(filtered);
                      setShowDropdown(true);
                    }}
                    onFocus={() => { if (query.trim() !== '' && results.length) setShowDropdown(true); }}
                    onBlur={() => { setTimeout(() => setShowDropdown(false), 150); }}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-600 transition"
                  />

                  {showDropdown && (
                    <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-60 overflow-auto">
                      {results.length > 0 ? (
                        results.map((r, i) => (
                          <div
                            key={i}
                            onMouseDown={() => navigate(r.path)}
                            className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-start gap-3"
                          >
                            <img src={r.img} alt="thumb" className="w-10 h-10 rounded object-cover" />
                            <div>
                              <p className="text-sm font-semibold text-gray-800">{r.title}</p>
                              <p className="text-xs text-gray-500">{r.date}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-sm text-gray-500">No results found</div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Recent Posts Box */}
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Recent Post</h3>
                  <div className="w-12 h-1 bg-gradient-to-r from-red-600 to-blue-600 rounded-full"></div>
                </div>
                <div className="space-y-6">
                  {recentPosts.map((post, index) => (
                    <div
                      key={index}
                      className="flex gap-4 items-center group cursor-pointer"
                      onClick={() => navigate(post.path)}
                    >
                      <img
                        src={post.img}
                        alt="post"
                        className="w-20 h-20 rounded-lg object-cover flex-shrink-0 shadow-sm group-hover:shadow-md transition"
                      />
                      <div className="flex flex-col">
                        <p className="text-xs text-gray-500 mb-1">{post.date}</p>
                        <h4 className="text-sm font-bold text-gray-800 group-hover:text-red-600 transition-colors leading-snug">
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
              className="w-full h-44 p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
              placeholder="Write your comment here..."
            ></textarea>
            <button className="mt-4 px-8 py-3 bg-gradient-to-r from-red-600 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300 uppercase text-sm tracking-wider">
              Post Comment
            </button>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PropertyIns;