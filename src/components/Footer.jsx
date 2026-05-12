import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#f8f9fa] pt-0">
      
      {/* TOP BANNER */}
      <div className="bg-[#e9f2ff] py-12 px-6 md:px-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-4 max-w-2xl text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-[#213591] leading-tight">
              Join India’s <span className="text-[#E8021E]">Largest Advisor Network</span>
            </h2>
            <Link to="/quote">
              <button className="bg-[#213591] text-white px-8 py-3 rounded-md font-semibold hover:bg-opacity-90 transition shadow-lg">
                Request a Callback
              </button>
            </Link>
          </div>

          <div className="hidden md:block">
            <img 
              src="/assets/footer.png"
              alt="Advisor illustration" 
              className="w-64 h-auto" 
            />
          </div>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto py-16 px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* LOGO */}
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-8 border-[#E8021E]">
          <img src="/assets/logo.png" alt="Logo" className="h-16 mb-6" />
          <p className="text-[#003366] text-[15px] leading-relaxed font-medium mb-6">
            At GIVA INSURANCE SERVICES, we believe in safeguarding what matters most to you — your health, your life, and your valuable assets.
          </p>

          <h4 className="font-bold text-[#003366] mb-4">Follow up</h4>
          <div className="flex gap-4">
            <a href="https://www.facebook.com/share/1EDh2pvbff/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="cursor-pointer hover:text-[#E8021E]" />
            </a>

            <a href="https://www.instagram.com/solutiongrivainsurance" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="cursor-pointer hover:text-[#E8021E]" />
            </a>
          </div>
        </div>

        {/* EXPLORE */}
        <div>
          <h3 className="text-[#003366] font-bold text-xl mb-6">Explore</h3>
          <ul className="space-y-4 text-gray-700">
            <li className="border-b pb-2 hover:text-[#E8021E]">
              <Link to="/about">About Us</Link>
            </li>
            <li className="border-b pb-2 hover:text-[#E8021E]">
              <Link to="/gallery">Photo Gallery</Link>
            </li>
            <li className="border-b pb-2 hover:text-[#E8021E]">
              <Link to="/blog">Blog</Link>
            </li>
            <li className="border-b pb-2 hover:text-[#E8021E]">
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* PRODUCTS */}
        <div>
          <h3 className="text-[#003366] font-bold text-xl mb-6">Products</h3>
          <ul className="space-y-4 text-gray-700">
            <li className="border-b pb-2 hover:text-[#E8021E]">
              <Link to="/health-insurance">Health Insurance</Link>
            </li>
            <li className="border-b pb-2 hover:text-[#E8021E]">
              <Link to="/motor-insurance">Motor Insurance</Link>
            </li>
            <li className="border-b pb-2 hover:text-[#E8021E]">
              <Link to="/liability-insurance">Liability Insurance</Link>
            </li>
            <li className="border-b pb-2 hover:text-[#E8021E]">
              <Link to="/travel-insurance">Travel Insurance</Link>
            </li>
            <li className="border-b pb-2 hover:text-[#E8021E]">
              <Link to="/property-insurance">Property Insurance</Link>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-[#003366] font-bold text-xl mb-6">Contact Info</h3>
          <div className="space-y-6 text-[#003366]">

            <div>
              <p className="font-bold">Head office :-</p>
              <p className="text-sm mt-1">
                1st floor, Avadhpuri Shopping Center, nr. Vishwas City 1, Ghatlodiya, Ahmedabad, Gujarat 380061
              </p>
            </div>
            
            <div className="text-sm border-t pt-4">
              <p><span className="font-bold">Email :-</span> grivafin@gmail.com</p>
            </div>

            <div className="text-sm border-t pt-4">
              <p className="font-bold">Phone:</p>
              <p>+91 9904401900</p>
              <p>+91 9737067941</p>
              <p>+91 9099333601</p>
            </div>

          </div> 
        </div>

      </div>
    </footer>
  );
};

export default Footer;
