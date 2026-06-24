import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { 
  FaFacebookF, FaInstagram, FaUser, FaCalendarAlt, FaArrowLeft 
} from 'react-icons/fa';

const TravelIns = () => {
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
              <div className="rounded-xl overflow-hidden mb-6 shadow-lg border border-gray-100">
                <img 
                  src="https://navlakhainsurance.in/wp-content/uploads/2025/07/125089.jpg" 
                  alt="Travel Insurance" 
                  className="w-full h-auto object-cover transition duration-500 hover:scale-105"
                />
              </div>

              {/* Meta Info */}
              <div className="flex items-center text-sm text-gray-500 mb-6 space-x-6">
                <span className="flex items-center gap-2">
                  <FaUser className="text-red-600" /> Griva Insurance
                </span>
                <span className="flex items-center gap-2">
                  <FaCalendarAlt className="text-red-600" /> July 26, 2025
                </span>
              </div>

              <article className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">What is Travel Insurance?</h1>
                <p className="leading-relaxed text-gray-700">
                  Travel insurance is a financial safety net designed to protect you from unexpected events during domestic or international trips. It covers medical emergencies, trip cancellations, lost luggage, flight delays, and other travel-related risks. By providing comprehensive protection, it ensures that your travel experience remains enjoyable and stress-free, even when unforeseen issues arise.
                </p>

                <h2 className="text-2xl font-bold text-gray-900">Why is Travel Insurance Important?</h2>
                <p className="leading-relaxed text-gray-700">
                  Travel plans can change in an instant due to medical emergencies, bad weather, or other unexpected incidents. Without insurance, these disruptions can lead to significant financial losses. Travel insurance helps cover such costs, offering financial support and peace of mind. It's particularly essential for international travel, where medical expenses can be extremely high.
                </p>

                <h2 className="text-2xl font-bold text-gray-900">Types of Travel Insurance</h2>
                <ul className="space-y-3 pl-2">
                  <li className="flex items-start"><span className="mr-2 text-lg leading-none text-red-600">•</span><span className="text-gray-700"><strong>Single-Trip Insurance</strong> – Provides coverage for one journey, ideal for vacations or business trips.</span></li>
                  <li className="flex items-start"><span className="mr-2 text-lg leading-none text-red-600">•</span><span className="text-gray-700"><strong>Multi-Trip Insurance</strong> – Designed for frequent travelers, offering coverage for multiple trips within a year.</span></li>
                  <li className="flex items-start"><span className="mr-2 text-lg leading-none text-red-600">•</span><span className="text-gray-700"><strong>Student Travel Insurance</strong> – Protects students studying abroad against medical emergencies, baggage loss, and travel delays.</span></li>
                  <li className="flex items-start"><span className="mr-2 text-lg leading-none text-red-600">•</span><span className="text-gray-700"><strong>Family Travel Insurance</strong> – Covers the entire family under a single plan, ensuring everyone is protected during the trip.</span></li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900">Key Benefits of Travel Insurance</h2>
                <ul className="space-y-3 pl-2">
                  <li className="flex items-start"><span className="mr-2 text-lg leading-none text-red-600">•</span><span className="text-gray-700">Coverage for emergency medical expenses and hospitalizations abroad</span></li>
                  <li className="flex items-start"><span className="mr-2 text-lg leading-none text-red-600">•</span><span className="text-gray-700">Financial protection for trip cancellations, delays, or interruptions</span></li>
                  <li className="flex items-start"><span className="mr-2 text-lg leading-none text-red-600">•</span><span className="text-gray-700">Compensation for lost, stolen, or damaged luggage</span></li>
                  <li className="flex items-start"><span className="mr-2 text-lg leading-none text-red-600">•</span><span className="text-gray-700">24/7 travel assistance and support during emergencies</span></li>
                  <li className="flex items-start"><span className="mr-2 text-lg leading-none text-red-600">•</span><span className="text-gray-700">Peace of mind knowing unexpected events won't ruin your journey</span></li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900">How to Choose the Right Travel Insurance Plan?</h2>
                <p className="leading-relaxed text-gray-700">
                  Consider the nature of your trip, destination, duration, and personal needs. Look for policies that offer adequate medical coverage, a wide network of partner hospitals, and quick claim processing. Compare plans from reputable insurers for maximum benefits.
                </p>

                <h2 className="text-2xl font-bold text-gray-900">Conclusion</h2>
                <p className="leading-relaxed text-gray-700">
                  Travel insurance is more than just an optional add-on—it's an essential part of smart travel planning. By securing the right travel insurance, you protect yourself from unpredictable events and ensure that your journey remains memorable for all the right reasons.
                </p>
              </article>

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
                    <FaInstagram size={14} />
                  </a>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="mt-12 py-8 border-t border-b border-gray-100 flex items-center justify-between">
                {/* Previous Button - Points to Property Insurance */}
                <div 
                  className="flex items-center gap-4 group cursor-pointer text-left" 
                  onClick={() => navigate('/property-insurance')}
                >
                  <div className="w-10 h-10 border border-gray-200 flex items-center justify-center rounded-lg text-gray-400 group-hover:bg-gradient-to-r group-hover:from-red-600 group-hover:to-blue-600 group-hover:text-white transition-all duration-300">
                    <span className="text-xl">«</span>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Previous Post</p>
                    <p className="font-bold text-gray-700 group-hover:text-red-600 transition-colors">Property Insurance</p>
                  </div>
                </div>

                {/* Next Button - Points to Liability Insurance */}
                <div 
                  className="flex items-center gap-4 group cursor-pointer text-right" 
                  onClick={() => navigate('/liability-insurance')}
                >
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Next Post</p>
                    <p className="font-bold text-gray-700 group-hover:text-red-600 transition-colors">Liability Insurance</p>
                  </div>
                  <div className="w-10 h-10 border border-gray-200 flex items-center justify-center rounded-lg text-gray-400 group-hover:bg-gradient-to-r group-hover:from-red-600 group-hover:to-blue-600 group-hover:text-white transition-all duration-300">
                    <span className="text-xl">»</span>
                  </div>
                </div>
              </div>

              {/* Leave A Comment Section */}
              <div className="mt-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Leave A Comment</h3>
                <form className="space-y-5">
                  <div className="w-full">
                    <textarea 
                      placeholder="Comment" 
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all h-40"
                    ></textarea>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input 
                      type="text" 
                      placeholder="Name*" 
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                      required
                    />
                    <input 
                      type="email" 
                      placeholder="Email*" 
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                      required
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="bg-gradient-to-r from-red-600 to-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:shadow-lg transition-all duration-300 uppercase text-sm tracking-wider"
                  >
                    Post Comment
                  </button>
                </form>
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
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TravelIns;