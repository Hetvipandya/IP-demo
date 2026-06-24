import React, { useState, useMemo } from 'react';
import Footer from './Footer';
import { Link, useNavigate } from "react-router-dom";

const Blog = () => {
  const navigate = useNavigate();

  const blogPosts = [
    {
      id: 1,
      image: "https://navlakhainsurance.in/wp-content/uploads/2025/07/127981.jpg",
      category: "Griva-Insurance",
      date: "July 26, 2025",
      title: "Property Insurance Protecting Your Valuable Assets Against Unforeseen Risks",
      description: "What is Property Insurance? Property insurance is a financial protection plan that safeguards your home, office, or commercial building against unexpected damages. It covers losses due to fire, theft, natural disasters, and other unforeseen incidents."
    },
    {
      id: 2,
      image: "https://navlakhainsurance.in/wp-content/uploads/2025/07/125089.jpg",
      category: "Griva-Insurance",
      date: "July 26, 2025",
      title: "Travel Insurance Your Trusted Companion for Safe and Worry-Free Journeys",
      description: "What is Travel Insurance? Travel insurance is a financial safety net designed to protect you from unexpected events during domestic or international trips. It covers medical emergencies, trip cancellations, lost luggage, and more."
    },
    {
      id: 3,
      image: "https://navlakhainsurance.in/wp-content/uploads/2025/07/134016.jpg",
      category: "Griva-Insurance",
      date: "July 26, 2025",
      title: "Liability Insurance Protecting You from Unexpected Legal and Financial Risks",
      description: "What is Liability Insurance? Liability insurance is a policy designed to protect individuals and businesses from the financial burden of legal claims. It covers compensation for damages, bodily injuries, or property losses."
    },
    {
      id: 4,
      image: "https://navlakhainsurance.in/wp-content/uploads/2022/11/167062.jpg",
      category: "Griva-Insurance",
      date: "November 2, 2022",
      title: "Motor Insurance Ensuring Safety and Financial Protection on the Road",
      description: "What is Motor Insurance? Motor insurance is a legal and financial shield for vehicle owners, providing protection against unforeseen risks like accidents, theft, natural calamities, and third-party liabilities."
    },
    {
      id: 5,
      image: "https://navlakhainsurance.in/wp-content/uploads/2021/11/132324.jpg",
      category: "Griva-Insurance",
      date: "November 12, 2021",
      title: "Health Insurance A Complete Guide to Securing Your Health and Finances",
      description: "What is Health Insurance? Health insurance is a financial safety net designed to protect you and your family from unexpected medical expenses. It covers the cost of hospitalization, treatments, and surgeries."
    },
  ];

  const routeMap = {
    1: "/property-insurance",
    2: "/travel-insurance",
    3: "/liability-insurance",
    4: "/motor-insurance",
    5: "/health-insurance",
  };

  const sidebarIds = [5, 4, 3];
  const sidebarPosts = sidebarIds.map(id => blogPosts.find(post => post.id === id));

  const [query, setQuery] = useState('');

  const filteredPosts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return blogPosts;
    return blogPosts.filter((post) => {
      return (
        post.title.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.date.toLowerCase().includes(q)
      );
    });
  }, [query, blogPosts]);

  const filteredSidebarPosts = useMemo(() => {
    return sidebarIds.map(id => filteredPosts.find(p => p && p.id === id)).filter(Boolean);
  }, [filteredPosts]);

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">

      <div className="relative flex-grow py-12 px-4 md:px-8 overflow-hidden">

        {/* 🔥 SAME BACKGROUND - Kept exactly as original */}
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

          {/* 6. Subtle Noise Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
        </div>

        {/* CONTENT */}
        <div className="relative z-10 max-w-[1150px] mx-auto flex flex-col lg:flex-row gap-10">

          {/* LEFT BLOG */}
          <div className="lg:w-[68%] space-y-16">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12 text-gray-500">No posts found</div>
            ) : (
              filteredPosts.map((post) => (
              <div key={post.id} className="bg-white group border-b border-gray-100 pb-16 last:border-0">

                <div className="overflow-hidden rounded-md mb-6 shadow-sm">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-auto object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="flex items-center text-[14px] text-gray-500 mb-4 gap-5 font-medium">
                  <div className="flex items-center gap-1.5">
                    <span className="text-blue-600 text-lg">📄</span>
                    <span className="text-blue-700">{post.category}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-red-500 text-lg">📅</span>
                    <span>{post.date}</span>
                  </div>
                </div>

                <Link to={routeMap[post.id]}>
                  <h2 className="text-[32px] md:text-[40px] font-bold mb-5 text-gray-800 hover:text-red-600 transition">
                    {post.title}
                  </h2>
                </Link>

                <p className="text-gray-600 text-[16px] md:text-[17px] leading-[1.8] mb-8">
                  {post.description}...
                </p>

                <Link to={routeMap[post.id]}>
                  <button className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white px-8 py-3.5 rounded-md text-[14px] font-bold transition-all duration-300 shadow-md">
                    Learn More
                  </button>
                </Link>
              </div>
            )))}
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="lg:w-[32%] space-y-8">

            {/* 🔍 Search Box */}
            <div className="bg-[#F8F9FA] p-8 rounded-md">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-1">
                  Search
                </h3>
                <div className="w-12 h-1 bg-gradient-to-r from-red-600 to-blue-600"></div>
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      if (filteredPosts && filteredPosts.length > 0) {
                        const first = filteredPosts[0];
                        if (first && routeMap[first.id]) {
                          navigate(routeMap[first.id]);
                        }
                      }
                    }
                  }}
                  className="w-full p-4 border border-gray-200 rounded-md focus:outline-none focus:border-red-500 text-gray-600 transition"
                />
                {/* Autocomplete dropdown (show up to 5 matches) */}
                {query && filteredPosts.length > 0 && (
                  <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                    {filteredPosts.slice(0, 5).map((p) => (
                      <div
                        key={p.id}
                        onMouseDown={() => navigate(routeMap[p.id])}
                        className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-start gap-3"
                      >
                        <img src={p.image} alt={p.title} className="w-12 h-12 rounded-md object-cover flex-shrink-0" />
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-gray-800">{p.title}</div>
                          <div className="text-xs text-gray-500">{p.category}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 📰 Recent Posts */}
            <div className="bg-[#F8F9FA] p-8 rounded-md">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-1">
                  Recent Post
                </h3>
                <div className="w-12 h-1 bg-gradient-to-r from-red-600 to-blue-600"></div>
              </div>

              <div className="space-y-6">
                {filteredSidebarPosts.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => navigate(routeMap[post.id])}
                    className="flex gap-4 items-start group cursor-pointer p-2 rounded-md hover:bg-white transition-all"
                  >
                    {/* Image */}
                    <div className="w-20 h-20 overflow-hidden rounded-md flex-shrink-0">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col">
                      <p className="text-sm text-gray-500 mb-1">
                        {post.date}
                      </p>

                      <h4 className="text-[16px] font-bold text-gray-700 leading-snug transition-colors group-hover:text-red-600 line-clamp-2">
                        {post.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </aside>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;