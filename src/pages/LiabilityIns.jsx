import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { 
  FaFacebookF, FaTwitter, FaPinterestP, FaLinkedinIn, 
  FaUser, FaCalendarAlt, FaSearch, FaArrowLeft 
} from 'react-icons/fa';

const LiabilityIns = () => {
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
      title: "Travel Insurance Protecting You from", 
      date: "26 July, 2025", 
      img: "https://navlakhainsurance.in/wp-content/uploads/2025/07/125089-150x150.jpg",
      path: "/travel-insurance" 
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

    {/* EXTRA TOP GLOW */}
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
                src="https://navlakhainsurance.in/wp-content/uploads/2025/07/134016.jpg" 
                alt="Liability Insurance" 
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
              <h1 className="text-3xl font-bold text-[#222222] tracking-tight">What is Liability Insurance?</h1>
              <p className="leading-relaxed">
                Liability insurance is a policy designed to protect individuals and businesses from the financial burden of legal claims. It covers compensation for damages, bodily injuries, or property losses for which you or your business may be held legally responsible. Whether it's a workplace accident, property damage, or a customer injury, liability insurance ensures that one incident doesn't jeopardize your financial stability.
              </p>

              <h2 className="text-2xl font-bold text-[#222222]">Why is Liability Insurance Important?</h2>
              <p className="leading-relaxed">
                In today's environment, even a small mistake can lead to lawsuits and significant financial losses. Without liability coverage, you may have to pay for legal defense, settlements, or damages out of your pocket. For businesses, this could mean closing down operations; for individuals, it can wipe out years of savings. Liability insurance safeguards your assets and provides peace of mind, knowing that you're covered against unexpected claims.
              </p>

              <h2 className="text-2xl font-bold text-[#222222]">Types of Liability Insurance</h2>
              <ul className="space-y-3 pl-2">
                <li className="flex items-start"><span className="mr-2 text-lg leading-none">•</span><span><strong>General Liability Insurance</strong> – Covers bodily injuries, property damages, and legal costs faced by businesses.</span></li>
                <li className="flex items-start"><span className="mr-2 text-lg leading-none">•</span><span><strong>Professional Liability Insurance</strong> – Protects professionals like doctors, lawyers, and consultants against errors, omissions, or negligence.</span></li>
                <li className="flex items-start"><span className="mr-2 text-lg leading-none">•</span><span><strong>Product Liability Insurance</strong> – Covers damages caused by defective products sold by a business.</span></li>
                <li className="flex items-start"><span className="mr-2 text-lg leading-none">•</span><span><strong>Employer's Liability Insurance</strong> – Protects employers from claims made by employees for work-related injuries.</span></li>
              </ul>

              <h2 className="text-2xl font-bold text-[#222222]">Key Benefits of Liability Insurance</h2>
              <ul className="space-y-3 pl-2">
                <li className="flex items-start"><span className="mr-2 text-lg leading-none">•</span><span>Financial protection from lawsuits, settlements, and legal fees</span></li>
                <li className="flex items-start"><span className="mr-2 text-lg leading-none">•</span><span>Coverage for accidental damages, bodily injuries, or property losses</span></li>
                <li className="flex items-start"><span className="mr-2 text-lg leading-none">•</span><span>Builds credibility and trust with clients and partners</span></li>
                <li className="flex items-start"><span className="mr-2 text-lg leading-none">•</span><span>Enables businesses to focus on operations without constant worry of claims</span></li>
                <li className="flex items-start"><span className="mr-2 text-lg leading-none">•</span><span>Essential for complying with regulations in many industries</span></li>
              </ul>

              <h2 className="text-2xl font-bold text-[#222222]">How to Choose the Right Liability Coverage?</h2>
              <p className="leading-relaxed">
                When selecting liability insurance, consider the nature of your business or profession, potential risks, and coverage limits. Work with an insurance advisor to customize a policy that fits your needs. Check the insurer's claim settlement ratio and exclusions in the policy document.
              </p>

              <h2 className="text-2xl font-bold text-[#222222]">Conclusion</h2>
              <p className="leading-relaxed">
                Liability insurance acts as a shield against unforeseen financial and legal troubles. It ensures that one accident or claim doesn't derail your finances or your business. Investing in liability insurance today secures your tomorrow by protecting what matters most—your assets, your reputation, and your peace of mind.
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

            {/* --- Navigation Buttons --- */}
            <div className="mt-12 py-8 border-y border-gray-100 flex items-center justify-between">
              {/* Previous Post: Travel Insurance */}
              <div 
                className="flex items-center gap-4 group cursor-pointer text-left" 
                onClick={() => navigate('/travel-insurance')}
              >
                <div className="w-12 h-12 border border-gray-200 flex items-center justify-center text-gray-400 group-hover:bg-[#E8021E] group-hover:text-white transition-all duration-300">
                  <span className="text-xl">«</span>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Previous Post</p>
                  <p className="font-bold text-[#333] group-hover:text-[#E8021E] transition-colors">Travel Insurance</p>
                </div>
              </div>

              {/* Next Post: Motor Insurance */}
              <div 
                className="flex items-center gap-4 group cursor-pointer text-right" 
                onClick={() => navigate('/motor-insurance')}
              >
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Next Post</p>
                  <p className="font-bold text-[#333] group-hover:text-[#E8021E] transition-colors">Motor Insurance</p>
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
                    className="w-full p-4 bg-white border border-gray-200 rounded outline-none focus:border-[#E8021E] h-48 transition-all"
                  ></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input 
                    type="text" 
                    placeholder="Name*" 
                    className="w-full p-4 bg-white border border-gray-200 rounded outline-none focus:border-[#E8021E] transition-all"
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

export default LiabilityIns;