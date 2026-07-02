import { ArrowRight, Phone, Shield, Users, FileCheck, Award, Clock, Headphones, ChevronRight, Star, TrendingUp, Wallet, BadgeCheck, Globe, Briefcase, Heart, Car, Bike, Umbrella, Home, Truck, Plane, Building } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const basePath = "/assets/";

// ========== TESTIMONIALS SECTION COMPONENT ==========
const TestimonialsSection = ({ testimonials }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

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
    <section className="py-20 bg-gradient-to-br from-white to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-sm font-semibold text-red-600 uppercase tracking-wide">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">
            What Our <span className="text-red-600">Customers Say</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="relative">
          <div className="grid md:grid-cols-3 gap-8">
            {visibleTestimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-l-red-600 transform hover:-translate-y-1"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-100 to-blue-100 flex items-center justify-center overflow-hidden">
                    {testimonial.image ? (
                      <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                    ) : (
                      <Users className="w-7 h-7 text-red-600" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>

          {testimonials.length > 3 && (
            <div className="flex justify-center gap-4 mt-10">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300"
              >
                ←
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300"
              >
                →
              </button>
            </div>
          )}

          <div className="flex justify-center gap-2 mt-6">
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
                className={`h-2 rounded-full transition-all duration-300 ${idx === activeIndex ? "w-8 bg-red-600" : "w-2 bg-gray-300"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const insuranceTypes = [
  { title: "Life", image: basePath + "li-1.png", icon: Heart },
  { title: "Car", image: basePath + "car.png", icon: Car },
  { title: "Bike", image: basePath + "red-scooter-1.png", icon: Bike },
  { title: "Health", image: basePath + "health.png", icon: Shield },
];

const quoteItems = [
  { title: "Bike Insurance", image: basePath + "red-scooter-1.png", path: "/motor-insurance", tag: "Starting at ₹538" },
  {
    title: "Car Insurance",
    image: basePath + "car.png",
    path: "/motor-insurance",
    tag: [
      "Zero Dep. Available",
      "Starting at ₹2094"
    ]
  },
  { title: "Health Insurance", image: basePath + "health.png", path: "/health-insurance", tag: "Cover up to 1Cr" },
  { title: "Term Life", image: basePath + "term.png", path: "/health-insurance", tag: "Tax Benefits" },
  { title: "Investment", image: basePath + "investment.png", path: "/property-insurance", tag: "Wealth Growth" },
  { title: "Child Plan", image: basePath + "saving-child.png", path: "/liability-insurance", tag: "Secure Future" },
  { title: "Retirement", image: basePath + "pension.png", path: "/property-insurance", tag: "Peaceful Life" },
];

const stats = [
  { number: "3 Lakh+", label: "TRAINED ADVISORS", icon: Users },
  { number: "50 Lakh+", label: "HAPPY CUSTOMERS", icon: Award },
  { number: "45+", label: "INSURANCE PARTNERS", icon: Shield },
  { number: "1 Crore+", label: "POLICIES SOLD", icon: FileCheck },
];

const testimonials = [
  {
    name: "Priya Nair",
    role: "Logistics Manager",
    image: "/assets/21.jpg",
    quote: "The team provided excellent guidance throughout the policy selection process. Very satisfied with the service!",
    rating: 5
  },
  {
    name: "Arjun Verma",
    role: "Entrepreneur",
    image: "/assets/24.jpg",
    quote: "Quick and hassle-free claim settlement. Truly reliable insurance partner for my business.",
    rating: 5
  },
  {
    name: "Shreya Mehta",
    role: "Teacher",
    image: "/assets/31.jpg",
    quote: "Best health policy suggestions with transparent process. Highly recommended for everyone.",
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

const steps = [
  {
    title: "Understand Your Needs",
    cta: "Talk to Expert",
    path: "/contact",
    description: "We listen to your goals and recommend the right protection for your family, business, or vehicle.",
    icon: FileCheck
  },
  {
    title: "Compare the Best Options",
    cta: "Get Quotes",
    path: "/contact",
    description: "Our team compares trusted plans so you get strong coverage, better value, and smarter choices.",
    icon: TrendingUp
  },
  {
    title: "Stay Protected, Always",
    cta: "Claim Support",
    path: "/contact",
    description: "From policy purchase to claim help, Griva Insurance Solutions stays with you at every step.",
    icon: Headphones
  },
];

const productImages = [
  "Untitled-design-29.png", "Untitled-design-37.png", "Untitled-design-38.png",
  "Untitled-design-28.png", "Untitled-design-36.png", "Untitled-design-30.png",
  "Untitled-design-35.png", "Untitled-design-31.png", "Untitled-design-32.png",
  "Untitled-design-33.png", "Untitled-design-34.png",
];

const productsRaw = [
  {
    title: "Health Insurance",
    description: "Comprehensive medical coverage designed to protect you and your family from unexpected healthcare expenses. Enjoy cashless hospitalization, pre and post-hospitalization expenses, daycare procedures, and annual health check-ups with our extensive network of partner hospitals across the country.",
    path: "/health-insurance",
    tag: "Personal Accident",
  },
  {
    title: "Motor Insurance",
    description: "Protect your prized vehicle with our zero depreciation motor insurance policy. Get comprehensive coverage against accidents, theft, natural calamities, and third-party liabilities. Enjoy hassle-free claims, instant policy issuance, and add-on covers like engine protection and consumables coverage.",
    path: "/motor-insurance",
    tag: "Non Motor Insurance",
  },
  {
    title: "Liability Insurance",
    description: "Essential legal liability protection for businesses against third-party claims arising from bodily injury, property damage, or personal injury. Safeguard your organization from costly lawsuits, court expenses, and compensation payouts with customizable coverage limits and global protection.",
    path: "/liability-insurance",
    tag: "Non Motor Insurance",
  },
  {
    title: "Travel Insurance",
    description: "Comprehensive international and domestic trip coverage ensuring peace of mind during your journeys. Get protection against trip cancellations, medical emergencies, lost baggage, flight delays, and personal accidents. Enjoy 24/7 global assistance and emergency cash transfer services worldwide.",
    path: "/travel-insurance",
    tag: "Personal Accident",
  },
  {
    title: "Property Insurance",
    description: "Secure your home and commercial properties against unforeseen damages like fire, theft, natural disasters, and structural damages. Our policy covers building structures, interior contents, and valuable assets with flexible sum insured options and easy claim settlement process.",
    path: "/property-insurance",
    tag: "Non Motor Insurance",
  },
  {
    title: "Fire Insurance",
    description: "Comprehensive protection against fire, lightning, and allied perils causing damage to your property and assets. Coverage includes building structures, machinery, stock, and contents with add-on covers for earthquakes, floods, and riots. Enjoy competitive premiums and quick claim settlements.",
    path: "/contact",
    tag: "Non Motor Insurance",
  },
  {
    title: "Warehouse Insurance",
    description: "Complete coverage for stored goods, inventory, and warehouse contents against fire, theft, natural disasters, and accidental damages. Protect your business from financial losses due to stock damage with flexible policy terms, specialized risk assessment, and efficient claims processing.",
    path: "/contact",
    tag: "Non Motor Insurance",
  },
  {
    title: "Transit Insurance",
    description: "Reliable goods-in-transit protection ensuring your shipments are covered during road, rail, sea, or air transportation. Safeguard against theft, damage, accidents, and natural calamities during the entire journey with competitive rates and comprehensive global coverage options.",
    path: "/contact",
    tag: "Non Motor Insurance",
  },
  {
    title: "Commercial Vehicle",
    description: "Comprehensive motor insurance tailored for business fleets, trucks, buses, and commercial cargo vehicles. Get extensive coverage against accidents, theft, third-party liabilities, and driver protection. Enjoy fleet discounts, online management tools, and nationwide cashless repair networks.",
    path: "/contact",
    tag: "Non Motor Insurance",
  },
  {
    title: "Life Insurance",
    description: "Secure your family's financial future with our comprehensive life insurance plans. Choose from term insurance, endowment policies, ULIPs, or retirement plans to build a robust financial safety net. Enjoy tax benefits, flexible premium payment options, and guaranteed financial protection for your loved ones.",
    path: "/contact",
    tag: "Life Insurance",
  },
];

const products = productsRaw.map((item, index) => ({
  ...item,
  image: basePath + productImages[index],
}));

const partners = [
  { file: "Untitled-design-11.png", name: "Reliance General" },
  { file: "Untitled-design-12.png", name: "HDFC ERGO" },
  { file: "Untitled-design-13.png", name: "ICICI Lombard" },
  { file: "Untitled-design-14.png", name: "Digit Insurance" },
  { file: "Untitled-design-15.png", name: "Shriram General" },
  { file: "Untitled-design-16.png", name: "SBI General" },
  { file: "Untitled-design-17.png", name: "Royal Insurance" },
  { file: "Untitled-design-18.png", name: "National Insurance" },
  { file: "Untitled-design-19.png", name: "Oriental" },
  { file: "Untitled-design-20.png", name: "New India Assurance" },
  { file: "Untitled-design-26.png", name: "United India" },
  { file: "Untitled-design-22.png", name: "IFFCO Tokio" },
  { file: "Untitled-design-25.png", name: "Bajaj Allianz" },
  { file: "Untitled-design-24.png", name: "Magma HDI" },
  { file: "CholaMs.jpeg" },
  { file: "TataAig.jpeg" },
  { file: "IndusInd.jpeg" }
];

const blogCards = [
  {
    image: "https://navlakhainsurance.in/wp-content/uploads/2025/07/127981.jpg",
    title: "Property Insurance: Protecting Your Valuable Assets",
    path: "/property-insurance",
    date: "26 Jul, 2025",
    category: "Property"
  },
  {
    image: "https://navlakhainsurance.in/wp-content/uploads/2025/07/125089.jpg",
    title: "Travel Insurance: Your Trusted Companion",
    path: "/travel-insurance",
    date: "20 Jul, 2025",
    category: "Travel"
  },
  {
    image: "https://navlakhainsurance.in/wp-content/uploads/2025/07/134016.jpg",
    title: "Liability Insurance: Protecting Your Business",
    path: "/liability-insurance",
    date: "15 Jul, 2025",
    category: "Business"
  },
];

const Index = () => {
  const [visibleSections, setVisibleSections] = useState({
    home: false, stats: false, steps: false, products: false, blog: false
  });

  const sectionRefs = {
    home: useRef(null),
    stats: useRef(null),
    steps: useRef(null),
    products: useRef(null),
    blog: useRef(null),
  };

  useEffect(() => {
    const observers = {};
    Object.keys(sectionRefs).forEach((key) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => ({ ...prev, [key]: true }));
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.1 }
      );
      if (sectionRefs[key].current) {
        observer.observe(sectionRefs[key].current);
        observers[key] = observer;
      }
    });
    return () => {
      Object.values(observers).forEach(observer => observer.disconnect());
    };
  }, []);

  const navigate = useNavigate();

  const filteredProducts = products;

  return (
    <main className="bg-white">
      {/* ========== HERO SECTION ========== */}
      <section
        ref={sectionRefs.home}
        className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-white via-red-50 to-blue-50"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-20 w-72 h-72 bg-red-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-200 rounded-full blur-3xl"></div>
        </div>

        <div className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 transition-all duration-1000 ${visibleSections.home ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600/10 to-blue-600/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <BadgeCheck className="w-4 h-4 text-red-600" />
                <span className="text-sm font-semibold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent uppercase tracking-wide">Trusted by 50 Lakh+ Customers</span>
              </div>

              <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-tight">
                <span className="bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">Secure Everything</span>
                <br />
                <span className="text-gray-800">Protect What</span>
                <br />
                <span className="text-gray-800">Matters.</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                Simple, digital-first general insurance. Compare quotes, save money, and buy in under{" "}
                <span className="text-red-600 font-bold">2 minutes.</span>
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate("/contact")}
                  className="group px-8 py-4 bg-gradient-to-r from-red-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
                >
                  Get Started <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </button>
                <a href="tel:9904401900">
                  <button className="px-8 py-4 border-2 border-gray-300 rounded-xl font-semibold hover:border-red-600 hover:bg-red-50 transition-all duration-300 flex items-center gap-2">
                    <Phone className="w-5 h-5 text-red-600" />
                    Call Advisor
                  </button>
                </a>
              </div>

              {/* Trust Badges */}

            </div>

            {/* Right - Insurance Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {quoteItems.slice(0, 6).map((item, idx) => (
                <Link
                  key={item.title}
                  to={item.path}
                  className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-red-600"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="h-14 w-14 bg-gradient-to-br from-red-50 to-blue-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition">
                      <img src={item.image} alt={item.title} className="h-8 w-8 object-contain" />
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      {Array.isArray(item.tag) ? (
                        item.tag.map((tag, tagIndex) => (
                          <span
                            key={`${item.title}-${tagIndex}`}
                            className="text-[10px] sm:text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full whitespace-nowrap"
                          >
                            {tag}
                          </span>
                        ))
                      ) : (
                        <span className="text-[10px] sm:text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full whitespace-nowrap">
                          {item.tag}
                        </span>
                      )}
                    </div>
                  </div>
                  <h3 className="mt-4 text-base font-bold text-gray-900 group-hover:text-red-600 transition">{item.title}</h3>
                  <div className="mt-4 flex items-center gap-1 text-red-600 text-sm font-semibold group-hover:gap-2 transition-all">
                    Get Quote <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== STATS SECTION ========== */}
      <section ref={sectionRefs.stats} className="py-20 bg-gradient-to-br from-white to-gray-50">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${visibleSections.stats ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-semibold text-red-600 uppercase tracking-wide">Our Achievements</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">
              Why Choose <span className="bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">Griva Insurance?</span>
            </h2>
            <p className="text-gray-600 mt-4">Industry-leading metrics that speak for themselves</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div key={stat.label} className="bg-white rounded-2xl p-8 text-center border-b-4 border-b-red-600 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-br from-red-50 to-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">{stat.number}</h3>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== STEPS SECTION ========== */}
      <section ref={sectionRefs.steps} className="py-20 bg-gradient-to-br from-red-50 via-white to-blue-50">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${visibleSections.steps ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-semibold text-red-600 uppercase tracking-wide">How Griva Insurance Solutions Works</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">
              Simple, transparent <span className="text-red-600">insurance support</span> for every need
            </h2>
            <p className="text-lg text-gray-600 mt-4">
              Griva Insurance Solutions makes insurance easy by understanding your requirement, comparing the best options, and guiding you with reliable support.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative group">
                <div className="absolute -top-3 -left-3 w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg z-10">
                  {i + 1}
                </div>
                <div className="bg-white rounded-3xl p-8 pt-12 shadow-lg hover:shadow-2xl transition-all duration-300 border border-red-100 hover:border-red-300">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-50 to-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <step.icon className="w-10 h-10 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 mb-6">{step.description}</p>
                  <Link
                    to={step.path}
                    className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-600 hover:text-white transition-all"
                  >
                    {step.cta} <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PRODUCTS SECTION ========== */}
      <section ref={sectionRefs.products} className="py-20 bg-gradient-to-br from-slate-50 via-white to-red-50">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${visibleSections.products ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center rounded-full bg-red-100 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
              Insurance Products
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4">
              Comprehensive <span className="text-red-600">Coverage</span> for Every Need
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Discover reliable insurance solutions tailored for your health, vehicle, travel, property, and business requirements.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.title}
                className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-600 to-blue-600" />
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-50 to-blue-50 transition duration-300 group-hover:scale-110">
                    <img src={product.image} alt={product.title} className="h-10 w-10 object-contain" />
                  </div>
                  
                </div>

                <h3 className="mt-5 text-xl font-bold text-gray-900 transition group-hover:text-red-600">
                  {product.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {product.description}
                </p>

                
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PARTNERS SECTION ========== */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center rounded-full bg-red-100 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
              Trusted Partners
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4">
              Our <span className="text-red-600">Insurance Partners</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              We work with some of the most trusted names in the insurance industry to bring you reliable protection and faster support.
            </p>
          </div>

          <div className="space-y-5">
            <div className="rounded-[2rem] border border-gray-200 bg-white/80 p-4 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.25)] backdrop-blur-sm">
              <Swiper
                modules={[Autoplay]}
                spaceBetween={18}
                loop={true}
                slidesPerView={2}
                autoplay={{
                  delay: 1800,
                  disableOnInteraction: false,
                  reverseDirection: true,
                }}
                breakpoints={{
                  640: { slidesPerView: 3 },
                  768: { slidesPerView: 4 },
                  1024: { slidesPerView: 6 },
                }}
              >
                {[...partners, ...partners].map((partner, idx) => (
                  <SwiperSlide key={`${partner.name}-${idx}`}>
                    <div className="flex h-24 items-center justify-center rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-lg md:h-28">
                      <img
                        src={basePath + partner.file}
                        alt={partner.name}
                        className="h-12 w-auto object-contain opacity-90 transition hover:opacity-100 md:h-14"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="rounded-[2rem] border border-gray-200 bg-white/80 p-4 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.25)] backdrop-blur-sm">
              <Swiper
                modules={[Autoplay]}
                spaceBetween={18}
                loop={true}
                slidesPerView={2}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  640: { slidesPerView: 3 },
                  768: { slidesPerView: 4 },
                  1024: { slidesPerView: 6 },
                }}
              >
                {[...partners, ...partners].map((partner, idx) => (
                  <SwiperSlide key={`${partner.name}-second-${idx}`}>
                    <div className="flex h-24 items-center justify-center rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-lg md:h-28">
                      <img
                        src={basePath + partner.file}
                        alt={partner.name}
                        className="h-12 w-auto object-contain opacity-90 transition hover:opacity-100 md:h-14"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>

      {/* ========== ADVISOR SECTION ========== */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-red-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-sm font-semibold text-blue-200 uppercase tracking-wide">Expert Guidance</span>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Get Free Advice From Our <span className="text-red-300">Certified Advisors</span>
              </h2>
              <p className="text-blue-100 text-lg">Our experts are here to help you find the perfect insurance plan tailored to your needs. Completely free consultation.</p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="px-8 py-4 bg-white text-blue-700 rounded-xl font-semibold hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2">
                  Talk to Advisor <ChevronRight className="w-5 h-5" />
                </Link>
                <button className="px-8 py-4 border-2 border-white/30 rounded-xl font-semibold hover:bg-white/10 transition flex items-center gap-2">
                  <Phone className="w-5 h-5" /> +91 9904401900
                </button>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {insuranceTypes.map((item) => (
                <div key={item.title} className="text-center group cursor-pointer">
                  <div className="h-20 w-20 mx-auto bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm group-hover:bg-white/20 transition-all group-hover:-translate-y-1">
                    <img src={item.image} alt={item.title} className="h-10 w-10 object-contain brightness-0 invert" />
                  </div>
                  <p className="mt-2 text-sm font-semibold text-red-100">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS SECTION ========== */}
      <TestimonialsSection testimonials={testimonials} />

      {/* ========== BLOG SECTION ========== */}
      <section ref={sectionRefs.blog} className="py-20 bg-gray-50">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${visibleSections.blog ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-sm font-semibold text-red-600 uppercase tracking-wide">Knowledge Hub</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">
              Latest <span className="text-red-600">Insurance Insights</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogCards.map((blog, idx) => (
              <article key={idx} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
                <div className="relative overflow-hidden h-56">
                  <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {blog.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Clock className="w-4 h-4" />
                    <span>{blog.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition line-clamp-2">
                    <Link to={blog.path}>{blog.title}</Link>
                  </h3>
                  <Link to={blog.path} className="inline-flex items-center gap-2 text-red-600 font-semibold group-hover:gap-3 transition-all">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;