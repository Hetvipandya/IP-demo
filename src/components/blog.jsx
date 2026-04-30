import React from 'react';
import Footer from './Footer';
import { Link } from "react-router-dom";

const Blog = () => {

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

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">

      <div className="flex-grow py-12 px-4 md:px-8">
        <div className="max-w-[1150px] mx-auto flex flex-col lg:flex-row gap-10">

          <div className="lg:w-[68%] space-y-16">
            {blogPosts.map((post) => (
              <div key={post.id} className="bg-white group border-b border-gray-100 pb-16 last:border-0">
                
                <div className="overflow-hidden rounded-md mb-6 shadow-sm">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="flex items-center text-[14px] text-gray-500 mb-4 gap-5 font-medium">
                  <div className="flex items-center gap-1.5">
                    <span className="text-green-600 text-lg">👤</span>
                    <span className="hover:text-green-600 cursor-pointer">{post.category}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-green-600 text-lg">📅</span>
                    <span>{post.date}</span>
                  </div>
                </div>

                <Link to={routeMap[post.id]}>
                  <h2 className="text-[32px] md:text-[40px] font-bold mb-5 text-[#111111] leading-tight hover:text-blue-600 transition-colors cursor-pointer">
                    {post.title}
                  </h2>
                </Link>

                <p className="text-[#555555] text-[16px] md:text-[17px] leading-[1.8] mb-8">
                  {post.description}...
                </p>

                <Link to={routeMap[post.id]}>
                  <button className="bg-[#f3c669] hover:bg-red-500 hover:text-white px-8 py-3.5 rounded-md text-[14px] font-bold transition-all duration-300 shadow-sm">
                    Learn More
                  </button>
                </Link>
              </div>
            ))}
          </div>

          {/* RIGHT COLUMN: SIDEBAR */}
          <div className="lg:w-[32%]">
            <div className="space-y-8">
              
              {/* SEARCH BOX */}
              <div className="bg-[#f3f4f6] p-8 rounded-md">
                <h3 className="text-[20px] font-bold text-gray-900 mb-1">Search</h3>
                <div className="w-10 h-[3px] bg-red-600 mb-6"></div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full p-3.5 border border-gray-200 rounded-md focus:border-green-600 outline-none"
                  />
                </div>
              </div>

              {/* RECENT POSTS SECTION - EXACTLY LIKE IMAGE */}
              <div className="bg-[#f3f4f6] p-8 rounded-md">
                <h3 className="text-[24px] font-bold text-gray-900 mb-2">
                  Recent Post
                </h3>
                <div className="w-12 h-[3px] bg-red-600 mb-10"></div>

                <div className="space-y-10">
                  {sidebarPosts.map((post) => (
                    <Link key={post.id} to={routeMap[post.id]} className="block">
                      <div className="flex gap-5 items-start group cursor-pointer">

                        {/* Sidebar Image */}
                        <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-sm">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>

                        {/* Sidebar Content */}
                        <div className="flex flex-col">
                          <span className="text-[14px] text-gray-500 mb-2 font-medium">
                            {post.date}
                          </span>
                          <h4 className="text-[17px] font-bold text-gray-900 leading-snug group-hover:text-blue-600 transition duration-300 line-clamp-2">
                            {post.title}
                          </h4>
                        </div>

                      </div>
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;