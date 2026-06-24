import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { 
  FaFacebookF, FaInstagram, FaUser, FaCalendarAlt, FaArrowLeft 
} from 'react-icons/fa';

const HealthIns = () => {
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
      title: "Liability Insurance: Protecting Your Business", 
      date: "15 January, 2023", 
      img: "https://navlakhainsurance.in/wp-content/uploads/2025/07/134016.jpg",
      path: "/liability-insurance" 
    }
  ];

  // Full posts list for search/autocomplete
  const postsList = [
    { id: 1, title: 'Property Insurance Protecting Your Valuable Assets', category: 'Property', date: 'July 26, 2025', img: 'https://navlakhainsurance.in/wp-content/uploads/2025/07/127981.jpg', path: '/property-insurance' },
    { id: 2, title: 'Travel Insurance Your Trusted Companion', category: 'Travel', date: 'July 26, 2025', img: 'https://navlakhainsurance.in/wp-content/uploads/2025/07/125089.jpg', path: '/travel-insurance' },
    { id: 3, title: 'Liability Insurance Protecting Your Business', category: 'Liability', date: 'July 26, 2025', img: 'https://navlakhainsurance.in/wp-content/uploads/2025/07/134016.jpg', path: '/liability-insurance' },
    { id: 4, title: 'Motor Insurance Ensuring Safety on the Road', category: 'Motor', date: 'November 2, 2022', img: 'https://navlakhainsurance.in/wp-content/uploads/2022/11/167062.jpg', path: '/motor-insurance' },
    { id: 5, title: 'Health Insurance A Complete Guide', category: 'Health', date: 'November 12, 2021', img: 'https://navlakhainsurance.in/wp-content/uploads/2021/11/132324.jpg', path: '/health-insurance' },
  ];

  const [query, setQuery] = useState('');

  const filteredPosts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return postsList;
    return postsList.filter(p => (
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.date.toLowerCase().includes(q)
    ));
  }, [query]);

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
                  src="https://navlakhainsurance.in/wp-content/uploads/2021/11/132324.jpg" 
                  alt="Health Insurance" 
                  className="w-full h-auto object-cover transition duration-500 hover:scale-105"
                />
              </div>

              {/* Meta Info */}
              <div className="flex items-center text-sm text-gray-500 mb-6 space-x-6">
                <span className="flex items-center gap-2">
                  <FaUser className="text-red-600" /> Felixaerocrop
                </span>
                <span className="flex items-center gap-2">
                  <FaCalendarAlt className="text-red-600" /> November 12, 2021
                </span>
              </div>

              <article className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">What is Health Insurance?</h1>
                <p className="leading-relaxed text-gray-700">
                  Health insurance is a financial safety net designed to protect you and your family from unexpected medical expenses. It covers the cost of hospitalization, treatments, surgeries, and sometimes even preventive care.
                </p>

                <h2 className="text-2xl font-bold text-gray-900">Why is Health Insurance Important?</h2>
                <p className="leading-relaxed text-gray-700">
                  Healthcare expenses are rising every year, making it harder for families to bear sudden medical bills. Health insurance helps you manage these costs by covering expenses for illnesses, accidents, and critical conditions.
                </p>

                <h2 className="text-2xl font-bold text-gray-900">Types of Health Insurance Plans</h2>
                <ul className="space-y-3 pl-2">
                  <li className="flex items-start"><span className="mr-2 text-lg leading-none text-red-600">•</span><span className="text-gray-700"><strong>Individual Health Insurance:</strong> Covers one person under a single sum insured.</span></li>
                  <li className="flex items-start"><span className="mr-2 text-lg leading-none text-red-600">•</span><span className="text-gray-700"><strong>Family Floater Plans:</strong> One policy covers your entire family.</span></li>
                </ul>
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
              <div className="mt-12 py-8 border-t border-b border-gray-100 flex items-center">
                <div 
                  className="flex items-center gap-4 group cursor-pointer text-left" 
                  onClick={() => navigate('/motor-insurance')}
                >
                  <div className="w-10 h-10 border border-gray-200 flex items-center justify-center rounded-lg text-gray-400 group-hover:bg-gradient-to-r group-hover:from-red-600 group-hover:to-blue-600 group-hover:text-white transition-all duration-300">
                    <span className="text-xl">«</span>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Previous Post</p>
                    <p className="font-bold text-gray-700 group-hover:text-red-600 transition-colors">Motor Insurance</p>
                  </div>
                </div>
              </div>

              {/* Comment Section */}
              <div className="mt-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Leave A Comment</h3>
                <form className="space-y-5">
                  <textarea 
                    placeholder="Comment" 
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all h-40"
                  ></textarea>
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
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        if (filteredPosts && filteredPosts.length > 0) {
                          navigate(filteredPosts[0].path);
                        }
                      }
                    }}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-600 transition"
                  />

                  {/* Autocomplete dropdown */}
                  {query && filteredPosts.length > 0 && (
                    <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                      {filteredPosts.slice(0,5).map(p => (
                        <div key={p.id} onMouseDown={() => navigate(p.path)} className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-start gap-3">
                          <img src={p.img} alt={p.title} className="w-12 h-12 rounded-md object-cover flex-shrink-0" />
                          <div>
                            <div className="text-sm font-semibold text-gray-800">{p.title}</div>
                            <div className="text-xs text-gray-500">{p.category}</div>
                          </div>
                        </div>
                      ))}
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

export default HealthIns;