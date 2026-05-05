import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { 
  FaFacebookF, FaTwitter, FaPinterestP, FaLinkedinIn, 
  FaUser, FaCalendarAlt, FaSearch, FaArrowLeft 
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

  return (
    <>
      <div className="relative overflow-hidden">

         <div className="absolute inset-0 z-0">
    
    {/* RIGHT SKEW SHAPE */}
    <div className="absolute top-0 right-0 h-full w-1/3 bg-[#eef2ff] skew-x-[-12deg] border-l border-[#dbe4ff]"></div>

    {/* LEFT BLUR CIRCLE */}
    <div className="absolute bottom-[-10%] left-[-5%] h-72 w-72 rounded-full bg-[#213591]/10 blur-3xl"></div>

    {/* EXTRA TOP LIGHT GLOW (NEW - MORE ATTRACTIVE) */}
    <div className="absolute top-[-10%] left-[20%] h-60 w-60 bg-[#E8021E]/10 rounded-full blur-3xl"></div>
  </div>

   <div className="relative z-10 max-w-6xl mx-auto p-6 font-sans text-[#444444] antialiased">
        
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
            <div className="rounded-lg overflow-hidden mb-6 shadow-sm">
              <img 
                src="https://navlakhainsurance.in/wp-content/uploads/2025/07/125089.jpg" 
                alt="Travel Insurance" 
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

            <article className="space-y-6 text-[#444444]">
              <h1 className="text-3xl font-bold text-[#222222] tracking-tight">What is Travel Insurance?</h1>
              <p className="leading-relaxed">
                Travel insurance is a financial safety net designed to protect you from unexpected events during domestic or international trips. It covers medical emergencies, trip cancellations, lost luggage, flight delays, and other travel-related risks. By providing comprehensive protection, it ensures that your travel experience remains enjoyable and stress-free, even when unforeseen issues arise.
              </p>

              <h2 className="text-2xl font-bold text-[#222222]">Why is Travel Insurance Important?</h2>
              <p className="leading-relaxed">
                Travel plans can change in an instant due to medical emergencies, bad weather, or other unexpected incidents. Without insurance, these disruptions can lead to significant financial losses. Travel insurance helps cover such costs, offering financial support and peace of mind. It's particularly essential for international travel, where medical expenses can be extremely high.
              </p>

              <h2 className="text-2xl font-bold text-[#222222]">Types of Travel Insurance</h2>
              <ul className="space-y-3 pl-2">
                <li className="flex items-start"><span className="mr-2 text-lg leading-none">•</span><span><strong>Single-Trip Insurance</strong> – Provides coverage for one journey, ideal for vacations or business trips.</span></li>
                <li className="flex items-start"><span className="mr-2 text-lg leading-none">•</span><span><strong>Multi-Trip Insurance</strong> – Designed for frequent travelers, offering coverage for multiple trips within a year.</span></li>
                <li className="flex items-start"><span className="mr-2 text-lg leading-none">•</span><span><strong>Student Travel Insurance</strong> – Protects students studying abroad against medical emergencies, baggage loss, and travel delays.</span></li>
                <li className="flex items-start"><span className="mr-2 text-lg leading-none">•</span><span><strong>Family Travel Insurance</strong> – Covers the entire family under a single plan, ensuring everyone is protected during the trip.</span></li>
              </ul>

              <h2 className="text-2xl font-bold text-[#222222]">Key Benefits of Travel Insurance</h2>
              <ul className="space-y-3 pl-2">
                <li className="flex items-start"><span className="mr-2 text-lg leading-none">•</span><span>Coverage for emergency medical expenses and hospitalizations abroad</span></li>
                <li className="flex items-start"><span className="mr-2 text-lg leading-none">•</span><span>Financial protection for trip cancellations, delays, or interruptions</span></li>
                <li className="flex items-start"><span className="mr-2 text-lg leading-none">•</span><span>Compensation for lost, stolen, or damaged luggage</span></li>
                <li className="flex items-start"><span className="mr-2 text-lg leading-none">•</span><span>24/7 travel assistance and support during emergencies</span></li>
                <li className="flex items-start"><span className="mr-2 text-lg leading-none">•</span><span>Peace of mind knowing unexpected events won't ruin your journey</span></li>
              </ul>

              <h2 className="text-2xl font-bold text-[#222222]">How to Choose the Right Travel Insurance Plan?</h2>
              <p className="leading-relaxed">
                Consider the nature of your trip, destination, duration, and personal needs. Look for policies that offer adequate medical coverage, a wide network of partner hospitals, and quick claim processing. Compare plans from reputable insurers for maximum benefits.
              </p>

              <h2 className="text-2xl font-bold text-[#222222]">Conclusion</h2>
              <p className="leading-relaxed">
                Travel insurance is more than just an optional add-on—it's an essential part of smart travel planning. By securing the right travel insurance, you protect yourself from unpredictable events and ensure that your journey remains memorable for all the right reasons.
              </p>
            </article>

            {/* --- Social Share Section --- */}
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

            {/* --- Navigation Buttons (Updated Previous & Next) --- */}
            <div className="mt-12 py-8 border-y border-gray-100 flex items-center justify-between">
              {/* Previous Button - Now points to Property Insurance */}
              <div 
                className="flex items-center gap-4 group cursor-pointer text-left" 
                onClick={() => navigate('/property-insurance')}
              >
                <div className="w-12 h-12 border border-gray-200 flex items-center justify-center text-gray-400 group-hover:bg-[#E8021E] group-hover:text-white transition-all duration-300">
                  <span className="text-xl">«</span>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Previous Post</p>
                  <p className="font-bold text-[#333] group-hover:text-[#E8021E] transition-colors">Property Insurance</p>
                </div>
              </div>

              {/* Next Button - Now points to Liability Insurance */}
              <div 
                className="flex items-center gap-4 group cursor-pointer text-right" 
                onClick={() => navigate('/liability-insurance')}
              >
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Next Post</p>
                  <p className="font-bold text-[#333] group-hover:text-[#E8021E] transition-colors">Liability Insurance</p>
                </div>
                <div className="w-12 h-12 border border-gray-200 flex items-center justify-center text-gray-400 group-hover:bg-[#E8021E] group-hover:text-white transition-all duration-300">
                  <span className="text-xl">»</span>
                </div>
              </div>
            </div>

            {/* --- Leave A Comment Section --- */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-[#222222] mb-8">Leave A Comment</h3>
              <form className="space-y-6">
                <div className="w-full">
                  <textarea 
                    placeholder="Comment" 
                    className="w-full p-4 bg-white border border-gray-200 rounded outline-none focus:border-[#4CAF50] h-48 transition-all"
                  ></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input 
                    type="text" 
                    placeholder="Name*" 
                    className="w-full p-4 bg-white border border-gray-200 rounded outline-none focus:border-[#4CAF50] transition-all"
                    required
                  />
                  <input 
                    type="email" 
                    placeholder="Email*" 
                    className="w-full p-4 bg-white border border-gray-200 rounded outline-none focus:border-[#4CAF50] transition-all"
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  className="bg-[#213591] text-white font-bold py-4 px-8 rounded hover:bg-[#213591] transition-colors uppercase text-sm tracking-wider"
                >
                  Post Comment
                </button>
              </form>
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
      </div>
      </div>
      <Footer />
    </>
  );
};

const SocialIcon = ({ icon, color }) => (
  <div className={`w-8 h-8 ${color} hover:opacity-90 rounded-full flex items-center justify-center text-white cursor-pointer transition-all`}>
    {icon}
  </div>
);

export default TravelIns;