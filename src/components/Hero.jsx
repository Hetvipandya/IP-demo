import { ArrowRight, CheckCircle2, Phone } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import TestimonialsSection from "./TestimonialsSection";
import { Link } from "react-router-dom";
import { useEffect, useRef,useState } from "react";
import { useNavigate } from "react-router-dom";

 

const basePath = "/assets/";

const insuranceTypes = [
    { title: "Life", image: basePath + "li-1.png" }, 
    { title: "Car", image: basePath + "car.png" },
    { title: "Bike", image: basePath + "red-scooter-1.png" }, 
    { title: "Health", image: basePath + "health.png" },
  ];

const quoteItems = [
  { 
    title: "Bike", 
    image: basePath + "red-scooter-1.png",
    path: "/motor-insurance"
  },
  { 
    title: "Car", 
    image: basePath + "car.png",
    path: "/motor-insurance" // or create separate route if needed
  },
  { 
    title: "Health", 
    image: basePath + "health.png",
    path: "/health-insurance"
  },
  { 
    title: "Term", 
    image: basePath + "term.png",
    path: "/health-insurance" // (you can create this later)
  },
  { 
    title: "Investment Tax Planning", 
    image: basePath + "investment.png",
    path: "/property-insurance"
  },
  { 
    title: "Saving For Child", 
    image: basePath + "saving-child.png",
    path: "/liability-insurance"
  },
  { 
    title: "Pension & Retirement", 
    image: basePath + "pension.png",
    path: "/property-insurance"
  },
];

/* helper to reuse quoteItems images */
const getImage = (title) =>
  quoteItems.find((item) => item.title === title)?.image;

const stats = [
  { number: "3 Lakh+", label: "TRAINED ADVISORS", image: basePath + "TRAINED-ADVISORS.png" },
  { number: "45 Lakh+", label: "HAPPY CUSTOMERS", image: basePath + "HAPPY-CUSTOMERS.png" },
  { number: "45+", label: "INSURANCE PARTNERS", image: basePath + "INSURANCE-PARTNERS.png" },
  { number: "1 Crore+", label: "POLICIES SOLD", image: basePath + "POLICIES-SOLD-1.png" },
];


const testimonials = [
  { 
    name: "Priya Nair", 
    role: "Logistics Manager", 
    image: "/assets/21.jpg", 
    quote: "Warehouse insurance policy lene ka process simple aur transparent tha. Navlakha Insurance ne best plan recommend kiya. Bahut satisfied hoon!" 
  },
  { 
    name: "Arjun Verma", 
    role: "Entrepreneur", 
    image: "/assets/24.jpg", 
    quote: "Transit insurance ke liye Navlakha Insurance par bharosa kiya aur unhone quick aur hassle-free service di. Truly reliable!" 
  },
  { 
    name: "Shreya Mehta", 
    role: "Teacher", 
    image: "/assets/31.jpg", 
    quote: "Navlakha Insurance ne mujhe best health policy suggest ki. Process simple tha aur team bahut hi helpful rahi. Highly recommended!" 
  },

  // 👉 New 3 testimonials added
  { 
    name: "Rohan Patel", 
    role: "Business Owner", 
    image: "/assets/11.jpg", 
    quote: "Navlakha Insurance team ne mujhe commercial insurance samajhva ma bahu help kari. Claim process pan bahu fast hato." 
  },
  { 
    name: "Ananya Joshi", 
    role: "HR Executive", 
    image: "/assets/42.jpg", 
    quote: "Customer support bahu responsive chhe. Health insurance select karva ma proper guidance mali. Very smooth experience." 
  },
  { 
    name: "Krina Shah", 
    role: "Freelancer", 
    image: "/assets/55.jpg", 
    quote: "Affordable plans ane clear explanation. Navlakha Insurance e perfect policy choose karva ma help kari. Totally satisfied!" 
  },
];

