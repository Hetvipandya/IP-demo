import { useEffect, useState } from "react";
import { Quote, Star } from "lucide-react";

const TestimonialsSection = ({ testimonials }) => {
  const [index, setIndex] = useState(0);

  const itemsPerView = 3;

  // Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) =>
        prev + itemsPerView >= testimonials.length ? 0 : prev + itemsPerView
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [testimonials.length]); 

  // Get current 3 cards
  const visibleTestimonials = testimonials.slice(
    index,
    index + itemsPerView
  );

  // If less than 3 (end case), wrap around
  const filledTestimonials =
    visibleTestimonials.length < itemsPerView
      ? [...visibleTestimonials, ...testimonials.slice(0, itemsPerView - visibleTestimonials.length)]
      : visibleTestimonials;

  return (
  <section className="relative mx-auto max-w-full py-24 bg-white overflow-hidden">
  
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
        <span className="text-[10px] font-black uppercase tracking-widest text-[#213591]">Success Stories</span>
      </div>
      <h2 className="text-4xl font-black tracking-tight md:text-5xl">
        <span className="text-[#213591]">Our Customers </span>
        <span className="text-[#E8021E]">Love Us</span>
      </h2>
      <div className="mx-auto h-1 w-24 bg-[#E8021E] rounded-full"></div>
    </div>

    {/* Testimonials Grid (Bento Style Border) */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-t border-slate-200 shadow-2xl shadow-slate-200/50">
      {filledTestimonials.map((t, i) => (
        <div
          key={i}
          className="group border-r border-b border-slate-200 bg-white p-10 transition-all duration-500 hover:bg-slate-50/50 flex flex-col relative"
        >
          {/* Large Quote Background Icon */}
          <div className="absolute top-8 right-8 text-slate-100 group-hover:text-[#213591]/10 transition-colors duration-500">
            <Quote size={60} fill="currentColor" />
          </div>

          {/* Stars */}
          <div className="flex text-[#E8021E] mb-6 gap-1">
            {[...Array(5)].map((_, starIndex) => (
              <Star key={starIndex} size={16} fill="currentColor" />
            ))}
          </div>

          {/* Quote Text */}
          <div className="relative z-10 flex-grow">
            <p className="text-lg text-slate-600 leading-relaxed font-bold italic group-hover:text-[#213591] transition-colors duration-300">
              "{t.quote}"
            </p>
          </div>

          {/* Profile Section */}
          <div className="mt-10 flex items-center gap-4">
            <div className="relative">
              <img
                src={t.image}
                alt={t.name}
                className="w-14 h-14 rounded-2xl object-cover shadow-lg grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-[#E8021E] rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h4 className="font-black text-[#213591] text-lg leading-tight">{t.name}</h4>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">{t.role}</p>
            </div>
          </div>

          {/* Subtle line indicator on hover */}
          <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#213591] transition-all duration-500 group-hover:w-full"></div>
        </div>
      ))}
    </div>
  </div>
</section>
  );
};

export default TestimonialsSection;