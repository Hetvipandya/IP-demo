import React from "react";
import { Phone, Mail, Shield, Target, Award, Users, CheckCircle, ChevronRight, Star, Heart, MapPin, Clock, Building, Truck, Globe, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "./Footer"

// ========== TESTIMONIALS SECTION COMPONENT ==========
const TestimonialsSection = ({ testimonials }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(false);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const visibleTestimonials = testimonials.slice(activeIndex, activeIndex + 3);
  if (visibleTestimonials.length < 3) {
    visibleTestimonials.push(...testimonials.slice(0, 3 - visibleTestimonials.length));
  }

  return (
    <section className="py-16 bg-gradient-to-br from-white to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-sm font-semibold text-red-600 uppercase tracking-wide">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
            What Our <span className="text-red-600">Customers Say</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-red-600 to-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="relative">
          <div className="grid md:grid-cols-3 gap-6">
            {visibleTestimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-l-red-600"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-100 to-blue-100 flex items-center justify-center overflow-hidden">
                    {testimonial.image ? (
                      <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                    ) : (
                      <Users className="w-6 h-6 text-red-600" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>

          {testimonials.length > 3 && (
            <div className="flex justify-center gap-3 mt-8">
              <button
                onClick={prevSlide}
                className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300"
              >
                ←
              </button>
              <button
                onClick={nextSlide}
                className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300"
              >
                →
              </button>
            </div>
          )}

          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setActiveIndex(idx);
                    setTimeout(() => setIsAnimating(false), 500);
                  }
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeIndex ? "w-6 bg-red-600" : "w-1.5 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


const testimonials = [
  {
    name: "Priya Nair",
    role: "Logistics Manager",
    image: "/assets/21.jpg",
    quote: "Warehouse insurance policy lene ka process simple aur transparent tha. Griva Insurance ne best plan recommend kiya.",
    rating: 5
  },
  {
    name: "Arjun Verma",
    role: "Entrepreneur",
    image: "/assets/24.jpg",
    quote: "Transit insurance ke liye quick aur hassle-free service mili. Truly reliable team!",
    rating: 5
  },
  {
    name: "Shreya Mehta",
    role: "Teacher",
    image: "/assets/31.jpg",
    quote: "Health insurance select karva ma bahu saras guidance mali. Smooth experience.",
    rating: 5
  },
  {
    name: "Rohan Patel",
    role: "Business Owner",
    image: "/assets/11.jpg",
    quote: "Commercial insurance was explained perfectly. Very fast claim processing experience.",
    rating: 5
  },
  {
    name: "Ananya Joshi",
    role: "HR Executive",
    image: "/assets/42.jpg",
    quote: "Very responsive customer support. Got proper guidance for health insurance selection.",
    rating: 5
  },
  {
    name: "Krina Shah",
    role: "Freelancer",
    image: "/assets/55.jpg",
    quote: "Affordable plans with clear explanations. Helped me choose the perfect policy.",
    rating: 5
  },
];

const About = () => {
  return (
    <div className="flex flex-col w-full bg-white">

      {/* ========== SECTION 1: HERO SECTION ========== */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-white via-red-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">

            {/* Left Side - Image */}
            <div className="order-2 lg:order-1">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img
                  src="https://media.licdn.com/dms/image/v2/D4D22AQEMyEAvt-vSuQ/feedshare-shrink_800/feedshare-shrink_800/0/1689514965135?e=2147483647&v=beta&t=9b9rSryE0zHjPctw_4CHJr-VHWu_OuRZEbGH1ROYN3I"
                  alt="Griva Insurance Team"
                  className="w-full h-[280px] md:h-[350px] object-cover"
                />
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="order-1 lg:order-2 space-y-4">
              <div className="inline-flex items-center gap-2 bg-red-100 px-3 py-1 rounded-full">
                <Shield className="w-4 h-4 text-red-600" />
                <span className="text-xs font-semibold text-red-600 uppercase tracking-wide">About Griva Insurance</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                <span className="text-gray-900">Griva</span>{" "}
                <span className="text-red-600">Insurance Services</span>
              </h1>
              
              <p className="text-lg font-semibold text-blue-700">
                Modern Problems Require Smart Insurance Solutions.
              </p>
              
              <div className="space-y-3 text-gray-600 text-sm md:text-base leading-relaxed">
                <p>
                  At <span className="font-bold text-red-600">Griva Insurance Services</span>, we blend traditional trust with modern technology. 
                  Founded by <span className="font-semibold text-blue-700">Miss Minaxi Navlakha</span>, we bring over a decade of expertise to 
                  help you navigate the complex world of risk management.
                </p>

                <p>
                  As seen in our focus on <span className="font-semibold text-blue-700">Generative AI and Innovation</span>, we stay ahead 
                  of the curve to provide the most efficient coverage.
                </p>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-red-500" /><span className="text-sm">Health & Motor</span></div>
                  <div className="flex items-center gap-2"><Globe className="w-4 h-4 text-red-500" /><span className="text-sm">Liability & Travel</span></div>
                  <div className="flex items-center gap-2"><Building className="w-4 h-4 text-red-500" /><span className="text-sm">Property & Fire</span></div>
                  <div className="flex items-center gap-2"><Truck className="w-4 h-4 text-red-500" /><span className="text-sm">Transit & Warehouse</span></div>
                </div>

                <p className="pt-2">
                  Our mission is to safeguard your digital and physical assets with <span className="font-semibold text-red-600">hassle-free claims</span> and 
                  <span className="font-semibold text-blue-700"> personalized guidance</span>.
                </p>
              </div>

              <div className="pt-2">
                <a
                  href="tel:+918320291588"
                  className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 text-sm"
                >
                  <Phone size={18} />
                  Connect with Griva Insurance
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 3: PARTNERS SECTION ========== */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold text-red-600 uppercase tracking-wide">Our Partners</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Our Valued <span className="text-red-600">Partners</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-red-600 to-blue-600 mx-auto mt-3 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-center max-w-3xl mx-auto">
            {/* Partner 1 */}
            <div className="text-center">
              <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-red-200 shadow-md">
                <img
                  src="/assets/Akash Jani.jpeg"
                  alt="Akash Jani"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = "https://via.placeholder.com/200?text=Akash+Jani"; }}
                />
              </div>
              <h3 className="mt-4 text-xl font-bold text-gray-900">Akash Jani</h3>
              <p className="text-gray-500 text-sm">Strategic Partner</p>
            </div>

            {/* Partner 2 */}
            <div className="text-center">
              <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-blue-200 shadow-md">
                <img
                  src="/assets/Dipen Shah.jpeg"
                  alt="Dipen Shah"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = "https://via.placeholder.com/200?text=Dipen+Shah"; }}
                />
              </div>
              <h3 className="mt-4 text-xl font-bold text-gray-900">Dipen Shah</h3>
              <p className="text-gray-500 text-sm">Strategic Partner</p>
            </div>
          </div>

          <div className="mt-10 text-center max-w-2xl mx-auto space-y-3">
            <p className="text-gray-600 text-sm leading-relaxed">
              Akash Jani and Dipen Shah are key partners contributing to the growth and success of Griva Insurance Services.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Together, they support a wide range of insurance solutions including Health, Life, Motor, and Commercial Insurance.
            </p>
          </div>
        </div>
      </section>



      {/* ========== SECTION 6: TESTIMONIALS ========== */}
      <TestimonialsSection testimonials={testimonials} />

      {/* ========== FOOTER ========== */}
      <Footer />
    </div>
  );
};

export default About;