const steps = [
  { title: "Choosing Right Policy", cta: "Compare Quotes", image: basePath + "POLICIES-SOLD-2.png", path: "/contact" },
  { title: "Compare Quotes From 45+ Insurers", cta: "Connect With Our Experts", image: basePath + "POLICIES-SOLD-3.png", path: "/contact" },
  { title: "Hassle-free Claim Assistance", cta: "Enquire Now", image: basePath + "2150797566-Photoroom-1-1.png", path: "/contact" },
];
const productImages = [
  "Untitled-design-29.png",
  "Untitled-design-37.png",
  "Untitled-design-38.png",
  "Untitled-design-28.png",
  "Untitled-design-36.png",
  "Untitled-design-30.png",
  "Untitled-design-35.png",
  "Untitled-design-31.png",
  "Untitled-design-32.png",
  "Untitled-design-33.png",
  "Untitled-design-34.png",
]; 

const productsRaw = [
  { title: "Health Insurance", description: "Covers medical expenses, hospitalization, and emergencies, ensuring quality healthcare access for you and your family with complete financial protection.", path: "/health-insurance" },
  { title: "Motor Insurance", description: "Protects vehicles against accidents, theft, and damages, including third-party liabilities, ensuring worry-free driving and fast, reliable claims support.", path: "/motor-insurance" },
  { title: "Liability Insurance", description: "Provides coverage against legal claims for property damage or injuries, protecting individuals and businesses from unexpected financial liabilities and lawsuits.", path: "/liability-insurance" },
  { title: "Travel Insurance", description: "Covers medical emergencies, trip cancellations, lost luggage, and travel delays for worry-free journeys.", path: "/travel-insurance" },
  { title: "Property Insurance", description: "Secures homes, offices, and commercial properties against fire, theft, and natural disasters.", path: "/property-insurance" },
  { title: "Fire Insurance", description: "Protects property from fire, lightning, and explosion damage with financial support after incidents." }, 
  { title: "Warehouse Insurance", description: "Covers stored goods against fire, theft, and disasters, safeguarding inventory value." }, 
  { title: "Transit Insurance", description: "Protects goods in transit against theft, fire, and accidental damage during transportation." },
  { title: "Commercial Vehicle Insurance", description: "Protect your business vehicles with comprehensive coverage for smooth operations." },
  { title: "Transport Line Claim Specialist", description: "Expert claim specialists ensuring quick, hassle-free settlements for transport businesses." },
  { title: "Life Insurance", description: "Secure your family’s future with life insurance and financial protection in times of uncertainty." },  
];

const products = productsRaw.map((item, index) => ({
  title: item.title,
  description: item.description,
  image: basePath + productImages[index],
  path: item.path || "/contact", // fallback भी दे दिया 👍
}));

const partners = [
  { file: "Untitled-design-11.png", name: "Reliance general insurance" },
  { file: "Untitled-design-12.png", name: "HDFC ergo general insurance" },
  { file: "Untitled-design-13.png", name: "ICICI Lombard general insurance" },
  { file: "Untitled-design-14.png", name: "Digit insurance" },
  { file: "Untitled-design-15.png", name: "Shriram general insurance" },
  { file: "Untitled-design-16.png", name: "Sbi general insurance" },
  { file: "Untitled-design-17.png", name: "Royal insurance general insurance" },
  { file: "Untitled-design-18.png", name: "National insurance company" },
  { file: "Untitled-design-19.png", name: "Oriental" },
  { file: "Untitled-design-20.png", name: "New india assurance" },
  { file: "Untitled-design-26.png", name: "United India Insurance Company Limited" },
  { file: "Untitled-design-22.png", name: "IFFCO tokio insurance company" },
  { file: "Untitled-design-25.png", name: "Bajaj Allianz General Insurance" },
  { file: "Untitled-design-24.png", name: "Magma" },
];

const blogCards = [
  {
    image: "https://navlakhainsurance.in/wp-content/uploads/2025/07/127981.jpg",
    title: "Property Insurance Protecting Your Valuable Assets",
    path: "/property-insurance"
  },
  {
    image: "https://navlakhainsurance.in/wp-content/uploads/2025/07/125089.jpg",
    title: "Travel Insurance Your Trusted Companion",
    path: "/travel-insurance"
  },
  {
    image: "https://navlakhainsurance.in/wp-content/uploads/2025/07/134016.jpg",
    title: "Liability Insurance Protecting You",
    path: "/liability-insurance"
  },
];

const Index = () => {
  const createObserver = (setState) => {
    return new IntersectionObserver(
      ([entry], observer) => {
        if (entry.isIntersecting) {
          setState(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );
  };

  const [homeVisible, setHomeVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [stepsVisible, setStepsVisible] = useState(false);
  const [productsVisible, setProductsVisible] = useState(false);
  const [blogVisible, setBlogVisible] = useState(false);

  const homeRef = useRef(null);
  const statsRef = useRef(null);
  const stepsRef = useRef(null);
  const productsRef = useRef(null);
  const blogRef = useRef(null);

  useEffect(() => {
    const homeObs = createObserver(setHomeVisible);
    const statsObs = createObserver(setStatsVisible);
    const stepsObs = createObserver(setStepsVisible);
    const productsObs = createObserver(setProductsVisible);
    const blogObs = createObserver(setBlogVisible);

    if (homeRef.current) homeObs.observe(homeRef.current);
    if (statsRef.current) statsObs.observe(statsRef.current);
    if (stepsRef.current) stepsObs.observe(stepsRef.current);
    if (productsRef.current) productsObs.observe(productsRef.current);
    if (blogRef.current) blogObs.observe(blogRef.current);

    return () => {
      homeObs.disconnect();
      statsObs.disconnect();
      stepsObs.disconnect();
      productsObs.disconnect();
      blogObs.disconnect();
    };
  }, []);

  const navigate = useNavigate();

  return (
   
   <main className="bg-gradient-to-br from-slate-50 to-cyan-50 text-gray-900">
  {/* min-h-screen કાઢી નાખવાથી કન્ટેન્ટ મુજબ જ હાઈટ લેશે */}
      {/* HERO */}
     
  {/* pt-20 ને બદલે pt-5 અથવા pt-0 કરી જુઓ */}
<section
  ref={homeRef}
  id="home"
  className={`relative min-h-screen flex items-center overflow-hidden bg-white px-6 lg:px-12 transition-all duration-1000 ${
    homeVisible ? "animate-fade-up" : "opacity-0"
  }`}
>
  {/* BACKGROUND DECORATION */}
 {/* UNIQUE MODERN ARCHITECTURAL BACKGROUND */}
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

  {/* 6. Subtle Noise Texture Overlay (Optional for Premium Feel) */}
  <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
</div>

  <div className="relative z-10 mx-auto max-w-7xl w-full py-12">
    <div className="grid lg:grid-cols-12 gap-12 items-center">

      {/* LEFT CONTENT */}
      <div className="lg:col-span-5 space-y-8 text-center lg:text-left">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#213591]/5 px-4 py-1.5">
          <span className="text-[12px] font-black uppercase tracking-[0.2em] text-[#213591]">
            Smart Coverage
          </span>
        </div>

      <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-slate-900 lg:text-8xl leading-[1.1]">
  <span className="text-[#213591]">Secure</span> <br />
  <span className="text-[#E8021E]">Everything.</span>
</h1>
        <p className="text-lg sm:text-xl leading-relaxed text-slate-500 max-w-md mx-auto lg:mx-0">
          Simple, digital-first general insurance. Compare and buy in under{" "}
          <span className="text-[#213591] font-bold">2 minutes.</span>
        </p>

        <button
  onClick={() => navigate("/contact")}
  className="h-14 px-10 rounded-2xl bg-[#213591] text-white text-lg font-bold hover:bg-[#1a2b75] transition-all shadow-xl hover:shadow-[#213591]/20 active:scale-95"
>
  Get Started
</button>
      </div>

      {/* RIGHT GRID (CARDS) */}
      <div className="lg:col-span-7">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
          {quoteItems.slice(0, 6).map((item) => (
            <Link
              key={item.title}
              to={item.path}
              className="
                group 
                relative 
                aspect-square
                flex 
                flex-col 
                items-center
                justify-center
                p-4
                sm:p-8
                rounded-[2rem]
                bg-white 
                border border-slate-100 
                shadow-[0_8px_30px_rgb(0,0,0,0.04)]
                hover:shadow-[0_20px_50px_rgba(33,53,145,0.1)]
                hover:-translate-y-1
                transition-all 
                duration-500
              "
            >
              {/* ICON CONTAINER */}
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-3xl bg-slate-50 group-hover:bg-[#213591]/5 transition-colors duration-500">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-10 w-10 sm:h-12 sm:w-12 object-contain group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* TITLE */}
              <div className="mt-6 text-center">
                <h3 className="text-xs sm:text-sm font-black text-[#213591] uppercase tracking-tighter sm:tracking-widest leading-tight px-2">
                  {item.title}
                </h3>
              </div>

              {/* HOVER INDICATOR LINE */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 h-1.5 w-0 bg-[#E8021E] rounded-full group-hover:w-8 transition-all duration-500"></div>

              {/* TOP RIGHT ARROW ICON */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-4 transition-all duration-500">
                <svg className="w-5 h-5 text-[#E8021E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  </div>
</section>

      {/* STATS */}
 <section 
  ref={statsRef}
  className="relative mx-auto max-w-full py-20 bg-white overflow-hidden"
>
  
  {/* --- SAME ARCHITECTURAL BACKGROUND AS HOME --- */}
{/* UNIQUE MODERN ARCHITECTURAL BACKGROUND */}
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

  {/* 6. Subtle Noise Texture Overlay (Optional for Premium Feel) */}
  <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
</div>

 <div className={`relative z-10 mx-auto max-w-7xl px-5 lg:px-8 ${
  statsVisible ? "animate-fade-up" : "opacity-0"
}`}>
    {/* Heading */}
    <div className="space-y-2 text-center">
      <div className="inline-flex items-center gap-2 rounded-lg bg-[#213591]/5 px-3 py-1">
        <span className="text-[10px] font-black uppercase tracking-widest text-[#213591]">Our Excellence</span>
      </div>
     <h2 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
  <span className="text-[#213591]">Why </span>
  <span className="text-[#E8021E]">Griva Insurance?</span>
</h2>
      <div className="mx-auto mt-4 h-1 w-20 bg-[#E8021E] rounded-full"></div>
    </div>

    {/* Stats Grid */}
    <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <div 
          key={stat.label} 
          className="group relative flex flex-col items-center text-center p-8 rounded-[2.5rem] bg-white/40 backdrop-blur-sm border border-slate-100 shadow-sm transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:-translate-y-2"
        >
          {/* Double Circle Container with Hover Effect */}
          <div className="relative flex size-44 items-center justify-center transition-transform duration-500 group-hover:scale-110">
            <div className="absolute inset-0 rounded-full border border-[#213591] opacity-10 group-hover:opacity-20 transition-opacity"></div>
            
            <div className="flex size-[82%] items-center justify-center rounded-full border border-[#213591]/20 bg-slate-50/80 p-6 shadow-inner group-hover:bg-white transition-colors">
              <img 
                src={stat.image} 
                alt={stat.label} 
                className="h-full w-full object-contain animate-float will-change-transform" 
                style={{ animationDelay: `${index * 0.5}s` }} 
                loading="lazy" 
              />
            </div>
          </div>

          {/* Stats Number */}
          <div className="mt-8 space-y-1">
            <h3 className="text-4xl font-black tracking-tight text-[#213591]">
              {stat.number}
            </h3>
            {/* Stats Label */}
            <p className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">
              {stat.label}
            </p>
          </div>

          {/* Decorative Bottom Bar */}
          <div className="absolute bottom-6 h-1 w-0 bg-[#E8021E] transition-all duration-500 group-hover:w-12 rounded-full"></div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* STEPS */}
    <section 
      ref={stepsRef}
      className="relative mx-auto max-w-full py-24 bg-white overflow-hidden"
    >
      {/* --- SAME ARCHITECTURAL BACKGROUND --- */}
     {/* UNIQUE MODERN ARCHITECTURAL BACKGROUND */}
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

  {/* 6. Subtle Noise Texture Overlay (Optional for Premium Feel) */}
  <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
</div>

     <div className={`relative z-10 mx-auto max-w-7xl px-5 lg:px-8 ${
  stepsVisible ? "animate-fade-up" : "opacity-0"
}`}>
        
        {/* Section Heading */}
        <div className="mb-20 text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-lg bg-[#213591]/5 px-3 py-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#213591]">The Journey</span>
          </div>
          <h2 className="text-4xl font-black tracking-tight md:text-5xl">
            <span className="text-[#E8021E]">Griva Insurance </span>
            <span className="text-[#213591]">With You On Every Step</span>
          </h2>
          <div className="mx-auto h-1 w-24 bg-[#E8021E] rounded-full"></div>
        </div>

        {/* Stepper Line - visible on desktop */}
        <div className="relative mb-16 hidden lg:block">
          <div className="absolute left-0 top-1/2 h-[1px] w-full -translate-y-1/2 border-t-2 border-dotted border-slate-200"></div>
          <div className="relative flex justify-around">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex size-12 items-center justify-center rounded-full border-2 border-white bg-[#213591] text-white text-base font-bold shadow-xl ring-8 ring-slate-50">
                {num}
              </div>
            ))}
          </div>
        </div>

        {/* Steps Grid */}
       {/* Steps Grid - 'lg:grid-cols-3' confirm karo ane gap thodo ochho karo jethi space mali rahe */}
<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
  {steps.map((step, i) => (
    <div 
      key={i} 
      className="group flex flex-col items-center text-center"
    >
      {/* Step Title */}
      <h3 className="text-xl font-black text-[#213591] group-hover:text-[#E8021E] transition-colors duration-300">
        {step.title}
      </h3>

      {/* Image Container - Width thodi ghataadi (h-64 w-64) jethi 3 line ma fit thai shake */}
      <div className="relative mt-6 flex h-64 w-64 items-end justify-center transition-transform duration-500 group-hover:scale-105">
        <div className="absolute bottom-4 size-44 rounded-full bg-slate-50 border border-slate-100 shadow-inner group-hover:bg-[#213591]/5 transition-colors duration-500"></div>
        
        <img 
          src={step.image} 
          alt={step.title} 
          className="relative z-10 h-full w-full object-contain animate-float"
          style={{ animationDelay: `${i * 0.4}s` }}
        />
      </div>

      {/* Description */}
      <p className="mt-6 min-h-[3rem] px-4 text-base font-bold text-slate-600 leading-snug">
        {step.description}
      </p>

      {/* Button */}
      <Link 
        to={step.path}
        className="group/btn relative mt-6 flex items-center gap-3 overflow-hidden rounded-xl bg-[#213591] px-8 py-3 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-[#1a2b75] shadow-md active:scale-95"
      >
        <div className="absolute left-0 top-0 h-full w-1 bg-[#E8021E]"></div>
        <span>{step.cta}</span>
        <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </Link>
    </div>
  ))}
</div>
      </div>
    </section>

     {/* partners */}
<section className="relative mx-auto max-w-full py-24 bg-white overflow-hidden">
  
  {/* --- BACKGROUND SHAPES (Products sathe match karva mate) --- */}
 {/* UNIQUE MODERN ARCHITECTURAL BACKGROUND */}
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

  {/* 6. Subtle Noise Texture Overlay (Optional for Premium Feel) */}
  <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
</div>

  <div className="relative z-10 mx-auto max-w-7xl px-5">
    
    {/* Section Heading (Matching Product Style) */}
    <div className="mb-16 text-center space-y-4">
      <div className="inline-flex items-center gap-2 rounded-lg bg-[#213591]/5 px-3 py-1">
        <span className="text-[10px] font-black uppercase tracking-widest text-[#213591]">Collaboration</span>
      </div>
      <h2 className="text-4xl font-black tracking-tight md:text-5xl">
        <span className="text-[#213591]">Our </span>
        <span className="text-[#E8021E]">Trusted Partners</span>
      </h2>
      <div className="mx-auto h-1 w-24 bg-[#E8021E] rounded-full"></div>
    </div>

    {/* Partners Grid (Clean & Structured) */}
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 border-l border-t border-slate-200 shadow-2xl shadow-slate-200/50">
      {partners.map((partner, index) => (
        <div 
          key={index} 
          className="group border-r border-b border-slate-200 bg-white p-6 transition-all duration-500 hover:bg-slate-50/50 flex flex-col items-center justify-center min-h-[160px]"
        >
          {/* Logo with Hover Effect */}
          <div className="relative flex h-24 w-full items-center justify-center">
            <img
              src={basePath + partner.file}
              alt={partner.name}
                className="max-h-full max-w-full object-contain transition-all duration-500 group-hover:scale-110"
              loading="lazy"
            />
          </div>

          {/* Partner Name */}
          <div className="mt-4 text-center">
            <p className="text-[11px] font-black uppercase tracking-tighter text-[#213591] opacity-70 group-hover:opacity-100 transition-opacity duration-300">
              {partner.name}
            </p>
            {/* Small line indicator on hover */}
            <div className="mx-auto mt-1 h-0.5 w-0 bg-[#E8021E] transition-all duration-300 group-hover:w-8"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


 <section id="contact" className="relative mx-auto max-w-full py-24 bg-white overflow-hidden">
  
  {/* --- BACKGROUND SHAPES (Consistency mate) --- */}
  {/* UNIQUE MODERN ARCHITECTURAL BACKGROUND */}
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

  {/* 6. Subtle Noise Texture Overlay (Optional for Premium Feel) */}
  <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
</div>

  <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
    <div className="grid items-center gap-12 lg:grid-cols-12">
      
      {/* Left Side: Heading (Col-span 5) */}
      <div className="lg:col-span-5 text-left space-y-6">
        <div className="inline-flex items-center gap-2 rounded-lg bg-[#E8021E]/5 px-3 py-1">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#E8021E]">Expert Guidance</span>
        </div>
        <h2 className="text-4xl lg:text-6xl font-black leading-[1.1] tracking-tight">
          <span className="text-[#213591]">Get Free Advice</span> <br />
          <span className="text-[#213591]">From Our</span> <br />
          <span className="text-[#E8021E]">Certified Advisors</span>
        </h2>
        <div className="h-1.5 w-20 bg-[#E8021E] rounded-full"></div>
      </div>

      {/* Center: Character Image (Col-span 3) */}
      <div className="lg:col-span-3 relative flex justify-center">
        {/* Glow effect behind advisor */}
        <div className="absolute inset-0 bg-[#213591]/10 blur-3xl rounded-full scale-75"></div>
        <img 
          src="/assets/advisor.png" 
          alt="Certified insurance advisor" 
          className="relative z-10 h-80 lg:h-[450px] w-auto object-contain drop-shadow-2xl" 
          loading="lazy" 
        />
      </div>

      {/* Right Side: Selection Card (Col-span 4) */}
      <div className="lg:col-span-4 rounded-[2.5rem] bg-white p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-slate-50 relative overflow-hidden">
        {/* Subtle inner decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -z-10 opacity-50"></div>
        
        <p className="mb-8 text-center font-bold text-slate-400 uppercase tracking-widest text-xs">Select Category</p>
        
       <div className="grid grid-cols-4 gap-6 mb-10 justify-items-center">
  {insuranceTypes.map((item) => (
    <div key={item.title} className="group flex flex-col items-center">
      
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-slate-100 bg-slate-50/50 p-4 transition-all duration-300 group-hover:bg-white group-hover:border-[#E8021E]/30 group-hover:shadow-lg group-hover:-translate-y-1">
        <img 
          src={item.image} 
          alt={item.title} 
          className="h-full w-full object-contain transition-transform group-hover:scale-110" 
          loading="lazy" 
        />
      </div>

      <p className="mt-3 text-[11px] font-black uppercase tracking-wider text-[#213591] transition-colors group-hover:text-[#E8021E] text-center">
        {item.title}
      </p>

    </div>
  ))}
</div>

        <div className="flex justify-center">
          <Link 
            to="/contact"
            className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-[#213591] px-6 py-5 text-lg font-bold text-white transition-all hover:bg-[#1a2b75] active:scale-95 shadow-xl shadow-[#213591]/20"
          >
            <span className="relative z-10">Talk to an Advisor</span>
            <svg className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>

    </div>
  </div>
</section>

      <TestimonialsSection testimonials={testimonials} />

      {/* BLOG*/}
     
 <section ref={blogRef} className="relative mx-auto max-w-full py-24 bg-white overflow-hidden">
  
  {/* --- BACKGROUND SHAPES (Consistency mate) --- */}
  {/* UNIQUE MODERN ARCHITECTURAL BACKGROUND */}
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

  {/* 6. Subtle Noise Texture Overlay (Optional for Premium Feel) */}
  <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
</div>

  <div className="relative z-10 mx-auto max-w-7xl px-5">

    {/* Section Heading (Matching Product Style) */}
    <div className="mb-16 text-center space-y-4">
      <div className="inline-flex items-center gap-2 rounded-lg bg-[#213591]/5 px-3 py-1">
        <span className="text-[10px] font-black uppercase tracking-widest text-[#213591]">Knowledge Hub</span>
      </div>
      <h2 className="text-4xl font-black tracking-tight md:text-5xl">
        <span className="text-[#213591]">Insurance </span>
        <span className="text-[#E8021E]">Blogs</span>
      </h2>
      <div className="mx-auto h-1 w-24 bg-[#E8021E] rounded-full"></div>
    </div>

    {/* GRID Layout (Matching Product Grid style) */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-t border-slate-200 shadow-2xl shadow-slate-200/50">
      {blogCards.map((blog, i) => (
        <article
          key={i}
          className="group border-r border-b border-slate-200 bg-white transition-all duration-500 hover:bg-slate-50/50"
        >
          {/* Image with Hover Zoom (Same as Product) */}
          <div className="overflow-hidden h-64">
            <img
              src={blog.image}
              alt={blog.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
          </div>

          <div className="p-8">
            {/* Date Badge */}
            <div className="mb-4 inline-block rounded-md bg-[#E8021E]/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#E8021E]">
              26 Jul, 2025
            </div>

            <h3 className="text-2xl font-black text-[#213591] leading-tight transition-colors duration-300 group-hover:text-[#E8021E]">
              {blog.title}
            </h3>

            <p className="mt-4 text-sm text-slate-500 font-medium leading-relaxed line-clamp-2">
              Stay updated with the latest trends and insights in the insurance industry.
            </p>

            {/* Read More Link with Animation */}
            <Link
              to={blog.path}
              className="group/link mt-6 inline-flex items-center gap-3 text-sm font-black uppercase tracking-widest text-[#213591] hover:text-[#E8021E] transition-colors"
            >
              Read More
             <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#213591]/5 group-hover/link:bg-[#E8021E] group-hover/link:text-white transition-all duration-300">
  <ArrowRight className="size-4 transition-transform" />
</div>
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